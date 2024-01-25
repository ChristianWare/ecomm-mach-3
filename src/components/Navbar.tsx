"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "Teens", href: "/teens" },
];

export default function Navbar() {
  const pathname = usePathname();
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
              {pathname === link.href ? (
                <Link
                  className='text-lg font-semibold text-primary'
                  href={link.href.toLowerCase()}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href.toLowerCase()}
                  className='text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary'
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* <div className='flex divide-x border-r sm:border-l'>
          <button className='flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none'>
            🛍️
            <span className='hidden text-xs font-semibold text-gray-500 sm:block'>
              Cart
            </span>
          </button>
        </div> */}

        <ul className='hidden gap-12 lg:flex 2xl:ml-16'>
          <li>
            {/* <button onClick={() => dispatch(toggleCart())} className={link}> */}
            <button>
              <span>
                Cart
                <AiOutlineShoppingCart className='inline-block text-3xl' />
              </span>
              {/* <div className={cart}>{totalQuantity}</div> */}
            </button>
          </li>

          <li className='flex items-center justify-center h-7'>
            {/* {session?.user && ( */}
            <>
              <Link href='/orders'>Orders</Link>
              {/* <button onClick={() => signOut()} className={logoutBtn}> */}
              <button>Logout</button>
            </>
            {/* )} */}
            {/* {!session?.user && ( */}
            <>
              <Link href='/'>Sign Up</Link>

              <Link href='/'>
                Sign In
                <FcGoogle
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    marginLeft: "12px",
                  }}
                />
              </Link>
            </>
            {/* )} */}
          </li>
        </ul>
      </div>
    </header>
  );
}
