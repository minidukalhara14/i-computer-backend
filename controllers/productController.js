import Product from "../models/product.js";
import isAdmin from "./userController.js";

export  async function createProduct(req, res) {


   if(!isAdmin(req)){

        res.status(403).json({
            message : "Access Denied. Admins Only."
        })
        return
   }

    try{

        const existingProduct = await Product.findOne({
            productId : req.body.productId
        })

        if(existingProduct != null){
            res.status(400).json({
                message : "Product with this ID already exists"
            })
            return
        }

        const newProduct = new Product({
            productId : req.body.productId,
            name : req.body.name,
            altName : req.body.altName,
            price : req.body.price,
            labelledPrice : req.body.labelledPrice,
            description : req.body.description,
            images : req.body.images,
            brand : req.body.brand,
            model : req.body.model,
            category : req.body.category,
            stock : req.body.stock

        })

        await newProduct.save()

        res.status(201).json({
            message : "Product Created Successfully"
        })


    }catch(error){
        res.status(500).json({
            message : "Error while creating product"
        })
    }

}

export async function getAllProducts(req, res) {
    try{
        if(!isAdmin(req)){ 
            const products = await Product.find();

            res.status(200).json(products);

        }else {
            const products = await Product.find({isAvailable : true});
            res.status(200).json(products);
        }
        
        
      

    }catch(error){
        res.status(500).json({
            message : "Error while fetching products"
        })
    }
}

export async function deleteProduct(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Access Denied. Admins Only."
        });
        return;
    }

    try{

        await Product.deleteOne({
            productId : req.params.productId
        })
        res.json({
            message : "Product Deleted Successfully"
        });

    }catch(error){
        res.status(500).json({
            message : "Error while deleting product"
        })
    }

} 

export async function updateProduct(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Access Denied. Admins Only."
        })
        return;
    }
    try{
        await Product.updateOne({
            productId : req.params.productId
        },{
            name : req.body.name,
            altName : req.body.altName,
            price : req.body.price,
            labelledPrice : req.body.labelledPrice,
            description : req.body.description,
            images : req.body.images,
            brand : req.body.brand,
            model : req.body.model,
            category : req.body.category,
            stock : req.body.stock
        })
        res.json({
            message : "Product Updated Successfully"
        });


    }   catch(error){
        res.status(500).json({
            message : "Error while updating product"
        })
    }


}

export async function getProductById(req, res) {

    try{

        const product = await Product.findOne({
            productId : req.params.productId
        })
        if(product == null){
            res.status(404).json({
                message : "Product Not Found"
            })
            return;
        }else if(product.isAvailable){
            res.status(200).json(product);
        }else{
            if(isAdmin(req)){
                res.status(200).json(product);
            }else{
                res.status(403).json({
                    message : "Access Denied. Admins Only."
                })
            }   
        }

    }   catch(error){
        res.status(500).json({
            message : "Error while fetching product"
        })
    }

}
    
