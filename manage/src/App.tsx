import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewsList from './pages/NewsList';
import NewsForm from './pages/NewsForm';
import PrivateRoute from './components/PrivateRoute';
import BannerList from './pages/BannerList';
import BannerForm from './pages/BannerForm';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import PurchaseList from './pages/PurchaseList';
import CustomDocList from './pages/CustomDocList';
import CustomDocForm from './pages/CustomDocForm';
import ApplicationList from './pages/ApplicationList';
import ApplicationForm from './pages/ApplicationForm';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router basename="/admin">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="news" element={<NewsList />} />
            <Route path="news/new" element={<NewsForm />} />
            <Route path="news/edit/:id" element={<NewsForm />} />
            <Route path="banners" element={<BannerList />} />
            <Route path="banners/new" element={<BannerForm />} />
            <Route path="banners/edit/:id" element={<BannerForm />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route path="purchases" element={<PurchaseList />} />
            <Route path="custom-docs" element={<CustomDocList />} />
            <Route path="custom-docs/new" element={<CustomDocForm />} />
            <Route path="custom-docs/edit/:id" element={<CustomDocForm />} />
            <Route path="applications" element={<ApplicationList />} />
            <Route path="applications/new" element={<ApplicationForm />} />
            <Route path="applications/edit/:id" element={<ApplicationForm />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
