class FriendList {
    constructor() {
        this.friends = [];
    }

    // Add a new friend to the list
    addFriend() 
    {

            this.friends.push(friend);
    }

    // Remove a friend by their ID
    removeFriend(friendID) 
    {
        this.friends = this.friends.filter(friend => friend.friendID !== friendID);
    }

    // Get all friends in the list
    getAllFriends() {
        return this.friends;
    }

    // Get friends by a specific dislike
    findFriendsByDislike(dislike) {
        return this.friends.filter(friend => friend.dislikes.includes(dislike));
    }

    // Get the total number of friends
    getFriendCount() {
        return this.friends.length;
    }

    // Return a string representation of all friends in the list
    toString() {
        return `FriendList with ${this.friends.length} friends: \n` + 
            this.friends.map(friend => friend.toString()).join("\n\n");
    }
}
