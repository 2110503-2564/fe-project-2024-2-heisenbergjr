import Image from "next/image";

interface TextSectionProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
}

export default function TextBox({ 
    title, 
    description, 
    buttonText, 
    buttonLink, 
    backgroundImage 
}: TextSectionProps) {
    return (
        <div className="relative flex items-center justify-center bg-cyan-900 rounded-xl p-10 md:p-16 max-w-5xl mx-auto overflow-hidden my-10">
            <div className="absolute inset-0">
                <Image 
                    src={backgroundImage}
                    alt="Text Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-50"
                />
            </div>

            <div className="relative z-10 text-white max-w-lg text-center">
                <h1 className="text-3xl md:text-5xl font-bold">
                    {title}
                </h1>
                <p className="mt-4 text-lg">
                    {description}
                </p>

                <div className="mt-6">
                    <a href={buttonLink} className="px-6 py-3 bg-white text-purple-800 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-200 transition">
                        {buttonText}
                    </a>
                </div>
            </div>
        </div>
    );
}
