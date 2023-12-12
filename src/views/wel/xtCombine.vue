<!-- 集合信托 -->
<template>
	<div class="index-container prodListContainer">
		<main-header title="产品列表"></main-header>
		<div class="combineCon">
			<div class="combineBanner">
				<div class="input">
					<input
						v-model="key"
						@blur="fetchListBykey"
						type="text"
						placeholder="状态｜期限｜门槛｜付息方式｜领域"
					/>
					<img src="/img/search.png" alt="" class="search" />
				</div>
			</div>
			<div class="combineContent">
				<div class="tabs" v-if="!key">
					<div
						:class="{ tabItem: true, active: currentCat == 97 }"
						@click="setCat(97)"
					>
						信托产品
					</div>
					<div
						:class="{ tabItem: true, active: currentCat == 98 }"
						@click="setCat(98)"
					>
						集合资管
					</div>
					<div
						:class="{ tabItem: true, active: currentCat == 99 }"
						@click="setCat(99)"
					>
						私募基金
					</div>
				</div>
			</div>
		</div>

		<div class="container scrollList" ref="scrollCon">
			<div class="products" ref="scrollList">
				<div
					@click="goDetail(item)"
					:class="{ productItem: true, finish: item.status == 3 }"
					v-for="item in prodList"
					:key="item.id"
				>
					<div :class="'title ' + 'title' + item.categoryId">
						{{ item.name }}
					</div>
					<div class="descCon">
						<div class="desc">业绩比较基准</div>
						<div class="desc">投资门槛</div>
					</div>
					<div class="descCon">
						<p class="count">{{ item.brief || 0 }} <span>%</span></p>
						<p class="count">
							<span>{{ item.pmStand }}</span>
						</p>
					</div>
					<div class="line"></div>
					<div class="duration">产品期限：{{ item.investLimitId }}</div>
					<div class="tag" v-if="item.status == 1 || item.status == 3">
						<img :src="'/img/h5/tag' + item.status + '.png'" alt="" />
					</div>
				</div>
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

		<contact></contact>
	</div>
</template>

<script>
import mainFooter from "../common/footer.vue";
import mainHeader from "../common/header.vue";
import { list, keylist } from "@/api/prod.js";
import contact from "../common/contact.vue";
export default {
	name: "jeZi",
	components: {
		mainFooter,
		mainHeader,
		contact,
	},
	data() {
		return {
			searchs: [
				{
					label: "产品状态：",
					prop: "status",
					options: [
						{
							label: "不限",
							value: "-1",
						},
						{
							label: "预售",
							value: "1",
						},
						{
							label: "在售",
							value: "2",
						},
						{
							label: "售罄",
							value: "3",
						},
					],
				},
				{
					label: "产品期限：",
					prop: "investLimitId",
					options: [
						{
							label: "不限",
							value: "-1",
						},
						{
							label: "一年内（含）",
							value: "1",
						},
						{
							label: "一年至两年（含）",
							value: "2",
						},
						{
							label: "两年以上",
							value: "3",
						},
					],
				},
				{
					label: "投资门槛：",
					prop: "pmStand",
					options: [
						{
							label: "不限",
							value: "-1",
						},
						{
							label: "50万以内（含）",
							value: "1",
						},
						{
							label: "50万至100万（含）",
							value: "2",
						},
						{
							label: "100万至300万（含）",
							value: "3",
						},
						{
							label: "300万以上",
							value: "4",
						},
					],
				},
				{
					label: "付息方式：",
					prop: "inrestMethodId",
					options: [
						{
							label: "不限",
							value: "-1",
						},
						{
							label: "按月付息",
							value: "1",
						},
						{
							label: "按季付息",
							value: "2",
						},
						{
							label: "半年付息",
							value: "3",
						},
						{
							label: "按年付息",
							value: "4",
						},
						{
							label: "到期付息",
							value: "5",
						},
					],
				},
				{
					label: "投资领域：",
					prop: "prodEffid",
					options: [
						{
							label: "不限",
							value: "-1",
						},
						{
							label: "工商企业类",
							value: "0",
						},
						{
							label: "金融市场类",
							value: "1",
						},
						{
							label: "基础设施类",
							value: "2",
						},
						{
							label: "房地产类",
							value: "3",
						},
						{
							label: "资金池类",
							value: "4",
						},
						{
							label: "其他",
							value: "5",
						},
					],
				},
			],
			selected: {
				status: {
					label: "不限",
					value: "-1",
				},
				investLimitId: {
					label: "不限",
					value: "-1",
				},
				pmStand: {
					label: "不限",
					value: "-1",
				},
				inrestMethodId: {
					label: "不限",
					value: "-1",
				},
				prodEffid: {
					label: "不限",
					value: "-1",
				},
			},
			currentCat: 97,
			prodList: [],
			propColumn: [
				{
					label: "产品名称",
					value: "name",
					align: "left",
				},
				{
					label: "状态",
					value: "status",
				},
				{
					label: "类型",
					value: "categoryId",
				},
				{
					label: "期限",
					value: "investLimitId",
				},
				{
					label: "业绩比较基准",
					value: "brief",
				},
				{
					label: "投资门槛",
					value: "pmStand",
				},
				{
					label: "付息方式",
					value: "inrestMethodId",
				},
				{
					label: "投资领域",
					value: "prodEffid",
				},
				{
					label: "防控评级",
					value: "lev",
				},
			],

			page: {
				pageSize: 15,
				total: 0,
				current: 1,
			},
			key: "",
			loading: false,
		};
	},
	mounted() {
		const scrollCon = this.$refs.scrollCon;
		if (scrollCon) {
			scrollCon.addEventListener("scroll", this.scrollBottom, true);
		}
	},
	created() {
		this.fetchList();
	},
	methods: {
		fetchList() {
			const { selected, page, currentCat } = this;
			list({ ...page, status: -1, categoryId: currentCat, soldNum: -1 }).then(
				(res) => {
					this.prodList = this.prodList.concat(res.data.data.records);
					this.page.total = res.data.data.total;
				}
			);
		},
		setCat(cat) {
			this.currentCat = cat;
			this.prodList = [];
			this.page = {
				pageSize: 15,
				total: 0,
				current: 1,
			};
			this.fetchList();
		},
		fetchListBykey() {
			if (!this.key) {
				this.fetchList();
				return;
			}
			keylist({ keystr: this.key, catstr: 97, size: 100 }).then((res) => {
				this.prodList = res.data.data.records;
				this.page.total = res.data.data.total;
			});
		},

		scrollBottom(e) {
			if (this.loading) {
				return;
			}
			const scrollList = this.$refs.scrollList;
			const scrollCon = this.$refs.scrollCon;
			const toBottom =
				scrollCon.scrollTop + scrollCon.clientHeight >= scrollList.clientHeight;
			const { pageSize, total, current } = this.page;
			const unfinish = pageSize * current < total;
			if (unfinish && toBottom) {
				this.page.current = this.page.current + 1;
				if (this.key) {
					this.fetchListBykey();
					return;
				}
				this.fetchList();
			}
		},
		goDetail(row) {
			this.$router.push({
				path: "/prodDetail/" + row.id,
				query: {
					type: 1,
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.combineBanner {
	width: 100%;
	height: 1.43rem;
	padding: 0.3rem;
	box-sizing: border-box;
	.input {
		width: 100%;
		height: 0.72rem;
		background: rgba(234, 186, 99, 0.5);
		border: 1px solid rgba(165, 135, 84, 0.1);
		// opacity: 0.3;
		border-radius: 0.12rem;
		position: relative;
		input {
			width: 100%;
			height: 0.72rem;
			box-sizing: border-box;
			padding: 0 0.3rem;
			border: 1px solid rgba(131, 108, 76, 0.3);
			// opacity: 0.3;
			border-radius: 0.12rem;
			font-size: 0.2rem;
			font-family: PingFang SC;
			font-weight: 400;
			color: #836c4c;

			&::placeholder {
				font-size: 0.2rem;
				font-family: Heiti SC;
				font-weight: 500;
				color: #836c4c;
				opacity: 0.8;
			}
		}
		.search {
			position: absolute;
			width: 0.4rem;
			height: 0.4rem;
			top: 0;
			bottom: 0;
			right: 0.3rem;
			margin: auto;
		}
	}
}

.combineContent {
	.searchCard {
		width: 100%;
		height: 358px;
		background: #ffffff;
		box-shadow: 0px 0px 16px 4px rgba(154, 154, 156, 0.15);
		border-radius: 6px;
		box-sizing: border-box;
		padding: 30px 50px;
		margin-bottom: 30px;
		ul,
		li {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		.searchItem {
			padding-left: 90px;
			box-sizing: border-box;
			position: relative;
			margin-bottom: 16px;
			.label {
				position: absolute;
				left: 0;
				top: 0;
				line-height: 26px;
				font-size: 16px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #9a9a9c;
			}
			ul {
				width: 100%;
				height: 26px;
				li {
					float: left;
					line-height: 26px;
					padding: 0 15px;
					font-size: 16px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #9a9a9c;
					cursor: pointer;
					&.active {
						color: #fff;
						background: #eaba63;
						border-radius: 3px;
					}
				}
			}
		}

		.selected {
			ul {
				width: auto;
				max-width: 800px;
				li {
					margin-left: 16px;
					i {
						line-height: 26px;
					}
				}
			}
			.resetCon {
				position: absolute;
				right: 0px;
				top: 0;
				span {
					line-height: 26px;
					font-size: 16px;
					font-family: Heiti SC;
					font-weight: 500;
				}
				.reset {
					color: #ec5e2a;
					margin-right: 50px;
					cursor: pointer;
				}
				.total {
					color: #9a9a9c;
				}
			}
		}

		.border {
			height: 1px;
			background: #9a9a9c;
			opacity: 0.2;
			margin-top: 30px;
			margin-bottom: 36px;
		}
	}
}

.products {
	.productItem {
		width: 100%;
		height: 2.74rem;
		background: #ffffff;
		box-shadow: 0rem 0rem 0.1rem 0rem rgba(48, 51, 59, 0.2);
		border-radius: 0.06rem;
		padding: 0.2rem 0.3rem;
		box-sizing: border-box;
		position: relative;
		margin-bottom: 0.2rem;
		.tag {
			position: absolute;
			width: 0.83rem;
			height: 0.73rem;
			top: 0;
			right: 0;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.title {
			width: 4.71rem;
			font-size: 0.32rem;
			font-family: PingFang SC;
			font-weight: 400;
			color: #30333b;
			margin-bottom: 0.1rem;
			box-sizing: border-box;
			padding-left: 1rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			background-image: url(/img/h5/title1.png);
			background-repeat: no-repeat;
			background-size: 0.92rem 0.3rem;
			background-position: left center;
			&.title98 {
				background-image: url(/img/h5/title2.png);
			}
			&.title99 {
				background-image: url(/img/h5/title3.png);
			}
		}
		.desc {
			width: 50%;
			font-size: 0.24rem;
			font-family: PingFang SC;
			font-weight: 400;
			color: #9a9a9c;
		}
		.descCon {
			display: flex;
		}
		.count {
			width: 50%;
			font-size: 0.52rem;
			font-family: PingFang SC;
			font-weight: 400;
			color: #eaba63;
			margin: 0.1rem 0;
			span {
				font-size: 0.24rem;
				font-weight: 400;
			}
			&:nth-child(2) {
				color: #30333b;
			}
		}
		.duration {
			width: 6.3rem;
			height: 0.45rem;
			background: linear-gradient(90deg, #f8fafb, #ffffff);
			font-size: 0.24rem;
			font-family: PingFang SC;
			font-weight: 400;
			color: #9a9a9c;
			box-sizing: border-box;
			padding-left: 0.1rem;
		}
		&:last-child {
			margin: 0;
		}

		&.finish {
			color: #9a9a9c !important;
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

.tabs {
	height: 0.6rem;
	width: 100%;
	padding: 0 0.4rem;
	box-sizing: border-box;
	margin-bottom: 0.2rem;
	.tabItem {
		font-size: 0.28rem;
		font-family: PingFang SC;
		font-weight: 400;
		color: #9a9a9c;
		position: relative;
		float: left;
		margin-right: 0.34rem;
		&.active {
			font-size: 0.32rem;
			font-family: PingFang SC;
			font-weight: 400;
			color: #30333b;
			&::before {
				content: "";
				display: block;
				width: 1.3rem;
				height: 0.06rem;
				background: #eaba63;
				left: 0;
				bottom: 0;
				position: absolute;
			}
		}
	}
}
.prodListContainer {
	height: 100%;
	background: RGBA(248, 250, 251, 1);
}
.scrollList {
	height: calc(100% - 3rem);
	overflow-y: scroll;
	padding-bottom: 0.3rem;
	box-sizing: border-box;
}
</style>
