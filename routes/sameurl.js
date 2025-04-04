import express from "express";
import { getRandomShortId } from "../utils/get-random-short-id.js";
import Url from "../models/Url.js";
import {
  validateUrlShortening,
  validateUrlRetrieval,
} from "../middlewares/url-validation.js";
import { sanitizeUrl, isSuspiciousUrl } from "../utils/urlSanitizer.js";
import apiLimiter from "../middlewares/rateLimiter.js";

const router = express.Router();

// Home page route
router.get("/", (req, res) => {
  res.render("index", {
    title: "SameURL - URL Shortener",
    message: req.query.message,
    shortUrl: req.query.shortUrl,
  });
});

// URL shortening routes
router
  .route("/shorten")
  .get(async (req, res) => {
    try {
      const { url } = req.query;
      const existingUrl = await Url.findOne({ original_url: url });

      if (existingUrl) {
        res.redirect(
          "/?message=URL already exists&shortUrl=" + existingUrl.short_url
        );
      } else {
        res.redirect("/?message=URL not found");
      }
    } catch (error) {
      console.error("Error checking URL:", error);
      res.redirect("/?message=Error checking URL");
    }
  })
  .post(async (req, res) => {
    try {
      const { url } = req.body;

      // Sanitize and validate URL
      const sanitizedUrl = sanitizeUrl(url);

      if (isSuspiciousUrl(sanitizedUrl)) {
        return res.redirect("/?message=URL appears to be suspicious");
      }

      // Check if URL already exists
      const existingUrl = await Url.findOne({ original_url: sanitizedUrl });
      if (existingUrl) {
        return res.redirect(
          "/?message=URL already exists&shortUrl=" + existingUrl.short_url
        );
      }

      // Create new short URL
      const shortUrlId = getRandomShortId();
      const shortUrl = `${process.env.BASE_URL}/${shortUrlId}`;

      const urlModel = new Url({
        original_url: sanitizedUrl,
        short_url: shortUrl,
      });

      await urlModel.save();
      res.redirect(
        "/?message=Short URL created successfully&shortUrl=" + shortUrl
      );
    } catch (error) {
      console.error("Error creating short URL:", error);
      res.redirect("/?message=Error creating short URL");
    }
  });

// Redirect to original URL
router.get("/:urlId", async (req, res) => {
  try {
    const { urlId } = req.params;
    const url = `${process.env.BASE_URL}/${urlId}`;
    const existingUrl = await Url.findOne({ short_url: url });

    if (existingUrl) {
      return res.redirect(existingUrl.original_url);
    } else {
      return res.redirect("/?message=Short URL not found");
    }
  } catch (error) {
    console.error("Error redirecting to URL:", error);
    return res.redirect("/?message=Error redirecting to URL");
  }
});

export default router;
