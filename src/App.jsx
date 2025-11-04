import { Routes, Route } from 'react-router';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Dialog from './components/dialog/Dialog';
import BurgerMenu from './components/burgerMenu/BurgerMenu';
import Home from './pages/home/Home';
import Categories from './pages/categories/Categories';
import CategoryProducts from './pages/categoryProducts/CategoryProducts';
import Products from './pages/products/Products';
import Sales from './pages/sales/Sales';
import NotFound from './pages/notFound/NotFound';
import Cart from './pages/cart/Cart';
import Likes from './pages/likes/Likes';
import { useModal } from './context/ModalContext';
import './App.scss';
import ProductDetails from './pages/productDetails/ProductDetails';

function App() {
  const { isMobile } = useModal();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="categories">
          <Route index element={<Categories />} />
          <Route path=":id?">
            <Route index element={<CategoryProducts />} />
            <Route path=":productId?" element={<ProductDetails />} />
          </Route>
        </Route>

        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":productId?" element={<ProductDetails />} />
        </Route>

        <Route path="sale">
          <Route index element={<Sales />} />
          <Route path=":productId?" element={<ProductDetails />} />
        </Route>

        <Route path="cart" element={<Cart />} />
        <Route path="likes">
          <Route index element={<Likes />} />
          <Route path=":productId?" element={<ProductDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isMobile && <BurgerMenu />}
      <Dialog />
      <Footer />
    </>
  );
}

export default App;
