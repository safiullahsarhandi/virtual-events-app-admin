import moment from "moment";

export const createDateAsUTC = (date) => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
};

export const formatCurrency = (number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });

  return formatter.format(number);
};

export const format_number = (x) =>
  x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const format_date = (date) => moment(date).format("LL");

export const format_time = (date) => moment(date).format("hh:mm a");

export const closeModals = () => {
  window?.$(".modal").modal("hide");
  window?.$(".modal-backdrop").remove();
};

export const guidGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export const emptyElementExists = (arr) => arr.includes("");
