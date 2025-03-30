const NotebookPage = require('./Notepage');

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

module.exports = Notebook;
