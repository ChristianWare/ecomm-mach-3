"use client";

import { useAppDispatch } from "@/hooks/storeHook";
import { addItemToCart } from "@/redux/features/cartSlice";
import { useState } from "react";
import { toggleCart } from "@/redux/features/cartSlice";
import { getSizeName } from "@/lib/utils";

const ItemDetails = ({ data }: any) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(data.price);
  const [selectedSize, setSelectedSize] = useState(data.sizes?.[0] || "");

  const dispatch = useAppDispatch();

  const calculatePrice = (basePrice: number, size: string) => {
    switch (size) {
      case "m":
        return basePrice + 15;
      case "l":
        return basePrice + 20;
      // Add more cases for other sizes as needed
      default:
        return basePrice;
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setPrice(calculatePrice(data.price, selectedSize) * newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < 10) {
      // Limit quantity to a maximum of 10
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      setPrice(calculatePrice(data.price, selectedSize) * newQuantity);
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setPrice(calculatePrice(data.price, size) * quantity);
  };

  const handleAddToCart = () => {
    if (!data) return;
    const itemToAdd = {
      ...data,
      quantity,
      size: selectedSize,
      price: calculatePrice(data.price, selectedSize),
    };
    dispatch(addItemToCart(itemToAdd));
    dispatch(toggleCart());
  };

  // console.log(data);

  return (
    <div>
      <div className='mb-2 md:mb-3'>
        <span className='mb-0.5 inline-block text-gray-500'>
          {data.categoryName}
        </span>
        <h2 className='text-2xl font-bold text-gray-800 lg:text-3xl'>
          {data.name}
        </h2>
      </div>

      <div className='mb-6 flex items-center gap-3 md:mb-10'>
        <button className='rounded-full gap-x-2'>
          <span className='text-sm'>4.2</span>
        </button>

        <span className='text-sm text-gray-500 transition duration-100'>
          56 Ratings
        </span>
      </div>

      {data.sizes && (
        <>
          <p>
            Size: <strong>{getSizeName(selectedSize)}</strong>
          </p>
          <div className='flex items-center my-5 gap-5'>
            {data.sizes.map((size: any) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`${
                  selectedSize === size ? "bg-red-500" : "bg-black"
                }`}
              >
                <span
                  className={`p-2 text-white text-lg rounded-md ${
                    selectedSize === size ? "bg-red-500" : "bg-black"
                  }`}
                >
                  {getSizeName(size)}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      <div className='mb-4'>
        <div className='flex items-end gap-2'>
          <span className='text-xl font-bold text-gray-800 md:text-2xl'>
            ${price}
          </span>
          {/* <span className='mb-0.5 text-red-500 line-through'>
            ${data.price + 30}
          </span> */}
        </div>

        <span className='texat-sm text-gray-500'>Incl. Vat plus shipping</span>
      </div>

      <div className='mb-6 flex items-center gap-2 text-gray-500'>
        <span className='text-sm'>2-4 Day Shipping</span>
      </div>
      <div className='flex items-center justify-center gap-5'>
        <button onClick={handleDecrease} disabled={quantity === 1}>
          -
        </button>
        <input
          type='text'
          className='border outline-none border-gray-300 rounded px-2 py-1 text-center w-12'
          value={quantity}
          readOnly
        />
        <button onClick={handleIncrease} disabled={quantity === data.quantity}>
          +
        </button>
        <button
          onClick={handleAddToCart}
          className='w-full py-4 bg-black text-white text-lg rounded-md'
          disabled={quantity === 0}
        >
          Add to Cart
        </button>
      </div>
      {quantity === 10 && (
        <div className='mt-5'>max 10 items allowed per order</div>
      )}

      <p className='mt-12 text-base text-gray-500 tracking-wide'>
        {data.description}
      </p>
    </div>
  );
};
export default ItemDetails;
