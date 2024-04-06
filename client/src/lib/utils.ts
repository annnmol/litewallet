import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: Date) => {
  const formatDate = (options: Intl.DateTimeFormatOptions) =>
    new Date(dateString).toLocaleString("en-US", options);

  const formatDateWithMonth = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // const dateWithMonthOptions: Intl.DateTimeFormatOptions = {
  //   day: "numeric",
  //   month: "short",
  // };

  const dateWithWeekdayOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    weekday: "short",
  };

  return {
    dateTime: formatDate(dateTimeOptions),
    dateOnly: formatDate(dateOptions),
    timeOnly: formatDate(timeOptions),
    dateWithWeekday: formatDate(dateWithWeekdayOptions),
    dateWithMonth: formatDateWithMonth(dateString),
  };
};
export function formatPrice(
  price: number | string,
  options: {
    currency?: "INR" | "USD" | "EUR" | "GBP" | "BDT";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "INR", notation = "compact" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const isValidObject = (obj: unknown) => {
  //also check if it has at least one property
  return (
    obj !== null &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.keys(obj)?.length > 0
  );
};

export const handleError = (
  error: Error | any,
  title: string = "An error occurred"
) => {
  console.error(
    "handle error",
    { title, error },
    Object.keys(error)?.length > 0
  );

  // throw new Error(error);
};
