import React, { Component } from 'react'
import '../App.css';
import Tasks from './Tasks';
class Body extends Component {
    constructor() {
        super();
        this.state = {
            servers: [{
                name: 1,
                task: "",
                active: true
            }],
            tasks: []
        }
        this.addTasks = this.addTasks.bind(this);
        this.attachServers = this.attachServers.bind(this);
        this.finishTask = this.finishTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addServer = this.addServer.bind(this);
    }

    async addServer() {
        var existingServers = this.state.servers.length;
        if (existingServers < 10) {
            var serverObject = new Object();
            serverObject.name = existingServers + 1;
            serverObject.task = ""
            serverObject.active = true
            await this.setState(prevState => ({
                servers: [...prevState.servers, serverObject]
            }))
            for (var i = 0; i < this.state.servers.length; i++) {
                this.attachServers();
            }
        }
    }

    async addTasks() {
        var numberOfExistingTasks = this.state.tasks.length;
        var tasksArray = [...this.state.tasks];
        var totalTasks = Number(document.getElementById('numberOfTasks').value) + numberOfExistingTasks;
        for (var i = (numberOfExistingTasks + 1); i <= totalTasks; i++) {
            var taskObject = new Object();
            taskObject.task = i;
            taskObject.server = "";
            taskObject.status = "not_started";
            taskObject.active = true;
            tasksArray.push(taskObject);
        }
        await this.setState({
            tasks: tasksArray
        })
        for (var i = 0; i < this.state.servers.length; i++) {
            this.attachServers();
        }
        document.getElementById('numberOfTasks').value = ""
    }

    attachServers() {
        var index = this.state.servers.findIndex(x => x.task === "" && x.active == true);
        if (index != -1) {
            var getNextServerIndex = this.state.tasks.findIndex(x => x.status == "not_started" && x.active == true);
            if (getNextServerIndex != -1) {
                this.state.servers[index].task = this.state.tasks[getNextServerIndex].task;
                this.state.tasks[getNextServerIndex].server = this.state.servers[index].name;
                this.state.tasks[getNextServerIndex].status = "started";
                this.forceUpdate();
            }
        } else {
            return ""
        }
    }

    async finishTask(task) {
        var taskIndex = this.state.tasks.findIndex(x => x.task === task);
        var serverIndex = this.state.servers.findIndex(x => x.task === task);
        if (serverIndex != "-1") {
            this.state.servers[serverIndex].task = "";
        }
        if (taskIndex != "-1") {
            this.state.tasks[taskIndex].status = "done";
        }
        await this.forceUpdate();
        for (var i = 0; i < this.state.servers.length; i++) {
            this.attachServers();
        }
    }

    deleteTask(task) {
        var taskIndex = this.state.tasks.findIndex(x => x.task === task);
        if ((taskIndex + 1) == this.state.tasks.length) {
            this.setState({
                tasks: this.state.tasks.slice(0, this.state.tasks.length - 1)
            })
        } else {
            this.state.tasks[taskIndex].active = false;
            this.forceUpdate();
        }
    }

    deleteServer(server) {
        var serverIndex = this.state.servers.findIndex(x => x.name === server);
        if ((serverIndex + 1) == this.state.servers.length) {
            this.setState({
                servers: this.state.servers.slice(0, this.state.servers.length - 1)
            })
        } else {
            this.state.servers[serverIndex].active = false;
            this.forceUpdate();
        }
    }

    componentDidMount() {
        console.log(this.props.server)
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-2">
                    <div className="col-2">
                        <button className="btn btn-primary btn-block" onClick={this.addServer}>Add Server</button>
                    </div>
                    <div className="col-10">
                        {
                            this.state.servers.map((server, index) => {
                                if (server.active == true) {
                                    return (
                                        <div key={index} className="btn-group mr-2 mb-2" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-outline-primary px-4 pointerEventsDisabled">Server {server.name}</button>
                                            <button type="button" className="btn btn-danger" onClick={() => this.deleteServer(server.name)} disabled={server.task == "" ? server.name == "1" ? true : false : true}>X</button>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-2">
                        <button className="btn btn-primary btn-block" onClick={this.addTasks}>Add Tasks</button>
                    </div>
                    <div className="col-3">
                        <input className="form-control" type="text" id="numberOfTasks" placeholder="Number of Tasks"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Tasks tasks={this.state.tasks} finishTask={this.finishTask} deleteTask={this.deleteTask}></Tasks>
                    </div>
                </div>
            </div>
        )
    }
}
export default Body