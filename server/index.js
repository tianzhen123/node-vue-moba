const express = require("express")

const app = express()

app.set('secret','992hefijskjds9877');

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require("./plugins/db")(app)

// 等同于 
// var router = require("./routers/admin")
// router(app)
require("./routers/admin")(app)

require("./routers/web")(app)

app.listen(3000,()=>{
    console.log("已启动");
})