import React, { Component } from 'react';

class Time extends Component {
  constructor(props){
    super(props);
    this.state = { time: Date.now() };
  }
  render(){
    const d = new Date(this.state.time);
    return(
      <h5>{ d.toLocaleTimeString("en-NZ", {timeZone: "America/New_York"})} | New York, NY</h5>
    );
  }
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

export default Time;