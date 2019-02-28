import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
	/* 
		Methods Helpers
	*/
	displayTodos(){
		return this.props.todos.map(todo =>
			<TodoItem
				key={todo.id} 
				id={todo.id} 
				todoTitle={todo.title} 
				completed={todo.completed}
				style={{ top: ((todo.order - 1) * 43) }}
				lastHoveredId={this.props.lastHoveredId}

				draggedId={this.props.draggedId}
				dragStartHandler={this.props.dragStartHandler}
				dragEnterHandler={this.props.dragEnterHandler}
				dragEndHandler={this.props.dragEndHandler}
				changeHandler={this.props.changeHandler}
			/>
		);
	}

	/* 
		Render Method
	*/
	render() {
		let todos = this.displayTodos();

		return (
			<div 
				className="todo-container" 
				style={{height: (this.props.draggedId) ? ((todos.length - 1) * 43) : (todos.length * 43)}}
			>
				{todos}
			</div>
		)
	}
}

export default TodoList;
