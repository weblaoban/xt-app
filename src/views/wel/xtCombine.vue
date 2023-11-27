<!-- 集合信托 -->
<template>
	<div class="index-container">
		<main-header :active="1"></main-header>
		<div class="combineCon">
			<div class="combineBanner">
				<div class="input">
					<input type="text" placeholder="状态｜期限｜门槛｜付息方式｜领域" />
					<img src="/img/search.png" alt="" class="search" />
				</div>
			</div>
			<div class="combineContent">
				<div class="container">
					<div class="searchCard">
						<div class="searchList">
							<div class="searchItem" v-for="item in searchs" :key="item.prop">
								<div class="label">{{ item.label }}</div>
								<ul>
									<li
										:class="{
											active: selected[item.prop].value === option.value,
										}"
										v-for="option in item.options"
										@click="onSelectSearch(option, item.prop)"
										:key="option.value"
									>
										{{ option.label }}
									</li>
								</ul>
							</div>
						</div>
						<div class="border"></div>

						<div class="searchList selected">
							<div class="searchItem">
								<div class="label">已选条件：</div>
								<ul>
									<li
										v-show="option.value !== '-1'"
										class="active"
										v-for="(option, index) in selected"
										@click="onSelectSearch(option, item.prop)"
										:key="option.value"
									>
										{{ option.label }}
										<el-icon
											@click="removeSelected(index)"
											:size="20"
											style="vertical-align: middle"
											><Close
										/></el-icon>
									</li>
								</ul>
								<div class="resetCon">
									<span class="reset" @click="resetSearch">还原默认</span>
									<span class="total">共{{ page.total }}款产品符合条件</span>
								</div>
							</div>
						</div>
					</div>

					<div class="prodList">
						<div class="prodItem head">
							<div class="ths" v-for="item in propColumn" :key="item.value">
								{{ item.label }}
							</div>
							<div class="ths">操作</div>
						</div>
						<div
                        @click="goDetail(item)"
							:class="{
								prodItem: true,
								valid: item.status !== 3,
								notValid: item.status == 3,
							}"
							v-for="(item, index) in prodList"
							:key="index"
						>
							<div class="ths" v-for="item in propColumn" :key="item.value">
								{{ item.label }}
							</div>
							<div @click.capture="showAgreement = true" class="ths can yuyue">我要预约</div>
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
		</div>
		<main-footer></main-footer>

		<!-- 确认预约产品弹窗 -->
		<div class="model" v-if="showYuyue">
			<div class="modelContent">
				<el-icon @click="showYuyue = false"><Close /></el-icon>
				<div class="yuyue">
					<h3>产品预约</h3>
					<p class="desc">您要预约的产品为</p>
					<p class="title">xx信托-110号浙江省杭州市集合资金信托计划</p>
					<div class="button">确定</div>
				</div>
			</div>
		</div>
		<!-- 协议 -->
		<div class="model" v-if="showAgreement">
			<div class="modelContent">
				<el-icon @click="showAgreement = false"><Close /></el-icon>
				<div class="agreement">
					<img class="logo" src="/img/logo.png" alt="" />
					<div class="agCon">
						<h1>《合格投资者认定》</h1>
						<p>
							本网谨遵中国银行业监督管理委员会发布的《信托公司集合资金信托计划管理办法》之规定，只向特定投资者展示信托产品信息，不构成任何投资推介建议。
						</p>
						<p>
							阁下如有意进行信托投资，请承诺符合《信托公司集合资金信托计划管理办法》之规定合格投资者的条件。
						</p>
						<p>
							即具备相应风险识别能力和风险承担能力，投资于单只信托产品金额不低于100万元，且符合下列相关标准之一：
						</p>
						<p class="red">
							1.承诺符合金融类资产不低于300万元;（金融资产包括银行存款、股票、债券、基金份额、资产管理计划、银行理财产品、信托计划、保险产品、期货权益等）
						</p>
						<p class="red">或</p>
						<p class="red">
							2.承诺符合最近三年个人平均收入不低于50万元人民币；
						</p>
						<h1 style="margin-top: 50px">《免责条款》</h1>
						<p>
							一、本网致力于提供完整、准确的产品信息，信息内容绝大部份来自于本网的授权机构，本网尽谨慎注意和一致描述义务。尽
						</p>
					</div>
					<div class="checkBox">
						<img
							v-if="checked"
							src="/img/checked.png"
							@click="toggleCheck"
							alt=""
							class="checked"
						/>
						<img
							v-if="!checked"
							src="/img/unchecked.png"
							@click="toggleCheck"
							alt=""
							class="notCheced"
						/>
						<span
							>我接受 <span class="yel">《合格投资者认定》</span>、<span
								class="yel"
								>《免责条款》</span
							>中所有条款</span
						>
					</div>
					<div class="button">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import mainFooter from "../common/footer.vue";
import mainHeader from "../common/header.vue";
import { list } from "@/api/prod.js";
export default {
	name: "jeZi",
	components: {
		mainFooter,
		mainHeader,
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
			prodList: [{}, {}],
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
			checked: false,
			showAgreement: false,
			showYuyue: false,
		};
	},
	created() {
		this.fetchList()
	},
	methods: {
		fetchList() {
			const { selected, page } = this;
			const selectObj = {};
			for (let i in selected) {
				selectObj[i] = selected[i].value;
			}
			list({ ...page, status: -1, categoryId: 97 }).then(res=>{
                this.prodList = res.data.data.records;
                this.page.total = res.data.data.total;
            });
		},
		onSelectSearch(value, prop) {
			console.log(value, prop);
			this.selected[prop] = value;
		},
		removeSelected(key) {
			this.selected[key] = {
				label: "不限",
				value: "-1",
			};
		},
		resetSearch() {
			this.selected = {
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
			};
		},
		currentChange(current) {
			this.page.current = current;
			console.log(current);
		},
		toggleCheck() {
			this.checked = !this.checked;
		},
        goDetail(row){
this.$router.push({
    path:'/prodDetail/'+row.id,
    query:{
        type:1
    }
})
        }
	},
};
</script>

<style lang="scss">
.combineBanner {
	width: 100%;
	height: 274px;
	background: linear-gradient(
		90deg,
		#f2c775,
		#ef836d,
		#ffe8e0,
		#fdd3ab,
		#ffddc1
	);

	background-image: url(/img/listbg.png);
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 1920px 275px;
	position: relative;
	.input {
		width: 550px;
		height: 48px;
		background: rgba(234, 186, 99, 0.5);
		border: 1px solid #836c4c;
		opacity: 0.3;
		border-radius: 6px;
		position: absolute;
		top: 93px;
		left: 50%;
		input {
			width: 550px;
			height: 48px;
			box-sizing: border-box;
			padding-left: 23px;
			padding-right: 55px;
			border: 1px solid rgba(131, 108, 76, 0.3);
			// opacity: 0.3;
			border-radius: 6px;

			&::placeholder {
				font-size: 16px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #836c4c;
				opacity: 0.8;
			}
		}
		.search {
			position: absolute;
			width: 22px;
			height: 22px;
			top: 0;
			bottom: 0;
			right: 31px;
			margin: auto;
		}
	}
}

.combineContent {
	transform: translateY(-50px);
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

.prodList {
	.prodItem {
		height: 76px;
		font-size: 16px;
		font-family: Heiti SC;
		font-weight: 500;
		color: 30333B;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 50px;
		border-bottom: 1px solid rgba(154, 154, 156, 0.2);

		&.head {
			height: 60px;
			background: rgba(173, 181, 193, 0.05);
			border: 1px solid #e9e9e9;
			border-radius: 6px 6px 0px 0px;
			color: #9a9a9c;
		}
		&:last-child {
			border: none;
		}

		.ths {
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			&:nth-child(1) {
				width: 220px;
				flex-shrink: 0;
				text-align: left;
			}
			&:nth-child(2),
			&:nth-child(3),
			&:nth-child(4),
			&:nth-child(6),
			&:nth-child(7),
			&:nth-child(9) {
				width: 76px;
				flex-shrink: 0;
			}
			&:nth-child(5) {
				width: 160px;
				flex-shrink: 0;
			}
			&:nth-child(8) {
				width: 160px;
				flex-shrink: 0;
			}
			&:nth-child(10) {
				width: 100px;
				flex-shrink: 0;
				&.can {
					color: #eaba63;
					display: none;
				}
			}
		}
		&.valid {
			&:hover {
				color: #eaba63;
				background: rgba(234, 186, 99, 0.1);
				.can {
					width: 83px;
					height: 36px;
					background: #eaba63;
					border-radius: 6px;

					color: #fff;
					line-height: 36px;
					margin-left: 20px;
				}
			}
			.can {
				display: block !important;
			}
			.ths {
				&:nth-child(5) {
					color: #eaba63 !important;
				}
			}
		}
		&.notValid {
            pointer-events: none;
			color: #9a9a9c;
			.ths {
				&:nth-child(5) {
					color: #eaba63 !important;
				}
			}
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

.model {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	display: flex;
	// align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.6);
	overflow-y: scroll;
	.modelContent {
		padding: 0 38px;
		position: relative;
		margin: 100px auto 0;
		.el-icon {
			position: absolute;
			right: 0;
			top: 0;
			color: #fff;
			font-size: 18px;
		}
		.yuyue {
			width: 500px;
			height: 259px;
			background-image: url(/img/yuyuebg.png);
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 100% 100%;
			padding: 49px;
			box-sizing: border-box;
			h3 {
				font-size: 24px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #eaba63;
				margin-bottom: 27px;
				margin-top: 0;
			}
			p.desc {
				font-size: 18px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #30333b;
				margin: 0;
				margin-bottom: 10px;
			}
			p.title {
				font-size: 18px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #30333b;
				margin: 0;
				margin-bottom: 40px;
			}
		}
		.button {
			width: 180px;
			height: 44px;
			background: linear-gradient(163deg, #e1ad4f, #eaba63, #e0af56);
			box-shadow: 0px 3px 0px 0px #dea949;
			border-radius: 12px;
			margin: 0 auto;
			text-align: center;
			line-height: 44px;
			font-size: 18px;
			font-family: Heiti SC;
			font-weight: 500;
			color: #ffffff;
			cursor: pointer;
		}
		.agreement {
			width: 597px;
			height: 766px;
			background-image: url(/img/agreement.png);
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 100% 100%;
			padding: 30px;
			box-sizing: border-box;
			.logo {
				width: 161px;
				height: 47px;
				margin-bottom: 32px;
			}
			.agCon {
				width: 100%;
				height: 488px;
				background: #ffffff;
				box-shadow: 0px 4px 2px 0px rgba(234, 186, 99, 0.5);
				border-radius: 12px;
				overflow-y: scroll;
				padding: 26px;
				box-sizing: border-box;
				&::-webkit-scrollbar {
					width: 4px;
					background: #eaba63;
					opacity: 0.5;
					border-radius: 2px;
				}
				h1 {
					margin: 0 auto 20px;
					text-align: center;
					font-size: 20px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #30333b;
				}
				p {
					margin: 0 auto 6px;
					text-indent: 32px;
					font-size: 14px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #30333b;
					&.red {
						color: #ec5e2a;
					}
				}
			}
			.checkBox {
				margin-top: 25px;
				margin-bottom: 29px;
				img {
					width: 18px;
					height: 18px;
					vertical-align: middle;
					margin-right: 10px;
				}
				span {
					line-height: 18px;
					font-size: 14px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #9a9a9c;
					&.yel {
						color: #eaba63;
					}
				}
			}
		}
	}
}
</style>
