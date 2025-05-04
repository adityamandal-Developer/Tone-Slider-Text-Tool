# Documentation - Error handling

This document explains the error handing in the application

## Pakages used for error handing

- `helmet`: a middleware function that sets security-related HTTP response headers.
- `express-rate-limit`: rate limiter to prevent DDoS attacks or similer
- `express-validator`: to ensure all data comming (from frontend or request body) is valid

## Global error handler

- It catches any errors that occur during request processing and sends a standardized JSON error response to the client.

```javascript
export const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 400
        ? "Bad Request: Something went wrong"
        : "Internal Server Error",
  });
};
```

## express-rate-limit

This prevents brute force attacks and protects the server

```javascript
import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: "You have crossed the usage limit, try again in 15mins",
  standardHeaders: true,
  legacyHeaders: false,
});
```

## express-validator

this will valdate any data comming to the api and ensures no unwanted data is passed

```javascript
import { body } from "express-validator";

export const validateCoreRequest = [
  body("model").notEmpty().withMessage("Model is required"),

  body("tone").isString().withMessage("Tone must be a string"),

  body("messages")
    .isArray({ min: 1 })
    .withMessage("Messages must be a non-empty array"),

  body("messages.*.role")
    .isIn(["user", "assistant", "system"])
    .withMessage("Each message must have a valid role"),

  body("messages.*.content")
    .isString()
    .notEmpty()
    .withMessage("Each message must have non-empty content"),
];
```

then we can use this as

```javascript
router.post("/tone-changes", validateCoreRequest, toneChanger);
```

here `validateCoreRequest` first checks the req body and ensures that correct data is passed into the api

## Sending proper errors in backend logs and client

```javascript
if (data.error || data.success == false) {
  res.status(400);
  return next(new Error("something went wrong Mistral AI"));
}
```

if an error happens the client will recieve a **Bad Request: Something went wrong** or **Internal Server Error** but backend logs will recieve a `something went wrong Mistral AI` this helps backend developers to debug and also prevents exposure to sensitive erros to client

Thank you
