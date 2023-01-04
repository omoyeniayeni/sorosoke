import React, { Component } from "react";
import { Router, Redirect, navigate } from "@reach/router";
import jwt_decode from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.min.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
const GOOGLE_CLIENT_ID = "947362323574-h52vtsp5aenl8hhk9mo5cja89ahihjli.apps.googleusercontent.com";

import NotFound from "./pages/NotFound.js";
import NotCompatible from "./pages/NotCompatible.js";
import Navbar from "./modules/Navbar.js";
import Profile from "./pages/Profile.js";
import LoginPage from "./pages/LoginPage.js";
import Archive from "./modules/Archive.js";
import Speak from "./pages/Speak.js";
import SetTime from "./pages/SetTime.js";
import TopicPage from "./pages/TopicPage.js";
import Analysis from "./pages/Analysis.js";
import About from "./pages/About.js";
import SpeedChart from "./modules/SpeedChart.js";

import "../utilities.css";

// import { socket } from "../client-socket.js"; //socket

import { get, post, getSynonym } from "../utilities";
import Categories from "./pages/Categories.js";
import SetTimeInput from "./modules/SetTimeInput.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      userName: undefined,
      randomTopic: undefined,
      setTime: undefined,
      timeUsed: 0,
      speed: 0,
      pauses: undefined,
      pauseRate: undefined,
      pauseTime: undefined,
      speechDelay: undefined,
      transcriptContent: "",
      transcriptTopic: "",
      transcriptId: "",
      repeatedWords: [],
      synonyms: [],
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ 
          userId: user._id,
          userName: user.name
        });
      }
    }); 
    
    // console.log((this.findSynonyms("monkey big big big monkey big monkey learn up")))
  }

  handleLogin = (res) => {
    let decoded = jwt_decode(res.credential);
    console.log(decoded);
    console.log(`Logged in as ${decoded.name}`);
    const email_verified = decoded.email_verified;
    const userToken = res.credential;
    post("/api/login", { token: userToken }).then(() => {
      this.setState({ userId: decoded.sub, userName: decoded.name })
      navigate("/categories")
    });
  }  

  handleLogout = () => {
    console.log("Logged out successfully!");
    this.setState({ userId: undefined, userName: undefined });
    navigate("/");
    post("/api/logout");
  };

  handleTime = (minutes, seconds) => {
    // convertTime to seconds
    let formatedMinutes = 0;
    let formatedSeconds = 0;
    if (minutes !== "") {
      formatedMinutes = minutes
    }
    if (seconds !== "") {
      formatedSeconds = seconds
    }
    let setTime = parseInt(formatedMinutes * 60) + parseInt(formatedSeconds);
    this.setState({
      setTime: setTime
    })
  };

  provideTopic = (topic) => {
    let randomTopic = topic[Math.floor(Math.random()*topic.length)];
    this.setState({
      randomTopic: randomTopic
    })
  }

  analyseTranscript = (transcriptObj) => {
    this.setState({
      transcriptId: transcriptObj._id,
      transcriptTopic: transcriptObj.topic,
      transcriptContent: transcriptObj.transcript,
    }, () => {
      this.getSpeed();
      this.getPauseRate();
      // this.findSynonyms(this.state.transcriptContent);
      navigate("/analysis")})
  }

  // Find the most repeated word at each instance
  mostRepeatedWord = (sentence) => {
    // Permit the repetition of typically repeated words.
    let permitted = ["", "'", "''", " ", "is", "the", "as", "this", "that", "those", "who", "a", "also", "am", "an", "and", "are", "as",  
    "at", "because", "been", "before", "being", "but", "by", "can", "cannot", "cant", "do", "for", "from", "if", 
    "in", "into", "is", "it", "its", "itself", "nor", "not", "of", "off", "on", "onto", "or", "to", "very", "via", 
    "was", "we", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", 
    "whereby", "wherein", "whereupon", "wherever", "which"]

    let wordCounts = {};
    let words = sentence.split(/\b/);

    for(let i = 0; i < words.length; i++)
        if (!permitted.includes(words[i])) {
            wordCounts[words[i]] = (wordCounts[words[i]] || 0) + 1;
        }

    let max = 0;
    let mostRepeatedWord = '';

    for (let word of words) {
        if (wordCounts[word] > max) {
            max = wordCounts[word];
            if (max > 1) {
                mostRepeatedWord = word;
            }
        }
    }
    return mostRepeatedWord
  }

  topThreeRepeatedWords = (sentence) => {
    if (sentence) {
          sentence = sentence.concat(" ")

    let array = [];

    if (this.mostRepeatedWord(sentence) !== '') {
        array.push(this.mostRepeatedWord(sentence));
    }

    let newSentence = sentence.replaceAll(`${this.mostRepeatedWord(sentence)} `, '')

    if (this.mostRepeatedWord(newSentence) !== '') {
        array.push(this.mostRepeatedWord(newSentence));
    }

    let newerSentence = newSentence.replaceAll(`${this.mostRepeatedWord(newSentence)} `, '')

    if (this.mostRepeatedWord(newerSentence) !== '') {
        array.push(this.mostRepeatedWord(newerSentence));
    }

    return array;
    }
  }

  findSynonyms = (sentence) => {
    let array = this.topThreeRepeatedWords(sentence);
    let answerArray = []

    for (let index = 0; index < array.length; index++) {
      this.getSynonyms(array[index]).then(synonym => {
        answerArray[index] = synonym
      }).then(() => {
        this.setState({
          repeatedWords: array,
          synonyms: answerArray
        })
      })
    }
  }

  getSynonyms = (word) => {
    let answer = [];
    return getSynonym(word).then((synonym) => {
        answer = [...synonym.synonyms.slice(0, 3)]
        console.log(answer)
        return answer;
    })
  }



  // To solve the issue where the former transcript id is being sent,
  // reset the state of the transcript id after using it
  resetTranscript = () => {
    this.setState({
      transcriptId: ""
    })
  }

  // Send the duration in which the user spoke to Analysis through Speak
  sendTimeUsed = (timeUsed) => {
    this.setState({
      timeUsed: timeUsed
    })
  }

  // Send the duration in which the user was paused to Analysis through Speak
  // And send the number of pauses
  sendPauseTime = (pauses, pauseTime, speechDelay) => {
    this.setState({
      pauses: pauses,
      pauseTime: pauseTime,
      speechDelay: speechDelay,
    })
  }

  countWords = (sentence) => {
      // handles if something was said
      if (sentence) {
          let sentenceString = JSON.stringify(sentence);
          let numberOfWords = sentenceString.split(" ").length;
          return numberOfWords - 1
      }
      // handles if nothing was said
      else {
          return 0
      }
  }

  getSpeed = () => {
    console.log("getSpeed works")
    let sentence = this.state.transcriptContent;
    console.log(sentence)
    let rawSpeed = this.countWords(sentence)/this.state.timeUsed;
    console.log(rawSpeed)
    let speed = rawSpeed.toFixed(2)
    console.log(speed)
    this.setState({
      speed: speed
    })
  }

  getPauseRate = () => {
    let pauses = this.state.pauses;
    // console.log(sentence)
    let rawPauseRate = pauses/this.state.timeUsed;
    // console.log(rawSpeed)
    let pauseRate = rawPauseRate.toFixed(2)
    // console.log(speed)
    this.setState({
      pauseRate: pauseRate
    })
  }

  render() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      return (
        <GoogleOAuthProvider clientId = {GOOGLE_CLIENT_ID}>
          <Router>
            <LoginPage 
              exact path = "/"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              provideTopic = {this.provideTopic}
              userId={this.state.userId}
              userName={this.state.userName}
            />
            <Profile 
              path = "/profile/:user.id"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              provideTopic = {this.provideTopic}
              findSynonyms={this.findSynonyms}
              userId={this.state.userId}
              userName={this.state.userName}
            />
            <Categories 
              path = "/categories/"
              provideTopic = {this.provideTopic}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
              userName={this.state.userName}
            />
            <Speak 
              path = "/speak/"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              setTime = {this.state.setTime}
              randomTopic = {this.state.randomTopic}
              sendTimeUsed = {this.sendTimeUsed}
              sendPauseTime = {this.sendPauseTime}
              analyseTranscript = {this.analyseTranscript}
              provideTopic = {this.provideTopic}
              userId={this.state.userId}
              userName={this.state.userName}
              getSpeed={this.getSpeed}
              getPauseRate={this.getPauseRate}
              resetTranscript = {this.resetTranscript}
            />
            <SetTime
              path = "/timer/"
              handleTime = {this.handleTime}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              provideTopic = {this.provideTopic}
              randomTopic = {this.state.randomTopic}
              userId={this.state.userId}
              userName={this.state.userName}
            />
            {this.state.speed !== 0 ?
              <Analysis
              path = "/analysis/"
              transcriptId={this.state.transcriptId}
              transcriptTopic={this.state.transcriptTopic}
              transcriptContent={this.state.transcriptContent}
              speed={this.state.speed}
              timeUsed = {this.state.timeUsed}
              pauses = {this.state.pauses}
              pauseRate = {this.state.pauseRate}
              pauseTime = {this.state.pauseTime}
              speechDelay = {this.state.speechDelay}
              userName={this.state.userName}
              provideTopic = {this.provideTopic}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
              resetTranscript = {this.resetTranscript}
              topThreeRepeatedWords= {this.topThreeRepeatedWords}
              findSynonyms={this.findSynonyms}
              synonyms = {this.state.synonyms}
            />
            :
            null
            }
            <TopicPage 
              path = "/topic/"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              randomTopic = {this.state.randomTopic}
              provideTopic = {this.provideTopic}
              userId={this.state.userId}
              userName={this.state.userName}
            />
            <About 
              path = "/about/"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
              userName={this.state.userName}
            />
            <NotFound default />
          </Router>
        </GoogleOAuthProvider>
      );
    } 
    else {
      return (
        <NotCompatible />
      );
    }
  }
}

export default App;
