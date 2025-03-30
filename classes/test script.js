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

class Friend {
    constructor(friendID, name, pronouns, address, birthday, likes, dislikes, phoneNumber, email, notebook) {
        this.friendID = String(friendID);
        this.name = String(name);
        this.pronouns = pronouns; //pronouns is an array of arrays. e.g. [[she, her], [they, them]] || [[he, him]]
        this.address = String(address); 
        this.birthday = new Date(birthday);
        this.importantDates = []; //list of Dates
        this.notePage = ""; // You may decide to use a notebook or note page in the future
        this.likes = likes; //likes is array of likes
        this.dislikes = dislikes; //same
        this.phoneNumber = String(phoneNumber);
        this.email = String(email);
        this.notebook = notebook;  // This links the Friend with a Notebook instance
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

    getImportantDates() { 
        return this.importantDates; 
    }

    addImportantDate(date) {
        if (date instanceof Date) {
            this.importantDates.push(date);
        }
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
        name: this.name,  // Corrected typo: 'this.nanme' → 'this.name'
        pronouns: this.pronouns,
        address: this.address,
        birthday: this.birthday,
        importantDates: this.importantDates,
        likes: this.likes,
        dislikes: this.dislikes,
        phoneNumber: this.phoneNumber,
        email: this.email,
        notebook: this.notebook.toObject(),  // Will call notebook's toObject method
      };
    }

    toString() {
        return `Friend {
            friendID: ${this.friendID},
            name: ${this.name},
            pronouns: ${JSON.stringify(this.pronouns)},
            address: ${this.address},
            birthday: ${this.birthday.toDateString()},
            importantDates: [${this.importantDates.map(date => date.toDateString()).join(", ")}],
            likes: [${this.likes.join(", ")}],
            dislikes: [${this.dislikes.join(", ")}],
            phoneNumber: ${this.phoneNumber},
            email: ${this.email},
            notebook: ${this.notebook ? this.notebook.toString() : "No notebook"}
        }`;
    }
}

// Example usage:
// Instantiate 5 different people (friends) with their own notebooks
const friend1 = new Friend(
    1, 
    "Alice", 
    [["she", "her"]], 
    "456 Oak St", 
    "1992-07-15", 
    ["Art", "Cooking"], 
    ["Spicy Food"], 
    "321-654-9870", 
    "alice@example.com", 
    new Notebook() // Creating a new Notebook directly
);
friend1.notebook.addPage("Shopping List", "Eggs, Milk, Bread", "2025-03-29", 1);
friend1.notebook.addPage("Travel Plans", "Flight to Paris, Hotel in Central", "2025-04-01", 2);

const friend2 = new Friend(
    2, 
    "Bob", 
    [["he", "him"]], 
    "789 Pine St", 
    "1985-02-25", 
    ["Gaming", "Running"], 
    ["Loud Noises"], 
    "654-321-9870", 
    "bob@example.com", 
    new Notebook() // Creating a new Notebook directly
);
friend2.notebook.addPage("Workout Routine", "Push-ups, Squats, Running", "2025-03-29", 3);
friend2.notebook.addPage("Reading List", "1984, To Kill a Mockingbird", "2025-04-05", 4);

const friend3 = new Friend(
    3, 
    "Charlie", 
    [["he", "him"]], 
    "123 Maple St", 
    "1990-11-05", 
    ["Traveling", "Photography"], 
    ["Crowded Places"], 
    "987-654-3210", 
    "charlie@example.com", 
    new Notebook() // Creating a new Notebook directly
);
friend3.notebook.addPage("Recipe Ideas", "Pasta, Pizza, Salad", "2025-03-30", 5);
friend3.notebook.addPage("Bucket List", "Skydiving, Visit Japan", "2025-04-10", 6);

const friend4 = new Friend(
    4, 
    "Dana", 
    [["she", "her"]], 
    "456 Birch St", 
    "1995-08-22", 
    ["Music", "Hiking"], 
    ["Heat"], 
    "555-123-4567", 
    "dana@example.com", 
    new Notebook() // Creating a new Notebook directly
);
friend4.notebook.addPage("Goals", "Learn JavaScript, Build Website", "2025-03-29", 7);
friend4.notebook.addPage("Concerts", "Coldplay, Ed Sheeran", "2025-04-12", 8);

const friend5 = new Friend(
    5, 
    "Eve", 
    [["she", "her"]], 
    "789 Cedar St", 
    "1998-05-18", 
    ["Yoga", "Reading"], 
    ["Bad Weather"], 
    "333-222-1111", 
    "eve@example.com", 
    new Notebook() // Creating a new Notebook directly
);
friend5.notebook.addPage("Vacation Plans", "Hawaii, Beach Resort", "2025-03-31", 9);
friend5.notebook.addPage("Budget", "Saving for New Laptop, Travel Fund", "2025-04-02", 10);

// Output the information for all 5 friends
console.log(friend1.toString());
console.log(friend2.toString());
console.log(friend3.toString());
console.log(friend4.toString());
console.log(friend5.toString());

friends = [friend1, friend2, friend3, friend4, friend5];
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