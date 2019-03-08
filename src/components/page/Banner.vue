<template>
	<div>
		<h2>banner管理</h2>
		
		<!--新增-->
		<el-button class="btn" @click="addList">新增</el-button>
		<!--表格列表-->
		<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
			<el-table-column prop="num" label="" align="center" width="40">
				<template scope="scope">
					<span>{{scope.$index+1}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="imgUrl" label="图片" align="center" >
				<template scope="scope">
					<span></span>
				</template>
			</el-table-column>
			<el-table-column prop="href" label="跳转链接设置" align="center" ></el-table-column> 
			<el-table-column prop="description" label="图片描述" align="center" ></el-table-column>
			<el-table-column prop="sort" label="排序值" align="center" ></el-table-column>
			<el-table-column prop="id" ></el-table-column>
			<el-table-column prop="caozuo" label="操作" align="center" >
				<template slot-scope="scope">
                        <el-button icon="el-icon-edit" @click="handleEdit(scope.$index)">编辑</el-button>
                        <el-button icon="el-icon-delete" class="red" @click="deleteMember(scope.$index)">删除</el-button>
                    </template>
			</el-table-column>
			
			<!-- 编辑弹出框 -->
	        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
	            <el-form ref="form" :model="form" label-width="70px" :label-position="labelPosition">
	                <el-form-item label="图片" style="width:92%;position: relative;">
	                    <el-upload class="avatar-uploader" action="http://192.168.1.140:9913/activityBanner/insert" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" style="width:92%;">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>         
						<el-button type="danger" icon="el-icon-delete" circle style="position: absolute;top:40%;margin: 0;left:101%"></el-button>
	                </el-form-item>
	                <el-form-item label="跳转链接">
	                    <el-input v-model="form.href"></el-input>
	                </el-form-item>
	                <el-form-item label="图片描述">
	                    <el-input v-model="form.description"></el-input>
	                </el-form-item>
	                <el-form-item label="排序">
	                    <el-input v-model="form.sort"></el-input>
	                </el-form-item>
	            </el-form>
	            <span slot="footer" class="dialog-footer">
	            	
	            	<el-button type="primary" @click="saveEdit">保存</el-button>
	                <el-button @click="editVisible = false">取 消</el-button> 
	            </span>
	        </el-dialog>
		</el-table>
		
		<!--分页器-->
		<el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pagesize"  :total="tableData.length" layout="total, sizes, prev, pager, next,jumper">
		</el-pagination>
		
		
        
        
        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="formList" :model="formList" label-width="70px" :label-position="labelPosition">
                <el-form-item label="图片">
                    <el-upload class="avatar-uploader" action="http://192.168.1.140:9913" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar" >
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
                </el-form-item>
                <el-form-item label="跳转链接">
                    <el-input v-model="formList.href" ></el-input>
                </el-form-item>
                <el-form-item label="图片描述">
                    <el-input v-model="formList.description" ></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="formList.sort" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            	<el-button type="primary" @click="addEdit">保存</el-button>
                <el-button @click="addVisible = false">取 消</el-button> 
            </span>
        </el-dialog> 
	</div>
</template>

<script>
	
	export default {
        name: 'banner',
        data() {
            return {
            	labelPosition: 'left',
            	editVisible: false,
            	addVisible: false,
            	delVisible: false,
	          	imageUrl: '',
				form: {
                   imgUrl: '',
                   href: '',
                   description: '',
                   sort:''
                },
                formList: {
                    imgUrl: '',
                    href: '',
                    description: '',
                    sort:'' 
                },
                tableData:[],
                
		       	//分页
		       	currentPage: 1,//默认显示第一页
//		       	total:0,//总条数，根据接口获取数据长度(注意：这里不能为空)
		       	pagesize:5,//每页的数据
//		       	size:10,
//		       	pageNum:1   
     		}
        },
        //生命周期
        created(){
        	
        	//渲染banner信息
			this.$axios.get(request.testUrl+"/activityBanner/pageSelect?page=1&pageSize=20")
	        	.then(res=>{
		  			if(res.data.code==0){
	//	  				console.log(res.data)
		  				this.tableData=res.data.data.records;
		  			}
	        	});
	        	
			this.handleUserList()
        },
        
        
        methods:{
        	//封装渲染banner信息
        	save(){
        		this.$axios.get(request.testUrl+"/activityBanner/pageSelect?page=1&pageSize=20")
	        	.then(res=>{
			  			if(res.data.code==0){
		//	  				console.log(res.data)
			  				this.tableData=res.data.data.records;
			  			}else{
		  				
		  			}
	        	});
        	},
        	
        	//增加banner按钮弹框
        	addList(){
        		this.addVisible=true;		
        	},
        	
			//增加banner保存
        	addEdit(){
                var params = new URLSearchParams();	
//              params.append('imgUrl', this.infoForm.imgUrl);
                params.append('href', this.formList.href);
                params.append('description', this.formList.description);
                params.append('sort', this.formList.sort);
//              console.log(params)				
                this.$axios.post(request.testUrl+"/activityBanner/insert",params)
					.then(res=>{
		    			console.log(res.data)
		    			if(res.data.code==1){
		    				this.addVisible=false;
		    				this.save();
		    			}
		    		})
        	},
        	
        	//编辑跳出弹框
        	handleEdit(index) {
        		var id=this.tableData[index].id;
        		console.log(id)

            	this.editVisible = true;
            	
           	},
           	
		    // 保存编辑
            saveEdit() {
                
            },
            
        	//删除这一行
           	deleteMember(index){
           		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var id=this.tableData[index].id;
					//console.log(id);
					var params = new URLSearchParams();
					params.append('id', id);
					this.$axios.post(request.testUrl+"/activityBanner/delete ",params)
					.then(res=>{
						//console.log(res)
						this.save()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
           	},
            
           	//文件上传成功的函数
       	    handleAvatarSuccess(res, file) {
	            this.imageUrl = URL.createObjectURL(file.raw);
	        },
	        //上传文件之前的函数
           	async beforeAvatarUpload(file) {
           		const isSubmit = await this.$confirm('此操作将上传文件, 是否继续?', '提示', {
           			confirmButtonText: '确定',
           			cancelButtonText: '取消',
           			type: 'warning'
           		}).then(() => {
           			return true
           		}).catch(() => {
           			return false
           		});
           		//console.log(isSubmit)
           		return isSubmit;
           	},
           	
           	
           	//分页功能
           	// 初始页currentPage、初始每页数据数pagesize和数据data
		    handleCurrentChange(currentPage) {
		        this.currentPage = currentPage; //点击第几页
		    },
            handleSizeChange(size){
            	this.pagesize = size; //每页下拉显示数据
            },
            handleUserList(){
//          	this.$axios.post(request.testUrl+)
//					.then(res=>{
//		    			//console.log(res.data)
//		    	})
            }
            
           	
        }

    }  
</script>

<style>
	.btn{
		margin-top: 40px;
		margin-bottom: 15px;
		width: 80px;
		height: 40px;
		font-size: 16px;
		color:#999;
		letter-spacing: 2px;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	    width: 300px;
	    height: 178px;
  	}
	.avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	}
  	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 300px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
  	}
  	.avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
  	}
  	.avatar-uploader{
  		display: inline;
  	}
  	
  	.el-dialog__header{
  		background: #999;
  	}
  	.el-button:focus, .el-button:hover {
	    color: #fff;
	    border-color: #999;
	    background-color: #999;
	}
	/*.el-button--primary {
	    color: #999;
	    background: #fff;
	    border-color: #999;
	}
	.el-button--primary:hover {
	    background: #999;
	    border-color: #999;
	    color: #fff;
	}*/
	.el-dialog__headerbtn .el-dialog__close {
    	color: rgb(50, 65, 87);
	}
	.el-pagination li.active {
        background: rgb(50, 65, 87) !important;
    }
    .el-pager li.active {
        color: #fff;
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover {
    	color: #999;
    }
    .el-select .el-input.is-focus .el-input__inner {
    	border-color: #999;
	}
	.el-pagination__sizes .el-input .el-input__inner:hover {
    	border-color: #999;
	}
	.el-select .el-input__inner:focus {
	    border-color: #999;
	}
	.el-select-dropdown__item.selected {
	    background: rgb(50, 65, 87);
	    color:#fff;
	    font-weight: 700;
	}
	.el-pagination{
		margin-top: 20px;
		text-align: center;
	}
	.el-input__inner:focus {
    	border-color: #999;
    }
    .el-button--danger {
	    color: #fff;
	    background-color: #999;
	    border: none;
	}
	.el-button:focus, .el-button:hover {
	    color: #fff;
	    border-color: rgb(50, 65, 87);
	    background-color: rgb(50, 65, 87);
	}
	.el-upload.el-upload--text{
		width:100%;
	}
	.el-icon-plus.avatar-uploader-icon{
		width:100%;
	}
	
</style>