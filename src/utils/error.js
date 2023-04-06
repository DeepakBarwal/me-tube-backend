export const createError = (err, status, message) => {
  err.status = status;
  err.message = message;
  return err;
};
