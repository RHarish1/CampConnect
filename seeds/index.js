const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camp-connect', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({}); // Clears existing data

    const campgrounds = [];
    for (let i = 0; i < 30; i++) {
        const randomIndex = Math.floor(Math.random() * 100);
        const price = Math.floor(Math.random() * 20) + 10;

        campgrounds.push({
            author: '67d295724f23d21f18f79514',
            location: `${cities[randomIndex].city}, ${cities[randomIndex].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomIndex].longitude,
                    cities[randomIndex].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/diwmdernw/image/upload/v1741856022/photo-1737587653765-94bc8fe7b541_lbf1ot.avif',
                    filename: 'CampConnect'
                },
                {
                    url: 'https://res.cloudinary.com/diwmdernw/image/upload/v1741856020/photo-1741471884167-a2b08fb14a3e_tbqzfw.avif',
                    filename: 'CampConnect'
                }
            ]
        });
    }

    await Campground.insertMany(campgrounds); // Inserts all at once
    console.log("Seeding complete!");
};

seedDB().then(() => {
    mongoose.connection.close();
});
