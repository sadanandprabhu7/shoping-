const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

/// this is the logic to create product using model which we have define in models product.js
// this is admin/add-product page
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
 // const product = new Product(null, title, imageUrl, description, price);
//***** start using sequelize */
req.user
.createProduct({
  title:title,
  price:price,
  imageUrl:imageUrl,
  description:description
})
.then(result=>{
  res.redirect('/admin/products');
  console.log('product created');
}).catch(err=>{
  console.log(err)
})

//***** end using sequelize */

  // product.save().then(()=>{
  //   res.redirect('/');
  // }).catch(err=>{
  //   console.log(err)
  // })
 
};



/// for edit items in admin product page with sequelize databse 
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
  .getProducts({where:{id:prodId}})
  //Product.findByPk(prodId)
  .then(products=>{
    const product =products[0]
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });

  }).catch(err=>{
    console.log(err)
  })

};
///after editing this is save method below
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId).then(product=>{
    product.title=updatedTitle;
    product.price=updatedPrice;
    product.description=updatedDesc;
    product.imageUrl=updatedImageUrl;
    return product.save()
  })
 .then(()=>{
    res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err)
  });
  
};



/// this is for admin page Admin products
// to show products with delete and edit button
exports.getProducts = (req, res, next) => {
req.user
.getProducts()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err=>{
    console.log(err);
  })
 
};



exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then((product)=>{
        return product.destroy();
   
  })
  .then(()=>{
    console.log('product destroyed')
    res.redirect('/admin/products');
  })
  .catch((err)=>{
    console.log(err)
  });
 
};
