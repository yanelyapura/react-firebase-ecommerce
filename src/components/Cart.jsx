import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Form, Button, Table, Image } from 'react-bootstrap';
import '../styles/Cart.css';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [buyerData, setBuyerData] = useState({ name: '', email: '', phone: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerData({ ...buyerData, [name]: value });
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleOrderSubmit = async () => {
    if (!buyerData.name || !buyerData.email || !buyerData.phone) {
      alert('Por favor completa todos los campos del formulario.');
      return;
    }

    const orderData = {
      buyer: {
        name: buyerData.name,
        email: buyerData.email,
        phone: buyerData.phone,
      },
      items: cartItems.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        title: item.title,
      })),
      createdAt: serverTimestamp(),
    };

    try {
      const db = getFirestore();
      const ordersCollection = collection(db, 'orders');
      const docRef = await addDoc(ordersCollection, orderData);
      clearCart();
      alert('Orden enviada. ID: ' + docRef.id);
    } catch (error) {
      console.error('Error al enviar la orden:', error);
      alert('Hubo un error al enviar la orden. Inténtalo nuevamente más tarde.');
    }
  };

  return (
    <div>
      <h2>Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          <Table className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Imagen</th>
                <th>Precio unitario</th>
                <th>Precio total</th>
                <th>Quitar del carrito</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Image src={item.pictureUrl} alt={item.title} />
                  </td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <Button onClick={() => handleRemove(item.id)}>Quitar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Precio total gastado:</td>
                <td>${totalPrice}</td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
          <Button onClick={handleClearCart}>Vaciar Carrito</Button>
          <Form>
            <h3>Datos del comprador</h3>
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control type="text" name="name" value={buyerData.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" value={buyerData.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono:</Form.Label>
              <Form.Control type="text" name="phone" value={buyerData.phone} onChange={handleInputChange} />
            </Form.Group>
            <Button type="button" onClick={handleOrderSubmit}>
              Enviar Orden
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Cart;
