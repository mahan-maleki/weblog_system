import express from "express"
import { signedCookies } from "cookie-parser";

export default function checkRoleMiddleware(req, res, next) {
    let authToken = req.signedCookies.AUTH;

    if (!authToken) {
        authToken = undefined
    } else {
        req.authToken = authToken;
    }

    next()
}