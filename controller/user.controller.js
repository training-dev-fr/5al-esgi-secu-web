let User = require('./../model/user.model.js');

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

const create = async (req, res) => {
    try {
        let user = await User.create(req.body);
        return res.status(201).json({
            id: user.id,
            email: user.email
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

module.exports = { getAll, create };