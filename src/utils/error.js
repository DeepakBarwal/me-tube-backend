export const createError = (err, status, message) => {
  err.status = status;
  if (message) {
    err.message = message;
  }
  return err;
};
