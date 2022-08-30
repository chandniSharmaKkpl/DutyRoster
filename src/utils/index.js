import moment from "moment";

const enumerateDaysBetweenDates = function (_startDate, _endDate) {
  var startDate = moment(_startDate);
  var endDate = moment(_endDate);
  var now = startDate.clone(),
    dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format("YYYY-MM-DD"));
    now.add(1, "days");
  }
  return dates;
};
export { enumerateDaysBetweenDates };
