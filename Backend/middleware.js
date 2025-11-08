
export const currentUser = (req) => {
   return req?.isAuthenticated?.() ? req.user : null;
}