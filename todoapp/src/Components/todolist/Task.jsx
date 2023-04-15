import React, { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import './Task.css'
import axios from 'axios';
import DatePicker from 'react-date-picker';


const Task = () => {

    const [todolist, setTodolist] = useState([]); // Initializing state for the list of tasks
    const [value, onChange] = useState(new Date()); // Initializing state for the selected date in the date picker component
    const [showAll, setShowAll] = useState(false); // Initializing state to toggle between showing todos for the selected day and the entire month
    const navigate = useNavigate(); // Initializing the navigation hook for use in the component

    //------------- Get all Todolist from database ---------------///
    useEffect(() => {
        axios.get("http://localhost:2000/todolist") // Making a GET request to fetch the list of tasks from the database
            .then(async (res) => {
                const rawTodolist = await res.data; // Extracting the data from the response object
                setTodolist(rawTodolist); // Updating the state with the list of tasks fetched from the database
            })
            .catch((err) => console.log(err)); // Handling errors if any
    }, []);

    // Filtering the list of tasks based on the selected date or the entire month
    let filterlist = todolist.filter((row) => {
        const newdate = row.date;
        const d = new Date(newdate);
        const selMonth = value.getMonth();
        const rowMonth = d.getMonth();

        if (showAll) {
            // Show all todos for the selected month
            return rowMonth === selMonth;
        } else {
            // Show todos for the selected day only
            const selDate = value.toLocaleDateString(); // Converting the selected date to a string in the format 'mm/dd/yyyy'
            const rowDate = d.toLocaleDateString(); // Converting the date object to a string in the format 'mm/dd/yyyy'
            return selDate === rowDate;
        }
    });

    // Delete handler to delete a task from the list
    const deleteHandler = async (_id) => {
        await axios.delete(`http://localhost:2000/todolist/${_id}`); // Making a DELETE request to delete the selected task from the database
        alert("Task Deleted Successfully"); // Displaying an alert to inform the user that the task has been deleted
        window.location.reload(); // Reloading the page to update the list of tasks displayed
    };

    // Toggles the showAll state to show todos for the entire month
    const handleShowAll = () => {
        setShowAll(true);
    };

    // Toggles the showAll state to show todos for the selected day
    const handleShowDay = () => {
        setShowAll(false);
    };

    // Rendering the component
    return (
        <>
            <div className='fil'>
                <DatePicker onChange={onChange} value={value} /> // Displaying the date picker component
                <button onClick={handleShowAll}>Show all todos for this month</button>
                <button onClick={handleShowDay}>Show todos for selected day only</button>
            </div>

            {filterlist.map((row) => {
                const newdate = row.date;
                const d = new Date(newdate);

                return (
                    <>
                        <div className='catecont'>
                            <div className='cateRow'>
                                <div className=''>
                                    <div className='time'>
                                        <p>{d.getHours()}:{d.getMinutes()}</p>
                                    </div>
                                </div>

                                <div className='nme'>
                                    <h3>{row.taskName.toUpperCase()}</h3>
                                    <p>{row.category}</p>
                                </div>

                                <div class="dropdown">
                                    <button
                                        class="btn"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <Icon.ThreeDotsVertical />
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <button
                                                type='button'
                                                className='navbtn dropdown-item '
                                                onClick={() => navigate(`/edittask/${row._id}`)}
                                            >
                                                <Icon.PencilSquare />
                                                Edit
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type='button'
                                                className='navbtn dropdown-item'
                                                onClick={() => deleteHandler(row._id)}
                                            >
                                                <Icon.XLg />
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                );
            })}
        </>
    );
};

export default Task;
