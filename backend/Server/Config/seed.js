const User = require('../API/user/userModel')
const bcrypt = require('bcryptjs')

User.findOne({ "email": "admin@gmail.com" })
    .then((data) => {
        if (data == null) {
            let admin = new User({
                name: "Admin",
                email: "admin@gmail.com",
                password: bcrypt.hashSync("admin@123", 10),
                userType: 1
            })

            admin.save().then(async () => {
                console.log("Admin Created")
            }).catch(err => {
                console.log('Error In Admin', err);
            })
        }
        else {
            console.log("Admin Already Exists")
        }
    })
    .catch((err) => {
        console.log("Error in finding admin ", err)
    })