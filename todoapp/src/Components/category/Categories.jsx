import React from 'react';
import * as Icon from 'react-bootstrap-icons'
import * as con from "react-icons/tb"; // Importing icons
import './Categories.css'
import { useNavigate } from 'react-router-dom'; // Importing hook to navigate to different pages
import Addcategories from './Addcategories'; // Importing component for adding new categories
import { useEffect } from 'react'; // Importing hook to use lifecycle methods
import axios from 'axios'; // Importing axios for HTTP requests
import { useState } from 'react'; // Importing hook to use state in functional component

const Categories = () => {

    const navigate = useNavigate(); // Initializing useNavigate hook for navigation to different pages
    const [cateData, setcateData] = useState([]); // Initializing state for category data fetched from server

    useEffect(() => { // Using useEffect hook to fetch category data from server on initial load

        axios.get("http://localhost:2000/category")
            .then(async (res) => {

                const rawcateData = await res.data;

                setcateData(rawcateData);

            }).catch( (err) => console.log(err))

    },[]);

    const deleteHandler = async(_id) => { // Function to handle category deletion on clicking delete button
        await axios.delete(`http://localhost:2000/category/${_id}`);

        alert("Catetask Deleted Successfully");

        window.location.reload(); // Reloading the page after category deletion
    }

    return (
        <>
            <div className='backg'>
                <div className='navbar'>
                    <button type='button' className='navbtn' onClick={() => navigate("/")}>
                        <Icon.List size={30}/>
                    </button>
                    <h2>Categories</h2>
                    <Addcategories/> {/* Add categories component to add new categories */}
                </div>

                {cateData.map((row) => { // Mapping through the categories array to render each category row

                    return(
                        <>
                            <div className='catecont'>
                                <div className='row'>
                                    <div>
                                        <con.TbChartDonut3 size={50} /> {/* Adding chart icon */}
                                    </div>
                                    <div className='nme'>

                                        <p>
                                            <button className='tasks' onClick={() => navigate(`/Catetask/${row.cateName}`)}>View task's</button>
                                        </p>
                                    </div>

                                    {/* Adding dropdown menu for each category row */}
                                    <div class="dropdown">
                                        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <Icon.ThreeDotsVertical/>
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            {/* Edit button to navigate to edit categories page */}
                                            <li>
                                                <button type='button' className='navbtn dropdown-item ' onClick={() => navigate(`/editcategories/${row._id}`)}>
                                                    <Icon.PencilSquare/> Edit
                                                </button>
                                            </li>
                                            {/* Delete button to delete the category */}
                                            <li>
                                                <button type='button' className='navbtn dropdown-item' onClick={() => deleteHandler(row._id)}>
                                                    <Icon.XLg/> Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    )

                })}
            </div>
        </>
    );
};

export default Categories;
