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
		<div class="menuContent">
			<div class="container">
				<div class="menuList">
					<div @click="onMenuClick(item)" :class="{'active':index==active}" v-for="(item,index) in menuList" :key="item" class="menuItem"><img v-if="item.icon" :src="item.icon" alt="">{{item.name}} <div class="tag" v-if="item.notOpen">暂未开放</div></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { encrypt } from 'utils/util'
import {register,modifyPassword} from '@/api/user.js'
export default {
	name: "header",
    props:['active'],
	data() {
		return {
            showContact:false,
			cardItem: [{ title: "财富增值", desc: "稳健安全的资产配置", id: 0, img: "/img/icon1.png" },{ title: "产品安全", desc: "专业风控团队优中优选", id: 0, img: "/img/icon2.png" },{ title: "全面覆盖", desc: "信托资管私募全面覆盖", id: 0, img: "/img/icon3.png" },{ title: "专业服务", desc: "专业服务经理1对1服务", id: 0, img: "/img/icon4.png" }],
			amount: 111,
            menuList:[
                {
                    name:'首页',
                    icon:'/img/home.png',
                    link:'/'
                },{
                    name:'集合信托',
                    link:'/xtcombine'
                },{
                    name:'集合资管',
                    link:'/ziguan'
                },{
                    name:'私募基金',
                    link:'/privateFund'
                },{
                    name:'集合保险',
                    notOpen:true
                },{
                    name:'信托问答',
                    link:'/trustQa'
                },{
                    name:'信托资讯',
                    link:'/information'
                },{
                    name:'关于我们',
                    link:'/aboutUs'
                }
            ],
            userName:'',
            passWord:'',
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
            showPassword:false,
            showModifyPass:false
		};
	},
	computed: {
		...mapGetters(["userInfo"]),
	},
	created() {},
	methods: {
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
.menuContent{
    height: 52px;
background: #30333B;
.menuList{
    display: flex;
    
.menuItem{
    width:12.5%;
    line-height:52px;
    position:relative;
    display: flex;
    align-items: center;
    justify-content: center;
font-size: 18px;
color:#fff;
cursor: pointer;
    .tag{
        width:57px;

        text-align: center;
        position:absolute;font-size: 12px;
font-family: Heiti SC;
font-weight: 500;
color: #FFFFFF;
background-image: url(/img/notopen.png);
background-size:57px 19px;
background-position: center center;
background-repeat: no-repeat;
top:0;
left:110px;
height:20px;
line-height: 20px;
    }
    img{
        width:20px;
        height:20px;
    }
    &.active{
        color:#EABA63;
        &:after{
            content:'';
            display: block;
            width:100%;
            height:3px;
            position:absolute;
            bottom:0;
            left:0;
background: #EABA63;
        }
    }
}
}
}
.bannerContent .el-carousel__indicators--vertical {
	top: 50%;
	right: calc(50% - 520px);
	transform: translate(50%, -50%);
}
.bannerContent {
    position:relative;
	.carouseCard {
		width: 100%;
		height: 100%;
		background-image: url(/img/banner.png);
        background-size:100% 100%;
        background-position:center center;
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
        position:absolute;
        top:56px;
        right:calc(50% - 490px);
        width: 320px;
height: 380px;
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
        margin-bottom:10px;
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
        margin-bottom:10px;
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
        margin-bottom:10px;
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
        margin-top:20px;
        margin-bottom:0;
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
