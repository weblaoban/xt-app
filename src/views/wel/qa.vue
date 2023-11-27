<!-- 信托资讯 -->
<template>
	<div class="index-container zixun">
        <main-header :active="5"></main-header>
		<div class="banner"></div>
        <div class="container">
            <div class="zixunCon">
                <div class="zixunList">
                    <el-row :gutter="15">

                        <el-col :span="8" v-for="item in list" :key="item.id">

                    <div class="qaItem" @click="goDetail(item)">
                        <div class="itemBanner">
<img src="/img/play.png" alt="" class="play">
                            <img :src="item.des" alt="">
                        </div>
                        <h4 class="ellipsis">{{ item.title }}</h4>
                        <span class="time ellipsis">{{ item.uploadTime }}</span>
                        </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="paginationCon">
						<el-pagination
							background
							layout="prev, pager, next"
							:page-size="page.pageSize"
							:current-page="page.current"
							:total="page.total"
							@current-change="currentChange"
						>
						</el-pagination>
					</div>
            </div>
        </div>
	<main-footer></main-footer>
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
            list:[]
		};
	},
	created() {this.fetchList()},
	methods: {
		fetchList() {
			const { page } = this;
			console.log(page);
			// console.log(list);
			zxlist({ ...page, status: 0, categoryId: 9 }).then(res=>{
                console.log(res)
                this.list = res.data.data.records
                this.page.total = res.data.data.total
            });
		},
		onSelectSearch(value, prop) {
			console.log(value, prop);
			this.selected[prop] = value;
		},
        goDetail(row){
            this.$router.push('/trustQaDetail/'+row.id)
        }
    },
};
</script>

<style lang="scss">
.zixun{
    .banner{
width:100%;
height:293px;
		background-image: url(/img/qabanner.png);
		background-size: 1920px 293px;
		background-position: center center;
		background-repeat: no-repeat;
        margin-bottom:50px;
    }

    .qaItem{
        width: 380px;
height: 340px;
background: #FFFFFF;
box-shadow: 0px 0px 8px 2px rgba(48,51,59,0.1);
border-radius: 12px;
margin-bottom:30px;

        .time{
font-size: 14px;
font-family: Heiti SC;
font-weight: 500;
color: #9A9A9C;
        }
        h4{

font-size: 18px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
margin:0;
margin-bottom:18px;
width:844px;
margin-top:18px;
        }
        p{
            margin:0;
font-size: 16px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
width:844px;
        }
        .ellipsis{
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
padding-left:19px;
        }
        .itemBanner{
            position:relative;
        }
        img{
            width:100%;
            height:240px;
            &.play{
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
