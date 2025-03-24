import styles from './topMenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { Link } from '@mui/material';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);
    
    return (
        <div className="h-[60px] w-full bg-white fixed top-0 left-0 z-30 
            border-b-2 border-gray-300 flex items-center px-6 shadow-md">

            <a href="/" className="h-auto">
                <Image src="/img/logo.jpg" alt="logo" width={50} height={50} className="rounded-lg" />
            </a>

            <nav className="flex items-center space-x-6 ml-6 text-lg font-semibold">
                <TopMenuItem title="Shops" pageRef="/shop" />
                <TopMenuItem title="Reservations" pageRef="/myreservation" />
            </nav>

            <div className="ml-auto flex items-center space-x-4 border-black border rounded-md">
                {session ? (
                    <Link href="/api/auth/signout" className="px-4 py-2 text-gray-700 bg-gray-100 
                        rounded-md hover:bg-gray-300 transition">
                        Sign-Out
                    </Link>
                ) : (
                    <Link href="/api/auth/signin" className="px-4 py-2 text-gray-700 bg-gray-100 
                        rounded-md hover:bg-gray-300 transition">
                        Sign-In
                    </Link>
                )}
            </div>
        </div>
    );
}
