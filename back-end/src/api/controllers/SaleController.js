const {
  createSalesService,
  getUserSalesService,
  getSaleById,
  getUserSalesSellerService,
  salesStatusService,
} = require('../services/SalesService');

 const salesCreateController = async (req, res) => {
    console.log(req.headers);
        const sale = await createSalesService(req, res);
        return res.status(201).json({ sale });
    };
const salesGetController = async (req, res) => {
    console.log(req);
    const sales = await getUserSalesService(req);
    return res.status(200).json({ sales });
};

const getSaleByIdController = async (req, res) => {
  const { id } = req.params;
  const sale = await getSaleById(id);
  return res.status(200).json(sale);
};

const salesGetSellerController = async (req, res) => {
  const salesSeller = await getUserSalesSellerService(req);
  return res.status(200).json({ salesSeller });
};

const salesStatusController = async (req, res) => {
  const saleUpdate = await salesStatusService(req);
  return res.status(200).json({ saleUpdate });
};

module.exports = {
  salesCreateController,
  salesGetController,
  getSaleByIdController,
  salesGetSellerController,
  salesStatusController,
};
