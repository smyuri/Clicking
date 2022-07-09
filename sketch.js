

 let dataServer;
 let pubKey = "pub-c-63f38725-5c1b-46dd-94d3-83290ae7ad0b";
 let subKey = "sub-c-b1996b97-96f0-4f57-bacf-82cacb7f536e";
 let secretKey = "sec-c-NjNmNGVmODYtYTQzZi00NmJkLTgxMzUtYTQyZmQwYWJjOGRh";
 
 //name used to sort your messages. used like a radio station. can be called anything
 let subscribeChannelName = "Users";
 let publishChannelName = "messageToUsers";
 
 // used to collect the viewers of the movie
 let viewers = [];
 
 let who;  // help us track who is here
 
 let vid; // variable for video
 
 //let presence = false; // the first click sends the message to PubNub
 let waitForUsers = false;
 let vidPausePlay = false; // variable to pause or play video
 let you; //variable to randomly generate new UUIDs upon load

 // to determine the first click to play the video
 let firstClick = false;

 let messageToViewers = "Next user must join.";

 function preload() { // preload our yoyo video

    you = random (0,1000000)
    console.log(you);
    you= int(you);
    console.log(you);
    you = you.toString();

    viewers.push(you);

    vid = createVideo("Bees2.mp4"); 
 }
 
 function setup() {
   //createCanvas(windowWidth, windowHeight);
   background(255);
 
   // initialize pubnub
   dataServer = new PubNub({
     subscribeKey: subKey,
     publishKey: pubKey,
     uuid: you,
     secretKey: "secretKey",
     heartbeatInterval: 0,
   }); 

   dataServer.subscribe({channels: [subscribeChannelName]});

   //attach callbacks to the pubnub object to handle messages and connections
   dataServer.addListener({message: readIncoming});
 
   // style content
   background(255);
   sendTheMessage();
  
   
 }


 function draw() {
 // we are not drawing anything!
 
  if (firstClick == true) {
      drawVideo();
  }

 }
 
 function sendTheMessage() {

  if (viewers.length == 2) {

    messageToViewers = "Supreme Court in session. Next user must join.";
  } else if (viewers.length == 3) {

    messageToViewers = "15 weeks. Next user must join.";
  } else if (viewers.length == 4) { 

    messageToViewers = "Rule in favour of Missispi. Next user must join.";

  } else if (viewers.length == 5) { 

    messageToViewers = "End constitutional right to abortions. Next user must join.";

  } else if (viewers.length == 6) { 

    messageToViewers = "Reduce access to health care and reproductive care. Next user must join.";

  } else if (viewers.length == 7) { 

    messageToViewers = "Another ban on women's bodies";
  } else if (viewers.length > 7) { 

    messageToViewers = " Only 1 person must be on server. Leave or ask others to leave.";
  }


   dataServer.publish({
     channel: publishChannelName,
     message: {
        messageText: messageToViewers
     }, // message does not mean anything here, we just need a message. 
   });
 }
 
 function mousePressed() {
// this is required because of media internet protocol standards - you need to interact with the page before playing
  if (firstClick == false) {
    firstClick = true;
  }
 }
 // I don't know if we need this on this page - OP
 function readIncoming(inMessage) {
  who = inMessage.publisher;

   if (inMessage.channel == subscribeChannelName) {
    console.log(inMessage);

       let newinput = true; // checking to see if it is a new user
        console.log(viewers); // printing out the users

       // code for compiling a list of users
       for(let i = 0; i<viewers.length;i++) {
         if(who==viewers[i]) {
           newinput = false;   
         }
       }
       if(newinput) {
        console.log("in here");
         viewers.push(who); // if there is a new viewer, change the video speed
         sendTheMessage();
         waitForUsers = false; 
       }
   }
 }
 
 function drawVideo() { // draw the video to play on the canvas. 
 
   background(255);
   vid.size(windowWidth, windowHeight); 
   vid.position(0,0);

   vid_duration = vid.duration(); 

   vid_time = vid.time();
  //console.log(viewers);
   // if statement here play the video
if (waitForUsers == false) {
  // all the if statements will be in here
  if ((viewers.length == 2) && (vidPausePlay == false)) {

    vid.play(); 
    vidPausePlay = true;
  }
  if ((viewers.length == 2) && (vid_time > 5)) {
    vid.pause();
    vidPausePlay = false;
    waitForUsers = true;

  } else if ((viewers.length == 3) && (vidPausePlay == false)) {

    vid.play(); 
    vidPausePlay = true;
  }
  if ((viewers.length == 3) && (vid_time > 10)) {
    vid.pause();
    vidPausePlay = false;
    waitForUsers = true;
  } else if ((viewers.length == 4) && (vidPausePlay == false)) {

    vid.play(); 
    vidPausePlay = true;
  }
  if ((viewers.length == 4) && (vid_time > 15)) {
    vid.pause();
    vidPausePlay = false;
    waitForUsers = true;
  } else if ((viewers.length == 5) && (vidPausePlay == false)) {

    vid.play(); 
    vidPausePlay = true;
  }
  if ((viewers.length == 5) && (vid_time > 20)) {
    vid.pause();
    vidPausePlay = false;
    waitForUsers = true;
  } else if ((viewers.length == 6) && (vidPausePlay == false)) {

    vid.play(); 
    vidPausePlay = true;
  }
  if ((viewers.length == 6) && (vid_time > 25)) {
    vid.pause();
    vidPausePlay = false;
    waitForUsers = true;
  } else if ((viewers.length == 7) && (vidPausePlay == false)) {

    vid.play(); 
    vidPausePlay = true;
  }
  if ((viewers.length == 7) && (vid_time > 30)) {
    vid.pause();
    vidPausePlay = false;
    waitForUsers = true;
  }
}
  
   /*console.log("durations = " + vid_duration );

   console.log("time = " + vid_time);
*/
  // vid.loop();
 
 }

