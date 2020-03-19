module.exports = function(sequilize, DataTypes){
    const BasketRows = sequilize.define(`Baskets`,{
        basketRowId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        basketId:{
            type: DataTypes.INTEGER ,
            allowNull: false,
        },
        userId:{
            type: DataTypes.INTEGER ,
            allowNull: false,
        },
        productId:{
            type: DataTypes.STRING ,
            allowNull: false,
        },
        productTitle:{
            type: DataTypes.STRING ,
            allowNull: false,
        },
        transferId:{
            type: DataTypes.STRING ,
            allowNull: false,
        },
        transferTitle:{
            type: DataTypes.STRING ,
            allowNull: false,
        },
        size:{
            type: DataTypes.STRING ,
            allowNull: false,
        },
        productColor:{
            type: DataTypes.STRING ,
            allowNull: false,
        },
        transferTextStyle:{
            type: DataTypes.STRING ,
            allowNull: true,
        },
        transferText:{
            type: DataTypes.STRING ,
            allowNull: true,
        },
        transferTextColor:{
            type: DataTypes.STRING ,
            allowNull: true,
        },
        quantity:{
            type: DataTypes.INTEGER ,
            allowNull: false,
        },
        price:{
            type: DataTypes.INTEGER ,
            allowNull: false,
        }
    },
    {},
    {
        freezeTableName: true
    });
    return BasketRows;
}