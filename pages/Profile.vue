<template>
    <div>

        <div class="center">
            <q-card class="card" bordered>
                <q-avatar class="input">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>

                <div class="input" >Display Name : {{userProfile.displayName ? userProfile.displayName : 'N/A'}}</div>
                <div class="input" >Email Address : {{userProfile.emailAddress ? userProfile.emailAddress : 'N/A'}}</div>


            </q-card>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            userProfile : {},
            loaderVisible : false,
        }
    },
    methods :{

        getUserProfile (){

           let localData = localStorage.getItem("registerdPersonObject");
           this.userProfile = JSON.parse(localData);
        }

    },

    mounted(){
        this.getUserProfile();

    }
}
</script>

<style >

.card {
    /* text-align: center; */
    width: 500px;
    padding: 30px;
    
}

.center{
    margin-top:  50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* text-align: center; */
}

.input{
    margin: 10px;
}

</style>