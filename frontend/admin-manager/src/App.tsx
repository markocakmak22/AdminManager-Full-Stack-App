import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Sidenav from "./layout/Sidenav";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Footer from "./layout/Footer";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
