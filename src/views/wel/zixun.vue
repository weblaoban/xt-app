<!-- 信托资讯 -->
<template>
	<div class="index-container zixun">
        <main-header :active="6"></main-header>
		<div class="banner"></div>
        <div class="container">
            <div class="zixunCon">
                <div class="zixunList">
                    <div class="zixunItem" @click="goDetail(item)" v-for="item in list" :key="item.id">
                        <h4 class="ellipsis">{{ item.title }}</h4>
                        <p class="ellipsis">{{ item.des }}</p>
                        <span class="time">{{ item.uploadTime }}</span>
                        </div>
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
			zxlist({ ...page, status: 0, categoryId: 8 }).then(res=>{
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
		background-image: url(/img/zixunbanner.png);
		background-size: 1920px 293px;
		background-position: center center;
		background-repeat: no-repeat;
    }

    .zixunItem{
        height:114px;
        border-bottom: 1px solid rgba(154, 154, 156, 0.2);
        padding:30px 0;
        box-sizing: border-box;
        position:relative;
        .time{
            position:absolute;
            top:30px;
            right:0;
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
        }

        &:hover{
            h4{

color: #EABA63;
text-decoration: underline;
            }
        }
    }
    

.paginationCon {
	margin-top: 30px;
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
