import http from "../../plugins/http";

interface getDate {
  start: any;
  end: any;
}

interface Date {
  dateGet: (data: getDate) => any;
}

export const date: Date = {
  dateGet: (data) =>
    http.get(`/orders?start=${data.start}&end=${data.end}`),
};
