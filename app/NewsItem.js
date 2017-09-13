import React from 'react';
import './NewsItem.css';

export default class NewsItem extends React.Component {
    componentDidMount() {
        $(this.props.item.content).appendTo($('#'+"newsItem"+this.props.rank));
    }
    generateTags(tags) {
        return (
            <div>
                {
                    tags.map((tag, index) =>
                        <a key={index} className="ui mini blue tag label" onClick={()=>{this.props.addTag(tag)}}>{tag}</a>
                    )
                }
            </div>
        );
    }
    getTitle() {
        return (
            <div>
                <p className="ui header newsItem-title">{this.props.item.title}</p>
                <small>{this.props.item.pubDate}</small>
            </div>
        );
    }
    render() {
        return (
            <div className="ui piled segment">
                {this.getTitle()}
                <hr></hr>
                <div className="stackable ui grid">
                    <div className="ten wide column">
                        <img className="ui fluid image" src={this.props.item.enclosure.link}></img>
                    </div>
                    <div className="six wide column" id={"newsItem"+this.props.rank}></div>
                </div>
                <hr></hr>
                {this.generateTags(this.props.item.categories)}
            </div>
        );
    }
}