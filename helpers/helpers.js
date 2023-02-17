//日期轉換
function dateStr(str) {
  const date = str.slice(0, 4) + '/' + str.slice(4, 6) + '/' + str.slice(6)

  return date
}

//年度行事曆轉換
function calendarTransformOwnData(year) {
  return year.map(d => ({
    date: dateStr(d.date),
    week: d.week,
    description: d.description,
    is_holiday: d.isHoliday,
    month: new Date(dateStr(d.date)).getMonth() + 1,
    is_absense: false
  }))
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

//年度行事曆轉換出勤紀錄資訊
function fullYearDay(createUser, calendarTransformOwnData) {
  const fullYearDay =  Array.from({ length: calendarTransformOwnData.length }).map((_, i) => ({
    UserId: Number(createUser.id),
    date: calendarTransformOwnData[i].date,
    month: calendarTransformOwnData[i].month,
    week: calendarTransformOwnData[i].week,
    description: calendarTransformOwnData[i].description,
    isHoliday: calendarTransformOwnData[i].is_holiday,
    isAbsense: false,
    created_at: new Date(),
    updated_at: new Date()
  }))

  return fullYearDay
}

function timestampTransformHours(checkInTimestamp, checkOutTimestamp) {
  return parseInt(parseInt(checkOutTimestamp - checkInTimestamp) / 1000 / 60 / 60)
}


module.exports = {
  dateStr,
  calendarTransformOwnData,
  fullYearDay,
  GMT_3,
  timestampTransformHours
}
