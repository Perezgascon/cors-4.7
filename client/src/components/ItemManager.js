import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableItems from './TableItems'

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


    return (
        <div>
            <h1>Items</h1>
           {/* <ul>
                {fruits.map(fruit => (
                    <li key={fruit.id}>{fruit.name}</li>
                ))}
            </ul> */}
            {items.length > 0 && <TableItems items={items} />}
        </div>
    )
}
