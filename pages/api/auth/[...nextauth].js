import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import Auth0Provider from "next-auth/providers/auth0";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import User from "../../../model/User";

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                const user = await User.findOne({ email }).select("+password");
                if (user) {
                    return SignInUser({ password, user });
                } else {
                    throw new Error("This email doesn't exist!");
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRECT,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRECT,
        }),
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            issuer: process.env.AUTH0_ISSUER,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            const user = await User.findById(token.sub);
            session.user._id = user._id.toString() || token.sub;
            session.user.role = user.role || "user";
            token.role = user.role || "user";
            return session;
        },
    },
    pages: { signIn: "/auth/login" },
    session: {
        strategy: "jwt",
    },
    secret: process.env.JWT_PRIVATE_KEY,
});
const SignInUser = async({ password, user }) => {
    if (!user.password) {
        throw new Error("Please enter your password.");
    }
    if (!user || !(await user.checkPassword(password, user.password))) {
        throw new Error("Invalid email or password!");
    }

    return user;
};
// export default NextAuth(authOptions);