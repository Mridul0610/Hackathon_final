const User = require('./userModel')
const jwt = require('jsonwebtoken')
const secretKey = '1q2w3e4r5t'
const bcrypt = require('bcryptjs')


const login = (req, res) => {
    let validation = ''
    if (!req.body.email)
        validation += " Email is required "
    if (!req.body.password)
        validation += ' Password is required '
    if (!!validation)
        res.send({ success: false, status: 500, message: validation })
    else {
        User.findOne({ email: req.body.email })
            .then(result => {
                if (result == null)
                    res.send({ success: false, status: 500, message: 'No user Found' })
                else {
                    if (bcrypt.compareSync(req.body.password, result.password)) {
                        if (result.status) {
                            let payload = {
                                _id: result._id,
                                name: result.name,
                                email: result.email,
                                UserType: result.userType
                            }
                            let token = jwt.sign(payload, secretKey, { expiresIn: '24h' })

                            res.send({ success: true, status: 200, message: 'Login Successfull', data: result, token: token })
                        }
                        else
                            res.send({ success: false, status: 500, message: 'Your Account Is Blocked' })
                    }
                    else {
                        res.send({ success: false, status: 500, message: "Invalid username Password" })
                    }
                }

            })
            .catch(err => {
                res.send({ success: false, status: 500, message: err })
            })
    }
}









module.exports = {login}