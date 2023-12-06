<template>
	<div class="index-container">
		<main-header title="瑔石信托网" :active="0"></main-header>
		<div class="bannerContent">
			<el-carousel
				ref="car"
				:initial-index="0"
				v-show="bannerList.length"
				height="3.57rem"
				:autoplay="true"
			>
				<el-carousel-item v-for="item in bannerList" :key="item">
                    <a v-if="item.link" :href="item.link">	<div
						class="carouseCard"
						:style="'background-image:url(' + item.imgUrl + ')'"
					></div></a>
					<div v-if="!item.link"
						class="carouseCard"
						:style="'background-image:url(' + item.imgUrl + ')'"
					></div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="cardContainer">
					<div class="customer" @click="showContact = true">
						<img src="/img/message.png" alt="" />
					</div>
			<div class="container">
				<div class="cardContent">
					<div class="cardItem" v-for="item in cardItem" :key="item.id">
                        <div class="cardMain">

                            <img :src="item.img" alt="" />
						<div class="cardDesc">
							<p class="title">{{ item.title }}</p>
							<p class="desc">{{ item.desc }}</p>
						</div>
                        </div>
					</div>
				</div>
				<div class="amount">
					<div class="amountItem">
						<span>{{ amount }}</span
						>万元<br/>累计交易
					</div>
					<div class="amountItem">
						<span>{{ amount }}</span
						>人<br/>累计服务客户
					</div>
				</div>
			</div>
		</div>
		<div class="productC">
			<div class="productContent product1">
				<div class="container">
					<div class="productTitle"><span>产品推荐</span></div>
					<div class="products">
						<div @click="goDetail(item)" :class="{productItem:true,finish:item.status==3}" v-for="item in product" :key="item.id">
							<div :class="'title '+'title'+item.categoryId">{{ item.name }}</div>
                            <div class="descCon">

                                <div class="desc">业绩比较基准</div>
							<div class="desc">投资门槛</div>
                            </div>
                            <div class="descCon">
							<p class="count">{{ item.brief || 0 }} <span>%</span></p>
							<p class="count"><span>{{ item.pmStand }}</span></p></div>
							<div class="line"></div>
							<div class="duration">产品期限：{{item.investLimitId}}</div>
                            <div class="tag" v-if="item.status==1||item.status==3"><img :src="'/img/h5/tag'+item.status+'.png'" alt=""></div>
						</div>
					</div>
				</div>
			</div>
            <div class="more" @click="goMore">查看更多</div>
		</div>
		<!-- 客户咨询 -->
        <div class="contentMask" v-if="showContact">
            
		<div class="contact">
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
        </div>

        <div class="phonel">客服电话：400-0000-000</div>

        <div class="loginBtn" v-if="!userInfo.id"><div class="button" @click="goLogin">登录</div><div class="button" @click="goRegister">注册</div></div>
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
			product: [],
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
				if (res && res.status === 200) {
					this.bannerList = res.data.data.records.filter(item=>item.imgUrl).sort((a,b)=>{return a.seq-b.seq});
					this.$refs.car.setActiveItem(0);
				}
			});
		},
		getProdList() {
			list({ categoryId: 97, soldNum: 1,status:-1 }).then((res) => {
				if (res && res.status === 200) {
                    console.log(res.data.data.records)
					this.product = this.product.concat(res.data.data.records);
				}
			});
			list({ categoryId: 98, soldNum: 1,status:-1 }).then((res) => {
				if (res && res.status === 200) {
					this.product = this.product.concat(res.data.data.records);
				}
			});
			list({ categoryId: 99, soldNum: 1,status:-1}).then((res) => {
				if (res && res.status === 200) {
					this.product = this.product.concat(res.data.data.records);
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
        goLogin(){
			this.$router.push("/login");
        },
        onLogout(){
            this.$store.dispatch('LogOut')
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
goMore(){
this.$router.push('/xtcombine')
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
.bannerContent{

	.el-carousel__button {
		width: 0.5rem;
		height: 2px;
background: #FFFFFF;
	}
	.el-carousel__indicator.is-active {
background: #EABA63;
border:none !important;
	}
    .el-carousel__indicator.is-active button{
background: #EABA63;

    }
    .el-carousel__indicator--horizontal{
        padding:0;
    }
    .el-carousel__indicators--horizontal{
        bottom:0.28rem;
    }
}
.cardContainer {
	background: #fff;width: 100%;
height: 4.8rem;
background: #F8FAFB;
box-sizing: border-box;
padding:0.3rem 0.2rem;
position:relative;

.customer {
			width: 0.76rem;
			height: 0.76rem;
			background: #ec5e2a;
			box-shadow: 0px 3px 5px 0px rgba(115, 89, 41, 0.5);
			border-radius: 0.12rem;

			font-family: Heiti SC;
			font-weight: 500;
			color: #ffffff;
			position: absolute;
			right: 0;
			top:1.3rem;
			padding-left: 0.1rem;
			display: flex;
			align-items: center;
			line-height: 1;
			box-sizing: border-box;
			img {
			width: 0.56rem;
			height: 0.56rem;
			}
		}

	.cardContent {
        height:2.7rem;
		.cardItem {
			width: 50%;
			padding: 0 0.1rem ;
			box-sizing: border-box;
			float: left;
            height:1.15rem;
            margin-bottom:0.2rem;
            .cardMain{

                height:1.15rem;
                display: flex;
			align-items: center;
background: #FFFFFF;
box-shadow: 0rem 0rem 0rem 0rem rgba(48,51,59,0.1);
border-radius: 0.06rem;
            }
			img {
				width: 0.64rem;
				height: 0.64rem;
				margin-right: 0.13rem;
			}
			.cardDesc {
                height:0.64rem;
				.title {
font-size: 0.28rem;
					font-family: Heiti SC;
					font-weight: 400;
					color: #eaba63;
                    margin:0;
                    margin-bottom:0.1rem;
				}
				.desc {
                    margin:0;
font-size: 0.2rem;
					font-family: Heiti SC;
					font-weight: 400;
					color: #9a9a9c;
				}
			}
		}
	}
	.amount {width: 6.7rem;
height: 1.29rem;
background: #EABA63;
box-shadow: 0rem 0rem 0rem 0rem rgba(48,51,59,0.1);
border-radius: 0.06rem;
margin:0 auto 0.5rem;
box-sizing: border-box;
padding:0.05rem 0;
		position: relative;
		.amountItem {
			width: 50%;
			text-align: center;
			float: left;

            font-size: 0.2rem;
			font-family: Heiti SC;
			font-weight: 500;
			padding: 0.27rem 0;
			box-sizing: border-box;
			color: #fff;
            &:first-child{
                border-right:1px solid RGBA(237, 194, 117, 1);
            }
			span {
font-size: 0.36rem;
				font-family: Arial;
				font-weight: 400;
				color: #fff;
			}
		}
	}
}
.productC{
	background: #fff;
    .more{
        width: 6.7rem;
height: 0.68rem;
line-height: 0.68rem;
background: #FFFFFF;
box-shadow: 0rem 0rem 0.1rem 0rem rgba(48,51,59,0.2);
border-radius: 0.06rem;
text-align: center;
font-size: 0.28rem;
font-family: PingFang SC;
font-weight: 400;
color: #EABA63;
margin:0.22rem auto 0.5rem;

    }
}
.productContent {
	padding: 0.5rem 0;
	&:nth-child(2n) {
		background: #ffffff;
	}
	.productTitle {
font-size: 0.36rem;
font-family: PingFang SC;
font-weight: 400;
color: #30333B;
		font-family: Heiti SC;
		font-weight: 500;
		color: #30333b;
		text-align: center;
		margin-bottom: 0.48rem;
		line-height: 1.5;
		&:after {
			content: "";
			display: block;width: 1.5rem;
height: 0.1rem;
background: #EABA63;
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
		.productItem {
			width: 100%;
height: 2.74rem;
background: #FFFFFF;
box-shadow: 0rem 0rem 0.1rem 0rem rgba(48,51,59,0.2);
border-radius: 0.06rem;
padding:0.2rem 0.3rem;
box-sizing: border-box;
position:relative;
margin-bottom:0.2rem;
.tag{
position:absolute;
width:0.83rem;
height:0.73rem;
top:0;
right:0;
img{
    width:100%;
    height:100%;
}
}
			.title {width: 4.71rem;
font-size: 0.32rem;
font-family: PingFang SC;
font-weight: 400;
color: #30333B;
margin-bottom:0.1rem;
box-sizing: border-box;
padding-left:1rem;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

background-image: url(/img/h5/title1.png);
background-repeat: no-repeat;
background-size: 0.92rem 0.3rem;
background-position: left center;
&.title98{
    
background-image: url(/img/h5/title2.png);
}
&.title99{
    
background-image: url(/img/h5/title3.png);
}


			}
			.desc {
                width:50%;
font-size: 0.24rem;
font-family: PingFang SC;
font-weight: 400;
color: #9A9A9C;
			}
            .descCon{
                display: flex;
            }
			.count {
                width:50%;
font-size: 0.52rem;
font-family: PingFang SC;
font-weight: 400;
color: #EABA63;
				margin: 0.1rem 0;
				span {
					font-size: 0.24rem;
					font-weight: 400;
				}
                &:nth-child(2){
                    
color: #30333B;
                }
			}
			.duration {width: 6.3rem;
height: 0.45rem;
background: linear-gradient(90deg, #F8FAFB, #FFFFFF);
font-size: 0.24rem;
font-family: PingFang SC;
font-weight: 400;
color: #9A9A9C;
box-sizing: border-box;
padding-left:0.1rem;

			}
            &:last-child{
                margin:0;
            }

            &.finish{
color: #9A9A9C !important;
            }



		}
	}
}

.phonel{

font-size: 0.2rem;
font-family: PingFang SC;
font-weight: 400;
color: #806B4B;
line-height: 0.24rem;
text-align: center;
margin-bottom:0.29rem;
}
.contentMask{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    overflow-y: scroll;
    background: rgba(0,0,0,0.5);
	z-index: 400;
}
.contact {
	width: 6.5rem;
	height: 9.28rem;
	background: #ffffff;
box-shadow: 0rem 0rem 0rem 0rem rgba(105,105,105,0.5);
border-radius: 0.12rem;
	position: relative;
	box-sizing: border-box;
	position: fixed;
	top: 1.4rem;
    left:0.5rem;
    margin:auto;

	right: 0.5rem;
	.contactCon {
		padding: 0.2rem 0.3rem;
		box-sizing: border-box;
	}
	.contactTitle {
		height: 0.8rem;
		background: #dea949;border-radius: 0.12rem 0.12rem 0rem 0rem;
		font-size: 0.32rem;
		font-family: Heiti SC;
		font-weight: 500;
		color: #ffffff;
		line-height: 0.8rem;
		text-align: center;
	}
	.close {
		position: absolute;
        left:0;
        right:0;
        margin:auto;
        bottom:-1rem;
		z-index: 2;
		width: 0.64rem;
		height: 0.64rem;
		cursor: pointer;
	}
	.contactTips {
		background: #fdf8ef;
font-size: 0.28rem;
		font-family: Heiti SC;
		font-weight: 500;
		color: #9a9a9c;
		padding: 0.26rem 0.3rem;
		margin-bottom: 0.3rem;
	}
	.contactItem {
		.label {
font-size: 0.28rem;
font-family: PingFang SC;
font-weight: 400;
color: #9A9A9A;
line-height: 0.31rem;
			margin: 0 0 0.2rem 0;
		}
		input {
			width: 100%;
height: 0.68rem;
background: #F8FAFB;
border-radius: 0.12rem;

			background: #f8f8f8;
			border: none;
			outline: none;
			padding: 0 0.1rem;
			box-sizing: border-box;
		}
        textarea{
			width: 100%;
			background: #f8f8f8;
			border-radius: 0.12rem;
			border: none;
			outline: none;
            resize: none;
			padding: 0.1rem;
            box-sizing: border-box;
        }
	}
	.button {
		width: 100%;
		margin-top: 0.4rem;
	}
}
.loginBtn{
width:100%;
height:0.88rem;
background-image: url(/img/h5/btnbg.png);
background-repeat: no-repeat;
background-size: 100% 100%;
.button{
    float:left;width: 3rem;
    line-height: 0.58rem;
height: 0.58rem;box-shadow: 0rem 0.1rem 0rem 0rem #DEA949;
font-size: 0.3rem;
font-family: PingFang SC;
font-weight: 400;
margin-left:0.39rem;
&:nth-child(1){
    
margin-left:0.5rem;
}
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
