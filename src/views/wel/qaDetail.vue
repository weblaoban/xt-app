<!-- 信托问答详情 -->
<template>
	<div class="index-container qadetail">
        <main-header :active="5"></main-header>
        <div class="banner"></div>
		<div class="qadetailcon">
            <h4>{{ detail.title }}</h4>
            <p class="time">发布时间：{{ detail.updateTime }}</p>
            <img v-if="detail.imgUrl" :src="detail.imgUrl" alt="">
            <div class="videoCon" v-show="detail.link">
                <video ref="video" :src="detail.link"></video>
<img src="/img/play.png" alt="" @click="play" class="play">
            </div>
            <div class="content" v-html="detail.content"></div>
        </div>
	<main-footer></main-footer>
	</div>
</template>

<script>
import mainFooter from '../common/footer.vue'
import mainHeader from '../common/header.vue'
import { zxdetail } from "@/api/prod.js";
export default {
	name: "jeZi",
	components: {
        mainFooter,
        mainHeader
	},
	data() {
		return {
            detail:{}
		};
	},
	created() {this.getDetail()},
	methods: {
        getDetail(){
            const id = this.$route.params.id
            zxdetail(id).then(res=>{
                this.detail = res.data.data
            })
            console.log(id)
        },
        play(){
            this.$refs.video.play()
        }
    },
    beforeUnmount(){
            this.$refs.video.stop()
    }
};
</script>

<style lang="scss">
.qadetail{

    .banner{
width:100%;
height:293px;
		background-image: url(/img/qabanner.png);
		background-size: 1920px 293px;
		background-position: center center;
		background-repeat: no-repeat;
        margin-bottom:50px;
    }
    .qadetailcon{
        width: 1200px;
background: #FFFFFF;
box-shadow: 0px 0px 16px 4px rgba(154,154,156,0.15);
border-radius: 6px;
margin:31px auto 176px;
padding:50px;
box-sizing: border-box;
h4{
font-size: 30px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
text-align: center;
margin:0;
margin-bottom:20px;
}
.time{
text-align: center;

font-size: 18px;
font-family: Heiti SC;
font-weight: 500;
color: #9A9A9C;
}
.videoCon{
    width: 589px;
height: 372px;
background: linear-gradient(163deg, #92B5B3, #696F6E);
border-radius: 12px;
margin:50px auto;
position:relative;

.play{
                position:absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
                width:58px;
                height:58px;
                z-index:1;
                margin:auto;
            }
}
    img{
        max-width:100%;
    }
.content{
    width:100%;
        max-width:100%;
    img{
        max-width:100%;
    }
}

    }
}
</style>
