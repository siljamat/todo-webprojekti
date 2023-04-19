import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Editcategories from "./Editcategories";
import { Button} from 'react-bootstrap';

const Sidebar = () => {
    const navigate = useNavigate();
    const [cateData, setCateData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:2000/category')
            .then(async (res) => {
                const rawcateData = await res.data;
                setCateData(rawcateData);
            })
            .catch((err) => console.log(err));
    }, []);

    const addCategory = (e) => {
        e.preventDefault();
        const dataObj = { cateName: e.target[0].value };
        axios.post('http://localhost:2000/category', dataObj);
        alert('Category added successfully');
        window.location.reload();
    };

    const deleteCategory = async (_id) => {
        await axios.delete(`http://localhost:2000/category/${_id}`);
        alert('Category deleted successfully');
        window.location.reload();
    };

    return (
        <div className="sidebar-container">
            <div id="categories">
                <h2>Categories:</h2>
            <div className="sidebar-categories">
                {cateData.map((category) => (
                    <div key={category._id} className="sidebar-category">
                        <div className="category-details">
                            <h5>{category.cateName.toUpperCase()}</h5>
                            <div className="category-actions">
                            <Button id="tasks" variant="light"
                                    onClick={() => navigate(`/Catetask/${category.cateName}`)}>
                                    show todos in the category
                                </Button>
                        </div>
                            <Button
                                className="category-delete-button" variant="light"
                                onClick={() => deleteCategory(category._id)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={"addCate"}>
                <h5 id="newCate">Add a new category</h5>
                <form onSubmit={addCategory}>
                    <input
                        type="text"
                        placeholder="Enter category name"
                        className="add-category-input"
                    />
                    <Button type="submit" className="add-category-button  btn-sm" variant="secondary">Add</Button>
                </form>
            </div>
            </div>
        </div>
    );
};

export default Sidebar;
