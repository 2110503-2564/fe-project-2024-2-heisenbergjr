import BookingsClient from "@/components/BookingClient";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";


export default async function BookingsPage() {
    const session = await getServerSession(authOptions);
    const profile = session?.user?.token ? await getUserProfile(session.user.token) : console.log("CANT GET SESSIon");
    const userToken = session?.user.token
    console.log(userToken)
    const userId = profile.data._id

    console.log( "In page " + userToken)

    return (
        <BookingsClient userToken={userToken} userId={userId} />
    );
}