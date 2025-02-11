import ProductList from "../features/product/components/ProductList";

const Home = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-start home-container">
      <h1 className="text-center mb-4">Available Products</h1>
      <div className="w-100 d-flex justify-content-center">
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
