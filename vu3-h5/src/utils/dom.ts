export const ipadAddClass = () => {
  if (window.navigator.userAgent.indexOf("iPad") !== -1) {
    document.getElementsByTagName("html")[0].classList.add("iPad");
  }
};
