const db = require(`../../models/sequilize/index`)
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app){
    
    app.post(`/api/Users/new`, function(req,res){
        const newUser = req.body;
        db.Users.create({
            userId: newUser.userId,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            houseNameOrNumber: newUser.houseNameOrNumber,
            street: newUser.street,
            city: newUser.city,
            county: newUser.county,
            postCode: newUser.postCode,
            })
            .then(console.log(newUser))
        res.end();
    })
    
    app.get(`/api/Users/:id`, function(req, res){
        const userId = req.params.id;
        if (userId){
            db.Answers.findAll({
                    where: {
                        userId: userId
                    }
                })
                .then(result => {
                res.status( 200 ).json(result);
                })
                .catch(err => {
                    res.json(err);
                });
        }
    });

    app.get(`/api/Users`, function (req,res){
        db.Users.findAll().then( result =>{
            res.status(200).json(result);
            })
            .catch(err => {
                res.json(err);
            });
    });
};