export default async function deleteMassageShop(shopId: string, token: string) {
    try {
        if (!token) {
            throw new Error("No token provided");
        }

        const response = await fetch(`http://localhost:5000/api/v1/massageShops/${shopId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete shop");
        }

        return await response.json();

    } catch (error: any) {
        console.error("Cannot Delete Shop: ", error.message);
        throw new Error(error.message || "Something went wrong");
    }
}
