import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Categories({ onSelectCategory }) {

    const [categories, setCategories] = useState([]);

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


    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <button onClick={() => onSelectCategory(category.name)}>
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
