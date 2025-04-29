let listUser = require('./../data/user.json');
const fs = require('fs');
const USER_FILE = './data/user.json';
let currentId = listUser.length > 0 ? Math.max(...listUser.map(u => u.id)) : 0;

const findAll = async () => {
    return listUser;
}

const findOne = async (options) => {
    if(!options.where && listUser.length > 0){
        return listUser[0];
    }
    return listUser.find(user => checkWhereClause(user,options));
}

const create = async (user) => {
    let newUser = {...user,id : ++currentId};
    listUser.push(newUser);
    fs.writeFileSync(USER_FILE, JSON.stringify(listUser));
    return newUser;
}

const updateOne = async () => {

}

const destroy = async () => {

}

const checkWhereClause = (user, options) => {
    for(let [field, value] of Object.entries(options.where)){
        if(typeof user[field] === 'number'){
            value = parseInt(value);
        }
        if(user[field] !== value){
            return false;
        }
    }
    return true;
}

module.exports = { findAll, findOne, create, updateOne, destroy };