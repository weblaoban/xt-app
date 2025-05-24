<template>
	
	<div :class="'title ' + 'title' + currentCat">
		<div class="titlePrefixCon" v-if="currentCat === 97">
			<div class="titlePrefix">
				集<span></span>合<span></span>信<span></span>托
			</div>
		</div>
		<div class="titlePrefixCon" v-if="currentCat === 98">
			<div class="titlePrefix">
				直<span></span>融<span></span>资<span></span>产
			</div>
		</div>
		<div class="titlePrefixCon" v-if="currentCat === 99">
			<div class="titlePrefix">
				私<span></span>募<span></span>基<span></span>金
			</div>
		</div>
		<div class="titlePrefixCon" v-if="currentCat === 101 || currentCat === 102">
			<div class="titlePrefix">保<span></span>险</div>
		</div>
		<div class="titlePrefixCon" v-if="currentCat === 3">
			<div class="titlePrefix">境<span></span>外<span></span>债</div>
		</div>
		<img
				v-if="currentCat === 101 || currentCat === 102 && item.tpe === 0"
				class="bao"
				src="/img/chu.png"
				alt=""
		/>
		<img
				v-if="currentCat === 101 || currentCat === 102 && item.tpe === 1"
				class="bao"
				src="/img/zhong.png"
				alt=""
		/>
		<div class="titleDesc">{{ item.name }}</div>
	</div>
</template>
<script>
export default {
	props: ["item", "currentCat"],
	data() {
		return {}
	},
}
</script>
<style>

.title {
	// width: 4.71rem;
	font-size: 0.32rem;
	font-family: PingFang SC;
	font-weight: 400;
	color: #30333b;
	margin-bottom: 0.1rem;
	box-sizing: border-box;
	// padding-left: 1rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	
	// background-image: url(/img/h5/title1.png);
	// background-repeat: no-repeat;
	// background-size: 0.92rem 0.3rem;
	// background-position: left center;
	display: flex;
	align-items: center;
	&.title100 {
		//   background-image: url(/img/h5/title2.png);
		.titlePrefix {
			background-image: -webkit-linear-gradient(right, #7683d9, #d8a0fe);
			border-image: linear-gradient(-90deg, #7683d9, #d8a0fe) 1 1;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			width: 0.92rem;
			height: 0.3rem;
			border-radius: 2px;
			border: 1.5px solid;
			content: attr(data-content);
			font-weight: 400;
			font-size: 0.2rem;
			text-align: center;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			padding: 0 0.1rem;
			align-items: center;
			border-image: linear-gradient(-90deg, #7683d9, #d8a0fe) 1 1;
		}
	}
	// &.title99 {
	//   background-image: url(/img/h5/title3.png);
	// }
}

.titlePrefixCon {
	width: 0.92rem;
	height: 0.3rem;
	border-radius: 2px;
	overflow: hidden;
}
.titlePrefix {
	background-image: -webkit-linear-gradient(right, #89f7fe, #66a6ff);
	border-image: linear-gradient(-90deg, #89f7fe, #66a6ff) 1 1;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	width: 0.92rem;
	height: 0.3rem;
	border-radius: 2px;
	border: 1.5px solid;
	content: attr(data-content);
	font-weight: 400;
	font-size: 0.2rem;
	text-align: center;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	padding: 0 0.04rem;
	align-items: center;
	border-image: linear-gradient(-90deg, #89f7fe, #66a6ff) 1 1;
}
.bao {
	width: 0.3rem;
	height: 0.3rem;
	margin-left: 0.05rem;
}
</style>
