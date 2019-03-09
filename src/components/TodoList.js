import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
	/* 
		Methods Helpers
	*/
	displayTodos(){
		return this.props.todos.map(todo =>
			<TodoItem
				key={todo._id} 
				id={todo._id} 
				todoTitle={todo.title} 
				completed={todo.completed}
				order={todo.order}
				lastHoveredId={this.props.lastHoveredId}

				draggedId={this.props.draggedId}
				dragStartHandler={this.props.dragStartHandler}
				dragEnterHandler={this.props.dragEnterHandler}
				dragEndHandler={this.props.dragEndHandler}
				
				changeHandler={this.props.changeHandler}

				starHandler={this.props.starHandler}
				toggleTodoModal={this.props.toggleTodoModal}
				deleteTodoHandler={this.props.deleteTodoHandler}
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
