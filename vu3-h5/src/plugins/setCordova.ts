export const setCordova = () => {
  const externalScript = document.createElement("script");
  externalScript.setAttribute("src", "cordova.js");
  document.head.appendChild(externalScript);
};
