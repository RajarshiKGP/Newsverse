import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import NewsComp from './components/NewsComp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  state = {progress: 0}
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/Newsverse" element={<NewsComp setProgress={this.setProgress} key="general" country='in' category='general' apiKey={this.apiKey} />}/>
            <Route exact path="/business" element={<NewsComp setProgress={this.setProgress} key="business" country='in' category='business' apiKey={this.apiKey} />}/>
            <Route exact path="/sports" element={<NewsComp setProgress={this.setProgress} key="sports" country='in' category='sports' apiKey={this.apiKey} />}/>
            <Route exact path="/health" element={<NewsComp setProgress={this.setProgress} key="health" country='in' category='health' apiKey={this.apiKey} />}/>
            <Route exact path="/entertainment" element={<NewsComp setProgress={this.setProgress} key="entertainment" country='in' category='entertainment' apiKey={this.apiKey} />}/>
            <Route exact path="/technology" element={<NewsComp setProgress={this.setProgress} key="technology" country='in' category='technology' apiKey={this.apiKey} />}/>
            <Route exact path="/science" element={<NewsComp setProgress={this.setProgress} key="science" country='in' category='science' apiKey={this.apiKey} />}/>
          </Routes>
        </div>
      </Router>
    )
  }
}

