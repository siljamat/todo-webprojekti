import React from 'react';
import Addtask from './Components/todolist/Addtask';
import Task from './Components/todolist/Task';
import './Home.css';
import Sidebar from './Components/category/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';

/**
 * Renders the Home component, which includes a navigation bar,
 * a clock display and a list of tasks.
 * @returns {JSX.Element} The Home component.
 */
const Home = () => {
    const [show, setShow] = useState(false);

    /**
     * Closes the sidebar.
     */
    const closeSidebar = () => setShow(false);

    /**
     * Shows the sidebar.
     */
    const showSidebar = () => setShow(true);

    return (
        <>
            <div className='backg'>
                <div id='header'>
                    <Button id="sidebtn" variant="light" onClick={showSidebar}>
                        Categories
                    </Button>
                    <h2 id={"otsikko"}>Todo</h2>
                </div>
                <Task/>
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
