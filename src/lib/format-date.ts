import dayjs from "dayjs";

export function formatDate(createdAt: string) {
  return dayjs(createdAt).format("HH:mm DD-MM-YYYY");
}
