<template>
  <div id="menu" v-if="show&&idx==index" v-bind:style="position">
      <slot></slot>
  </div>
</template>
<script>
export default {
  props:['idx'],
  methods:{
  },
  computed: {
    show () {
          return this.$store.state.menuShow;
      },
    position(){
        let currentEvent = this.$store.state.menuEvent;
        return {
            left:currentEvent.offsetX+'px',
            top:currentEvent.offsetY+'px',
        }
    },
    index(){
        console.log(this.$store.state.index)
        return this.$store.state.index;
    }
  }
}
</script>
<style>
    #menu{
        width: 50px;
        height: 50px;
        background-color: black;
        position: absolute;
    }
</style>
