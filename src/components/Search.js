import React from 'react'

function Search({search, setSearch, setQuery}) {

    const updateSearch = (e) => {
        setSearch(e.target.value)
    }
    const getSearch = (e) => {
        e.preventDefault();
        setQuery(search)
        setSearch('')

    }

    return (
        <div>
            <form onSubmit={getSearch} className="search-form"> 
    <input className="search-bar" type="text" value={search} onChange={updateSearch}></input>
                <button className="search-button" type="submit">Search</button>
            </form>
            <form><select><option>POtatoe</option></select></form>
        </div>
    )
}

export default Search
