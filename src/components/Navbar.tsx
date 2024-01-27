"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { toggleCart } from "@/redux/features/cartSlice";
import useCartTotals from "@/hooks/useCartTotals";
import { useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "Teens", href: "/teens" },
  { name: "Shop", href: "/shop" },
];

export default function Navbar() {
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

  const { totalQuantity } = useCartTotals();

  const dispatch = useAppDispatch();

  return (
    <header>
      <div className='flex items-center justify-between mx-auto max-w-2xl px-4 mb-20 sm:px-6 lg:max-w-7xl'>
        <Link href='/'>
          <h1 className='text-2xl md:text-4xl font-bold'>
            Next<span className='text-primary'>Commerce</span>
          </h1>
        </Link>

        <nav className='hidden gap-12 lg:flex 2xl:ml-16'>
          {links.map((link, idx) => (
            <div key={idx}>
              <Link
                className='text-lg font-semibold text-primary'
                href={link.href}
              >
                {link.name}
              </Link>
            </div>
          ))}
          <button onClick={() => dispatch(toggleCart())}>
            Cart: {totalQuantity} <AiOutlineShoppingCart />
          </button>
        </nav>
      </div>
    </header>
  );
}
