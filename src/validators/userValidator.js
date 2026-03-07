const { z } = require("zod");

const updateUsernameSchema = z.object({
  username: z.string().min(3)
});

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6)
});

module.exports = {
  updateUsernameSchema,
  updatePasswordSchema
};