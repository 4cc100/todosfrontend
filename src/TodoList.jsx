import React, { Component } from 'react';
import TodoItem from './TodoItem';

const APIURL = '/api/todos';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teendok: []
    }
  }

  componentWillMount(){
    this.loadTodos();
  }

  loadTodos = () => {
    fetch(APIURL)
      .then( (responseData) => {
        if(!responseData.ok) {
          if(responseData.status >= 400 && responseData.status < 500) {
            return responseData.json().then( (data) => {
              let err = {errorMessage: data.message};
              throw err;
            }) 
          } else {
            let err = {errorMessage: 'Please try again later, server is busy'};
            throw err;
          }
        }
        return responseData.json();
      })
      .then( (teendok) => this.setState({teendok}))
      .catch( (err) => console.error(`The following error occured ${err}`));
  }

  render() {
    const todos = this.state.teendok.map((teendo) => {
      return (
        <TodoItem 
          key = {teendo._id}
          {...teendo}
        />
      )
    } ); 
      return (
      <div>
        <h1>Todo List!</h1>
        <ul
        style = {{listStyle: 'none'}}
        >
          {todos}
        </ul>
      </div>
    )
  }
}

export default TodoList;