const { productsAllService, productIdService } = require('../services/ProductsService');

 const productsAllController = async (req, res) => {
        const products = await productsAllService(req, res);
        if (!products) return res.status(404).json({ message: 'Couldnt get products' });
        return res.status(200).json(products);
    };

const productsIdController = async (req, res) => {
    const { id } = req.params;
    const product = await productIdService(id);
    if (!product) return res.status(404).json({ message: 'Couldnt get products' });
    return res.status(200).json(product);
};

module.exports = { productsAllController, productsIdController };