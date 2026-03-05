function sanitize(str) {
  if (!str) return "";
  return str.trim();
}

module.exports = sanitize;