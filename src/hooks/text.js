export const textCaps = (text) => {
  const arr = text?.split(" ");
  let newText = "";
  arr.forEach((item, idx) => {
    const caps = item[0].toUpperCase() + item.slice(1).toLowerCase();
    newText += idx === arr?.length - 1 ? caps : `${caps} `;
  });
  return newText;
};

export const idr = (data) => {
  const locale = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 9,
  });
  return locale.format(data);
};
