import React, { Component } from 'react'
import Task from './Task'
export default class Tasks extends Component {
    render() {
        return (
            <div>
                {
                    this.props.tasks.map((task, index) => {
                        if (task.active == true) {
                            return <Task key={index} task={task} finishTask={this.props.finishTask} deleteTask={this.props.deleteTask}></Task>
                        }
                    })
                }
            </div>

        )
    }
}
