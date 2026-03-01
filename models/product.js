import mongoose, { model } from "mongoose";

const productSchema = new mongoose.Schema({
    productId :{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
        
    },
    altName: {
        type: [String],
        required: false,
        default: []
    },
    price : {
        type: Number,
        required: true
    },
    labelledPrice : {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    images : {
        type: [String],
        required: true,
        default: [
            "/images/default-Product-01.png",
            "/images/default-Product-02.png",
        ]
    },
    brand : {
        type: String,
        required: false
    },
    model:{
        type: String,
        required: false
    },
    category : {
        type: String,
        required: true
    },
    isAvailable : {
        type: Boolean,
        required: true,
        default: true
    },
    stock : {
        type: Number,
        required: true,
        default: 0
    }
    
})

const Product = mongoose.model("Product", productSchema)

export default Product 