exports.IsAuthenticated = function(req, res, next){
    if(req.IsAuthenticated()){
        next();
    } else {
        next(new Error(401));
    }
};

exports.destroySession = function(req, res, next){
    req.logOut();
    req.session.destroy();
    res.redirect("/")
};

module.exports = function(app){
    
    app.get("/", routes.index)
    app.get("/home", application.IsAuthenticated, home.homepage)
    app.post("/authenticate", 
        passport.authenticate("local", {
            successRedirect: "/home",
            failureRedirect: "/"
        })
    )
    app.get("/logout", application.destroySession)
    app.get("/signup", users.signUp)
    app.post("/register", user.register)
}


// unsure where this code needs to go
const passport = require(`passport`);
const LocalStratergy = require(`passport-local`).Stratergy;
const db = require(`./models/sequilize/index`);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    db.Users.find({
        where: {
            userId: user.userId
        }
        .success(function (user) {
            done(null, user);
        })
        .error(function(err){
            done(err, null)
        })
    });
});

passport.use(new LocalStratergy(
    function(email, password, done){
        db.Users.find({
            where: {
                email: email
            }
        })
        .success(function(user){
            passwd = user? user.password : ""
            isMatch = db.Users.validPassword(password, passwd, done, user)
        });
    }
))