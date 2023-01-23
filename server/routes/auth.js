const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const result = await db.query(
      `SELECT * FROM users WHERE email='${req.body.email}'`
    );
    const user = result.rows[0];
    if (!user) return res.status(400).send("Invalid email or password.");
    let token = null;
    const valiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (valiedPassword) {
      token = generateJWT(user);
    }
   if (token)
   { res.send(token)}
   else{ res.status(400).send("Invalid email or password. ");}
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to the database.");
  }
});

function validate(req) {
  const schema = {
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;

function generateJWT(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, "secretkey", options);
}
