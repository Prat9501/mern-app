const User = require('../models/User');
const { model } = require('mongoose');
const bcrypt = require('bcrypt');


module.exports = {
    async store(req, res){
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
    }
}