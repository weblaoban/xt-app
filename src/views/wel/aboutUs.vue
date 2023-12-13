<!-- 关于我们 -->
<template>
	<div class="index-container aboutus">
        <main-header title="关于我们"></main-header>
        <h4>公司简介</h4>
        <div class="container">

            <div class="intro1">
                <p>
                瑔石信托网，是杭州泓林信息咨询有限公司的旗下平台，自成立以来，我们致力于为广大投资者提供优质的资产配置服务。团队是由一批拥有丰富金融知识和实践经验的行业先锋组成，以专业的知识和热情的服务，帮助投资者实现财富的保值和增值。</p>
                <img src="/img/aboutus/logo.png" alt="">
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
    background: #fff;
font-size: 0.28rem;
    h4{
        margin:0.81rem auto 0.4rem;

        font-size: 0.36rem;
font-family: PingFang SC;
font-weight: 400;
color: #30333B;
text-align: center;
    }
    .intro1{
        p{
font-size: 0.28rem;
font-family: PingFang SC;
font-weight: 400;
color: #30333B;
text-indent: 0.6rem;
        }
        img{
            width:4.65rem;
            display: block;
            margin:0.5rem auto;
        }
    }
    .intro2{
        padding: 0.48rem 0;
background: #F8FAFB;
font-size: 0.28rem;
font-family: Heiti SC;
font-weight: 500;
color: #30333B;
text-indent: 48px;
line-height: 1.5;
.container{

    font-size: 0.28rem;
font-family: PingFang SC;
font-weight: 400;
color: #30333B;
text-indent: 0.6rem;
}
    }
    .intro3{
        padding:0.5rem 0;
        p{

            font-size: 0.28rem;
font-family: PingFang SC;
font-weight: 400;
color: #30333B;
text-indent: 0.6rem;
margin-bottom:1rem;

&:nth-child(2){
    margin:0;
}
        }
    }
    .intro4{
background: #F8FAFB;
        padding: 0.47rem 0 1rem;
line-height: 1.5;
p{

    font-size: 0.28rem;
font-family: PingFang SC;
font-weight: 400;
color: #30333B;
text-indent: 0.6rem;
margin-bottom:1rem;
&:nth-child(2){
    margin:0;
}
}
    }
}
</style>
