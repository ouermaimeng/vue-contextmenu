<template>
  <div>
    <div class="app" v-for="(item,index) in test" @contextmenu.prevent.self="showMnue(index)">
      <Mune :idx = "index">
        <slot>
          <ul>
            <li @click.stop="a()">fdsaf</li>
            <li @click.stop="a()">fdsafds</li>
            <li @click.stop="a()">fdsafs</li>
          </ul>
        </slot>
      </Mune>
    </div>
  </div>
</template>

<script>
import Mune from './mune'
export default {
  name: 'hello',
  data () {
    return {
      test:[1,2,3],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    showMnue (index) {
      let data = {
        status:true,
        index,
        event
      }
      this.$store.commit('toggleMenuShow',data)
    },
    a(){
      alert('来自父组件的问候')
    }
  },
  components: {
    Mune
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app{
    width: 200px;
    height: 200px;
    background-color: red;
    margin-right: 100px;
    display: inline-block;
    position: relative;
  }
</style>
