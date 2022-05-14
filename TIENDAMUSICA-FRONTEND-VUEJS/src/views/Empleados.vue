<template>
<div>
    <div>
        <div class="row p-3">
            <div class="col-sm-3 ">
                <select  id="inputState" class="form-control" v-model="filtroCiudad">
                    <option v-for="(ciudad,indx) in ciudades" :key="indx">{{ciudad}}</option>
                </select>
            </div>
            <div class="col-sm-3 ">
                   <input type="text" placeholder="Nombre" class="form-control" v-model="filtroNombre">
            </div>
            <div class="col-sm-3 ">
                <button class="btn btn-outline-danger btn-block" @click="resetFiltro">Elimnar Filtros</button>
            </div>
            <div class="col-sm-3 ">
            <button type="button" class="btn btn-outline-primary btn-block" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Nuevo Empleado
            </button>
        </div>
        </div>
    </div>

    <EmpleadosTable @toUpdate="update" :filtroB="filtroNombre.toLowerCase()"/>

    <div>
        <div class="modal fade" id="staticBackdrop" ref="modal" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Empleados</h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div v-if="camposVacios" class="alert alert-warning" role="alert">
                            Por favor llenar todos los campos.
                        </div>
                        <div v-if="errorAlpha" class="alert alert-warning" role="alert">
                            Solo se permiten caracteres alfabeticos.
                        </div>
                        <div class="form-group col-md-4">
                            <select :disabled="toUpdate" id="inputState" class="form-control" ref="inpCity" v-model="City">
                                <option v-for="(ciudad,indx) in ciudades" :key="indx">{{ciudad}}</option>
                            </select>
                        </div>
                        <div class="form-group row ml-1 mr-1">
                            <label>Nombre:</label>
                            <div class="col-sm-8">
                                <input :disabled="toUpdate" type="text" maxlength="15"
                                        @keypress="checkAlpha($event)"
                                        v-model="FirstName" class="form-control"
                                        ref="inpNombre"
                                        id="Nombre" placeholder="Nombre">
                            </div>
                        </div>
                        <div class="form-group row ml-1 mr-1">
                            <label>Apellidos:</label>
                            <div class="col-sm-8">
                                <input :disabled="toUpdate" type="text" maxlength="15"
                                        @keypress="checkAlpha($event)"
                                        class="form-control" id="Apellidos"
                                        ref="inpApellidos"
                                        placeholder="Apellidos" v-model="LastName">
                            </div>
                        </div>
                        <div class="form-group row ml-1 mr-1">
                            <label>Titulo:</label>
                            <div class="col-sm-8">
                                <input :disabled="toUpdate" type="text" maxlength="15"
                                        @keypress="checkAlpha($event)"
                                        class="form-control" id="Titulo"
                                        ref="inpTitulo"
                                        placeholder="Titulo" v-model="Title">
                            </div>
                        </div>
                        <div class="form-group row ml-1 mr-1">
                            <div v-if="noMayor" class="alert alert-warning" role="alert">
                                El nuevo empleado debe ser mayor de edad.
                            </div>
                            <label>Fecha de Nacimiento:</label>
                            <div class="col-sm-6">
                                <input :disabled="toUpdate" type="date" class="form-control"
                                ref="inpFNacimiento" v-model="BirthDate">
                            </div>
                        </div>
                        <div class="form-group row ml-1 mr-1">
                            <label>Fecha de contratacion:</label>
                            <div class="col-sm-6">
                                <input :disabled="toUpdate" type="date" class="form-control"
                                ref="inpFContratacion" v-model="HireDate">
                            </div>
                        </div>
                        <div class="form-group row ml-1 mr-1">
                            <label>Direccion</label>
                            <div class="col-sm-8">
                                <input type="text" maxlength="50"
                                @keypress="checkAlpha($event)"
                                        class="form-control" id="Direccion"
                                        ref="inpDireccion"
                                        placeholder="Direccion" v-model="Address">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                    @click="guardar">Guardar</button>
                    <button type="button" class="btn btn-primary"
                    data-bs-dismiss="modal" @click="clean">Salir</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import EmpleadosTable from "../components/EmpleadosTable";
export default {
    name: "Empleados",
    data() {
        return {
            EmployeeId: '',
            FirstName: '',
            LastName: '',
            Title: '',
            BirthDate: '',
            HireDate: '',
            Address: '',
            City: '',
            noMayor: false,
            camposVacios: false,
            toUpdate: false,
            filtroCiudad:'',
            filtroNombre:'',
            errorAlpha: false,
        }
    },
    components: {
        EmpleadosTable,
    },
    methods: {
        clean(){
            Object.assign(this.$data,this.$options.data())
        },
        resetFiltro(){
            this.filtroCiudad = '';
            this.filtroNombre = '';
        },
        update(empleado){
            this.toUpdate = true;
            this.EmployeeId = empleado.EmployeeId;
            console.log(this.EmployeeId, empleado.EmployeeId, 'EMPLOYEE')
            this.FirstName = empleado.FirstName;
            this.LastName = empleado.LastName;
            this.Title = empleado.Title;
            this.BirthDate = empleado.BirthDate.slice(0,10);
            this.HireDate = empleado.HireDate.slice(0,10);
            this.Address = empleado.Address;
            this.City = empleado.City;
        },
        guardar(){
            if(this.checaCamposVacio()){
                this.camposVacios = true;
                setTimeout(() => {
                    this.camposVacios = false;
                }, 7000)
            }else {
                var empleado = {
                    EmployeeId: this.EmployeeId,
                    FirstName: this.FirstName,
                    LastName: this.LastName,
                    Title: this.Title,
                    BirthDate: new Date(this.BirthDate).toISOString(),
                    HireDate:  new Date(this.HireDate).toISOString(),
                    Address: this.Address,
                    City: this.City
                }
                if(this.toUpdate){
                    this.$store.dispatch('updateEmpleado', empleado).then(() => this.$router.go());
                }else {
                    this.$store.dispatch('insertEmpleado', empleado).then(() => this.$router.go());
                }
                this.clean();
            }
        },
        checaCamposVacio(){
            if(!this.City){
                this.$refs.inpCity.focus();
                return true;
            }else if(!this.FirstName){
                this.$refs.inpNombre.focus();
                return true;
            }else if(!this.LastName){
                this.$refs.inpApellidos.focus();
                return true;
            }else if(!this.Title){
                this.$refs.inpTitulo.focus();
                return true;
            }else if(!this.BirthDate){
                this.$refs.inpFNacimiento.focus();
                return true;
            }else if(!this.HireDate){
                this.$refs.inpFContratacion.focus();
                return true;
            }else if(!this.Address){
                this.$refs.inpDireccion.focus();
                return true;
            }else {
                return  false;
            }
        },
        checkNumber(evt){
            if ((evt.keyCode > 31 && (evt.keyCode < 48 || evt.keyCode > 57)) && evt.keyCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        checkAlpha(evt) {
            console.log(evt.keyCode)
            if (!(evt.keyCode >= 65 && evt.keyCode <= 90 ||
                evt.keyCode >= 97 && evt.keyCode <= 122 ||
                evt.keyCode === 32)) {
            evt.preventDefault()
            if(!this.errorAlpha){
                this.errorAlpha = true;
                    setTimeout(()=>{
                        this.errorAlpha = false;
                    },5000);
                }
            }
        },
    },
    watch: {
        birthDate(val){
            var date = new Date(val);
            var date2 = new Date(date.getFullYear() + 18, date.getMonth(),date.getDate());
            if(date2 <= new Date()){
                this.noMayor = false
            }else{
                this.fechaNacimiento='',
                this.noMayor = true;
                setTimeout(()=>{
                    this.noMayor=false;
                },2000)
            }
        }
    },
    computed: {
        ciudades(){
            return this.$store.getters.getCiudades;
        }
    },
}
</script>

<style scoped>
div, table, template {
  overflow: hidden; /* Hide scrollbars */
}
</style>
