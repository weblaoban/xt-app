<template>
	<div class="avue-contail" :class="{ 'avue--collapse': isCollapse }">
		<div
			class="avue-layout"
			:class="{ 'avue-layout--horizontal': isHorizontal }"
		>
			<div class="avue-main">
				<div id="avue-view" v-show="!isSearch" v-if="isRefresh">
					<router-view #="{ Component }">
						<keep-alive :include="$store.getters.tagsKeep">
							<component :is="Component" />
						</keep-alive>
					</router-view>
				</div>
				<div class="avue-footer">
					<p class="copyright"></p>
				</div>
			</div>
		</div>
		<!-- <wechat></wechat> -->
	</div>
</template>

<script>
import index from "@/mixins/index";
import { validatenull } from "utils/validate";
import { mapGetters } from "vuex";
export default {
	mixins: [index],
	name: "index",
	provide() {
		return {
			index: this,
		};
	},
	computed: {
		...mapGetters([
			"isHorizontal",
			"isRefresh",
			"isLock",
			"isCollapse",
			"isSearch",
			"menu",
			"setting",
		]),
		validSidebar() {
			return !(
				(this.$route.meta || {}).menu == false ||
				(this.$route.query || {}).menu == "false"
			);
		},
	},
	props: [],
};
</script>
