module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '서버 에러 발생' });
};
