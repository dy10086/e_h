import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        shopData:null,
        // 是否修改商铺
        isUpShop:false
    },
    mutations: {
        shopData(state,newData){
            state.shopData = newData  
        },
        isUpShop(state,isTrue){
            state.isUpShop = isTrue
        }
    }
})

export default store