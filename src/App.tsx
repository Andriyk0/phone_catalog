import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AcsessoriesPage } from './pages/AcsessoriesPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { LikedProductPage } from './pages/LikedProductPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { TabletsPage } from './pages/TabletsPage';

const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="acsessories" element={<AcsessoriesPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="liked_product" element={<LikedProductPage />} />
      <Route path="phones" element={<PhonesPage />} />
      <Route path="product_detail" element={<ProductDetailPage />} />
      <Route path="tablets" element={<TabletsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
