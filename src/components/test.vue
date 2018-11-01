<template>
  <div class="test" style="height:100%;width:100%;">
    <div class="app" v-context-menu:menu @customContextMenu="customContextMenu($event,'自定义的参数')" @preRender="preRender" v-for="item in test" :key="item">
    </div>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      test: new Array(50),
      menu: [
        { name: "menu1" },
        { name: "menu2", disabled: true },
        { name: "menu3" },
        { name: "menu4" },
        { name: "menu5" }
      ]
    };
  },
  methods: {
    customContextMenu(e, param) {
      alert(JSON.stringify(e.detail.data.currentMenu) + param);
    },
    preRender() {
      console.log("渲染之前触发")
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.app {
  width: 200px;
  height: 200px;
  background-color: #ccc;
  margin-right: 100px;
  display: inline-block;
  position: relative;
}
.right-menu {
  padding: 10px 0;
  list-style: none;
  background-color: #f6f6f6;
  font-size: 13px;
  z-index: 8000;
}
.menu-item-disabled {
  color: #c0c4cc;
}
li {
  cursor: pointer;
  padding: 5px 20px;
  color: #5d6d7e;
}
li:not(.menu-item-disabled):hover {
  background-color: #32c081;
  color: white;
}
</style>
