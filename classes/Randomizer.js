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
