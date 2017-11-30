<template>
  <div class="test">
    <div class="app" v-for="item in test">
      <ContextMenu :menu="menu" v-on:change="menuChange" />
    </div>
    <div class="app">
      <ContextMenu :menu="menu" v-on:change="menuChange" />
    </div>
  </div>
</template>

<script>
import ContextMenu from "./menu";
export default {
  name: "hello",
  data() {
    return {
      test: [1, 2, 3],
      menu: ["menu1", "menu2", "menu3", "menu4", "menu5"]
    };
  },
  methods: {
    menuChange(val) {
      alert(val);
    }
  },
  components: {
    ContextMenu
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.app {
  width: 200px;
  height: 200px;
  background-color: red;
  margin-right: 100px;
  display: inline-block;
  position: relative;
}
</style>
