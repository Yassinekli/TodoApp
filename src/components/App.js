import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import AddTodo from './AddTodo';
import TodoList from './TodoList';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../style.css';


class App extends Component {
	render() {
		return (
			<div className="container">
                <div className="clearfix">
                    <AddTodo/>
                </div>
				<TodoList/>
            </div>
		);
	}
}

export default App;
