// CategoryForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function CategoryForm({ categoryId, initialCategoryName, onCancel }) {
    const [categoryName, setCategoryName] = useState(initialCategoryName);

    const handleInputChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/categories/${categoryId}`, { name: categoryName });
            // Optionally, you can fetch the updated categories after editing
            onCancel(); // Cancel the edit mode
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={categoryName}
                onChange={handleInputChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}
