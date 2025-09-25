import { PrismaClient } from "@prisma/client";
import express from "express"

export default function useDbMiddleware(req, res, next) {
    const prisma = new PrismaClient();
    res.locals.prisma = prisma;
    next()
}