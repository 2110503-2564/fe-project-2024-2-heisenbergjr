import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function Card( { shopName: venueName, imgSrc, onCompare } : { shopName:string, imgSrc:string, onCompare?:Function }) {

    return (
        <InteractiveCard contentName={venueName}>

            <div className='w-full h-[50%] relative rounded-t-lg'>
                <Image src={imgSrc} 
                alt='Product Picture'
                fill
                priority
                className='object-cover rounded-t-lg'></Image>
            </div>

            <div className='font-serif text-black p-[10px] font-bold text-lg'>
                <p>{venueName}</p>
            </div>
            {
                onCompare? <Rating className="px-2" name={venueName + " Rating"} id={venueName + " Rating"} data-testid={venueName + " Rating"}
            onChange={(e, newValue) => {onCompare(venueName, newValue)}}
            onClick={(e) => {e.stopPropagation();}}></Rating> : ''
            }

            
        </InteractiveCard>
    );
}  