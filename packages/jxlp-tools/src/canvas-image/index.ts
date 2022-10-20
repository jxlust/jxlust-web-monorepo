/* 圆角矩形
 * @param int/float x            矩形位置x坐标
 * @param int/float y            矩形位置y坐标
 * @param int/float w            矩形宽度
 * @param int/float h            矩形高度
 * @param int/float r            圆角半径
 * @param object <img>           矩形背景图
 */
export const drawRoundedImg = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  bgimg: any,
  r1: number,
  r2?: number,
  r3?: number,
  r4?: number
): void => {
  r2 = r2 === 0 ? 0 : r2 || r1
  r3 = r3 === 0 ? 0 : r3 || r1
  r4 = r4 === 0 ? 0 : r4 || r1
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(x + r1, y)
  ctx.arcTo(x + w, y, x + w, y + h, r2)
  ctx.arcTo(x + w, y + h, x, y + h, r3)
  ctx.arcTo(x, y + h, x, y, r4)
  ctx.arcTo(x, y, x + w, y, r1)
  ctx.clip() //必须在drawImage之前
  if (bgimg) {
    ctx.drawImage(bgimg, x, y, w, h)
  } else {
    ctx.fill() //ctx.stroke()
  }
  ctx.restore()
  ctx.closePath()
}

const imageLoad = (url: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    // crossorigin="anonymous"
    image.setAttribute('crossorigin', 'anonymous')
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject(new Error('load error'))
    }
  })
}
const allImagePreload = async (imgUrlLists: string[]) => {
  const result = []
  const promises = imgUrlLists.map((url) => imageLoad(url))

  for (const p of promises) {
    const r = await p
    result.push(r)
  }
  //   console.log(result);
  return result
}
interface InviteOptions {
  userName: string //用户名称
  inviteTips?: string //邀请提示，例如：邀请你一起开会
  title: string //标题
  timeLabel?: string //文案:时间标签
  timeDate: string //例如：9月22日(星期四)
  timeRange: string //例如：10:00-12:00
  addressLabel?: string //地点标签
  meetingRoom: string //会议室
  scanTips?: string //手机扫描二维码入会
  fromTips?: string //来自丰声会议邀请
  bgImgUrl: string
  qrCodeUrl: string
  avatarUrl: string
  size: number //几倍图
  imgUrlLists?: string[] //背景图url，二维码url,头像url
}
const CANVAS_WIDTH = 375
const CANVAS_HEIGHT = 600
const CONTENT_TOP = 200
const CONTENT_PADDING = 14

// const CanvasWidth = 1125;
// const CanvasHeight = 1800;
/**
 * 绘制图片
 */
export const canvasMeetingInviteImage: any = async (options: InviteOptions) => {
  const {
    userName,
    inviteTips = '邀请你一起开会a',
    title,
    timeLabel = '时间',
    timeDate,
    timeRange,
    addressLabel = '地点a',
    meetingRoom,
    scanTips = '手机扫描二维码入会',
    fromTips = '来自丰声会议邀请',
    // imgUrlLists,
    avatarUrl,
    qrCodeUrl,
    bgImgUrl,
    size = 1
  } = options
  const imgUrlLists = [bgImgUrl, qrCodeUrl, avatarUrl]
  const titleTips = title.length > 17 ? title.slice(0, 16) + '...' : title
  const [bgImage, qrcodeImage, avatarImage]: any = await allImagePreload(
    imgUrlLists
  )
  //   const myCavnas = document.getElementById('my-canvas') as HTMLCanvasElement;
  const canvas = document.createElement('canvas') as HTMLCanvasElement

  const canvasWidth = CANVAS_WIDTH * size
  const canvasHeight = CANVAS_HEIGHT * size
  canvas.width = canvasWidth
  canvas.height = canvasHeight

  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  context.rect(0, 0, canvas.width, canvas.height)
  context.fill()

  context?.drawImage(
    bgImage,
    0,
    0,
    canvasWidth,
    canvasHeight,
    0,
    0,
    canvasWidth,
    canvasHeight
  )

  //1125 * 1800

  const cPadding = CONTENT_PADDING * size
  const cTop = CONTENT_TOP * size
  context.shadowOffsetY = 8 * size //  阴影Y轴偏移
  context.shadowBlur = 16 * size // 模糊尺寸
  context.shadowColor = 'rgba(0, 0, 0, 0.2)' // 颜色
  context.fillStyle = '#F4F6FA'
  drawRoundedImg(
    context,
    cPadding,
    cTop,
    canvasWidth - cPadding * 2,
    78 * size,
    null,
    10 * size,
    10 * size,
    0,
    0
  )
  context.fillStyle = '#fff'
  drawRoundedImg(
    context,
    cPadding,
    cTop + 78 * size,
    canvasWidth - cPadding * 2,
    288 * size,
    null,
    0,
    0,
    10 * size,
    10 * size
  )

  context.shadowColor = 'rgba(0, 0, 0, 0)' //取消阴影

  drawRoundedImg(
    context,
    38 * size,
    211 * size,
    56 * size,
    56 * size,
    avatarImage,
    cPadding * 2
  )

  const fontsize14 = 14 * size
  const fontsize16 = 16 * size
  const fontsize12 = 12 * size
  const fontsize18 = 18 * size

  context.fillStyle = '#020F22'
  context.font = `${fontsize16}px PingFangSC-Regular`
  context.fillText(userName, 104 * size, 216 * size + fontsize16)

  context.fillStyle = '#6A737F'
  context.font = `${fontsize16}px Georgia`

  context.fillText(inviteTips, 104 * size, 242 * size + fontsize16)

  context.fillStyle = '#020F22'
  context.font = `${fontsize18}px PingFangSC-Regular`
  context.fillText(titleTips, 38 * size, 298 * size + fontsize18)

  context.fillStyle = '#A4ABB0'
  context.font = `${fontsize12}px Georgia`
  //时间
  context.fillText(timeLabel, 38 * size, 340 * size + fontsize12)

  context.fillStyle = '#020F22'
  context.font = `${fontsize14}px PingFangSC-Regular`

  context.fillText(timeDate, 38 * size, 363 * size + fontsize14)
  context.fillText(timeRange, 38 * size, 387 * size + fontsize14)

  context.fillStyle = '#A4ABB0'
  context.font = `${fontsize12}px Georgia`
  //   //地点
  context.fillText(addressLabel, 38 * size, 427 * size + fontsize12)

  context.fillStyle = '#020F22'
  context.font = `${fontsize14}px PingFangSC-Regular`

  const lines = meetingRoom.length / 9
  for (let index = 0; index < lines; index++) {
    //自动换行
    context.fillText(
      meetingRoom.slice(index * 9, (index + 1) * 9),
      38 * size,
      451 * size + fontsize14 + index * size * 20
    )
  }

  context.fillStyle = '#A4ABB0'
  context.font = `${fontsize12}px PingFangSC-Regular`
  //手机扫描二维码入会
  context.fillText(scanTips, 220 * size, 474 * size + fontsize12)

  context.fillStyle = '#BBCCE3'
  context.font = `${fontsize12}px PingFangSC-Regular`
  //来自丰声会议邀请
  context.fillText(fromTips, 132 * size, 574 * size + fontsize12)

  context.drawImage(
    qrcodeImage,
    25,
    25,
    250,
    250,
    211 * size,
    340 * size,
    126 * size,
    126 * size
  )

  const base64 = canvas.toDataURL('image/png')
  //   const myImageDom = document.getElementById('my-img') as HTMLImageElement;
  //   myImageDom.src = base64;
  //   console.log(11, canvas?.toDataURL());
  return base64
}
