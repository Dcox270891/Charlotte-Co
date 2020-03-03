const bcrypt = require("bcrypt-nodejs");
const SATLT_WORK_FACTOR = 12;

module.exports = function(sequilize, DataTypes){
    const Users = sequilize.define(`Users`,{
        userId: {
            type: DataTypes.INTEGER ,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type:  DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
            },
        },
        houseNameOrNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        county: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        postCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, 
    {
        
    },
    {
        freezeTableName: true
    });
    Users.prototype.validPassword = function(password) {
            return bcrypt.compareSync(password, this.password);
        };
    Users.addHook("beforeCreate", function(user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        });
        return Users;
};