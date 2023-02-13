export default (res, code = 500, data = { message: "Server error" }) => {
  res.status(code).json(data)
}