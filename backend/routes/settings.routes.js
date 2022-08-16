require("dotenv").config();
const { Router } = require("express");

const router = Router();

router.get("/settings", (req, res) => {
  try {
    console.log('settings')
    res.status(200).json({message: 'settings'})
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова!" });
  }
});


module["exports"] = router;
