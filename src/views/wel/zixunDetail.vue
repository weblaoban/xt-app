<!-- 信托问答详情 -->
<template>
	<div class="index-container qadetail">
        <main-header title="信托资讯"></main-header>
		<div class="qadetailcon">
            <h4>{{ detail.title }}</h4>
            <p class="time">发布时间：{{ detail.uploadTime }}</p>
            <img v-if="detail.imgUrl" :src="detail.imgUrl" alt="">
            <div class="videoCon" v-show="detail.link">
                <video ref="video" :src="detail.link"></video>
<img src="/img/play.png" alt="" @click="play" class="play">
            </div>
            <div class="content" v-html="detail.content"></div>
        </div>
	</div>
</template>

<script>
import mainHeader from '../common/header.vue'
import { zxdetail } from "@/api/prod.js";
export default {
	name: "jeZi",
	components: {
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

    height:100%;
background: #FFFFFF;
    .qadetailcon{
background: #FFFFFF;
margin:0 auto;
padding:0.3rem;
box-sizing: border-box;
h4{
font-size: 0.32rem;
font-family: PingFang SC;
font-weight: 400;
color: #30333B;
text-align: center;
margin:0;
margin-bottom:0.3rem;
}
.time{
text-align: center;

font-size: 0.26rem;
font-family: PingFang SC;
font-weight: 400;
color: #9A9A9C;
}
.videoCon{
    width: 6rem;
height: 3.7rem;
background: linear-gradient(163deg, #92B5B3, #696F6E);
border-radius: 0.1rem;
margin:0.5rem auto;
position:relative;
video{
    width:100%;
    height:100%;
}

.play{
                position:absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
                width:0.88rem;
                height:0.88rem;
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
