import { NextApiRequest, NextApiResponse } from "next";
import userRegister from "@/libs/userRegister";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const {name, telephoneNumber, email, password } = req.body;
        await userRegister(name,telephoneNumber,email, password);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: "Failed to register" });
    }
}
