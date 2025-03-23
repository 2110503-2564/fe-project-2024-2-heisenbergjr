import Link from "next/link";
import Card from "./Card";
import { VenueItem, VenueJson } from "../../interfaces";

export default async function VenueCatalog({venuesJson} : {venuesJson:Promise<VenueJson>}) {
    
    const venueJsonReady = await venuesJson
    
    return (
        <>
        <div className="text-2xl">Select your venue</div>
        <div>Explore {venueJsonReady.count} fabulous venues in our catalog</div>
        <div style={{margin:"20px", display:"flex", flexDirection:"row",
            flexWrap:"wrap",  alignContent:"space-around", justifyContent:"space-around" 
            }}> {
                venueJsonReady.data.map((venueItem:VenueItem)=> (
                    <Link href={`/venue/${venueItem.id}`} className="w-1/5">
                        <Card venueName={venueItem.name} imgSrc={venueItem.picture}></Card>
                    </Link>
                    
                ))
            }
            </div>
        </>
    )
}