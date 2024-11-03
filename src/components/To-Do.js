import React, { Component } from 'react';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            newTask: '',
            editIndex: null // To track which task is being edited
        };
    }

    handleInputChange = (event) => {
        this.setState({ newTask: event.target.value });
    };

    addTask = () => {
        const { newTask, editIndex } = this.state;
        if (newTask.trim() !== '') {
            this.setState(prevState => {
                const tasks = [...prevState.tasks];
                if (editIndex !== null) {
                    // Update the existing task if editing
                    tasks[editIndex] = newTask;
                } else {
                    // Add a new task
                    tasks.push(newTask);
                }
                return {
                    tasks,
                    newTask: '',
                    editIndex: null // Reset edit index after adding/editing
                };
            });
        }
    };

    deleteTask = (index) => {
        this.setState(prevState => ({
            tasks: prevState.tasks.filter((_, i) => i !== index)
        }));
    };

    editTask = (index) => {
        this.setState({
            newTask: this.state.tasks[index],
            editIndex: index // Set the index of the task being edited
        });
    };

    render() {
        return (
            <>
                <h1>To-Do List (Class Components)</h1>
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={this.state.newTask}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.addTask}>{this.state.editIndex !== null ? 'Update Task' : 'Add Task'}</button>
                <br /><br />
                <div>
                    {this.state.tasks.map((task, index) => (
                        <div key={index}>
                            <h4>{task}</h4>
                            <button onClick={() => this.editTask(index)}>Edit</button>
                            <button onClick={() => this.deleteTask(index)}>Delete</button>
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

export default Todo;
