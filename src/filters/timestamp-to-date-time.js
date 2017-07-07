export default function (mileseconds) {
  return new Date(parseInt(mileseconds, 10)).toLocaleString().replace(/:\d{1,2}$/, ' ')
}
