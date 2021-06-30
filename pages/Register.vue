<template>
    <div>

        
        <div class="center">
            <h4>Create your free account</h4>
            <q-card class="card" bordered>
                <form @submit.prevent.stop="onSubmitRegister" 
                    @reset.prevent.stop="onReset"  
                    autocorrect="off" 
                    autocapitalize="off" 
                    autocomplete="off" 
                    spellcheck="false"> 

                    <div style="text-align:left">

                        <div class="field-title">Display Name</div>
                        <q-input 
                            :dense="dense"
                            outlined
                            type="text" 
                            v-model="userDisplayName" 
                            lazy-rules
                            ref="userDisplayName" 
                            :rules="validateDisplayName(userDisplayName)"/>
                    </div>

                    <div style="text-align:left">

                        <div class="field-title">Email Address</div>
                        <q-input 
                            :dense="dense"
                            outlined
                            type="text" 
                            v-model="loginUserName" 
                            lazy-rules
                            ref="loginUserName" 
                            :rules="validateEmail(loginUserName)"
                            />

                    </div>

                    <div style="text-align:left">
                        <div class="field-title">Password</div>
                        <q-input 
                            :dense="dense"
                            outlined
                            maxlength="20"
                            type="password" 
                            v-model="loginPassword" 
                            ref="loginPassword" 
                            :rules="validateUserPassword(loginPassword)"/>
                       

                        <q-btn :loading="loaderVisible" 
                            stack no-caps  class="input full-width" color="primary" type="submit" label="Create Account" >
                            <template v-slot:loaderVisible>
                                <q-spinner-facebook />
                            </template>
                        </q-btn>


                        <div style="text-align:center; margin-top:10px">
                            <span>Already have a Times account?
                                <span style="cursor: pointer;" @click="logout()">
                                    <span style="!color:'black';font-weight:600">
                                        Log In
                                    </span>
                                </span></span>
                        </div>


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
            userDisplayName : '',
            loaderVisible : false,
            loginUserName :'',
            loginPassword :'',
            mailExist : false,
            dismissNotify :'',
        }
    },

    methods : {

        validateDisplayName(val){
            var regExpSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
            return [
                 val => val !== null && val !== '' || 'Display name is required',
                 val => !regExpSpecialCharacters.test(val) || 'Display Name should not contain Special Character',
            ]
        },

       

        validateEmail(){
            var regExpEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return [ 
                val => val !== null && val !== '' || 'Email Address is required',
                val => regExpEmail.test(val) || 'Please enter a valid email address',
                // val => this.mailExist == false || 'Email already exists'
            ];
        },

        validateUserPassword(val){
            var regExpSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
            return [ 
                val => val !== null && val !== '' || 'Password is required',
                val => val.length >= 6 || 'Password should contain: Minimum 6 characters',
                val => val.length < 20 || 'Password can contain only maximum 20 characters',
                val => !regExpSpecialCharacters.test(val) || 'Password should not contain Special Character',
                
            ];
        },


        checkEmailExists(val){

            if(this.dismissNotify){
                this.dismissNotify();
            }

            var regExpEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            console.log(regExpEmail.test(val));
            var checkEmail = regExpEmail.test(val);

            if(checkEmail){
                var params = {
                    "email":this.loginUserName
                }
                axios.post(process.env.API_URL + constants.ENDPOINTS.CHECK_MAIL_EXISTS , params)
                .then(result=>{
                    if(result.data.success){
                        this.mailExist = false
                    }else{
                        this.mailExist = true 
                        this.dismissNotify = this.$q.notify({
                          message: result.data.message,
                          color: 'red'
                        })
                    }
                })
                .catch(err=>{
                    console.log("err--- ",err);
                })
            }
        },
       

        onSubmitRegister(){


            this.$refs.userDisplayName.validate();
            this.$refs.loginUserName.validate();
            this.$refs.loginPassword.validate();

            if (this.$refs.userDisplayName.hasError  ||
                this.$refs.loginUserName.hasError ||
                this.$refs.loginPassword.hasError  ) 
            {
                this.formHasError = true;
            }
            else {
                this.$refs.userDisplayName.resetValidation();
                this.$refs.loginUserName.resetValidation();
                this.$refs.loginPassword.resetValidation();
               
                this.registerUser();
            }
        },

        registerUser(){

            var registerdPersonObject = {
                displayName : this.userDisplayName,
                emailAddress : this.loginUserName,
                loginPassword : this.loginPassword
            }

            console.log("registerdPersonObject-- ",registerdPersonObject)

            localStorage.setItem("registerdPersonObject", JSON.stringify(registerdPersonObject));
            this.$q.notify({
                message: 'User Registered Successfully',
                color: 'primary'
            });
            this.logout();

           
        },

        logout(){
            this.$router.push({path : "/"})
        },
    },

    mounted (){
       
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

.input{
    margin: 10px;
}

</style>