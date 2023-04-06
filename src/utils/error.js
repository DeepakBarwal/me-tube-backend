export const createError = (err, status, message) => {
  if (status) {
    err.status = status;
  }
  if (message) {
    err.message = message;
  }
  return err;
};
