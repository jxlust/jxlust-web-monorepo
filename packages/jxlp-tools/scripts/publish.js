const path = require('path')
const shelljs = require('shelljs')
const program = require('commander')
// console.log(process.execPath);//返回启动 Node.js 进程的可执行文件的绝对路径名
// console.log(__dirname);//是被执行的js文件的地址
// console.log(process.cwd());//是当前执行node命令的目录地址
const targetFile = path.resolve(__dirname, '../lib/package.json')
const originFile = path.resolve(__dirname, '../package.json')
const targetDir = path.resolve(__dirname, '../lib/')
// console.log(1, __dirname, targetFile)
const packagejson = require(originFile)
const currentVersion = packagejson.version
const versionArr = currentVersion.split('.')
const [mainVersion, subVersion, phaseVersion] = versionArr

// 默认版本号
const defaultVersion = `${mainVersion}.${subVersion}.${+phaseVersion + 1}`

let newVersion = defaultVersion

// 从命令行参数中取版本号
program.option(
  '-v, --versions <type>',
  'Add release version number',
  defaultVersion
)

program.parse(process.argv)

if (program.versions) {
  newVersion = program.versions
}

function publish() {
  //修改package.json文件name, 包名修改为@jxlust/jxltools
  shelljs.sed(
    '-i',
    '"name": "jxltools"',
    '"name": "@jxlust/jxltools"',
    targetFile
  )
  // /"scripts":\{.*\"\}/
  shelljs.sed('-i', /"publish": "node scripts\/publish.js",/, '', targetFile)
  //修改版本号
  shelljs.sed(
    '-i',
    `"version": "${currentVersion}"`,
    `"version": "${newVersion}"`,
    targetFile
  ) // 修改版本号

  shelljs.sed(
    '-i',
    `"version": "${currentVersion}"`,
    `"version": "${newVersion}"`,
    originFile
  ) // 修改版本号
  // shelljs.cd(targetDir)
  // console.log('current dir:', process.cwd())
  // shelljs.exec('npm publish --access public') // 发布
}
//@jxlust/jxltools 私密包默认要收费 ,可以添加 npm publish --access public 发布

publish()
