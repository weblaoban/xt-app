<template>
	<mainHeader title="联系我们"></mainHeader>
	<div class="footer">
		<div class="container">
			<img src="/img/logo.png" alt="" class="logo" />
			<div class="footerLeft">
				<div class="linkInfo">
					<p class="linkTitle">联系方式</p>
					<ul>
						<li>客服电话：0571-86012055</li>
						<li>客服邮箱：hlxintuo@163.com</li>
						<li>服务时间：9:00-12:00</li>
						<li>公司地址：浙江省杭州市上城区太平门直街213号</li>
					</ul>
				</div>
			</div>
			<div class="footerRight">
				<!-- <div class="imgCon">
					<div class="imgBg">
						<img src="/img/code.png" alt="" />
					</div>
					<p>微信公众号</p>
				</div> -->
				<div class="imgCon">
					<div class="imgBg">
						<img src="/img/code1.png" alt="" />
					</div>
					<p>微信公众号</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import mainHeader from "../common/header.vue";
export default {
	data() {
		return {
			mainHeader,
		};
	},
	components: {
		mainHeader,
	},
};
</script>
<style lang="scss" scoped>
.footer {
	background: #fefefe;
	height: 100%;
	.container {
		.logo {
			height: 0.93rem;
			margin-bottom: 0.5rem;
			margin-top: 0.8rem;
		}
	}
	.footerLeft {
		padding: 0.4rem 0;
		background: #fefefe;
		box-shadow: 0rem 0rem 0.1rem 0rem rgba(48, 51, 59, 0.2);
		border-radius: 0.06rem;
		margin-bottom: 0.22rem;
		.linkTitle {
			font-size: 0.36rem;
			font-family: Heiti SC;
			font-weight: 500;
			color: #30333b;
			line-height: 1;
			position: relative;
			padding-left: 0.4rem;
			margin-top: 0;
			&::after {
				content: "";
				display: block;
				width: 0.1rem;
				height: 0.32rem;

				background: #eaba63;
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				margin: auto;
			}
		}
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			li {
				list-style: none;
				margin: 0;
				padding: 0 0 0 0.4rem;
				font-size: 18px;

				font-size: 0.3rem;
				font-family: PingFang SC;
				font-weight: 400;
				color: #30333b;
				margin-bottom: 0.3rem;
			}
		}
	}

	.footerRight {
		background: #fefefe;
		box-shadow: 0rem 0rem 0.1rem 0rem rgba(48, 51, 59, 0.2);
		border-radius: 0.06rem;
		padding: 0.5rem;
		box-sizing: border-box;
		display: flex;
		.imgCon {
			&:first-child {
				margin-right: 0.5rem;
			}
			.imgBg {
				padding: 0.28rem;
				background: rgba(234, 186, 99, 0.31);
				img {
					width: 2rem;
					height: 2rem;
				}
			}
			p {
				text-align: center;
				font-size: 0.24rem;
				font-family: PingFang SC;
				font-weight: 400;
				color: #9a9a9c;
				margin: 0;
				margin-top: 0.2rem;
			}
		}
	}
}
</style>
