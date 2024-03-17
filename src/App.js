import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboard';
import Customer from './pages/customer';
import Product from './pages/product';
import Order from './pages/order';
import Login from './pages/login';
import ProductDetail from './pages/productDetail';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/dashboard"
                            element={
                                <>
                                    <Sidebar />
                                    <Dashboard />
                                </>
                            }
                        />
                        <Route
                            path="/customer"
                            element={
                                <>
                                    <Sidebar />
                                    <Customer />
                                </>
                            }
                        />
                        <Route
                            path="/product"
                            element={
                                <>
                                    <Sidebar />
                                    <Product />
                                </>
                            }
                        />
                        <Route
                            path="/order"
                            element={
                                <>
                                    <Sidebar />
                                    <Order />
                                </>
                            }
                        />

                        <Route
                            path="/product-detail"
                            element={
                                <>
                                    <Sidebar />
                                    <ProductDetail />
                                </>
                            }
                        />
                    </Routes>
                </Router>
            </Provider>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    );
}

export default App;
