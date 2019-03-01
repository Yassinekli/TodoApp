import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import AddTodo from './AddTodo';
import TodoList from './TodoList';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../style.css';


class App extends Component {
	constructor(){
		super();
		this.state = {
			draggedId: null,
			lastHoveredId : null,
			todos: []
		}
	}

	render() {
		return (
			<div className="container">
                <div className="clearfix">
                    <AddTodo addNewTodo={this.addNewTodo}/>
                </div>
				<TodoList 
					draggedId={this.state.draggedId} 
					lastHoveredId={this.state.lastHoveredId} 
					todos={this.state.todos}

					dragStartHandler={this.dragStartHandler}
					dragEnterHandler={this.dragEnterHandler}
					dragEndHandler={this.dragEndHandler}

					changeHandler={this.changeHandler}
					
					starHandler={this.starHandler}
					updateTodoHandler={this.updateTodoHandler}
					deleteTodoHandler={this.deleteTodoHandler}
				/>
            </div>
		);
	}

	/* 
		Lifecycle Methods
	*/
	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/todos?userId=1', {headers:{'Content-Type':'application/json;'}})
		.then(res=>res.json())
		.then(json=>{
			let i = 1;
			for (const todo of json) {
				todo.order = i;
				i++;
			}
			
			this.setState({
				draggedId: null,
				lastHoveredId : null,
				todos:json
			});
		});
	}

	/* 
		Handlers
	*/
	dragStartHandler = (e)=>{
		let todos = this.state.todos.slice();
		let clonedTodo = {...todos.find(todo => (todo.id.toString() === e.target.getAttribute('id')))}

		clonedTodo.id = clonedTodo.id + 'c';

		todos.push(clonedTodo);
		
		this.setState({
			draggedId: e.target.getAttribute('id'),
			lastHoveredId : null,
			todos
		})
	}
	
	dragEnterHandler = (e)=>{
		let hoveredId = e.currentTarget.getAttribute('id');
		
		if(hoveredId === this.state.draggedId || hoveredId.endsWith('c'))
			return;

		if(hoveredId === this.state.lastHoveredId){
			let top = window.getComputedStyle(e.currentTarget).top;
			top = top.substring(0, top.length - 2);
			if(top !== ((this.state.lastOrderHovered - 1) * 43).toString())
				return;
		}

		let orderDraggedElement = this.state.todos.find((box)=>(box.id.toString() === this.state.draggedId)).order;
		let orderHoveredElement = this.state.todos.find((box)=>(box.id.toString() === hoveredId)).order;
		
		let todos = this.state.todos.slice();
		let draggedTodos = [];
		let draggedIndex;
		let hoveredIndex;

		if(orderDraggedElement > orderHoveredElement)
		{
			this.state.todos.forEach((todo, i)=>{
				if(todo.id.toString().endsWith('c'))
					return
				if(todo.order === orderDraggedElement)
					draggedIndex = i;
				if(todo.order === orderHoveredElement)
					hoveredIndex = i;
				if(todo.order >= orderHoveredElement && todo.order < orderDraggedElement)
					draggedTodos.push(todo);
			})
			
			todos[draggedIndex].order = todos[hoveredIndex].order;
			draggedTodos.forEach(todo=>++todo.order);
		}
		else
		{
			this.state.todos.forEach((todo, i)=>{
				if(todo.id.toString().endsWith('c'))
					return
				if(todo.order === orderDraggedElement)
					draggedIndex = i;
				if(todo.order === orderHoveredElement)
					hoveredIndex = i;
				if(todo.order > orderDraggedElement && todo.order <= orderHoveredElement)
					draggedTodos.push(todo);
			})
			
			todos[draggedIndex].order = todos[hoveredIndex].order;
			draggedTodos.forEach(todo=>--todo.order);
		}

		todos[todos.length - 1].order = todos[draggedIndex].order;

		this.setState({
			draggedId: this.state.draggedId,
			lastHoveredId : hoveredId,
			lastOrderHovered: todos[hoveredIndex].order,
			todos
		});
	}
	
	dragEndHandler = ()=>{
		let todos = this.state.todos.slice();
		todos.pop();

		this.setState({
			draggedId: null,
			lastHoveredId : null,
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
					completed : !todo.completed,
					order : todo.order
				};
			return todo;
		})
		
		this.setState({
			draggedId: null,
			lastHoveredId : null,
			todos
		});
	}

	addNewTodo = ()=>{
		let todoTitle = document.getElementById('todoTitle');
		
		fetch('https://jsonplaceholder.typicode.com/todos', {
			method: 'POST',
			body: JSON.stringify({
				title: todoTitle.value.trim(),
				completed: false,
				userId: 1
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then(json => {
			let todos = this.state.todos.slice();
			
			json.order = todos.length + 1;
			todos.push(json);

			this.setState({
				draggedId: null,
				lastHoveredId : null,
				todos
			});
		})
		.catch(err=>console.error(err));
	}

	starHandler = (e)=>{
		let clickedTodoId = e.currentTarget.parentNode.getAttribute('id');
		let todos = this.state.todos.slice();
		let clickedTodo = todos.find(todo=>(todo.id.toString() === clickedTodoId));
		
		let lengthOfTodosToChange = 0;

		for (let i = 0; i < todos.length; i++)
		{
			let currentTodo = todos[i];
			if(lengthOfTodosToChange === clickedTodo.order)
				break;
			if(currentTodo.order >= 1 && currentTodo.order < clickedTodo.order)
			{
				++currentTodo.order;
				++lengthOfTodosToChange;
			}
		}

		clickedTodo.order = 1;

		this.setState({
			draggedId: null,
			lastHoveredId : null,
			todos
		});
	}

	updateTodoHandler = (e)=>{
		
	}

	deleteTodoHandler = (e)=>{
		
	}
}

export default App;
