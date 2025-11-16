import express from "express";
import Parent from "../models/Parent.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register-parent", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await Parent.findOne({ email });
  if (exists) return res.status(400).json({ error: "Email ya registrado" });

  const hashed = await bcrypt.hash(password, 10);

  const parent = new Parent({
    name,
    email,
    password: hashed,
  });

  await parent.save();
  res.json({ message: "Registrado con éxito" });
});

router.post("/login-parent", async (req, res) => {
  const { email, password } = req.body;

  const parent = await Parent.findOne({ email });
  if (!parent) return res.status(400).json({ error: "Credenciales incorrectas" });

  const valid = await bcrypt.compare(password, parent.password);
  if (!valid) return res.status(400).json({ error: "Credenciales incorrectas" });

  const token = jwt.sign({ id: parent._id }, process.env.JWT_SECRET);

  res.json({ token });
});

export default router;
