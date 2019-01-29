import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import '@fortawesome/fontawesome-free/css/all.css'
import '../style.css';

class App extends Component {
	componentDidMount()
	{ 
		$('[data-toggle="tooltip"]')
			.tooltip({placement:"top", title:"Add TODO", trigger:"hover", delay: { 'show': 600 }})
			.on('shown.bs.tooltip', ()=>{setTimeout(()=>{
				$('[data-toggle="tooltip"]').tooltip('hide');
			}, 3000)});
	}

	render() {
			return (
				<div className="container">
					<div className="clearfix">
						<button className="btn btn-primary float-right rounded-circle" data-toggle="tooltip"><i className="fas fa-plus"></i></button>
					</div>
					<div className="todo-container">
						<div className="row border border-bottom-0 border-primary rounded">
							<div className="custom-control custom-checkbox py-2 pr-2">
								<input type="checkbox" className="custom-control-input" id="customCheck"/>
								<label className="custom-control-label" htmlFor="customCheck"></label>
							</div>
							<span className="col text-truncate py-2 pl-2">Do my homeworks</span>
							<span className="p-2"><i className="far fa-star fa-lg"></i></span>
							<span className="p-2"><i className="far fa-edit fa-lg"></i></span>
							<span className="p-2 pr-3"><i className="far fa-trash-alt fa-lg"></i></span>
						</div>
						<div className="row border border-bottom-0 border-primary rounded">
							<div className="custom-control custom-checkbox py-2 pr-2">
								<input type="checkbox" className="custom-control-input" id="customCheck2"/>
								<label className="custom-control-label" htmlFor="customCheck2"></label>
							</div>
							<span className="col text-truncate py-2 pl-2">Do shopping with my mother</span>
							<span className="p-2"><i className="far fa-star fa-lg"></i></span>
							<span className="p-2"><i className="far fa-edit fa-lg"></i></span>
							<span className="p-2 pr-3"><i className="far fa-trash-alt fa-lg"></i></span>
						</div>
					</div>
				</div>
			);
	}
}

export default App;
