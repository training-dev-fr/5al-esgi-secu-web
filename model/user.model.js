let listUser = require('./../data/user.json');
const fs = require('fs');
const USER_FILE = './data/user.json';
let currentId = listUser.length > 0 ? Math.max(...listUser.map(u => u.id)) : 0;

const findAll = async (options) => {
    if (!options.where && listUser.length > 0) {
        return listUser;
    }
    return listUser.filter(user => checkWhereClause(user, options));
}

const findOne = async (options) => {
    if (!options.where && listUser.length > 0) {
        return listUser[0];
    }
    return listUser.find(user => checkWhereClause(user, options));
}

const create = async (user) => {
    let newUser = { id: ++currentId };
    if (user.email && /.*@.*/.test(user.email)) {
        newUser.email = user.email;
    } else {
        throw new Error("Email format not valid");
    }
    if(user.password){
        newUser.password = user.password;
    }else{
        throw new Error("Password format not valid");
    }
    listUser.push(newUser);
    fs.writeFileSync(USER_FILE, JSON.stringify(listUser));
    return newUser;
}

const updateOne = async (updatedData,options) => {
    let user = await findOne(options);
    if(updatedData.email){
        if (!/.*@.*/.test(updatedData.email)) {
            throw new Error("Email format not valid");
        }
        user.email = updatedData.email;
    }
    if(updatedData.password){
        user.password = updatedData.password;
    }
    fs.writeFileSync(USER_FILE, JSON.stringify(listUser));
}

const destroy = async (options) => {
    if (!options.where && listUser.length > 0) {
        return 0;
    }
    let count = listUser.length;
    listUser = listUser.filter(user => !checkWhereClause(user, options));
    fs.writeFileSync(USER_FILE, JSON.stringify(listUser));
    return count - listUser.length;
}

const checkWhereClause = (user, options) => {
    for (let [field, value] of Object.entries(options.where)) {
        if (typeof user[field] === 'number') {
            value = parseInt(value);
        }
        if (user[field] !== value) {
            return false;
        }
    }
    return true;
}

module.exports = { findAll, findOne, create, updateOne, destroy };