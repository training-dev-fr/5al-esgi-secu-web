const User = require('./../model/user.schema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return req.status(400).json({
                error: "Vous devez préciser un email et un mot de passe"
            });
        }
        if (!/(.*)@(.*)/.test(req.body.email)) {
            return req.status(400).json({
                error: "Vous devez préciser un email au bon format"
            });
        }
        let user = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });
        return req.status(201).json({
            id: user.id,
            email: user.email
        });

    } catch (e) {
        return res.status(400).json({ error: "Erreur lors de l'inscription" });
    }
}

const login = () => {
    if (!req.body.email || !req.body.password) {
        return req.status(400).json({
            error: "Vous devez préciser un email et un mot de passe"
        });
    }
    let user = User.findOne({where: {email: req.body.email}});
    if(!user){
        if (!req.body.email || !req.body.password) {
            return req.status(400).json({
                error: "Email ou mot de passe incorrect"
            });
        }
    }
    if(!bcrypt.compareSync(req.body.password,user.password)){
        if (!req.body.email || !req.body.password) {
            return req.status(400).json({
                error: "Email ou mot de passe incorrect"
            });
        }
    }
    return res.status(200).json({
        id: user.id,
        email: user.email,
        token: jwt.sign({
            id: user.id,
            roles: user.roles
        },process.env.JWT_KEY)
    });
}

module.exports = { signin, login };