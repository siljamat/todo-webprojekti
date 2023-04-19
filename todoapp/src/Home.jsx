import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons'
import Addtask from './Components/todolist/Addtask'
import Task from './Components/todolist/Task';
import Date from './Components/Date';
import './Home.css'
import Sidebar from './Components/category/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Offcanvas } from 'react-bootstrap';
import {useState} from 'react'


const Home = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const closeSidebar = () => setShow(false);
    const showSidebar = () => setShow(true);

    // Render the Home component, which includes a navigation bar,
    // a clock display and a list of tasks
    return (
        <>
            <div className='backg'>
                <div id='header'>
                    <Button id="sidebtn" variant="light" onClick={showSidebar}>
                        Categories
                    </Button>
                    <h2 id={"otsikko"}>ToDo</h2>
                </div>
                <div>
                    <Task/>
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

export default Home;
