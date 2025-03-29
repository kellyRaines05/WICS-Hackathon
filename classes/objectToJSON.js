//there exists an array of all existing friends: friends = [mary, smith, joe, etc....]
const friendObjects = friends.map(Friend => Friend.toObject());

//convert the array to a JSON string
const jsonString = JSON.stringify(friendObjects, null, 2);

//save to a JSON file
const fs = require("fs");
fs.writeFile("friends.json", jsonString, (err) => {
    if(err){
        console.error("error writing to file");
    }
    else{
        console.log("json write successful");
    }
});