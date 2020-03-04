module.exports = app =>{
    const express = require("express")

    const router = express.Router({
        mergeParams: true
    })
    // 新增
    router.post('/',async(req, res)=>{
       const model =  await req.Model.create(req.body)
       res.send(model)
    })

    // 更新
    router.put('/:id',async(req, res)=>{
        const model =  await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
     })

     // 删除一条
    router.delete('/:id',async(req, res)=>{
        await req.Model.findByIdAndRemove(req.params.id)
        res.send({
            success:true
        })
     })

    // 列表查询
    router.get('/',async(req, res)=>{
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items =  await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
     })

     // 查询单条
     router.get('/:id',async(req, res)=>{
        const model =  await req.Model.findById(req.params.id)
        res.send(model)
     })

    app.use('/admin/api/rest/:resource',async (req, res ,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    } ,router)

    const multer = require('multer')
    const upload = multer({dest: __dirname +'/../../uploads'});
    // 文件上传
    app.post('/admin/api/upload',upload.single('file'),async (req, res)=>{
        const file =  req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file)
    })
}