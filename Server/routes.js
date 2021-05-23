const express = require('express');
const router = express.Router();
const passport = require('passport');
const nodemailer = require('nodemailer');

const mongoose = require('mongoose');
const userModel = mongoose.model('user');
const productsModel = mongoose.model('products');
const drinksModel = mongoose.model('drinks');
const basketModel = mongoose.model('basket');
const ordersModel = mongoose.model('orders');


function checkAuthUser(req,res,next){
    if(req.isAuthenticated() && (req.user.accessLevel === "basic" || req.user.accessLevel === "admin")){
        next();
    } else{
        res.redirect("/login");
    }
}

function checkAuthAdmin(req,res,next){
    if(req.isAuthenticated() && req.user.accessLevel === "admin"){
        next();
    } else{
        res.redirect("/login");
    }
}

router.route('/login').post((req, res, next) => {
    if(req.body.username, req.body.password) {
        passport.authenticate('local', function(error, user) {
            if(error) return res.status(500).send(error);
            req.login(user, function(error) {
                if(error) return res.status(500).send(error);
                return res.status(200).send('Bejelentkezes sikeres');
            })
        })(req, res);
    } else {
        return res.status(400).send('Hibas keres, username es password kell');
    }
});

router.route('/logout').post((req, res, next) => {
    if(req.isAuthenticated()) {
        req.logout();
        return res.status(200).send('Kijelentkezes sikeres');
    } else {
        return res.status(403).send('Nem is volt bejelentkezve');
    }
})

router.route('/active_user').get((req, res, next) => {
    if(!req.user)
    {
        return res.status(200).send('');  
    }else
    {
        return res.status(200).send({username: req.user.username, accessLevel: req.user.accessLevel});  
    }
})

router.route('/status').get((req, res, next) => {
    if(req.isAuthenticated()) {
        return res.status(200).send(req.session.passport);
    } else {
        return res.status(403).send('Nem is volt bejelentkezve');
    }
    
})

router.route('/user').get(checkAuthUser, (req, res, next) => {
    userModel.findOne({username: req.user.username}, (err, users) => {
        if(err) return res.status(500).send('DB hiba');
        res.status(200).send(users);
   
    })
}).post(checkAuthAdmin, (req, res, next) => {
    if(req.body.username && req.body.email && req.body.password && req.body.accessLevel) {
        userModel.findOne({username: req.body.username}, (err, user) => {
            if(err) return res.status(500).send('DB hiba');
            if(user) {
                return res.status(400).send('Hiba, mar letezik ilyen felhasznalonev');
            }
            const usr = new userModel({username: req.body.username, password: req.body.password, 
                email: req.body.email, accessLevel: req.body.accessLevel});
            usr.save((error) => {
                if(error) return res.status(500).send('A mentés során hiba történt');
                return res.status(200).send('Sikeres mentes tortent');
            })
        })
    } else {
        return res.status(400).send('Hibas keres, username, email es password kell');
    }
}).delete(checkAuthAdmin, (req, res, next) => {
    if(req.body.username) {
        userModel.findOne({username: req.body.username}, (err, user) => {
            if(err) return res.status(500).send('DB hiba');
            if(user) {
               user.delete((error) => {
                    if(error) return res.status(500).send('A mentés során hiba történt');
                    return res.status(200).send('Sikeres torles tortent');
                })
            } else {
                return res.status(400).send('Nincs ilyen id az adatbázisban');
            }
        })
    } else {
        return res.status(400).send('Nem volt id');
    }
})


router.route('/product').get(checkAuthUser, (req, res, next) => {
    productsModel.find({}, (err, product) => {
        if(err) return res.status(500).send('DB hiba');
        res.status(200).send(product);
    })
    console.log(req.user.accessLevel);
}).post(checkAuthAdmin, (req, res, next) => {
    if(req.body.id && req.body.price && req.body.quantity) {
        productsModel.findOne({id: req.body.id}, (err, product) => {
            if(err) return res.status(500).send('DB hiba');
            if(product) {
                return res.status(400).send('már van ilyen id');
            } else {
                const product = new productsModel({id: req.body.id, price: req.body.price, quantity: req.body.quantity});
                product.save((error) => {
                    if(error) return res.status(500).send('A mentés során hiba történt');
                    return res.status(200).send('Sikeres mentes tortent');
                })
            }
        })
    } else {
        return res.status(400).send('Nem volt id vagy price vagy quantity');
    }
}).put(checkAuthUser, (req, res, next) => {
    if(req.body.id && req.body.price && req.body.quantity) {
        productsModel.findOne({id: req.body.id}, (err, product) => {
            if(err) return res.status(500).send('DB hiba');
            if(product) {
                if(req.user.accessLevel === 'admin')
                {
                    product.price = req.body.price;
                }
                else
                {
                    product.price = product.price; 
                }
                product.quantity = req.body.quantity;
                product.save((error) => {
                    if(error) return res.status(500).send('A mentés során hiba történt');
                    return res.status(200).send('Sikeres mentes tortent');
                })
            } else {
                return res.status(400).send('Nincs ilyen id az adatbázisban');
            }
        })
    } else {
        return res.status(400).send('Nem volt id vagy value');
    }
}).delete(checkAuthAdmin, (req, res, next) => {
    if(req.body.id) {
        productsModel.findOne({id: req.body.id}, (err, product) => {
            if(err) return res.status(500).send('DB hiba');
            if(product) {
                product.delete((error) => {
                    if(error) return res.status(500).send('A mentés során hiba történt');
                    return res.status(200).send('Sikeres torles tortent');
                })
            } else {
                return res.status(400).send('Nincs ilyen id az adatbázisban');
            }
        })
    } else {
        return res.status(400).send('Nem volt id');
    }
})

router.route('/drink').get(checkAuthUser, (req, res, next) => {
    drinksModel.find({}, (err, drink) => {
        if(err) return res.status(500).send('DB hiba');
        res.status(200).send(drink);
    })
}).post(checkAuthAdmin, (req, res, next) => {
    if(req.body.id && req.body.price && req.body.quantity) {
        drinksModel.findOne({id: req.body.id}, (err, drink) => {
            if(err) return res.status(500).send('DB hiba');
            if(drink) {
                return res.status(400).send('már van ilyen id');
            } else {
                const drink = new drinksModel({id: req.body.id, price: req.body.price, quantity: req.body.quantity});
                drink.save((error) => {
                    if(error) return res.status(500).send('A mentés során hiba történt');
                    return res.status(200).send('Sikeres mentes tortent');
                })
            }
        })
    } else {
        return res.status(400).send('Nem volt id vagy price vagy quantity');
    }
}).put(checkAuthUser, (req, res, next) => {
    if(req.body.id && req.body.price && req.body.quantity) {
        drinksModel.findOne({id: req.body.id}, (err, drink) => {
            if(err) return res.status(500).send('DB hiba');
            if(drink) {
                if(req.user.accessLevel === 'admin')
                {
                    drink.price = req.body.price;
                }else
                {
                    drink.price = drink.price; 
                }
                drink.quantity = req.body.quantity;
                drink.save((error) => {
                    if(error) return res.status(500).send('A mentés során hiba történt');
                    return res.status(200).send('Sikeres mentes tortent');
                })
            } else {
                return res.status(400).send('Nincs ilyen id az adatbázisban');
            }
        })
    } else {
        return res.status(400).send('Nem volt id vagy value');
    }
}).delete(checkAuthAdmin, (req, res, next) => {
    if(req.body.id) {
        drinksModel.findOne({id: req.body.id}, (err, drink) => {
            if(err) return res.status(500).send('DB hiba');
            if(drink) {
                drink.delete((error) => {
                    if(error) return res.status(500).send('A mentés során hiba történt');
                    return res.status(200).send('Sikeres torles tortent');
                })
            } else {
                return res.status(400).send('Nincs ilyen id az adatbázisban');
            }
        })
    } else {
        return res.status(400).send('Nem volt id');
    }
})

router.route('/basket').get(checkAuthUser, (req, res, next) => {
    basketModel.findOne({user: req.user.username}, (err, basket) => {
        if(err) return res.status(500).send('DB hiba');
        res.status(200).send(basket);
    })
}).post(checkAuthUser, (req, res, next) => {
    if(req.body.user && req.body.products) {
        basketModel.findOne({user: req.body.user}, (err, basket) => {
            if(err) return res.status(500).send('DB hiba');
            if(basket) {
                return res.status(400).send('már van ilyen id');
            } else {
                const basket = new basketModel({user: req.body.user, products: req.body.products});
                basket.save((error) => {
                    if(error) return res.status(500).send('A mentés során hiba történt');
                    return res.status(200).send('Sikeres mentes tortent');
                })
            }
        })
    } else {
        return res.status(400).send('Nem volt user vagy products');
    }
}).put(checkAuthUser, (req, res, next) => {
    if(req.body.user && req.body.products) {
        basketModel.findOne({user: req.body.user}, (err, basket) => {
            if(err) return res.status(500).send('DB hiba');
            if(basket) {
                basket.user = req.body.user;
                basket.products = req.body.products;
                basket.save((error) => {
                    if(error) return res.status(500).send('A mentés során hiba történt');
                    return res.status(200).send('Sikeres mentes tortent');
                })
            } else {
                return res.status(400).send('Nincs ilyen id az adatbázisban');
            }
        })
    } else {
        return res.status(400).send('Nem volt user');
    }
}).delete(checkAuthUser, (req, res, next) => {
    if(req.body.user) {
        basketModel.findOne({user: req.body.user}, (err, basket) => {
            if(err) return res.status(500).send('DB hiba');
            if(basket) {
                basket.delete((error) => {
                    if(error) return res.status(500).send('A mentés során hiba történt');
                    return res.status(200).send('Sikeres torles tortent');
                })
            } else {
                return res.status(400).send('Nincs ilyen user az adatbázisban');
            }
        })
    } else {
        return res.status(400).send('Nem volt user');
    }
})

router.route('/order').get(checkAuthAdmin, (req, res, next) => {
    ordersModel.find({}, (err, order) => {
        if(err) return res.status(500).send('DB hiba');
        res.status(200).send(order);
    })
}).post(checkAuthUser, (req, res, next) => {
    if(req.body.user && req.body.date && req.body.products) {
        const order = new ordersModel({user: req.body.user, date: req.body.date, products: req.body.products});
        order.save((error) => {
            if(error) return res.status(500).send('A mentés során hiba történt');
            return res.status(200).send('Sikeres mentes tortent');
        })   
    } else {
        return res.status(400).send('Nem volt user vagy date vagy products');
    }
})

router.route('/email').post(checkAuthUser, (req, res, next) => {
    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
           ciphers:'SSLv3'
        },
        auth: {
            user: 'test2021@outlook.hu',
            pass: 'testmail2021'
        }
    });

    var product_list = "A választott termékek:\n\n";
    var final_price = 0;
    req.body.products.forEach(element => {
        product_list += element.id + " " + element.price + "Ft\n";
        final_price += parseInt(element.price);
    });
    
    var mailOptions = {
        from: 'test2021@outlook.hu',
        to: req.body.email,
        subject: 'Matthew\'s Pizzeria ',
        text: 'Kedves ' + req.body.username + '!\n\nRendelését rögzítettük, a kiszállítás hamarosan megtörténik!\n\n' + product_list + 
        '\n\nÖsszesen: ' + final_price + ' Ft\n\nÜdvözlettel: Matthew\'s Pizzeria!',
    };
    transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return res.status(400).send('Email hiba');
            }else{
                return res.status(200).send('Sikeres email kuldes');
            }
    });        

})

module.exports = router;