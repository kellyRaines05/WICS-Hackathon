class Notebook{
    constructor() 
    {
        this.pages = [];  //array of notepage class instances
    }

    addPage(title, content, date, id) 
    {
        newPage = new Notepage(title, content, date, id);
        this.pages.push(newPage);
    }

    removePage(id) 
    {
        
        index = this.pages.findIndex(page => page.id === id);

        if (index !== -1) {
            this.pages.splice(index, 1);
            console.log(`Page with id ${id} has been removed.`);
        } else {
            console.log(`Page with id ${id} not found.`);
        }
    }

    listPages() 
    {
        //return all pages
    }

    toObject()
    {
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
    