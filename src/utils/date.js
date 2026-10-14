export function formatDate(date) {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(value)
    .replace(/\//g, "-");
}

export function formatDateRange(start, end) {
  const startDate = formatDate(start);
  const endDate = formatDate(end);

  return startDate === endDate ? startDate : `${startDate} ~ ${endDate}`;
}
