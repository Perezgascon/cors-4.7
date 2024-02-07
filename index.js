const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/health', (req, res) => {
    res.send('OK');
});

const fruits = [
    { id: 1, name: "apple" },
    { id: 2, name: "banana" },
    { id: 3, name: "orange" },
    { id: 4, name: "grape" },
    { id: 5, name: "strawberry" }
];

app.get('/fruits', (req, res) => {
    res.json(fruits); // Send all fruits as JSON response
});

app.get('/fruits/:id', (req, res) => {
    const fruitId = parseInt(req.params.id); // Extract ID from the request URL
    const fruit = fruits.find(fruit => fruit.id === fruitId); // Find the fruit with the given ID
    if (fruit) {
        res.json(fruit); // Send the fruit as JSON response if found
    } else {
        res.status(404).json({ message: "Fruit not found" }); // Send 404 error if fruit is not found
    }
});

// Endpoint to create a fruit
app.post('/fruits', (req, res) => {
    // Assuming the request body contains JSON data with the new fruit details
    const newFruit = req.body;
    // Generate a new ID for the fruit
    const newId = fruits.length + 1;
    newFruit.id = newId;
    // Add the new fruit to the fruits array
    fruits.push(newFruit);
    res.status(201).json(newFruit); // Return the newly created fruit with status code 201
});

// Endpoint to update a fruit
app.put('/fruits/:id', (req, res) => {
    const fruitId = parseInt(req.params.id);
    const updatedFruit = req.body;
    const index = fruits.findIndex(fruit => fruit.id === fruitId);
    if (index !== -1) {
        fruits[index] = { ...fruits[index], ...updatedFruit };
        res.json(fruits[index]);
    } else {
        res.status(404).json({ message: "Fruit not found" });
    }
});

// Endpoint to delete a fruit
app.delete('/fruits/:id', (req, res) => {
    const fruitId = parseInt(req.params.id);
    const index = fruits.findIndex(fruit => fruit.id === fruitId);
    if (index !== -1) {
        fruits.splice(index, 1);
        res.json({ message: "Fruit deleted successfully" });
    } else {
        res.status(404).json({ message: "Fruit not found" });
    }
});


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

