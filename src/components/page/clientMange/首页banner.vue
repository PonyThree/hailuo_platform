<template>
    <div class='bannnn'>
       <h2>项目管理>   &nbsp;项目banner></h2>
        <!--新增-->
        <div class='addBtn'>
            <el-button type='primary' @click='add'>新增按钮</el-button>
        </div>
		<!--表格列表-->
		<el-table :data="bannerTable" border style="width: 100%" v-loading="loading">
			<el-table-column prop="num" label="" align="center" width="40">
				<template scope="scope">
					<span>{{scope.$index+1}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="imgUrl" label="图片" align="center" >
				<template slot-scope="scope">
					<img :src="bannerTable[scope.$index].imgUrl"  style="width: 286px;height: 100px;"/>
					<!-- <img src="../../../assets/img/car.jpg" alt="" style="width: 286px;height: 100px;"> -->
				</template>
			</el-table-column>
			<el-table-column prop="href" label="跳转链接设置" align="center" ></el-table-column>
			<el-table-column prop="description" label="图片描述" align="center" ></el-table-column>
			<el-table-column prop="sort" label="排序值" align="center" ></el-table-column>
			<!-- <el-table-column prop="id" v-show="1==2"></el-table-column> -->
			<el-table-column prop="caozuo" label="操作" align="center" >
				<template slot-scope="scope">
                        <el-button icon="el-icon-edit" @click="handleEdit(scope.$index,bannerTable[scope.$index].id)" >编辑</el-button>
						<!-- v-if="scope.$index!=0" -->
                        <el-button icon="el-icon-delete" class="red" @click="deleteMember(scope.$index,bannerTable[scope.$index].id)" v-if="scope.$index!=0">删除</el-button>
                    </template>
			</el-table-column>	
		</el-table>
		<!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="26%">
            <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition" :rules='rules'>
                <el-form-item label="图片" style="width:86%;">
                    <div style="width: 80%;height: 150px;display: block;float: left;position: relative;" id="aa">
                        <img :src="form.imgUrl" alt="" style="width: 100%;height: 150px;display: block;"/>
                        <img src="../../../assets/img/2.png" alt="" style="width:10%;height:25%;position: absolute; right:0px;top:-3px;" @click="show"/>
                    </div>
                    
                    <div style="position: relative;float:left;display: none;" class="22222" id="cc">
                        <el-upload action="auto" list-type="picture-card" :file-list="fileList1" with-credentials :before-upload="beforeUpload1" :http-request="uploadSectionFile" :on-remove="afterRemove" :on-exceed="handleExceed" :limit='1'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="form.imgUrl" alt="">
                        </el-dialog>
                    </div>
    
                </el-form-item>
                <el-form-item label="跳转链接" prop='href'>
                    <el-input v-model="form.href" ></el-input>
                </el-form-item>
                <el-form-item label="图片描述" prop='description'>
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop='sort'>
                    <el-input v-model="form.sort" ></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input v-model="form.id" v-show="1==2"></el-input>
                </el-form-item>
				<el-form-item>
					<!-- <template>
						<div>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="savePic('form')">保存</el-button>
								<el-button @click="editVisible = false">取 消</el-button> 
							</span>
						</div>
					</template> -->
				</el-form-item>
            </el-form>
            
        </el-dialog>   
        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%" @close="insertClose">
            <el-form ref="formList" :model="formList" label-width="80px" :label-position="labelPosition" :rules='rules'>
				<el-form-item label="图片上传:" style="width:92%;" prop='image'>
                    <div style="width: 80%;height: 100px;display: block;float: left;position: relative;" id="aa">
                        <img :src="formList.imgUrl" alt=""  style="width: 280px;height: 110px;display: block;">
                        <img src="../../../assets/img/2.png" alt="" style="width:10%;height:25%;position: absolute; right:91px;top:-4px;" @click="show"/>
                    </div>
                    
                    <div style="position: relative;float:left;display: none;" class="22222" id="cc">
                        <el-upload action="auto" list-type="picture-card" :file-list="fileList" with-credentials :before-upload="beforeUpload" :http-request="uploadSectionFile" :on-remove="afterRemove" :on-exceed="handleExceed" :limit='1'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="formList.imgUrl" alt="">
                        </el-dialog>
                    </div>
    
                </el-form-item>
                <el-form-item label="跳转链接" prop="href">
                    <el-input v-model="formList.href" ></el-input>
                </el-form-item>
                <el-form-item label="图片描述" prop="description">
                    <el-input v-model="formList.description" ></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="formList.sort"></el-input>
                </el-form-item>
				<el-form-item>
					<div>
						<span slot="footer" class="dialog-footer">
							<el-button type="primary" @click="addEdit('formList')" class="flag">保存</el-button>
							<el-button @click="cancle('formList')">取 消</el-button> 
						</span>
					</div>
				</el-form-item>
            </el-form>
            
        </el-dialog> 
    </div>


</template>
<script>
export default {
	inject:['reload'],
    data(){
        return {
			loading:false,
            dialogVisible: false,
            labelPosition: 'left',
            editVisible:false,
            addVisible:false,
            revise:false,
            // currentPage:1,
            // pageSize:3,
			// total:100,
			current: 1,
			total: 0,
			size: 0,
            bannerTable:[],
			// 新增
            formList: {
				imgUrl:'https://www.china185.com/static/image/che121215.jpg'
			},
            //新增图片列表
			fileList:[],
			//编辑
            form: {},
            //编辑图片列表
			fileList1:[],
			rules:{
				href:{ required: true, message: '请输入跳转链接', trigger: 'blur' },
				// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				description:[
					{ required: true, message: '请输入图片描述', trigger: 'blur' },
					{ min: 1, max: 160, message: '长度在 1 到 160个字符', trigger: 'blur' }
				],
				// date1: [
				// 	{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				// ],
				sort:[
					{required:true,message:'请输入排序数字',trigger:'blur'},
					// {}
					// { type: 'number', message: '排序必须为数字值',trigger:'blur'}
				]

			}

        }
	},
	created(){
		//banner列表渲染
		this.showBannerList();
	},
    methods:{	
		showBannerList(){
				this.loading=true;
				this.$axios.get(request.testUrl+'/platform/auth2/platformBanner/pageSelect',{
					params:{
						page:this.current,
						pageSize: 10
					}
				})
				.then(res=>{
					if(res.data.code==0){
						var lock=setTimeout(()=>{
						this.bannerTable = res.data.data.records;
							this.size = res.data.data.size // 一页显示个数
							this.current = res.data.data.current // 当前页
							this.loading=false;
							this.total = res.data.data.total // 一共几页
							clearTimeout(lock);
						},1000)
					}else{
						this.$message({
							type:'error',
							message:res.data.msg
						})
					}
					
				})
		},
		//数字验证
		yzNum(){
			if (!Number.isInteger(this.form.sort)) {
            callback(new Error('请输入数字值'));
         	 } 
		},
		insertClose(){
			this.reload()
		},
		//新增
        add(){
			// alert('新增');
			this.addVisible=true;
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
		    //新增图片上传 formList
		    beforeUpload(file) {
				console.log(file)
		      var param = new FormData(); // FormData 对象
		      param.append("file", file); // 文件对象
		      this.$axios({
		        method: "post",
		        url: request.testUrl+"/project/auth2/image/upload",
		        data: param
		      })
		        .then(res => {
		        	if(res.data.code==0){
						console.log(res.data.data);
		        		this.formList.imgUrl=res.data.data;
		        		this.$message({
								type: 'info',
								message: "图片上传成功！"
						});	
		        	}  
		        })
		        .catch(error => {
		          console.log(error)
		        });
			},
			//新增banner保存按钮
        	addEdit(formList){
				this.$refs.formList.validate((valid) => {
					if (valid) {
						// this.formList={};
						this.addVisible=false;
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				var params = new URLSearchParams();	
                params.append('href', this.formList.href);
                params.append('description', this.formList.description);
                params.append('sort', this.formList.sort);
				console.log(this.formList.imgUrl)
				if(this.formList.imgUrl!==''){
					params.append('imgUrl', this.formList.imgUrl);
				}			
                this.$axios.post(request.testUrl+"/platform/auth2/platformBanner/doInsert",params)
					.then(res=>{
		    			if(res.data.code==0){
							this.addVisible=false;
							this.$message({
								type:'success',
								message:'新增成功'
							})
							// this.formList={};
							this.showBannerList();
							this.reload();
		    			}else{
		    				this.$message({
				                type: 'error',
				                message: res.data.msg,
							});
							// this.formList={};
		    			}
				})
					
			},
			// 新增取消按钮
			cancle(){
				this.addVisible = false
				// this.$nextTick(()=>{
				// 	this.$refs.formList.resetFields();
				// })
				this.reload();
			},
			//编辑图片上传 form
		    beforeUpload1(file) {
		      var param = new FormData(); // FormData 对象
		      param.append("file", file); // 文件对象
		      this.$axios({
		        method: "post",
		        url: request.testUrl+"/project/auth2/image/upload",
		        data: param
		      })
		        .then(res => {
		        	if(res.data.code==0){
						// console.log(res.data.data);
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
        	show(){
				document.getElementById("aa").style.display="none";
				this.formList.imgUrl=''
        		document.getElementById("cc").style.display="block";
				// console.log(this.formList.imgUrl)
        	},
        	
        	//编辑跳出弹框
        	handleEdit(index,id) {
				this.editVisible=true;
				// alert(id);
				if(id=="111"){
					this.form=this.baseData;
				}
				this.$axios.get(request.testUrl+"/platform/auth2/platformBanner/getOne",{
					params:{
						id:id
					}
				})
				.then(res=>{
					console.log(res.data.data)
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
		    // 修改编辑保存按钮
            savePic(form) {
				this.$refs.form.validate((valid) => {
					if (valid) {
						// alert('修改成功!');
						// this.form={};
						this.editVisible=false;
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				this.editVisible=false;
				var params = new URLSearchParams();
        		params.append('imgUrl', this.form.imgUrl);
        		params.append('href', this.form.href);
        		params.append('sort', this.form.sort);
        		params.append('description', this.form.description);
				params.append('id', this.form.id);
                this.$axios.post(request.testUrl+"/platform/auth2/platformBanner/doInsert",params)
                	.then(res=>{
                		if(res.data.code==0){
	              			//console.log(res)
							this.editVisible=false;
							this.form={};
							this.showBannerList();
							this.reload();
							this.$message({
								type: 'success',
								message: '编辑成功'
							});
                		}else{
                			this.$message({
								type: 'error',
								message: '编辑失败'
							});
                		}
				})
				// this.reload();
            },
            
        	//删除这一行
           	deleteMember(index,id){
           		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				var params = new URLSearchParams();
				params.append('id', id);
				this.$axios.post(request.testUrl+"/platform/auth2/platformBanner/doDelete ",params)
				.then(res=>{
					console.log(res.data)
					this.showBannerList();
				})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
           	},
			// 分页
			// handleSizeChange (val) {
			// 	console.log(`每页 ${val} 条`)
			// },
			// handleCurrentChange (val) {
			// 	console.log(`当前页: ${val}`)
			// 	this.current=val
			// 	this.showBannerList()
			// },
    }

}
</script>
<style scoped>
    h2{
        text-align: left;
        padding-left:40px;
    }
    .el-button--primary {
        color: #fff!important;
        background-color: #409EFF!important;
        border-color: #409EFF!important;
    }
    .addBtn{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width:100%;
        height:40px;
        /* margin:20px; */
		margin: 10px 0;
    }
    .content{
        border:1px solid #eee;
        margin-bottom:30px;
        height:auto;
        overflow: hidden;
        border:1px solid #eee;
    }
    .content3 .el-table{
        border:1px solid #409EFF;
        display: block;
        width:950px;
        height:auto;
        background-color: pink;
        margin:0 auto;
    }
    /* 添加减少符号样式 */
    .use{
        display: inline-block;
        /* width:30px;
        height:30px; */
        font-size:26px;
        /* margin-top:3px; */
        margin-left:10px;
        color:#ccc;
        line-height: 20px;
        vertical-align: middle;
    }
    .page{
        width:100%;
        box-sizing: border-box;
        text-align: right;
        margin:20px auto 0;
        padding:10px 298px 0 0;
        height:48px;
        background-color: rgb(25,158,216)
    }
</style>