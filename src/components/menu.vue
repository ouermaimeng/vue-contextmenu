<template>
  <div id="context-menu" v-if="show" :style="{top:y,left:x}">
      <ul>
          <li :class="{active:item===activeMenu}" v-for="item in menu" @click="changActiveMenu(item)">{{item}}</li>
      </ul>
  </div>
</template>
<script>
export default {
  /* 
        change 菜单选中项变化的事件 返回选中的某一项
        menu: 菜单的数组
     */
  props: {
    menu: {
      require: true,
      type: Array
    }
  },
  data() {
    return {
      activeMenu: "",
      parentNode: null,
      show: false,
      x: 0,
      y: 0
    };
  },
  methods: {
    initEvent() {
      window.addEventListener("contextmenu", e => {
        // 点击的元素是否在当前组件对应的dom中
        const isCurrentEl = !!this.closest(e.target, this.$el),
          isInsideParentNode = !!this.closest(e.target, this.parentNode);
        if (isInsideParentNode || isCurrentEl) {
          e.preventDefault();
          this.show = true;
          // 如果点击的是父元素 调整位置
          if (!isCurrentEl) {
            this.x = e.clientX - this.parentNode.getBoundingClientRect().left + "px";
            this.y = e.clientY - this.parentNode.getBoundingClientRect().top + "px";
          }
        } else {
          this.show = false;
        }
      });
      window.addEventListener("click", e => {
        // event.stopPropagation();
        // 点击的元素是否在当前组件对应的dom中
        const isCurrentEl = !!this.closest(e.target, this.$el);
        if (!isCurrentEl) {
          this.show = false;
        } else if (this.show) {
          this.$emit("change", e.target.textContent);
        }
      });
    },
    changActiveMenu(item) {
      this.activeMenu = item;
    },
    closest(el, $el) {
      while (el) {
        if (el === $el) {
          return el;
        } else {
          el = el.parentNode;
        }
      }
      return null;
    }
  },
  mounted() {
    this.initEvent();
    this.parentNode = this.$el.parentNode;
  }
};
</script>
<style lang="scss">
#context-menu {
  background-color: #f6f6f6;
  box-shadow: 0 0 2px 2px #ccc;
  position: absolute;
  ul {
    list-style: none;
    padding: 0;
    li {
      cursor: pointer;
      width: 120px;
      padding: 8px 0;
      padding-left: 20px;
    }
  }
  .active {
    color: white;
    background-color: #5bcd9a;
  }
}
</style>
