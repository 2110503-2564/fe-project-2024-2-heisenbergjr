import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import getShops from "@/libs/getMassageShops";
import ShopClient from "@/components/ShopClient";

export default async function VenuePage() {
    const session = await getServerSession(authOptions);
    const profile = session?.user?.token ? await getUserProfile(session.user.token) : null;
    const shops = await getShops();

    return <ShopClient profile={profile} shops={shops} />;
}
