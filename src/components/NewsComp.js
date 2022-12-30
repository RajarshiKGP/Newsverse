import React, { Component } from 'react'
import Load from './Load';
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class NewsComp extends Component {

    static defaultProps = {
        country: "in",
        category: "general",
        pageSize: 15
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }

    capitalize = (str) => {
        return str[0].toUpperCase() + str.slice(1)
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(this.props.category)} - Newsverse`
    }

    updateNews = async () => {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            loading: false,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }
    // handleNextClick = async () => {
    //     this.setState({page: this.state.page + 1});
    //     this.updateNews();
    // }
    // handlePrevClick = async () => {
    //     this.setState({page: this.state.page - 1});
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            loading: false,
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    }
    render() {
        return (
            <div className="container" style={{ marginTop: "80px" }}>
                <h3 className="text-center">Your News Feed is here about {this.capitalize(this.props.category)}</h3>
                {/* {this.state.loading && <Load />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading && <Load />}
                >
                    <div className="container">
                        <div className="row my-4">
                            {this.state.articles.map((element) => {
                                return (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-success" onClick={this.handlePrevClick} disabled={this.state.page <= 1}>&#x21A4; Previous</button>
                    <button type="button" className="btn btn-success" onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}>Next &#x21A6;</button>
                </div> */}
            </div>
        )
    }
}

export default NewsComp