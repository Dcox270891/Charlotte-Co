const db = require(`../../models/sequilize/index`)
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app){
    
    app.post(`/api/Basketrow/new`, function(req,res){
        const newBasketRow = req.body;
        db.BasketRows.create({
            basketId: newBasketRow.basketId,
            userId: newBasketRow.userId,
            productId: newBasketRow.productId,
            productTitle: newBasketRow.productTitle,
            transferId: newBasketRow.transferId,
            transferTitle: newBasketRow.transferTitle,
            size: newBasketRow.size,
            productColor: newBasketRow.productColor,
            transferTextStyle: newBasketRow.transferTextStyle,
            transferText: newBasketRow.transferText,
            transferTextColor: newBasketRow.transferTextColor,
            quantity: newBasketRow.quantity,
            price: newBasketRow.price,
            })
            .then(res.json())
        res.end();
    })
    
    app.get(`/api/Basketrow/:id`, function(req, res){
        const basketRowId = req.params.id;
        if (basketRowId){
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

    app.get(`/api/BasketRows`, function (req,res){
        db.BasketRows.findAll().then( result =>{
            res.status(200).json(result);
            })
            .catch(err => {
                res.json(err);
            });
    });
  
    app.put(`/api/Basketrow/:id`, function(req,res){
        const basketRowId = req.params.id
        const newBasketRow = req.body;
        db.BasketRows.update(
                {
                    basketId: newBasketRow.basketId,
                    userId: newBasketRow.userId,
                    productId: newBasketRow.productId,
                    productTitle: newBasketRow.productTitle,
                    transferId: newBasketRow.transferId,
                    transferTitle: newBasketRow.transferTitle,
                    size: newBasketRow.size,
                    productColor: newBasketRow.productColor,
                    transferTextStyle: newBasketRow.transferTextStyle,
                    transferText: newBasketRow.transferText,
                    transferTextColor: newBasketRow.transferTextColor,
                    quantity: newBasketRow.quantity,
                    price: newBasketRow.price,
                },
                {
                    where: {
                        basketRowId: basketRowId
                    }
                }
            )
            .then(res.json())
        res.end();
    })

    app.delete(`/api/Basketrow/:id`, function(req,res){
        const basketRowId = req.params.id
        db.BasketRows.delete(
                {
                    where: {
                        basketRowId: basketRowId
                    }
                }
            )
            .then(res.json())
        res.end()
    })
};