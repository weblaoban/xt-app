import c from"./header.0e761acb.js";import{zxdetail as _}from"./prod.79309155.js";import{_ as m,r as p,o as a,c as n,e as h,d as t,t as l,g as u,w as v,v as f}from"./index.d4dbd848.js";import{_ as g}from"./play.9d6c989d.js";import"./logo.ba36431f.js";const y={name:"jeZi",components:{mainHeader:c},data(){return{detail:{}}},created(){this.getDetail()},methods:{getDetail(){const s=this.$route.params.id;_(s).then(i=>{this.detail=i.data.data}),console.log(s)},play(){this.$refs.video.play()}},beforeUnmount(){this.$refs.video.stop()}},x={class:"index-container qadetail"},k={class:"qadetailcon"},D={class:"time"},C=["src"],w={class:"videoCon"},z=["src"],B=["innerHTML"];function H(s,i,N,T,e,o){const r=p("main-header");return a(),n("div",x,[h(r,{title:"\u4FE1\u6258\u8D44\u8BAF"}),t("div",k,[t("h4",null,l(e.detail.title),1),t("p",D,"\u53D1\u5E03\u65F6\u95F4\uFF1A"+l(e.detail.uploadTime),1),e.detail.imgUrl?(a(),n("img",{key:0,src:e.detail.imgUrl,alt:""},null,8,C)):u("",!0),v(t("div",w,[t("video",{ref:"video",src:e.detail.link},null,8,z),t("img",{src:g,alt:"",onClick:i[0]||(i[0]=(...d)=>o.play&&o.play(...d)),class:"play"})],512),[[f,e.detail.link]]),t("div",{class:"content",innerHTML:e.detail.content},null,8,B)])])}var S=m(y,[["render",H]]);export{S as default};
