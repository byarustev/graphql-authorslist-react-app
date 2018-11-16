import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from "../queries/queries"; // for binidng the query to the component

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            genre:'',
            authorId:'',
        }
    }

    changeState=(event)=>{
        let {name,value} = event.target;
        this.setState({[name]:value});
    };

    handleSubmit=(event)=>{
        if (event) event.preventDefault();
        let {name,genre,authorId}= this.state;
        this.props.addBookMutation({
            variables:{
                name,
                genre,
                authorId
            },
            refetchQueries:[{query:getBooksQuery }]
        });

    };

    displayAuthors(){
        let data=this.props.getAuthorsQuery;
        if (data.loading){
            return (<option>loading authors....</option>);
        }else{
            return data.authors.map((author,index)=>(
                <option key={index} value={author.id} >{author.name}</option>
            ));
        }
    }

    render() {
        let {name,genre,authorId} = this.state;

        return (
            <form id="add-book" onSubmit={e=>this.handleSubmit(e)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" value={name} name={'name'} onChange={e=>this.changeState(e)}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" value={genre} name={'genre'} onChange={e=>this.changeState(e)}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select name={'authorId'} onChange={e=>this.changeState(e)} >
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery,{name:'getAuthorsQuery'}),
    graphql(addBookMutation,{name:'addBookMutation'})
)(AddBook);
