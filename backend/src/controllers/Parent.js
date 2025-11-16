import Parent from "../models/Parent.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerParent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // Ver si ya existe
    const exists = await Parent.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashed = await bcrypt.hash(password, 10);

    const parent = await Parent.create({
      name,
      email,
      password: hashed,
    });

    res.json({ message: "Padre registrado", parent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginParent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const parent = await Parent.findOne({ email });
    if (!parent) return res.status(404).json({ message: "No existe ese usuario" });

    const valid = await bcrypt.compare(password, parent.password);
    if (!valid) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: parent._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login exitoso",
      token,
      parent: {
        id: parent._id,
        name: parent.name,
        email: parent.email,
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
