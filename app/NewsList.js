import React from 'react';
import NewsHeader from './NewsHeader.js';
import NewsItem from './NewsItem.js';
import './NewsList.css';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initItems: [],
            newsItems: [],
            tags: []
        };
    }
    componentWillMount() {
        var URL = 'https://api.rss2json.com/v1/api.json?rss_url=http://www.abc.net.au/news/feed/51120/rss.xml';
        fetch(URL)
            .then(function(response) {
                return response.json();
            })
            .then(parsedData => {
                if(this.state.initItems.length<=0) {this.setState({ initItems: parsedData.items });}
                this.setState({ newsItems: parsedData.items });
            })
    }
    componentDidMount() {
        // $('.mainContainer')
        $('.listItems')
            .visibility({
                once: false,
                observeChanges: true,
                onBottomVisible: function () {
                    console.log('loading more...');
                }
            })
        ;
    }
    sortByDate() {
        var list = this.state.newsItems;
        list.sort(function(a, b){
            if(a.pubDate < b.pubDate) return -1;
            if(a.pubDate > b.pubDate) return 1;
            return 0;
        });
        this.setState({ newsItems: list });
    }
    sortByTitle() {
        var list = this.state.newsItems;
        list.sort(function(a, b){
            if(a.title < b.title) return -1;
            if(a.title > b.title) return 1;
            return 0;
        });
        this.setState({ newsItems: list });
    }
    filterByTag() {
        if(this.state.tags.length<=0) {
            this.setState({ newsItems: this.state.initItems });
        } else {
            var list = [];
            (this.state.initItems).map((item, index) => {
                var included = false;
                (this.state.tags).map((tag, index) => {
                    if(item.categories.includes(tag) && !included) {
                        list.push(item);
                        included = true;
                    } else if(!item.categories.includes(tag) && included) {
                        list.splice(-1,1);
                    }
                });
            });
            this.setState({ newsItems: list });
        }
    }
    generateTagFilter() {
        return(
            <div className="tagFilter">
                <span hidden={this.state.tags.length<=0}>Filtered by:</span>
                {
                    (this.state.tags).map((tag, index) =>
                        <a className="ui label" key={index} onClick={()=>{this.removeTag(tag)}}>{tag}<i className="delete icon"></i></a>
                    )
                }
            </div>
        );
    }
    addTag(tag) {
        var list = this.state.tags;
        if(!list.includes(tag)) {
            list.push(tag);
            this.setState({tags: list});
            this.filterByTag();
        }
    }
    removeTag(tag) {
        var list = this.state.tags;
        var index = list.indexOf(tag);
        if (index > -1) {
            list.splice(index, 1);
            this.setState({ tags: list });
            this.filterByTag();
        }
    }
    generateNewsList() {
        return (
            <div className="listItems">
                {
                    (this.state.newsItems).map((item, index) =>
                        <NewsItem key={index} item={item} rank={index+1} addTag={this.addTag.bind(this)}/>
                    )
                }
            </div>
        );
    }
    render() {
        $('.ui.search')
            .search({
                source : this.state.initItems,
                searchFields: [
                    'title'
                ],
                searchFullText: false
            })
        ;
        return (
            <div className="mainContainer">
                <NewsHeader sortByDate={this.sortByDate.bind(this)} sortByTitle={this.sortByTitle.bind(this)}/>
                <div className="listContainer">
                    {this.generateTagFilter()}
                    <br></br>
                    {this.generateNewsList()}
                </div>
            </div>
        );
    }
}

