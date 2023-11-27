<!-- 私募基金 -->
<template>
	<div class="index-container">
        <main-header :active="3"></main-header>
		私募基金
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

<style lang="scss">

</style>
