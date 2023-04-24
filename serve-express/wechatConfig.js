// https://github.com/JasonBoy/wechat-jssdk
require('dotenv').config()
module.exports = {
  //set your oauth redirect url, defaults to localhost
  // "wechatRedirectUrl": process.env.WECHAT_REDIRECT_URL,
  //"wechatToken": "wechat_token", //not necessary required
  "appId": 'process.env.WECHAT_WEB_APPID',
  "appSecret": 'process.env.WECHAT_WEB_SECRET',
  // card: true, //enable cards
  // payment: true, //enable payment support
  // merchantId: '', //
  // paymentSandBox: true, //dev env
  // paymentKey: '', //API key to gen payment sign
  // paymentCertificatePfx: fs.readFileSync(path.join(process.cwd(), 'cert/apiclient_cert.p12')),
  //default payment notify url
  // paymentNotifyUrl: `http://your.domain.com/api/wechat/payment/`,
  //mini program config
  "miniProgram": {
    "appId": process.env.WECHAT_MINIPROGRAM_APPID,
    "appSecret": process.env.WECHAT_MINIPROGRAM_SECRET,
  }
}