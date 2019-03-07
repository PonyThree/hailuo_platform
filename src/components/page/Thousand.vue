<template>
	<div>
		<h2>万人众筹设置</h2>
		<div class="container">
			<div class="text">基本信息</div>
			<div class="form-box">
				<el-form ref="form" :model="form" >
					<!--活动类型-->
					<el-form-item label="活动类型 :" >万人众筹</el-form-item>
					
					<!--活动名称-->
                    <el-form-item label="活动名称 :" prop="name">
                        <el-input v-model="form.name" style="width:300px"></el-input>
                    </el-form-item> 
                    
                    <div class="target">
                    	<!-- 活动目标列表-->
	                    <div class="targetList" >
	                        <el-form :inline="true" :model="target" class="demo-form-inline">
								<el-form-item label="活动目标1:" >
									<el-input v-model="form.target" placeholder="请设置达成活动的目标" style="width:180px "></el-input>&nbsp;人
								</el-form-item>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	       
								<el-form-item  label="活动奖励1:">
							        <el-select v-model="form.region" placeholder="请选择活动奖励">
							            <el-option key="one" label="礼券1" value="bbk"></el-option>
							        </el-select>
							    </el-form-item>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<el-form-item label="本次将消耗 :">
			                        <div class="numbers">
			                        	<span></span>张
			                        	<el-button type="warning" icon="el-icon-star-off" circle size="mini" ></el-button>
			                        </div>
			                        <div class="surplus">
			                        	剩余：<span></span>张
			                        </div>
			                    </el-form-item>  
			                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			                    <el-form-item>
			                        <el-button type="primary" @click="deleteTarget" size="medium">删除目标</el-button>
			                    </el-form-item>
							</el-form>
							
	                    </div>
	                    
	                    <!--增加活动目标按钮-->
	                    <el-form-item>
	                        <el-button type="primary" @click="addTarget" size="medium">增加目标</el-button>
	                    </el-form-item>
                    </div>
                    

                    <el-form-item label="活动有效期 :" >
                        <el-date-picker v-model="form.data" :picker-options="pickerOptions" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" size="small" >
						</el-date-picker>
                    </el-form-item>
                    
                    <el-form-item label="活动时限 :" >
                       	<el-input v-model="form.hour" style="width:60px"></el-input>&nbsp;&nbsp;&nbsp;小时
                      	<el-checkbox v-model="form.checked">终止与有效期结束时间一致</el-checkbox>
                    </el-form-item>
                    
                    <el-form-item label="活动规则 :" >
                        <el-input type="textarea" v-model="form.rule" style="width:380px " :rows="5"></el-input>
                    </el-form-item>
                    
                    <div class="bottom-left">
                		<el-form-item label="活动首页图片 :" >
	                       	<el-upload action="" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<el-button type="danger" icon="el-icon-delete" circle @click="delateHome"></el-button>
	                    </el-form-item>
                	</div>
                	
                	<div class="bottom-right">
                		<el-form-item label="活动详情页图片 :" >
	                       	<el-upload action="" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<el-button type="danger" icon="el-icon-delete" circle @click="delateDetail"></el-button>
	                    </el-form-item>
                	</div>

	                <div class="bottom">
	                	<el-form-item>
	                        <el-button type="primary" @click="onSubmit" size="medium">保存</el-button>
	                        <el-button type="primary" @click="quit" size="medium">返回</el-button>
	                    </el-form-item>
	                </div>
	          
	                
	                
	            </el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"thousand",
		data(){
			return{
				form:{
					
				},
				target:{},
				imageUrl:''
			}
		},
		methods:{
			//新增目标事件
			addTarget(){},
			//删除目标事件
			deleteTarget(){},
			//日期
			pickerOptions(){
				
			},
			//上传图片
			handleAvatarSuccess(res, file) {
        		
		    },
		    beforeAvatarUpload(file) {
		    	
		    },
		    //删除首页图片
		    delateHome(){},
		    //删除详情页图片
		    delateDetail(){},
		    //保存事件
		    onSubmit(){},
		    //还回事件
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
	.form-box{
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.numbers{
		float: left;
		width: 80px;
		height: 32px;
	}
	.numbers span{
		display: inline-block;
		width: 50px;
		text-align: center;
	}
	.surplus{
		width: 120px;
		float: left;
		margin-left: 100px;
		height: 32px;
	}
	.surplus span{
		display: inline-block;
		width: 50px;
		text-align: center;
	}
	.el-button--warning {
	    color: #fff;
	    background-color: #f56c6c;
	    border-color: #f56c6c;
	    position: relative;
  		left:80px;
  		bottom:33px;
	}
	.el-checkbox__input.is-checked+.el-checkbox__label {
	    color: rgb(50, 65, 87);;
	}
	.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
	    background-color: rgb(50, 65, 87);
	    border-color:rgb(50, 65, 87);
	}
	.el-checkbox__inner:hover {
	    border-color: rgb(50, 65, 87);
	}
	.el-input.is-active .el-input__inner, .el-input__inner:focus {
	    border-color: rgb(50, 65, 87);
	}
	.el-select .el-input__inner:focus {
	    border-color: rgb(50, 65, 87);
	}
	.el-date-table td.today span {
	    color: rgb(50, 65, 87);
	}
	.el-date-table td:hover span{
	    background: rgb(50, 65, 87);
	    color:#fff;
	}
	.el-date-table td.end-date span, .el-date-table td.start-date span {
	    background-color: rgb(50, 65, 87);
	}
	.el-textarea__inner:focus {
	    border-color: rgb(50, 65, 87);
	}
	.left{
		float:left;
		width: 40%;
		margin-left: 100px;
	}
	.right{
		float: left;
		width: 50%;
		margin-left: 50px;
	}
	.el-checkbox{
		margin-left: 40px;
	}
	.el-upload.el-upload--text{
		width: 150px;
		height: 150px;
		float: left;
	}
	.el-icon-plus.avatar-uploader-icon{
		line-height: 150px;
		text-align: center;
	}
	.el-button--danger {
	    color: #fff;
	    background-color: #999;
	    border: none;
	    float: left;
	    margin-top: 55px;
	    margin-left: 20px;
	}
	.el-button--danger:focus, .el-button--danger:hover {
	    background: rgb(50, 65, 87);
	    border-color: rgb(50, 65, 87);
	    color: #fff;
	}
	.bottom-left{
		width: 45%;
		float: left;
	}
	.bottom-right{
		width: 50%;
		float: left;
	}
	.bottom{
		width: 100%;
		height: auto;
		overflow: hidden;
		text-align: center;
		margin-top: 100px;
		float: left;
	}
	.target{
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-top: 50px;
		margin-bottom: 30px;
	}	
	
</style>