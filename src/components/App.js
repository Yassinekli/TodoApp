/* eslint-disable default-case */
import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';

import TodoModal from './TodoModal';
import TodoList from './TodoList';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../style.css';


class App extends Component {
	constructor(){
		super();
		this.state = {
			modal: {
				show: false,
				option: '',
				todoId: null,
				todoTitle: ''
			},
			draggedId: null,
			lastHoveredId : null,
			todos: [],
			originalTodos: [],
			showSaveChanges: false
		}
	}

	render() {
		return (
			<div className="container">
                <div className="clearfix">
					<TodoModal
						modal={this.state.modal} 
						addNewTodo={this.addNewTodo}
						toggleTodoModal={this.toggleTodoModal}
						submitTodo={this.submitTodo}
					/>
					<button 
						className={(this.state.showSaveChanges) ? "btn btn-primary float-left btn-save show-btn-save" : "btn btn-primary float-left btn-save"}
						onClick={()=>{
							let updateTodos = this.state.todos.filter((todo, i)=>todo.order !== this.state.originalTodos[i].order || todo.completed !== this.state.originalTodos[i].completed)
							fetch('http://localhost:3001/todos/update', {
								method: 'PUT',
								body: JSON.stringify({
									updateTodos
								}),
								headers: {
									"Content-type": "application/json; charset=UTF-8"
								}
							})
						}}
					>Save Changes</button>
					<button 
						className="btn btn-primary float-right rounded-circle plus"
						data-toggle="tooltip"
						title="Add TODO"
						data-placement="left"
						onClick={()=>this.toggleTodoModal({show: true, option: 'ADD', todoId: null, todoTitle: ''})}
					>
						<i className="fas fa-plus"></i>
					</button>
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
					toggleTodoModal={this.toggleTodoModal}
					deleteTodoHandler={this.deleteTodoHandler}
				/>
            </div>
		);
	}

	/* 
		Lifecycle Methods
	*/
	componentDidMount(){
		$('[data-toggle="tooltip"]').tooltip({
			trigger:"hover", 
			delay: { 'show': 600 }
		});

		fetch('http://localhost:3001/todos', {
			method: 'GET',
			mode: 'cors',
			headers:{'Content-Type':'application/json;'}
		})
		.then(res=>res.json())
		.then(json=>{
			this.setState({
				modal: {
					show: false,
					option: '',
					todoId: null,
					todoTitle: ''
				},
				draggedId: null,
				lastHoveredId : null,
				todos:json,
				originalTodos: json.map(todo=>({order: todo.order, completed: todo.completed}))
			});
		});
	}

	/* 
		Handlers
	*/
	dragStartHandler = (e)=>{
		let todos = this.state.todos.slice();
		let clonedTodo = {...todos.find(todo => (todo._id.toString() === e.target.getAttribute('id')))}

		clonedTodo._id = '#22#';

		todos.push(clonedTodo);
		
		this.setState({
			modal: {
				show: false,
				option: '',
				todoId: null,
				todoTitle: ''
			},
			draggedId: e.target.getAttribute('id'),
			lastHoveredId : null,
			todos,
			originalTodos: this.state.originalTodos,
			showSaveChanges: this.state.showSaveChanges
		})
	}
	
	dragEnterHandler = (e)=>{
		let hoveredId = e.currentTarget.getAttribute('id');
		
		if(hoveredId === this.state.draggedId || hoveredId === '#22#')
			return;

		if(hoveredId === this.state.lastHoveredId){
			let top = window.getComputedStyle(e.currentTarget).top;
			top = top.substring(0, top.length - 2);
			if(top !== ((this.state.lastOrderHovered - 1) * 43).toString())
				return;
		}

		let orderDraggedElement = this.state.todos.find((box)=>(box._id.toString() === this.state.draggedId)).order;
		let orderHoveredElement = this.state.todos.find((box)=>(box._id.toString() === hoveredId)).order;
		
		let todos = this.state.todos.slice();
		let draggedTodos = [];
		let draggedIndex;
		let hoveredIndex;

		if(orderDraggedElement > orderHoveredElement)
		{
			this.state.todos.forEach((todo, i)=>{
				if(todo._id === '#22#')
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
				if(todo._id === '#22#')
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

		let showSaveChanges = false;
		for (let i = 0; i < todos.length - 1; i++)
		{
			if(todos[i].order !== this.state.originalTodos[i].order || todos[i].completed !== this.state.originalTodos[i].completed)
			{
				showSaveChanges = true;
				break;
			}
		}
		
		this.setState({
			modal: {
				show: false,
				option: '',
				todoId: null,
				todoTitle: ''
			},
			draggedId: this.state.draggedId,
			lastHoveredId : hoveredId,
			lastOrderHovered: todos[hoveredIndex].order,
			todos,
			originalTodos: this.state.originalTodos,
			showSaveChanges
		});
	}
	
	dragEndHandler = ()=>{
		let todos = this.state.todos.slice();
		todos.pop();

		this.setState({
			modal: {
				show: false,
				option: '',
				todoId: null,
				todoTitle: ''
			},
			draggedId: null,
			lastHoveredId : null,
			todos,
			originalTodos: this.state.originalTodos,
			showSaveChanges: this.state.showSaveChanges
		});
	}

	changeHandler = (e)=>{
		let changedId = e.currentTarget.getAttribute('id');
		let todos = this.state.todos.slice();

		todos = todos.map(todo=>{
			if(('cb' + todo._id) === changedId)
				return {
					_id: todo._id,
					title: todo.title,
					completed : !todo.completed,
					order : todo.order
				};
			return todo;
		})
		
		let showSaveChanges = false;
		for (let i = 0; i < todos.length; i++)
		{
			if(todos[i].order !== this.state.originalTodos[i].order || todos[i].completed !== this.state.originalTodos[i].completed)
			{
				showSaveChanges = true;
				break;
			}
		}

		this.setState({
			modal: {
				show: false,
				option: '',
				todoId: null,
				todoTitle: ''
			},
			draggedId: null,
			lastHoveredId : null,
			todos,
			originalTodos: this.state.originalTodos,
			showSaveChanges
		});
	}

	submitTodo = ({option, todoId})=>{
		let todoTitle = document.getElementById('todoTitle');
		return new Promise((resolve, reject)=>{
			switch (option) {
				case "ADD":
						fetch('http://localhost:3001/todos', {
							method: 'POST',
							body: JSON.stringify({
								title: todoTitle.value.trim(),
								completed: false
							}),
							headers: {
								"Content-type": "application/json; charset=UTF-8"
							}
						})
						.then(res=>res.json())
						.then(newTodo => {
							if(Object.getOwnPropertyNames(newTodo).length !== 0)
							{
								let todos = this.state.todos.slice();
								let originalTodos = this.state.originalTodos.slice();
					
								todos.push(newTodo);
								originalTodos.push({order: newTodo.order, completed: newTodo.completed});
								
								this.setState({
									modal: {
										show: true,
										option,
										_id: null,
										todoTitle: ''
									},
									draggedId: null,
									lastHoveredId : null,
									todos,
									originalTodos,
									showSaveChanges: this.state.showSaveChanges
								});
								return resolve();
							}
							return reject("We got an issue to add this task, please try a few later.");
						})
						.catch(()=>reject("We got an issue to add this task, please try a few later."));
				break;
	
				case "EDIT":
					let newTitle = todoTitle.value.trim();
					fetch('http://localhost:3001/todos', {
						method: 'PUT',
						body: JSON.stringify({
							todoId,
							title: newTitle,
						}),
						headers: {
							"Content-type": "application/json; charset=UTF-8"
						}
					})
					.then(res=>res.json())
					.then(feedback=>{
						if(feedback && feedback[0].n === 1)
						{
							let todos = this.state.todos.slice();
							let updateTodo = todos.find(todo=>(todo._id === todoId));
							updateTodo.title = newTitle;
	
							this.setState({
								modal: {
									show: false,
									option: '',
									_id: null,
									todoTitle: ''
								},
								draggedId: null,
								lastHoveredId : null,
								todos,
								originalTodos: this.state.originalTodos,
								showSaveChanges: this.state.showSaveChanges
							});
							return resolve();
						}
						return reject("We got an issue to edit this task, please try a few later.");
					})
					.catch(()=>reject("We got an issue to edit this task, please try a few later."));
				break;
			}
		})
	}

	starHandler = (e)=>{
		let clickedTodoId = e.currentTarget.parentNode.getAttribute('id');
		let todos = this.state.todos.slice();
		let clickedTodo = todos.find(todo=>(todo._id.toString() === clickedTodoId));
		
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
			modal: {
				show: false,
				option: '',
				todoId: null,
				todoTitle: ''
			},
			draggedId: null,
			lastHoveredId : null,
			todos
		});
	}

	deleteTodoHandler = ({_id, order})=>{
		fetch('http://localhost:3001/todos', {
			method: 'DELETE',
			body: JSON.stringify({
				_id,
				order
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then((res)=>res.json())
		.then((feedback)=>{
			if(feedback && feedback[0].n === 1)
			{
				let todos = this.state.todos.filter(todo=>(todo.order !== order));
				let originalTodos = this.state.originalTodos.filter(todo=>(todo.order !== order));
				
				todos.forEach((todo, i)=>{
					if(todo.order > order)
					{
						todo.order--;
						originalTodos[i].order--;
					}
				})

				let showSaveChanges = false;
				for (let i = 0; i < todos.length; i++)
				{
					if(todos[i].order !== this.state.originalTodos[i].order || todos[i].completed !== this.state.originalTodos[i].completed)
					{
						showSaveChanges = true;
						break;
					}
				}

				this.setState({
					modal: {
						show: false,
						option: '',
						todoId: null,
						todoTitle: ''
					},
					draggedId: null,
					lastHoveredId : null,
					todos,
					originalTodos,
					showSaveChanges
				})
			}
		})
		.catch(err=>console.error(err));
	}

	/*
		Methods
	*/
	toggleTodoModal = ({show, option, todoId, todoTitle})=>{
		this.setState({
			modal: {
				show,
				option,
				todoId,
				todoTitle
			},
			draggedId: null,
			lastHoveredId : null,
			todos: this.state.todos
		});
	}
}

export default App;
