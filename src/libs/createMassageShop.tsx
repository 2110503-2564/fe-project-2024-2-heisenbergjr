export default async function addShop(shopData: any , token: string) {
    try {
        if (!token) {
            throw new Error("No token provided");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/massageShops`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,  
                "Content-Type": "application/json",
            },
            body: JSON.stringify(shopData), 
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add shop");
        }

        return await response.json();

    } catch (error: any) {
        console.error("Cannot Add Shop: ", error.message);
        throw new Error(error.message || "Something went wrong");
    }
}
