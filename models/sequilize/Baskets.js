module.exports = function(sequilize, DataTypes){
    const Baskets = sequilize.define(`Baskets`,{
        basketId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId:{
            type: DataTypes.INTEGER ,
            allowNull: false,
        },
        isCompleted:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false,
        },
        isSent:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false,
        },
        trackingCode:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        isPaid:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false,
        },
        discount:{
            type: DataTypes.INTEGER ,
            allowNull: true,
        },
    },
    {},
    {
        freezeTableName: true
    });
    return Baskets;
}