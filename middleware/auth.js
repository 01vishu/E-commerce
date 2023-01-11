import { getToken } from "next-auth/jwt";

export default async function Session({ req }) {
    const user = await getToken({
        req,
        secret: process.env.JWT_PRIVATE_KEY,
        secureCookie: process.env.NODE_ENV === "production",
    });
    req.user = user;
}