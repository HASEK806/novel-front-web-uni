<template>
	<view class="personal-box">
		<view class="top">
			<image class="img" src="../../static/icon01.png"/>
			<view @click="handleLogin">点击登录</view>
		</view>
		<view class="content">
			<view class="item">账号安全</view>
			<view class="item">设置</view>
			<view class="item">关于我们</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			handleLogin() {
				uni.navigateTo({
		            //保留当前页面，跳转到应用内的某个页面
		            url: '/pages/login/login'
		        })
			}
		}
	}
</script>

<style lang="scss">
	.personal-box {
		.top {
			box-sizing: border-box;
			width: 100%;
			height: 100px;
			padding: 15px;
			background: #ffffff;
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			.img {
				padding-right: 15px;
				width: 50px;
				height: 50px;
			}
		}
	}
	.content {
		background-color: #ffffff;
		.item {
			position: relative;
			width: 100%;
			height: 50px;
			line-height: 35px;
			padding: 10px 15px;
			box-sizing: border-box;
			color: #606367;
			font-size: 12px;
		}
		.item:after {
			content: "";
			position: absolute;
			width: calc(100% - 30px);
			height: 1px;
			background: #f7f7f7;
			bottom: 0;
			left: 15px;
		}
		.item::before {
			content: "";
			position: absolute;
			width: 20px;
			height: 20px;
			background-image: url(../../static/icon02.png);
			background-size: contain;
			top: 15px;
			right: 15px;
		}
		.item:last-child::after {
			content: none;
		}
	}

</style>
