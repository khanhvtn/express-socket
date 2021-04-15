const CustomError = require('../class/CustomError');
const { Facility } = require('../models')


const getFacilities = async (request, response, next) => {
    try {
        const facilities = await Facility.find();
        //response all facilities to client
        response.status(200).json(facilities)
    } catch (error) {
        next(new CustomError(500, error.message))
    }
}

const getFacility = async (request, response, next) => {
    const { id } = request.params
    try {
        const facility = await Facility.findById(id);
        //response all facilities to client
        response.status(200).json(facility)
    } catch (error) {
        next(new CustomError(500, error.message))
    }
}
const facilityCreate = async (request, response, next) => {
    try {

        const { name, status } = request.body
        //validation facility fields
        if (!name) return next(400, "Name cannot be blanked.")
        if (!status) return next(400, "Status cannot be blanked.")
        //check faciity exist
        const facility = await Facility.findOne({ name })
        if (facility) return next(400, "Facility already exists.")


        const newFacility = await Facility.create(request.body);
        //response new facility to client
        response.status(200).json(newFacility)
    } catch (error) {
        next(new CustomError(500, error.message))
    }
}
const facilityDelete = async (request, response, next) => {
    const { id } = request.params
    try {
        const deletedFacility = await Facility.findByIdAndDelete(id);

        //response deleted facility to client
        response.status(200).json(deletedFacility)
    } catch (error) {
        next(new CustomError(500, error.message))
    }
}


module.exports = facilityControllers = {
    getFacilities,
    getFacility,
    facilityCreate,
    facilityDelete
}