const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () =>
{
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async () =>
{
    await Campground.deleteMany({});
    for(let i =0;i<300;i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp=new Campground({
            author:'6028e438a36d062d44807968',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)},${sample(places)}`,
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime labore possimus modi, unde deleniti soluta vitae similique, cumque, est minima expedita odit sed aut numquam ipsam assumenda sequi. Facere, necessitatibus!',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dsnyduzjt/image/upload/v1613554783/YelpCamp/fvp3pyoyrm96z8faa1mb.jpg',
                  filename: 'YelpCamp/fvp3pyoyrm96z8faa1mb'
                },
                {
                  url: 'https://res.cloudinary.com/dsnyduzjt/image/upload/v1613554783/YelpCamp/rpbjiocisgnjnd59n4i9.jpg',
                  filename: 'YelpCamp/rpbjiocisgnjnd59n4i9'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() =>
{
    mongoose.connection.close();
});
