const ReminderRandom = require('./Randomizer'); 

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

module.exports = Reminder;
