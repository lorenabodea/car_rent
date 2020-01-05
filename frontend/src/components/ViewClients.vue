<template>
  <div>
    <b-table striped hover :items="itemsOfArray" :fields="fields"
     @row-middle-clicked="myRowdblClickHandler" 
     @row-clicked="myRowClickHandler">
     </b-table>
  </div>
</template>

<script>
  export default {
         data() {
      return {
          fields: [
          {
            key: 'firstName',
            sortable: true
          },
          {
            key: 'lastName',
            sortable: true
          },
          {
            key: 'age',
            sortable: false
          },
           {
            key: 'email',
            sortable: false
          },
          {
            key: 'phone',
            sortable: false
          }
        ],
        itemsOfArray: []
      }
    },
      created() {
          this.axios.get('http://localhost:3000/clients').then(response => {
            for (var number in response.data) {
                if(response.data.hasOwnProperty(number)){
                    this.itemsOfArray.push(response.data[number])
                }
            }       
          })
      },

      methods: {
        myRowdblClickHandler: function (record) {
            this.axios.get('http://localhost:3000/clients').then(response => {
                for (var number in response.data) {
                    if(response.data[number].email == record.email){
                        this.axios.delete('http://localhost:3000/clients/' + number).then( () => {
                        location.reload();
                        })
                    }
                }             
            })
       },
       myRowClickHandler : function (record) {
            this.axios.get('http://localhost:3000/clients').then(response => {
                for (var number in response.data) {
                    if(response.data[number].email == record.email){
                       this.$router.replace({ name: "AddClient", params: {object: record, id: number} });
                    }
                }             
            })
           
       }
    }
  }
</script>