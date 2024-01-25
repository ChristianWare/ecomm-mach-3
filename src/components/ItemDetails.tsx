"use client";

import { addToCart } from "@/redux/ecommSlice";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

const ItemDetails = ({ data }: any) => {
  const dispatch = useDispatch();

  console.log(data)

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

      <div className='mb-4'>
        <div className='flex items-end gap-2'>
          <span className='text-xl font-bold text-gray-800 md:text-2xl'>
            ${data.price}
          </span>
          <span className='mb-0.5 text-red-500 line-through'>
            ${data.price + 30}
          </span>
        </div>

        <span className='text-sm text-gray-500'>Incl. Vat plus shipping</span>
      </div>

      <div className='mb-6 flex items-center gap-2 text-gray-500'>
        {/* <Truck className='w-6 h-6' /> */}
        <span className='text-sm'>2-4 Day Shipping</span>
      </div>

      <button
        onClick={() => {
          dispatch(addToCart(data));
          toast.success(`${data?.name.substring(0, 12)}... added to cart`);
        }}
        className='w-full py-4 bg-black text-white text-lg rounded-md'
      >
        Add to Cart
      </button>

      <p className='mt-12 text-base text-gray-500 tracking-wide'>
        {data.description}
      </p>
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};
export default ItemDetails;
