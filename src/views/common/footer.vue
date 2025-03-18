<template>
<div class="footer">
			<div class="container">
				<div class="footerLeft">
					<img src="/img/logo.png" alt="" class="logo" />
					<div class="linkInfo">
						<p class="linkTitle">联系方式</p>
						<ul>
							<li>客服电话：400—0000—000
</li>
							<li>客服邮箱：xxxxxxxxx@xx.com</li>
							<li>服务时间：9:00-17:00</li>
							<li>公司地址：xxxx省xxx市xxx区xxx街xxx号</li>
						</ul>
					</div>
				</div>
				<div class="footerRight">
					<div class="imgCon">
                        <div class="imgBg">

                            <img src="/img/code.png" alt="" />
                        </div>
						<p>微信公众号</p>
					</div>
					<div class="imgCon">
                        <div class="imgBg">

                            <img src="/img/code1.png" alt="" />
                        </div>
						<p>客服微信</p>
					</div>
				</div>
			</div>
		</div>
</template>


<style lang="scss" scoped>

.footer{

background: #13161C;
opacity: 0.9;
.container{
    height:400px;
}
.footerLeft{
    width:680px;
    float:left;
    img{
        height:74px;
        margin-bottom:42px;
        margin-top:40px;
    }
    .linkTitle{
        font-size: 24px;
font-family: Heiti SC;
font-weight: 500;
color: #EABA63;
line-height: 24px;
position:relative;
padding-left:20px;
margin-top:0;
&::after{
    content:'';
    display: block;
    width:5px;
    height:20px;

background: #EABA63;
position: absolute;
left:0;
top:0;
bottom:0;
margin:auto;
}
    }
    ul{
            list-style: none;
            margin:0;
            padding:0;
        li{
            list-style: none;
            margin:0;
            padding:0;font-size: 18px;
font-family: Heiti SC;
font-weight: 500;
color: #FFFFFF;
line-height: 24px;
margin-bottom:13px;

        }
    }
}

.footerRight{
    padding-top:97px;
    box-sizing: border-box;
    float: left;
    display: flex;
    .imgCon{
        &:first-child{
            margin-right:93px;
        }
        .imgBg{
            padding:22px;
background: #1A2541;
box-shadow: 0px 6px 16px 0px rgba(0,0,0,0.35);
opacity: 0.3;
            img{
                width:140px;
                height:140px;
            }
        }
        p{
text-align: center;
font-size: 20px;
font-family: Heiti SC;
font-weight: 500;
color: #FFFFFF;
line-height: 24px;
margin:0;
margin-top:18px;
        }
    }
}
}
</style>
