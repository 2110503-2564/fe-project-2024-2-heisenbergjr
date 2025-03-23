'use client'
import {useEffect, useRef, useState} from 'react'
import { useWindowListener } from '@/hooks/useWindowListener'


export function VlogPlayer( {vdoSrc, isPlaying} : {vdoSrc:string, isPlaying:boolean}) {
    const vdoRef = useRef<HTMLVideoElement>(null)
    
    useEffect(() => {
        //alert("PLAYYYY")
        if(isPlaying) {
            vdoRef.current?.play();
        } else {
            vdoRef.current?.pause();
        }
    }, [isPlaying])

    useWindowListener("resize", (e)=> {
        //alert("AHHHHHHHHHH CHAGE DIWIDWOW" + (e.target as Window).innerWidth)
    });

    return (        
        <video className="w-[40%]" src={vdoSrc} controls loop muted
        ref={vdoRef}>

        </video>
    )
}