const db = require('../models/index.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

exports.createUser = async(req, res) => {
    try {
        // Get user input
        const { name, email, username, password } = req.body;
        // Validate user input
        console.log(name, "=========", email, "========", username, "=======", password);
        if (!name || !email || !username || !password) {
            return res.status(400).json({
                msg: "Please fill all the fields"
            });
          } else {
                // Validate email 
                if(email) {
                    let validRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
                    if(!email.match(validRegex)) {
                        return res.json({
                            msg: "Invalid Email"
                        })
                    }
                }
                // Hash Password using bcrypt
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                console.log("==========");
                console.log(hashPassword);

                // check in db if email and username are unique 
                const oldUser = await db.user.findOne({
                    where: {
                        [Op.or]: [
                            { email },
                            { username }
                        ]
                    }
                });
                // if user already exists
                if(oldUser) {
                    return res.json({
                        msg: "User already exist. Please provide unique values."
                    })
                // create user
                } else {
                    const newUser = await db.user.create({ name, email, username, password: hashPassword });
                    console.log(newUser);
                    return res.status(200).json({
                        msg: "user created",
                        newUser
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }
}

// function isEmailValid(email) {
//     let validRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi
//     // console.log(email);
//     if(email.match(validRegex)) {
//         console.log("==============");
//         return email;
//     } else {
//         return;
//     }
// }