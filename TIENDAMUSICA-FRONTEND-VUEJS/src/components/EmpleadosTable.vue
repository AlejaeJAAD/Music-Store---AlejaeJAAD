<template>
    <div class="container-fluid">
        <div v-if="!eliminado" class="alert alert-danger" role=alert>
            No se pudo eliminar
        </div>
        <table class="table table-bordered rounded" style="table-layout: fixed;
    width: 100%;  ">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">
                    <span class="pl-2 pr-2">Nombre</span>
                    <span class="pl-2 pr-2">Apellidos</span></th>
                <th scope="col">Titulo</th>
                <th scope="col">Fecha de nacimiento</th>
                <th scope="col">Fecha de contratacion</th>
                <th scope="col">Direccion</th>
                <th scope="col">Modificar</th>
                <th scope="col">Eliminar</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(empleado, index) in empleados.data" :key="index">
                <th scope="row">{{empleado.EmployeeId}}</th>
                <td>
                    <span class="pl-2 pr-2">{{empleado.FirstName}}</span>
                    <span class="pl-2 pr-2">{{empleado.LastName}}</span>
                </td>
                <td>{{empleado.Title}}</td>
                <td>{{empleado.BirthDate}}</td>
                <td>{{empleado.HireDate}}</td>
                <td>{{empleado.Address}}</td>
                <td>
                    <button type="button" class="btn btn-outline-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            @click="$emit('toUpdate',empleado)"
                    >
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </td>

                <td>
                    <button type="button" class="btn btn-outline-danger" @click="idAEliminar=empleado.EmployeeId" data-bs-toggle="modal" data-bs-target="#modal2">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
                <!-- Modal -->
                <div class="modal fase" id="modal2" tabindex="-1" aria.labelledby="ModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabel">Eliminar</h5>
                            </div>
                            <div class="modal-body">
                                Desea eliminar al empleado con nombre
                                <p class="fw-bold">
                                    <span class="pl-2 pr-2 fw-bold">{{empleado.FirstName}} {{empleado.LastName}}</span>
                                </p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="eliminar()" >Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </tr>    
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    prop:['filtroB'],
    name: "EmpleadosTable",
    data() {
        return {
            idAEliminar: '',
            eliminado: true,
        }
    },
    methods: {
        eliminar(){
            this.$store.dispatch('deleteEmpleado', this.idAEliminar).then((res) => {
                this.eliminado = res;
                console.log(this.eliminado, 'ELIMINADO');
                setTimeout(() => {
                    this.eliminado = true;
                }, 5000)
                if(res) {
                    this.$router.go();
                }
            })
        }
    },
    computed: {
        empleados(){
            var empleados = this.$store.getters.getEmpleados;
            console.log(empleados, 'LALAL')
            if(this.filtroB) {
                empleados = empleados.filter((el) => {
                    var nombre = `${el.nombre} ${el.firstName} ${el.lastName}`.toLowerCase();
                    return nombre.includes(this.filtroB);
                })
            }
            return empleados;
        }
    },
    created() {
        this.$store.dispatch('fetchEmpleados');
    }
}
</script>

<style scoped>
div, table, template {
  overflow: hidden; /* Hide scrollbars */
}
th,td {
    border-style: solid;
    border-width: 5px;
    border-color: #BCBCBC;
    word-wrap: break-word;
}
</style>