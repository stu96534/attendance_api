module.exports = {
  authErrorHandler (err, req, res, next)  {
    res.status(401).json({
      status: 'error',
      message: req.authError
    })
  }
}