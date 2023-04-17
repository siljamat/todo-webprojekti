import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./Task.css";
import axios from "axios";
import DatePicker from "react-date-picker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Task = () => {
    const [todolist, setTodolist] = useState([]);
    const [value, onChange] = useState(new Date());
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:2000/todolist")
            .then(async (res) => {
                const rawTodolist = await res.data;
                setTodolist(rawTodolist);
            })
            .catch((err) => console.log(err));
    }, []);

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

    const deleteHandler = async (_id) => {
        await axios.delete(`http://localhost:2000/todolist/${_id}`);
        alert("Task Deleted Successfully");
        window.location.reload();
    };

    const handleShowAll = () => {
        setShowAll(true);
    };

    const handleShowDay = () => {
        setShowAll(false);
    };

    return (
        <>
            <div className="options">
                <DatePicker onChange={onChange} value={value} />
                <button className="listbtn" onClick={handleShowAll}>Show calendar</button>
                <button className="listbtn" onClick={handleShowDay}>show todos of selected day</button>
                <button className="listbtn">TÄÄ PITÄÄ TEHÄ: NÄYTÄ KAIKKI LISTANA</button>
            </div>
            <div className="kalenteri">
            {showAll ? (
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
                            return <p>{todoForDate.taskName}</p>;
                        }
                    }}
                />
            ) : (
                <div>
                    {filterlist.map((row) => {
                        const newdate = row.date;
                        const d = new Date(newdate);

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
                                            <ul
                                                class="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton1"
                                            >
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
            )} </div>
        </>
    )};
    export default Task;
