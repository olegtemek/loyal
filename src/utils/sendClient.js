export default (res, code = 500, data = { message: "Ошибка сервера, попробуйте позже" }) => {
  res.status(code).json(data)
}