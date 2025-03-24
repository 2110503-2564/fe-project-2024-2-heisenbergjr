import InteractiveCard from './InteractiveCard';
import WebImage from './WebImage';

export default function Card({ shopName: venueName, imgSrc, onCompare }: { shopName: string; imgSrc: string | string; onCompare?: Function }) {
    return (
        <InteractiveCard contentName={venueName}>
            <div className="w-full h-[50%] relative rounded-t-lg">
                <WebImage imgSrc={imgSrc} />
            </div>

            <div className="font-serif text-black p-[10px] font-bold text-lg">
                <p>{venueName}</p>
            </div>
        </InteractiveCard>
    );
}
