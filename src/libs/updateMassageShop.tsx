export default async function updateShop(shopId: string, token: string,newData:any) {
    try {
        if (!token) {
            throw new Error("No token provided");
        }

        const response = await fetch(`http://localhost:5000/api/v1/massageShops/${shopId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body:JSON.stringify(newData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update shop");
        }

        return await response.json();

    } catch (error: any) {
        console.error("Cannot Update Shop: ", error.message);
        throw new Error(error.message || "Something went wrong");
    }
}
