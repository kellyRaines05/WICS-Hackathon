/*
major syncing problem here
*/
class Randomizer {
    constructor() 
    {
        this.questions = [];
        const fs = require("fs");
        fs.readFile("questions.json", "utf8", (err, data) => {
            if (err) {
                console.error("Error reading JSON file:", err);
                return;
            }

            try {
                // Parse the JSON data
                const jsonData = JSON.parse(data);

                // Store the questions in the class instance
                this.questions = jsonData.questions || [];

                console.log("Questions successfully loaded from JSON");
            } catch (parseError) {
                console.error("Error parsing JSON data:", parseError);
            }
        });
    }

    getRandomMessage() //error here, no questions available, async and promises needed?
    {
        // Check if questions are loaded
        if (this.questions.length === 0) {
            console.log("No questions available.");
            return null;
        }

        // Get a random index
        const randomIndex = Math.floor(Math.random() * this.questions.length);

        // Return the random question
        return this.questions[randomIndex];
    }
}