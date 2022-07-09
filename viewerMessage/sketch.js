

 let dataServer;
 let pubKey = "pub-c-63f38725-5c1b-46dd-94d3-83290ae7ad0b";
 let subKey = "sub-c-b1996b97-96f0-4f57-bacf-82cacb7f536e";
 let secretKey = "sec-c-NjNmNGVmODYtYTQzZi00NmJkLTgxMzUtYTQyZmQwYWJjOGRh";
 
 //name used to sort your messages. used like a radio station. can be called anything\
 
 let subscribeChannelName = "messageToUsers";
 let publishChannelName = "Users";

 let videoMessage = "Next user must join.";

 function preload() { // preload our yoyo video

    you = random (0,1000000)
    console.log(you);
    you= int(you);
    console.log(you);
    you = you.toString();

 }
 
 function setup() {
   createCanvas(windowWidth, windowHeight);
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
 
   sendTheMessage();
   // style content
   
 }


   
 function draw() {
 // we are not drawing anything!

  background(255);
  textSize(40);
  textAlign(CENTER);
  fill(0);
  text(videoMessage, windowWidth/2, windowHeight/2);

 }
 
 function sendTheMessage() {

   dataServer.publish({
     channel: publishChannelName,
     message: "hello" // message does not mean anything here, we just need a message. 
   });
 }
 
 // I don't know if we need this on this page - OP
 function readIncoming(inMessage) {
 
   if (inMessage.channel == subscribeChannelName) {
    videoMessage = inMessage.message.messageText;
    
   }
 }
