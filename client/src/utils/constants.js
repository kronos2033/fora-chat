const date = new Date();

export const currentTime = `${date.getHours()} : ${
  String(date.getMinutes()).length == 1
    ? '0' + date.getMinutes()
    : date.getMinutes()
}`;
