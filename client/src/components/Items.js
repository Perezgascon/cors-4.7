import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableItems from './TableItems';

export default function Items({ categoryName }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchItemsByCategory(categoryName);
    }, [categoryName]); // Re-fetch items whenever the category name changes

    const fetchItemsByCategory = async (categoryName) => {
        try {
            setLoading(true);
            const encodedCategoryName = encodeURIComponent(categoryName); // Encode category name
            const response = await axios.get(`http://localhost:8080/itemsByCategory/${encodedCategoryName}`);
            setItems(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Items in Category: {categoryName}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <TableItems items={items} />
            )}
        </div>
    );
}
