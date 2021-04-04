const { Event } = require('../models')
const getAllEvents = async (request, response) => {
    //get all event from mongodb
    try {
        const events = await Event.find();
        response.status(200).json(events)
    } catch (error) {
        response.status(400).json({ message: "Something went wrong." })
    }

}

module.exports = eventControllers = {
    getAllEvents
}