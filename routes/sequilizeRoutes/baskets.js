const db = require(`../../models/sequilize/index`)
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app){
    
    app.post(`/api/basket/new`, function(req,res){
        const newBasket = req.body;
        db.Baskets.create({
            userId: newBasket.userId,
            isCompleted: newBasket.isCompleted,
            isSent: newBasket.isSent,
            trackingCode: newBasket.trackingCode,
            isPaid: newBasket.isPaid,
            discount: newBasket.discount,
            })
            .then(res.json())
        res.end();
    })
    
    app.get(`/api/Basket/:id`, function(req, res){
        const basketId = req.params.id;
        if (basketId){
            db.Answers.findAll({
                    where: {
                        basketId: basketId
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

    app.get(`/api/Basket`, function (req,res){
        db.Baskets.findAll().then( result =>{
            res.status(200).json(result);
            })
            .catch(err => {
                res.json(err);
            });
    });
  
    app.put(`/api/basket/:id`, function(req,res){
        const basketId = req.params.id
        const newBasket = req.body;
        db.Baskets.update(
                {
                    userId: newBasket.userId,
                    isCompleted: newBasket.isCompleted,
                    isSent: newBasket.isSent,
                    trackingCode: newBasket.trackingCode,
                    isPaid: newBasket.isPaid,
                    discount: newBasket.discount,
                },
                {
                    where: {
                        basketId: basketId
                    }
                }
            )
            .then(res.json())
        res.end();
    })
};