import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CardPanel from "@/components/CardPanel";
import { VenueJson } from "../../../../interfaces";

export default async function Venue() {
    const venues:Promise<VenueJson> = getVenues()

    return (
        <main className="text-center p-5">
            <Suspense fallback={<p>Loading .... <LinearProgress></LinearProgress></p>}>
                <VenueCatalog venuesJson={venues}></VenueCatalog>
            </Suspense>

            <hr className="my-10"></hr>
            <h1 className="text-xl font-medium">TRY Client-side card Panel</h1>
            <CardPanel></CardPanel>
        </main>
    );
}