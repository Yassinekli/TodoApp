import React, { Component } from 'react';
import $ from 'jquery';

class DeleteConfirmation extends Component {
	componentDidMount(){
		$('[data-toggle="tooltip"]').tooltip({
			trigger:"hover", 
			delay: { 'show': 100 }
		});
	}
	
	render() {
		let classNames = "confirm-delete px-2 pt";
		if(this.props.visibility)
		{
			classNames += " confirm-delete-show";
		}

		return (
			<span className={classNames}>
				<span 
					className="px-2"
					data-toggle="tooltip"
					title="Cancel Your Delete"
					data-placement="top"
					onClick={()=>this.props.onCancelDelete(false)}
					><i className="far fa-times-circle fa-lg icon"></i></span>
				<span 
					id="btnOK"
					className="px-2"
					data-toggle="tooltip"
					title="Confirm Your Delete"
					data-placement="top"
					onClick={()=>{
						$('#btnOK').tooltip('hide');
						this.props.onConfirmDelete(this.props.infoClickedTodo);
					}}
				><i className="far fa-check-circle fa-lg icon"></i></span>
			</span>
		)
	}
}

export default DeleteConfirmation;
