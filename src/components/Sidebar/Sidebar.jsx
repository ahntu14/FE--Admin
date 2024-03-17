import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState('');

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    // Tạo biến cho transition của mỗi menuItem
    const menuItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <motion.div
            className="sidebar"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
        >
            <ul className="menu">
                <motion.li
                    className={selectedItem === 'dashboard' ? 'menuItem active' : 'menuItem'}
                    onClick={() => handleItemClick('dashboard')}
                    variants={menuItemVariants} // Sử dụng biến transition cho menuItem
                    initial="hidden" // Chuyển từ trạng thái ẩn đến hiển thị khi render
                    animate="visible" // Hiển thị menuItem sau khi render
                >
                    <Link to="/dashboard">Dashboard</Link>
                </motion.li>
                <motion.li
                    className={selectedItem === 'customer' ? 'menuItem active' : 'menuItem'}
                    onClick={() => handleItemClick('customer')}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Link to="/customer">Customer</Link>
                </motion.li>
                <motion.li
                    className={selectedItem === 'product' ? 'menuItem active' : 'menuItem'}
                    onClick={() => handleItemClick('product')}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Link to="/product">Product</Link>
                </motion.li>
                <motion.li
                    className={selectedItem === 'order' ? 'menuItem active' : 'menuItem'}
                    onClick={() => handleItemClick('order')}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Link to="/order">Order</Link>
                </motion.li>
            </ul>
        </motion.div>
    );
};

export default Sidebar;
