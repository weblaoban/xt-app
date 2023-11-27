<template>
	<div class="index-container">
		<main-header :active="0"></main-header>
		<div class="bannerContent">
			<el-carousel
				ref="car"
				:initial-index="0"
				v-show="bannerList.length"
				height="500px"
				direction="vertical"
				:autoplay="true"
			>
				<el-carousel-item v-for="item in bannerList" :key="item">
					<div
						class="carouseCard"
						:style="'background-image:url(' + item.imgUrl + ')'"
					></div>
				</el-carousel-item>
			</el-carousel>
			<!-- 已经登陆啦 -->
			<div class="loginContent haslogin">
				<img src="/img/welcome.png" alt="" class="welcom" />
				<div class="username">欢迎，张先生</div>
				<div class="phoneinfo">13888888888</div>
				<div class="button" @click="onModifyPassword">修改密码</div>
				<div class="button gray" @click="onModifyPassword">退出登录</div>
			</div>
			<!-- 未登录 -->
			<div
				class="loginContent"
				v-if="!showRegister && !showModifyPass && !userInfo.name"
			>
				<h4 class="loginTitle">登录</h4>
				<div class="inputItem">
					<input
						v-model="userName"
						class="input"
						id="userName"
						type="text"
					/><label class="placeholder" for="userName" v-show="!userName"
						>您的手机号</label
					>
					<div class="cut" v-show="!userName"></div>
				</div>
				<div class="inputItem">
					<input
						v-model="passWord"
						class="input"
						id="passWord"
						type="password"
					/><label class="placeholder" for="passWord" v-if="!passWord"
						>登录密码</label
					>
					<div class="cut" v-if="!passWord"></div>
				</div>
				<div class="button" @click="onLogin">立即登录</div>
				<div class="other">
					<p @click="goRegister">还没有账号？ <span>立即注册</span></p>
					<p @click="onForgetPassword">忘记密码</p>
				</div>
			</div>
		</div>
		<div class="cardContainer">
			<div class="container">
				<div class="cardContent">
					<div class="cardItem" v-for="item in cardItem" :key="item.id">
						<img :src="item.img" alt="" />
						<div class="cardDesc">
							<p class="title">{{ item.title }}</p>
							<p class="desc">{{ item.desc }}</p>
						</div>
					</div>
				</div>
				<div class="cardline"></div>
				<div class="amount">
					<div class="amountItem">
						累计交易<span>{{ amount }}</span
						>万元
					</div>
					<div class="amountItem">
						累计交易<span>{{ amount }}</span
						>万元
					</div>
					<div class="customer" @click="showContact = true">
						<img src="/img/message.png" alt="" />在线客服
					</div>
				</div>
			</div>
		</div>
		<div class="productC">
			<div class="productContent product1">
				<div class="container">
					<div class="productTitle"><span>信托产品</span></div>
					<div class="products">
						<div class="productItem" v-for="item in product1" :key="item.id">
							<div class="title">{{ item.name }}</div>
							<div class="desc">产品收益</div>
							<p class="count">9.7 <span>%</span></p>
							<div class="line"></div>
							<div class="duration">产品期限：{{item.investLimitId}}</div>
							<div class="button" @click="goDetail(item,1)">立即查看</div>
						</div>
					</div>
				</div>
			</div>
			<div class="productContent product2">
				<div class="container">
					<div class="productTitle">集合资管</div>
					<div class="products">
						<div class="productItem" v-for="item in product2" :key="item">
							<div class="title">{{ item.name }}</div>
							<div class="desc">产品收益</div>
							<p class="count">9.7 <span>%</span></p>
							<div class="line"></div>
							<div class="duration">产品期限：{{item.investLimitId}}</div>
							<div class="button" @click="goDetail(item,2)">立即查看</div>
						</div>
					</div>
				</div>
			</div>
			<div class="productContent product3">
				<div class="container">
					<div class="productTitle">私募基金</div>
					<div class="products">
						<div class="productItem" v-for="item in product3" :key="item">
							<div class="title">{{ item.name }}</div>
							<div class="desc">产品收益</div>
							<p class="count">9.7 <span>%</span></p>
							<div class="line"></div>
							<div class="duration">产品期限：{{item.investLimitId}}</div>
							<div class="button" @click="goDetail(item,3)">立即查看</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 客户咨询 -->
		<div class="contact" v-if="showContact">
			<div class="contactTitle">客户咨询</div>
			<img
				class="close el-icon-close"
				@click="showContact = false"
				src="/img/close.png"
				alt=""
			/>

			<div class="contactCon">
				<div class="contactTips">
					您好，请务必留下您的联系方式，客服会 根据您的问题及时回电
				</div>
				<div class="contactItem">
					<p class="label">姓名</p>
					<input v-model="contact.name" type="text" />
				</div>
				<div class="contactItem">
					<p class="label">手机号</p>
					<input v-model="contact.tel" type="text" />
				</div>
				<div class="contactItem">
					<p class="label">咨询内容</p>
                    <textarea resize="none" v-model="contact.content" name="" class="textarea" id="" cols="30" rows="4"></textarea>
				
				</div>
				<div class="button" @click="sendComm">提交</div>
			</div>
		</div>
		<div class="aboutUs">
			<div class="container">
				<div class="menuCard">
					<div class="menuCardItem"><span>信托问答</span></div>
					<div class="menuCardItem"><span>信托资讯</span></div>
					<div class="menuCardItem"><span>关于我们</span></div>
				</div>
				<div class="company">
					<h4>合作伙伴</h4>
					<img src="/img/companyBg.png" alt="" class="companyBg" />
					<div class="partner">
						<div v-for="(item, index) in 6" :key="item" class="partnerItem">
							<img :src="'/img/company' + index + '.png'" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<main-footer></main-footer>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import mainFooter from "../common/footer.vue";
import mainHeader from "../common/header.vue";
import {addComment} from '@/api/index.js'
import { zxlist, list } from "@/api/prod.js";
export default {
	name: "wel",
	components: {
		mainFooter,
		mainHeader,
	},
	data() {
		return {
			showContact: false,
			cardItem: [
				{
					title: "财富增值",
					desc: "稳健安全的资产配置",
					id: 0,
					img: "/img/icon1.png",
				},
				{
					title: "产品安全",
					desc: "专业风控团队优中优选",
					id: 0,
					img: "/img/icon2.png",
				},
				{
					title: "全面覆盖",
					desc: "信托资管私募全面覆盖",
					id: 0,
					img: "/img/icon3.png",
				},
				{
					title: "专业服务",
					desc: "专业服务经理1对1服务",
					id: 0,
					img: "/img/icon4.png",
				},
			],
			amount: 111,
			menuList: [
				{
					name: "首页",
					icon: "/img/home.png",
				},
				{
					name: "信托集合",
				},
				{
					name: "集合资管",
				},
				{
					name: "私募基金",
				},
				{
					name: "集合保险",
					notOpen: true,
				},
				{
					name: "信托问答",
				},
				{
					name: "信托资讯",
				},
				{
					name: "关于我们",
				},
			],
			contact: {
				name: "",
				tel: "",
				content: "",
			},
			userName: "",
			passWord: "",
			bannerList: [],
			product1: [],
			product2: [],
			product3: [],
            loading:false
		};
	},
	computed: {
		...mapGetters(["userInfo"]),
	},
	created() {
		this.getBannerList();
		this.getProdList();
	},
	methods: {
		getBannerList() {
			zxlist({ categoryId: 11 }).then((res) => {
				console.log(res);
				if (res && res.status === 200) {
					this.bannerList = res.data.data.records;
					this.$refs.car.setActiveItem(0);
				}
			});
		},
		getProdList() {
			list({ categoryId: 97, soldNum: 1,status:-1 }).then((res) => {
				if (res && res.status === 200) {
                    console.log(res.data.data.records)
					this.product1 = res.data.data.records;
				}
			});
			list({ categoryId: 98, soldNum: 1,status:-1 }).then((res) => {
				if (res && res.status === 200) {
					this.product2 = res.data.data.records;
				}
			});
			list({ categoryId: 99, soldNum: 1,status:-1}).then((res) => {
				if (res && res.status === 200) {
					this.product3 = res.data.data.records;
				}
			});
		},
		onLogin() {
			const { userName, passWord } = this;
			if (!userName) {
				document.getElementById("userName").focus();
				return;
			}
			if (!passWord) {
				document.getElementById("passWord").focus();
				return;
			}
			this.$store
				.dispatch("LoginByUsername", { username: userName, password: passWord })
				.then(() => {
					this.$store.dispatch("GetUserInfo");
				});
		},
		goRegister() {
			this.$router.push("/register");
		},
		onModifyPassword() {
			this.$router.push("/updatePassword");
		},
		onForgetPassword() {
			this.$router.push("/forgetPassword");
		},
        sendComm(){
            if(this.loading){
                return;
            }
            const {name,tel,content} = this.contact;
            if(!name||!tel||!content){
                return;
            }
            this.loading = true;
            addComment({...this.contact}).then(res=>{
                const data = res.data;
                if(data && data.success){
                    this.$message.success('提交成功');
                    this.contact = {
				name: "",
				tel: "",
				content: "",
			}
            this.showContact = false
            this.loading = false;
                }
            }).catch(()=>{
                
            this.loading = false;
            })
        },

        goDetail(row,type){
this.$router.push({
    path:'/prodDetail/'+row.id,
    query:{
        type
    }
})
        }
	},
};
</script>

<style lang="scss">
.cardContainer {
	background: #fff;
	.cardContent {
		height: 144px;
		.cardItem {
			width: 25%;
			height: 100%;
			padding: 40px 0;
			box-sizing: border-box;
			float: left;
			display: flex;
			align-items: center;
			img {
				width: 64px;
				height: 64px;
				margin-left: 13px;
			}
			.cardDesc {
				.title {
					font-size: 24px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #eaba63;
				}
				.desc {
					font-size: 16px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #9a9a9c;
				}
			}
		}
	}
	.cardline {
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, #fff, #e9b963, #ffffff);
		opacity: 0.2;
	}
	.amount {
		height: 105px;
		position: relative;
		.customer {
			width: 189px;
			height: 60px;
			background: #ec5e2a;
			box-shadow: 0px 3px 5px 0px rgba(115, 89, 41, 0.5);
			border-radius: 12px;

			font-size: 20px;
			font-family: Heiti SC;
			font-weight: 500;
			color: #ffffff;
			position: absolute;
			right: 0;
			bottom: -30px;
			padding-left: 30px;
			display: flex;
			align-items: center;
			line-height: 1;
			box-sizing: border-box;
			img {
				width: 36px;
				height: 36px;
				margin-right: 14px;
			}
		}
		.amountItem {
			width: 50%;
			text-align: center;
			float: left;

			font-size: 18px;
			font-family: Heiti SC;
			font-weight: 500;
			padding: 30px 0 50px;
			box-sizing: border-box;
			color: #9a9a9c;
			span {
				font-size: 33px;
				font-family: Arial;
				font-weight: 400;
				color: #eaba63;
			}
		}
	}
}
.productContent {
	padding: 80px 0;
	background: #f8f8f8;
	&:nth-child(2n) {
		background: #ffffff;
	}
	.productTitle {
		font-size: 36px;
		font-family: Heiti SC;
		font-weight: 500;
		color: #30333b;
		text-align: center;
		margin-bottom: 89px;
		line-height: 35px;
		&:after {
			content: "";
			display: block;
			width: 150px;
			height: 10px;
			background: linear-gradient(90deg, #69adff, #f68036);
			opacity: 0.5;
			left: 0;
			right: 0;
			bottom: 30px;
			margin: auto;
			transform: translateY(-10px);
			z-index: 0;
		}
	}
	.products {
		display: flex;
		// justify-content: space-between;
		.productItem {
			width: 280px;
			height: 377px;
			background: #ffffff;
			box-shadow: 0px 0px 21px 9px rgba(66, 142, 230, 0.1);
			border-radius: 12px;
			text-align: center;
            margin-right:27px;
			.title {
				height: 94px;
				background: linear-gradient(0deg, #89f7fe, #66a6ff);
				border-radius: 12px 12px 0px 0px;
				text-align: center;
				line-height: 94px;
				font-size: 24px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #ffffff;
				text-align: center;  margin-bottom: 20px;
			}
			&:nth-child(2n) {
				box-shadow: 0px 0px 21px 9px rgba(252, 106, 74, 0.1);
				.title {
					background: linear-gradient(0deg, #f28e26, #fd644f);
				}
			}
			.desc {
				font-size: 16px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #9a9a9c;
			}
			.count {
				font-size: 48px;
				font-family: Arial;
				font-weight: 400;
				color: #eaba63;
				margin: 9px 0 30px;
				span {
					font-size: 24px;
					font-weight: 400;
				}
			}
			.line {
				width: 238px;
				border-bottom: 1px dashed #9a9a9c;

				margin: 31px auto 20px;
			}
			.duration {
				font-size: 16px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #30333b;
				margin-bottom: 30px;
			}
			.button {
				width: 240px;
				height: 54px;
				line-height: 54px;
			}
            &:last-child{
                margin:0;
            }
		}
	}
}

.product2 {
    .productTitle{
        
		&:after {
background: linear-gradient(90deg, #F1954C, #938BE4);
		}
    }
	.products {
		.productItem {
			box-shadow: 0px 0px 21px 9px rgba(234, 186, 99, 0.1);
			.title {
				background: linear-gradient(0deg, #fad126, #f39800);
			}
			&:nth-child(2n) {
				box-shadow: 0px 0px 21px 9px rgba(130, 135, 222, 0.1);
				.title {
					background: linear-gradient(0deg, #7683d9, #d8a0fe);
				}
			}
		}
	}
}
.product3 {
    .productTitle{
        
		&:after {
background: linear-gradient(90deg, #FE924E, #3AE9BB);
		}
    }
	.products {
		.productItem {
			box-shadow: 0px 0px 21px 9px rgba(252, 107, 109, 0.1);
			.title {
				background: linear-gradient(90deg, #ff934c, #fc686f);
			}
			&:nth-child(2n) {
				box-shadow: 0px 0px 21px 9px rgba(60, 231, 188, 0.1);
				.title {
					background: linear-gradient(90deg, #38ebba, #6fb1d2);
				}
			}
		}
	}
}

.aboutUs {
	background: #ffffff;
	padding: 80px 0;
	.menuCard {
		display: flex;
		justify-content: space-between;
		.menuCardItem {
			width: 380px;
			height: 200px;
			background: #000000;
			opacity: 0.6;
			border-radius: 12px;
			position: relative;
			&:nth-child(1) {
				background-image: url(/img/help1.png);
				background-size: 100% 100%;
				background-position: center center;
				background-repeat: no-repeat;
			}
			&:nth-child(2) {
				background-image: url(/img/help2.png);
				background-size: 100% 100%;
				background-position: center center;
				background-repeat: no-repeat;
			}
			&:nth-child(3) {
				background-image: url(/img/help3.png);
				background-size: 100% 100%;
				background-position: center center;
				background-repeat: no-repeat;
			}
			span {
				font-size: 42px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #ffffff;
				position: absolute;
				bottom: 34px;
				right: 39px;
			}
		}
	}

	.company {
		position: relative;
		margin-top: 80px;
		h4 {
			margin: 0;
			text-align: center;
			font-size: 36px;
			font-family: Heiti SC;
			font-weight: 500;
			color: #30333b;
		}
		.companyBg {
			position: absolute;
			top: 60px;
			left: 0;
			right: 0;
			margin: auto;
			width: 532px;
		}
		.partner {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			.partnerItem {
				margin-right: 54px;
				&:nth-child(4n) {
					margin: 0;
				}
				img {
					height: 105px;
				}
			}
		}
	}
}

.contact {
	width: 380px;
	height: 554px;
	background: #ffffff;
	box-shadow: 0px 3px 5px 0px rgba(105, 105, 105, 0.5);
	border-radius: 6px;
	position: relative;
	box-sizing: border-box;
	position: fixed;
	top: 200px;
	z-index: 400;

	right: calc(50% - 600px);
	.contactCon {
		padding: 20px 30px;
		box-sizing: border-box;
	}
	.contactTitle {
		height: 43px;
		background: #dea949;
		border-radius: 6px 6px 0px 0px;
		font-size: 18px;
		font-family: Heiti SC;
		font-weight: 500;
		color: #ffffff;
		line-height: 43px;
		text-align: center;
	}
	.close {
		position: absolute;
		z-index: 2;
		top: 17px;
		right: 18px;
		color: #fff;
		font-size: 17px;
		z-index: 2;
		width: 18px;
		height: 18px;
		cursor: pointer;
	}
	.contactTips {
		background: #fdf8ef;
		font-size: 16px;
		font-family: Heiti SC;
		font-weight: 500;
		color: #9a9a9c;
		line-height: 18px;
		padding: 15px;
		margin-bottom: 10px;
	}
	.contactItem {
		.label {
			font-size: 16px;
			font-family: Heiti SC;
			font-weight: 500;
			color: #9a9a9a;
			line-height: 18px;
			line-height: 26px;
			margin: 0 0 10px 0;
		}
		input {
			width: 100%;
			height: 40px;
			background: #f8f8f8;
			border-radius: 6px;
			border: none;
			outline: none;
			padding: 0 20px;
			box-sizing: border-box;
			&.textarea {
				height: 120px;
			}
		}
        textarea{
			width: 100%;
			background: #f8f8f8;
			border-radius: 6px;
			border: none;
			outline: none;
            resize: none;
			padding: 10px 20px;
            box-sizing: border-box;
        }
	}
	.button {
		width: 320px;
		margin-top: 20px;
	}
}

.button {
	width: 280px;
	height: 44px;
	background: linear-gradient(163deg, #e1ad4f, #eaba63, #e0af56);
	box-shadow: 0px 3px 0px 0px #dea949;
	border-radius: 8px;

	margin: 0 auto;
	font-size: 18px;
	font-family: Heiti SC;
	font-weight: 500;
	color: #ffffff;
	text-align: center;
	line-height: 44px;
	cursor: pointer;
}

.bannerContent .el-carousel__indicators--vertical {
	top: 50%;
	right: calc(50% - 520px);
	transform: translate(50%, -50%);
}
.bannerContent {
	position: relative;
	.carouseCard {
		width: 100%;
		height: 100%;
		background-image: url(/img/banner.png);
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
	}
	.el-carousel__indicator--vertical .el-carousel__button {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #fff;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
	.el-carousel__indicator--vertical {
		padding: 0;
		width: 38px;
		height: 38px;
		position: relative;
		border-radius: 50%;
		background: transparent;
		box-sizing: border-box;
		margin-bottom: 10px;
	}
	.el-carousel__indicator.is-active {
		border: 1px solid #fff;
	}
	.loginContent {
		position: absolute;
		top: 56px;
		right: calc(50% - 490px);
		width: 320px;
		height: 380px;
		background: #ffffff;
		box-shadow: 0px 0px 10px 10px rgba(234, 186, 99, 0.1);
		border-radius: 12px;
		&.haslogin {
			text-align: center;
			.welcom {
				display: block;
				margin: 0 auto;
				width: 128px;
				height: 36px;
				margin-top: 41px;
			}
			.username {
				margin: 40px auto 21px;
				font-size: 24px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #30333b;
			}
			.phoneinfo {
				font-size: 16px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #30333b;
			}
			.gray {
				margin-top: 0;
			}
		}
		&.register {
			.inputItem {
				margin-bottom: 10px;
				.phoneInfo {
					text-align: center;
					font-size: 16px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #30333b;
					margin: 40px auto;
					line-height: 18px;
					span {
						font-size: 18px;
						font-family: Heiti SC;
						font-weight: 500;
						color: #eaba63;
						margin-right: 4px;
					}
				}
				img {
					width: 18px;
					height: 18px;
					position: absolute;
					right: 10px;
					top: 10px;
				}
			}
			.loginTitle {
				margin-bottom: 30px;
			}
			.cut {
				opacity: 0;
			}
			.genderCon {
				display: flex;
				width: 280px;
				margin: 0 auto;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10px;
				.inputItem,
				.input {
					width: 150px;
					margin: 0;
				}
				.radio {
					position: relative;
					font-size: 14px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #30333b;
					margin-right: 6px;
				}
				input[type="checkbox"],
				input[type="radio"] {
					opacity: 0;
				}
				.radio-inner {
					width: 18px;
					height: 18px;
					box-sizing: border-box;
					padding: 0 8px;
					border-radius: 50%;
					position: absolute;
					border: 1px solid #d9d9da;
					top: 0;
					bottom: 0;
					left: -5px;
					margin: auto;
					&.active {
						&::after {
							content: "";
							display: block;
							position: absolute;
							top: 0;
							bottom: 0;
							left: 0;
							right: 0;
							margin: auto;
							width: 6px;
							height: 6px;
							border-radius: 6px;
							background: #30333b;
						}
					}
				}
			}
			.smscodeCon {
				display: flex;
				width: 280px;
				margin: 0 auto;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10px;
				.inputItem,
				.input {
					width: 190px;
					margin: 0;
				}
				.send {
					width: 70px;
					height: 39px;
					background: linear-gradient(5deg, #eaba63, #fac76c);
					border-radius: 8px;
					cursor: pointer;

					font-size: 14px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #ffffff;
					line-height: 39px;
					text-align: center;
				}
				.hasSend {
					width: 70px;
					height: 39px;
					background: #f8f8f8;
					border-radius: 8px;
					line-height: 39px;
					font-size: 14px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #30333b;
					text-align: center;
				}
			}
			.button {
				margin-top: 20px;
				margin-bottom: 0;
			}
		}
		.other {
			display: flex;
			justify-content: space-between;
			width: 280px;
			margin: 0 auto;
			p {
				font-size: 14px;
				font-family: Heiti SC;
				font-weight: 500;
				color: #9a9a9c;
				cursor: pointer;
				span {
					font-size: 14px;
					font-family: Heiti SC;
					font-weight: 500;
					color: #eaba63;
					margin-left: 10px;
				}
			}
		}
		.button {
			margin-top: 40px;
			margin-bottom: 20px;
		}
		.loginTitle {
			font-size: 20px;
			font-weight: 500;
			color: #30333b;
			position: relative;
			text-align: center;
			margin-bottom: 40px;
			&::after {
				position: absolute;
				content: "";
				display: block;
				width: 50px;
				height: 4px;
				background: #eaba63;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
			}
		}
		.cut {
			background-color: #fff;
			border-radius: 10px;
			height: 20px;
			left: 20px;
			position: absolute;
			top: -20px;
			transform: translateY(0);
			transition: transform 200ms;
			width: 76px;
		}
		.inputItem {
			position: relative;
			width: 280px;
			margin: 0 auto 22px;
		}
		.input {
			width: 280px;
			height: 40px;
			background: #ffffff;
			border: 1px solid #f3f2f8;
			border-radius: 8px;
			padding-left: 20px;
			box-sizing: border-box;
		}
		.placeholder {
			font-size: 14px;
			font-family: Heiti SC;
			font-weight: 500;
			color: #9a9a9c;

			left: 20px;
			line-height: 14px;
			pointer-events: none;
			position: absolute;
			transform-origin: 0 50%;
			transition: transform 200ms, color 200ms;
			top: 16px;
		}
		.input:focus ~ .cut {
			transform: translateY(8px);
		}
		.input:focus ~ .placeholder {
			transform: translateY(-24px) translateX(10px) scale(0.75);
			color: #dc2f55;
			z-index: 1;
		}
	}
}


</style>
