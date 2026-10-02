import { useState } from "react";
import "./ToDoList.css"
import { v4 as uuidv4 } from 'uuid';







export default function ToDoList() {
    const [ tasks, setTasks ] = useState([{todo: "No task yet", id: uuidv4() , isDone: false}]);
    const [newTask, setNewTask] = useState('');


    function addTask(event) {
    event.preventDefault();
    tasks.some((task) => task.todo == "No task yet" && deleteTask(task.id));
    setTasks((tasks) => {
       return [...tasks, {todo: newTask, id :uuidv4(), isDone: false}];
    });
    setNewTask("");
    }

    let updateNewTask = (event) => {
        event.preventDefault();
        setNewTask(event.target.value);
    }

    let deleteTask = (id) => {
        console.log(id);
        setTasks((tasks) => {return tasks.filter((task) => task.id != id)});
    }

    let upperCaseAll = (event) => {
        event.preventDefault();
        setTasks((tasks) => 
            tasks.map((task) => {
                return {
                    ...task, todo: task.todo.toUpperCase(),
                }
            })
        );
        
    }

    let upperCaseOne = (id) => {
        event.preventDefault();
        setTasks((tasks) => 
            tasks.map((task) => 
        task.id === id ? { ...task, todo: task.todo.toUpperCase() } : task,
        )
        );
    }

    let lowerCaseOne = (id) => {
        setTasks((tasks) => tasks.map((task) => {
                if(task.id === id){
                    return {
                        ...task, todo: task.todo.toLowerCase(),
                    }
                }
            }) 
        );
    }

    let taskCompleted = (id, event) => {
        event && event.preventDefault();
        setTasks((tasks) => 
            tasks.map((task) => 
            task.id === id ? {...task, isDone: true,} : task,
            ));
    }


    
    
    return(
        <div className="listContainer">
            <form>
                <input type="text" placeholder="Add a Task" className="form-input" onChange={updateNewTask} value={newTask} name="taskInput"/>
                <button type="submit" className="btn-submit" onClick={addTask}>Add Task</button>
                <br /><br /><br />
                <hr />
                <h4>Tasks To Do</h4>
                <ul>
                    { 
                        tasks.map((task) => (
                            <li key={task.id}>
                                <span style={task.isDone ? { textDecorationLine: "line-through" } : {}}>{task.todo}</span>

                                <button style={{backgroundColor: "red",}} className="btn-delete" onClick={() => deleteTask(task.id)}>Delete</button>

                                <button onClick={() => upperCaseOne(task.id)} className="btn-delete">upperCase Task</button>
                                
                                <button onClick={() => lowerCaseOne(task.id)} className="btn-delete">lowerCase Task</button>
                                
                                <button type="button" className="btn-submit" onClick={()=> taskCompleted(task.id)}>Mark as Done.</button>
                            </li>
                            
                            
                        ))
                    }
                </ul>
                <br /><br />
                <button onClick={upperCaseAll} className="btn-delete">UpperCase All</button>
            </form>
        </div>
    );
}