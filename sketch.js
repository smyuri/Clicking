

let dataServer;
let pubKey = "pub-c-d65aaaed-7c27-4a98-b770-7c2ca599ab99";
let subKey = "sub-c-7a87bd4e-f873-49c0-b748-d926198cc646";
let secretKey = "sec-c-M2RlNjc4NzAtZGRlZS00ZDk4LWI3NjktNWY4MzkzZDEyOGI0";

let occupancy = 0; 

let channelName = "clicker";

let allowMessage = false;
let counter = 0;
  
function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: "Myuri",
      secretKey: secretKey,
      heartbeatInterval: 0,
    });

     // listen for messages coming through the subcription feed on this specific channel. 

    dataServer.subscribe({ channels: [channelName],   withPresence: true });
    dataServer.addListener({ message: readIncoming, presence: whoisconnected });
   
  
  }
  
function draw() {
 
 // make something visible for more people 
 

 if (occupancy >=1) {
  background(255);
  text("click me", windowWidth, windowHeight);

  allowMessage = false;

 } 
}

function mousePressed() {

  sendTheMessage();
}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      x: mouseX,
      y: mouseY
    },
  });
}

function readIncoming(inMessage) {

 
    if (inMessage.channel == channelName) {
        console.log(inMessage);
    }
      counter++; //(counter + 1)
      
    noStroke();
    fill(56, 200, 70);
    rect(inMessage.message.x, inMessage.message.y, random(0,300),random(0,300));

  
}

function whoisconnected(connectionInfo) {
  console.log(connectionInfo);

  occupancy = connectionInfo.occupancy;

  console.log(occupancy);

}