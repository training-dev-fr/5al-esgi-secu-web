let listUser = require('./../data/user.json');
const fs = require('fs');
const USER_FILE = './data/user.json';
let currentId = listUser.length > 0 ? Math.max(...listUser.map(u => u.id)) : 0;

const findAll = async () => {
    return listUser;
}

const findOne = async () => {

}

const create = async (user) => {
    let newUser = {id : ++currentId, ...user};
    listUser.push(newUser);
    fs.writeFileSync(USER_FILE, JSON.stringify(listUser));
    return newUser;
}

const updateOne = async () => {

}

const destroy = async () => {

}

module.exports = { findAll, findOne, create, updateOne, destroy };