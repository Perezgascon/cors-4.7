import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function FruitManager() {
    const [fruits, setFruits] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchFruits()
    }, [])

    const fetchFruits = async () => {
        try {
            setLoading(true)
            const response = await axios.get('http://localhost:8080/fruits')
            setFruits(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    return (
        <div>
            <h1>Fruits</h1>
            <ul>
                {fruits.map(fruit => (
                    <li key={fruit.id}>{fruit.name}</li>
                ))}
            </ul>
        </div>
    )
}
