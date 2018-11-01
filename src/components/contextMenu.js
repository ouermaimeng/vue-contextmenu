import Vue from "vue";

/**
 * 右键事件
 */
const event = new CustomEvent("customContextMenu", {
  detail: {
    params: null
  }
});
/**
 * 渲染菜单之前触发的事件
 */
const preRender = new CustomEvent("preRender",{
  detail:{
    item:null
  }
})
window.currentElement = null;
const closest = element => {
  while (element) {
    if (element === currentElement) {
      return element;
    } else {
      element = element.parentNode;
    }
  }
  return null;
};
window.addEventListener("click", e => {
  if (!closest(e.target) && currentElement) {
    currentElement.parentNode.removeChild(currentElement);
    currentElement = null;
  }
});

Vue.directive("context-menu", {
  bind(el, binding, vnode) {
    el.addEventListener("contextmenu", e => {
      e.preventDefault();
      const menu = vnode.context[binding.arg];
      const isArrObj = menu.some(ele => typeof ele == "object");
      const htmlStr = menu.reduce((pre, cur) => {
        const disabled = isArrObj ? cur.disabled : false;
        const menuItemData = isArrObj ? JSON.stringify(cur) : cur;
        pre += `<li data-menu-item=${menuItemData} class=${
          disabled ? "menu-item-disabled" : ""
        }>${isArrObj ? cur.name : cur}</li>`;
        return pre;
      }, "");
      const ulElement = document.createElement("ul");
      ulElement.innerHTML = `${htmlStr}`;
      ulElement.className = "right-menu";
      ulElement.style.position = "absolute";
      el.dispatchEvent(preRender)
      document.body.appendChild(ulElement);
      const ulStyle = ulElement.getBoundingClientRect();
      const windowHeight = document.body.clientHeight;
      const windowWidth = document.body.clientWidth;
      // 如果剩余高度不高展示菜单
      if (windowHeight - e.pageY < ulStyle.height) {
        ulElement.style.top = `${windowHeight - ulStyle.height}px`;
      } else {
        ulElement.style.top = `${e.pageY}px`;
      }
      // 如果宽度不够展示菜单
      if (windowWidth - e.pageX < ulStyle.width) {
        ulElement.style.left = `${windowWidth - ulStyle.width}px`;
      } else {
        ulElement.style.left = `${e.pageX}px`;
      }
      ulElement.addEventListener("click", e => {
        if (e.target.nodeName.toUpperCase() == "LI") {
          const dataSet = e.target.getAttribute("data-menu-item"),
            menuData = isArrObj ? JSON.parse(dataSet) : dataSet;
          //如果为禁用按钮 则不触发任何事件
          if (isArrObj && menuData.disabled) return;
          ulElement.parentNode.removeChild(ulElement);
          currentElement = null;
          event.detail.data = {
            currentMenu: menuData
          };
          el.dispatchEvent(event);
        }
      });
      currentElement && currentElement.parentNode.removeChild(currentElement);
      currentElement = ulElement;
    });
  }
});
