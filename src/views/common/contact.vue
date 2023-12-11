<template>
    
			<div class="customer" @click="showContact = true">
				<img src="/img/message.png" alt="" />
			</div>
            
		<!-- 客户咨询 -->
		<div class="contentMask" v-if="showContact">
			<div class="contact">
				<div class="contactTitle">客户咨询</div>
				<img
					class="close el-icon-close"
					@click="showContact = false"
					src="/img/close.png"
					alt=""
				/>

				<div class="contactCon">
					<div class="contactTips">
						您好，请务必留下您的联系方式，客服会 根据您的问题及时回电
					</div>
					<div class="contactItem">
						<p class="label">姓名</p>
						<input v-model="contact.name" type="text" />
					</div>
					<div class="contactItem">
						<p class="label">手机号</p>
						<input v-model="contact.tel" type="text" />
					</div>
					<div class="contactItem">
						<p class="label">咨询内容</p>
						<textarea
							resize="none"
							v-model="contact.content"
							name=""
							class="textarea"
							id=""
							cols="30"
							rows="4"
						></textarea>
					</div>
					<div class="button" @click="sendComm">提交</div>
				</div>
			</div>
		</div>
</template>
<script>
import { addComment } from "@/api/index.js";
export default {
    data(){
        return {
			showContact: false,
			contact: {
				name: "",
				tel: "",
				content: "",
			},
			loading: false,
        }
    },
    methods:{
        
		sendComm() {
			if (this.loading) {
				return;
			}
			const { name, tel, content } = this.contact;
			if (!name || !tel || !content) {
				return;
			}
			this.loading = true;
			addComment({ ...this.contact })
				.then((res) => {
					const data = res.data;
					if (data && data.success) {
						this.$message.success("提交成功");
						this.contact = {
							name: "",
							tel: "",
							content: "",
						};
						this.showContact = false;
						this.loading = false;
					}
				})
				.catch(() => {
					this.loading = false;
				});
		},
    }
}
</script>

<style lang="scss" scoped>

.customer {
		width: 0.76rem;
		height: 0.76rem;
		background: #ec5e2a;
		box-shadow: 0px 3px 5px 0px rgba(115, 89, 41, 0.5);
		border-radius: 0.12rem;

		font-family: Heiti SC;
		font-weight: 500;
		color: #ffffff;
		position: fixed;
		right: 0;
		top: 5.3rem;
		padding-left: 0.1rem;
		display: flex;
		align-items: center;
		line-height: 1;
		box-sizing: border-box;
		img {
			width: 0.56rem;
			height: 0.56rem;
		}
	}

    
.contentMask {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	overflow-y: scroll;
	background: rgba(0, 0, 0, 0.5);
	z-index: 400;
}
.contact {
	width: 6.5rem;
	height: 9.28rem;
	background: #ffffff;
	box-shadow: 0rem 0rem 0rem 0rem rgba(105, 105, 105, 0.5);
	border-radius: 0.12rem;
	position: relative;
	box-sizing: border-box;
	position: fixed;
	top: 1.4rem;
	left: 0.5rem;
	margin: auto;

	right: 0.5rem;
	.contactCon {
		padding: 0.2rem 0.3rem;
		box-sizing: border-box;
	}
	.contactTitle {
		height: 0.8rem;
		background: #dea949;
		border-radius: 0.12rem 0.12rem 0rem 0rem;
		font-size: 0.32rem;
		font-family: Heiti SC;
		font-weight: 500;
		color: #ffffff;
		line-height: 0.8rem;
		text-align: center;
	}
	.close {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: -1rem;
		z-index: 2;
		width: 0.64rem;
		height: 0.64rem;
		cursor: pointer;
	}
	.contactTips {
		background: #fdf8ef;
		font-size: 0.28rem;
		font-family: Heiti SC;
		font-weight: 500;
		color: #9a9a9c;
		padding: 0.26rem 0.3rem;
		margin-bottom: 0.3rem;
	}
	.contactItem {
		.label {
			font-size: 0.28rem;
			font-family: PingFang SC;
			font-weight: 400;
			color: #9a9a9a;
			line-height: 0.31rem;
			margin: 0 0 0.2rem 0;
		}
		input {
			width: 100%;
			height: 0.68rem;
			background: #f8fafb;
			border-radius: 0.12rem;

			background: #f8f8f8;
			border: none;
			outline: none;
			padding: 0 0.1rem;
			box-sizing: border-box;
		}
		textarea {
			width: 100%;
			background: #f8f8f8;
			border-radius: 0.12rem;
			border: none;
			outline: none;
			resize: none;
			padding: 0.1rem;
			box-sizing: border-box;
		}
	}
	.button {
		width: 100%;
		margin-top: 0.4rem;
	}
}
</style>