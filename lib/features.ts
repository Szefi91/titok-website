export const AKTA_ENABLED = process.env.NEXT_PUBLIC_AKTA_ENABLED === "true";

export function isAktaTimeWindow(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Budapest",
    hour: "2-digit",
    hour12: false,
  });

  const hour = Number(formatter.format(date));
  return hour >= 23 || hour < 4;
}
