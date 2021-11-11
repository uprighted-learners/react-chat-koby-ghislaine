//GMBL: note: I added notes, even to the boiler plate stuff because it helps me to talk it out to myself what its used for to retain it better
// allows usage of .env to contain our "hidden variables"
require("dotenv").config();
// importing express server
const express = require("express");
// importing mongoose for database connection
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
const path = require("path");


const app = express();
//think this is setting up the static file server, pre-set for both dev and production (public = dev version) & (build = production version)
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

app.use(express.static(staticDir));

// allows for server to evaluate data as a json Obj
app.use(express.urlencoded({extended: true}));

// note (for lines 22-25) from Schema Validation slidedeck- pass {userNewUrlParser: true, useUnifiedTopology: true} as a 2nd argument to the connect method to avoid depreciation warnings

// someVariable = mongoose.connect(someVariable, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// 'database' variable projects onto mongoose (our connection to DB)
const database = mongoose.connection;

// this is creating the schema (in mongoose) to describe the components of the chat message schema
// can we name things variable name + 'schema'? It may be a bit long of a V-name, but it makes sense to me
// ??? the 'author' is the same thing as the 'user' right? 
const messageSchema = new mongoose.Schema ({
  room: String,
  when: Date,
  author: String,
  body: String,
});

// using the Schema above, I added a new model (named 'message') 
const Message = mongoose.model('Message', messageSchema)

// setting up an error msg (schema validation slide-deck)
database.on('error', console.error.bind(console, 'connection error:'))

// obtains the added 'author name' from the 'submit message form on the home-page ... this should set author name to the body of request
app.post('/submit', (req, res) => {
  const {author} = req.body;
});
// maybe should add 'room' so like {author, room} so that their message will appear in THAT room
app.post('/rooms/:roomID/message', async (req, res) => {
  // getting properties from the request body
  let author = req.body.author;
  let msgBody = req.body.msgBody;
  // make a new 'Date' obj & assign to 'date' variable (unless this date is a constructor- check)
  let when = new Date();
  //pull the roomID for the specific 'room' that the user is posting a message into & assign it to roomID
  let roomID = req.params.roomID;

  //at the same time, we can make sure that the body of the message does not exceed 500 characters, if it does- send cat error message
  if(msgBody > 500) {
    return res.sendStatus(403);
  }
  
});



// GMBL: re-direct from homepage to the actual chat room.. or should we do all the components like 1. set author, 2. set room, 3. set message and THEN re-direct to the chat route all at same time.. like do all the app.posts and then all the re-direct or alternate 1/2, 2/2, 3/3.. 





app.listen(port, () => {
  console.log('listening on port: ' + port) 
})
