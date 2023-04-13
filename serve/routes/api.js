var express = require('express');
var router = express.Router();
const wechatController = require('./../controllers/wechat.js');
const todoController = require('./../controllers/todo.js');
const okrController = require('./../controllers/okr.js');
const keyresultController = require('./../controllers/keyresult.js');
const todoKeyresultController = require('./../controllers/todoKeyresult.js');
const Auth = require('../middlewares/auth.js');


router.post('/login', wechatController.oAuthMini);

router.use(Auth.token);  //除了/login，所有路由都在中间件之后定义，因此所有请求都会经过 Auth.token()中间件进行身份验证

router.get('/todo', todoController.index);
router.post('/todo', todoController.insert);
router.put('/todo/:id', todoController.update);
router.delete('/todo/:id', todoController.delete);


router.get('/okr', okrController.index);
router.post('/okr', okrController.insert);
router.put('/okr/:id', okrController.update);
router.delete('/okr/:id', okrController.delete);

router.get('/keyresult', keyresultController.index);
router.post('/keyresult', keyresultController.insert);
router.get('/keyresult/:id', keyresultController.show);
router.put('/keyresult/:id', keyresultController.update);
router.delete('/keyresult/:id', keyresultController.delete);


router.delete('/todoKeyresult', todoKeyresultController.delete);
router.post('/todoKeyresult', todoKeyresultController.insert);




module.exports = router;
