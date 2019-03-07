<template>
	<div>
		<h2>多人拼团设置</h2>
		<div class="container">
			<div class="text">基本信息</div>
			<div class="form-box">
				<el-form ref="form" :model="form" >
					<div class="left">
						<el-form-item label="活动类型 :" >多人拼团</el-form-item>
					
	                    <el-form-item label="活动数量 :" prop="number">
	                        <el-input v-model="form.number" placeholder="请设置最多可以开设多少个团" style="width:200px"></el-input>
	                    </el-form-item> 
	                    
	                    <el-form-item label="活动奖励 :" prop="reward">
	                        <el-select v-model="form.reward" placeholder="请选择活动奖励">
	                            <el-option key="one" label="礼券1" value="one"></el-option>
	                        </el-select>
	                    </el-form-item>
	                    
	                    <el-form-item label="活动有效期 :" >
	                        <el-date-picker v-model="form.data" :picker-options="pickerOptions" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" size="small" >
							</el-date-picker>
	                    </el-form-item>
	                    
	                    <el-form-item label="活动规则 :" >
	                        <el-input type="textarea" v-model="form.rule" style="width:380px " :rows="5"></el-input>
	                    </el-form-item>
					</div>
					
                    <div class="right">
                    	<el-form-item label="活动名称 :">
	                        <el-input v-model="form.name" placeholder="请设置活动默认名称，团长可修改" style="width:300px"></el-input>
	                    </el-form-item>
	                    
	                    <el-form-item label="活动目标 :">
	                        <el-input v-model="form.target" placeholder="请设置达成活动的目标" style="width:140px "></el-input>人
	                    </el-form-item> 
	                    
	                    <el-form-item label="本次活动将消耗 :">
	                        <div class="numbers">
	                        	<span></span>张
	                        	<el-button type="warning" icon="el-icon-star-off" circle size="mini" ></el-button>
	                        </div>
	                        <div class="surplus">
	                        	剩余：<span></span>张
	                        </div>
	                    </el-form-item>
	                    
	                    <el-form-item label="活动时限 :" >
	                       	<el-input v-model="form.hour" style="width:60px"></el-input>&nbsp;&nbsp;&nbsp;小时
	                      	<el-checkbox v-model="form.checked">终止与有效期结束时间一致</el-checkbox>
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
                    </div>
                    <div class="bottom">
                    	<el-form-item>
	                        <el-button type="primary" @click="onSubmit" size="medium">提交</el-button>
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
		name:"many",
		data(){
			return {
				imageUrl: '',
				form:{
					
				},
				
			}
		},
		methods:{
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
			//提交
			onSubmit(){
				
			},
			//返回
			quit(){
				
			}
		}
		
	}
</script>

<style>
	@import'../../assets/css/emplet.css'
</style>