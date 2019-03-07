<template>
	<div>
		<h2>三人拼团</h2>
		<div class="container">
			<div class="text">基本信息</div>
			<ul v-for="(item, index) in menus" class="coupons">
				<li>
					<span class="name">活动类型:</span>
					<div class="main">{{item.name}}</div>
				</li>
				<li>
					<span class="name">活动名称:</span>
					<div class="main">{{item.type}}</div>
				</li>
				<li>
					<span class="name">团编号:</span>
					<div class="main">{{item.ee}}</div>
				</li>
				<li>
					<span class="name">团状态:</span>
					<div class="main">{{item.num}}元</div>
				</li>
				<li>
					<span class="name">活动目标:</span>
					<div class="main">{{item.data}}</div>
				</li>
				<li>
					<span class="name">团进度:</span>
					<div class="main">{{item.hh}}</div>
				</li>
				<li>
					<span class="name">团有效期:</span>
					<div class="main">{{item.hh}}</div>
				</li>
				<li>
					<span class="name">活动奖励:</span>
					<div class="main">{{item.hh}}</div>
				</li>
				<li>
					<span class="name">团推广二维码:</span>
					<div class="main"><img src=""/><a href="#" @click="download" class="down">下载</a></div>
				</li>
			</ul>
			<div class="bottom">
                <el-button type="primary" @click="quit" size="medium">返回</el-button>
            </div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"many_details",
		data(){
			return{
				menus:[{
					
				}]
			}
		},
		methods:{
			//下载按钮
			download(){},
			//还回按钮
			quit(){}
		}
	}
</script>

<style>
	.container{
		margin-top: 40px;
		height: auto;
		overflow: hidden;
	}
	.text{
		width:100%;
		height: 60px;
		line-height: 60px;
		background: #F0F0F0;
		margin-bottom: 40px;
		color:#999;
		font-size: 18px;
		letter-spacing: 2px;
		text-indent: 16px;
	}
	.coupons{
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 50px;
	}
	.coupons li{
		list-style: none;
		width: 50%;
		margin: 20px auto;
		color:#909399;
		font-size: 18px;

		
	}
	.name{
		display: inline-block;
		margin-left: 100px;
		margin-right: 18px;
		vertical-align: top;
	}
	.main{
		display: inline-block;
		width:60%;
		height: auto;
		overflow: hidden;
		line-height: 24px;
		vertical-align:text-bottom;
	}
	.down{
		color: cadetblue;
		font-size: 14px;
		margin-left: 20px;
		display: inline-block;
	}
	.down:active{
		color: rgb(50, 65, 87);
	}
	.bottom{
		width: 100%;
		height: auto;
		overflow: hidden;
		text-align: center;
		margin-top: 100px;
		float: left;
	}
</style>