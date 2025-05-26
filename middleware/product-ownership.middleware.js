const Product = require("../model/product.schema");

exports.productOwnerShip = async (req,res,next) => {
    if(!req.params.id){
        res.status(404).json({error : "Il n'y a pas de produit spécifié"});
    }
    let product = await Product.findOne({where: {id: req.params.id}});
    if(product.userId !== req.payload.id){
        res.status(403).json({error : "Vous n'avez pas les droits sur ce produit"});
    }
    next();
}