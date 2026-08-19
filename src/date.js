

import { format, isToday, parseISO } from "date-fns";

export function getTodayInputFormat() {

  return format(new Date(), "yyyy-MM-dd");
}

export function getDisplayDate(dateString) {
  if (!dateString) return "";

  const parsedDate = parseISO(dateString);
  const formattedText = format(parsedDate, "EEE, MMM do, yyyy");
  return isToday(parsedDate) ? `${formattedText} (Today)` : formattedText;

}
