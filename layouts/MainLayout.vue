<template>
  <q-layout view="lHh Lpr lFf">

    <q-header style="background: white;" >
      <div class="row">
        <div class="col" style="color: black;text-align:left; padding:20px">
            <span style="font-weight:600; font-size:15px">{{week}} , {{currentDate}}-{{currentMonth}}-{{currentYear}}</span>
        </div>
        <div class="col" style="text-align: center;padding:20px">
            <img width="80%" height="80%" src="/icons/nyt-logo.svg" alt="The New York Times"/>
        </div>

        <div class="col" style="text-align:right; padding:20px">
        
        <q-chip style="cursor: pointer;" >
          <q-avatar @click="viewProfile()">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <span @click="viewProfile()">Profile</span>
        </q-chip>
        <q-btn color="primary" icon="logout" @click="logout()" />
        </div>
      </div>

      <div class="q-px-md"><hr class="q-mt-sm" /></div>
    </q-header>

    <q-page-container>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
          <q-toolbar-title>
          </q-toolbar-title>
        </q-toolbar>

        <q-drawer v-model="leftDrawerOpen" content-class="bg-grey-1">
          <q-list> 
            <q-item-label header class="q-ml-md" style="cursor: pointer;" @click="gotoReadLater()">
              <span style="font-size:20px;font-weight:500">Read later</span>
            </q-item-label>
            <q-item-label header class="q-ml-md">
              <span style="font-size:20px;font-weight:500">Category</span>
            </q-item-label>
            <div class="q-px-md"><hr class="q-mt-sm" /></div>
            <div v-for="section in newscategory" :key="section.name">
              <q-item-section style="text-align:left;margin-left:30px;cursor: pointer;" @click="filterArticles(section.display_name)">
                {{section.display_name}}
              </q-item-section>
            <div class="q-px-md"><hr class="q-mt-sm" /></div>
            </div>
          
          </q-list>
        </q-drawer>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import constants from "src/config/constants";
import axios from 'axios';
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen:true,
      currentDate : new Date().getDate(),
      currentMonth :  new Date().getMonth(),
      currentYear :  new Date().getUTCFullYear(),
      week : constants.WEEKS[new Date().getDay()],
      newscategory : [],
      
    }
  },

  methods:{

    gotoReadLater(){

      this.filterArticles("readLater")
    },

    filterArticles(category){
      console.log(this.$route.path)
      if(this.$route.path == "/home"){
        this.$root.$emit("setFilterArtcles",category);
      }else{
        this.$router.push({path:'/home' , query : {'category' : category} })
      }
      
    },

    logout(){
      localStorage.clear();
      this.$router.push({path : "/"})
    },

    viewProfile(){
      this.$router.push({path : "/userprofile"})
    },

    getSectionList(){

      axios.get(process.env.API_URL + constants.ENDPOINTS.SECTION_LIST + constants.API_KEY)
      .then(result=>{
          this.newscategory = result.data.results;
          this.newscategory.unshift({"name" : "all", "display_name" : "All"})
      })
      .catch(err=>{
        this.newscategory =[];
        console.log("err--- ",err);
      })
    },

    
  },

  mounted(){
    this.getSectionList();
  }
}
</script>

<style>

.section-style{
  padding: 10px;
  cursor: pointer;
}

</style>
