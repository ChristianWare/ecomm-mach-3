"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { StateProps } from "@/app/interface";


const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "Teens", href: "/teens" },
  { name: "Shop", href: "/shop" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { productData } = useSelector((state: StateProps) => state.ecomm);
  const { data: session } = useSession();

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

        {!session?.user && (
          <>
            <button
              onClick={() =>
                !session?.user ? signIn() : toast.error("Your are signed in")
              }
              className='bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer'
            >
              Login
            </button>
            <Link href='/register'>Register</Link>
          </>
        )}

        {session?.user && (
          <>
            <Link href='/profile'>My Account</Link>
            <button
              onClick={() => signOut()}
              className='flex hover:font-medium w-20 h-6 justify-center items-center px-12 text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-red-600'
            >
              Logout
            </button>
          </>
        )}
        <Link
          href={"/cart"}
          className='bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative'
        >
          <div className='flex justify-center items-center'>
            <RiShoppingCart2Fill className='text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200' />
            <RiShoppingCart2Fill className='text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200' />
          </div>
          <span className='text-xs font-semibold'>Buy Now</span>
          <span className='absolute top-1 right-2 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold'>
            {productData ? productData?.length : 0}
          </span>
        </Link>
      </div>
    </header>
  );
}
