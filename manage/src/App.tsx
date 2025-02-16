import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewsList from './pages/NewsList';
import NewsForm from './pages/NewsForm';
import PrivateRoute from './components/PrivateRoute';
import BannerList from './pages/BannerList';
import BannerForm from './pages/BannerForm';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router basename="/admin">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="news" element={<NewsList />} />
            <Route path="news/new" element={<NewsForm />} />
            <Route path="news/edit/:id" element={<NewsForm />} />
            <Route path="banners" element={<BannerList />} />
            <Route path="banners/new" element={<BannerForm />} />
            <Route path="banners/edit/:id" element={<BannerForm />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
