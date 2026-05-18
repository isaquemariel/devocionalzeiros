import { differenceInCalendarDays, format, startOfYear } from "date-fns";

const BRASILIA_TIMEZONE = "America/Sao_Paulo";

const brasiliaDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: BRASILIA_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const getPartValue = (parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) => {
  return Number(parts.find((part) => part.type === type)?.value ?? "0");
};

export const getBrasiliaDateParts = (date = new Date()) => {
  const parts = brasiliaDateFormatter.formatToParts(date);

  return {
    year: getPartValue(parts, "year"),
    month: getPartValue(parts, "month"),
    day: getPartValue(parts, "day"),
  };
};

export const getBrasiliaDate = (date = new Date()) => {
  const { year, month, day } = getBrasiliaDateParts(date);
  return new Date(year, month - 1, day);
};

export const getBrasiliaDateString = (date = new Date()) => {
  const { year, month, day } = getBrasiliaDateParts(date);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

export const getBrasiliaDayOfYear = (date = new Date()) => {
  const brasiliaDate = getBrasiliaDate(date);
  return differenceInCalendarDays(brasiliaDate, startOfYear(brasiliaDate)) + 1;
};

export const isCalendarDateAfterBrasiliaToday = (date: Date, now = new Date()) => {
  return format(date, "yyyy-MM-dd") > getBrasiliaDateString(now);
};