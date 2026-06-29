import type {NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {prisma} from "@/lib/prisma";
import {verifyPassword} from "@/lib/password";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Admin",

      credentials: {
        username: {
          label: "Username",
          type: "text",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const admin = await prisma.adminUser.findFirst({
          where: {
            OR: [
              {
                username: credentials.username as string,
              },
              {
                email: credentials.username as string,
              },
            ],
          },
        });

        if (!admin) return null;

        if (!admin.isActive) return null;

        const valid = await verifyPassword(
          credentials.password as string,
          admin.passwordHash,
        );

        if (!valid) return null;

        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          username: admin.username,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
      }

      return token;
    },

    async session({session, token}) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.username = token.username as string;

      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};
