'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const wechatController = controller.wechat;
  // const todoController = controller.todo;
  // const okrController = controller.okr;
  // const keyresultController = controller.keyresult;
  // const todoKeyresultController = controller.todoKeyresult;

  router.get('/', controller.home.index);

  router.post('/api/login', wechatController.oAuthMini);
};
