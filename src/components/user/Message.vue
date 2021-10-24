<template>

<div>
        <div class="card" style="width:40vw;">
                <img :src="items.urlImage" class="card-img-top" alt="...">
          <div class="card-body">
                 <h5 class="card-title">{{items.title}}</h5>
                  <p class="card-text">{{items.description}}</p>
             </div>
        </div>

</div>

    
</template>
<script>
export default{
    name:"Message",
    props:['items']

}


</script>
<style lang="scss">

</style>