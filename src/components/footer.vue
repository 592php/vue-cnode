<template>
	<div class="tabar" v-show="isShowTabbar">
		<div class="tab">
			<div class="tab-item">
				<router-link to="/home">
					<div class="tab-icon"> <i class="iconfont icon-shouye-copy"></i></div>
					<div class="tab-text">首页</div>
				</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/postarticle">
					<div class="tab-icon"> <i class="iconfont icon-fabu"></i></div>
					<div class="tab-text">发布</div>
				</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/travel">
					<div class="tab-icon"> <i class="iconfont icon-xiaoxi"></i></div>
					<div class="tab-text">消息</div>
				</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/personal">
					<div class="tab-icon"> <i class="iconfont icon-home"></i></div>
					<div class="tab-text">我的</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {}
  },
	  computed: {
	    isShowTabbar() {
	      let routeLength = this.$route.path.split('/').length
	      return !(routeLength > 2)
    }
  }
	}
</script>

<style scoped lang="scss">
	@import '../assets/css/px2rem';
	.tabar {
		.tab {
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			width: 100%;
			height: px2rem(100px);
			line-height: px2rem(100px);
			background: #fff;
			box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
			&:after {
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				border-top: 1px solid rgba(7, 17, 27, 0.1);
				content: '';
			}
			.tab-item {
				flex: 1;
				text-align: center;
				.router-link-active {
					color: #0bd38a;
					text-decoration: none;
					i {
						color: #0bd38a;
					}
				}
				a {
					display: block;
					font-size: 14px;
					color: rgb(77, 85, 93);
					&.active {
						color: #76d49b;
						text-decoration: none;
					}
					.tab-icon {
						width: px2rem(50px);
						height: px2rem(50px);
						margin: 0 auto;
						i {
							font-size: px2rem(40px);
							position: relative;
							top: px2rem(-15px);
						}
					}
					.tab-text {
						height: px2rem(60px);
						line-height: px2rem(60px);
					}
				}
			}
		}
	}
</style>