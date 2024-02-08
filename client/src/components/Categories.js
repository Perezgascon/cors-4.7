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

    const handleUpdateCategory = (categoryId, newName) => {
        // Update the category name in the state
        setCategories(categories.map(category => {
            if (category.id === categoryId) {
                return { ...category, name: newName };
            }
            return category;
        }));
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
                                onCancel={handleCancelEdit}
                                onUpdateCategory={handleUpdateCategory} // Pass the handleUpdateCategory function
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
