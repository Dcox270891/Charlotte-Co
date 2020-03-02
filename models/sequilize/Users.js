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
        classMethods: {
            validPassword: function(password, passw, done, user){
                bcrypt.compare(password, passw, done, user, function(err, isMatch){
                    if (err) throw err;
                    if (isMatch){
                        return done (null, user)
                    } else {
                        return done (null, false)
                    }
                });
            }
        }
    },
    {
        freezeTableName: true
    });
    Users.beforeCreate(function(user, options){
        const salt = bcrypt.genSalt(SATLT_WORK_FACTOR, function (err, salt){
            return salt
        });
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) return next(err);
            user.password = hash;
            return (null, user)
        });
    })
    return Users;
};