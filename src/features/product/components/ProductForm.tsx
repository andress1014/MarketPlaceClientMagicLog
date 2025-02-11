import { useState, useEffect } from "react";
import { productService } from "../services/productService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faHashtag, faListOl, faDollar } from '@fortawesome/free-solid-svg-icons';

interface Category {
  id: number;
  name: string;
}

const ProductForm = ({ onProductAdded }: { onProductAdded: () => void }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; quantity?: string; price?: string; categoryId?: string }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const validate = () => {
    const newErrors: { name?: string; quantity?: string; price?: string; categoryId?: string } = {};
    if (!name.trim()) newErrors.name = "⚠️ Product name is required";
    if (!quantity || quantity <= 0) newErrors.quantity = "⚠️ Quantity must be greater than 0";
    if (!price || price <= 0) newErrors.price = "⚠️ Price must be greater than 0";
    if (!categoryId) newErrors.categoryId = "⚠️ Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("❌ User is not authenticated");
        return;
      }
  
      await productService.createProduct(token, { 
        name, 
        quantity: Number(quantity), 
        price: Number(price), 
        categoryId: Number(categoryId) 
      });
  
      // ✅ Resetear formulario
      setName("");
      setQuantity("");
      setPrice("");
      setCategoryId("");
      setError(null);
      setErrors({});
  
      // ✅ Asegurar que se refresque la lista de productos
      onProductAdded();
    } catch (err) {
      setError("❌ Failed to add product");
    }
  };
  

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-2 text-center">Add Product</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Product Name</label>
        </div>
        <div className="inputForm">
          <FontAwesomeIcon icon={faBox} />
          <input 
            placeholder="Enter product name"
            className="input" 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
        {errors.name && <p className="text-danger">{errors.name}</p>}

        <div className="flex-column">
          <label>Quantity</label>
        </div>
        <div className="inputForm">
          <FontAwesomeIcon icon={faHashtag} />
          <input 
            placeholder="Enter quantity"
            className="input" 
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || "")}
            required 
          />
        </div>
        {errors.quantity && <p className="text-danger">{errors.quantity}</p>}

        <div className="flex-column">
          <label>Category</label>
        </div>
        <div className="inputForm">
          <FontAwesomeIcon icon={faListOl} />
          <select 
            className="input"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value) || "")}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {errors.categoryId && <p className="text-danger">{errors.categoryId}</p>}

        <div className="flex-column">
          <label>Price</label>
        </div>
        <div className="inputForm">
          <FontAwesomeIcon icon={faDollar} />
          <input 
            placeholder="Enter price"
            className="input" 
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || "")}
            required 
          />
        </div>
        {errors.price && <p className="text-danger">{errors.price}</p>}

        <button type="submit" className="buttonLogReg">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
