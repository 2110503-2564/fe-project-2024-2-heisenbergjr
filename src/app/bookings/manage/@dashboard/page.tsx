import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return (
        <main>
            <div>
                Your Dashboard
            </div>
            <div className='text-2xl'>
                {profile.data.name}
            </div>
            <table className='table-auto border-separate border-spacing-2'>
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>{profile.data.email}</td>
                    </tr>
                    <tr>
                        <td>Tel</td>
                        <td>{profile.data.telephoneNumber}</td>
                    </tr>
                    <tr>
                        <td>Member Since</td>
                        <td>{createdAt.toString()}</td>
                    </tr>
                </tbody>
            </table>

            {
                (profile.data.role === "admin") ? 
                <form>
                    <div className="text-xl text-blue-700">Create New Venue</div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-white-700 pr-4" htmlFor="name">Name</label>
                        <input type="text" required id="name" placeholder="Venue Name" 
                        className="bg-black border-2 border-gray-700 rounded w-full p-m-2 text-gray-400 focus:outline-none focus:border-blue-400"></input>
                    </div>
                </form>
                : null
            }
        </main>        
    );
}