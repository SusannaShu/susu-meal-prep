// Import the express library
import express from 'express';

// Creating an instance of an express application
const app = express();

// Defining the port we want to listen on
const port = process.env.PORT || 3001;

// Sample data for meal prep items (same as the JSON we discussed)
const mealPrepData = {
    "Tomato": {
        "description": "A red fruit rich in lycopene and vitamin C.",
        "tip": ["Eat raw for maximum vitamin C", "Cooking increases lycopene availability"],
        "risk": ["Avoid metal containers for long storage"],
        "meal_prep_solution": "Store at room temperature for 2-3 days, refrigerate when ripe",
        "random_fact": "Tomatoes are technically a fruit, but they are commonly used as vegetables.",
        "storage_time": "3 days"
    },
    "Lettuce": {
        "description": "A leafy green vegetable commonly used in salads.",
        "tip": ["Wash right before eating to avoid wilting", "Store in the fridge for freshness"],
        "risk": ["Can spoil quickly if not properly stored"],
        "meal_prep_solution": "Store in the fridge for up to 3 days in a sealed container",
        "random_fact": "Lettuce was first cultivated by the ancient Egyptians.",
        "storage_time": "3 days"
    },
    "Mushroom": {
        "description": "A type of fungi commonly used in cooking, rich in nutrients.",
        "tip": ["Store in a paper bag to prevent moisture buildup"],
        "risk": ["Not good for reheating, should be consumed as soon as cooked"],
        "meal_prep_solution": "Keep in the fridge for up to 3 days, store in a paper bag for moisture control",
        "random_fact": "Mushrooms can produce vitamin D when exposed to sunlight.",
        "storage_time": "3 days"
    }
};

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

// Setting up the application to listen to the defined port
app.listen(port, () => {
    console.log(`SuSu Meal Prep app is listening on port ${port}`);
});
