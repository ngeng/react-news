import React from 'react';
import './NewsHeader.css';
import {Dropdown} from 'semantic-ui-react';

export default class NewsHeader extends React.Component {
    getSearch() {
        return (
            <div className="ui category search">
                <div className="ui icon input">
                    <input className="prompt" type="text" placeholder="Search articles..."></input>
                    <i className="search icon"></i>
                </div>
                <div className="results"></div>
            </div>
        );
    }
    getDropDown() {
        return (
            <Dropdown item text='Sort'>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={this.props.sortByDate}>Date</Dropdown.Item>
                    <Dropdown.Item onClick={this.props.sortByTitle}>Title</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
    render() {
        var navLinks = [
            {
                name: 'HOME',
                url: 'home'
            },
            {
                name: 'AUSTRALIA',
                url: 'australia'
            },
            {
                name: 'WORLD',
                url: 'world'
            },
            {
                name: 'BUSINESS',
                url: 'business'
            },
            {
                name: 'SPORT',
                url: 'sport'
            },
            {
                name: 'SCIENCE',
                url: 'science'
            },
            {
                name: 'ARTS',
                url: 'arts'
            }
        ];
        return (
            <div id="newsHeader" className="ui inverted segment">
                <div className="ui inverted secondary pointing menu">
                    {
                        navLinks.map(function(navLink) {
                            return (
                                <a className="item" key={navLink.name}>{navLink.name}</a>
                            );
                        })
                    }
                    <div className="right menu">
                        {this.getSearch()}
                        {this.getDropDown()}
                    </div>
                </div>
            </div>
        );
    }
}
