const bcrypt = require('bcrypt')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const userLogin = async (request, response) => {
    const { email, password } = request.body
    try {
        //check email exists
        const user = await User.findOne({ email })
        if (!user) return response.status(400).json(new Error("Email doesn't exist."))

        //check password matching
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return response.status(403).json(new Error('Invalid Password.'))

        //if pass validation
        const token = jwt.sign({ id: user._id }, 'netcp', { expiresIn: '1h' });
        response.status(200).json({
            token,
            email: user.email
        })
    } catch (error) {
        response.status(400).json(new Error('Something went wrong.'))
    }
}
const userCreate = async (request, response) => {
    const { email, password, role } = request.body
    try {
        //check email exists
        const user = await User.findOne({ email })
        if (user) return response.status(400).json(new Error("Email already exists."))

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
        response.status(400).json(new Error('Something went wrong.'))
    }
}

module.exports = userControllers = {
    userLogin,
    userCreate
}