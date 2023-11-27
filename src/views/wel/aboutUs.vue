<!-- 关于我们 -->
<template>
	<div class="index-container aboutus">
        <main-header :active="7"></main-header>
		<div class="banner"></div>
        <h4>公司介绍</h4>
        <div class="container">

            <div class="intro1">
                <p>
                瑔石信托网，是杭州泓林信息咨询有限公司的旗下平台，自成立以来，我们致力于为广大投资者提供优质的资产配置服务。团队是由一批拥有丰富金融知识和实践经验的行业先锋组成，以专业的知识和热情的服务，帮助投资者实现财富的保值和增值。</p>
        </div>
        </div>
        <div class="intro2"> <div class="container">    瑔石信托网承载着“温润如玉 坚如磐石”的精神内核，秉持着诚信、专业、创新的核心价值观，为广大投资者提供优质的资产配置服务。始终坚持以客户为中心，秉承“受人信任、代人理财”的信托理念，帮助投资者建立科学的投资理念和策略，实现长期的财富增长。</div>  </div>

        <div class="intro3">
            <div class="container">

                <p>我们的使命是让每一位投资者都能在瑔石信托网找到适合自己的资产配置方案。每一位投资者的需求都是独特的，因此我们始终坚持提供个性化、专业化的服务。无论是对于初级投资者，还是有丰富经验的投资者，我们都会尽心尽力地提供专业的投资建议和适合的资产配置方案。
</p>
<p>       在瑔石信托网，我们以“温润如玉 坚如磐石”的精神内核为指引，注重与投资者的沟通和交流，理解他们的需求和关注点，提供专业、适合的资产配置方案。我们坚信只有了解客户的需求，才能提供最适合的配置方案。</p>
            </div>
        </div>

        <div class="intro4">
            <div class="container">
                <p>我们的愿景是成为国内领先的资产配置服务平台。让“受人信任、代人理财”的信托理念根植于每一位投资者心中。</p>
                <p>       瑔石信托网将是您的最佳选择。欢迎您随时访问我们的网站，我们将竭诚为您服务。让我们一起携手，共创美好的未来！</p>
            </div>
        </div>
	<main-footer></main-footer>
	</div>
</template>

<script>
import mainFooter from '../common/footer.vue'
import mainHeader from '../common/header.vue'
export default {
	name: "jeZi",
	components: {
        mainFooter,
        mainHeader
	},
	data() {
		return {
		};
	},
	created() {},
	methods: {
    },
};
</script>

<style lang="scss" scoped>
.aboutus{
    .container{
        width:1078px;
    }
    .banner{
width:100%;
height:293px;
		background-image: url(/img/aboutus/banner.png);
		background-size: 1920px 293px;
		background-position: center center;
		background-repeat: no-repeat;
    }
    h4{
        margin:78px auto 52px;

font-size: 36px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
text-align: center;
    }
    .intro1{
        padding-right:569px;
        box-sizing: border-box;
        padding-top:137px;
		background-image: url(/img/aboutus/logo.png);
		background-size: 456px 376px;
		background-position: right top;
		background-repeat: no-repeat;
        p{
            width:527px;
font-size: 24px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
line-height: 1.5;
text-indent: 48px;
        }
    }
    .intro2{
        padding: 80px 0;
		background-image: url(/img/aboutus/bg1.png);
		background-size: 1920px 272px;
		background-position: center center;
		background-repeat: no-repeat;
font-size: 24px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
text-indent: 48px;
line-height: 1.5;
    }
    .intro3{
        padding:76px 0;
        p{

font-size: 24px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
text-indent: 48px;
line-height: 1.5;
margin-bottom:47px;

&:nth-child(2){
    margin:0;
}
        }
    }
    .intro4{
        padding: 68px 0 160px;
		background-image: url(/img/aboutus/bg2.png);
		background-size: 1920px 411px;
		background-position: center center;
		background-repeat: no-repeat;
font-size: 24px;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
text-indent: 48px;
line-height: 1.5;
p{

margin-bottom:47px;
&:nth-child(2){
    margin:0;
}
}
    }
}
</style>
