const themeService = require("../services/ThemeService");

exports.create = async (req, res) => {
  try {
    const theme = await themeService.create(req.user.userId, req.body);
    res.status(201).json({ message: "Theme created", theme });
  } catch (e) {
    if (e.message === "Maximum 7 themes allowed") {
      return res.status(400).json({ message: e.message });
    }
    return res.status(400).json({ message: e.message || "Bad request" });
  }
};

exports.list = async (req, res) => {
  try {
    console.log("USER ID:", req.user);

    const themes = await themeService.list(req.user.userId);

    console.log("THEMES:", themes);

    res.json({ themes });
  } catch (e) {
    console.error("THEME LIST ERROR:", e);
    return res.status(500).json({ message: "Error fetching themes" });
  }
};

exports.remove = async (req, res) => {
  try {
    await themeService.remove(req.user.userId, req.params.id);
    res.json({ message: "Theme deleted" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

