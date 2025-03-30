class Reminder
{
    constructor(friendID, reminderName, reminderID, type, messageDraft, nextNotification)
    {
        this.friendID = friendID;
        this.reminderName = reminderName;
        this.reminderID = reminderID;
        this.type = type; //type is: call, text, custom
        this.messageDraft = messageDraft;
        //how to handle schedule??
        this.nextNotification = nextNotification; //updates after the last notification. in date format??
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

    setNextNotification(date)
    {   
        this.nextNotification = date;
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