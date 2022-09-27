export const useTest = () => {
  const text = ref('');
  const updateText = () => {
    text.value = '123';
  };
  const loadText = () => {
    text.value = '333';
  };
  loadText();
  return {
    text,
    updateText,
  };
};
