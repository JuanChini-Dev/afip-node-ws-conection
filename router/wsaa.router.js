import express from "express";

import WSAAService from "./../services/wsaa.service.js";
import getValidTA from "./../services/validateTa.js";

const router = express.Router();

const service = new WSAAService();

router.get("/", async (req, res) => {
  try {
    const result = await getValidTA();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
