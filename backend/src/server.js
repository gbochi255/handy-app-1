const app = require("../app.js")
const { PORT = 3000 } = process.env


app.listen(PORT, () => console.log(`server running on ${PORT}`));