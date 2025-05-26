exports.checkRole = (role) => {
    return (req, res, next) => {
        if(!req.payload.roles.some(r => r.name === role)){
            res.status(403).json({error: "Vous n'avez pas les droits pour réaliser cette action"})
        }
        next();
    }
}