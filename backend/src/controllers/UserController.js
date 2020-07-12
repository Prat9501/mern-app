const User = require('../models/User');
const { model } = require('mongoose');
const bcrypt = require('bcrypt');


module.exports = {
    async createUser(req, res){
        try {
            console.log(req.body);
            const {email, firstName, lastName, password} = req.body;
            const existentUser  = await User.findOne({email});

            if(!existentUser){
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = User.create({
                    email,
                    firstName,
                    lastName,
                    password: hashedPassword
                })
                return res.json({
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                })
            }
            return res.status(400).json({
                message: `email ${email} already exist!`
            })
        } catch (error) {
            throw Error(`Error while registering user: ${error}`);
        }
    },

    async getUserById(req, res){
        const {userId} = req.params;
        try {
            const user = await User.findById(userId);
            return res.json(user)
        } catch (error) {
            return res.status(400).json({
                message: `User does not exist!`
            })
        }
    }
}