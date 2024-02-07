import React, { useState } from 'react'

export default function FormItem({ onSubmit }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ name, category });
        setName('');
        setCategory('');
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Category:
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

            </label>
            <button type="submit">SUBMIT</button>
        </form>
    )
}
