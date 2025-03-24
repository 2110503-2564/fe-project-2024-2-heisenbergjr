export default async function getShop(id: string) {
    console.log("Fetching shop with ID:", id);

    try {
        const response = await fetch(`http://localhost:5000/api/v1/massageShops/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Failed to fetch shop: ${response.statusText}`);
        }

        console.log(response)

        return await response.json();
    } catch (error) {
        console.error("Error fetching shop:", error);
        return null;
    }
}
