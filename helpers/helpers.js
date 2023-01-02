function dateStr(str) {
  const date = str.slice(0, 4) + '/' + str.slice(4, 6) + '/' + str.slice(6)

  return date
}

//為配合GMT+8時區的早上5點為換日時間，將時區變為GMT+3
function GMT_3(date) {
  const formatting =
    new Date(date).toLocaleString('en-GB', {
      timeZone: "Africa/Addis_Ababa",
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })

  const words = formatting.split('/')
  const workDay = words[2] + '/' + words[1] + '/' + words[0]

  return workDay
}


module.exports = {
  dateStr,
  GMT_3
}
