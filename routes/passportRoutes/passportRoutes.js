var db = require("../../models/sequilize/index");
var passport = require("../../config/passport");

module.exports = function(app) {
    app.post("/api/user/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    app.post("/api/user/signup", function(req, res) {
        console.log(req.body);
        const newUser = req.body;
        db.Users.create({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: newUser.password,
                houseNameOrNumber: newUser.houseNameOrNumber,
                street: newUser.street,
                city: newUser.city,
                county: newUser.county,
                postCode: newUser.postCode,
            })
            .then(function() {
                res.redirect(307, "/api/user/login");
            })
            .catch(function(err) {
                res.status(401).json(err);
            });
    })

    app.get("/user/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            res.json({});
        }
        else {
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });
};