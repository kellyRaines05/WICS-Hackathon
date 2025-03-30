class Notepage {
    constructor(title, content, date, id) {
        this.title = String(title);
        this.content = content;
        this.date = new Date(date); 
        this.id = id;
    }

    getContent() {
        return this.content;
    }

    setContent(newContent) {
        this.content = newContent;
    }

    getTitle() {
        return this.title;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    getDate() {
        return this.date;
    }

    setDate(date) {  // Added 'date' parameter
        this.date = new Date(date);
    }

    getID() {
        return this.id;
    }

    toObject() {
        return {
            title: this.title,
            content: this.content,
            date: this.date,
            id: this.id,
        };
    }

    toString() {
        return `Note {
            id: ${this.id},
            title: "${this.title}",
            content: "${this.content}",
            date: ${this.date.toDateString()}
        }`;
    }
}

class Notebook {
    constructor() {
        this.pages = [];  // array of Notepage class instances
    }

    addPage(title, content, date, id) {
        const newPage = new Notepage(title, content, date, id);  // Declared with const
        this.pages.push(newPage);
    }

    removePage(id) {
        const index = this.pages.findIndex(page => page.id === id);  // Declared with const

        if (index !== -1) {
            this.pages.splice(index, 1);
            console.log(`Page with id ${id} has been removed.`);
        } else {
            console.log(`Page with id ${id} not found.`);
        }
    }

    listPages() {
        return this.pages;  // Return all pages
    }

    toObject() {
        return {
            pages: this.pages.map(page => page.toObject()), // Ensure each Notepage instance has its own toObject method
        };
    }

    toString() {
        return `Notebook { 
            pages: [${this.pages.map(page => page.toString()).join(", ")}] 
        }`;
    }
}

class CustomAttrribute
{
    constructor(name, description)
    {
        this.name = String(name);
        this.description = String(description);
    }

    getName()
    {
        return this.name;
    }

    getDescription()
    {
        return this.description;
    }

    setName(newName)
    {
        this.name = String(newName);
    }

    setDescription(newDescription)
    {
        this.description = String(newDescription);
    }

    toString() {
        return `CustomAttribute { name: "${this.name}", description: "${this.description}" }`;
    }

    toObject() {
        return {
            name: this.name,
            description: this.description
        };
    }

}

class CustomDate
{
    constructor(name, date, description)
    {
        this.name = string(name);
        this.date = new Date(date);
        this.description = String(description);
    }

    getName()
    {
        return this.name;
    }

    getDate()
    {
        return this.date;
    }

    getDescription()
    {
        return this.description;
    }

    setName(newName)
    {
        this.name = String(newName);
    }

    setDate(newDate)
    {
        this.date = new Date(newDate);
    }

    setDescription(newDescription)
    {
        this.description = String(newDescription)
    }

    toObject() 
    {
        return {
            name: this.name,
            date: this.date.toISOString(), // Converts Date to a standard format
            description: this.description
        };
    }

    toString() 
    {
        return `CustomDate { 
            name: "${this.name}", 
            date: "${this.date.toDateString()}", 
            description: "${this.description}" 
        }`;
    }

}

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

//const { getRandomDate } = require('./Randomizer'); // Import the getRandomDate function

class Reminder
{
    constructor(friendID, reminderName, reminderID, type, messageDraft, nextNotification, repeatSchedule)
    {
        this.friendID = friendID;
        this.reminderName = reminderName;
        this.reminderID = reminderID;
        this.type = type; //type is: call, text, custom
        this.messageDraft = messageDraft;
        //how to handle schedule??
        this.nextNotification = nextNotification; //updates after the last notification. in date format??
        this.repeatSchedule = repeatSchedule; //repeatSchedule is 'week' || 'month' || 'year' || 'none'
        this.archived = false;
        //this.randomizer = new Randomizer()
    }

    getReminderName()
    {
        return this.reminderName;
    }

    setReminderName(newName)
    {
        this.reminderName = newName;
    }

    getReminderType()
    {
        return this.type;
    }

    getMessageDraft()
    {
        return this.messageDraft;
    }

    getNextNotification()
    {
        return this.nextNotification;
    }

    //parameter is either week, month, or year
    getRandomDate(timeFrame) {
        let startDate = new Date();
        let endDate;

        switch (timeFrame.toLowerCase()) {
            case "week":
                endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week later
                break;
            case "month":
                endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
                break;
            case "year":
                endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
                break;
            default:
                console.log("timeframe error");
                return null;
        }

        const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        const randomDate = new Date(randomTime);

        return randomDate;
    }


    setNextNotification() {
        if (["week", "month", "year"].includes(this.repeatSchedule.toLowerCase())) {
            this.nextNotification = getRandomDate(this.repeatSchedule);
            console.log(`Next notification set for: ${this.nextNotification}`);
        } else {
            // If the repeatSchedule is invalid, archive the notification
            this.archived = true;
            this.nextNotification = null;
            console.log("Repeat schedule is invalid. Notification archived.");
        }
    }

    
    toString() {
        return `Reminder [ID: ${this.reminderID}, Name: ${this.reminderName}, Type: ${this.type}, Next Notification: ${this.nextNotification.toLocaleString()}]`;
    }

    toObject() {
        return {
            friendID: this.friendID,
            reminderName: this.reminderName,
            reminderID: this.reminderID,
            type: this.type,
            messageDraft: this.messageDraft,
            nextNotification: this.nextNotification
        };
    }
}

class ReminderList
{
    constructor()
    {
        this.reminders = []
    }

    saveRemindersToJSON()
    {
        const reminderObjects = this.reminders.map(Reminder => Reminder.toObject());

        //convert the array to a JSON string
        const jsonString = JSON.stringify(reminderObjects, null, 2);

        //save to a JSON file
        const fs = require("fs");
        fs.writeFile("reminders.json", jsonString, (err) => {
            if(err){
                console.error("error writing to file");
            }
            else{
                console.log("json write successful");
            }
        });
    }

    loadRemindersFromJSON() 
    {
        const fs = require("fs");

        // Read the JSON file
        fs.readFile("reminders.json", "utf8", (err, data) => {
            if (err) {
                console.error("Error reading JSON file:", err);
                return;
            }

            try {
                // Parse JSON data
                const reminderObjects = JSON.parse(data);
                // Convert JSON objects into Friend instances
                this.reminders = reminderObjects.map(reminderData => 
                    new Reminder(
                        reminderData.friendID, 
                        reminderData.name, 
                        reminderData.pronouns, 
                        reminderData.address, 
                        reminderData.birthday, 
                        reminderData.likes, 
                        reminderData.dislikes, 
                        reminderData.phoneNumber, 
                        reminderData.email
                    )
                );

                console.log("Friends successfully loaded from JSON");
            } catch (parseError) {
                console.error("Error reading JSON data:", parseError);
            }
        });
    }

    addReminder(friendID, reminderName, reminderID, type, messageDraft, nextNotification)
    {
        const newReminder = new Reminder(friendID, reminderName, reminderID, type, messageDraft, nextNotification);
        this.reminders.push(newReminder);
    }

     removeReminder(reminderID) 
     {
         this.reminders = this.reminders.filter(reminder => reminder.reminderID !== reminderID);
     }

    getAllReminders() 
    {
        return this.reminders;
    }

    getReminderCount() 
    {
        return this.reminders.length;
    }
}

const fs = require("fs/promises");

class Randomizer {
    constructor() {
        this.questions = [];
    }

    async loadQuestions() {
        try {
            const data = await fs.readFile("questions.json", "utf8");
            const jsonData = JSON.parse(data);

            // Store the questions in the instance
            this.questions = jsonData.questions || [];
            console.log("Questions successfully loaded from JSON");
        } catch (err) {
            console.error("Error loading questions:", err);
        }
    }

    getRandomMessage() {
        if (this.questions.length === 0) {
            console.log("No questions available.");
            return null;
        }
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        return this.questions[randomIndex];
    }

    //parameter is either week, month, or year
    getRandomDate(timeFrame) {
        let startDate = new Date();
        let endDate;

        switch (timeFrame.toLowerCase()) {
            case "week":
                endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week later
                break;
            case "month":
                endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
                break;
            case "year":
                endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
                break;
            default:
                console.log("timeframe error");
                return null;
        }

        const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        const randomDate = new Date(randomTime);

        return randomDate;
    }

}

// Create instances of FriendList, ReminderList, and a Randomizer
const friendList = new FriendList();
const reminderList = new ReminderList();
const randomizer = new Randomizer();

// Test 1: Adding a friend
friendList.addFriend("1", "Alice", [["she", "her"]], "123 Wonderland", "1990-01-01", ["Reading", "Traveling"], ["Loud places"], "123-456-7890", "alice@example.com");
friendList.addFriend("2", "Bob", [["he", "him"]], "456 Neverland", "1992-05-15", ["Gaming", "Music"], ["Spicy food"], "098-765-4321", "bob@example.com");

// Test 2: Creating a note page and adding it to a friend's notebook
const alice = friendList.getAllFriends()[0];
alice.notebook.addPage("Meeting Notes", "Discussed vacation plans", "2025-03-30", 1);
alice.notebook.addPage("Grocery List", "Milk, Eggs, Bread", "2025-03-29", 2);

// Test 3: Listing pages in Alice's notebook
console.log("Alice's Notebook Pages:");
console.log(alice.notebook.listPages());

// Test 4: Removing a page from the notebook
alice.notebook.removePage(2);

// Test 5: Listing pages again to see the update
console.log("Alice's Updated Notebook Pages:");
console.log(alice.notebook.listPages());

// Test 6: Creating a reminder
const reminder = new Reminder("1", "Call Alice", "R1", "call", "Check in with Alice", new Date(), "week");
reminderList.addReminder(reminder.friendID, reminder.reminderName, reminder.reminderID, reminder.type, reminder.messageDraft, reminder.nextNotification);

// Test 7: Display all reminders
console.log("All Reminders:");
console.log(reminderList.getAllReminders());

// Test 8: Using Randomizer to get a random date
const randomDate = randomizer.getRandomDate("month");
console.log("Random Date in the Next Month:", randomDate);

// Test 9: Save and load reminders from JSON (simulated)
reminderList.saveRemindersToJSON();  // Assuming this saves to a file
reminderList.loadRemindersFromJSON();  // Load reminders back

// Test 10: Show friend list toString
console.log(friendList.toString());
