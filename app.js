const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItems = require('./models/cart-item')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { debugPort } = require('process');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>{
        console.log(err)
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);



/// here we have defined realtion in database between these two models
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})// IF USER IS DELETE ALL PRODUCTS RELETED TO IT IS DELETED
User.hasMany(Product);
// to create by defaul table products using sequelize
// if present, not overwrite , if not present make one by defaults gives name procducts because we defined objec as product
// and then start server 
User.hasOne(Cart) // user has one cart
Cart.belongsTo(User)// same thing cart as above user have one cart
Cart.belongsToMany(Product,{through:CartItems})
Product.belongsToMany(Cart,{through:CartItems})
sequelize
//.sync({force:true})
.sync()
.then(result =>{

    return User.findByPk(1)
    //console.log(result);
   

})
.then(user=>{
    if(!user){
        return User.create({name:'max',email:"test@gmail.com"})
    }
    return user;
})
.then(user=>{
    //console.log(user)
    return user.createCart();
   
})
.then(cart=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})


