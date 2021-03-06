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
    
    app.get(`/api/basket/:id`, function(req, res){
        const basketId = req.params.id;
        if (basketId){
            db.Baskets.findAll({
                    where: {
                        userId: basketId,
                        isPaid: false,
                }})
                .then(result => {
                res.status( 200 ).json(result);
                })
                .catch(err => {
                    res.json(err);
                });
        }
    });

    app.get(`/api/basket`, function (req,res){
        db.Baskets.findAll().then( result =>{
            res.status(200).json(result);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get(`/api/basket/customer/:id`, function (req,res){
        const customerId = req.params.id;
        db.Baskets.findAll({
            where: {
                userId: customerId
            }
        })
            .then(res => res.json())
        res.end()
    })
  
    app.put(`/api/basket/:id`, function(req,res){
        const basketId = req.params.id;
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

    app.put(`/api/basket/sent/:id`, function(req,res){
        const basketId = req.params.id;
        const trackingCode = req.params.trackingCode;
        db.Baskets.update(
            {
                isSent: true,
                trackingCode: trackingCode,
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

    app.put(`/api/basket/paid/:id`, function(req,res){
        const basketId = req.params.id;
        db.Baskets.update(
            {
                isPaid: true,
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

    app.put(`/api/basket/delivered/:id`, function(req,res){
        const basketId = req.params.id;
        db.Baskets.update(
            {
                isCompleted: true,
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