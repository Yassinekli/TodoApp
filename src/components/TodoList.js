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
			let i = 1;
			for (const todo of res.data) {
				todo.order = i;
				i++;
			}
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
		return this.state.todos.map(todo => 
			<TodoItem
				key={todo.id} 
				id={todo.id} 
				todoTitle={todo.title} 
				completed={todo.completed}
				style={{ top: ((todo.order - 1) * 43) }}
				lastHoveredId={this.state.lastHoveredId}

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
				if(top != ((this.state.lastOrderHovered - 1) * 43))
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
				// console.log('object')
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
				// console.log('object 1')
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
	
	dragEndHandler = (e)=>{
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
				style={{height: (this.state.draggedId) ? ((todos.length - 1) * 43) : (todos.length * 43)}}
			>
				{todos}
			</div>
		)
	}
}

export default TodoList;
