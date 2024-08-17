const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground');//model for campground
const { urlencoded } = require('express');
const methodOverride = require('method-override')
const ejsMate = require(   'ejs-mate')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
})
    .then(() => {
        console.log("Database Connected")
    })
    .catch(err => {
        console.log(" Connected Error" + err)
    })

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))//need this to parse post reqwuest from html form
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});

    res.render('campgrounds/index', { campgrounds })
})

app.get('/campgrounds/new', async (req, res) => {
    // const { id } = req.params;
    // const campground = await Campground.findById(id);
    // res.send("WORKSS")
    res.render('campgrounds/new')
})

app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    res.render('campgrounds/show', { campground })
})

app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground })
})


app.post('/campgrounds', async (req, res) => {

    const campground = await new Campground(req.body.campground)
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

app.put('/campgrounds/:id', async (req, res) => {
    // res.send()
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    // await campground.save
    res.redirect(`/campgrounds/${campground._id}`)
})

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id)
    res.redirect(`/campgrounds`)
})



// app.get('/makecampground', async (req, res) => {
//     const camp = await new Campground({
//         title: "BackYard",

//     });
//     await camp.save();
//     res.send(camp)

// })

app.listen((3000), () => {
    console.log("Listening on 3000")
})