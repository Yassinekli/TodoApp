import React from 'react';

function TodoItem(props) {
    let textDecorationLine = '';

    if(props.completed)
        textDecorationLine = 'line-through';

    return (
        <div className="row border border-bottom-0 border-primary rounded">
            <div className="custom-control custom-checkbox text-truncate col pt">
                <input 
                    type="checkbox"
                    className="custom-control-input" 
                    id={"cb" + props.id} 
                    checked={props.completed}
                    
                    />
                <label 
                    className="custom-control-label pl-3 todo-title col"
                    htmlFor={"cb" + props.id}
                    style={{textDecorationLine}}
                    >{props.todoTitle}</label>
            </div>
            <span className="p-2 pt"><i className="far fa-star fa-lg icon"></i></span>
            <span className="p-2 pt"><i className="far fa-edit fa-lg icon"></i></span>
            <span className="p-2 pr-3 pt"><i className="far fa-trash-alt fa-lg icon"></i></span>
        </div>
    )
}

export default TodoItem;
