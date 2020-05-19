import React from 'react';

const Search = ({handleSubmit, value, handleChange}) => (
    <form onSubmit={handleSubmit}>
    <br/>
    <div className="row">
        <input
            className="col s12 m7 l9"
            type="text"
            value={value}
            style={{margin: '1rem',}}
            placeholder="Search for books"
            name="search"
            onChange={handleChange}
        />
        <button 
            className="btn btn-large col s12 m4 l2 red lighten-1"
            style={{borderRadius: '2rem'}}
            type="submit"
        >
            Search
        </button>
        </div>

    </form>
  );

export default Search;
