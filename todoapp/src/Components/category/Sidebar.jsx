import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import * as con from 'react-icons/tb';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Editcategories from "./Editcategories";

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
            <div className="sidebar-header">
                <h2>Categories</h2>
            </div>
            <form onSubmit={addCategory}>
                <input
                    type="text"
                    placeholder="Enter category name"
                    className="add-category-input"
                />
                <button type="submit" className="add-category-button">
                    <Icon.PlusSquare size={20} />
                </button>
            </form>
            <div className="sidebar-categories">
                {cateData.map((category) => (
                    <div key={category._id} className="sidebar-category">

                        <div className="category-details">
                            <h3>{category.cateName.toUpperCase()}</h3>
                            <p>
                                <button
                                    className="tasks"
                                    onClick={() =>
                                        navigate(`/Catetask/${category.cateName}`)
                                    }
                                >
                                    View tasks
                                </button>
                            </p>
                        </div>
                        <div className="category-actions">
                            <button
                                className="category-delete-button"
                                onClick={() => deleteCategory(category._id)}
                            >
                                <Icon.Trash size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
