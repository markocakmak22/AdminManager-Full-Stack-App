import { Link } from 'react-router-dom';
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";

function Dashboard() {
  const { categories } = useCategories();
  const { products } = useProducts();

  return (
    <main>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Dashboard</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
        <div className="row">
          <div className="col-xl-6 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
              {categories && categories.length > 0
                  ? `${categories.length} Categories`
                  : "No categories available."
              }
                </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
              <Link className="small text-white stretched-link" to="/categories">
                View
              </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
              {products && products.length > 0
                  ? `${products.length} Products`
                  : "No products available."}
                </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
              <Link className="small text-white stretched-link" to="/products">
                View
              </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
