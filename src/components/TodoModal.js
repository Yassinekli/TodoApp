import React, { Component } from 'react';

class TodoModal extends Component {

	componentDidUpdate(){
		if(this.props.modal.show)
		{
			let textLength = this.textInput.value.length;
			this.textInput.focus();
			this.textInput.setSelectionRange(textLength, textLength);
			this.btnSubmit.disabled = (textLength === 0);
		}
	}
	
	render() {
		let modalContainerClassNames = "modal-container";

		if(this.props.modal.show)
			modalContainerClassNames += " show-modal";
		
		return (
			<div className={modalContainerClassNames} onClick={(e)=>{
				if(e.target.classList[0] === "modal-container" || e.target.classList[0] === "far")
					this.props.toggleTodoModal({show: false, option: '', todoTitle: ''});
				}
			}
			>
				<div className="modal-form">
					<div className="modal-head">
						<span className="modal-close"><i className="far fa-times-circle"></i></span>
						<h4 style={{fontSize: '1.2rem'}}>
							{this.props.modal.option} TASK
						</h4>
					</div>
					<hr/>
					<div className="modal-input clearfix">
						<input 
							type="text" 
							id="todoTitle"
							ref={elem=>this.textInput = elem} 
							className="form-control input-title"
							autoComplete="off"
							defaultValue={this.props.modal.todoTitle}
							onInput={()=>{this.btnSubmit.disabled = (this.textInput.value.trim().length === 0)}}
						/>
						<button 
							className="btn btn-primary btn-add" 
							ref={elem=>this.btnSubmit = elem} 
							onClick={()=>this.props.submitTodo(this.btnSubmit.value)}
						>{this.props.modal.option}</button>
					</div>
				</div>
			</div>
		)
	}
}

export default TodoModal;
