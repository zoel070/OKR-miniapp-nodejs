const { Wechat } = require('wechat-jssdk');  //很关键，集成了微信公众号的各种功能，例如分享、支付、获取用户信息等等
const wechatConfig = require('../wechatConfig.js')
const wx = new Wechat(wechatConfig);
console.log("🚀 ~ file: wechat.js:4 ~ wechatConfig:", wechatConfig)
const User = require('../models/user.js');

const wechatService = {
  // 小程序登录
  oAuthMini: async function (code) {
    const sessionInfo = await wx.miniProgram.getSession(code)
    console.log(234, sessionInfo)
    let user = await User.first({ open_id: sessionInfo.openid });
    console.log(345, user)
    if (!user) {
      const ids = await User.insert({
        open_id: sessionInfo.openid,
        union_id: sessionInfo.unionid ? sessionInfo.unionid : null,
      });
      user = { id: ids[0] };
    }
    return {
      id: user.id,
    };
  },
}

module.exports = wechatService;