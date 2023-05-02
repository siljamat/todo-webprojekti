import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import Addcategories from './Components/category/Addcategories';
import Addtask from './Components/todolist/Addtask';
import Categories from './Components/category/Categories';
import Editcategories from './Components/category/Editcategories';
import Edittask from './Components/todolist/Edittask';
import Catetask from './Components/category/Catetask';

/**
 * Defines the routing configuration for the application.
 * @returns {JSX.Element} The routing configuration.
 */
const Routing = () => {
    return (
        // Define a routing configuration using the <Routes> component
        <Routes>
            {/*
        Define routes using the <Route> component. Each route specifies a URL path,
        and a component that should be rendered when that path is visited.
      */}
            <Route exact path="/" element={<App />} /> {/* Renders the App component when the root URL is visited */}
            <Route exact path="/home" element={<App />} /> {/* Renders the App component when the "/home" URL is visited */}
            <Route exact path="/categories" element={<Categories />} /> {/* Renders the Categories component when the "/categories" URL is visited */}
            <Route exact path="/addcategories" element={<Addcategories />} /> {/* Renders the Addcategories component when the "/addcategories" URL is visited */}
            {/*
        The route path for editcategories includes a parameter named _id, which can be accessed by the
        Editcategories component using the useParams() hook.
      */}
            <Route exact path="/editcategories/:_id" element={<Editcategories />} />
            {/* Renders the Editcategories component when the "/editcategories/:_id" URL is visited */}
            <Route exact path="/addtask" element={<Addtask />} /> {/* Renders the Addtask component when the "/addtask" URL is visited */}
            {/*
        The route path for edittask includes a parameter named _id, which can be accessed by the
        Edittask component using the useParams() hook.
      */}
            <Route exact path="/edittask/:_id" element={<Edittask />} />
            {/* Renders the Edittask component when the "/edittask/:_id" URL is visited */}
            {/*
        The route path for catetask includes a parameter named cateName, which can be accessed by the
        Catetask component using the useParams() hook.
      */}
            <Route exact path="/catetask/:cateName" element={<Catetask />} />
            {/* Renders the Catetask component when the "/catetask/:cateName" URL is visited */}
        </Routes>
    );
};

export default Routing;
