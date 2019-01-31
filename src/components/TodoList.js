import React, { Component } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

class TodoList extends Component {
    constructor(){
        super();
        this.state = {todos:[]};
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/todos?userId=1', {headers:{'Content-Type':'application/json;'}})
			.then(res=>{
                this.setState({todos:res.data});
			});
    }
    
    displayTodos(){
        return this.state.todos.map(todo => 
            <TodoItem 
                key={todo.id} 
                id={todo.id} 
                todoTitle={todo.title} 
                completed={todo.completed}
                />
            );
    }

    render() {
        return (
            <div className="todo-container">
                {this.displayTodos()}
            </div>
        )
    }
}

export default TodoList;
