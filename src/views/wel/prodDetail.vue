<template>
    <div class="prodDetail">
        <main-header :active="active"></main-header>
        <div class="banner"></div>
        <div class="prodDetailCon">

            <div class="container">
            <div class="section1">
                <div class="baseInfo">
                    <h4>{{ detail.name }}</h4>
                    <ul>
                        <li>
                            <div class="label">业绩比较标准</div>
                            <div class="con">{{ detail.brief || '--' }}</div>
                        </li>
                        <li>
                            <div class="label">投资期限</div>
                            <div class="con">{{ detail.investLimitId || '--' }}</div></li>
                        <li>
                            <div class="label">投资门槛</div>
                            <div class="con">{{ detail.pmStand || '--' }}</div></li>
                        <li>
                            <div class="label">付息方式</div>
                            <div class="con">{{ detail.inrestMethodId || '--' }}</div></li>
                    </ul>
                </div>
                <div class="zixun">
                    <h5>客户咨询</h5>
                    <p>请输入您想要了解的内容，客服将及时回电解答</p>
                    <el-input type="textarea" :rows="4" maxlength="300" :resize="'none'" v-model="zixun"></el-input>
                    <div class="button" @click="sendComm">确定</div>
                </div>
            </div>

            <div class="section2">
                <div class="title">产品概况</div>
                <el-row>
                    <el-col :span="24"><div class="infoItem"><div class="infoLabel">产品名称</div><div class="infoDesc">{{ detail.name }}</div></div></el-col>

                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">产品类别</div><div class="infoDesc">{{ type[active] }}</div></div></el-col>
                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">发行机构</div><div class="infoDesc">{{ detail.organid }}</div></div></el-col>
                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">投资领域</div><div class="infoDesc">{{ detail.prodEffId }}</div></div></el-col>
                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">收益类型</div><div class="infoDesc">{{ detail.investId }}</div></div></el-col>
                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">规模</div><div class="infoDesc">{{ detail.name }}</div></div></el-col>
                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">投资门槛</div><div class="infoDesc">{{ detail.pmStand }}</div></div></el-col>
                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">产品期限</div><div class="infoDesc">{{ detail.investLimitId }}</div></div></el-col>
                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">付息方式</div><div class="infoDesc">{{ detail.inrestMethodId }}</div></div></el-col>
                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">所在地域</div><div class="infoDesc">{{ detail.area }}</div></div></el-col>
                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">业绩比较基准</div><div class="infoDesc">{{ detail.brief }}</div></div></el-col>
                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">大小配额比</div><div class="infoDesc">{{ detail.investRatio }}</div></div></el-col>
                    <el-col :span="12"><div class="infoItem"><div class="infoLabel">风控级别</div><div class="infoDesc">{{ detail.lev }}</div></div></el-col>
                </el-row>


                <div class="title">产品进度</div>
                <div class="progress">
                    <div class="progressItem" v-for="item in detail.porder" :key="item">{{ item }}</div>
                </div>
                <div class="title">产品详情</div>
                <div class="detailCon" v-html="detail.content"></div>
            </div>
        </div>
        </div>

	<main-footer></main-footer>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import mainFooter from '../common/footer.vue'
import mainHeader from '../common/header.vue'
import { proddetail } from "@/api/prod.js";
import {addComment} from '@/api/index.js'
export default {
	name: "jeZi",
	components: {
        mainFooter,
        mainHeader
	},
	data() {
		return {
            detail:{},
            active:'',
            zixun:'',
            content:'',
            loading:false,
            type:{
                1:'集合信托',
                2:'集合资管',
                3:'私募基金',
            }
		};
	},
	computed: {
		...mapGetters(["userInfo"]),
	},
    mounted(){
window.scrollTo(0,0)
    },
	created() {
        this.getDetail();
},
mounted(){

},
	methods: {
        getDetail(){
            const id = this.$route.params.id
            const active =this.$route.query.type || 1
            this.active = active
            proddetail({id}).then(res=>{
                this.detail = res.data.data
                this.detail.porder = JSON.parse(this.detail.porder)
            })
        },
        sendComm(){
            if(this.loading){
                return;
            }
            const {name,tel} = this.userInfo;
            const {content} = this;
            if(!name||!tel||!content){
                return;
            }
            const id = this.$route.params.id
            this.loading = true;
            addComment({content,prodId:id}).then(res=>{
                const data = res.data;
                if(data && data.success){
                    this.$message.success('提交成功');
                    this.content = ''
            this.loading = false;
                }
            }).catch(()=>{
                
            this.loading = false;
            })
        },
    },
};
</script>

<style lang="scss" >
.prodDetail{
    .banner{
        width: 100%;
height: 330px;
background: linear-gradient(0deg, rgba(161,196,253,0.5), rgba(194,233,251,0.5));

    }
    .prodDetailCon{
        margin-top:-300px;
    }
    .section1{
        height:366px;background: #FFFFFF;
box-shadow: 0px 0px 16px 4px rgba(234,186,99,0.15);
border-radius: 6px;
margin-bottom:30px;

        .baseInfo{
            float: left;
            width:740px;
            height:366px;
		background-image: url(/img/prod2.png);
		background-size:  653px 249px;
		background-position: left bottom;
		background-repeat: no-repeat;
        padding:40px;
        box-sizing: border-box;
font-size: 30px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
h4{
    margin:0;
    margin-bottom:100px;
}
ul,li{
    list-style: none;
    margin:0;
    padding:0;
}
ul{
    height:70px;
}
li{
    width:25%;
    height:70px;
    float:left;
    border-right:1px solid #EBEBEB;
    box-sizing: border-box;
    padding-left:30px;
    &:last-child{
        border:none;
    }
    .label{

font-size: 18px;
font-family: Heiti SC;
font-weight: 500;
color: #9A9A9C;
margin-bottom:20px;
    }
    .con{

font-size: 24px;
font-family: Heiti SC;
font-weight: 500;
color: #EABA63;
    }
}
        }
        .zixun{
            width:460px;
            height:366px;
            float:right;
		background-image: url(/img/prod1.png);
		background-size:  460px 366px;
		background-position: center center;
		background-repeat: no-repeat;
        box-sizing: border-box;
        padding:40px;
        h5{

font-size: 18px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
margin:0;
margin-bottom:20px;
        }
        p{

font-size: 18px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
margin:0;
margin-bottom:20px;
        }
        }

.el-textarea{

box-shadow: 0px 2px 1px 0px rgba(0,0,0,0.09);
border-radius: 12px;
    border:none;
textarea{
    border:none;
    box-shadow: none !important;
    outline: none;
}
}
		.button {
			width: 180px;
			height: 44px;
			background: linear-gradient(163deg, #e1ad4f, #eaba63, #e0af56);
			box-shadow: 0px 3px 0px 0px #dea949;
			border-radius: 12px;
			margin: 33px auto 0;
			text-align: center;
			line-height: 44px;
			font-size: 18px;
			font-family: Heiti SC;
			font-weight: 500;
			color: #ffffff;
			cursor: pointer;
		}
    }
    .section2{
        padding:20px 10px 82px;
        box-sizing: border-box;
background: #FFFFFF;
border-radius: 6px;
        .title{

font-size: 24px;
font-family: Heiti SC;
font-weight: 500;
color: #EABA63;
line-height: 64px;
border-bottom:1px solid rgba(234, 186, 99, 0.2);
position:relative;
padding-left:31px;
box-sizing: border-box;
margin-bottom:30px;
&::after{
    content:'';
    display: block;width: 120px;
height: 4px;
background: #EABA63;
position:absolute;
bottom:0;
left:20px;
}
        }

.el-col{
    margin:0;
}
.el-row{
    width:1100px;
    margin:30px auto;
border: 1px solid #EBEBEB;
border-bottom:none;
}
        .infoItem{
            border-bottom:1px solid rgba(235, 235, 235, 1);
            height:50px;
            .infoLabel{
                width: 150px;
height: 50px;
line-height: 50px;
background: rgba(173, 181, 193,.1);
font-size: 16px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
text-align: center;
float:left;

            }
            .infoDesc{
padding-left:10px;
box-sizing: border-box;
font-size: 16px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
float:left;
line-height: 50px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
width:calc(100% - 150px);
            }
        }
    }
}

.detailCon{
    img{
        max-width:100%;
    }
}

.progress{
    width: 1100px;
background: rgba(234,186,99,0.1);
border: 1px solid #EABA63;
border-radius: 6px;

padding:0 18px 50px;
.progressItem{
line-height: 50px;
    border: 1px dashed #EABA63;
font-size: 16px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
width:100%;
}

}
</style>