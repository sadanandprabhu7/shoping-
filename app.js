const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { debugPort } = require('process');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


// to create by defaul table products using sequelize
// if present, not overwrite , if not present make one by defaults gives name procducts because we defined objec as product
// and then start server 
sequelize.sync().then(result =>{
    //console.log(result);
    app.listen(3000);

}).catch(err=>{
    console.log(err);
})


