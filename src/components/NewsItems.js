import React, { Component } from 'react'
import Img from "./images/News.jpg";

export class NewsItems extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, date, author, source } = this.props;
        return (
            <div className="my-3" style={{boxShadow: "4px 4px 3px 2px", borderRadius: "10px"}}>
                <div className="card" >
                    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger" style={{zIndex: "1"}}>
                        {source}
                    </span>
                    <img src={!imageUrl ? Img : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">Published by {author ? author : "Unknown"} on {new Date(date).toUTCString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">Know More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems