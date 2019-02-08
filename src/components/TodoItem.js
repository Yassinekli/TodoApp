import React, {Component} from 'react';

class TodoItem extends Component {
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

    getClassNames(draggedId){
        let classNames = 'row border border-primary rounded';
        if(this.props.id.toString() === draggedId)
            return classNames.concat(' hide');
        return classNames;
    }

    draggingPropsStyle(){
        if(this.props.style.top)
			return {
                top:  this.props.style.top,
                backgroundColor : '#dde2ff',
                width: '100%',
				position: 'absolute',
				zIndex:'-1'
			};
		return { };
    }

    // Render Method
    render(){
        return (
            <div
                id={this.props.id}
                className={this.getClassNames(this.props.draggedId)}
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
                <span className="p-2 pt"><i className="far fa-star fa-lg icon"></i></span>
                <span className="p-2 pt"><i className="far fa-edit fa-lg icon"></i></span>
                <span className="p-2 pr-3 pt"><i className="far fa-trash-alt fa-lg icon"></i></span>
            </div>
        )
    }
}

export default TodoItem;