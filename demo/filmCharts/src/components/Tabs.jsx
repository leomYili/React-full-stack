import React, { Component } from "react";
import { withSubscription } from "./FilmList";
import Sort from './Sort';
import "./Tabs.css";

class Tab extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onSelect(e.target.closest("li").getAttribute("index"));
    }

    isActived() {
        return this.props.actived === "true" ? "tab-active" : "";
    }

    render() {
        return (
            <li
                className={this.isActived()}
                onClick={this.handleClick}
                index={this.props.index}
                ref={this.props.tabRef}
            >
                {this.props.children}
            </li>
        );
    }
}

class TabHeader extends Component {
    render() {
        return <ul className="tab-title">{this.props.children}</ul>;
    }
}

class TabPanel extends Component {
    render() {
        var _default = "tab-panel";
        _default += this.props.actived === "true" ? " tab-active" : "";

        var WrapComponent = withSubscription(this.props.item);

        return (
            <div className={_default} ref={this.props.tabPanelRef}>
                <Sort index={this.props.index} handleSort={this.props.handleSort} currentKey={this.props.item.sortKey} sortList={this.props.item.sortList} />
                <WrapComponent/>
            </div>
        );
    }
}

export class Tabs extends Component {
    constructor(props) {
        super(props);

        this.tabs = [];
        this.tabPanels = [];

        this.state = {
            defaultIndex: props.defaultIndex || 0,
            currentIndex: props.defaultIndex || 0
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        var _index = this.state.defaultIndex;

        this.props.init(_index);
    }

    handleClick(index) {

        this.setState({currentIndex: index});

        this.props.init(index);
    }

    render() {
        return (
            <div className="tab">
                <TabHeader>
                    {this.props.sd.map(function(item, index) {
                        return (
                            <Tab
                                actived={
                                    this.state.currentIndex == index
                                        ? "true"
                                        : "false"
                                }
                                key={index}
                                index={index}
                                onSelect={this.handleClick}
                                tabRef={el => {
                                    this.tabs.push(el);
                                }}
                            >
                                <a>{item.tabName}</a>
                            </Tab>
                        );
                    },this)}
                </TabHeader>
                <div className="tab-content">
                    {this.props.sd.map(function(item, index) {
                        return (
                            <TabPanel
                                actived={
                                    this.state.currentIndex == index
                                        ? "true"
                                        : "false"
                                }
                                tabPanelRef={el => {
                                    this.tabPanels.push(el);
                                }}
                                key={index}
                                index={index}
                                item={item}
                                handleSort={this.props.handleSort}
                            />
                        );
                    },this)}
                </div>
            </div>
        );
    }
}
