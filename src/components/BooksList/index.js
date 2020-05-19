import React, {useEffect} from 'react';
import M from 'materialize-css';


const BooksList = ({ books, updateBookShelf }) => {

    useEffect(() => {
        const dropdown = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdown, {constrainWidth: false});
    }, [])

    return (
    <div className="row">
        {books.length > 0 ? (
            books.map(book => (
                <div className="col s12 m12 l4" key={book.id}>
                <div className="card horizontal z-depth-0">
                    <div className="card-image">
                        <img src={(book.imageLinks || {}).thumbnail} height="200" width="150" />
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                        <p>{book.title}</p>
                        <p className="section">
                            <small>{(book.authors || []).toString()}</small>
                        </p>
                        <div className="star-ratings-css">
                            <div className="star-ratings-css-top" style={{width: `${(book.averageRating/5) * 100}%`}}>
                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                            <div className="star-ratings-css-bottom">
                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                        </div>
                        <br/>
                        <button
                            className="dropdown-trigger btn btn-small z-depth-0 grey lighten-1 btn-width"
                            data-target={`book-${book.id}`}
                            style={{borderRadius: '1rem'}}
                        >
                            <i className="small material-icons right">arrow_drop_down</i>
                            more
                        </button>
                        <ul id={`book-${book.id}`} className='dropdown-content' style={{width: '100%'}}>
                            <li><button className="btn-flat disabled">move to ...</button></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><button onClick={() => updateBookShelf(book.id, 'currentlyReading')} className="btn-flat">Currently Reading</button></li>
                            <li><button onClick={() => updateBookShelf(book.id, 'wantToRead')} className="btn-flat">Want to Read</button></li>
                            <li><button onClick={() => updateBookShelf(book.id, 'read')} className="btn-flat">Read</button></li>
                            <li><button onClick={() => updateBookShelf(book.id, '')} className="btn-flat">None</button></li>
                        </ul>
                                
                        </div>
                    </div>
                </div>
                </div>
            ))
        ): (
            <p>No books Available</p>
        )}
    </div>
)
        }

export default BooksList;
