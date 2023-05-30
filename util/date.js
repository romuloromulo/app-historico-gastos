export function getFormattedDate(date) {
  // const year = date.getFullYear();

  const data = new Intl.DateTimeFormat("pt-BR").format(date);
  // const day = date.getDate();
  // const day = new Intl.DateTimeFormat("pt-BR", { data: "long" }).format(date);
  return `${data}`;
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
