const path = require('path');
const parser = require('../utils/parser');

module.exports = async (req, res) => {
  const filePath = path.join(__dirname, '..', req.file.path);
  const result = await parser(filePath);
  res.render('result', { result });
};