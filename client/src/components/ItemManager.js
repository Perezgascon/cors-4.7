import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableItems from './TableItems'
import FormItem from './FormItem'

export default function ItemManager() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        try {
            setLoading(true)
            const response = await axios.get('http://localhost:8080/items')
            setItems(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleSubmit = async (formData) => {
        try {
            setLoading(true)
            // Send a POST request to create a new item
            const response = await axios.post('http://localhost:8080/items', formData)
            // Add the newly created item to the items array
            setItems(prevItems => [...prevItems, response.data])
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    

    return (
        <div>
            <h1>Items</h1>
            {items.length > 0 && <TableItems items={items} />}
            <FormItem onSubmit={handleSubmit} />
        </div>
    )
}
