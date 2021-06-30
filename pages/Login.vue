<template>
    <div>
       

        <div class="sub-heading">Log in to your account</div>
        <div class="center">
            <q-card class="card" bordered>
                <form @submit.prevent.stop="onSubmitLogin" 
                    @reset.prevent.stop="onReset"  
                    autocorrect="off" 
                    autocapitalize="off" 
                    autocomplete="off" 
                    spellcheck="false"> 

                    <div>
                        <div class="field-title">Email Address</div>
                        <q-input 
                            class="input" 
                            :dense="dense"
                            outlined
                            type="text" 
                            v-model="loginUserName" 
                            lazy-rules
                            ref="loginUserName" 
                            :rules="validateEmail(loginUserName)"/>

                        <div class="field-title">Password</div>
                        <q-input 
                            class="input" 
                            outlined
                            :dense="dense"
                            type="password" 
                            v-model="loginPassword" 
                            ref="loginPassword" 
                            :rules="validateUserPassword(loginPassword)"/>

                        <q-btn :loading="loaderVisible" 
                            stack glossy class="input full-width" color="primary" type="submit" label="Log In" >
                            <template v-slot:loaderVisible>
                                <q-spinner-facebook />
                            </template>
                        </q-btn>


                        
                    </div>

                    <div style="margin-top:10px">
                        <span>Don’t have a Times account?
                            <span style="cursor: pointer;" @click="registerUser()">
                                <span style="!color:'black';font-weight:600">
                                    Create one
                                </span>
                            </span></span>
                    </div>
                </form>
            </q-card>
        </div>
        
    </div>
    
</template>

<script>
import axios from 'axios';
import constants from 'src/config/constants';

export default {
    data(){
        return{
            dense:true,
            loaderVisible : false,
            loginUserName :'',
            loginPassword :'',
            registeredUser : {},
        }
    },

    methods : {

        validateEmail(){
            var regExpEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return [ 
                val => val !== null && val !== '' || 'Username is required',
                val => regExpEmail.test(val) || 'Please enter a valid email address',
            ];
        },

        validateUserPassword(val){
            return [ 
                val => val !== null && val !== '' || 'Password is required',
            ];
        },

        registerUser (){
            this.$router.push({path : '/register'})
        },

        onSubmitLogin(){

            this.$refs.loginUserName.validate();
            this.$refs.loginPassword.validate();

            if (this.$refs.loginUserName.hasError || this.$refs.loginPassword.hasError ) {
                this.formHasError = true;
            }
            else {
                this.$refs.loginUserName.resetValidation();
                this.$refs.loginPassword.resetValidation();
                this.userLogin();
            }
        },

        userLogin(){

            if(this.registeredUser && this.loginUserName == this.registeredUser.emailAddress && 
                this.loginPassword == this.registeredUser.loginPassword){
                    this.$router.push({path : 'home'})
            }else{
                    this.$q.notify({
                    message: 'Invalid Email Address or Password!',
                    color: 'red'
                });
            }
          
        }
    },

    mounted (){
        let localData = localStorage.getItem("registerdPersonObject");
        this.registeredUser = JSON.parse(localData);
        console.log("registeredUser--- ",this.registeredUser);
        this.loginUserName = 'aa@aa.com';
        this.loginPassword = 'aaaaaa'
    }
}
</script>

<style >

.card {
    text-align: center;
    width: 500px;
    padding: 30px;
    
}

.center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

/* .input{
    margin: 5px;
} */

.main-heading{
    font-size: 30px;
    font-family: Arial, Helvetica, sans-serif;
}

.sub-heading{
    font-size: 27px;
    font-family: fantasy;
    margin: 10px;
}

.field-title{
    text-align: left;
    margin-left:10px;
    font-weight: 600;
}

</style>