export default async function addShop( shop: {
    name: string,
    address: string,
    tel: string,
    imageURL: string,
    opentime: string,
    closetime: string,
}) {
    try {
        const response = await fetch("http://localhost:5000/api/v1/massageShops", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                shop
            ),
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