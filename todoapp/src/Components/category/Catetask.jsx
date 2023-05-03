import React from 'react';
import { useState , useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Catetask.css'
import './Sidebar.css'
import Sidebar from "./Sidebar";
import {Button, Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import Addtask from "../todolist/Addtask";
import * as Icon from "react-bootstrap-icons";

/**
 * This component displays the tasks associated with a particular category.
 */
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
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    /**
     * Filters the task list data by category name.
     *
     * @param {object} row - A task object in the task list.
     * @returns {boolean} - Returns true if the task belongs to the specified category, false otherwise.
     */
    let cateFil = todolist.filter((row) => {
        if (row.category === cateName) {
            return (row)
        }
    })

    const [show, setShow] = useState(false);

    /**
     * Closes the sidebar.
     */
    const closeSidebar = () => setShow(false);

    /**
     * Shows the sidebar.
     */
    const showSidebar = () => setShow(true);

    /**
     * Deletes a task from the task list.
     *
     * @param {string} _id - The ID of the task to be deleted.
     */
    const deleteHandler = async (_id) => {
        await axios.delete(`http://localhost:2000/todolist/${_id}`);
        alert("Task Deleted Successfully");
        window.location.reload();
    };


    /**
     * Render a component with category name and navigation bar,
     * along with a message indicating no todos in this category.
     * @param {string} cateName - The name of the category being displayed
     * @param {Array} cateFil - The filtered list of todos for the category
     * @param {Function} showSidebar - The function to show the sidebar
     * @param {Function} closeSidebar - The function to close the sidebar
     */
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
                <div className="cont">
                    <h3>No todo's in this category</h3>
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
    } /**
     * Renders the ToDos in the selected category if there are any, otherwise renders a message indicating that there are no ToDos in that category.
     *
     * @param {Object} props - The component props.
     * @param {string} props.cateName - The name of the selected category.
     * @param {Array} props.cateFil - An array containing the ToDos in the selected category.
     * @param {Function} props.showSidebar - A function to show the sidebar.
     * @param {Boolean} props.show - A boolean indicating whether the sidebar should be displayed or not.
     * @param {Function} props.closeSidebar - A function to close the sidebar.
     * @param {Function} props.navigate - A function to navigate to a different route.
     * @param {Function} props.deleteHandler - A function to delete a ToDo.
     * @returns {JSX.Element} - A React component representing the ToDos in the selected category.
     */
    else {
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

                    <div className="catcont">
                        {
                            cateFil.map((row) => {
                                let newdate = row.date
                                let d = new Date(newdate)

                                let da = d.toLocaleDateString()

                                return (
                                    <>
                                        <div className="cateTask">
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
