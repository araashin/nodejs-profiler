const path = require('path');
const parser = require('./parser');

module.exports = async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const result = await parser(filePath);
    res.render('result', { result });
  } catch (err) {
    res.status(500).send('파일 처리 중 오류 발생: ' + err.message);
  }
};
