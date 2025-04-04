import { body, validationResult } from "express-validator";

// Regular expression for URL validation
const URL_PATTERN = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i" // fragment locator
);

// Validation rules for URL shortening
export const validateUrlShortening = [
  body("url")
    .trim()
    .notEmpty()
    .withMessage("URL is required")
    .isLength({ max: 2048 })
    .withMessage("URL cannot exceed 2048 characters")
    .matches(URL_PATTERN)
    .withMessage("Please provide a valid URL")
    .custom((value) => {
      try {
        new URL(value);
        return true;
      } catch (err) {
        throw new Error("Invalid URL format");
      }
    }),

  // Optional custom alias validation
  body("customAlias")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Custom alias must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9-_]+$/)
    .withMessage(
      "Custom alias can only contain letters, numbers, hyphens, and underscores"
    ),

  // Middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Invalid input",
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }
    next();
  },
];

// Validation for retrieving URL by ID
export const validateUrlRetrieval = [
  body("urlId")
    .trim()
    .notEmpty()
    .withMessage("URL ID is required")
    .isLength({ max: 100 })
    .withMessage("URL ID is too long")
    .matches(/^[a-zA-Z0-9-_]+$/)
    .withMessage("Invalid URL ID format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Invalid input",
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }
    next();
  },
];
