const app = require("./app.js")
const { PORT = 3000 } = process.env
const ENV = process.env.NODE_ENV

app.listen(PORT, () => console.log(`server running on ${ENV}`));