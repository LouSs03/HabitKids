import Child from "../models/Child.js";
import Parent from "../models/Parent.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function registerChild(req, res) {
  try {
    const { name, username, pin, parentId } = req.body;

    const exists = await Child.findOne({ username });
    if (exists) return res.status(400).json({ error: "Ese usuario ya existe." });

    const hashedPin = await bcrypt.hash(pin, 10);

    const child = new Child({
      name,
      username,
      pin: hashedPin,
      parent: parentId
    });

    await child.save();

    res.json({ message: "Niño registrado", child });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function loginChild(req, res) {
  try {
    const { username, pin } = req.body;

    const child = await Child.findOne({ username });
    if (!child) return res.status(400).json({ error: "Usuario incorrecto" });

    const isValid = await bcrypt.compare(pin, child.pin);
    if (!isValid) return res.status(400).json({ error: "PIN incorrecto" });

    const token = jwt.sign(
      { id: child._id, role: "child" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login correcto", token, child });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
