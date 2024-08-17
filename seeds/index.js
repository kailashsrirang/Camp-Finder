const path = require('path')
const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

const Campground = require('../models/campground')//model for campground

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
})
    .then(() => {
        console.log("Database Connected")
    })
    .catch(err => {
        console.log(" Connected Error" + err)
    })

const sample = array => { return array[Math.floor(Math.random() * array.length)] } //picks a random element out of an array

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)

        const c = await new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
            //gives us a random title for a campground

        })
        await c.save();

    }

}

seedDB()
    .then(() => {
        console.log("CLOSING CONNECTION")
        mongoose.connection.close()

    })

