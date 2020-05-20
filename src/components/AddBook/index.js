import React, { useState, useEffect, useCallback } from 'react';
import M from 'materialize-css';

// Actions
import { search, update, getAll } from '../../utils/BooksAPI';

// Components
import BooksList from '../BooksList';
import Search from './search'

const AddBooks = () => {

    const [value, setValue] = useState('');
    const [books, setBooks] = useState([]);
    const [userBooks, setUserBooks] = useState([]);
    const [userBooksIDs, setUserBooksIDs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [startSearch, setStartSearch] = useState(false)


    useEffect(() => {
      getAll()
      .then((data) => {
        setUserBooks(data)
        setUserBooksIDs(data.map(book => book.id))
      })
    }, [])

    const searchQuery = useCallback(async () => {
      setIsLoading(true)
      setStartSearch(true)
      search(value).then(books => {
          setBooks((books || []).map(book => {
            return userBooksIDs.includes(book.id) ? userBooks.filter(book_obj => book_obj.id === book.id)[0] : book
          }))
          setIsLoading(false)
      }).catch(() => {
          setIsLoading(false)
      })
    }, [value, userBooksIDs, userBooks])

    useEffect(() => {
      value && searchQuery()
    }, [value, searchQuery])

    const handleSubmit = (event) => {
        event.preventDefault();
        searchQuery()
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setValue(value)
    }

    const updateBookShelf = (book_id, shelf) => {
      update(book_id, shelf).then(() => {
          M.toast({html: 'Book added to shelf'})
      }).catch(() => {
          M.toast({html: 'Unable to add book'})
      })
  }

  return (
    <div className="container-fuild section">
      <Search
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
      />
      {isLoading ? <h6>Loading...</h6> : (
        startSearch && value ? <BooksList books={books} updateBookShelf={updateBookShelf} isSearch /> : (
        <p className="section center">Search for new books to add to your list </p>
        )
      )}
    </div>
  );
}

export default AddBooks;
