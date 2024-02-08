// Categories.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryForm from './CategoryForm'; // Import the CategoryForm component
import Items from './Items'; // Import the Items component

export default function Categories({ onSelectCategory }) {
    const [categories, setCategories] = useState([]);
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categories');
            setCategories(response.data);
        } catch (error) {
            console.log('Error fetching categories', error);
        }
    };

    const handleEditCategory = (categoryId) => {
        setEditingCategoryId(categoryId);
    };

    const handleCancelEdit = () => {
        setEditingCategoryId(null);
    };

    const handleSaveCategory = async (categoryId, newName) => {
        try {
            await axios.put(`http://localhost:8080/categories/${categoryId}`, { name: newName });
            setEditingCategoryId(null);
            fetchCategories(); // Refresh the categories after editing
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {editingCategoryId === category.id ? (
                            <CategoryForm
                                categoryId={category.id}
                                initialCategoryName={category.name}
                                onSave={handleSaveCategory}
                                onCancel={handleCancelEdit}
                            />
                        ) : (
                            <div>
                                <button onClick={() => onSelectCategory(category.name)}>
                                    {category.name}
                                </button>
                                <button onClick={() => handleEditCategory(category.id)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
