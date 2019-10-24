<template>
	<div>
		<h2>banner管理</h2>
		
		<!--新增-->
		<el-button class="btn" @click="addList">新增</el-button>
		<!--表格列表-->
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="num" label="" align="center" width="40">
				<template scope="scope">
					<span>{{scope.$index+1}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="img_url" label="图片" align="center" >
				<template slot-scope="scope">
					
					<img :src="scope.row.img_url"  style="width: 286px;height: 100px;"/>
				</template>
			</el-table-column>
			<!--<el-table-column prop="href" label="跳转链接设置" align="center" ></el-table-column> -->
			<el-table-column prop="description" label="图片描述" align="center" ></el-table-column>
			<el-table-column prop="sort" label="排序值" align="center" ></el-table-column>
			<el-table-column prop="id" v-show:"1==2"></el-table-column>
			<el-table-column prop="caozuo" label="操作" align="center" >
				<template slot-scope="scope">
                        <el-button icon="el-icon-edit" @click="handleEdit(scope.$index)">编辑</el-button>
                        <el-button icon="el-icon-delete" class="red" @click="deleteMember(scope.$index)">删除</el-button>
                    </template>
			</el-table-column>
			
			
		</el-table>
		
		<!--分页器-->
		<el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10]" :page-size="pagesize"  :total="total" layout="total, sizes, prev, pager, next,jumper">
		</el-pagination>
		
		
		<!-- 编辑弹出框 -->
	        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
	            <el-form ref="form" :model="form" label-width="70px" :label-position="labelPosition">
	                <el-form-item label="图片" style="width:92%;">
	                	<div style="width: 80%;height: 150px;display: block;float: left;position: relative;" id="aa">
	                		<img :src="form.imgUrl" alt="" style="width: 100%;height: 150px;display: block;"/>
	                		<img src="../../assets/img/2.png" alt="" style="width:10%;height:25%;position: absolute; right:0px;top:5px;" @click="show"/>
	                	</div>
						
						<div style="position: relative;float:left;display: none;" class="22222" id="cc">
							<el-upload action="auto" list-type="picture-card" :file-list="fileList2" with-credentials :before-upload="beforeUpload2" :http-request="uploadSectionFile2" :on-remove="afterRemove2" :on-exceed="handleExceed" :limit='1'>
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="form.imgUrl" alt="">
							</el-dialog>
						</div>
	 
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
	                <el-form-item >
	                    <el-input v-model="form.id" v-show="1==2"></el-input>
	                </el-form-item>
	            </el-form>
	            <span slot="footer" class="dialog-footer">
	            	<el-button type="primary" @click="savePic">保存</el-button>
	                <el-button @click="editVisible = false">取 消</el-button> 
	            </span>
	        </el-dialog>
        
        
        <!-- 新增弹出框 -->
        	
       
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="formList" :model="formList" label-width="70px" :label-position="labelPosition">
            	<el-form-item label="图片上传" prop="imgUrl">
            		
            		<el-upload action="auto" list-type="picture-card" :file-list="fileList" with-credentials :before-upload="beforeUpload" :http-request="uploadSectionFile" :on-remove="afterRemove" :on-exceed="handleExceed" :limit='1' >
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="formList.imgUrl" alt="">
					</el-dialog>
	
                </el-form-item>
                <el-form-item label="跳转链接" prop="href">
                    <el-input v-model="formList.href" ></el-input>
                </el-form-item>
                <el-form-item label="图片描述" prop="description">
                    <el-input v-model="formList.description" ></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="formList.sort" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            	<el-button type="primary" @click="addEdit('formList')" class="flag">保存</el-button>
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
            	uploadFile: "",
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
                fileList:[],
                fileList2:[],
                tableData:[{}],
                dialogVisible: false,
                
		       	//分页
		       	currentPage: 1,//默认显示第一页
		       	pagesize:5,//每页的数据
		       	total:0,
//		       	size:10,
//		       	pageNum:1 
				serverUrl:request.testUrl,
     		}
        },
        //生命周期
        
        
        created(){	
        	//渲染banner信息
			this.save()	
        },
        
      
        methods:{
        	//封装渲染banner信息
        	save(){
        		this.$axios.get(request.testUrl+"/activityBanner/pageSelect?page="+this.currentPage+"&pageSize="+this.pagesize)
	        	.then(res=>{
			  			if(res.data.code==0){
			  				//console.log(res.data.data)
			  				this.total=res.data.data.total
			  				this.tableData=res.data.data.records;
			  			}else{
		  				
		  			}
	        	});
        	},
        	
        	//增加banner按钮弹框
        	addList(){
        		this.addVisible=true;		
        	},
        	//新增图片上传
        	//上传前的限制
           	uploadSectionFile(param) {
		      let fileObj = param.file;
		 
		      const isLt2M = fileObj.size / 1024 / 1024 < 2;
		      if (!isLt2M) {
		        this.$message.error("上传图片大小不能超过 2MB!");
		        return;
		      }
		      if (fileObj.type === "image/jpeg") {
		        this.uploadFile = new File([fileObj], new Date().getTime() + ".jpg", {
		          type: "image/jpeg"
		        });
		      } else if (fileObj.type === "image/png") {
		        this.uploadFile = new File([fileObj], new Date().getTime() + ".png", {
		          type: "image/png"
		        });
		      } else {
		        this.$message.error("只能上传jpg/png文件");
		        return;
		      }
		    },
		    //图片上传
		    beforeUpload(file) {
		      var param = new FormData(); // FormData 对象
		      param.append("file", file); // 文件对象
		      this.$axios({
		        method: "post",
		        url: request.testUrl+"/image/upload",
		        data: param
		      })
		        .then(res => {
		        	if(res.data.code==0){
		        		this.formList.imgUrl=res.data.data;
		        		this.$message({
								type: 'info',
								message: "图片上传成功！"
							});	
		        	}  
		        })
		        .catch(error => {
		          //console.log(error)
		        });
		    },
		    //限制上传个数
		    handleExceed(files, fileList){
		    	this.$message({
	                type: 'info',
	                message: '只能上传一张图片！',
            	});
		    },
		    //已有的图片删除
		    afterRemove(file, fileList){
		    	this.$message({
	                type: 'info',
	                message: '已删除原有图片',
	                duration: 6000
            	});
		    },
			//增加banner保存
        	addEdit(formList){
                var params = new URLSearchParams();	
              	params.append('imgUrl', this.formList.imgUrl);
                params.append('href', this.formList.href);
                params.append('description', this.formList.description);
                params.append('sort', this.formList.sort);
//              console.log(params)				
                this.$axios.post(request.testUrl+"/activityBanner/insert",params)
					.then(res=>{
		    			//console.log(res.data)
		    			if(res.data.code==0){
		    				this.addVisible=false;
		    				 window.location.reload()
		    				this.save();
		    			}
		    		})
        	},
        	show(){
        		document.getElementById("aa").style.display="none",
        		document.getElementById("cc").style.display="block"
        	},
        	
        	//编辑跳出弹框
        	handleEdit(index) {
        		
        		var id=this.tableData[index].id;
        		var params = new URLSearchParams();
        		params.append('id', id);
        		//console.log(id)
				this.$axios.post(request.testUrl+"/activityBanner/getOne",params)
						.then(res=>{
							if(res.data.code==0){
								this.editVisible=true;

								this.form=res.data.data;
								// console.log(this.form.imgUrl)
							}
						})
           	},
           	
           	//编辑图片上传
			uploadSectionFile2(param){
				let fileObj = param.file;
		 
		      const isLt2M = fileObj.size / 1024 / 1024 < 2;
		      if (!isLt2M) {
		        this.$message.error("上传头像图片大小不能超过 2MB!");
		        return;
		      }
		      if (fileObj.type === "image/jpeg") {
		        this.uploadFile = new File([fileObj], new Date().getTime() + ".jpg", {
		          type: "image/jpeg"
		        });
		      } else if (fileObj.type === "image/png") {
		        this.uploadFile = new File([fileObj], new Date().getTime() + ".png", {
		          type: "image/png"
		        });
		      } else {
		        this.$message.error("只能上传jpg/png文件");
		        return;
		      }
			},
			//图片上传
		    beforeUpload2(file) {
		      var param = new FormData(); // FormData 对象
		      param.append("file", file); // 文件对象
		      this.$axios({
		        method: "post",
		        url: request.testUrl+"/image/upload",
		        data: param
		      })
		        .then(res => {
		        	if(res.data.code==0){
		        		this.form.imgUrl=res.data.data;
		        		this.$message({
								type: 'info',
								message: "图片上传成功！"
							});	
		        	}  
		        })
		        .catch(error => {
		          //console.log(error)
		        });
		    },
		    //已有的图片删除
		    afterRemove2(file, fileList){
		    	this.$message({
	                type: 'info',
	                message: '已删除原有图片',
	                duration: 6000
            	});
		    },
           	
		    // 保存编辑
            savePic() {
            	var params = new URLSearchParams();
        		params.append('imgUrl', this.form.imgUrl);
        		params.append('href', this.form.href);
        		params.append('sort', this.form.sort);
        		params.append('description', this.form.description);
        		params.append('id', this.form.id);
                this.$axios.post(request.testUrl+"/activityBanner/update",params)
                	.then(res=>{
                		if(res.data.code==0){
	              			//console.log(res)
                			this.editVisible=false;
                			this.save()
                			window.location.reload()
                		}else{
                			this.$message({
								type: 'info',
								message: r
							});
                		}
                	})
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
            
		    
					
			
			
           	//分页功能
           	// 初始页currentPage、初始每页数据数pagesize和数据data
		    handleCurrentChange(currentPage) {
		        this.currentPage = currentPage; //点击第几页
		        this.save()
		    },
            handleSizeChange(size){
            	this.pagesize = size; //每页下拉显示数据
            	this.save()
            },
          
            
           	
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
	.flag{
  		color: #fff;
	    background-color: #999;
	    border-color: #dcdfe6;
	}
	.flag:hover{
  		 background-color: rgb(50, 65, 87);
	    border-color: #fff;
  	}	
</style>