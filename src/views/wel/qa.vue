<!-- 信托资讯 -->
<template>
	<div class="index-container zixun">
        <main-header title="信托问答"></main-header>
		<div class="banner"></div>
        <div class="container scrollList">
            <div class="zixunCon" ref="scrollCon">
                <div class="zixunList" ref="scrollList">
                    <el-row>

                        <el-col :span="24" v-for="item in list" :key="item.id">

                    <div class="qaItem" @click="goDetail(item)">
                        <div class="itemBanner">
<img src="/img/play.png" alt="" class="play">
                            <img :src="item.des" alt="">
                        </div>
                        <h4 class="ellipsis">{{ item.title }}</h4>
                        <p class="time ellipsis">{{ item.uploadTime }}</p>
                        </div>
                        </el-col>
                    </el-row>
                </div>
                <!-- <div class="paginationCon">
						<el-pagination
							background
							layout="prev, pager, next"
							:page-size="page.pageSize"
							:current-page="page.current"
							:total="page.total"
							@current-change="currentChange"
						>
						</el-pagination>
					</div> -->
            </div>
        </div>
	</div>
</template>

<script>
import mainFooter from '../common/footer.vue'
import mainHeader from '../common/header.vue'
import { zxlist } from "@/api/prod.js";
export default {
	name: "jeZi",
	components: {
        mainFooter,
        mainHeader
	},
	data() {
		return {
			page: {
				pageSize: 15,
				total: 0,
				current: 1,
			},
            list:[],
            loading:false
		};
	},
    mounted(){
const scrollCon = this.$refs.scrollCon;
if(scrollCon){
    scrollCon.addEventListener('scroll',this.scrollBottom,true)
}
    },
	created() {this.fetchList()},
	methods: {
		fetchList() {
            if(this.loading){
                return;
            }
            this.loading = true
			const { page } = this;
			zxlist({ ...page, status: 0, categoryId: 9 }).then(res=>{
                console.log(res)
                this.list = this.list.concat(res.data.data.records)
                this.page.total = res.data.data.total
            this.loading = false
            }).catch(()=>{

            this.loading = false
            });
		},
		onSelectSearch(value, prop) {
			console.log(value, prop);
			this.selected[prop] = value;
		},
        goDetail(row){
            this.$router.push('/trustQaDetail/'+row.id)
        },
        scrollBottom(e){
            if(this.loading){
                return;
            }
const scrollList = this.$refs.scrollList;
const scrollCon = this.$refs.scrollCon;
console.log(scrollCon.scrollTop)
console.log(scrollCon.clientHeight)
console.log(scrollList.clientHeight)
const toBottom = scrollCon.scrollTop+scrollCon.clientHeight>=scrollList.clientHeight;
const {pageSize,
				total,
				current,
			} = this.page
            const unfinish = pageSize*current<total
if(unfinish && toBottom){
    this.page.current = this.page.current+1;
this.fetchList()
}
        }
    },
    beforeUnmount(){
const scrollCon = this.$refs.scrollCon;
if(scrollCon){
    scrollCon.removeEventListener('scroll',this.scrollBottom,true)
}
    }
};
</script>

<style lang="scss">
.zixun{
    width:100%;
    height:100%;
    background: #fff;
    .banner{
width:100%;
height:1.82rem;
		background-image: url(/img/qabanner.png);
		background-size: 100% 3rem;
		background-position: left top;
		background-repeat: no-repeat;
    }
.el-col{

    border-bottom: 1px dashed rgba(154, 154, 156, 0.4);
&:last-child{
    border-bottom:none;
}
}
    .qaItem{
        width: 100%;
background: #FFFFFF;
padding:0.3rem 0;
height:1.75rem;
box-sizing: border-box;

        .time{
font-size: 0.24rem;
font-family: Heiti SC;
font-weight: 500;
color: #9A9A9C;
        }
        h4{

            font-size: 0.28rem;
font-family: PingFang SC;
font-weight: 400;
color: #30333B;
margin:0;
margin-left:1.98rem;
margin-bottom:0.23rem;
margin-top:0.11rem;
        }
        p{
            margin:0;
font-size: 0.24rem;
font-family: PingFang SC;
font-weight: 400;
color: #9A9A9C;
margin-left:1.98rem;
        }
        .ellipsis{
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
padding-left:19px;
        }
        .itemBanner{
            position:relative;
            width:1.8rem;
            height:1.13rem;
border-radius: 0.12rem;
overflow: hidden;
float:left;
        }
        img{
            width:1.8rem;
            height:1.13rem;
            &.play{
                position:absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
                width:0.48rem;
                height:0.48rem;
                z-index:1;
                margin:auto;
            }
        }
    }
    .scrollList{
        width:100%;
        height:calc(100% - 2.6rem);
        padding:0;
        .zixunCon{
            height: 100%;
            padding:0 0.3rem;
        }
        .zixunCon{
            overflow-y: scroll;
        }
    } 

.paginationCon {
	margin-top: 30px;
    margin-bottom:82px;
	.el-pagination {
		justify-content: center;
		font-size: 16px;
		.btn-prev,
		.btn-next {
			width: 42px;
			height: 36px;
			background: linear-gradient(0deg, #ffffff, #f0f0f0);
			border: 1px solid #ebebeb;
		}
		.el-pager li.number {
			background: linear-gradient(0deg, #ffffff, #f0f0f0);
			border: 1px solid #ebebeb;
		}
		.el-pager li:not(.is-disabled).is-active {
			background: #eaba63;
			&:hover {
				color: #fff !important;
			}
		}
		.el-pager li:hover {
			color: #eaba63 !important;
		}
	}
	.el-pagination.is-background .btn-next:hover:not([disabled]),
	.el-pagination.is-background .btn-prev:hover:not([disabled]) {
		color: #eaba63 !important;
	}
}
}

</style>
