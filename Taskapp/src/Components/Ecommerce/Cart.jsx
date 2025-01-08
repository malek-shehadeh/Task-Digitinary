
import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../Reducers/cartSlice";
import { Button } from "../../ui/index";
import { ShoppingCart } from "lucide-react";
import Alert from "../../ui/Alert";
import TaskContext from "../../Context/TaskContext";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { showToast } = useContext(TaskContext);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveClick = (item) => {
    setItemToDelete(item);
    setIsAlertOpen(true);
  };

  const handleConfirmRemove = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete.id));
      showToast(`this item has been removed from cart`);
      setItemToDelete(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <div className="flex justify-center mb-8">
          <div className="relative" style={{ transform: "translateY(20px)" }}>
            <ShoppingCart size={100} className="text-gray-400" />
          </div>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/ecommerce-manager")}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transform transition-transform hover:scale-105"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/100";
              }}
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">Price: {item.price}JD</p>
              <p className="text-gray-600">Total: {item.totalPrice}JD</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="px-3 py-1"
                onClick={() => handleDecrease(item.id)}
              >
                -
              </Button>
              <span className="mx-2">{item.quantity}</span>
              <Button
                variant="outline"
                className="px-3 py-1"
                onClick={() => handleIncrease(item.id)}
              >
                +
              </Button>
              <Button
                variant="danger"
                className="ml-4"
                onClick={() => handleRemoveClick(item)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <div className="text-xl font-bold">Total Amount: {totalAmount}JD</div>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate("/ecommerce-manager")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>

      <Alert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
};

export default Cart;
