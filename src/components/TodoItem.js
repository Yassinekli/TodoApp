import React, {Component} from 'react';

class TodoItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            todoTitle: props.todoTitle,
            completed : props.completed
        };
    }
    
    changeHandler = ()=> {
        this.setState({
            id: this.state.id,
            todoTitle: this.state.todoTitle,
            completed : !this.state.completed
        })
    }
    
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

    render(){
        
        
        return (
            <div className="row border border-bottom-0 border-primary rounded">
                <div className="custom-control custom-checkbox text-truncate col pt">
                    <input 
                        type="checkbox"
                        className="custom-control-input" 
                        id={"cb" + this.state.id}
                        defaultChecked={this.state.completed}
                        onChange={this.changeHandler}
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
