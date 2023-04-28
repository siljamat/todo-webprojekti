// Import necessary packages
import React from 'react';
import './Addtask.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate , useParams } from 'react-router-dom'
import {Button, Container, DropdownButton, Nav, Navbar, Offcanvas} from "react-bootstrap";
import Sidebar from "../category/Sidebar";
import Addtask from "./Addtask";
import './editTodo.css'
import DropdownItem from "react-bootstrap/DropdownItem";

const Edittask = () => {

    // Initialize navigate and _id variables using hooks
    const navigate = useNavigate()
    const {_id} = useParams()

    // Initialize state variables for todolist data, task name, and category
    const [todolistData , settodolistData] = useState([])
    const [taskName , settaskName] = useState("")
    const[category , setcategory] = useState()
    const[origName, setOrigName] = useState()

    // Use useEffect hook to fetch data from the server based on the _id
    useEffect(() => {
        axios.get(`http://localhost:2000/todolist/${_id}`)
            .then(async (res) => {
                const rawtodolistData = await res.data[0];
                settodolistData(rawtodolistData);
                settaskName(rawtodolistData.taskName);
                setcategory(rawtodolistData.category);
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

    console.log(cateData)

    // Handler function for updating the data
    const updateHandler = (e) => {
        e.preventDefault()

        settaskName(taskName.toLowerCase)

        const dataObj = {
            taskName,
            category
        }
        console.log(dataObj);
        axios.put(`http://localhost:2000/todolist/${_id}`, dataObj)
        alert("ToDo updated successfully");
        navigate("/")
    }

    const [show, setShow] = useState(false);
    const closeSidebar = () => setShow(false);
    const showSidebar = () => setShow(true);

    // Render the component
    return (
        <>
            <div className='bg'>
                <h2>Edit {taskName}</h2>
                <Button id="sidebtn" variant="light" onClick={showSidebar}>
                    Categories
                </Button>
                <div id="navbar">
                    <Navbar id="nav" bg="light" expand="md">
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" className="m-2" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto button-group">
                                    <button className="text-nowrap" onClick={() => navigate('/Home')}>
                                        Back to main screen
                                    </button>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

                <div className='cont'>
                    <div className="sis">
                    <form onSubmit={updateHandler}>
                                <p>Add the updated name and/or category below</p>
                            <input type="text" className="form-control" placeholder={taskName} onChange={e => settaskName(e.target.value)} value={taskName} />
                        <div className="btns">
                        <DropdownButton className="catebtn" variant="secondary" title="Choose category">
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

{/*                        <select className="form-select form-select-sm mt-2" aria-label=".form-select-sm example" onChange={e => setcategory(e.target.value)} value={category}>
                            <option defaultValue>original: {category}</option>
                            {
                                cateData.map(row => {
                                    return (
                                        <option className="selectCate">{row.cateName}</option>
                                    )
                                })
                            }
                        </select>*/}
                            <button type="submit" className="btn btn-light m-1">Update</button>
                            <button type="button" className="btn btn-light" onClick={() => navigate("/")}>Cancel</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>

                <div className='sidebar'>
                    <Sidebar />
                </div>
                <Offcanvas show={show} onHide={closeSidebar}>
                    <Offcanvas.Header className="position-absolute top-0 end-0" closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Sidebar />
                    </Offcanvas.Body>
                </Offcanvas>
                <Addtask/>
        </>
    );
};

// Export the component
export default Edittask;
