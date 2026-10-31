
export const currentUser = (req) => {
   return req?.isAuthenticated?.() ? req.user : null;
}

export const requireAuth = (req, res, next) => {
  if (req.isAuthenticated?.()) return next();

  return res.status(401).json({
    message: "Authentication required",
    type: "error",
  });
};

export const requireTrustedOrigin = (allowedOrigins) => (req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();

  const origin = req.get("origin");
  if (origin && allowedOrigins.includes(origin)) return next();

  return res.status(403).json({
    message: "Request origin is not allowed",
    type: "error",
  });
};