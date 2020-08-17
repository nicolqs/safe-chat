import { ActionType } from "./reducer";

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function buildNewMessage(action: ActionType) {
  return {
    sender: action.sender,
    message: action.text,
    date: monthNames[action.date.getMonth()] + " " + action.date.getDate(),
    time: action.date.getHours() + ":" + action.date.getMinutes(),
  };
}
