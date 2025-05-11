
import { format } from "date-fns";

export const formatDate = (dateString: string): string => {
  try {
    if (!dateString) return '';
    return format(new Date(dateString), 'MMM yyyy');
  } catch (e) {
    return dateString;
  }
};
