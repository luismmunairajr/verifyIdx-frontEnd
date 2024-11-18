import { useState } from "react";
import bifront from "../example/images/bifront.svg";
import biback from "../example/images/biback.svg";
import biface from "../example/images/biface.svg";
import biassign from "../example/images/biassign.svg";
import Image from "next/image";

export default function Pictures() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const handleClick = (src: string) => {
        setSelectedImage(src);
    };
    const closePreview = () => {
        setSelectedImage(null);
    };
    return (
        <div>
            <div className="flex w-full space-x-5 items-center justify-center">
                <Image className="cursor-pointer" src={bifront} alt="foto" onClick={() => handleClick(bifront)} />
                <Image className="cursor-pointer" src={biback} alt="foto" onClick={() => handleClick(biback)} />
                <Image className="cursor-pointer" src={biface} alt="foto" onClick={() => handleClick(biface)} />
                <Image className="cursor-pointer" src={biassign} alt="foto" onClick={() => handleClick(biassign)} />
                <Image className="cursor-pointer" src={bifront} alt="foto" onClick={() => handleClick(bifront)} />
            </div>

            {selectedImage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50" onClick={closePreview}>
                    <div className="relative">
                        <Image src={selectedImage} alt="Preview" className="max-w-full max-h-full object-contain cursor-pointer size-[500px]"
                            onClick={(e) => e.stopPropagation()} />
                    </div>
                </div>
            )}
        </div>
    );
}
