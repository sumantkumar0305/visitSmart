
export const saveUserData = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Received:", username, email, password);

    // TODO: add database logic later
    res.status(201).json({ message: "Data saved successfully", type: "success" });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ message: "Server error", type: "error" });
  }
};
