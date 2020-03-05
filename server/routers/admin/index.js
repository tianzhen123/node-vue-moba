module.exports = app => {
    const express = require("express")
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser');
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true
    })
    // 新增
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 更新
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 删除一条
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndRemove(req.params.id)
        res.send({
            success: true
        })
    })

    // 列表查询
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    // 查询单条
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 登录校验中间件
    const authMiddleWare = require('../../middleware/auth')

    // 资源中间件,用来判断请求的哪个 model
    const resourceMiddleWare = require('../../middleware/resource')

    // 统一拦截,判断引入 model
    app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare(), router)

    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' });
    // 文件上传
    app.post('/admin/api/upload', authMiddleWare, upload.single('file'), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file)
    })

    app.post('/admin/api/login', authMiddleWare(), async (req, res) => {
        const { username, password } = req.body;
        // 1. 根据用户名找用户

        const user = await AdminUser.findOne({ username: username }).select('password');
        assert(user, 422, '用户不存在')
        // if (!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        // 2. 校验密码
        const isVaild = require('bcrypt').compareSync(password, user.password);
        assert(isVaild, 422, '密码错误');
        // 3. 返回 token
        const jwt = require('jsonwebtoken');
        // 签名
        const token = jwt.sign({ id: user._id }, app.get('secret'));
        res.send({ token });
    })
    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.status || 500).send({
            message: err.message
        })
    })
}