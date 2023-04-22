import axios from 'axios';
import React from 'react';
import { useState , useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import './Editcategories.css';
import {Button, Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import Sidebar from "./Sidebar";
import Addtask from "../todolist/Addtask";


const Editcategories = () => {

    // Use the `useNavigate` hook to access the router's `navigate` function.
    const navigate = useNavigate()

    // Use the `useParams` hook to access the `id` parameter from the URL.
    const { _id } = useParams()

    // Use the `useState` hook to manage the `cateName` state.
    const [cateName, setcateName] = useState("")

    // Use the `useEffect` hook to fetch the category data from the API.
    useEffect(() => {

        // Send a GET request to the API endpoint for the category with the specified `_id`.
        axios.get(`http://localhost:2000/category/${_id}`)
            .then(async (res) => {

                // Get the first element of the array returned from the API and store it in `rawcateData`.
                const rawcateData = await res.data[0];

                // Update the `cateName` state with the `cateName` property of `rawcateData`.
                setcateName(rawcateData.cateName);

            }).catch( (err) => console.log(err))

    }, [_id])

    // Define a function to handle the form submission.
    const updateCategory = (e) => {

        e.preventDefault()

        // Create an object `dataObj` to store the updated category data.
        const dataObj = {
            cateName
        }

        console.log(dataObj);

        // Send a PUT request to the API endpoint to update the category data.
        axios.put(`http://localhost:2000/category/${_id}`, dataObj)

        // Display a success message using the `alert` function.
        alert("Catetask Updated")

        // Navigate to the categories page.
        navigate("/")
    }

    const [show, setShow] = useState(false);
    const closeSidebar = () => setShow(false);
    const showSidebar = () => setShow(true);


    return (
        <>

        <div className='bg'>
            <h2>Edit {cateName}</h2>
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
                <div className="cont" >
                    <form onSubmit={updateCategory}>
                        <div className="inp">
                            <input type="text" placeholder="Enter Catetask Name" onChange={e => setcateName(e.target.value)} value={cateName}/>
                        </div>

                        <div className="">
                            <button type="submit" className="btn btn-primary" >Update</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate(`/`)}>Cancel</button>
                        </div>
                    </form>
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

export default Editcategories;