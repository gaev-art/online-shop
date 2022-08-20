require("dotenv").config();
const {Router} = require("express");
const express = require("express");
const path = require("path");

const router = Router();

router.get("/settings", (req, res) => {
  try {
    res.sendFile(express.static(path.join(__dirname, "../build")));
  } catch (e) {
    res.status(500).json({message: "что-то пошло не так, попробуйте снова!", error:e});
  }
});


module["exports"] = router;
