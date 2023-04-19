import axios from 'axios';
import React from 'react';
import { useState , useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import './Editcategories.css';


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
        navigate("/categories")
    }



    return (
        <>

        <div className='bg'>
            <h2>Update Catetask</h2>

                <div className="cont" >
                    <form onSubmit={updateCategory}>
                        <div className="inp">
                            <input type="text" placeholder="Enter Catetask Name" onChange={e => setcateName(e.target.value)} value={cateName}/>
                        </div>

                        <div className="">
                            <button type="submit" className="btn btn-primary" >Update</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate(`/categories`)}>Cancel</button>
                        </div>
                    </form>
                </div>
        </div>      
   </>
    );
};

export default Editcategories;