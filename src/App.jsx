import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { Error404 } from "./components/Error404";
import { CartProvider } from "./contexts/CartContext";
import Cart from './components/Cart';

import "./App.css";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider> 
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bienvenidos/as a Tienda Yanu" />} />
          <Route path="/category/:id" element={<ItemListContainer greeting="Bienvenidos/as a Tienda Yanu" />} />
          <Route path="/items/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
