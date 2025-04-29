const Role = require('./../model/role.schema.js');
const bcrypt = require('bcryptjs');


const getAll = async (req, res) => {
    try {
        let result = await Role.findAll();
        if (result.length === 0) {
            return res.status(204).json();
        }
        return res.status(200).json(result.map(role => {
            return {
                id: role.id,
                email: role.email
            }
        }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const getById = async (req, res) => {
    try {
        let role = await Role.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!role) {
            return res.status(204).json();
        }
        return res.status(200).json({
            id: role.id,
            email: role.email
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const create = async (req, res) => {
    try {
        let role = await Role.create(req.body);
        return res.status(201).json({
            id: role.id,
            name: role.name
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const update = async (req, res) => {
    try {
        const role = await Role.updateOne(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json(role);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const remove = async (req, res) => {
    const result = await Role.destroy({
        where: {
            id: req.params.id
        }
    });
    if(result === 1){
        return res.status(204).json();
    }else if(result > 1){
        return res.status(500).json({error: "Erreur lors de la suppression"});
    }else{
        return res.status(404).json({error: "Role not found"});
    }
}

module.exports = { getAll, getById, create, update, remove };