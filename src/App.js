import React, { Component } from 'react';
import BookList from "./components/BookList";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import AddBook from "./components/AddBook";
// to wrap application and

const client = new ApolloClient({
    uri:'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
              <div className="main">
                <h1>Authors Book List</h1>
                <BookList/>
                <AddBook/>
              </div>
        </ApolloProvider>
    );
  }
}

export default App;
