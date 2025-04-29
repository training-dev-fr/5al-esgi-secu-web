let orm = require('./../orm/orm.js');
let {DataTypes}= require('./../orm/orm.js');

let Role = orm.define('role',{
    name: {
        type: DataTypes.STRING(255)
    }
});

module.exports = Role;