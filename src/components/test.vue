<template>
  <div class="test">
    <div class="app" v-for="item in test">
      <ContextMenu v-on:ContextMenuClick="ContextMenuClick">
        <slot>
          <ul class="menu">
            <li>菜单1</li>
            <li>菜单2</li>
            <li>菜单3</li>
          </ul>
        </slot>
      </ContextMenu>
    </div>
    <div class="app">
      <ContextMenu v-on:ContextMenuClick="ContextMenuClick">
        <slot>
          <ul>
            <li>菜单4</li>
            <li>菜单5</li>
            <li>菜单6</li>
          </ul>
        </slot>
      </ContextMenu>
    </div>
  </div>
</template>

<script>
import ContextMenu from './menu'
export default {
  name: 'hello',
  data () {
    return {
      test:[1,2,3],
    }
  },
  methods: {
    ContextMenuClick(val){
      switch(val){
        case '菜单1':
        case '菜单2':
        case '菜单3':
        case '菜单4':
        case '菜单5':
        case '菜单6':
            alert(val);
            break;
      }
    }
  },
  components: {
    ContextMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .app{
    width: 200px;
    height: 200px;
    background-color: red;
    margin-right: 100px;
    display: inline-block;
    position: relative;
  }
  .app ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .menu{
    width: 100px;
  }
</style>
