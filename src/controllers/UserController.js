const User = require('../models/User');
const { model } = require('mongoose');
const bcrypt = require('bcrypt');


module.exports = {
    async createUser(req, res){
        try {
            // console.log(req.body);
            const {firstName, lastName, password, email} = req.body;
            const existentUser  = await User.findOne({email});

            if(!existentUser){
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword
                })
                return res.json(user)
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