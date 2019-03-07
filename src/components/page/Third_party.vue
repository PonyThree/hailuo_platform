<template>
	<div>
		<h2>礼券详情</h2>
		<div class="container">
			<div class="text">基本信息</div>
			<ul v-for="(item, index) in menus" class="coupons">
				<li>
					<span class="name">礼券编号:</span>
					<div class="main">{{item.name}}</div>
				</li>
				<li>
					<span class="name">礼券名称:</span>
					<div class="main">{{item.type}}</div>
				</li>
				<li>
					<span class="name">适用活动类型:</span>
					<div class="main">{{item.ee}}</div>
				</li>
				<li>
					<span class="name">礼券面额:</span>
					<div class="main">{{item.num}}元</div>
				</li>
				<li>
					<span class="name">礼券获得时间:</span>
					<div class="main">{{item.data}}</div>
				</li>
				<li>
					<span class="name">所属人手机号:</span>
					<div class="main">{{item.hh}}</div>
				</li>
				<li>
					<span class="name">礼券状态:</span>
					<div class="main">{{item.hh}}</div>
				</li>
				<li>
					<span class="name">所属活动编号:</span>
					<div class="main">{{item.hh}}</div>
				</li>
				<li>
					<span class="name">使用有效期:</span>
					<div class="main">{{item.hh}}</div>
				</li>
				<li>
					<span class="name">核销人:</span>
					<div class="main">{{item.hh}}</div>
				</li>
				<li>
					<span class="name">使用规则:</span>
					<div class="main">{{item.hh}}</div>
				</li>
				<li>
					<span class="name">核销时间:</span>
					<div class="main">{{item.hh}}</div>
				</li>
			</ul>
			<div class="bottom">

                <el-button type="primary" @click="remove" size="medium" style="margin-right: 60px;">核销</el-button>
                <el-button type="primary" @click="quit" size="medium" style="margin-right: 45px;">返回</el-button>

            </div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"third_party",
		data(){
			return{
				menus:[{
					
				}]
			}
		},
		methods:{
			//下载礼券详情
			remove(){},
			//返回
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
	
	.bottom{
		width: 100%;
		height: auto;
		overflow: hidden;
		text-align: center;
		margin-top: 100px;
		float: left;
	}
</style>