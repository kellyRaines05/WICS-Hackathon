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