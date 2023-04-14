module.exports = (sequelize, DataTypes) => {
  const saleProducts = sequelize.define(
    'saleProducts',
    {
      saleId: { type: DataTypes.INTEGER, foreignKey: true },
      productId: { type: DataTypes.INTEGER, foreignKey: true },
      quantity: { type: DataTypes.INTEGER },
    },
    {
      timestamps: false,
      tableName: 'sales_products',
      underscored: true,
    },
  );
  saleProducts.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: saleProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: saleProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };
  return saleProducts;
};
