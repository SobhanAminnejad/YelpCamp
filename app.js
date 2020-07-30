const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campGroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

var Campground = mongoose.model("Campground", campGroundSchema);

// Campground.create({
//   name: "Granite Hill",
//   image: "/glen-jackson-mzZVGFfMOkA-unsplash.jpg",
//   description: "This is a huge granite hill, no bathrooms, no water, beautiful granite",
// }).then((campground) => {
//   console.log("saved", campground);
// });

var campGrounds = [
  {
    name: "Salmon Creek",
    image: "/daan-weijers-pSaEMIiUO84-unsplash.jpg",
  },
  {
    name: "Granite Hill",
    image: "/glen-jackson-mzZVGFfMOkA-unsplash.jpg",
  },
  {
    name: "Mountains Goat's Rest",
    image: "/sayan-nath-j6MenunuSKg-unsplash.jpg",
  },
  {
    name: "Mountains Goat's Rest",
    image: "/tommy-lisbin-2DH-qMX6M4E-unsplash.jpg",
  },
  {
    name: "Mountains Goat's Rest",
    image: "/tommy-lisbin-gvkdncTaZu8-unsplash.jpg",
  },
  {
    name: "Mountains Goat's Rest",
    image: "/wilson-ye-A3nkfpJFGJo-unsplash.jpg",
  },
  {
    name: "Salmon Creek",
    image: "/daan-weijers-pSaEMIiUO84-unsplash.jpg",
  },
  {
    name: "Granite Hill",
    image: "/glen-jackson-mzZVGFfMOkA-unsplash.jpg",
  },
  {
    name: "Mountains Goat's Rest",
    image: "/sayan-nath-j6MenunuSKg-unsplash.jpg",
  },
  {
    name: "Mountains Goat's Rest",
    image: "/tommy-lisbin-2DH-qMX6M4E-unsplash.jpg",
  },
  {
    name: "Mountains Goat's Rest",
    image: "/tommy-lisbin-gvkdncTaZu8-unsplash.jpg",
  },
  {
    name: "Mountains Goat's Rest",
    image: "/wilson-ye-A3nkfpJFGJo-unsplash.jpg",
  },
];

app.get("/", (req, res) => {
  res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
  Campground.find({})
    .then((allCampgrounds) => {
      res.render("index", { campgrounds: allCampgrounds });
    })
    .catch((err) => {
      console.log("Error", error);
    });
});

//CREATE - add new campground to database
app.post("/campgrounds", (req, res) => {
  Campground.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  })
    .then((response) => {
      res.redirect("/campgrounds");
    })
    .catch((error) => {
      console.log("Error", error);
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
  let id = req.params.id;
  Campground.findById(id)
    .then((campground) => {
      res.render("show", { campground: campground });
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
});

app.listen("4040", process.env.IP, () => {
  console.log("The server is listening to the port 4040!");
});
