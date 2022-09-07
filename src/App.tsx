import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAllProductInfo, getData } from './api/api';
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
import { setAllProductInfo } from './store';

const App = () => {
  const dispatch = useDispatch();

  const loadAllProduckInfoFromServer = async (productArr:Product[]) => {
    const allProductInfo = await Promise.all(productArr.map(async item => {
      const response = await getAllProductInfo(item.id);
      const newProduct = {
        ...item,
        ...response,
        count: 1,
      };

      return newProduct;
    }));

    dispatch(setAllProductInfo(allProductInfo));
  };

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const response = await getData();

        await loadAllProduckInfoFromServer(response);
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Error try again');
      }
    };

    getDataFromServer();
  }, []);

  return (
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
};

export default App;
