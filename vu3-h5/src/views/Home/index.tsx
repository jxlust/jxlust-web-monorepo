/**
 * tsx  demo
 */
import { defineComponent, onMounted, onUnmounted } from "vue";
import "./index.scss";

export default defineComponent({
  name: "Home",
  props: {},
  setup() {
    const contentText = "H5 Home Page";
    onMounted(() => {});
    onUnmounted(() => {});
    const messageDom = () => {
      return <h2>{contentText}</h2>;
    };

    return () => <div class="welcome-pager">{messageDom()}</div>;
  },
});
