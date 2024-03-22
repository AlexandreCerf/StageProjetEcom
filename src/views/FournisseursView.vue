<template>
    <div class="container">
      <h1>Page Fournisseur t'entends ?!</h1>
        <form @submit.prevent="submit">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Entrez un Fournisseur</label>
          <input v-model="fournisseur.name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">Entre le fournisseur ou conséquences.</div>
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
                <tr v-for="fournisseur in lstFournisseur">
                  <th scope="row">{{fournisseur.id}}</th>
                  <td>{{fournisseur.name}}</td>
                  <td><button type="button" class="btn btn-warning" @click="() => this.showEdit(fournisseur)"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></button></td>
                  <td><button type="button" class="btn btn-danger me-2" @click="() => this.delete(fournisseur.id)"><font-awesome-icon :icon="['fas', 'trash-can']" /></button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="edit">
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="editedFournisseur.name" aria-describedby="button-addon2" @keyup.enter="() => this.update()">
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
          lstFournisseur: [],
          fournisseur:{
            name: ""
          },
          editedFournisseur: {
            name: ""
          },
          edit: false
        }
      },
      mounted(){
        this.loadFournisseurs()
      },
      methods:{
        loadFournisseurs(){
          fetch("http://localhost:8080/fournisseurs", {
            method: "GET"
          }).then((res) => res.json()).then(json => {
            this.lstFournisseur = json
          })
        },
        submit(){
          fetch("http://localhost:8080/fournisseurs", {
            method: "POST",
            body: JSON.stringify(this.fournisseur),
            headers: {
              "Content-Type": "application/json"
            }
          }).then((res) => this.loadFournisseurs());
        },
        delete(id){
          console.log("YOLO")
          fetch(`http://localhost:8080/fournisseurs/${id}`,{
            method: "DELETE"
          }).then((res)=>{
            alert("Le fournisseur a bien été supprimé !")
            this.loadFournisseurs()
          })
        },
        showEdit(fournisseur){
          this.edit = !this.edit
          this.editedfournisseur = {...fournisseur}
        },
        update(){
          fetch(`http://localhost:8080/fournisseurs/${this.editedFournisseur.id}`,{
            method:"PUT",
            body: JSON.stringify(this.editedFournisseur),
            headers: {
              "Content-Type": "application/json"
            }
          }).then((res)=>{
            alert("Le fournisseur a bien été modifié !")
            this.loadFournisseurs()
            this.edit = false
          })
      }
    }
  }
  </script>
  