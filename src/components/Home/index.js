import React, {useState, useEffect, Fragment} from 'react';
import M from 'materialize-css';

// Components
import BooksList from '../BooksList';

// Actions
import { getAll, update } from '../../utils/BooksAPI';


const Home = () => {

    const [books, setBooks] = useState([])
    const [currentlyReading, setCurrentlyReading] = useState([])
    const [wantToRead, setWantToRead] = useState([])
    const [read, setRead] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAll()
        .then((data) => {
            setBooks(data)
            setIsLoading(false)
        })
        .catch(() => {
            setIsLoading(false)
        })
    }, [])

    useEffect(()=> {
        setCurrentlyReading(books.filter((book) => book.shelf === 'currentlyReading'))
        setWantToRead(books.filter((book) => book.shelf === 'wantToRead'))
        setRead(books.filter((book) => book.shelf === 'read'))
    }, [books])

    const updateBookShelf = (book_id, shelf) => {
        update(book_id, shelf).then(() => {
            setBooks(books.map(book => {
                if (book.id === book_id){
                    book.shelf = shelf;
                }
                return book
            }))
            M.toast({html: 'Book added to shelf'})
        }).catch(() => {
            M.toast({html: 'Unable to add book'})
        })
    }

  return (
    <div className="container-fuild section">  
        {isLoading ? (<h6>Loading... </h6>) : (
            <Fragment>
                <h5 className="section"><strong>Currently Reading</strong></h5>
                <BooksList books={currentlyReading} updateBookShelf={updateBookShelf} />
                <h5 className="section"><strong>Want To Read</strong></h5>
                <BooksList books={wantToRead} updateBookShelf={updateBookShelf} />
                <h5 className="section"><strong>Read</strong></h5>
                <BooksList books={read} updateBookShelf={updateBookShelf}/>
            </Fragment>
        )}
    </div>
  );
}

export default Home;
