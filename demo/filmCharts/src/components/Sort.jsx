import React, { Component } from "react";

import './Sort.css';

class Sort extends Component {
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.props.handleSort(this.props.index,e.target.textContent);
    }

    render() {
        var _default = '';

        return (
            <ul className="sort">
                {this.props.sortList.map(function(item, index) {
                    return (
                        <li
                            className={this.props.currentKey === item ? 'active' : ''}
                            key={index}
                            onClick={this.handleClick}
                        >
                            {item}
                        </li>
                    );
                }, this)}
            </ul>
        );
    }
}

export default Sort;
