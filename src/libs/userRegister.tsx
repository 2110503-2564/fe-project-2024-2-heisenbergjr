export default async function userRegister(
    userName: string, 
    telephoneNumber: string, 
    userEmail: string, 
    userPassword: string,
) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: userName,
                telephoneNumber: telephoneNumber,
                email: userEmail,
                password: userPassword,
                role: "user",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || "Failed to register user");
        }

        return await response.json(); 

    } catch (error: any) {
        console.error("Registration Error:", error.message);
        throw new Error(error.message || "Something went wrong");
    }
}
