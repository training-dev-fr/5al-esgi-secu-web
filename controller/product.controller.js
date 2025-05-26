const Product = require('./../model/product.schema.js');
const bcrypt = require('bcryptjs');


const getAll = async (req, res) => {
    try {
        let result = await Product.findAll();
        if (result.length === 0) {
            return res.status(204).json();
        }
        return res.status(200).json(result.map(product => {
            return {
                id: product.id,
                name: product.name,
                price: product.price
            }
        }));
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const getById = async (req, res) => {
    try {
        let product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!product) {
            return res.status(204).json();
        }
        return res.status(200).json({
            id: product.id,
            name: product.name,
            price: product.price
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const create = async (req, res) => {
    try {
        let product = await Product.create(req.body);
        return res.status(201).json({
            id: product.id,
            name: product.name,
            price: product.price
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const update = async (req, res) => {
    try {
        let updatedproduct = {};

        const product = await Product.updateOne(updatedproduct, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json(product);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

const remove = async (req, res) => {
    const result = await Product.destroy({
        where: {
            id: req.params.id
        }
    });
    if (result === 1) {
        return res.status(204).json();
    } else if (result > 1) {
        return res.status(500).json({ error: "Erreur lors de la suppression" });
    } else {
        return res.status(404).json({ error: "Product not found" });
    }
}

module.exports = { getAll, getById, create, update, remove };