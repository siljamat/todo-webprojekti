import React from 'react';
import { Routes , Route } from 'react-router-dom';
import App from './App';
import Addcategories from './Components/category/Addcategories';
import Addtask from './Components/todolist/Addtask'
import Categories from './Components/category/Categories';
import Editcategories from './Components/category/Editcategories';
import Edittask from './Components/todolist/Edittask';
import Catetask from './Components/category/Catetask';

const Routing = () => {
    return (
        // Define a routing configuration using the <Routes> component
        <Routes>
            {/*
            Define routes using the <Route> component. Each route specifies a URL path,
            and a component that should be rendered when that path is visited.
            */}
            <Route exact path='/' element={<App/>}></Route>
            <Route exact path='/home' element={<App/>}></Route>
            <Route exact path='/categories' element={<Categories/>}></Route>
            <Route exact path='/addcategories' element={<Addcategories/>}></Route>
            {/*
            The route path for editcategories includes a parameter named _id, which can be accessed by the
            Editcategories component using the useParams() hook.
            */}
            <Route exact path='/editcategories/:_id' element={<Editcategories/>}></Route>
            <Route exact path='/addtask' element={<Addtask/>}></Route>
            {/*
            The route path for edittask includes a parameter named _id, which can be accessed by the
            Edittask component using the useParams() hook.
            */}
            <Route exact path='/edittask/:_id' element={<Edittask/>}></Route>
            {/*
            The route path for catetask includes a parameter named cateName, which can be accessed by the
            Catetask component using the useParams() hook.
            */}
            <Route exact path='/catetask/:cateName' element={<Catetask/>}></Route>
        </Routes>
    );
};

export default Routing;
