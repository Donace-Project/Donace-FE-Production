import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        token: string,
        user: {
            id: string,
            name: string,
            avatar: string,
            email: string,
            token: string
        }
    }
}
