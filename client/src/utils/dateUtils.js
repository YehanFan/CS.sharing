import { format, formatDistanceToNow } from "date-fns";

export function formatDate(date) {
  date = new Date(date)
const result = format(date, "MMM dd");

return result;
}


export function formatRelativeDate(date) {
    date = new Date(date)
  const options = { addSuffix: true };
  const result = formatDistanceToNow(date, options);

  return result;
}
