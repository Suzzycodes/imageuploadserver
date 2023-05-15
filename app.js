const express = require('express');
const app = express();
const cloudinary = require('cloudinary').v2
require('dotenv').config();
const bodyParser = require('body-parser');

//bodyparser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


  // cloudinary configuration
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });


app.get("/", (request, response) => {
    response.json({ message: "Hey! This is your server response!" });
  });

  // image upload API
app.post("/image-upload", (request, response) => {
    
 // collected image from a user
 const data = {
    image: request.body.image,
}
    //upload image here
    cloudinary.uploader.upload(data.image)
    .then((result) => {
        response.status(200).send({
          message: "success",
          result,
        });
      }).catch((error) => {
        response.status(500).send({
          message: "failure",
          error,
        });
      });
});


module.exports = app;