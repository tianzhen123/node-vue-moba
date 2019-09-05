const express = require("express")

const app = express()


require("./plugins/db")(app)
require("./routers/admin")(app)

app.listen(3000,()=>{
    console.log("已启动");
})