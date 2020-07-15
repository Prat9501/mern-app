const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

module.exports = {
    getEventById(req, res) {
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if (err) {
                res.sendStatus(401);
            } else {
                const { eventId } = req.params;
                try {
                    const event = await Event.findById(eventId);
                    if (event) {
                        return res.json(event);
                    } 
                } catch (error) {
                    return res.status(400).json({
                        message: `Event does not exist!`
                    })
                }
            }
        })
    },

    getEventsByUserId(req, res) {
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if (err) {
                res.sendStatus(401);
            } else {
                const { user_id } = req.headers;
                try {
                    const events = await Event.find({user: authData.user._id});
                    if (events) {
                        return res.json({authData, events});
                    } 
                } catch (error) {
                    return res.status(400).json({
                        message: `No Events at this time.`
                    })
                }
            }
        })
    },

    getAllEvents(req, res) {
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err){
                res.sendStatus(401);
            } else {
                const { sport } = req.params;
                const query = sport ? { sport } : {};
                try {
                    const events = await Event.find(query);
                    if (events) {
                        return res.json({authData, events});
                    } 
                } catch (error) {
                    return res.status(400).json({
                        message: `No Events at this time.`
                    })
                }
            }
        })
    }
}