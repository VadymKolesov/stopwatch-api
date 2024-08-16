import HttpError from "../helpers/HttpError";

const validateBody = (schema) => {
  const func = async (req, _, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      next(HttpError(400, error.message));
    }
  };
  return func;
};

export default validateBody;
