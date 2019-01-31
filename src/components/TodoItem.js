import React, { Component } from 'react';

class TodoItem extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row border border-bottom-0 border-primary rounded">
                    <div className="custom-control custom-checkbox pt pb-2 pr-2">
                        <input type="checkbox" className="custom-control-input" id="customCheck"/>
                        <label className="custom-control-label" htmlFor="customCheck"></label>
                    </div>
                    <span className="todo-text col text-truncate py-2 pl-2">Do my homeworks</span>
                    <span className="p-2 pt"><i className="far fa-star fa-lg"></i></span>
                    <span className="p-2 pt"><i className="far fa-edit fa-lg"></i></span>
                    <span className="p-2 pr-3 pt"><i className="far fa-trash-alt fa-lg"></i></span>
                </div>
                <div className="row border border-bottom-0 border-primary rounded">
                    <div className="custom-control custom-checkbox pt pb-2 pr-2">
                        <input type="checkbox" className="custom-control-input" id="customCheck2"/>
                        <label className="custom-control-label" htmlFor="customCheck2"></label>
                    </div>
                    <span className="todo-text col text-truncate py-2 pl-2">Do shopping with my mother</span>
                    <span className="p-2 pt"><i className="far fa-star fa-lg"></i></span>
                    <span className="p-2 pt"><i className="far fa-edit fa-lg"></i></span>
                    <span className="p-2 pr-3 pt"><i className="far fa-trash-alt fa-lg"></i></span>
                </div>
            </React.Fragment>
        )
    }
}

export default TodoItem;
