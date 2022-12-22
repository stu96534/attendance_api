
const attController = {
  getAttendant: (req, res, next) => {
    console.log('attendant page')
    res.status(200).json({ status: 'error', message: "此帳號" })
  }
}

module.exports = attController
