export default async function createMassageShop(
    shopName: string,
    shopAddress: string,
    telNumber: string,
    img: string,
    open: string,
    close: string){
    try {
        const response = await fetch("http://localhost:5000/api/v1/massageShops/",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: shopName,
                tel: telNumber,
                address: shopAddress,
                imgURL: img,
                opentime:open,
                closetime:close,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || "Failed to createShops");
        }
        return await response.json(); 
    } catch (error: any) {
        console.error("Creation Error:", error.message);
        throw new Error(error.message || "Something went wrong");
    }

}