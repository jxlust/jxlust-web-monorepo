export default defineComponent({
  name: "Test",
  emits: ["update:modelValue"],
  setup(_, { emit }) {
    const inputRef = ref<HTMLInputElement>();
    const updateValue = (value: string) => {
      if (inputRef.value && inputRef.value.value !== value) {
        inputRef.value.value = value;
      }

      emit("update:modelValue", value);
    };
    const onInput = (event: Event) => {
      if (!event.target!.composing) {
        updateValue((event.target as HTMLInputElement).value);
      }
    };
    return () => (
      <div>
        <input type="text" ref={inputRef} onInput={onInput} />
      </div>
    );
  },
});
