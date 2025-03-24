import Link from "next/link";

export default function TopMenuItem( {
    title,
    pageRef   
} : {
    title:string,
    pageRef:string
}) {
    return (
        <Link 
            href={pageRef} 
            className="w-[125px] text-black h-[50px] mx-[10px] flex items-center justify-center hover:bg-gray-700 hover:text-white transition duration-300 rounded"
        >
            {title}
        </Link>
    );
}