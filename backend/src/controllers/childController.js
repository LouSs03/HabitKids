import Child from "../models/Child.js";

// Crear niño
export const registerChild = async (req, res) => {
  try {
    const { name, username, pin, age, avatar, parentId } = req.body;
    
    // Verificar si el niño ya existe
    const exists = await Child.findOne({ username });
    if (exists) return res.status(400).json({ error: "Ese usuario ya existe." });

    // Crear un nuevo niño
    const child = new Child({
      name,
      username,
      pin,
      age,
      avatar,
      parent: parentId, // Asociar al padre
    });

    await child.save(); // Guardar en la base de datos
    res.json({ message: "Niño registrado", child });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los niños del padre
export const getChildren = async (req, res) => {
  try {
    const { parentId } = req.params; // Obtener ID del padre de los parámetros
    const children = await Child.find({ parent: parentId }); // Buscar niños asociados al padre

    res.json({ children });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
