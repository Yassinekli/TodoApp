import React, { Component } from 'react';

class TodoModal extends Component {
	constructor(props){
		super(props);
		this.state = {
			showAlert: false
		}
	}

	componentWillUpdate(){
		if(!this.props.modal.show && this.state.showAlert)
		{
			this.setState({
				showAlert: false
			})
		}
	}

	componentDidUpdate(){
		if(this.props.modal.show)
		{
			this.textInput.value = "";
			
			if(this.props.modal.option === 'EDIT')
				this.textInput.value = this.props.modal.todoTitle;
			
			let textLength = this.textInput.value.length;
			this.textInput.disabled = false;
			this.textInput.focus();
			this.textInput.setSelectionRange(textLength, textLength);
			this.btnSubmit.disabled = (textLength === 0 || this.textInput.value.trim() === this.props.modal.todoTitle);
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
							onKeyUp={(e)=>{
								if(e.key.toUpperCase() === "ENTER")
								{
									if(!this.btnSubmit.disabled)
									{
										this.textInput.disabled = true;
										this.btnSubmit.disabled = true;
										this.props.submitTodo({option: this.props.modal.option, todoId:this.props.modal.todoId})
										.then(res=>{
											if(res === 1)
												this.setState({
													showAlert: false
												})
										})
										.catch(res=>console.log(res));
									}
									else
										this.setState({
											showAlert: true
										})
								}
							}}
							onInput={()=>{
								this.btnSubmit.disabled = (this.textInput.value.trim().length === 0 || this.textInput.value.trim() === this.props.modal.todoTitle);
							}}
						/>
						<div className={(this.state.showAlert) ? "alert alert-danger show-alert-danger" : "alert alert-danger"} role="alert">
							Can't add or edit an empty or same todo's title
						</div>
						<button 
							className="btn btn-primary btn-add" 
							ref={elem=>this.btnSubmit = elem}
							onClick={()=>{
								this.textInput.disabled = true;
								this.btnSubmit.disabled = true;
								this.props.submitTodo({option: this.props.modal.option, todoId:this.props.modal.todoId})
								.then(res=>{
									if(res === 1)
										this.setState({
											showAlert: false
										})
								})
								.catch(res=>console.log(res));
							}}
						>{this.props.modal.option}</button>
					</div>
				</div>
			</div>
		)
	}
}

export default TodoModal;
