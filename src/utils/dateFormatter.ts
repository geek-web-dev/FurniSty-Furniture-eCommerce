export const dateFormatter = (date: Date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const formattedHours = hours.toString().padStart(2, "0");

  return `${formattedHours}:${minutes} ${ampm} ${" at "} ${month}/${day}/${year}`;
};
