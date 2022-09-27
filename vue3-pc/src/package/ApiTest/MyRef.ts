/*
 * @Descripttion:
 * @version:
 * @Author: jxlust jxljxufe@163.com
 * @Date: 2022-06-07 17:52:00
 * @LastEditors: jxlust
 * @LastEditTime: 2022-06-07 17:52:02
 */
export const MyRef = <T>(value: T) => {
  return customRef((trank, trigger) => {
    return {
      get() {
        trank();
        return value;
      },
      set(newVal: T) {
        console.log('set:');
        value = newVal;
        trigger();
      },
    };
  });
};

// function MyRef<T>(value: T): Ref {
//   return customRef((trank, trigger) => {
//     return {
//       get() {
//         trank();
//         return value;
//       },
//       set(newVal: T) {
//         console.log('set:');
//         value = newVal;
//         trigger();
//       },
//     };
//   });
// }
