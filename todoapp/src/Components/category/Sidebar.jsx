import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { Button} from 'react-bootstrap';
import Addcategories from "./Addcategories";


/**
 * Component for displaying a sidebar with categories and their actions.
 * @component
 */
const Sidebar = () => {
    const navigate = useNavigate();
    const [cateData, setCateData] = useState([]);

    /**
     * Fetches category data from API when component is mounted.
     */
    useEffect(() => {
        axios
            .get('http://localhost:2000/category')
            .then(async (res) => {
                const rawcateData = await res.data;
                setCateData(rawcateData);
                console.log(rawcateData)
            })
            .catch((err) => console.log(err));
    }, []);


    /**
     * Deletes a category from the API by its ID and reloads the page.
     * @param {string} _id - The ID of the category to delete.
     */
    const deleteCategory = async (_id) => {
        await axios.delete(`http://localhost:2000/category/${_id}`);
        alert('Category deleted successfully');
        window.location.reload();
    };

    return (
        <div className="sidebar-container">
            <div id="categories">
                <h3>Categories:</h3>
                <div className="sidebar-categories">
                    {cateData.map((category) => (
                        <div key={category._id} className="sidebar-category">
                            <div className="category-details">
                                <p className="cateHeader" style={{backgroundColor: category.cateColor}}>{category.cateName.toUpperCase()}</p>
                                <div className="category-actions">
                                    <Button id="tasks" variant="light" onClick={() => navigate(`/Catetask/${category.cateName}`)}>
                                        Show todos
                                    </Button>
                                    <Button className="category-delete-button" variant="light" onClick={() => navigate(`/editcategories/${category._id}`)}>
                                        Edit
                                    </Button>
                                    <Button className="category-delete-button" variant="light" onClick={() => deleteCategory(category._id)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="addCate">
                    <h5 id="newCate">Add a new category</h5>
                    <Addcategories></Addcategories>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
