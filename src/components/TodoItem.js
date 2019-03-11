import React, {Component} from 'react';

import DeleteConfirmation from './DeleteConfirmation'

class TodoItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirmationVisibility: false
        };
    }

    // Methods
    titleStyle(){
        let titleStyle = {
            textDecorationLine : 'none',
            fontWeight: 500
        }

        if(this.props.completed)
        {
            titleStyle.textDecorationLine = 'line-through';
            titleStyle.fontWeight = 400;
        }

        return titleStyle;
    }

    getClassNames(){
        let classNames = 'row border border-primary rounded';
        if(this.props.id === this.props.draggedId)
            return classNames.concat(' hide');
        return classNames;
    }

    draggingPropsStyle(){
        if(this.props.id === (this.props.draggedId + 'c'))
			return {
                top:  ((this.props.order - 1) * 43),
                backgroundColor : '#dde2ff',
                zIndex:(this.props.lastHoveredId) ? '1' : '-1'
			};
		return {top:  ((this.props.order - 1) * 43)};
    }

    toggleConfirmationModal = (visibility)=>{
        this.setState({
            confirmationVisibility: visibility
        })
    }

    // Render Method
    render(){
        return (
            <div
                id={this.props.id}
                className={this.getClassNames()}
                style={this.draggingPropsStyle()}

                draggable
                onDragStart={(e)=>this.props.dragStartHandler(e)}
                onDragEnter={(e)=>this.props.dragEnterHandler(e)}
                onDragOver={e=>e.preventDefault()}
                onDragEnd={()=>this.props.dragEndHandler()}
            >
                <div className="custom-control custom-checkbox text-truncate col pt">
                    <input 
                        type="checkbox"
                        className="custom-control-input" 
                        id={"cb" + this.props.id}
                        defaultChecked={this.props.completed}
                        onChange={(e)=>this.props.changeHandler(e)}
                        />
                    <label 
                        className="custom-control-label pl-3 todo-title col"
                        htmlFor={"cb" + this.props.id}
                        style={this.titleStyle()}
                        >{this.props.todoTitle}</label>
                </div>
                <span className="p-2 pt" onClick={(e)=>this.props.starHandler(e)}><i className="far fa-star fa-lg icon"></i></span>
                <span className="p-2 pt"  onClick={()=>this.props.toggleTodoModal({show: true, option: 'EDIT', todoId: this.props.id, todoTitle: this.props.todoTitle})}><i className="far fa-edit fa-lg icon"></i></span>
                <span className="p-2 pr-3 pt"  onClick={()=>this.toggleConfirmationModal(true)}><i className="far fa-trash-alt fa-lg icon"></i></span>
                <DeleteConfirmation
                    visibility={this.state.confirmationVisibility}
                    infoClickedTodo={{_id: this.props.id, order: this.props.order}}
                    onConfirmDelete={this.props.deleteTodoHandler}
                    onCancelDelete={this.toggleConfirmationModal}
                />
            </div>
        )
    }
}

export default TodoItem;