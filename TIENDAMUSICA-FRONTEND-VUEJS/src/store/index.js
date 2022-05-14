import Vue from 'vue';
import Vuex from 'vuex';
import Empleados from "./Modules/Empleados";

Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        ciudades: ['Culiacan','Mazatlan'],
    },
    mutations:{
    },
    actions:{
    },
    getters:{
        getCiudades(state){
            return state.ciudades;
        }
    },
    modules:{
        Empleados,
    }
})