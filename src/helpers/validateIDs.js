import isValidID from "./isValidID.js";
import HttpError from "./HttpError.js";

const validateIDs = async (obj, validKeys) => {
  const idsToCheck = [];

  validKeys.forEach((key) => {
    if (obj[key] !== undefined) {
      idsToCheck[key] = obj[key];
    }
  });

  if (Object.keys(idsToCheck).length === 0) {
    return;
  }

  const errorMessage = await isValidID(idsToCheck);

  if (errorMessage) {
    throw HttpError(400, errorMessage);
  }
};

export default validateIDs;
