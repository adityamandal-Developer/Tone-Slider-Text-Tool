import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: "You have crossed the usage limit, try again in 15mins",
    standardHeaders: true,
    legacyHeaders: false
})