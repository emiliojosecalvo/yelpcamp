const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

//Set the path to the database
mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

//connect to the database 
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database Connected');
})

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomtitle = Math.floor(Math.random() * 18);
        const c = new Campground({
            location: (`${cities[random1000].city} , ${cities[random1000].state} `),
            title: (`${descriptors[randomtitle]} , ${places[randomtitle]}`)
        });
        await c.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})