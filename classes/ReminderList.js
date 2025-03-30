const ReminderList = require('./Reminder');

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

module.exports = ReminderList;
