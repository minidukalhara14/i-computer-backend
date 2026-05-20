import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import axios from "axios";
import { response } from "express";

dotenv.config();

export async function creatUser(req, res) {


    try{

        const passwordHash = bcrypt.hashSync(req.body.password , 10)
        

        const newUser = new User({
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : passwordHash


    }) 
        await newUser.save()

        res.json({
            message : "User Created Successfully"
        })
    
    
    } catch (error) {
        res.json({
            message : "Error while creating user"
        })
    }
}

export async function loginUser(req, res) {
    try{

        const user = await User.findOne({
            email : req.body.email,
            
        })

        if(user == null){
            res.status(404).json({
                message : "User not found"
            })
        }else{
            const isPasswordCorrect = bcrypt.compareSync(req.body.password , user.password) 
            
            if(isPasswordCorrect){
               
                const payload = {
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    isAdmin : user.isAdmin,
                    isBlocked : user.isBlocked,
                    isEmailVerified : user.isEmailVerified,
                    image : user.image

            }

            const token = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn : "48h"
            })

            

            res.json({
                token : token,
                isAdmin : user.isAdmin
            })
            
                
            }else{
                res.status(401).json({
                    message : "Incorrect Password"
                })
            }
        }

    }catch (error) {
        res.status(500).json({
            message : "Error while login user"
        })
    }
}

export async function getUserData(req, res) {
    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
    }else{
        res.json(req.user)
    }
}

export async function updateUserData(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
    }else{

        try{

            await User.findOneAndUpdate(
                { email : req.user.email },
                { firstName : req.body.firstName, lastName : req.body.lastName , image : req.body.image }
            )

            // Users existing token contains old information. But in here we have updated the user data. So we will generate a new token with updated information and send it to the user.
            

            const updatedUser = await User.findOne({ email : req.user.email })

            console.log(updatedUser)

            const token = jwt.sign(
                {
                    email : updatedUser.email,
                    firstName : updatedUser.firstName,
                    lastName : updatedUser.lastName,
                    isAdmin : updatedUser.isAdmin,
                    isBlocked : updatedUser.isBlocked,
                    isEmailVerified : updatedUser.isEmailVerified,
                    image : updatedUser.image
                },
                process.env.JWT_SECRET,
                { expiresIn : "48h" }
            )

            res.json({
                message : "User data updated successfully",
                token : token
            })

        }catch(error){
            res.status(500).json({
                message : "Error updating user data"
            })
        }


    }
}

export async function changePassword(req,res){

    if(req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
    }

    try{

        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10)
        await User.findOneAndUpdate(
            { email : req.user.email },
            { password : hashedPassword }
        )
        res.json({
            message : "Password changed successfully"
        })
    }catch(error){
        res.status(500).json({
            message : "Error changing password"
        })
    }
}

export async function googleLogin(req, res) {

    const accessToken = req.body.token

    //google validate
    try{
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
            headers : {
                Authorization : "Bearer " + accessToken
        }
    })
        console.log(response.data)
        const googleUserData = response.data
        
        const user = await User.findOne(
            { email : googleUserData.email }
        )

        if(user == null){
            const newUser = new User({
                email : response.data.email,
                firstName : response.data.given_name,
                lastName : response.data.family_name,
                password : "google-login",
                isEmailVerified : true,
                image : response.data.picture
            })
            await newUser.save()

            //token generate

            
            const token = jwt.sign(
                {
                    email : response.data.email,
                    firstName : response.data.given_name,
                    lastName : response.data.family_name,
                    isAdmin : false,
                    isBlocked : false,
                    isEmailVerified : true,
                    image : response.data.picture
                },
                process.env.JWT_SECRET,
                { expiresIn : "48h" }
            )

            res.json({
                token : token,
                isAdmin : false
            })
        
        }else{
            const token = jwt.sign(
                {
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    isAdmin : user.isAdmin,
                    isBlocked : user.isBlocked,
                    isEmailVerified : user.isEmailVerified,
                    image : user.image
                },
                process.env.JWT_SECRET,
                { expiresIn : "48h" }
            )
            res.json({
                token : token,
                isAdmin : user.isAdmin
            })
        }
       

    }catch(error){
        res.status(401).json({
            message : "Google authentication failed"
        })
    }

    

}

export default function isAdmin(req ){
    if(req.user == null){  
        return  
    }
    if(req.user.isAdmin){
        return true
    }else{
        return false
    }
}

