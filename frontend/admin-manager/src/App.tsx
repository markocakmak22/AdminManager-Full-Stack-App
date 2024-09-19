import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Sidenav from "./layout/Sidenav";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Footer from "./layout/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div id="layoutSidenav">
          <Sidenav />
          <div id="layoutSidenav_content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<Products />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
