const User = require('./../model/user.model.js');
const bcrypt = require('bcryptjs');


const getAll = async (req, res) => {
    try {
        let result = await User.findAll();
        if (result.length === 0) {
            return res.status(204).json();
        }
        return res.status(200).json(result.map(user => {
            return {
                id: user.id,
                email: user.email
            }
        }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const getById = async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!user) {
            return res.status(204).json();
        }
        return res.status(200).json({
            id: user.id,
            email: user.email
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const create = async (req, res) => {
    try {
        let user = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });
        return res.status(201).json({
            id: user.id,
            email: user.email
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const update = async (req, res) => {
    try {
        let updateduser = {};
        if (req.body.email) {
            updateduser.email = req.body.email;
        }
        if (req.body.password) {
            updateduser.password = bcrypt.hashSync(req.body.password, 10);
        }
        const user = await User.updateOne(updateduser, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const remove = async (req, res) => {
    const result = await User.destroy({
        where: {
            id: req.params.id
        }
    });
    if(result === 1){
        return res.status(204).json();
    }else if(result > 1){
        return res.status(500).json({error: "Erreur lors de la suppression"});
    }else{
        return res.status(404).json({error: "User not found"});
    }
}

module.exports = { getAll, getById, create, update, remove };