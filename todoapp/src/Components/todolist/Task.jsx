import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./Task.css";
import "./Calendar.css";
import axios from "axios";
import DatePicker from "react-date-picker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {Nav, Navbar, Container} from 'react-bootstrap';

/**
 * Component for managing tasks and displaying them in a calendar view
 * @returns {JSX.Element} Task component
 */
const Task = () => {
    const [todolist, setTodolist] = useState([]);
    const [value, onChange] = useState(new Date());
    const [showAll, setShowAll] = useState(false);
    const [showList, setShowList] = useState(false); // new state for showing all tasks
    const [cateData, setcateData] = useState([]); // Initializing state for category data fetched from server

    const navigate = useNavigate();

    /**
     * Fetches category data from server on initial load using useEffect hook
     */
    useEffect(() => {
        axios.get("http://localhost:2000/category")
            .then(async (res) => {
                const rawcateData = await res.data;
                setcateData(rawcateData);
            })
            .catch((err) => console.log(err));
    }, []);

    /**
     * Fetches task data from server on initial load using useEffect hook
     */
    useEffect(() => {
        axios.get("http://localhost:2000/todolist")
            .then(async (res) => {
                const rawTodolist = await res.data;
                setTodolist(rawTodolist);
            })
            .catch((err) => console.log(err));
    }, []);

    /**
     * Filters the list of tasks based on selected date and view mode
     * @type {Array} List of filtered tasks
     */
    let filterlist = todolist.filter((row) => {
        const newdate = row.date;
        const d = new Date(newdate);
        const selMonth = value.getMonth();
        const rowMonth = d.getMonth();

        if (showAll) {
            return rowMonth === selMonth;
        } else {
            const selDate = value.toLocaleDateString();
            const rowDate = d.toLocaleDateString();
            return selDate === rowDate;
        }
    });

    /**
     * Deletes a task with the specified id from the database
     * @param {string} _id - The id of the task to be deleted
     */
    const deleteHandler = async (_id) => {
        await axios.delete(`http://localhost:2000/todolist/${_id}`);
        alert("Task Deleted Successfully");
        window.location.reload();
    };

    /**
     * Sets the showAll state to true and hides the task list if it is currently visible
     */
    const handleShowAll = () => {
        setShowAll(true);
        setShowList(false);
    };

    /**
     * Sets the showAll state to false and hides the task list if it is currently visible
     */
    const handleShowDay = () => {
        setShowAll(false);
        setShowList(false);
    };

    /**
     * Sets the showList state to true and hides the calendar view if it is currently visible
     */
    const handleShowList = () => {
        setShowList(true);
        setShowAll(false);
    };

    return (
        <>
            <Navbar bg="light" expand="md">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="m-2" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto button-group">
                            <button className="text-nowrap" onClick={handleShowAll}>
                                Calendar
                            </button>
                            <button
                                className="text-nowrap" onClick={handleShowDay}>
                                <DatePicker clearIcon={null} onChange={onChange} value={value} />
                            </button>
                            <button className="text-nowrap" onClick={handleShowList}>
                                Show all as a list
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="kalenteri">
                {showAll ? (
                    //Calendar
                    <Calendar
                        value={value}
                        onChange={onChange}
                        tileContent={({ activeStartDate, date, view }) => {
                            const dateString = date.toLocaleDateString();

                            const todoForDate = todolist.find((todo) => {
                                const todoDate = new Date(todo.date).toLocaleDateString();
                                return todoDate === dateString;
                            });

                            if (todoForDate) {
                                return (
                                    <button onClick={() => handleShowDay()}>
                                        <p>{todoForDate.taskName}</p>
                                    </button>
                                )
                            }
                        }}
                    />
                ) : showList ? (
                    // NShow all todos as a list
                    <div>
                        {todolist.map((row) => {
                            const newdate = row.date;
                            const d = new Date(newdate);
                            let cateColor;
                            const category = cateData.find((cate) => cate.cateName === row.category);
                            if (category) {
                                cateColor = category.cateColor;
                                console.log(cateColor)
                            }
                            return (
                                <>
                                    <div className="catecont">
                                        <div className="cateRow">
                                            <div>
                                                <div className="time">
                                                    <p>
                                                        {d.getDate().toString().padStart(2, '0')}.{(d.getMonth() + 1).toString().padStart(2, '0')}.{d.getFullYear()} <br/> {d.getHours()}:{d.getMinutes()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="nme">
                                                <h3>{row.taskName.toUpperCase()}</h3>
                                                <p className="category" style={{backgroundColor: cateColor}}>{row.category}</p>
                                            </div>

                                            <div className="dropdown">
                                                <button
                                                    className="btn"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <Icon.ThreeDotsVertical />
                                                </button>
                                                <ul
                                                    class="dropdown-menu"
                                                    aria-labelledby="dropdownMenuButton1"
                                                >
                                                    <li>
                                                        <button type='button' className='navbtn dropdown-item ' onClick={() => navigate(`/edittask/${row._id}`)}>
                                                            <Icon.PencilSquare/>
                                                            Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            type="button"
                                                            className="navbtn dropdown-item "
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
                    </div>
                ) : (
                    //Show all todos one by one
                    <div>
                        {filterlist.map((row) => {
                            const newdate = row.date;
                            const d = new Date(newdate);
                            let cateColor;
                            const category = cateData.find((cate) => cate.cateName === row.category);
                            if (category) {
                                cateColor = category.cateColor;
                                console.log(cateColor)
                            }
                            return (
                                <>
                                    <div className="catecont">
                                        <div className="cateRow">
                                            <div>
                                                <div className="time">
                                                    <p>
                                                        {d.getHours()}:{d.getMinutes()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="nme">
                                                <h3>{row.taskName.toUpperCase()}</h3>
                                                <p className="category" style={{backgroundColor: cateColor}}>{row.category}</p>
                                            </div>

                                            <div className="dropdown">
                                                <button
                                                    class="btn"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <Icon.ThreeDotsVertical />
                                                </button>
                                                <ul
                                                    class="dropdown-menu"
                                                    aria-labelledby="dropdownMenuButton1"
                                                >

                                                    <li>
                                                        <button type='button' className='navbtn dropdown-item ' onClick={() => navigate(`/edittask/${row._id}`)}>
                                                            <Icon.PencilSquare/>
                                                            Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            type="button"
                                                            className="navbtn dropdown-item "
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
                    </div>
                )}
            </div>
        </>
    )};
export default Task;
