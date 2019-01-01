import React, { Component } from 'react';

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
    return (
      <h1>Todo List!</h1>
    )
  }
}

export default TodoList;