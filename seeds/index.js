const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/YelpCampDatabase");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => {
  console.log("Database Connected");
});

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 1000);
    const RandomIDimg = Math.floor(Math.random() * 10) + 5;
    const price = Math.floor(Math.random() * 100) + 20;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      image: [
        {
          url: "https://res.cloudinary.com/dxauzebpd/image/upload/v1739695943/YelpCamp/zs6cb3cqtxehkyjdmefg.jpg",
          filename: "YelpCamp/zs6cb3cqtxehkyjdmefg",
        },
      ],
      location: `${cities[random].city}, ${cities[random].state}`,
      geometry: {
        type: "Point",
        coordinates: [cities[random].longitude, cities[random].latitude],
      },
      price,
      author: "67b0322c798be6aa140c24ff",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nulla nec nunc tincidunt aliquet. Integer nec nisi in libero tincidunt ultricies.",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
