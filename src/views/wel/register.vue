<template>
	<div class="index-container loginbg">
        <mainHeader></mainHeader>
        <div class="logo"><img src="/img/h5/logo.png" alt=""></div>
        <div class="tabs">
					<h4 :class="{loginTitle:true,active:active==1}" @click="setActive(1)">登录</h4>
					<h4  :class="{loginTitle:true,active:active==2}" @click="setActive(2)">注册</h4>
        </div>
        <div class="container">

            <div class="loginContent register" v-show="active===2">
					<div class="genderCon">
                        <div class="label">您的姓名</div>
						<div class="inputItem">
							<input
								autocomplete="off"
								v-model="userName"
								class="input"
								id="userName"
								type="text"
                                placeholder="输入您的姓名"
							/>
						</div>
						<div class="gender">
							<div class="genderItem">
								<label @click="gender = 0" class="radio">
									<span
										:class="{ 'radio-inner': true, active: gender === 0 }"
									></span>
									<input type="radio" name="gender" :checked="gender === 0" />
									先生
								</label>
								<label class="radio" @click="gender = 1">
									<span
										:class="{ 'radio-inner': true, active: gender === 1 }"
									></span>
									<input type="radio" name="gender" :checked="gender === 1" />
									女士
								</label>
							</div>
						</div>
					</div>
					<div class="inputItem">
                        <div class="label">手机号</div>
						<input
							autocomplete="off"
							v-model="phone"
							class="input"
							id="phone"
							type="text"
                            placeholder="请输入您的手机号"
						/>
					</div>
					<div class="smscodeCon">
                        <div class="label">验证码</div>
						<div class="inputItem">
							<input
								autocomplete="off"
								v-model="smsCode"
								class="input"
								id="smsCode"
								type="text"
                                placeholder="输入手机验证码"
							/>
						</div>
						<div class="sendBtn">
							<div class="send" v-if="timeDown === originTime" @click="sendSms">
								获取验证码
							</div>
							<div class="hasSend" v-if="timeDown !== originTime">
								{{ timeDown }}
							</div>
						</div>
					</div>
					<div class="inputItem">
                        <div class="label">设置密码</div>
						<input
							autocomplete="off"
							v-model="passWord"
							class="input"
							id="passWord"
                            placeholder="输入您的登录密码"
							:type="showPassword ? 'text' : 'password'"
						/>
						<!-- <img
							@click="showPassword = false"
							v-if="showPassword"
							src="/img/show.png"
							alt=""
							class="togglePassword"
						/>
						<img
							@click="showPassword = true"
							v-if="!showPassword"
							src="/img/hide.png"
							alt=""
							class="togglePassword"
						/> -->
					</div>
					<div class="inputItem">
                        <div class="label">再次输入密码</div>
						<input
							autocomplete="off"
							v-model="twopassWord"
							class="input"
							id="twopassWord"
                            placeholder="再次输入登录密码"
							@input="twoPasswordChange"
							:type="showtwoPassword ? 'text' : 'password'"
						/>
						<!-- <img
							@click="showtwoPassword = false"
							v-if="showtwoPassword"
							src="/img/show.png"
							alt=""
							class="togglePassword"
						/>
						<img
							@click="showtwoPassword = true"
							v-if="!showtwoPassword"
							src="/img/hide.png"
							alt=""
							class="togglePassword"
						/> -->
					</div>
					<p class="errInfo">{{ errInfo }}</p>
					<div class="button" @click="onRegister">立即注册</div>
				</div>


            <div class="loginContent register" v-show="active===1">
					<div class="inputItem">
                        <div class="label">手机号</div>
						<input
							autocomplete="off"
							v-model="phone"
							class="input"
							id="phone"
							type="text"
                            placeholder="请输入您的手机号"
						/>
					</div>
					<div class="inputItem">
                        <div class="label">登录密码</div>
						<input
							autocomplete="off"
							v-model="passWord"
							class="input"
							id="passWord"
                            placeholder="输入您的登录密码"
							:type="showPassword ? 'text' : 'password'"
						/>
						<!-- <img
							@click="showPassword = false"
							v-if="showPassword"
							src="/img/show.png"
							alt=""
							class="togglePassword"
						/>
						<img
							@click="showPassword = true"
							v-if="!showPassword"
							src="/img/hide.png"
							alt=""
							class="togglePassword"
						/> -->
					</div>
					<p class="errInfo">{{ errInfo }}</p>
					<div class="button" @click="onRegister">立即登录</div>
                    <div class="other">
                    <p></p>
                    <p @click="onForgetPassword">忘记密码</p>
                </div>
				</div>
        </div>
	</div>
</template>

<script>
import mainHeader from "../common/header.vue";
import { encrypt } from "utils/util";
import { register, modifyPassword } from "@/api/user.js";
export default {
	name: "register",
	components: {
		mainHeader,
	},
	data() {
		return {
            active:1,
			showtwoPassword: false,
			showPassword: false,
			showContact: false,
			userName: "",
			passWord: "",
			twopassWord: "",
			phone: "13888888888",
			gender: 0,
			smsCode: "",
			originTime: 30,
			timeDown: 30,
			timer: null,
		};
	},
	created() {},
	methods: {
        setActive(active){
this.active = active
        },
		onRegister() {
			const { userName, passWord,gender, smsCode, phone,twopassWord } = this;
			if (!userName || !passWord  || !smsCode || !phone) {
				this.errInfo = "请输入完整信息";
				return;
			}  if(!twopassWord){
				this.errInfo = "请确认密码";
				return;
            }
			register({
                realName:userName,
				nickName: phone,
                mobile:phone,
				passWord: encrypt(passWord),
				sex:gender===0?'M':'F',
				smsCode,
			}).then((res) => {
				console.log(res);
                if(res.data.success){
                    this.backLogin()
                }else{
                    this.$message.error(res.data.msg)
                }
			});
		},
		sendSms() {
			this.timer = setTimeout(() => {
				this.timeDown = this.timeDown - 1;
				if (this.timeDown <= 1) {
					this.timeDown = this.originTime;
					if (this.timer) {
						clearTimeout(this.timer);
					}
				} else {
					if (this.timer) {
						clearTimeout(this.timer);
					}
					this.sendSms();
				}
			}, 1000);
		},
		onMenuClick(menu) {
			if (menu.link) {
				this.$router.push(menu.link);
			}
		},
		twoPasswordChange(value) {
			if (value !== this.passWord) {
				this.errInfo = "两次密码不一致，请检查";
			}
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
		onForgetPassword() {
			this.$router.push("/forgetPassword");
		},
	},
};
</script>

<style lang="scss" scoped>

.loginbg{
    width:100%;
    height:100%;
    
background-image: url(/img/h5/loginbg.png);
background-repeat: no-repeat;
background-size: 100% 100%;
background-position: left center;
}
.logo{
    margin:0.88rem auto 0.7rem;
    img{
        width:2.57rem;
        height:2.05rem;
        display: block;
        margin:0 auto;
    }
}
.tabs{
    height:0.5rem;
    margin-bottom:0.36rem;
    .loginTitle{
        &:first-child{
            float:left;
            margin-left:1.35rem;
        }
        &:last-child{
            float:right;
            margin-right:1.35rem;
        }
    }
}
.loginTitle {
font-size: 0.32rem;
font-family: PingFang SC;
font-weight: 400;
color: #30333B;
opacity: 0.8;
cursor: pointer;
			position: relative;
			text-align: center;
            margin:0;
            &.active{
			&::after {
				position: absolute;
				content: "";
				display: block;width: 100%;
height: 0.12rem;
background: #EABA63;

				left: 0;
				right: 0;
				bottom: 0.05rem;
				margin: auto;
                z-index:-1;
			}
            }
		}
.loginContent {
		width: 100%;
		background: #ffffff;
		border-radius: 12px;
        box-sizing: border-box;
        padding:0.01rem 0.37rem 0.3rem;

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
				// margin-bottom:10px;
                font-size: 0.28rem;
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
					bottom: 10px;
				}
			}
			.loginTitle {
				margin-bottom: 30px;
			}
			.cut {
				opacity: 0;
                display: none;
			}
			.genderCon {
				display: flex;
				width: 100%;
				margin: 0 auto;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 0.1rem;
                flex-wrap: wrap;
				.inputItem,
				.input {width: 2.91rem;

				}
				.radio {
					position: relative;
					font-size: 0.28rem;
					font-family: Heiti SC;
					font-weight: 500;
					color: #30333b;
					margin-right: 0.41rem;
				}
				input[type="checkbox"],
				input[type="radio"] {
					opacity: 0;
				}
				.radio-inner {
					width: 0.42rem;
					height: 0.42rem;
					box-sizing: border-box;
					padding: 0 0.08rem;
					border-radius: 50%;
					position: absolute;
					border: 1px solid #d9d9da;
					top: 0;
					bottom: 0;
					left: -5px;
					margin: auto;
					&.active {
					border: 1px solid #30333b;
						&::after {
							content: "";
							display: block;
							position: absolute;
							top: 0;
							bottom: 0;
							left: 0;
							right: 0;
							margin: auto;
							width: 0.1rem;
							height: 0.1rem;
							border-radius: 0.1rem;
							background: #30333b;
					border: 1px solid #30333b;
						}
					}
				}
			}
			.smscodeCon {
				width: 100%;
				margin: 0 auto;
				margin-bottom: 0.1rem;
                position: relative;
				.send {
					width: 1.8rem;
					height: 0.42rem;
					line-height: 0.42rem;
                    
					cursor: pointer;

                    font-size: 0.24rem;
font-family: PingFang SC;
font-weight: 400;
color: #EABA63;
                    position:absolute;
                    bottom:0.15rem;
                    right:0;
                    border-left:1px solid #EABA63;
                    padding-left:0.2rem;
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
				margin:0.53rem 0 0;
			}
		}
		.other {
			display: flex;
			justify-content: space-between;
			width: 100%;
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
			width: 100%;
		}
		.input {
			width: 100%;
height: 0.72rem;
background: #F8FAFB;
border-radius: 0.12rem;
			border: 1px solid #f3f2f8;
			padding-left:0.1rem;
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
        .label{
            width:100%;
font-size: 0.28rem;
font-family: PingFang SC;
font-weight: 400;
color: #9A9A9C;
flex-shrink: 0;
margin:0.4rem 0 0.21rem 0;
        }
	}
.button {
	width: 100%;
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
	&.gray {
		background: linear-gradient(163deg, #d5d5d5, #efefef);
		box-shadow: 0px 3px 0px 0px #cbcbcb;
		color: #9a9a9c;
		margin-top: 0;
	}
}
</style>
