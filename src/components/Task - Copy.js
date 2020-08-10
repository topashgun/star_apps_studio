import React, { Component } from 'react'

export default class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: this.props.task.task,
            status: ""
        }
        this.setTaskTime = this.setTaskTime.bind(this);
    }
    componentDidMount() {
        if (this.props.task.status != this.state.status) {
            this.setState({
                status: this.props.task.status
            })
        }
        this.setTaskTime();
    }
    componentDidUpdate() {
        if (this.props.task.status != this.state.status) {
            this.setState({
                status: this.props.task.status
            })
        }
        this.setTaskTime();
    }
    
    setTaskTime() {
        var task = this.state.task;
        var status = this.state.status;
        console.log(this.props.task.task + " : " + status);
        if (status == "started") {
            var seconds = 1;
            var self = this;
            var timer = setInterval(function () {
                seconds++;
                if (seconds == 20) {
                    document.querySelector('.placeholder[data-id="' + task + '"]').innerHTML = "Done";
                    document.getElementById(task).style.width = "100%";
                    clearInterval(timer);
                    self.props.finishTask(task);
                } else {
                    console.log()
                    document.getElementById(task).style.width = (seconds * 5) + "%";
                    document.querySelector('.placeholder[data-id="' + task + '"]').innerHTML = seconds;
                }

            }, 1000)
        } else if (status == "not_started") {
            document.querySelector('.placeholder[data-id="' + task + '"]').innerHTML = "Waiting...";
        } else if (status == "done") {
            document.querySelector('.placeholder[data-id="' + task + '"]').innerHTML = "Done";
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-10">
                    <div class="progress" style={{ height: "100%" }}>
                        <div class="progress-bar" role="progressbar" style={{ width: this.props.task.status == "started" ? "5%" : this.props.task.status == "done" ? "100%" : "0%" }} id={this.props.task.task}></div>
                        <div className="placeholder" data-id={this.props.task.task}></div>
                    </div>
                </div >
                <div className="col-2">
                    <button className="btn btn-danger btn-block">Delete</button>
                </div>
            </div >
        )
    }
}
