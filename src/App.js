import { Fragment } from 'react';
import { Routes, Route } from "react-router-dom";
import SignIn from './Components/Signin/Signin';
import ProductUpload from "./Components/AdminDashboard/ProductUpload";
import ProductIndex from "./Components/ManagementDashboard/Index";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='/' exact element={<SignIn />} />
        <Route path='/product' exact element={<ProductIndex />} />
        <Route path='/product/upload' exact element={<ProductUpload />} />
      </Routes>
    </Fragment>
  );
}

export default App;
