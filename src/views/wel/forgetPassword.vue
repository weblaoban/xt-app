<template>
	<div class="index-container">
		<div class="header">
			<div class="container"><span>Hi </span>欢迎您的访问</div>
		</div>
		<div class="logoContent">
			<div class="container">
				<div class="logo"><img src="/img/logo.png" alt="" /></div>
				<div class="phone">
					<img src="/img/kefu.png" alt="" />
					<div class="phoneInfo">
						<p class="phonenumber">400-820-8820</p>
						<p class="time">工作时间：9:00-17:00</p>
					</div>
				</div>
			</div>
		</div>
		<div class="bannerContent">
            <div class="carouseCard" style="height:675px">
            <img src="/img/welcomebg.png" alt="">	
            
            
            <!-- 忘记密码 -->
			<div class="loginContent register">
                <h4 class="loginTitle">忘记密码</h4>
				
				<div class="inputItem">
					<input autocomplete="off" v-model="phone" class="input" id="phone" type="text" /><label
						class="placeholder"
						for="phone"
                        v-show="!phone"
						>请输入您的手机号</label
					>
					<div class="cut"></div>
				</div>
                <div class="smscodeCon">
                    
				<div class="inputItem">
					<input v-model="smsCode" class="input" id="smsCode" type="text" /><label
						class="placeholder"
						for="smsCode"
                        v-show="!smsCode"
						>输入手机验证码</label
					>
					<div class="cut"></div>
				</div>
                <div class="sendBtn">
                    <div class="send" v-if="timeDown===originTime" @click="sendSms">发送</div>
                    <div class="hasSend" v-if="timeDown!==originTime">{{timeDown}}</div>
                </div>
                </div>
				<div class="inputItem">
					<input v-model="passWord" class="input" id="passWord" :type="showPassword?'text':'password'" /><label
						class="placeholder"
						for="passWord"
                        v-if="!passWord"
						>登录密码</label
					>
					<div class="cut"></div>
                    <img @click="showPassword=false" v-if="showPassword" src="/img/show.png" alt="" class="togglePassword">
                    <img @click="showPassword = true" v-if="!showPassword" src="/img/hide.png" alt="" class="togglePassword">
				</div>
				<div class="inputItem">
					<input autocomplete="off" v-model="twopassWord" class="input" id="twopassWord" :type="showtwoPassword?'text':'password'" /><label
						class="placeholder"
						for="twopassWord"
                        v-if="!twopassWord"
						>再次输入登录密码</label
					>
					<div class="cut"></div>
                    <img @click="showtwoPassword=false" v-if="showtwoPassword" src="/img/show.png" alt="" class="togglePassword">
                    <img @click="showtwoPassword = true" v-if="!showtwoPassword" src="/img/hide.png" alt="" class="togglePassword">
				</div>
                <div class="button" @click="onModify">确认修改</div>
                <div class="other">
                    <p></p>
                    <p @click="backLogin">返回登陆</p>
                </div>
			</div>
        </div>
		
		</div>
	<main-footer></main-footer>
	</div>
</template>

<script>
import mainFooter from '../common/footer.vue'
import { encrypt } from 'utils/util'
import {register,modifyPassword} from '@/api/user.js'
export default {
	name: "register",
	components: {
        mainFooter,
	},
	data() {
		return {
            showtwoPassword:false,
            showPassword:false,
            showContact:false,
            userName:'',
            passWord:'',
            twopassWord:'',
            phone:'13888888888',
            gender:0,
            smsCode:'',
            originTime:30,
            timeDown:30,
            timer:null,
            products:[
                {
                    name:'名称'
                },
                {
                    name:'名称'
                },
                {
                    name:'名称'
                },
                {
                    name:'名称'
                },
            ],
            contact:{
                name:'',
                phone:'',
                message:''
            },
		};
	},
	created() {},
	methods: {
        backLogin(){
history.go(-1)
        },
        onRegister(){

            const {userName,passWord,gender,smsCode,phone} = this;
            register({userName,passWord:encrypt(passWord),gender,smsCode,phone}).then(res=>{
                console.log(res)
            })
        },
        onModify(){
            const {userName,passWord,gender,smsCode,phone} = this;
            modifyPassword({smsCode,passWord:encrypt(passWord),phone}).then(res=>{
                console.log(res)
            })
        },
        sendSms(){
            this.timer = setTimeout(()=>{
this.timeDown=this.timeDown-1;
if(this.timeDown<=1){
    this.timeDown = this.originTime;
    if(this.timer){
        clearTimeout(this.timer);
    }
}else{
    if(this.timer){
        clearTimeout(this.timer);
    }
        this.sendSms()
}
            },1000)
        },
        onMenuClick(menu){
            if(menu.link){
                this.$router.push(menu.link)
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.header{
    height: 40px;
background: #F7F7F7;
line-height: 40px;
color: #836C4C;
font-size: 14px;
font-weight: 500;
span{
    font-size: 16px;
    color: #EABA63;
    font-weight: 400;
}
}
.logoContent {
    height:120px;
background: #FFFFFF;
	.container {
        height:100%;
		display: flex;
		justify-content: space-between;
        align-items: center;
        .logo{
            img{
                width:274px;
                height:80px;
            }
        }
		.phone {
			display: flex;
            img{
                width:42px;
                height:42px;
                margin-right:10px;
            }
			.phoneInfo {
				p {
					margin: 0;
					padding: 0;
                    color:#EABA63;
                    &.phonenumber{
                        font-size: 32px;
font-family: Arial;
font-weight: 400;
                    }
                    &.time{
                        font-size: 16px;
font-family: Heiti SC;
font-weight: 500;
                    }
				}
			}
		}
	}
}
.bannerContent {
    position:relative;
	.carouseCard {
		width: 100%;
		height: 100%;
		background-image: url(/img/registerbg.png);
        background-size:100% 100%;
        background-position:center center;
        background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    &>img{
        height:322px;
    }
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
        padding:0;
		width: 38px;
		height: 38px;
		position: relative;
		border-radius: 50%;
		background: transparent;
		box-sizing: border-box;
        margin-bottom:10px;
	}
	.el-carousel__indicator.is-active {
		border: 1px solid #fff;
	}
	.loginContent {
        // position:absolute;
        // top:56px;
        // right:calc(50% - 490px);
        width: 380px;
height: 502px;
background: #FFFFFF;
box-shadow: 0px 0px 10px 10px rgba(234,186,99,0.1);
border-radius: 12px;

&.haslogin{
    text-align: center;
    .welcom{
        display: block;
        margin:0 auto;
        width:128px;
        height:36px;
        margin-top:41px;
    }
    .username{
margin:40px auto 21px;
font-size: 24px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
    }
    .phoneinfo{

font-size: 16px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
    }
    .gray{
        margin-top:0;
    }
}
&.register{
    .inputItem{
        // margin-bottom:10px;
        .phoneInfo{
            text-align: center;
font-size: 16px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
margin:40px auto;
line-height: 18px;
            span{

font-size: 18px;
font-family: Heiti SC;
font-weight: 500;
color: #EABA63;
margin-right: 4px;
            }
        }
        img{
            width:18px;
            height:18px;
            position:absolute;
            right:10px;
            top:10px;
        }
    }
    .loginTitle{
        margin-bottom:30px;
    }.cut {
			opacity:0;
		}
    .genderCon{
        display: flex;
        width:280px;
        margin:0 auto;
        align-items:center;
        justify-content: space-between;
        margin-bottom:20px;
        .inputItem,.input{
            width:150px;
            margin:0;
        }
        .radio{
            position:relative;
font-size: 14px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
margin-right:6px;
        }
        input[type="checkbox"], input[type="radio"]{
            opacity:0;
        }
        .radio-inner{
            width:18px;
            height:18px;
            box-sizing: border-box;
            padding:0 8px;
            border-radius: 50%;
            position:absolute;
            border:1px solid #D9D9DA;
            top:0;
            bottom:0;
            left:-5px;
            margin:auto;
            &.active{
                
            &::after{
                content:'';
                display: block;
                position: absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
                margin:auto;
                width:6px;
                height:6px;
                border-radius: 6px;
                background: #30333B;
            }
            }
        }
    }
    .smscodeCon{
        
        display: flex;
        width:280px;
        margin:0 auto;
        align-items:center;
        justify-content: space-between;
        margin-bottom:20px;
        .inputItem,.input{
            width:190px;
            margin:0;
        }
        .send{
            width: 70px;
height: 39px;
background: linear-gradient(5deg, #EABA63, #FAC76C);
border-radius: 8px;
cursor: pointer;

font-size: 14px;
font-family: Heiti SC;
font-weight: 500;
color: #FFFFFF;
line-height: 39px;
text-align: center;
        }
        .hasSend{
            width: 70px;
height: 39px;
background: #F8F8F8;
border-radius: 8px;
line-height: 39px;
font-size: 14px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
text-align: center;

        }
    }
    .button{
        margin-top:50px;
        margin-bottom:8px;
    }
}
.other{
    display: flex;
    justify-content: space-between;
			width: 280px;
            margin:0 auto;
            p{
                font-size: 14px;
font-family: Heiti SC;
font-weight: 500;
color: #9A9A9C;cursor: pointer;
span{
    font-size: 14px;
font-family: Heiti SC;
font-weight: 500;
color: #EABA63;
margin-left:10px;
}
            }
}
.button{
    margin-top:40px;margin-bottom:20px;
}
.loginTitle{

font-size: 20px;font-weight: 500;
color: #30333B;
position:relative;
text-align: center;
margin-bottom:40px;
&::after{
    position:absolute;
    content:'';
    display: block;
    width: 50px;
height: 4px;
background: #EABA63;
left:0;
right:0;
bottom:0;
margin:auto;
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
            margin:0 auto 22px;
		}
		.input {
			width: 280px;
height: 40px;
background: #FFFFFF;
border: 1px solid #F3F2F8;
border-radius: 8px;
padding-left:20px;
box-sizing: border-box;

		}
		.placeholder {
			font-size: 14px;
font-family: Heiti SC;
font-weight: 500;
color: #9A9A9C;

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
            z-index:1;
		}
	}
}
.button{
    width: 280px;
height: 44px;
background: linear-gradient(163deg, #E1AD4F, #EABA63, #E0AF56);
box-shadow: 0px 3px 0px 0px #DEA949;
border-radius: 8px;

margin:0 auto;font-size: 18px;
font-family: Heiti SC;
font-weight: 500;
color: #FFFFFF;
text-align: center;
line-height: 44px;
cursor: pointer;
&.gray{

background: linear-gradient(163deg, #D5D5D5, #EFEFEF);
box-shadow: 0px 3px 0px 0px #CBCBCB;
color:#9A9A9C;
margin-top:0;
}
}
</style>
