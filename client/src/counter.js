import { Component } from "react";

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
        this.incrementCount = this.incrementCount.bind(this);
    }
    componentDidMount() {
        console.log(
            "component mounted, now i can use axios to make a request from the server"
        );
    }
    incrementCount() {
        this.setState({
            count: this.state.count + 1,
        });
    }
    handleChange(e) {
        this.setState({
            name: e.target.value,
        });
    }
    render() {
        return (
            <div>
                <h1>I am the Counter the count is: {this.state.count}</h1>
                <button onClick={this.incrementCount}>CLICK</button>
                <input onChange={(e) => this.handleChange(e)} />
                <div>{this.state.name}</div>
            </div>
        );
    }
}

/*
    below is an alternative way to get around having to bind this.
    <button onClick={() => this.incrementCount()}>CLICK ME</button>
    */
