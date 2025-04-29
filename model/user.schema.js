let orm = require('./../orm/orm.js');
let {DataTypes}= require('./../orm/orm.js');

let User = orm.define('user',{
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        validate: /.*@.*/
    },
    password: {
        type: DataTypes.STRING(255)
    }
});

module.exports = User;