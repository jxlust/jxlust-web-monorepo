import { KeepAlive, Transition } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
export default defineComponent({
  name: 'App',
  setup() {
    // keep alive cached views
    const cachedViews: string[] = ["Test"];
    
    //slots 默认 {default: () => {}}
    let routerSlots = ({ Component, route }) => {
      return <Transition name={route?.meta?.transition || 'van-fade'}>
        <KeepAlive include={cachedViews} max={5}>
          <Component />
        </KeepAlive>
      </Transition>
    }
    
    const initAppData = () => { };
    onMounted(() => { });
    initAppData();

    return () => (
      <>
        <RouterView>
          {routerSlots}
        </RouterView >
        <RouterLink to={'/test'} >test</RouterLink>
        <RouterLink to={'/home'} >home</RouterLink>
      </>
    )
  }
})