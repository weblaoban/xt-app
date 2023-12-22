<template>
	<div class="prodDetail">
		<main-header title="产品购买详情"></main-header>
		<div class="banner"></div>
		<div class="prodDetailCon">
			<div class="container">
				<div class="section1">
					<div :class="{ productItem: true, finish: detail.status == 3 }">
						<div :class="'title ' + 'title' + detail.state">
							{{ detail.name }}
						</div>
						<div class="descCon">
							<div class="desc">持有金额</div>
							<div class="desc">业绩比较基准</div>
						</div>
						<div class="descCon">
							<p class="count">{{ detail.amount || 0 }} <span>元</span></p>
							<p class="count">{{ detail.brief || 0 }}<span>%</span></p>
						</div>
						<div class="line"></div>
						<div class="duration">
							<span
								>成立时间：{{
									detail.otime ? detail.otime.split(" ")[0] : ""
								}}</span
							>
							<span
								>到期时间：{{
									detail.dtime ? detail.dtime.split(" ")[0] : ""
								}}</span
							>
						</div>
					</div>
				</div>

				<div class="section2">
					<div class="title">回款计划</div>
					<div class="progress">
						<div
							class="progressItem"
							v-for="(item, index) in detail.qlist"
							:key="item"
						>
							{{ index + 1 }}
							{{ item.desc }}

							<span v-if="item.finish" class="state finish">已兑付</span>
							<span v-if="!item.finish" class="state">未开始</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import mainHeader from "../common/header.vue";
import { getBuyDetail } from "@/api/user.js";
export default {
	name: "jeZi",
	components: {
		mainHeader,
	},
	data() {
		return {
			detail: {},
			loading: false,
		};
	},
	computed: {
		...mapGetters(["userInfo"]),
	},
	created() {
		this.getDetail();
	},
	mounted() {},
	methods: {
		getDetail() {
			const id = this.$route.params.id;
			getBuyDetail(id).then(({ data }) => {
				if (data.success) {
					data.data.qlist = data.data.qlist ? JSON.parse(data.data.qlist) : [];
					this.detail = data.data;
				}
			});
		},
	},
};
</script>

<style lang="scss">
.prodDetail {
	padding-bottom: 0.5rem;
	box-sizing: border-box;
	background: #f8fafb;
	.banner {
		width: 100%;
		height: 3.3rem;
		background: linear-gradient(
			0deg,
			rgba(161, 196, 253, 0.5),
			rgba(194, 233, 251, 0.5)
		);
	}
	.prodDetailCon {
		margin-top: -3rem;
	}
	.section1 {
		margin-bottom: 0.2rem;

		.baseInfo {
			float: left;
			width: 740px;
			height: 366px;
			background-image: url(/img/prod2.png);
			background-size: 653px 249px;
			background-position: left bottom;
			background-repeat: no-repeat;
			padding: 40px;
			box-sizing: border-box;
			font-size: 30px;
			font-family: Heiti SC;
			font-weight: 500;
			color: #30333b;
			h4 {
				margin: 0;
				margin-bottom: 100px;
			}
			ul,
			li {
				list-style: none;
				margin: 0;
				padding: 0;
			}
			ul {
				height: 70px;
			}
			li {
				width: 25%;
				height: 70px;
				float: left;
				border-right: 1px solid #ebebeb;
				box-sizing: border-box;
				padding-left: 30px;
				&:last-child {
					border: none;
				}
				.label {
					font-size: 18px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #9a9a9c;
					margin-bottom: 20px;
				}
				.con {
					font-size: 24px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #eaba63;
				}
			}
		}
		.zixun {
			width: 460px;
			height: 366px;
			float: right;
			background-image: url(/img/prod1.png);
			background-size: 460px 366px;
			background-position: center center;
			background-repeat: no-repeat;
			box-sizing: border-box;
			padding: 40px;
			h5 {
				font-size: 18px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #30333b;
				margin: 0;
				margin-bottom: 20px;
			}
			p {
				font-size: 18px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #30333b;
				margin: 0;
				margin-bottom: 20px;
			}
		}

		.el-textarea {
			box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.09);
			border-radius: 12px;
			border: none;
			textarea {
				border: none;
				box-shadow: none !important;
				outline: none;
			}
		}
		.button {
			height: 0.76rem;
			background: linear-gradient(163deg, #e1ad4f, #eaba63, #e0af56);
			box-shadow: 0px 0.05rem 0px 0px #dea949;

			border-radius: 0.12rem;
			margin: 0.3rem auto 0;
			text-align: center;
			line-height: 0.76rem;
			font-size: 0.32rem;
			font-family: Heiti SC;
			font-weight: 500;
			color: #ffffff;
			cursor: pointer;
		}
	}
	.section2 {
		padding: 0.2rem 0.1rem 0.82rem;
		box-sizing: border-box;
		background: #ffffff;
		border-radius: 0.12rem;
		.title {
			font-size: 0.3rem;
			font-family: Heiti SC;
			font-weight: 500;
			color: #eaba63;
			line-height: 0.64rem;
			border-bottom: 1px solid rgba(234, 186, 99, 0.2);
			position: relative;
			padding-left: 0.11rem;
			box-sizing: border-box;
			margin-bottom: 0.2rem;
			&::after {
				content: "";
				display: block;
				width: 1.4rem;
				height: 0.04rem;
				background: #eaba63;
				position: absolute;
				bottom: 0;
				left: 0.11rem;
			}
		}

		.el-col {
			margin: 0;
			&:first-child {
				.infoDesc {
					font-weight: 500;
				}
			}
			&:nth-child(10) {
				.infoDesc {
					color: #eaba63;
				}
			}
		}
		.el-row {
			width: 100%;
			margin: 0 auto 0.8rem;
			border: 1px solid #ebebeb;
			border-bottom: none;
		}
		.infoItem {
			border-bottom: 1px solid rgba(235, 235, 235, 1);
			height: 0.5rem;

			.infoLabel {
				width: 1.5rem;
				height: 0.5rem;
				line-height: 0.5rem;
				background: rgba(173, 181, 193, 0.1);

				font-size: 0.2rem;
				font-family: Heiti SC;
				font-weight: 500;
				color: #30333b;
				text-align: center;
				float: left;
			}
			.infoDesc {
				padding-right: 0.24rem;
				box-sizing: border-box;
				font-size: 0.2rem;
				font-family: Heiti SC;
				font-weight: 500;
				color: #30333b;
				float: left;
				text-align: right;
				line-height: 0.5rem;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				width: calc(100% - 1.5rem);
			}
		}
	}
}

.detailCon {
	img {
		max-width: 100%;
	}
}

.progress {
	width: 100%;
	// background: rgba(234, 186, 99, 0.1);
	// border: 1px solid #eaba63;
	border-radius: 0.12rem;
	box-sizing: border-box;
	margin-bottom: 0.8rem;

	padding: 0 0.25rem;
	.progressItem {
		line-height: 1.5;
		border-bottom: 1px dashed rgba(235, 235, 235, 1);
		font-size: 0.2rem;
		font-family: PingFang SC;
		font-weight: 400;
		color: #30333b;
		width: 100%;
		padding: 0.14rem 1rem 0.14rem 0;
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		.state {
			display: block;
			height: 0.3rem;
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			font-size: 0.18rem;
			font-family: PingFang SC;
			font-weight: 400;
			color: #80c269;
			opacity: 0.5;
			&.finish {
				color: #9a9a9c;
			}
		}
		&:last-child {
			border: none;
		}
	}
}

.productItem {
	width: 100%;
	background: #ffffff;
	box-shadow: 0rem 0rem 0.1rem 0rem rgba(234, 186, 99, 0.15);
	border-radius: 0.06rem;
	padding: 0.2rem 0.3rem 0.5rem;
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
		font-size: 0.36rem;
		font-family: PingFang SC;
		font-weight: 400;
		color: #eaba63;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
		color: #9a9a9c;
		box-sizing: border-box;
		padding-left: 0.1rem;
		span {
			float: right;
			font-size: 0.24rem;
			font-family: PingFang SC;
			font-weight: 400;
			&:first-child {
				float: left;
			}
		}
	}
	&:last-child {
		margin: 0;
	}

	&.finish {
		color: #9a9a9c !important;
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
		.close {
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			bottom: -1rem;
			z-index: 2;
			width: 0.64rem;
			height: 0.64rem;
			cursor: pointer;
		}
		.yuyue {
			width: 6.5rem;
			height: 4rem;
			background-image: url(/img/yuyuebg.png);
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 100% 100%;
			padding: 0.6rem;
			box-sizing: border-box;
			position: relative;
			h3 {
				font-size: 0.34rem;
				font-family: Heiti SC;
				font-weight: 500;
				color: #eaba63;
				margin-bottom: 0.5rem;
				margin-top: 0;
			}
			p.desc {
				font-size: 0.24rem;
				font-family: Heiti SC;
				font-weight: 500;
				color: #30333b;
				margin: 0;
				margin-bottom: 0.2rem;
			}
			p.title {
				font-size: 0.24rem;
				font-family: Heiti SC;
				font-weight: 400;
				color: #30333b;
				margin: 0;
				margin-bottom: 0.6rem;
			}
		}
		.button {
			width: 100%;
			height: 0.76rem;
			background: linear-gradient(163deg, #e1ad4f, #eaba63, #e0af56);
			box-shadow: 0px 0.03rem 0px 0px #dea949;
			border-radius: 0.12rem;
			margin: 0 auto;
			text-align: center;
			line-height: 0.76rem;
			font-size: 0.32rem;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
			cursor: pointer;
		}
		.agreement {
			width: 6.5rem;
			height: 8.8rem;
			background-image: url(/img/agreement.png);
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 100% 100%;
			padding: 0.3rem;
			box-sizing: border-box;
			position: relative;
			.logo {
				// width: 1.78rem;
				height: 0.52rem;
				margin-bottom: 0.32rem;
			}
			.agCon {
				width: 100%;
				height: 5.4rem;
				background: #ffffff;
				box-shadow: 0px 0.04rem 0.02rem 0px rgba(234, 186, 99, 0.5);
				border-radius: 0.12rem;
				overflow-y: scroll;
				padding: 0.24rem;
				box-sizing: border-box;
				&::-webkit-scrollbar {
					width: 0.04rem;
					background: #eaba63;
					opacity: 0.5;
					border-radius: 0.02rem;
				}
				h1 {
					margin: 0 auto 0.2rem;
					text-align: center;
					font-size: 0.24rem;
					font-family: Heiti SC;
					font-weight: 500;
					color: #30333b;
				}
				p {
					margin: 0 auto 0.06rem;
					text-indent: 0.32rem;
					font-size: 0.2rem;
					font-family: Heiti SC;
					font-weight: 500;
					color: #30333b;
					&.red {
						color: #ec5e2a;
					}
				}
			}
			.checkBox {
				margin-top: 0.25rem;
				margin-bottom: 0.29rem;
				img {
					width: 0.24rem;
					height: 0.24rem;
					vertical-align: middle;
					margin-right: 0.1rem;
				}
				span {
					line-height: 1.5;
					font-size: 0.2rem;
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
