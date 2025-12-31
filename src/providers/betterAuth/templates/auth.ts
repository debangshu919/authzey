import { betterAuth } from "better-auth";
// ORM RELATED IMPORTS

export const auth = betterAuth({
  // DATABASE
  secret: process.env.BETTER_AUTH_SECRET!,
  emailAndPassword: {
    enabled: true,
  },
  // SOCIAL_PROVIDERS
});
