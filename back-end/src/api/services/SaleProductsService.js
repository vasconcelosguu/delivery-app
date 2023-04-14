const { saleProducts } = require('../../database/models');

const getSaleProductService = async (req) => {
    const { saleProduct } = req.body;
    try {
        const SalesProducts = await saleProducts.findAll({ where: { saleId: saleProduct } });
        return SalesProducts;
    } catch (error) {
        console.log(error);
    }
};

const createSaleProductsService = async (body) => {
    const { saleId, productId, quantity } = body;
    const saleProductsInfo = {
        saleId,
        productId,
        quantity,
    }; 
    try {
        const newSaleProducts = await saleProducts.create({ ...saleProductsInfo });
         await newSaleProducts.save();
        return newSaleProducts;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getSaleProductService, createSaleProductsService };