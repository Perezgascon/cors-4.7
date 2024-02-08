import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from './Categories';
import Items from './Items';

export default function CategoriesWithItems() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/categories');
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleCategorySelect = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    return (
        <div>
            <h1>Categories With Items</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Categories categories={categories} onSelectCategory={handleCategorySelect} />
                    {selectedCategory && <Items categoryName={selectedCategory} />}
                </div>
            )}
        </div>
    );
}
