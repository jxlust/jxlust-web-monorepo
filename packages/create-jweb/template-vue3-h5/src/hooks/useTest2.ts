const data = ref("99");
const array: number[] = reactive([]);

let rawData = 100;
const updateData = (v) => {
  data.value = v;
  rawData = 300;
};
const loadData = () => {
  array.push(1);
};
export { data, array, updateData, loadData, rawData };
