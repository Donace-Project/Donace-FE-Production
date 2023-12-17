import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { fetchWrapper } from '../../../helpers/fetch-wrapper';
import axios from "axios";
import { authHelper } from "@/helpers/authHelper";
import { NextApiRequest, NextApiResponse } from "next";

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
            async authorize(credentials) {
                const { email, password } = credentials as any;
                const res = await axios({
                    method: 'POST',
                    baseURL: "http://171.245.205.120:8082/",
                    url: `api/Authentication/login`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        email,
                        password
                    },

                });

                const user = res.data;
                // console.log(user);
                if (user) {
                    return Promise.resolve(user);
                }
                throw new Error('Authentication failed');
                // return fetchWrapper.post("api/Authentication/login", {
                //     email,
                //     password
                // })
            },
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            const userRes = token as any;
            session.user = { ...userRes.user }
            session.token = userRes?.token;
            // console.log(token);

            return session;
        },
       
    },

    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login",
        error: "/auth/login", // Error code passed in query string as ?error=
    },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);

