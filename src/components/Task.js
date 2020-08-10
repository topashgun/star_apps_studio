import React, { Component } from 'react'

export default class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            intervalId: "",
            currentCount: 0,
            status: "not_started"
        }
        this.timer = this.timer.bind(this);
    }

    componentDidMount() {
        if (this.props.task.status == "started") {
            var intervalId = setInterval(this.timer, 1000);
            this.setState({ intervalId: intervalId });
        }
    }
    componentDidUpdate() {
        if (this.props.task.status != this.state.status && this.props.task.status == "started") {
            var intervalId = setInterval(this.timer, 1000);
            this.setState({
                status: "started",
                intervalId: intervalId
            })
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    async timer() {
        await this.setState({ currentCount: this.state.currentCount + 1 });
        if ((this.state.currentCount) == 20) {
            this.props.finishTask(this.props.task.task);
            clearInterval(this.state.intervalId);
        }
    }

    render() {
        return (
            <div className="row mt-2">
                <div className="col-10">
                    <div class={`progress`} style={{ height: "100%" }}>
                        <div class={`progress-bar ${this.props.task.status == "done" ? 'bg-success' : this.props.task.status == "started" ? 'progress-bar-striped progress-bar-animated' : 'bg-warning'}`} role="progressbar" style={{ width: this.props.task.status == "started" ? (this.state.currentCount * 5) + "%" : this.props.task.status == "done" ? "100%" : "0%" }} id={this.props.task.task}></div>
                        <div className={`placeholder ${this.props.task.status == "not_started" ? 'colorBlack' : ''}`}>{this.props.task.status == "started" ? this.state.currentCount + " secs completed || Running on Server " + this.props.task.server : this.props.task.status == "not_started" ? "Waiting for server..." : "Done"}</div>
                    </div>
                </div >
                <div className="col-2">
                    <button className="btn btn-danger btn-block" onClick={() => this.props.deleteTask(this.props.task.task)} disabled={this.props.task.status == "not_started" ? false : "disabled"}>Delete</button>
                </div>
            </div >
        )
    }
}
