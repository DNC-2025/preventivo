import { clerkMiddleware, getAuth } from "@clerk/express";

export const clerkAuth = clerkMiddleware();
