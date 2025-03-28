const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  next();
});

app.use(express.static('./dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});