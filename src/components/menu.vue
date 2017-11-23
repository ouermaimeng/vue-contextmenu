<template>
  <div id="context-menu" v-if="show" :style="{top:y,left:x}">
      <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["ContextMenuClick"],
  data() {
    return {
      parentNode: null,
      show: false,
      x: 0,
      y: 0
    };
  },
  methods: {
    initEvent() {
      window.addEventListener("contextmenu", e => {
        e.preventDefault();
        // 点击的元素是否在当前组件对应的dom中
        const isCurrentEl = !!this.closest(e.target, this.$el);
        if (e.target === this.parentNode || isCurrentEl) {
          this.show = true;
          // 如果点击的是父元素 调整位置
          if (!isCurrentEl) {
            this.x = e.offsetX + "px";
            this.y = e.offsetY + "px";
          }
        } else {
          this.show = false;
        }
      });
      window.addEventListener("click", e => {
        event.stopPropagation();
        // 点击的元素是否在当前组件对应的dom中
        const isCurrentEl = !!this.closest(e.target, this.$el);
        if (!isCurrentEl) {
          this.show = false;
        } else if (this.show) {
          this.$emit("ContextMenuClick", e.target.textContent);
        }
      });
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
<style>
#context-menu {
  box-shadow: 0 0 2px 2px #ccc;
  position: absolute;
}
</style>
