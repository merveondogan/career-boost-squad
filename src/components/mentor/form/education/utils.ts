
import { Education } from "../types";

export const isEducationEmpty = (education: Education): boolean => {
  return !education.school && !education.major && !education.graduationYear;
};

export const validateEducation = (education: Education): boolean => {
  return !!education.school && !!education.major && !!education.graduationYear;
};
