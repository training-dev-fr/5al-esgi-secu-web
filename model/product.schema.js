let orm = require('./../orm/orm.js');
let {DataTypes}= require('./../orm/orm.js');

let Product = orm.define('product',{
    name: {
        type: DataTypes.STRING(255),
    },
    price: {
        type: DataTypes.NUMBER
    }
});

module.exports = Product;