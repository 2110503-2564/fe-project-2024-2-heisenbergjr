export default async function getVenue(_id:string) {
    const response = await fetch(`http://localhost:5000/api/v1/massageShops${_id}`)
    if (!response.ok) {
        throw new Error("Failed to fetch Venues")
    }

    return await response.json();
}