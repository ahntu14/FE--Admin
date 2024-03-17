import React, { useState } from 'react';
import './productDetail.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const selectedProduct = useSelector((state) => state.selectedProduct);
    const product = selectedProduct.selectedProduct;
    const [price, setPrice] = useState(product.newPrice);
    const [screen, setScreen] = useState(product.screen);
    const [behindCam, setBehindCam] = useState(product.behindCam);
    const [selfieCam, setSelfieCam] = useState(product.selfieCam);
    const [chip, setChip] = useState(product.chip);
    const [ram, setRam] = useState(product.ram);
    const [rom, setRom] = useState(product.rom);
    const [pin, setPin] = useState(product.pin);
    const [charge, setCharge] = useState(product.chargeSpeed);
    const [quantity, setQuantity] = useState(product.quantity);

    const [newProduct, setProduct] = useState({
        id: product.id,
        name: product.name,
        category: product.category,
        videoUrl: product.videoUrl,
        newPrice: product.newPrice,
        chip: product.chip,
        ram: product.ram,
        rom: product.rom,
        pin: product.pin,
        screen: product.screen,
        selfieCam: product.selfieCam,
        behindCam: product.behindCam,
        chargeSpeed: product.chargeSpeed,
        quantity: product.quantity,
    });

    const handleChangePrice = (e) => {
        setPrice(e.target.value);
        setProduct({ ...newProduct, newPrice: parseInt(e.target.value) });
    };

    const handleChangeScreen = (e) => {
        setScreen(e.target.value);
        setProduct({ ...newProduct, screen: e.target.value });
    };

    const handleChangeBehindCam = (e) => {
        setBehindCam(e.target.value);
        setProduct({ ...newProduct, behindCam: e.target.value });
    };

    const handleChangeSelfieCam = (e) => {
        setSelfieCam(e.target.value);
        setProduct({ ...newProduct, selfieCam: e.target.value });
    };

    const handleChangeChip = (e) => {
        setChip(e.target.value);
        setProduct({ ...newProduct, chip: e.target.value });
    };

    const handleChangeRam = (e) => {
        setRam(e.target.value);
        setProduct({ ...newProduct, ram: parseInt(e.target.value) });
    };

    const handleChangeRom = (e) => {
        setRom(e.target.value);
        setProduct({ ...newProduct, rom: parseInt(e.target.value) });
    };

    const handleChangePin = (e) => {
        setPin(e.target.value);
        setProduct({ ...newProduct, pin: parseInt(e.target.value) });
    };

    const handleChangeChargeSpeed = (e) => {
        setCharge(e.target.value);
        setProduct({ ...newProduct, chargeSpeed: parseInt(e.target.value) });
    };

    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value);
        setProduct({ ...newProduct, quantity: parseInt(e.target.value) });
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleChange = async () => {
        const response = await axios.put('http://localhost:1406/admin/update-product', newProduct);
        if (response.status === 200) {
            toast.success('Sửa sản phẩm thành công');
        } else {
            toast.error('Có lỗi xảy ra, vui lòng kiểm tra lại');
        }
    };

    return (
        <div className="container">
            <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
                <h1 className="product-name">{product.name}</h1>

                <div className="product-specs">
                    <p>
                        <span>Loại hàng</span> <p className="category">{capitalizeFirstLetter(product.category)}</p>
                    </p>
                    <p>
                        <span>Giá</span> <input type="text" onChange={handleChangePrice} value={price} />
                    </p>
                    <p>
                        <span>Thông số màn hình</span>{' '}
                        <input onChange={handleChangeScreen} type="text" value={screen} />
                    </p>
                    <p>
                        <span>Camera sau</span>{' '}
                        <input type="text" onChange={handleChangeBehindCam} value={behindCam}></input>
                    </p>
                    <p>
                        <span>Camera trước</span>
                        <input type="text" onChange={handleChangeSelfieCam} value={selfieCam}></input>
                    </p>
                    <p>
                        <span>Chip</span> <input type="text" onChange={handleChangeChip} value={chip}></input>
                    </p>
                    <p>
                        <span>Ram</span> <input type="text" onChange={handleChangeRam} value={ram}></input>
                    </p>
                    <p>
                        <span>Bộ nhớ trong</span> <input type="text" onChange={handleChangeRom} value={rom}></input>
                    </p>
                    <p>
                        <span>Pin</span> <input type="text" onChange={handleChangePin} value={pin}></input>
                    </p>
                    <p>
                        <span>Tốc độ sạc</span>
                        <input type="text" onChange={handleChangeChargeSpeed} value={charge}></input>
                    </p>
                    <p>
                        <span>Số lượng trong kho</span>{' '}
                        <input type="text" onChange={handleChangeQuantity} value={quantity}></input>
                    </p>
                </div>
            </div>
            <div className="button">
                <button onClick={handleChange}>Thay đổi thông tin</button>
            </div>
        </div>
    );
};

export default ProductDetail;
