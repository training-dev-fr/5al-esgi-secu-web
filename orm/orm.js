const Entities = require('./Entities.js');

const define = (name,schema) => {
    return new Entities(name, schema);
}

const DataTypes = {
    STRING: function(value){
        let type = {type: "string"}
        if(value){
            type.max = value;
        }
        return type;
    },
    NUMBER: function(){
        return {
            type: "number"
        }
    }
}

module.exports = {define, DataTypes};