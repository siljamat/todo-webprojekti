import React from 'react';
import * as Icon from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import './Task.css'
import { useEffect , useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';


const Task = () => {

    const[todolist , settodolist] = useState([]) // Initializing state for the list of tasks
    const navigate = useNavigate() // Initializing the navigation hook for use in the component

    //------------- Get all Todolist from datatbase ---------------///
    useEffect(() =>{
        axios.get("http://localhost:2000/todolist") // Making a GET request to fetch the list of tasks from the database
            .then(async (res) => {
                const rawtodolist = await res.data; // Extracting the data from the response object
                settodolist(rawtodolist); // Updating the state with the list of tasks fetched from the database
            }).catch((err) =>{console.log(err)}) // Handling errors if any
    })

    ///----------- Filter todolist via Date -----------///
    const [value, onChange] = useState(new Date()); // Initializing state for the selected date in the date picker component
    let seldate = value.toLocaleDateString() // Converting the selected date to a string in the format 'mm/dd/yyyy'

    // Filtering the list of tasks based on the selected date
    let filterlist = todolist.filter( row => {
        let newdate = row.date // Extracting the date for each task
        let d = new Date(newdate) // Converting the date string to a date object
        let da= d.toLocaleDateString() // Converting the date object to a string in the format 'mm/dd/yyyy'

        // If the date for the task is not valid, return the task (this handles tasks with missing dates)
        if (da == "null") {
            return (row)
        }
        else {
            // If the date for the task matches the selected date, return the task
            return (da == seldate)
        }
    })

    //-------------- Delete Handler -----------//
    const deleteHandler = async(_id) => {
        await axios.delete(`http://localhost:2000/todolist/${_id}`) // Making a DELETE request to delete the selected task from the database
        alert("Task Deleted Successfully"); // Displaying an alert to inform the user that the task has been deleted
        window.location.reload() // Reloading the page to update the list of tasks displayed
    }

    // Rendering the component
    return (
        <>
            <div className='fil'>
                <DatePicker  onChange={onChange} value={value} /> // Displaying the date picker component
            </div>

            {
                // Mapping through the filtered list of tasks and rendering each task as a card
                filterlist.map((row) => {
                    const newdate = row.date
                    const d = new Date(newdate);

                return(
                    <>
                     <div className='catecont'>
                        <div className='cateRow'>
                        <div className=''>
                            <div className='time'>
                                <p>{d.getHours()}:{d.getMinutes()}</p>
                            </div>
                        </div>


                       <div className='nme'>
                            <h3>{row.taskName.toUpperCase()}</h3>
                            <p>{row.category}</p>
                       </div>
                       
                        <div class="dropdown">
                                        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false"><Icon.ThreeDotsVertical/></button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li><button type='button' className='navbtn dropdown-item ' onClick={() => navigate(`/edittask/${row._id}`)}><Icon.PencilSquare/> Edit</button></li>
                                                <li><button type='button' className='navbtn dropdown-item' onClick={() => deleteHandler(row._id)}><Icon.XLg/> Delete</button></li>
                                            </ul>
                         </div>
                    </div> 
                    </div>  
                    </>
                )
             })
          }
        </>
    );
};

export default Task;