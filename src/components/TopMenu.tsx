import styles from './topMenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { Link } from '@mui/material';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function TopMenu() {

    const session = await getServerSession(authOptions)
    
    return (
        <div className="h-[50px] bg-white fixed top-0 left-0 right-0 z-30 border-t-2 border-b-2 border-lightgray flex flex-row items-center justify-end">
            <div className='fixed top-0 left-0 flex flex row'>
                {
                session ? (
                        <Link href="/api/auth/signout">
                            <div className="h-full px-2 py-2 text-black-700 text-sm">
                                Sign-Out of {session.user?.name}
                            </div>
                        </Link>
                    ) : (
                        <Link href="/api/auth/signin">
                            <div className="h-full px-2 py-2 text-black-700 text-lg">
                                Sign-In
                            </div>
                        </Link>
                    )
                }
                <TopMenuItem title="My Booking" pageRef="/mybooking"></TopMenuItem>
            </div>

            <TopMenuItem title="Booking" pageRef="/venue"></TopMenuItem>

            <Image src={"/img/logo.png"} className={styles.logoimg} alt='logo'
            width={0} height={0} sizes='100vh'></Image>
        </div>

        
    );
}