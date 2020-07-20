const nodemailer = require('nodemailer')

const config = {
  host: 'smtp.qq.com',
  port: 465,
  auth: {
    user: '1121842729@qq.com', // 注册的163邮箱账号
    pass: 'dizrhhswhyshhjjf' // 邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
  }
}

const transporter = nodemailer.createTransport(config)

module.exports = function (mail) {
  transporter.sendMail(mail, function (error, info) {
    if (error) {
      return console.log(error)
    }
    console.log('mail sent:', info.response)
  })
}
