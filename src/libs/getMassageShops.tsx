export default async function getShops() {

    await new Promise((resolve) => setTimeout(resolve,300))
    const response = await fetch("http://localhost:5000/api/v1/massageShops")
    if (!response.ok) {
        throw new Error("Failed to fetch Venues")
    }

    return await response.json();
}