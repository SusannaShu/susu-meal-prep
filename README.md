# SuSu Meal Prep API Documentation

This API helps users manage their groceries, track food storage time, and get the best tips for meal prepping to maximize nutrition, convenience, and safety. It provides information on how to store, cook, and safely handle various food items.

## Base URL:

```arduino
https://susu-meal-prep.onrender.com

```

---

## Endpoints

### 1. **Get Meal Prep Tips by Food Item**

### Description:

Retrieve detailed meal prep tips, risks, storage information, and random facts about a specific food item.

### Endpoint:

```bash
GET /meal-prep/:item

```

### Parameters:

- `item` (string) — The name of the food item you want to query. It is case-insensitive.

### Example Request:

```bash
GET /meal-prep/tomato

```

### Example Response:

```json
json
Copy code
{
  "description": "A red fruit rich in lycopene and vitamin C.",
  "tip": ["Eat raw for maximum vitamin C", "Cooking increases lycopene availability"],
  "risk": ["Avoid metal containers for long storage"],
  "meal_prep_solution": "Store at room temperature for 2-3 days, refrigerate when ripe",
  "random_fact": "Tomatoes are technically a fruit, but they are commonly used as vegetables.",
  "storage_time": "3 days"
}

```

### Error Response (If food item not found):

```json
{
  "message": "Sorry, we don't have information about Tomato."
}

```

---

### 2. **Get Foods by Storage Time**

### Description:

Retrieve a list of foods that can be stored for a specified number of days.

### Endpoint:

```bash
GET /storage

```

### Query Parameters:

- `time` (number) — The number of days you want to query for food storage time.

### Example Request:

```sql
GET /storage?time=3

```

### Example Response:

```json
json
Copy code
{
  "items": [
    {
      "name": "Lettuce",
      "tip": "Store in the fridge for freshness",
      "storage_time": "3 days"
    },
    {
      "name": "Mushroom",
      "tip": "Store in a paper bag to prevent moisture buildup",
      "storage_time": "3 days"
    }
  ]
}

```

### Error Response (If no items found for the specified time):

```json
{
  "message": "No items found with storage time of 3 days."
}

```

---

### 3. **Get Safe Storage and Prep Tips for Multiple Items**

### Description:

Get combined safe storage and preparation tips for multiple food items.

### Endpoint:

```bash
GET /safe-prep

```

### Query Parameters:

- `items` (string) — A comma-separated list of food items you want to query. For example: `lettuce,tomato,mushroom`.

### Example Request:

```bash
GET /safe-prep?items=lettuce,tomato,mushroom

```

### Example Response:

```json
{
  "items": [
    {
      "name": "Lettuce",
      "safe_storage": "Store in the fridge for up to 3 days in a sealed container",
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

### Error Response (If no matching items found):

```json
{
  "message": "No matching items found for your query."
}

```

---

## Error Handling

If the request cannot be processed, the API will return an error message with a status code indicating the issue.

- **404 Not Found**: If the requested food item or storage time is not available in the database.

Example:

```json
{
  "message": "Sorry, we don't have information about Lettuce."
}

```

---

## Running the API

1. Install the required dependencies (e.g., `express`):
    
    ```bash
    npm install
    
    ```
    
2. Run the server:
    
    ```bash
    node index.js
    
    ```
    
3. The API will listen on `http://localhost:3001`.