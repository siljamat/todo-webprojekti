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

/**
 * Edittask component for editing a todo item.
 * @param {object} props - Component props.
 * @param {object} props.user - User object.
 * @returns {JSX.Element} - Rendered component.
 */
const Edittask = ({ user }) => {
    const navigate = useNavigate();
    const { _id } = useParams();

    const [todolistData, settodolistData] = useState({});
    const [taskName, settaskName] = useState("");
    const [category, setcategory] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:2000/todolist/${_id}`)
            .then(async (res) => {
                const rawtodolistData = await res.data[0];
                settodolistData(rawtodolistData);
                settaskName(rawtodolistData.taskName);
                setcategory(rawtodolistData.category);
            })
            .catch((err) => console.log(err));
    }, [_id]);

    const [cateData, setcateData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:2000/category")
            .then(async (res) => {
                const rawcateData = await res.data;
                setcateData(rawcateData);
            })
            .catch((err) => console.log(err));
    }, []);

    const updateHandler = (e) => {
        e.preventDefault();
        settaskName(taskName.toLowerCase());

        const dataObj = {
            taskName,
            category,
        };

        axios.put(`http://localhost:2000/todolist/${_id}`, dataObj);
        alert("ToDo updated successfully");
        navigate("/");
    };

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
