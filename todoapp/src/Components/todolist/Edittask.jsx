// Import necessary packages
import React from 'react';
import './Addtask.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate , useParams } from 'react-router-dom'

const Edittask = () => {

    // Initialize navigate and _id variables using hooks
    const navigate = useNavigate()
    const {_id} = useParams()

    // Initialize state variables for todolist data, task name, and category
    const [todolistData , settodolistData] = useState([])
    const [taskName , settaskName] = useState("")
    const[category , setcategory] = useState()

    // Use useEffect hook to fetch data from the server based on the _id
    useEffect(() => {
        axios.get(`http://localhost:2000/todolist/${_id}`)
            .then(async (res) => {
                const rawtodolistData = await res.data[0];
                settodolistData(rawtodolistData);
                settaskName(rawtodolistData.taskName);
            }).catch((err) => console.log(err))
    }, [_id])

    console.log(todolistData);

    // Use useEffect hook to fetch all categories from the server
    const [cateData, setcateData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:2000/category")
            .then(async (res) => {
                const rawcateData = await res.data;
                setcateData(rawcateData);
            }).catch((err) => console.log(err))
    }, [])

    // Handler function for updating the data
    const updateHandler = (e) => {
        e.preventDefault()
        const dataObj = {
            taskName,
            category
        }
        console.log(dataObj);
        axios.put(`http://localhost:2000/todolist/${_id}`, dataObj)
        alert("Update Task Successfully");
        navigate("/")
    }

    // Render the component
    return (
        <>
            <div className='bg'>
                <h2>Update Task</h2>
                <div className='cont'>
                    <form onSubmit={updateHandler}>
                        <div className="inp">
                            <input type="text" placeholder="Enter Task Name" onChange={e => settaskName(e.target.value)} value={taskName} />
                        </div>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={e => setcategory(e.target.value)} value={category}>
                            <option defaultValue>Select Category</option>
                            {
                                cateData.map(row => { return (<option>{row.cateName}</option>) })
                            }
                        </select>
                        <div className="btn">
                            <button type="submit" className="btn btn-primary">Update</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

// Export the component
export default Edittask;
