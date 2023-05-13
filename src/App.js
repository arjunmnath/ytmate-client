import "./css/App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Videos from "./components/Videos";
import Download from "./components/download"
import Footer from './components/footer'

// download request api url : https://youtubedownloaderbackendapi.herokuapp.com/
// beta testing uri : download/?url=https%3A%2F%2Fyoutu.be%2FqfVuRQX0ydQ&filename=nct hot sauce&itag=249&auth=5773a83bf2dabeaaac84a8089630041ae6fd8994ba4b5db2a68e3b8bfe0767e7

// https://www.youtube.com/get_video_info?video_id=op1QYwRAQpI&c=TVHTML5&cver=7.20210622.10.00&eurl=https%3A%2F%2Fyoutube.googleapis.com%2Fv%2Fop1QYwRAQpI&ps=default&gl=US&hl=en&html5=1
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/search/:q" exact component={Videos} />
          <Route path="/home" exact component={Home} />
          <Route path="/" exact component={Home} />
          <Route path="/download/:id" exact component={Download} />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
