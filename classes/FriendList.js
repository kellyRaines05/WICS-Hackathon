class FriendList {
    constructor() 
    {
        this.friends = [];
    }

    // Add a new friend to the list
    addFriend(friendID, name, pronouns, address, birthday, likes, dislikes, phoneNumber, email) 
    {
        const newFriend = new Friend(friendID, name, pronouns, address, birthday, likes, dislikes, phoneNumber, email)
        this.friends.push(newFriend);
    }

    // Remove a friend by their ID
    removeFriend(friendID) 
    {
        this.friends = this.friends.filter(friend => friend.friendID !== friendID);
    }

    // Get all friends in the list
    getAllFriends() 
    {
        return this.friends;
    }

    // Get the total number of friends
    getFriendCount() 
    {
        return this.friends.length;
    }

    saveFriendsToJSON()
    {
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
    }

    loadFriendsFromJSON() 
    {
        const fs = require("fs");

        // Read the JSON file
        fs.readFile("friends.json", "utf8", (err, data) => {
            if (err) {
                console.error("Error reading JSON file:", err);
                return;
            }

            try {
                // Parse JSON data
                const friendObjects = JSON.parse(data);
                
                // Convert JSON objects into Friend instances
                this.friends = friendObjects.map(friendData => 
                    new Friend(
                        friendData.friendID, 
                        friendData.name, 
                        friendData.pronouns, 
                        friendData.address, 
                        friendData.birthday, 
                        friendData.likes, 
                        friendData.dislikes, 
                        friendData.phoneNumber, 
                        friendData.email
                    )
                );

                console.log("Friends successfully loaded from JSON");
            } catch (parseError) {
                console.error("Error reading JSON data:", parseError);
            }
        });
    }

    // Return a string representation of all friends in the list
    toString() 
    {
        return `FriendList with ${this.friends.length} friends: \n` + 
            this.friends.map(friend => friend.toString()).join("\n\n");
    }
}
