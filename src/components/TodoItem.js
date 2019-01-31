import React from 'react';

function TodoItem(props) {
    return (
        <div className="row border border-bottom-0 border-primary rounded">
            <div className="custom-control custom-checkbox pt pb-2 pr-2">
                <input type="checkbox" className="custom-control-input" id={"cb" + props.id}/>
                <label className="custom-control-label" htmlFor={"cb" + props.id}>{/* Don't forget to bring todo title HERE ! */}</label>
            </div>
            <span className="todo-text col text-truncate py-2 pl-2">{props.todoTitle}</span>
            <span className="p-2 pt"><i className="far fa-star fa-lg"></i></span>
            <span className="p-2 pt"><i className="far fa-edit fa-lg"></i></span>
            <span className="p-2 pr-3 pt"><i className="far fa-trash-alt fa-lg"></i></span>
        </div>
    )
}

export default TodoItem;
