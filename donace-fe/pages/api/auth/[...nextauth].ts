import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { fetchWrapper } from '../../../helpers/fetch-wrapper';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        // ...add more providers here
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as any;
                try {
                    var output = await fetchWrapper.post("api/Authentication/login", {
                        email,
                        password
                    })
                    return output;
                } catch (ex) {
                    console.log(ex);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.

            const userRes = token as any;
            session.user = { ...userRes.user }
            session.token = userRes?.token;

            return session;
        },
    },

    pages: {
        signIn: "/auth/login",
    },
};

export default NextAuth(authOptions);
