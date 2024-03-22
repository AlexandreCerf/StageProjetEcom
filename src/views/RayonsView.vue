<template>
  <div class="container">
    <h1>Page Rayon t'entends ?!</h1>
      <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Entrez un Rayon</label>
        <input v-model="rayon.name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">Entre le rayon ou conséquences.</div>
      </div>

      <div class="d-flex">
        <div class="flex-grow-1">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Libellé</th>
                <th scope="col">Edition</th>
                <th scope="col">Suppression</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rayon in lstRayon">
                <th scope="row">{{rayon.id}}</th>
                <td>{{rayon.name}}</td>
                <td><button type="button" class="btn btn-warning" @click="() => this.showEdit(rayon)"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></button></td>
                <td><button type="button" class="btn btn-danger me-2" @click="() => this.delete(rayon.id)"><font-awesome-icon :icon="['fas', 'trash-can']" /></button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="edit">
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="editedRayon.name" aria-describedby="button-addon2" @keyup.enter="() => this.update()">
            <button class="btn btn-secondary" type="button" id="button-addon2" @click="() => this.update()">Modifier</button>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lstRayon: [],
        rayon:{
          name: ""
        },
        editedRayon: {
          name: ""
        },
        edit: false
      }
    },
    mounted(){
      this.loadRayons()
    },
    methods:{
      loadRayons(){
        fetch("http://localhost:8080/rayons", {
          method: "GET"
        }).then((res) => res.json()).then(json => {
          this.lstRayon = json
        })
      },
      submit(){
        fetch("http://localhost:8080/rayons", {
          method: "POST",
          body: JSON.stringify(this.rayon),
          headers: {
            "Content-Type": "application/json"
          }
        }).then((res) => this.loadRayons());
      },
      delete(id){
        console.log("YOLO")
        fetch(`http://localhost:8080/rayons/${id}`,{
          method: "DELETE"
        }).then((res)=>{
          alert("Le rayon a bien été supprimé !")
          this.loadRayons()
        })
      },
      showEdit(rayon){
        this.edit = !this.edit
        this.editedRayon = {...rayon}
      },
      update(){
        fetch(`http://localhost:8080/rayons/${this.editedRayon.id}`,{
          method:"PUT",
          body: JSON.stringify(this.editedRayon),
          headers: {
            "Content-Type": "application/json"
          }
        }).then((res)=>{
          alert("Le rayon a bien été modifié !")
          this.loadRayons()
          this.edit = false
        })
    }
  }
}
</script>
