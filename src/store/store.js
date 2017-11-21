import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
const store = {
    state:{
        menuShow:false,
        menuEvent:{},
        index:-1,
    },
    mutations:{
        toggleMenuShow(state,data){
            state.menuShow = data.status;
            state.menuEvent = data.event||{};
            state.index = typeof data.index ==='number'?data.index:-1
        }
    }
}
export default new vuex.Store(store)