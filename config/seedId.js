const { getUserId, getCalendarId } = require('../middleware/funcTools')
const att2023 = require('../config/2023att.json')

const fs = require('fs')

const arr = []

 att2023.map(async d => {
  let userId = await getUserId('user1')
  let calendarId = await getCalendarId(new Date(d.checkIn).valueOf())
  
   arr.push({
    userId,
    calendarId
  })

   userId = await getUserId('admin')

   arr.push({
     userId,
     calendarId
   })

})

setTimeout(() => {
  fs.writeFile('./config/seedId.json', JSON.stringify(arr), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
}, 1000);

