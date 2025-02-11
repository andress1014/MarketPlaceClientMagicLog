import ProductForm from "./ProductForm"; // Importa el formulario de producto

interface AddProductModalProps {
  show: boolean; // Controla si el modal se muestra o no
  handleClose: () => void; // Función para cerrar el modal
  onProductAdded: () => void; // Función para refrescar la lista de productos
}

const AddProductModal = ({ show, handleClose, onProductAdded }: AddProductModalProps) => {
  if (!show) {
    return null; 
  }

  return (
    <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Product</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <ProductForm onProductAdded={onProductAdded} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;