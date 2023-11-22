const mongoose = require('mongoose');
async function connectToDb(url) {
    try {
        await mongoose.connect(url);
        console.log("connected to db");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectToDb;