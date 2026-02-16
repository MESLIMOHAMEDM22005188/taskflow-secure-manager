require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const authRoutes = require("./src/routes/auth");
app.use("/api/auth", authRoutes);