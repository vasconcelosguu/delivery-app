module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      sellerId: { type: DataTypes.INTEGER, foreignKey: true },
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING(100),
      deliveryNumber: DataTypes.STRING(50),
      saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      status: { type: DataTypes.STRING(50) },
    },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    },
  );
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
  };
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'sellers' });
  };
  return Sale;
};
