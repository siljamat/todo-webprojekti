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
                <div id='header'>
                    {/* Button to navigate to categories */}
                    <button type='button' id='navbtn' onClick={() => navigate("/categories")}>
                        <Icon.List size={30}/>
                    </button>
                    <h2 id={"otsikko"}>ToDo</h2>
                </div>
                <div>
                    <Task/>
                </div>
            </div>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <Addtask/>
        </>
    );
};

export default Home;
