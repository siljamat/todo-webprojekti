import React from 'react';
import './Addcategories.css'
import axios from 'axios';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {DropdownButton} from "react-bootstrap";

const Addcategories = () => {

    // Set up state for the category name input
    const [cateName , setcateName] = useState("")
    const [cateColor, setcateColor] = useState("deepskyblue")
    // Function to handle adding a new category
    const addCategory = (e) => {

        e.preventDefault()

        // Create an object with the category name and color input
        const dataObj = {
            cateName,
            cateColor
        }

        console.log(dataObj);

        // Make a POST request to the API to add the new category
        axios.post("http://localhost:2000/category", dataObj)

        // Display a success message to the user and refresh the page
        alert("Catetask Added Succesfully");
        window.location.reload()

    }
    // Render the add category button and modal
    return (
        <>
                        {/* Form to add a new category */}
                        <form onSubmit={addCategory}>
                                <div className="row g-3">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Enter Category Name" onChange={e => setcateName(e.target.value)} value={cateName}/>
                                    </div>
                                </div>
                            <div className="catebtns">
                                    <DropdownButton variant="secondary" title="Choose Color">
                                        <Dropdown.Item onClick={e => setcateColor("pink")} value={cateColor}>
                                            Pink <span className="dotPink"></span>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={e => setcateColor("deepskyblue")} value={cateColor}>
                                            Blue <span className="dotBlue"></span>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={e => setcateColor("yellow")} value={cateColor}>
                                            Yellow <span className="dotYellow"></span>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={e => setcateColor("orange")} value={cateColor}>
                                            Orange <span className="dotOrange"></span>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={e => setcateColor("mediumseagreen")} value={cateColor}>
                                            Green <span className="dotGreen"></span>
                                        </Dropdown.Item>
                                    </DropdownButton>
                                <button type="submit" className="btn btn-light">Add</button>
                            </div>
                        </form>
        </>
    );
};

export default Addcategories;
