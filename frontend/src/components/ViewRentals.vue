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
            key: 'carKey',
            sortable: true
          },
          {
            key: 'clientKey',
            sortable: true
          },
          {
            key: 'price',
            sortable: true
          },
           {
            key: 'numberOfDays',
            sortable: true
          }
        ],
        itemsOfArray: []
      }
    },
      created() {
          this.axios.get('http://localhost:3000/rentals').then(response => {
            for (var number in response.data) {
                if(response.data.hasOwnProperty(number)){
                    this.itemsOfArray.push(response.data[number])
                }
            }       
          })
      },

      methods: {
        myRowdblClickHandler: function (record) {
            this.axios.get('http://localhost:3000/rentals').then(response => {
                for (var number in response.data) {
                    if(response.data[number].carkey == record.carkey && response.data[number].clientKey == record.clientKey){
                        this.axios.delete('http://localhost:3000/rentals/' + number).then( () => {
                        location.reload();
                        })
                    }
                }             
            })
       }
    }
  }
</script>