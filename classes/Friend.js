const Notebook = require('./Notebook');

class Friend {
    constructor(friendID, name, pronouns, address, birthday, likes, dislikes, phoneNumber, email) 
    {
        this.friendID = String(friendID);
        this.name = String(name);
        this.pronouns = pronouns; //pronouns is an array of arrays. e.g. [[she, her], [they, them]] || [[he, him]]
        this.address = String(address); 
        this.birthday = new Date(birthday);
        this.notePage = ""; // You may decide to use a notebook or note page in the future
        this.likes = likes; //likes is array of likes
        this.dislikes = dislikes; //same
        this.phoneNumber = String(phoneNumber);
        this.email = String(email);
        this.notebook = new Notebook();  // This links the Friend with a Notebook instance
    }

    getName() { 
        return this.name; 
    }

    setName(name) { 
        this.name = String(name); 
    }

    getPronouns() { 
        return this.pronouns; 
    }

    setPronouns(newPronouns) {
        this.pronouns = newPronouns;
    }

    getAddress() { 
        return this.address; 
    }

    setAddress(address) { 
        this.address = String(address); 
    }

    getBirthday() { 
        return this.birthday; 
    }

    setBirthday(birthday) { 
        this.birthday = new Date(birthday); 
    }


    getNotePage() { 
        return this.notePage; 
    }

    setNotePage(note) { 
        this.notePage = String(note);
    }

    toObject() {
      return {
        friendID: this.friendID, 
        name: this.name,
        pronouns: this.pronouns,
        address: this.address,
        birthday: this.birthday,
        likes: this.likes,
        dislikes: this.dislikes,
        phoneNumber: this.phoneNumber,
        email: this.email,
        notebook: this.notebook.toObject(),
      };
    }

    toString() {
        return `Friend {
            friendID: ${this.friendID},
            name: ${this.name},
            pronouns: ${JSON.stringify(this.pronouns)},
            address: ${this.address},
            birthday: ${this.birthday.toDateString()},
            likes: [${this.likes.join(", ")}],
            dislikes: [${this.dislikes.join(", ")}],
            phoneNumber: ${this.phoneNumber},
            email: ${this.email},
            notebook: ${this.notebook ? this.notebook.toString() : "No notebook"}
        }`;
    }
}

module.exports = Friend;
