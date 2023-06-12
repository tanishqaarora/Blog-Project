const db = require('../models/index.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.createUser = async(req, res) => {
    try {
        // Get user input
        const { name, email, username, password } = req.body;
        // Validate user input
        // console.log(name, "=========", email, "========", username, "=======", password);
        if (!name || !email || !username || !password) {
            return res.status(400).json({
                msg: "Please fill all the fields"
            });
          } 
        
        // Validate email 
        if(email) {
            const validatedEmail = isEmailValid(email);
            // console.log("++++++++", validatedEmail);
            if(!validatedEmail) {
                return res.json({
                    msg: "Invalid Email"
                })
            }
        }

        // Check password length 
        if(password.length > 8) {
            return res.json({
                msg: "Password cannot exceeds 8 characters"
            })
        }

        // Check if email or username already exists 
        const oldUser = await db.user.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { username }
                ]
            }
        });

        // Exists email or username
        if(oldUser) {
            return res.json({
                msg: "User already exist. Please provide unique values."
            })
        }

        // Hash Password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        console.log("==========", hashPassword);

        // Create User
        const newUser = await db.user.create({ name, email , username, password: hashPassword });
        console.log(newUser);
        return res.status(200).json({
            msg: "user created",
            user: newUser
        })
            
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

exports.loginUser = async(req, res) => {
    try {
        // Get user input
        let { email, password } = req.body;

        // Validate user input
        if ( !email || !password ) {
            return res.status(400).json({
                msg: "Please fill all the fields"
            });
          }

        // Validate email
        if(email) {
            const validatedEmail = isEmailValid(email);
            // console.log("++++++++", validatedEmail);
            if(!validatedEmail) {
                return res.json({
                    msg: "Invalid Email"
                })
            }
        }

        // Checking if user email exists
        const user = await db.user.findOne({ 
            where: {
                email: req.body.email
            }
        });

        if(!user) return res.status(400).json({ msg: "Incorrect email-id"});

        // Checking if password matches
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).json({ msg: "Incorrect password"});

        // Sending back the token
        const token = jwt.sign({ id: user.id}, process.env.TOKEN_SECRET);
        res.header("auth-token", token).json({
            msg: "Login successful",
            token
         });
        
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

exports.getUser = async(req, res) => {

}
// Email Validation
function isEmailValid(email) {
    let validRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi
    // console.log("EMAIL", email);
    if(email.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}