<template>
  <q-layout>
    <q-page-container>
      <div>
        <!-- Login left Starts -->
         <div style="text-align: center; margin-top:30px; ">
            <img width="25%" height="25%" src="/icons/nyt-logo.svg" alt="The New York Times"/>
          </div>
        

        <div class="q-px-md"><hr class="q-mt-sm" /></div>

        <div class="login-main">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
export default {
  name: "LoginLayout",
  data() {
    return {
      data: "",
    };
  },
};
</script> ]

<style >
.login-main{
    text-align: center;
}
</style>
