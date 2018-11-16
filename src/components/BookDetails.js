import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from "../queries/queries"; // for binidng the query to the component

class BookDetails extends Component {
    displayBook(){
        let {book}=this.props.data;
        if (book){
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author</p>
                    <ul className="other-books">
                        {book.author.books.map((book,index)=>(
                            <li key={index}>{book.name}</li>
                            )
                        )
                        }

                    </ul>
                </div>
            )
        }else{
            return (<div>No book selected</div>);
        }
    }

    render() {
        return (
            <div >
                <ul id='book-details'>
                    <p>Output book details here</p>
                    {this.displayBook()}
                </ul>
            </div>
        );
    }
}

export default graphql(getBookQuery,{
    options:props=> {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);
