import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <input type="text"
            placeholder="Search through a thousand movies" 
            value={searchTerm}
            onChange = {(event) => setSearchTerm(event.target.value)} 
            />
        </div>
      </div>
  )
}

export default Search