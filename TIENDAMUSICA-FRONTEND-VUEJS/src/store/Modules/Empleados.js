import Axios from 'axios';
Axios.defaults.baseUrl = 'http://localhost:3000/'
const state = {
    empleados: [],
};

const mutations = {
    setEmpleados(state, empleados){
        state.empleados = empleados
    }
};
const actions = {
    fetchEmpleados(context){
        Axios.get('/api/employee').then((res)=>{
            context.commit('setEmpleados',res.data)
        })
    },
    insertEmpleado(context,nuevoEmpleado){
        Axios.post('/api/employee',nuevoEmpleado).then(()=>{
            context.dispatch('fetchEmpleados');
        })
    },
    deleteEmpleado(context,id){
        return new Promise((resolve)=>{
            Axios.delete(`/api/employee/${id}`).then((res)=> resolve(res.data));

        })
    },
    updateEmpleado(context,empleado){
        Axios.put(`/api/employee/${empleado.EmployeeId}`,empleado).then(()=>{
            context.dispatch('fetchEmpleados');
        })
    }
};
const getters = {
    getEmpleados(){
        return state.empleados;
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
};
