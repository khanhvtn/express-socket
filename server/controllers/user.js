const bcrypt = require('bcrypt')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const CustomError = require('../class/CustomError')
const userLogin = async (request, response, next) => {
    const { email, password } = request.body
    try {
        //check email exists
        const user = await User.findOne({ email })
        if (!user) return next(new CustomError(400, "Email doesn't exist."))

        //check password matching
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return next(new CustomError(403, 'Invalid Password.'))

        //if pass validation
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, 'netcp', { expiresIn: '1h' });
        response.status(200).json({
            token,
            user
        })
    } catch (error) {
        next(new CustomError(500, error.message))
    }
}
const userCreate = async (request, response, next) => {
    const { email, password, role } = request.body
    try {
        //check email exists
        const user = await User.findOne({ email })
        if (user) return next(new CustomError(400, "Email already exists."))

        //hash password
        const hashPassword = await bcrypt.hash(password, 10);

        //create user in database
        const newUser = await User.create({
            email,
            password: hashPassword,
            role,
        })

        response.status(200).json(newUser)
    } catch (error) {
        next(new CustomError(500, error.message))
    }
}
const userUpdate = async (request, response, next) => {
    const { email, password, role } = request.body
    try {

        //hash password
        const hashPassword = await bcrypt.hash(password, 10);

        //update user in database
        const updatedUser = await User.findOneAndUpdate({
            email
        }, { email, password: hashPassword, role }, { new: true })

        response.status(200).json(updatedUser)
    } catch (error) {
        next(new CustomError(500, error.message))
    }
}
const userDelete = async (request, response, next) => {
    const { id } = request.params
    try {
        //check user exists
        const user = await User.findById(id)
        if (!user) return next(new CustomError(400, "User doesn't exist."))

        //delete user in database
        const deletedUser = await User.findByIdAndDelete(id)

        response.status(200).json(deletedUser)
    } catch (error) {
        next(new CustomError(500, error.message))
    }
}
const getUsers = async (request, response, next) => {
    try {
        //get all user 
        const users = await User.find();

        response.status(200).json(users)
    } catch (error) {
        next(new CustomError(500, error.message))
    }
}
const getUser = async (request, response, next) => {
    const { id } = request.params
    try {
        //check user exists
        const user = await User.findById(id)
        if (!user) return next(new CustomError(400, "User doesn't exist."))

        response.status(200).json(user)
    } catch (error) {
        next(new CustomError(500, error.message))
    }
}
const checkCurrentUser = async (request, response, next) => {
    const { token } = request.body
    try {
        //check token is expired or note
        const decodeToken = jwt.verify(token, 'netcp')
        response.status(200).json(decodeToken)
    } catch (error) {
        next(new CustomError(500, error.message))
    }
}

module.exports = userControllers = {
    userLogin,
    userCreate,
    userUpdate,
    userDelete,
    getUsers,
    getUser,
    checkCurrentUser
}