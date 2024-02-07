import React from 'react'

export default function TableFruit({ fruits}) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fruits</th>
                    </tr>
                </thead>
                <tbody>
                    {fruits.map((fruit, index) => (
                        <tr key={fruit.id}>
                            <td>{fruit.id}</td>
                            <td>{fruit.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
