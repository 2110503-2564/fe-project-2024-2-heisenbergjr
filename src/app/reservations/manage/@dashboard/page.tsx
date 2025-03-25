import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);
    const createdAt = new Date(profile.data.createdAt).toLocaleDateString();

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-black p-5">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
                <h2 className="text-3xl font-semibold text-black">Your Profile</h2>
                <div className="mt-4">
                    <h3 className="text-2xl font-bold mt-3 text-black">{profile.data.name}</h3>
                    <p className="text-gray-600 mt-2">{profile.data.email}</p>
                </div>

                <div className="mt-6 border-t pt-4">
                    <table className="w-full text-left">
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2 font-semibold text-gray-700">Telephone</td>
                                <td className="py-2 text-gray-600">{profile.data.telephoneNumber || "N/A"}</td>
                            </tr>
                            <tr>
                                <td className="py-2 font-semibold text-gray-700">Member Since</td>
                                <td className="py-2 text-gray-600">{createdAt}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
