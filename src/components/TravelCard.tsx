'use client'
import { VlogPlayer } from "./VlogPlayer"
import { useState } from "react"
import { Rating } from "@mui/material"
import { useWindowListener } from "@/hooks/useWindowListener"

export function TravelCard() {
    const [playing, setPlaying] = useState(true)
    const [rating, setRating] = useState(0)
    const [pointerPosition, setPointerPosition] = useState({x:0,y:0})

    useWindowListener("pointermove", (e) => {
        setPointerPosition({x: (e as PointerEvent).clientX, y: (e as PointerEvent).clientY})
    })

    return (
        <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-gray-200
        flex flex-row">
            <VlogPlayer vdoSrc="/video/【アニメMV】melting／百鬼あやめ.mp4" isPlaying={playing}></VlogPlayer>
            <div>Thailand Natural : ({pointerPosition.x}, {pointerPosition.y})
                <button className='bg-white text-cyan-600 border border-cyan-600
                    font-semibold py-2 px-2 m-2 rounded z-30
                    hover:bg-cyan-600 hover:text-white hover:border-transparent'
                    onClick={() => {
                        setPlaying(!playing)
                        
                    }}
                    >{ playing? "Pause": "Play" }
                </button>
                <Rating className="w-full h-[10%]" value={(rating==undefined)?0:rating}
                    onChange={(e,newValue)=>{if(newValue!=null) setRating(newValue)}}>

                </Rating>
            </div>


            
        </div>
    )
}