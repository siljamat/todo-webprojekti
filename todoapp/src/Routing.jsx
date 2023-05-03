import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import Addcategories from './Components/category/Addcategories';
import Addtask from './Components/todolist/Addtask';
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
            {/*Define routes using the <Route> component. Each route specifies a URL path,
            and a component that should be rendered when that path is visited. */}
            <Route exact path="/" element={<App />} />
            <Route exact path="/home" element={<App />} />
            <Route exact path="/addcategories" element={<Addcategories />} />
            <Route exact path="/addtask" element={<Addtask />} />

            {/*The route paths for editcategories, edittask includes a parameter named _id, which can be accessed by the
            Editcategories component using the useParams() hook.*/}
            <Route exact path="/editcategories/:_id" element={<Editcategories />} />
            <Route exact path="/edittask/:_id" element={<Edittask />} />
            {/*The route path for catetask includes a parameter named cateName, which can be accessed by the
            Catetask component using the useParams() hook.*/}
            <Route exact path="/catetask/:cateName" element={<Catetask />} />
        </Routes>
    );
};

export default Routing;
