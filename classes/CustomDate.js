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
}