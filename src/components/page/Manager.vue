<template>
    <div>
    	<h2>项目信息</h2>
    	<div class="container"> 
    		
			<div class="text">基本信息</div>
			<el-form :model="form">
    				
    			<el-form-item label="项目名称 :" style="margin-left: 35%;">
    				<el-input v-model="form.name" style="width:400px"></el-input>
    			</el-form-item>
    			
    			<el-form-item label="项目地址 :" style="margin-left: 35%;">
    				<el-input v-model="form.project_loc" style="width:400px"></el-input>
    			</el-form-item>
    			
    			<el-form-item label="项目活动推广二维码 :" style="margin-left: 35%;">
    				<img class="img" style="width: 80px; height: 80px; border: 1px solid #999;float: left;margin-right: 20px;" src="###">
    					
    				</img>
    				<a href="#" @click="" class="down">下载</a>
    			</el-form-item>
    			
    			<div class="text" style="margin-top: 50px;">置业顾问管理</div>
    			
    			<!--新增成员-->
				<el-button class="member" @click="addMember" style="margin-left: 20%;">新增成员</el-button>
				
				<!--表格列表-->
				<el-table :data="memberData" border style="width:60%; margin-left: 20%;">
					<el-table-column prop="num" label="序号" align="center" width="100">
						<template scope="scope">
							<span>{{scope.$index+1}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="置业顾问名称" align="center" width="266"></el-table-column>
					<el-table-column prop="id" label="" align="center" width="266" v-show:"1==2"></el-table-column>
					<el-table-column prop="phone" label="手机号" align="center" width="266"></el-table-column>
				
					<el-table-column prop="caozuo" label="操作" align="center" width="310">
						<template slot-scope="scope">
		                        <el-button icon="el-icon-delete"  ref="myId" class="red" @click="deleteMember(scope.$index)">删除</el-button>
		                </template>
					</el-table-column>
				</el-table>
				          
				
				<div class="bottom">
					<el-button type="primary" @click="onSubmit" size="medium">保存</el-button>
				</div>

    		</el-form>
    		
    		<!-- 编辑新增成员弹出框 -->
	        <el-dialog title="新增选项" :visible.sync="editVisible" width="40%">
	            <el-form ref="infoForm" :model="infoForm" label-width="70px" >
	                <el-form-item label="名称:">
	                    <el-input v-model="infoForm.name" placeholder="请输入需要添加人员的姓名"></el-input>
	                </el-form-item>
	                
	                <el-form-item label="手机号">
	                    <el-input v-model="infoForm.phone" placeholder="请输入需要添加人员的手机号"></el-input>
	                </el-form-item>
	            </el-form>
	            
	            <span slot="footer" class="dialog-footer">
	            	<el-button type="primary" @click="saveEdit">保存</el-button>
	                <el-button @click="editVisible = false">取 消</el-button> 
	            </span>
	        </el-dialog>
	        
	        
    	</div>
    </div>
</template>

<script>
	
    export default { 
        name: 'manager',
        data() {
            return {
                form:{},
                infoForm:{
                	name:'',
                	phone:''
                },
                memberData:[{
                }],
                editVisible:false,
                delVisible:false,  
                
            }
        },
        //生命周期
        created(){
        	
        	//渲染项目信息
        	this.$axios.get(request.testUrl+"/activityProject/getOne")
        		.then(res=>{
      			//console.log(res)
        			this.form=res.data.data;
        		})
        	//渲染置业顾问信息
        	this.$axios.get(request.testUrl+"/projectConsultant/pageSelect")
	        	.then(res=>{
	        		//console.log(res);
	        		this.memberData=res.data;
	        		
	        	})
        	
        },
        methods:{
        	//定义函数
        	save(){
        		//渲染置业顾问信息
        		this.$axios.get(request.testUrl+"/projectConsultant/pageSelect")
		        	.then(res=>{
	//	        		console.log(res);
		        		this.memberData=res.data;
		        	})
        	},
        	//增加新成员
        	addMember(){
        		this.editVisible=true;
        	},
			//保存新增成员弹框
        	saveEdit(){
//      		console.log(this.infoForm.name+this.infoForm.phone)
        		var params = new URLSearchParams();
				params.append('name', this.infoForm.name);
				params.append('phone', this.infoForm.phone);
        		this.$axios.post(request.testUrl+"/projectConsultant/insert",params)
	        		.then(res=>{
	        			this.editVisible=false;//添加成功后关闭弹窗
	        			this.save();	
	        		})
        	},
        	//删除行
        	deleteMember(index){
        		 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					var id=this.memberData[index].id;
//					console.log(id);
					
					var params = new URLSearchParams();
					params.append('id', id);
//					console.log(params)
					this.$axios.post(request.testUrl+"/projectConsultant/delete",params)
					.then(res=>{
						this.save();//重新获取列表信息
				})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
				},
			//保存本页
        	onSubmit(){
        		
        	}
        }
       
    }

</script>


<style>
	
    h2{
    	margin-bottom: 20px;
    }
	.info{
		width:100%;
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
	.el-button:focus, .el-button:hover {
	    color: #fff;
	    border-color: #999999;
	    background-color: #999999;
	}
	.member{
		width: 98px;
		height: 40px;
		font-size: 16px;
		text-align: center;
		color:#999;
		letter-spacing: 2px;
		margin-bottom: 50px;
	}
	.el-input__inner:focus {
	    border-color: #999;
	}
	.download{
		color:#999;
	}
	.bottom{
		width: 100%;
		margin-top: 40px;
		text-align: center;
	}
	
	
	
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
	/*.el-upload.el-upload--text{
		width: 150px;
		height: 150px;
		float: left;
	}*/
	.el-icon-plus.avatar-uploader-icon{

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
	.down{
		color: cadetblue;
		font-size: 14px;
		margin-left: 20px;
		display: inline-block;
	}
	.down:active{
		color: rgb(50, 65, 87);
	}	
</style>
