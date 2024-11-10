// Import the express library
import express from 'express';
import fs from 'fs';
import cors from 'cors';
const mealPrepData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Creating an instance of an express application
const app = express();
app.use(cors({
    origin: '*'
}));

// Defining the port we want to listen on
const port = process.env.PORT || 3001;

// Setting up the route to get meal prep tips for a specific food item
app.get('/meal-prep/:item', (req, res) => {
    const requestedItem = req.params.item.charAt(0).toUpperCase() + req.params.item.slice(1).toLowerCase();

    if (mealPrepData[requestedItem]) {
        res.json(mealPrepData[requestedItem]);
    } else {
        res.status(404).json({ message: `Sorry, we don't have information about ${requestedItem}.` });
    }
});

// Setting up the route to get food items by storage time
app.get('/storage', (req, res) => {
    const requestedTime = req.query.time;
    const matchingItems = [];

    for (const item in mealPrepData) {
        if (mealPrepData[item].storage_time === `${requestedTime} days`) {
            matchingItems.push({ name: item, tip: mealPrepData[item].tip, storage_time: mealPrepData[item].storage_time });
        }
    }

    if (matchingItems.length > 0) {
        res.json({ items: matchingItems });
    } else {
        res.status(404).json({ message: `No items found with storage time of ${requestedTime} days.` });
    }
});

// Setting up the route to get safe storage and prep tips for multiple items
app.get('/safe-prep', (req, res) => {
    const requestedItems = req.query.items.split(',');
    const results = [];

    requestedItems.forEach(item => {
        const formattedItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        if (mealPrepData[formattedItem]) {
            results.push({
                name: formattedItem,
                safe_storage: mealPrepData[formattedItem].meal_prep_solution,
                prep_tip: mealPrepData[formattedItem].tip
            });
        }
    });

    if (results.length > 0) {
        res.json({ items: results });
    } else {
        res.status(404).json({ message: 'No matching items found for your query.' });
    }
});

// New endpoint to get food images
app.get('/food-image/:item', (req, res) => {
    const requestedItem = req.params.item.charAt(0).toUpperCase() + req.params.item.slice(1).toLowerCase();

    if (mealPrepData[requestedItem] && mealPrepData[requestedItem].image) {
        res.json({ 
            name: requestedItem,
            image: mealPrepData[requestedItem].image 
        });
    } else {
        res.status(404).json({ message: `No image found for ${requestedItem}.` });
    }
});

// New endpoint to get cuisine information
app.get('/cuisine/:item', (req, res) => {
    const requestedItem = req.params.item.charAt(0).toUpperCase() + req.params.item.slice(1).toLowerCase();

    if (mealPrepData[requestedItem] && mealPrepData[requestedItem].cuisine) {
        res.json({ 
            name: requestedItem,
            cuisine: mealPrepData[requestedItem].cuisine 
        });
    } else {
        res.status(404).json({ message: `No cuisine information found for ${requestedItem}.` });
    }
});

// New endpoint to get both food and cuisine images
app.get('/food-details/:item', (req, res) => {
    const requestedItem = req.params.item.charAt(0).toUpperCase() + req.params.item.slice(1).toLowerCase();

    if (mealPrepData[requestedItem]) {
        const foodInfo = mealPrepData[requestedItem];
        res.json({
            name: requestedItem,
            food_image: foodInfo.image,
            cuisine: {
                name: foodInfo.cuisine.name,
                origin: foodInfo.cuisine.origin,
                image: foodInfo.cuisine.image
            }
        });
    } else {
        res.status(404).json({ message: `No information found for ${requestedItem}.` });
    }
});

// Setting up the application to listen to the defined port
app.listen(port, () => {
    console.log(`SuSu Meal Prep app is listening on port ${port}`);
});
