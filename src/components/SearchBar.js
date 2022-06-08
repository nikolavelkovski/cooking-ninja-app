
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function SearchBar() {
    const [term, setTerm] = useState('')
    const history = useHistory()

    const handleFormSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?q=${term}`)
    }
    return (
        <form onSubmit={handleFormSubmit} className="d-flex search-bar">
            <label htmlFor="search" className='text-white fs-3 '>Search:</label>
            <input className='ml-3 d-inline-block' type="text" id="search" required onChange={(e) => setTerm(e.target.value)} />

        </form>
    )
}
