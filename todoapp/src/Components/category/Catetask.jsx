import React from 'react';
import { useState , useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Catetask.css'
import './Sidebar.css'
import Sidebar from "./Sidebar";
import {Button, Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import Addtask from "../todolist/Addtask";
import Editcategories from "./Editcategories";
import * as Icon from "react-bootstrap-icons";

const Catetask = () => {

    const navigate = useNavigate()

    // Get the category name from the URL using useParams() hook
    const {cateName} = useParams()

    // Define state to hold the task list data
    const [todolist, settodolist] = useState([])

    // Use useEffect() hook to fetch the task list data from server when the component mounts
    useEffect(() => {
        axios.get(`http://localhost:2000/todolist`)
            .then(async (res) => {
                    const rawtodolist = await res.data
                    settodolist(rawtodolist)
                }
            ).catch((err) => {
            console.log(err)
        })
    })

    // Filter the task list data by category name using the filter() method
    let cateFil = todolist.filter((row) => {
        console.log(todolist)
        if (row.category === cateName) {
            return (row)
        }
    })

    const [show, setShow] = useState(false);
    const closeSidebar = () => setShow(false);
    const showSidebar = () => setShow(true);

    const deleteHandler = async (_id) => {
        await axios.delete(`http://localhost:2000/todolist/${_id}`);
        alert("Task Deleted Successfully");
        window.location.reload();
    };

    if (!cateFil.length) {
        return <>
            <div className="bg">
                <h2>ToDos in {cateName}</h2>
                <Button id="sidebtn" variant="light" onClick={showSidebar}>
                    Categories
                </Button>
                <div id="navbar">
                    <Navbar id="nav" bg="light" expand="md">
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" className="m-2"/>
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
                <div class="cont">
                    <h3>No todo's in this category</h3>
                    <p>Add new toDos from the button blow</p>
                </div>
            </div>
            <div className='sidebar'>
                <Sidebar/>
            </div>
            <Offcanvas show={show} onHide={closeSidebar}>
                <Offcanvas.Header className="position-absolute top-0 end-0" closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Sidebar/>
                </Offcanvas.Body>
            </Offcanvas>
            <Addtask/>
        </>
    } else
    {

        return (
            <>
                <div className="bg">
                    <h2>ToDos in {cateName}</h2>
                    <Button id="sidebtn" variant="light" onClick={showSidebar}>
                        Categories
                    </Button>
                    <div id="navbar">
                        <Navbar id="nav" bg="light" expand="md">
                            <Container>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" className="m-2"/>
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

                    <div className="cont">
                        {
                            cateFil.map((row) => {
                                let newdate = row.date
                                let d = new Date(newdate)

                                let da = d.toLocaleDateString()

                                return (
                                    <>
                                        <div className="cateRow">
                                            <p>{da}</p>
                                            <p>{row.taskName.toUpperCase()}</p>
                                            <div className="dropdown">
                                                <button
                                                    className="btn"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <Icon.ThreeDotsVertical/>
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="dropdownMenuButton1"
                                                >
                                                    <li>
                                                        <button type='button' className='navbtn dropdown-item '
                                                                onClick={() => navigate(`/edittask/${row._id}`)}>
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
                                                            <Icon.XLg/>
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='sidebar'>
                    <Sidebar/>
                </div>
                <Offcanvas show={show} onHide={closeSidebar}>
                    <Offcanvas.Header className="position-absolute top-0 end-0" closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Sidebar/>
                    </Offcanvas.Body>
                </Offcanvas>
                <Addtask/>
            </>
        );
    }
};

export default Catetask;