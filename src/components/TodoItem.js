import React, {Component} from 'react';

class TodoItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            todoTitle: props.todoTitle,
            completed : props.completed,
            dragStart : false
        };
    }
    
    // Methods
    titleStyle(){
        let titleStyle = {
            textDecorationLine : 'none',
            fontWeight: 500
        }

        if(this.state.completed)
        {
            titleStyle.textDecorationLine = 'line-through';
            titleStyle.fontWeight = 400;
        }

        return titleStyle;
    }

    dragingPropStyle(){
        if(!this.state.dragStart)
            return;
        return {
            background : '#dde2ff',
            zIndex: 1000,
            top: this.state.Y + "px"
        }
    }

    // Event Handlers
    changeHandler(){
        this.setState({
            id: this.state.id,
            todoTitle: this.state.todoTitle,
            completed : !this.state.completed,
            dragStart : false
        })
    }
    
    dragStartHandler(e){
        this.setState({
            id: this.state.id,
            todoTitle: this.state.todoTitle,
            completed : this.state.completed,
            dragStart : true
        })
    }

    dragHandler(e){
        // console.log('X : ', e.clientX, ', Y : ', e.clientY);
        if( this.state.Y && this.state.Y === e.clientY )
            return;
        
        let targetStyle = window.getComputedStyle(e.target, null);
        console.log(targetStyle.height);
        
        
        let Y = e.clientY;

        this.setState({
            id: this.state.id,
            todoTitle: this.state.todoTitle,
            completed : this.state.completed,
            dragStart : true,
            Y
        });
    }

    dragEndHandler(e){
        this.setState({
            id: this.state.id,
            todoTitle: this.state.todoTitle,
            completed : this.state.completed,
            dragStart : false
        });
    }
    
    // Render Method
    render(){
        return (
            <div
                className='row border border-bottom-0 border-primary rounded'
                style={this.dragingPropStyle()}
                draggable
                onDragStart={(e)=>this.dragStartHandler(e)}
                onDrag={(e)=>this.dragHandler(e)}
                onDragEnd={(e)=>this.dragEndHandler(e)}
                >
                <div className="custom-control custom-checkbox text-truncate col pt">
                    <input 
                        type="checkbox"
                        className="custom-control-input" 
                        id={"cb" + this.state.id}
                        defaultChecked={this.state.completed}
                        onChange={()=>this.changeHandler()}
                        />
                    <label 
                        className="custom-control-label pl-3 todo-title col"
                        htmlFor={"cb" + this.state.id}
                        style={this.titleStyle()}
                        >{this.state.todoTitle}</label>
                </div>
                <span className="p-2 pt"><i className="far fa-star fa-lg icon"></i></span>
                <span className="p-2 pt"><i className="far fa-edit fa-lg icon"></i></span>
                <span className="p-2 pr-3 pt"><i className="far fa-trash-alt fa-lg icon"></i></span>
            </div>
        )
    }
}

export default TodoItem;
