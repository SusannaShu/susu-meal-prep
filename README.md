# susu-meal-prep
convenient meal preping tips that maximize nutritin and minimize risks

### API Description

The **SuSu Meal Prep API** will help users manage their groceries, suggest the best ways to prepare foods while maximizing nutritional value and safety, and track the storage time of items. The API will provide advice on how to store, prep, and cook different food items to help users maintain a healthy lifestyle.

### Three Request Types & Expected Results

**1. Query for Meal Prep Tips by Food Item**

- **Input**: Users can query the API by specifying a food item (e.g., `GET /meal-prep/tomato`).
- **Expected Result**: The API will return meal prep tips, risks, storage information, and random facts about the queried food item.
- **Example Result**:

```jsx
{
   "item": {
     "name": "Tomato",
     "description": "A red fruit rich in lycopene and vitamin C.",
     "tip": ["Eat raw for maximum vitamin C", "Cooking increases lycopene availability"],
     "risk": ["Avoid metal containers for long storage"],
     "meal_prep_solution": "Store at room temperature for 2-3 days, refrigerate when ripe",
     "random_fact": "Tomatoes are technically a fruit, but they are commonly used as vegetables."
   }
}

```

**2. Query for Foods by Storage Time**

- **Input**: Users can query the API by specifying a time range for storage (e.g., `GET /storage?time=3` to return foods that can be stored for 3 days).
- **Expected Result**: The API will return a list of food items that can be stored for the specified amount of time with meal prep tips.
- **Example Result**:

```jsx
{
   "items": [
      {
         "name": "Lettuce",
         "storage_time": "3 days",
         "tip": "Store in the crisper drawer in a sealed container"
      },
      {
         "name": "Mushrooms",
         "storage_time": "3 days",
         "tip": "Store in a paper bag for moisture control"
      }
   ]
}

```

**3. Query for Safe Storage and Prep Tips for Food Combinations**

- **Input**: Users can send multiple food items in a query (e.g., `GET /safe-prep?items=lettuce,tomato,mushroom`).
- **Expected Result**: The API will return a combined response with recommendations for safely storing and preparing these food items together.
- **Example Result**:

```jsx
{
   "items": [
      {
         "name": "Lettuce",
         "safe_storage": "Store separately in a sealed container, can last up to 3 days",
         "prep_tip": "Wash right before eating to avoid wilting"
      },
      {
         "name": "Tomato",
         "safe_storage": "Store at room temperature unless fully ripe",
         "prep_tip": "Great for fresh salads when combined with leafy greens"
      },
      {
         "name": "Mushroom",
         "safe_storage": "Store in a paper bag to prevent moisture accumulation",
         "prep_tip": "Add mushrooms raw to salads or sauté for better texture"
      }
   ]
}

```

### 3. Query Structure

1. **GET /meal-prep/**
    - **Description**: Retrieves the details of a specific food item.
    - **Example**: `/meal-prep/tomato`
    - **Expected Result**: Detailed meal prep tips, risks, storage, and fun facts about the food item.
2. **GET /storage?time={time}**
    - **Description**: Returns a list of foods that can be safely stored for the specified amount of time (in days).
    - **Example**: `/storage?time=3`
    - **Expected Result**: A list of food items with storage time matching the query, along with brief tips.
3. **GET /safe-prep?items={item1,item2,...}**
    - **Description**: Retrieves combined safe storage and preparation recommendations for multiple food items.
    - **Example**: `/safe-prep?items=lettuce,tomato,mushroom`
    - **Expected Result**: Combined safety tips and preparation advice for the specified items.

### 4. Data Required in JSON File

To fulfill these requests, the JSON file should contain the following data structure for each food item:

```jsx
{
  "item": {
    "name": "Tomato",
    "description": "A red fruit rich in lycopene and vitamin C.",
    "tip": ["Eat raw for maximum vitamin C", "Cooking increases lycopene availability"],
    "risk": ["Avoid metal containers for long storage"],
    "meal_prep_solution": "Store at room temperature for 2-3 days, refrigerate when ripe",
    "random_fact": "Tomatoes are technically a fruit, but they are commonly used as vegetables.",
    "storage_time": "3 days"
  }
}

```

For the `GET /storage?time=` query, each item will need a `storage_time` field to match the query.

For `GET /safe-prep?items=`, each item should have fields like `safe_storage` and `prep_tip` to allow the API to respond with safety information for multiple items.

This structure allows for flexibility, scalability, and detailed responses to user requests, while keeping the API simple and focused on helping users manage their meal prep efficiently.
