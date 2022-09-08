import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashbord from './Components/Dashbord';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from './Components/Users';
import Products from './Components/Products';
import Categories from './Components/Categories';
import PrivateRoutes from './Util/PrivateRoutes';
import AddProducts from './Components/Products/AddProducts';
import EditProducts from './Components/Products/EditProducts';
import AddCategories from './Components/Categories/AddCategories';
import EditCategories from './Components/Categories/EditCategories';
import Adduser from './Components/USer/Adduser';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashbord />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/addproducts" element={<AddProducts />} />
            <Route path="/editproducts" element={<EditProducts />} />
            <Route path="/addcategories" element={<AddCategories />} />
            <Route path="/editcategories" element={< EditCategories />} />
            <Route path="/adduser" element={< Adduser />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
