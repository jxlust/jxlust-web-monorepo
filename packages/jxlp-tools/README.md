# jxltools

jxlust 前端工具库

全局对象 JxlPTools

## esm use

```js
import { canvasMeetingInviteImage ,...} from '@jxlust/jxltools'
```

## umd use

script 引入 js 文件

```js
let options = {
  userName: 'x小李', //必填
  inviteTips: '邀请你一起开会', //不填为默认
  title: '收到发放三，打发撒是', //必填
  timeLabel: '时间', //不填为默认
  timeDate: '9月22日(星期四)', //必填
  timeRange: '10:00-12:00', //必填
  addressLabel: '地点', //不填为默认
  meetingRoom: '总部-创智天地大厦30楼1号会议室', //必填
  scanTips: '手机扫描二维码入会', //不填为默认
  fromTips: '来自丰声会议邀请', //不填为默认
  avatarUrl: 'http://127.0.0.1:5500/assets/img/avatar.png', //必填,头像url
  qrCodeUrl: 'http://127.0.0.1:5500/assets/img/qr-code.png', //必填,二维码url
  bgImgUrl: 'http://127.0.0.1:5500/assets/img/post-bg.png' //必填背景图片url
}
window.JxlPTools.canvasMeetingInviteImage(options).then((data) => {
  let imgDom = document.getElementById('my-img')
  imgDom.src = data
})
```
