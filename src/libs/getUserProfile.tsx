export default async function getUserProfile(token:string) {
    const response = await fetch("http://localhost:5000/api/v1/auth/me", {
        method:"GET",
        headers: {
            Authorization: `Bearer ${token}`,  
        }
    })
    if (!response.ok){
        throw new Error("Cannot get user profile")
    }

    return await response.json()
}