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
            key: 'brand',
            sortable: true
          },
          {
            key: 'cp',
            sortable: false
          },
          {
            key: 'insuranceAmount',
            sortable: true
          },
           {
            key: 'costPerDay',
            sortable: true
          },
          {
            key: 'manufactureYear',
            sortable: true
          },
        ],
        itemsOfArray: []
      }
    },
      created() {
          this.axios.get('http://localhost:3000/cars').then(response => {
            for (var number in response.data) {
                if(response.data.hasOwnProperty(number)){
                    this.itemsOfArray.push(response.data[number])
                }
            }       
          })
      },

      methods: {
        myRowdblClickHandler: function (record) {
            this.axios.get('http://localhost:3000/cars').then(response => {
                for (var number in response.data) {
                    if(response.data[number].vin == record.vin){
                        this.axios.delete('http://localhost:3000/cars/' + number).then( () => {
                        location.reload();
                        })
                    }
                }             
            })
       },
       myRowClickHandler : function (record) {
            this.axios.get('http://localhost:3000/cars').then(response => {
                for (var number in response.data) {
                    if(response.data[number].email == record.email){
                       this.$router.replace({ name: "AddCar", params: {object: record, id: number} });
                    }
                }             
            })
           
       }
    }
  }
</script>