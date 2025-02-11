import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { productService } from "../services/productService";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface EditProductModalProps {
  product: Product | null;
  handleClose: () => void;
  refreshProducts: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, handleClose, refreshProducts }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setQuantity(product.quantity);
    }
  }, [product]);

  const handleSave = async () => {
    if (!product) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized");
      return;
    }

    try {
      await productService.updateProduct(token, product.id, { name, price: Number(price), quantity: Number(quantity) });
      refreshProducts();
      handleClose();
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product.");
    }
  };

  return (
    <Modal show={!!product} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              disabled={!product} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(Number(e.target.value) || "")} 
              disabled={!product} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value) || "")} 
              disabled={!product} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={!product}>Cancel</Button>
        <Button variant="primary" onClick={handleSave} disabled={!product}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
