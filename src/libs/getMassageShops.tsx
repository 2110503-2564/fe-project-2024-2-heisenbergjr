export default async function getShops() {

    await new Promise((resolve) => setTimeout(resolve,300))
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/massageShops`)
    if (!response.ok) {
        throw new Error("Failed to fetch Venues")
    }

    return await response.json();
}