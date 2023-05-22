import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const { totalProducts } = useLoaderData()
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(totalProducts / itemsPerPage)
    const pagesNumber = [...Array(totalPages).keys()]

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);
    
  useEffect(()=>{
    async function fetchData () {
        const respone = await fetch (`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await respone.json()
        setProducts(data)
    }
    fetchData()
  },[currentPage,itemsPerPage])
      
 

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }

        }
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        let newCart = [];
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id)
    }
    const options = [5, 10, 20];
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    //pagination handlerClick
    const handlerClick = (num) => {
        setCurrentPage(num)
    }

    const handleItemsPerPageChange = (event) => {
        const selectedSize = parseInt(event.target.value, 10);
        setItemsPerPage(selectedSize);
        setCurrentPage(0);
      };

    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to="/orders">
                            <button className='btn-proceed'>Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
            <div className='pagination'>
                <p>current page number:{currentPage}</p>
                {
                    pagesNumber.map(number => <button className={currentPage == number ? 'pagination-btn' : ''} onClick={() => handlerClick(number)}
                        key={number}>{number}</button>)
                }
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;