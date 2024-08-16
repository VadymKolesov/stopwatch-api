import HttpError from "../helpers/HttpError";
import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.body;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  const { SECRET_KEY } = process.env;

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = null; // Get user from your db

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

export default authenticate;
