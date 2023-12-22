<template>
	<div class="index-container loginbg">
		<!-- 忘记密码 -->
		<mainHeader title="修改密码"></mainHeader>
		<div class="container">
			<div class="phoneInfo">
				<span>{{ userInfo.userMobile.slice(0, 3) }} </span
				><span>{{ userInfo.userMobile.slice(3, 7) }} </span
				><span>{{ userInfo.userMobile.slice(7, 11) }} </span>
				<p>登录手机号</p>
			</div>
			<div class="loginContent register">
				<div class="smscodeCon">
					<div class="label">图形验证码</div>
					<div class="inputItem">
						<input
							autocomplete="off"
							v-model="code"
							class="input"
							id="code"
							type="text"
							placeholder="输入图形验证码"
						/>
					</div>
					<div class="sendBtn">
						<img :src="captcha" alt="" @click="refershCode" />
					</div>
				</div>
				<div class="smscodeCon">
					<div class="label">验证码（短信由杭州泓林信息咨询发送）</div>
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
						<div
							class="send"
							v-if="timeDown === originTime"
							@click="checkCaptcha"
						>
							获取验证码
						</div>
						<div class="hasSend send" v-if="timeDown !== originTime">
							{{ timeDown }}
						</div>
					</div>
				</div>
				<div class="inputItem">
					<div class="label">设置密码</div>
					<input
						v-model="passWord"
						class="input"
						id="passWord"
						@input="twoPasswordChange"
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
						@input="twoPasswordChange"
						class="input"
						id="twopassWord"
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
				<div class="button" @click="onModify">确认修改</div>
				<div class="other">
					<p></p>
					<p @click="backLogin">返回登录</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import mainHeader from "../common/header.vue";
import { encrypt } from "utils/util";
import {
	register,
	modifyPassword,
	getCaptcha,
	sendSmsCode,
	checkCode,
} from "@/api/user.js";
import { mapGetters } from "vuex";
export default {
	name: "register",
	components: {
		mainHeader,
	},
	data() {
		return {
			showtwoPassword: false,
			showPassword: false,
			showContact: false,
			userName: "",
			passWord: "",
			twopassWord: "",
			gender: 0,
			smsCode: "",
			originTime: 30,
			timeDown: 30,
			timer: null,
			contact: {
				name: "",
				phone: "",
				message: "",
			},
			code: "",
			captcha: "",
			time: new Date().getTime(),
			errInfo: "",
		};
	},
	mounted() {
		this.getCaptcha();
	},
	methods: {
		getCaptcha() {
			getCaptcha({ time: this.time }).then((res) => {
				const file = new FileReader();
				const that = this;
				file.onloadend = function (e) {
					that.captcha = e.target.result;
				};
				file.readAsDataURL(res.data);
			});
		},
		refershCode() {
			this.time = new Date().getTime();
			this.code = "";
			this.getCaptcha();
		},
		checkCaptcha() {
			if (!this.code) {
				this.errInfo = "请输入图形验证码";
				return;
			}
			// this.errInfo = "";
			checkCode({ time: this.time, code: this.code }).then(({ data }) => {
				if (data.data) {
					this.sendSms();
					this.errInfo = "";
				} else {
					this.errInfo = "请输入正确的图形验证码";
					this.refershCode();
				}
			});
		},
		sendSms() {
			debugger;
			sendSmsCode({ mobile: this.userInfo.userMobile }).then((res) => {
				if (res && res.data && res.data.success) {
					this.timeDownfn();
				}
			});
		},
		timeDownfn() {
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
					this.timeDownfn();
				}
			}, 1000);
		},
		backLogin() {
			this.$router.replace("/login");
		},
		onRegister() {
			const { userName, passWord, gender, smsCode, phone } = this;
			register({
				userName,
				passWord: encrypt(passWord),
				gender,
				smsCode,
				phone,
			}).then((res) => {
				console.log(res);
			});
		},

		onModify() {
			const {
				userName,
				passWord,
				gender,
				smsCode,
				userInfo: { nickName },
				twopassWord,
			} = this;
			if (!twopassWord) {
				this.errInfo = "请确认密码";
				return;
			}
			if (!passWord || !smsCode) {
				this.errInfo = "请输入完整信息";
				return;
			}
			modifyPassword({
				code: smsCode,
				passWord: encrypt(passWord),
				mobile: this.userInfo.userMobile,
				userMobile: this.userInfo.userMobile,
				time: this.time,
			}).then((res) => {
				if (res.data.success) {
					this.$message.success("修改成功");
					setTimeout(() => {
						this.$store.dispatch("LogOut");
						this.backLogin();
					}, 2000);
				} else {
					this.$message.error(res.data.msg);
					this.refershCode();
				}
			});
		},
		onMenuClick(menu) {
			if (menu.link) {
				this.$router.push(menu.link);
			}
		},
		twoPasswordChange(value) {
			if (this.twopassWord && this.passWord && this.twopassWord !== this.passWord) {
				this.errInfo = "两次密码不一致，请检查";
			} else {
				this.errInfo = "";
			}
		},
	},
	computed: {
		...mapGetters(["userInfo"]),
	},
};
</script>

<style lang="scss" scoped>
.loginbg {
	width: 100%;
	height: 100%;

	background-image: url(/img/h5/loginbg.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: left center;
}
.container {
	padding: 0.6rem 0.4rem 0;
	box-sizing: border-box;
}
.phoneInfo {
	margin: 0.6rem 0 0;
	text-align: center;
	span {
		margin-right: 0.1rem;
		font-size: 0.48rem;
		font-family: Heiti SC;
		font-weight: 500;
		color: #30333b;
	}
	p {
		font-size: 0.28rem;
		font-family: Heiti SC;
		font-weight: 500;
		color: #9a9a9c;
		margin: 0.3rem 0 1rem;
	}
}
.loginContent {
	width: 100%;
	background: #ffffff;
	border-radius: 12px;
	box-sizing: border-box;
	padding: 0.01rem 0.37rem 0.3rem;

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
			.input {
				width: 2.91rem;
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
			.sendBtn {
				width: 1.8rem;
				height: 0.42rem;
				position: absolute;
				bottom: 0.15rem;
				right: 0;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.send {
				width: 1.8rem;
				height: 0.42rem;
				line-height: 0.42rem;

				cursor: pointer;

				font-size: 0.24rem;
				font-family: PingFang SC;
				font-weight: 400;
				color: #eaba63;
				position: absolute;
				bottom: 0;
				right: 0;
				border-left: 1px solid #eaba63;
				padding-left: 0.2rem;
			}
			.hasSend {
				color: #30333b;
				text-align: center;
			}
		}
		.button {
			margin: 0.53rem 0 0;
		}
	}
	.other {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin: 0 auto;
		p {
font-size: 0.24rem;
			font-family: Heiti SC;
			font-weight: 500;
			color: #9a9a9c;
			cursor: pointer;
			span {
font-size: 0.24rem;
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
		background: #f8fafb;
		border-radius: 0.12rem;
		border: 1px solid #f3f2f8;
		padding-left: 0.1rem;
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
	.label {
		width: 100%;
		font-size: 0.28rem;
		font-family: PingFang SC;
		font-weight: 400;
		color: #9a9a9c;
		flex-shrink: 0;
		margin: 0.4rem 0 0.21rem 0;
	}
}

.button {
	width: 100%;
	background: linear-gradient(
		163deg,
		#e1ad4f,
		rgba(234, 186, 99, 0.7),
		#e0af56
	);
	
	border-radius: 0.12rem;

	line-height: 0.76rem;
	height: 0.76rem;
	box-shadow: 0rem 0.1rem 0rem 0rem #dea949;
	font-size: 0.32rem;

	margin: 0 auto;
	font-family: Heiti SC;
	font-weight: 500;
	color: #ffffff;
	text-align: center;
	cursor: pointer;
	&.gray {
		background: linear-gradient(163deg, #d5d5d5, #efefef);
		box-shadow: 0px 0.03rem 0px 0px #cbcbcb;
		color: #9a9a9c;
		margin-top: 0;
	}
}
.errInfo {
	font-size: 0.2rem;
	color: red;
	margin: 0;
}
</style>
