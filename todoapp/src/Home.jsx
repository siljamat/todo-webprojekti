import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons'
import Addtask from './Components/todolist/Addtask'
import Task from './Components/todolist/Task';
import Date from './Components/Date';
import './Home.css'
import Sidebar from './Components/category/Sidebar';


const Home = () => {

    const navigate = useNavigate()

    // Render the Home component, which includes a navigation bar,
    // a clock display and a list of tasks
    return (
        <>
            <div className='backg'>
                {/* The navigation bar */}
                <div className='navbar'>
                    {/* Button to navigate to categories */}
                    <button type='button' className='navbtn' onClick={() => navigate("/categories")}>
                        <Icon.List size={30}/>
                    </button>
                    <h2>Schedule</h2>
                    {/* Addtask component to add a new task */}
                    <Addtask/>
                </div>
                {/* The clock display */}
                <div className='clock'>
                    <Date/>
                </div>
                {/* The list of tasks */}
                <div>
                    <Task/>
                </div>
            </div>
            <div className='sidebar'>
                <Sidebar />
            </div>
        </>
    );
};

export default Home;
