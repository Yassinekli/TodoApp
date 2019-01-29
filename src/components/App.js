import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import $ from 'jquery';
import '../style.css';

class App extends Component {
	componentDidMount()
	{ $('[data-toggle="tooltip"]').tooltip({placement:"top", title:"Add TODO", trigger:"hover", delay: { 'show': 600}}); }

	render() {
			return (
				<div className="container">
					<div className="clearfix">
						<button className="btn btn-primary float-right rounded-circle" 
									data-toggle="tooltip"
									>+</button>
					</div>
					<div className="todo-container">
						<div className="row border border-bottom-0 border-primary rounded">
							<span className="p-2"><input type="checkbox"/></span>
							<span className="col text-truncate py-2 pl-2">Do my homeworks</span>
							<span className="p-2">STAR</span>
							<span className="p-2">EDIT</span>
							<span className="p-2">DELETE</span>
						</div>
						<div className="row border border-bottom-0 border-primary rounded">
							<span className="p-2"><input type="checkbox"/></span>
							<span className="col text-truncate py-2 pl-2">Do shopping with my mother</span>
							<span className="p-2">STAR</span>
							<span className="p-2">EDIT</span>
							<span className="p-2">DELETE</span>
						</div>
					</div>
				</div>
			);
	}
}

export default App;
