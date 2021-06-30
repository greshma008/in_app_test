<template>
    <div>
        <q-spinner v-if="showLoader" color="primary" size="3em" />

        <div style="text-align:right;margin:20px" v-if="currentSection!='readLater'">
           <q-btn label="Prev"  outline style="margin-right:10px" @click="getPreviousNews()" />
           <q-btn label="Next" outline @click="getNextnews()"/>
        </div>

        <div v-if="!showLoader">
            <div v-for="article in filterArticles" :key="article.title">
                <q-card class="my-card" flat bordered style="padding:10px;"  >
                    <q-card-section style="cursor: pointer;" @click="getArtcleDetails(article)">
                        <div class="text-h6">{{article.title}}</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none" style="cursor: pointer;" @click="getArtcleDetails(article)">
                        {{article.abstract}}
                    </q-card-section>
                    <q-card-section style="cursor: pointer;" horizontal @click="getArtcleDetails(article)">
                        <div class="col" v-for="image in article.multimedia" :key="image.url">
                            <q-img width="50%" height="50%"
                                :src="image.url"
                            />
                        </div>
                    </q-card-section>
                    <q-separator/>
                    <q-card-actions v-if="currentSection!='readLater'">
                        <q-btn outline label="Read Later" @click="addToReadLater(article)"/>
                    </q-card-actions>
                </q-card>
            </div>
        </div>

        <div v-if="!showLoader && filterArticles && filterArticles.length==0">
            <q-card class="my-card" flat bordered style="padding:10px;">
                <q-card-section>
                    <div class="text-h6">
                        Sorry! Cannot find news in {{currentSection}}
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>


<script>

import constants from "src/config/constants";
import axios from 'axios';
export default {
    data(){
        return{
            showLoader:false,
            newscategory : constants.NEWS_CATEGORY,
            currentSection : '',
            articles : [],
            filterArticles:[],
            page : 0,
            limit:10,
        }
    },

    methods:{

        addToReadLater(article){

            let readLater = localStorage.getItem("readLaterSection") ? 
                            JSON.parse(localStorage.getItem("readLaterSection")) : []
            let index = readLater.findIndex(element=> element.title == article.title);
            if (index < 0) {
                readLater.push(article);
            }
            localStorage.setItem("readLaterSection", JSON.stringify(readLater));
        },

        getPreviousNews(){

            if(this.page !=0){
                this.page = this.page - 1;
            }
            this.getSectionArticles();

        },

        getNextnews(){

            this.page = this.page + 1;
            this.getSectionArticles();

        },

        getArtcleDetails(artcle){
            var url = artcle.url;
            window.open(url);
        },

        getSectionArticles(){

            this.articles = [];
            this.filterArticles = [];
            this.showLoader = true;
            this.currentSection = '';
            var page = this.page;
            var limit = this.limit;

            axios.get(process.env.API_URL + constants.ENDPOINTS.ARTICLE_LIST + constants.API_KEY + `&page=${page}&limit=${limit}`  )
            .then(result=>{
                this.articles = result.data.results;
                this.filterArticles = result.data.results;
                this.showLoader = false;
            })
            .catch(err=>{
                this.newscategory =[];
                console.log("err--- ",err);
                this.showLoader = false;
            })

        },

        setFilterArticles(section){
            this.currentSection = section
            this.showLoader = true;
            this.filterArticles = [];
            if(section == "All"){
                this.filterArticles = this.articles;
            }else if(section == "readLater"){
                this.filterArticles = JSON.parse(localStorage.getItem("readLaterSection"));
            }
            else{
                this.articles.forEach(element=>{
                    if(element.section ==  section){
                        this.filterArticles.push(element);
                    }
                })
            }
            this.showLoader = false;
        }
       
    },

    mounted(){
        this.getSectionArticles();
        console.log("jhjgdgjhsdf", this.$route.query)
        if(this.$route.query && this.$route.query.category){
            this.setFilterArticles(this.$route.query.category);
        }
        
        this.$root.$off("setFilterArtcles");
        let _this = this;
        this.$root.$on("setFilterArtcles", function(data){
            _this.setFilterArticles(data);
        })
    }
}
</script>