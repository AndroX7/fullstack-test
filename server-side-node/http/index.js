const app = require('../app.js');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Service Running on http://localhost:${port}`)
})
