const Event = require('../models/Event');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


module.exports = {
    createEvent(req, res) {
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if (err) {
                res.sendStatus(401);
            } else {
                try {
                    const {title, description, price, sport, date} = req.body;
                    const { filename } = req.file;
                    const user = await User.findById(authData.user._id);
                    if(!user) {
                        return res.status(400).json({
                            message: `User does not exist!`
                        })
                    }
                    const event = await Event.create({
                        title,
                        description,
                        sport,
                        date,
                        price: parseFloat(price),
                        user: authData.user._id,
                        thumbnail: filename
                    })
                    return res.json(event);
        
                } catch (error) {
                    console.log(error);
                }        
            }
        })
    },

    deleteEvent(req, res) {
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if (err) {
                res.sendStatus(401);
            } else {
                const { eventId } = req.params;
                try {
                    const event = await Event.findByIdAndDelete(eventId);
                    return res.status(204).json({
                        message: 'Event Deleted'
                    })
                } catch (error) {
                    return res.status(400).json({
                        message: `This event does not exist`
                    })
                }
            }
        })
    }
}