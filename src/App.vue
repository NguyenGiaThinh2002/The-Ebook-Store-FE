

<template>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!-- <title>{{ title }}</title> -->
    <link rel="icon" href="./assets/banner_home/logo.png">
     </head>
  <div id="app">
    <router-view> 
    </router-view>
  </div>
  
</template>

<style scoped>

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
<script>
    export default {
    //   created(){
    //     this.auth();
    //   },
      
    //   methods:{
    //     auth(){
    //       if(localStorage.getItem('userId') == null){
    //         this.$router.push('/login')
    //     }
    //   }
    // },
      data() {
        return {}
      },
    
  }
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
</script>


