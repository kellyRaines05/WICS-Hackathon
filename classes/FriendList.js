class FriendList {
    constructor() {
        this.friends = [];
    }

    // Add a new friend to the list
    addFriend(friend) 
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

    // Get friends by a specific like
    findFriendsByLike(like) {
        return this.friends.filter(friend => friend.likes.includes(like));
    }

    // Get friends by a specific dislike
    findFriendsByDislike(dislike) {
        return this.friends.filter(friend => friend.dislikes.includes(dislike));
    }

    // Get friends with upcoming important dates (for example, birthdays)
    findFriendsWithUpcomingDates() {
        const today = new Date();
        return this.friends.filter(friend => 
            friend.getImportantDates().some(date => {
                return date > today && date.getFullYear() === today.getFullYear();
            })
        );
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
