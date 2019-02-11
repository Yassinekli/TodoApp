import React, { Component } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

class TodoList extends Component {
    constructor(){
        super();
        this.state = {
            draggedId: null,
            todos:[]
        };
    }

	/* 
		Lifecycle Methods
	*/
	componentDidMount(){
		axios.get('https://jsonplaceholder.typicode.com/todos?userId=1', {headers:{'Content-Type':'application/json;'}})
		.then(res=>{
			this.setState({
				draggedId: null,
				todos:res.data
			});
		});
	}
	
	/* 
		Methods Helpers
	*/
	displayTodos(){
		return this.state.todos.map((todo, i) => 
			<TodoItem
				key={todo.id} 
				id={todo.id} 
				todoTitle={todo.title} 
				completed={todo.completed}
				style={(todo.id.toString().endsWith('c')) ? { top: todo.top } : { top: (43 * i) }}

				draggedId={this.state.draggedId}
				dragStartHandler={this.dragStartHandler}
				dragEnterHandler={this.dragEnterHandler}
				dragEndHandler={this.dragEndHandler}
				changeHandler={this.changeHandler}
			/>
		);
	}

	/* 
		Handlers
	*/
   dragStartHandler = (e)=>{
		let todos = this.state.todos.slice();
		let clonedTodo = {...todos.find(todo => (todo.id.toString() === e.target.getAttribute('id')))}
		
		let draggedRec = e.target.getBoundingClientRect();
		let parentRec = e.target.parentNode.getBoundingClientRect();
		let top = (draggedRec.top - parentRec.top) + "px";

		clonedTodo.id = clonedTodo.id + 'c';
		clonedTodo.top = top;

		todos.push(clonedTodo);
		
		this.setState({
			draggedId: e.target.getAttribute('id'),
			todos
		})
   }
   
   dragEnterHandler = (e)=>{
		let hoveredId = e.currentTarget.getAttribute('id');
		
		if(hoveredId === this.state.draggedId || hoveredId.endsWith('c'))
			return;

		let indexDraggedElement = this.state.todos.findIndex((box)=>(box.id.toString() === this.state.draggedId));
		let indexHoveredElement = this.state.todos.findIndex((box)=>(box.id.toString() === hoveredId));
		
		let draggedTodos;

		if(indexDraggedElement > indexHoveredElement)
			draggedTodos = this.state.todos.slice(indexHoveredElement, indexDraggedElement);
		else
			draggedTodos = this.state.todos.slice((indexDraggedElement + 1), (indexHoveredElement + 1));

		let filteredTodos = [];
		for (let i = 0; i < this.state.todos.length; i++) {
			let breaked = false;
			for (let j = 0; j < draggedTodos.length; j++) {
				if(this.state.todos[i].id === draggedTodos[j].id)
					{ breaked = true; break; }
			}
			if(!breaked)
				filteredTodos.push(this.state.todos[i]);
		}
		
		if(indexDraggedElement > indexHoveredElement)
			draggedTodos.forEach(box => {
				filteredTodos.splice(++indexHoveredElement, 0, box)
			});
		else
			draggedTodos.forEach(box => {
				filteredTodos.splice(indexDraggedElement++, 0, box)
			});
		
		let hoveredRec = e.currentTarget.getBoundingClientRect();
		let parentRec = e.currentTarget.parentNode.getBoundingClientRect();
		filteredTodos[filteredTodos.length - 1].top = ((hoveredRec.top - parentRec.top) + "px");

		this.setState({
			draggedId: this.state.draggedId,
			todos : filteredTodos
		});
   }
   
   dragEndHandler = (e)=>{
		let todos = this.state.todos.slice();
		todos.pop();

		this.setState({
			draggedId: null,
			todos
		});
   }

	changeHandler = (e)=>{
		let changedId = e.currentTarget.getAttribute('id');
		let todos = this.state.todos.slice();

		todos = todos.map(todo=>{
			if(('cb' + todo.id) === changedId)
				return {
					id: todo.id,
					title: todo.title,
					completed : !todo.completed
				};
			return todo;
		})
		
		this.setState({
			draggedId: null,
			todos
		});
  	}

	/* 
		Render Method
	*/
	render() {
		let todos = this.displayTodos();

		return (
			<div 
				className="todo-container" 
				style={{height: (this.state.draggedId) ? ((todos.length - 1) * 43) : (todos.length * 43)}}>
				{todos}
			</div>
		)
	}
}

export default TodoList;
