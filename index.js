const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;


app.use(cors());

app.use(express.json());

app.get('/health', (req, res) => {
    res.send('OK');
});

const items = [
    { id: 1, name: "Apple", category: "Fruit" },
    { id: 2, name: "Carrot", category: "Vegetable" },
    { id: 3, name: "Orange", category: "Fruit" },
    { id: 4, name: "Broccoli", category: "Vegetable" },
    { id: 5, name: "Banana", category: "Fruit" }
];

app.get('/items', (req, res) => {
    res.json(items); // Send all fruits as JSON response
});

app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id); // Extract ID from the request URL
    const item = items.find(item => item.id === itemId); // Find the fruit with the given ID
    if (item) {
        res.json(item); // Send the fruit as JSON response if found
    } else {
        res.status(404).json({ message: "Item not found" }); // Send 404 error if fruit is not found
    }
});

// Endpoint to create a fruit
app.post('/items', (req, res) => {
    // Assuming the request body contains JSON data with the new fruit details
    const newItem = req.body;
    // Generate a new ID for the fruit
    const newId = items.length + 1;
    newItem.id = newId;
    const newCategory = req.body.category;
    newItem.category = newCategory;
    // Add the new fruit to the fruits array
    items.push(newItem);
    res.status(201).json(newItem); // Return the newly created fruit with status code 201
});

// Endpoint to update a fruit
app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) {
        items[index] = { ...items[index], ...updatedItem };
        res.json(items[index]);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// Endpoint to delete a fruit
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) {
        items.splice(index, 1);
        res.json({ message: "Items deleted successfully" });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

