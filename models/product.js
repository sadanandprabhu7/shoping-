 //***********************************//

const db=require('../util/database');
  //***********************************//

//work with file system codes///////////////////////

// const fs = require('fs');
// const path = require('path');

//work with file system codes//////////////////////


const Cart = require('./cart');
//work with file system codes//////////////////////
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

//work with file system codes//////////////////////

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

//work with file system codes//////////////////////

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  //work with file system codes//////////////////////

  // save() {
  //   getProductsFromFile(products => {
  //     if (this.id) {
  //       const existingProductIndex = products.findIndex(
  //         prod => prod.id === this.id
  //       );
  //       const updatedProducts = [...products];
  //       updatedProducts[existingProductIndex] = this;
  //       fs.writeFile(p, JSON.stringify(updatedProducts), err => {
  //         console.log(err);
  //       });
  //     } else {
  //       this.id = Math.random().toString();
  //       products.push(this);
  //       fs.writeFile(p, JSON.stringify(products), err => {
  //         console.log(err);
  //       });
  //     }
  //   });
  // }

//***********************************//
  // working with database for saving through add product

  save()
  {
   return db.execute('INSERT INTO products (title,price,imageUrl,description) VALUES (?,?,?,?)',
    [this.title,this.price,this.imageUrl,this.description])
  }


  //work with file system codes//////////////////////

  // static deleteById(id) {
  //   getProductsFromFile(products => {
  //     const product = products.find(prod => prod.id === id);
  //     const updatedProducts = products.filter(prod => prod.id !== id);
  //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
  //       if (!err) {
  //         Cart.deleteProduct(id, product.price);
  //       }
  //     });
  //   });
  // }

    //***********************************//
  // working with database for delete item
  static deleteById(id) {
   return db.execute('DELETE FROM products WHERE products.id=?',[id])
  }





  // static fetchAll(cb) {
  //   getProductsFromFile(cb);
  // }

  //***********************************//
  // working with database for fetchAll

    static fetchAll()
    {
        return db.execute('SELECT * FROM products');
    }
  
 //***********************************//
  //work with file system codes//////////////////////

  // static findById(id, cb) {
  //   getProductsFromFile(products => {
  //     const product = products.find(p => p.id === id);
  //     cb(product);
  //   });
  // }
  //work with file system codes//////////////////////


//***********************************//
  // working with database for fetchbyid
  /// to see details of the product from product page
   static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id =?',[id])
  }

};
