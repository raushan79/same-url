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

router
  .route("/shorten")
  .all(apiLimiter)
  .get(validateUrlShortening, async (req, res, next) => {
    const { url } = req.body;
    const existingUrl = await Url.findOne({ original_url: url });
    if (existingUrl) {
      console.info(`Existing URL found: ${existingUrl}`);
      res.status(200).json({
        status: "success",
        message: "Short URL found",
        short_url: existingUrl.short_url,
      });
    } else {
      console.info("No existing URL found for the provided original URL.");
      res.status(404).json({
        status: "error",
        message: "Short URL not found for the provided original URL",
      });
    }
  })
  .post(validateUrlShortening, async (req, res) => {
    try {
      const { url } = req.body;

      // Sanitize the URL
      const sanitizedUrl = sanitizeUrl(url);

      // Check for suspicious URLs
      if (isSuspiciousUrl(sanitizedUrl)) {
        return res.status(400).json({
          status: "error",
          message: "URL appears to be suspicious or potentially harmful",
        });
      }

      // Check if the URL already exists
      const existingUrl = await Url.findOne({ original_url: sanitizedUrl });
      if (existingUrl) {
        return res.status(200).json({
          status: "success",
          message: "Short URL already exists",
          original_url: existingUrl.original_url,
          short_url: existingUrl.short_url,
        });
      }

      const shortUrlId = getRandomShortId();
      const shortUrl = `${process.env.BASE_URL}/${shortUrlId}`;
      const urlModel = new Url({
        original_url: sanitizedUrl,
        short_url: shortUrl,
      });
      const saveUrl = await urlModel.save();
      const resObj = {
        status: "success",
        message: "Short url created",
        original_url: saveUrl.original_url,
        short_url: saveUrl.short_url,
      };
      res.send(resObj);
    } catch (error) {
      console.error("Error occurred while creating short URL:", error);
      res.status(500).json({
        status: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  });

router.get("/:urlId", apiLimiter, async (req, res, next) => {
  try {
    const { urlId } = req.params;
    const url = `${process.env.BASE_URL}/${urlId}`;
    const existingUrl = await Url.findOne({ short_url: url });

    if (existingUrl) {
      return res.redirect(existingUrl.original_url);
    } else {
      return res.status(404).json({
        status: "error",
        message: "Short URL not found",
      });
    }
  } catch (error) {
    console.error("Error occurred while retrieving short URL:", error);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
});

export default router;
