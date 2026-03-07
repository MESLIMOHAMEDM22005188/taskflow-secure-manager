module.exports = {
  accessSecret: process.env.JWT_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessExpiresIn: "1d",
  refreshExpiresIn: "7d"
};