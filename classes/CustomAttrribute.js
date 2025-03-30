class CustomAttrribute
{
    constructor(name, description)
    {
        this.name = String(name);
        this.description = String(description);
    }

    getName()
    {
        return this.name;
    }

    getDescription()
    {
        return this.description;
    }

    setName(newName)
    {
        this.name = String(newName);
    }

    setDescription(newDescription)
    {
        this.description = String(newDescription);
    }
}