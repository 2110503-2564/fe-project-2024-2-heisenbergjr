"use client"; 
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
    const { data: session } = useSession();

    return (
        <div className="h-[60px] w-full bg-white fixed top-0 left-0 z-30 
            border-b-2 border-gray-300 flex items-center px-6 shadow-md">

            <a href="/" className="h-auto">
                <Image src="/img/logo.jpg" alt="logo" width={50} height={50} className="rounded-lg" />
            </a>

            <nav className="flex items-center space-x-6 ml-6 text-lg font-semibold">
                <TopMenuItem title="Shops" pageRef="/shop" />
                <TopMenuItem title="Reservations" pageRef="/myreservation" />
                <TopMenuItem title="Profile" pageRef="/reservations/manage" />
            </nav>
                
            <div className="ml-auto flex items-center space-x-4 border-black border rounded-md">
                {session ? (
                    <button 
                        onClick={() => signOut()} 
                        className="px-4 py-2 text-gray-700 bg-gray-100 
                        rounded-md hover:bg-gray-300 transition"
                    >
                        Sign-Out
                    </button>
                ) : (
                    <button 
                        onClick={() => signIn()} 
                        className="px-4 py-2 text-gray-700 bg-gray-100 
                        rounded-md hover:bg-gray-300 transition"
                    >
                        Sign-In
                    </button>
                )}
            </div>
        </div>
    );
}
