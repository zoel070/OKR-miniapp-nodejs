const Service = require('egg').Service;
const { Wechat } = require('wechat-jssdk');  //很关键，集成了微信公众号的各种功能，例如分享、支付、获取用户信息等等
const wechatConfig = require('../../config/wechatConfig.js')

class WechatService extends Service {
    async oAuthMini(code) {
        try {
            const wx = new Wechat(wechatConfig);
            const sessionInfo = await wx.miniProgram.getSession(code);
            console.log(234, sessionInfo);
            const user = await this.app.model.User.findOne({ open_id: sessionInfo.openid });//识别不到User，问题待解决（）
            console.log(345, user);
            if (!user) {
                const newUser = await this.app.model.User.create({
                    open_id: sessionInfo.openid,
                    union_id: sessionInfo.unionid ? sessionInfo.unionid : null,
                });
                return {
                    id: newUser.id,
                };
            }
            return {
                id: user.id,
            };
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = WechatService;