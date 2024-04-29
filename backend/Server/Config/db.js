const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/hackathon")
    .then(() => {
        console.log('Db Connected')
    })
        .catch((err) => {
            console.log("Db Error", err)
        })
