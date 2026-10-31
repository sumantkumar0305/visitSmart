
export const validateEnv = () => {
  const requiredVariables = [
    "MONGOURL",
    "SESSION_KEY",
    "CLOUD_NAME",
    "CLOUD_API_KEY",
    "CLOUD_API_SECRET",
  ];

  const missingVariables = requiredVariables.filter(
    (name) => !process.env[name]?.trim()
  );

  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    if (!process.env.FRONTEND_ORIGINS?.trim()) {
      missingVariables.push("FRONTEND_ORIGINS");
    }
  }

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingVariables.join(", ")}`
    );
  }
};
