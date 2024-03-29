module.exports = {
  authErrorHandler (err, req, res, next)  {
    res.status(401).json({
      status: 'error',
      message: req.authError
    })
  },
  apiErrorHandler (err, req, res, next) {
    if (err instanceof Error) {
      
      res.status(err.status || 500).json({
        status: 'error',
        message: `${err.name}: ${err.message}`
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: `${err}`
      })
    }
    
  }
}