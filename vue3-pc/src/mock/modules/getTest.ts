import Mock from 'mockjs';

const mockData = Mock.mock({
  'list|10': [
    {
      'id|+1': 1000, //id ++
      name: '@cname', //随机中文名字
    },
  ],
});
console.log('mockData:', mockData);
const getTest = {
  url: '/test/getData',
  methods: 'get',
  template: (config) => {
    console.log('getData config:', config);
    return {
      code: 200,
      msg: 'success',
      data: mockData.list,
    };
  },
};

export default [getTest];

// const test = {
//   'list|10': [
//     {
//       "id|+1": 1000, //id ++
//       name: '@cname', //随机中文名
//       'age|1-200': 1, //生成1-200的随机数
//       'price|200-500.2-5': 1, //生成小数
//       'star|1-5': '★',
//       'chart|2': '我爱我的祖国',
//       'love|1': true, //随机布尔值
//       'girl|2': ['小红', '小张', '小白'], //随机数组（1随机1个，2复制2分）
//       wife: { 'h|190': 1, w: 45, 'weight|85-130': 1, 'money|1000-9999': 1 }, //对象
//       aprice: function () {
//         return this.price + this.name;
//       }, //函数
//       tel: /1\d{10}/,
//       pic: function () {
//         return Mock.Random.dataImage('200x100', this.nama);
//       },
//       date: "@date('yyy/MM/dd')",
//       time: Mock.Random.time(),
//       pdate: '@datetime()',
//       now: '@now()',
//       des: '@cparagraph(1,3)',
//       keyword: '@cword(3,5)',
//       title: '@ctitle(5,12)',
//     },
//   ],
// };
