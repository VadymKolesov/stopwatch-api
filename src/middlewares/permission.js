import HttpError from "../helpers/HttpError";

const permission = (roles) => {
  const func = (req, _, next) => {
    const { role } = req.user;

    if (!roles.includes(role)) {
      next(HttpError(401, "Permission denied"));
    }

    next();
  };

  return func;
};

export default permission;
