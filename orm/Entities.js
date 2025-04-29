const fs = require('fs');

class Entities {
    constructor(name, schema) {
        this.name = name;
        this.schema = schema;
        this.filename = name + '.json';
        if (!fs.existsSync("./data/" + this.filename)) {
            this.data = [];
            this.save();
        } else {
            this.data = require('./../data/' + this.filename);
        }

        this.currentId = this.data.length > 0 ? Math.max(...this.data.map(u => u.id)) : 0;
    }

    async save() {
        fs.writeFileSync("./data/" + this.filename, JSON.stringify(this.data));
    }

    async findAll(options) {
        if (!options.where && this.data.length > 0) {
            return this.data;
        }
        return this.data.filter(element => this.checkWhereClause(element, options));
    }

    async findOne(options) {
        if (!options.where && this.data.length > 0) {
            return this.data[0];
        }
        return this.data.find(element => this.checkWhereClause(element, options));
    }

    async create(element) {
        try {
            this.checkFieldExist(element);
            await this.checkFormat(element);
        } catch (e) {
            throw e;
        }
        const newElement = {
            ...element,
            id: ++this.currentId
        };
        this.data.push(newElement);
        this.save();
        return newElement;
    }

    async updateOne(element, options) {
        let elementToUpdate = await this.findOne(options);
        try {
            this.checkFieldExist(element);
            await this.checkFormat(element);
        } catch (e) {
            throw e;
        }
        Object.assign(elementToUpdate, element);
        this.save();
    }

    async destroy(options) {
        if (!options.where && this.data.length > 0) {
            return 0;
        }
        let count = this.data.length;
        this.data = this.data.filter(user => !checkWhereClause(user, options));
        this.save();
        return count - this.data.length;
    }

    checkWhereClause(element, options) {
        for (let [field, value] of Object.entries(options.where)) {
            if (typeof element[field] === 'number') {
                value = parseInt(value);
            }
            if (element[field] !== value) {
                return false;
            }
        }
        return true;
    }

    async checkFormat(element) {
        for (let [property, value] of Object.entries(element)) {
            if (typeof value !== this.schema[property].type.type) {
                throw new Error("Error : property " + property + " must be of type " + this.schema[property].type.type);
            }
            if (this.schema[property].type.max && value.length > this.schema[property].type.max) {
                throw new Error("Error : property " + property + " must have " + this.schema[property].type.max + " at most");
            }
            if (this.schema[property].unique) {
                let result = await this.checkUnique(property, value);
                if (!result) {
                    throw new Error("Error : property " + property + " must be unique");
                }
            }
        }
        return true;
    }

    checkFieldExist(element) {
        for (let property of Object.keys(element)) {
            if (!this.schema[property]) {
                throw new Error("Error : property " + property + " does not exist on " + this.name);
            }
        }
        return true;
    }

    async checkUnique(property, value) {
        let obj = {};
        obj[property] = value;
        let element = await this.findOne({
            where: obj
        });
        if (element) {
            return false;
        }
        return true;
    }
}

module.exports = Entities;