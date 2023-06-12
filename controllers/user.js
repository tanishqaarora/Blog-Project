const db = require('../models/index.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.createUser = async(req, res) => {
    try {
        // Get user input
        const { name, email, username, password } = req.body;
        // Validate user input
        if (!name || !email || !username || !password) {
            return res.status(400).json({
                msg: "Please fill all the fields"
            });
          } 
        
        // Validate email 
        if(email) {
            const validatedEmail = isEmailValid(email);
            console.log("++++++++", validatedEmail);
            if(!validatedEmail) {
                return res.json({
                    msg: "Invalid Email"
                })
            }
        }

        // Check password length 
        if(password && password.length > 8) {
            return res.json({
                msg: "Password cannot exceeds 8 characters"
            })
        }

        // Check if email or username already exists 
        const oldUser = await db.user.findOne({
            where: {
                [Op.or]: [
                    { email: email.toLowerCase() },
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

        // Create User
        const newUser = await db.user.create({ name, email: email.toLowerCase() , username, password: hashPassword });
        // console.log(newUser);
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
        const { email, password } = req.body;

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
                email: req.body.email.toLowerCase()
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

exports.gettingUsers = async(req, res) => {
    try {
        const users = await db.user.findAll({
            order: ['createdAt'],
            include: [{
                model: db.blog
            }, {
                model: db.comment
            }]
        })
        return res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.getUser = async(req, res) => {
    try {
        const getUser = await db.user.findOne({
            where: {id: req.params.id},
            include: [{
                model: db.blog
            }, {
                model: db.comment
            }]
        });
        // If user is not found show error else show the user
        if(!getUser) {
            return res.status(404).json(`User with id ${req.params.id} not found`);
        } else {
            return res.status(200).json({
                user: getUser
            });
        }
    } catch (error) {
        res.status(404).json({
            msg: error.message
        });
    }
}

exports.updateUser = async(req, res) => {
    try {
        // Get user from db
        const getUserToBeUpdated = await db.user.findOne({
            where: {id: req.params.id}
        });
        // if user not found then show error else update the User
        if(!getUserToBeUpdated) {
            return res.status(404).json({
                msg: "This user does not exist."
            });
        } else {
            const { name, email, username, password } = req.body;
            console.log("name--", name, "email--", email, "username--", username, "password--", password);

            // Validate email 
            if(email) {
                const validatedEmail = isEmailValid(email);
                console.log("++++++++", validatedEmail);
                if(!validatedEmail) {
                    return res.json({
                        msg: "Invalid Email"
                    })
                }
            }

            // Check password length 
            if(password && password.length > 8) {
                return res.json({
                    msg: "Password cannot exceeds 8 characters"
                })
            }
            const updatedUser = await getUserToBeUpdated.update({ name, email, username, password });
            console.log(updatedUser);
            return res.status(200).json({
                msg: "User updated successfully",
                user: updatedUser
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.deleteUser = async(req, res) => {
    try {
        // find the User
        const getUserToBeDeleted = await db.user.findOne({
            where: {id: req.params.id}
        });
        // If user is not found then show error else delete the user
        if(!getUserToBeDeleted) {
            return res.status(404).json({
                msg: `User with id ${req.params.id} does not exist`
            });
        } else {
            const removeUser = await db.user.destroy({
                where: { id: req.params.id }
            });
            return res.json({
                msg: `User with id ${req.params.id} is deleted.`
        })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        }
        );
    }
}

// Email Validation
function isEmailValid(email) {
    let validRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi
    if(email.toLowerCase().match(validRegex)) {
        return true;
    } else {
        return false;
    }
}
