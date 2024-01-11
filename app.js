const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors')
app.use(cors())

const folder = "./";

app.get('/images', (request, response) => {
    // Check if the directory exists
    if (!fs.existsSync(folder)) {
        return response.status(400).send({ errorMsg: 'Directory does not exist.' });
    }

    // Read files from the directory
    const files = fs.readdirSync(folder);

    // Filter out only image files
    const images = files.filter(file => ['.jpg', '.jpeg', '.png'].includes(path.extname(file)));

    // Select four random images
    const selectedImages = [];
    for (let i = 0; i < 4 && images.length > 0; i++) {
        const index = Math.floor(Math.random() * images.length);
        selectedImages.push(images[index]);
        images.splice(index, 1);
    }

    // Send the paths of the selected images as a response
    response.send(selectedImages.map(image => path.join(folder, image)));
});

app.delete('/images', (request, response) => {
    const imagePath = request.query.path;

    // Check if the image exists
    if (!fs.existsSync(imagePath)) {
        return response.status(400).send({ errorMsg: 'Image does not exist.' });
    }

    // Delete the image
    fs.unlinkSync(imagePath);

    response.send({ success: true });
});


app.listen(3030, () => {
    console.log('Server started on port 3030.');
    console.log('Keep this window open until you are done with deleting images.');
});