const Event = require('../models/Event');
const User = require('../models/User');


module.exports = {
    async createEvent(req, res) {
        try {
            const {title, description, price, sport} = req.body;
            const { user_id } = req.headers;
            const { filename } = req.file;
            const user = await User.findById(user_id);

            if(!user) {
                return res.status(400).json({
                    message: `User does not exist!`
                })
            }

            const event = await Event.create({
                title,
                description,
                sport,
                price: parseFloat(price),
                user: user_id,
                thumbnail: filename
            })
            return res.json(event);

        } catch (error) {
            
        }
    },

    async getEventById(req, res) {
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
    },

    async getAllEvents(req, res) {
        const { sport } = req.params;
        const query = { sport } || {};
        try {
            const events = await Event.find(query);
            if (events) {
                return res.json(events);
            } 
        } catch (error) {
            return res.status(400).json({
                message: `No Events at this time.`
            })
        }
    },

    async deleteEvent(req, res) {
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
}