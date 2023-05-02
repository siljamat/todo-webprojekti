// Importing necessary modules and components
import React from 'react';
import * as Icon from 'react-bootstrap-icons'
import './Addtask.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

/**
 * Addtask component for adding new task to the database
 *
 * @return {JSX.Element} Returns the JSX code for the Addtask component
 */
const Addtask = () => {

    // Using useNavigate hook from React Router to navigate between pages
    const navigate = useNavigate()

    // Declaring state variables using useState hook
    const [taskName, settaskName] = useState("")
    const [tDate, settDate] = useState()
    const [category, setcategory] = useState()

    const [cateData, setcateData] = useState([])

    // useEffect hook to fetch category data from the server
    useEffect(() => {
        axios.get("http://localhost:2000/category")
            .then(async (res) => {
                const rawcateData = await res.data;
                setcateData(rawcateData);
            }).catch((err) => console.log(err))
    }, [])

    /**
     * Event handler function to add new task to the database
     *
     * @param {Object} e - Event object
     */
    const addHandler = (e) => {
        e.preventDefault();

        if (!taskName.trim() || !tDate) {
            alert('Please enter at least name and date');
            return;
        }

        const dataObj = {
            taskName,
            date: tDate,
            category,
        };

        console.log(dataObj);

        // Making a POST request to the server to add new task
        axios.post('http://localhost:2000/todolist', dataObj);

        alert('Task Added Successfully');

        // Reloading the page to reflect the changes
        window.location.reload();
    };


    return (
        <>
            <button type='button' id='addbtn' data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon.Plus size={40} /></button>

            <div className="modal fade" id="staticBackdrop"  data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header" style={{borderWidth:"3px"}}>
                            <h5 className="modal-title " id="staticBackdropLabel">Add New Task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={addHandler}>
                            <div className="modal-body">

                                <div className="row g-3">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Enter Task Name" onChange={e => settaskName(e.target.value)} value={taskName.toLowerCase()} />
                                    </div>

                                    <div className="col">
                                        <input type="datetime-local" className="form-control" placeholder="Date" onChange={e => settDate(e.target.value)} value={tDate} />
                                    </div>
                                    <DropdownButton className="catebtn" variant="light" title="Choose category">
                                        {
                                            cateData.map(row => {
                                                return(
                                                    <DropdownItem onClick={e => setcategory(row.cateName)} value={category}>{row.cateName}
                                                        <span style={{backgroundColor: row.cateColor}} className="circle"></span>
                                                    </DropdownItem>
                                                )
                                            })
                                        }
                                    </DropdownButton>

                    {/*                <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={e => setcategory(e.target.value)} value={category}>
                                        <option defaultValue>Select Category</option>
                                        {
                                            cateData.map(row => { return (<option>{row.cateName.toUpperCase()}</option>) })
                                        }
                                    </select>*/}
                                </div>

                            </div>

                            <div className="modal-footer" style={{ borderWidth:"3px"}}>
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => navigate("/")}>Close</button>
                                <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Addtask;
