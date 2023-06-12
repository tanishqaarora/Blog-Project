const db = require('../models/index.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

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
          } else {
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
            }
        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }
}

// Email Validation
function isEmailValid(email) {
    let validRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi
    // console.log(email);
    if(email.match(validRegex)) {
        return email;
    } else {
        return;
    }
}