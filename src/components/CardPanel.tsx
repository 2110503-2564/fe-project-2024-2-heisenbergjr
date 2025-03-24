'use client'
import Card from "./Card";
import { useReducer, useState } from "react";
import Link from "next/link";
import { useRef, useEffect } from "react";
import getVenues from "@/libs/getMassageShops";
import { ShopItem, ShopJson } from "../../interfaces";

export default function CardPanel() {

    const [venueResponse, setVenueResponse] = useState<ShopJson|null>(null)
    useEffect(()=>{
        const fetchData = async () => {
            const venues = await getVenues()
            setVenueResponse(venues);
        }
        fetchData()
    }, [])

    const countRef = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const cardReducer = ( 
        venueList : Map<string,number>, 
        action:{ type:string; venueName:string; rating?:number} 
    ) => {
        switch(action.type) {
            case 'set': {
                const newVenueList = new Map(venueList);
                newVenueList.set(action.venueName, action.rating??0);
                return newVenueList
            } case 'remove': {
                const newVenueList = new Map(venueList);
                newVenueList.delete(action.venueName);
                return newVenueList;
            } 
            default: return venueList;
        }
    }

    let defaultVenue = new Map<string,number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0],
    ]);

    const [venueList, dispatchCompare] = useReducer(cardReducer, defaultVenue);

    if (!venueResponse) return (<p>Venue Response is Loading</p>)

    return(
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row",
            flexWrap:"wrap",  alignContent:"space-around", justifyContent:"space-around" 
            }}> {
                venueResponse.data.map((venueItem:ShopItem)=> (
                    <Link href={`/venue/${venueItem.id}`} className="w-1/5">
                        <Card shopName={venueItem.name} imgSrc={venueItem.picture}
                        onCompare={(venue:string, rating:number)=>{dispatchCompare({type:'set',venueName:venue, rating:rating})}}></Card>
                    </Link>
                    
                ))
            }
            </div>

            <div className="px-2 py-2">
                <div className="font-bold">
                    Venue List with Ratings: {venueList.size.toString()}
                </div>
                

                { Array.from(venueList).map(([venueName, rating]) => 
                    <div data-testid={venueName} onClick={() => dispatchCompare({type:'remove', venueName})}>
                        {venueName} : {rating}
                    </div>
                )}

                
            </div>
            <div className="flex flex-col">
                <button
                    className='bg-white text-cyan-600 border border-cyan-600
                    font-semibold py-2 px-2 m-2 rounded z-30
                    hover:bg-cyan-600 hover:text-white hover:border-transparent'

                    onClick={() => {
                            countRef.current = countRef.current+1;
                        }}>
                    Count With Ref Object
                </button>

                <input type="text" placeholder="Please Fill" className="block text-gray-900 text-sm rounded-lg p-2 m-2 
                    bg-purple-50 ring-1 ring-inset ring-purple-400 focus:outline-none focus:bg-purple-200 focus:ring-2"
                    ref={inputRef}>
                </input>
                <button
                    className='bg-white text-cyan-600 border border-cyan-600
                    font-semibold py-2 px-2 m-2 rounded z-30 
                    hover:bg-cyan-600 hover:text-white hover:border-transparent'

                    onClick={() => {
                            if(inputRef.current != null) {
                                inputRef.current.focus()
                            }
                        }}>
                    Focus Input
                </button>
            </div>
            
        </div>
    );
}