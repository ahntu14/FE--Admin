import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './product.scss';
import { useDispatch } from 'react-redux';
import { SELECT_PRODUCT } from '../../redux/reducers/productReducer.js';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEdit = (product) => {
        dispatch({ type: SELECT_PRODUCT, payload: product });
        navigate('/product-detail');
    };

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    // Function to get products for a specific page
    const getProductsByPage = async (page) => {
        try {
            const res = await axios.get(`http://localhost:1406/admin/products?page=${page}`);
            setProducts(res.data.products);
        } catch (error) {
            console.error(error);
        }
    };

    // Function to delete a product
    const deleteProduct = async (productId) => {
        try {
            const res = await axios.delete(`http://localhost:1406/admin/delete-product/${productId}`);
            console.log(res.data);
            setProducts(products.filter((product) => product.id !== productId));
            toast.success('Product deleted successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Error deleting product');
        }
    };

    // Function to handle next page
    const handleNextPage = () => {
        if (currentPage < 8) {
            setCurrentPage(currentPage + 1);
            getProductsByPage(currentPage + 1);
        }
    };

    // Function to handle previous page
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            getProductsByPage(currentPage - 1);
        }
    };

    useEffect(() => {
        getProductsByPage(currentPage);
    }, [currentPage]);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-heading">Quản lý Sản phẩm</h1>
            {products.length > 0 && (
                <div>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Image</th>
                                <th style={{ textAlign: 'center' }}>Name</th>
                                <th style={{ textAlign: 'center' }}>Category</th>
                                <th style={{ textAlign: 'center' }}>Price</th>
                                <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="product-item">
                                    <td
                                        style={{
                                            width: '65px',
                                            height: '65px',
                                            maxWidth: '65px',
                                            maxHeight: '65px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </td>
                                    <td style={{ width: '400px', maxHeight: '50px', overflow: 'hidden' }}>
                                        {product.name}
                                    </td>
                                    <td
                                        style={{
                                            width: '150px',
                                            maxWidth: '150px',
                                            maxHeight: '50px',
                                            overflow: 'hidden',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {product.category}
                                    </td>
                                    <td
                                        style={{
                                            maxWidth: '50px',
                                            maxHeight: '50px',
                                            overflow: 'hidden',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {formatter.format(product.newPrice)}
                                    </td>
                                    <td style={{ overflow: 'hidden', width: '280px' }} className="btn">
                                        <button className="update-btn" onClick={() => handleEdit(product)}>
                                            Update
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this product?')) {
                                                    deleteProduct(product.id);
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                            Previous
                        </button>
                        {[...Array(5)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={index === currentPage ? 'active' : ''}
                            >
                                {index}
                            </button>
                        ))}
                        <button onClick={handleNextPage} disabled={currentPage === 4}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
