<template>
    <div class='manage'>
        <h2>项目管理</h2>
		<div class='search'>
			<!--查询导出-->
			<el-form :inline="true" :model="form" class="demo-inline searchIdea" v-loading="loading">
				<el-form-item  label="入驻时间：" prop='joinTime'>
					<el-date-picker
						v-model="form.joinTime"
						type="datetimerange"
						class="datePicker"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						default-value="2019-01-01" format='yyyy-MM-dd HH:mm:ss' @change="timeChange">
					</el-date-picker>
	            </el-form-item>
                <el-form-item label="发布状态:" prop='showStatus'>
                    <el-select v-model="form.showStatus" placeholder="请选择">
                        <!-- <el-option  label="发布状态" value=""></el-option> -->
                        <el-option  label="已发布" value=1></el-option>
                        <el-option  label="未发布" value=0></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目名称:" prop='projectName'>
                    <el-select  placeholder="请选择" v-model='form.projectName' @change="changeSelect">
                        <el-option  label="手机号" value=1></el-option>
                        <el-option  label="项目负责人" value=2></el-option>
                        <el-option  label="项目名称" value=3></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='inputPname'>
                    <el-input v-model="form.inputPname" v-if='form.projectName==1' placeholder="请输入手机号" size='small'></el-input>
                    <el-input v-model="form.inputPname" v-if='form.projectName==2' placeholder="请输入项目负责人" size='small'></el-input>
                    <el-input v-model="form.inputPname" v-if='form.projectName==3' placeholder="请输入项目名称" size='small'></el-input>
                </el-form-item>
				<el-form-item>
					<el-button  @click="search">查询</el-button>
				</el-form-item>	
			</el-form>
			<div class='btns'>
				<el-button type="primary" @click="del" >删除</el-button>
				<el-button type="primary" @click="add" >创建商家</el-button>
				<el-button @click="export1"  style='color:#00f;' type='primary'>导出</el-button>
				<!-- <a :href="serverUrl+'/adminActivity/export?status='+this.form.status+'&activityTypeId='+this.form.activityTypeId" style="margin-left: 50px;" class="flag" @click="export1" >导出</a> -->
			</div>
			<!--表格列表-->
			<el-table :data="tableData" border :row-class-name="tableRowClassName" style="width: 100%;display:block;margin-left: 0 auto;" align='center'  label-width='180px' @selection-change='handleSelectionChange'  v-if='tableData.length>0' >
				<el-table-column type="selection" width="55" prop='checked'></el-table-column>
				<el-table-column prop="projectName" label="项目名称" align="center" width="180"  style='position:relative;'>
					<template slot-scope="scope">
						<div>
							<span style='margin-right:16px'>{{tableData[scope.$index].projectName}}</span>
							<span style='position:absolute;top:5px;right:5px;border:1px solid #f66;border-radius:5px;font-size:14px;color:#f00;'  class='iconfont icon-weifabu' v-if='tableData[scope.$index].showStatus==1'>已发布</span>
							<span style='position:absolute;top:5px;right:5px;border:1px solid #bbb;border-radius:5px;font-size:14px;color:#ccc;'  class='iconfont icon-weifabu' v-else >未发布 </span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="account" label="项目账号" align="center" ></el-table-column>
				<el-table-column prop="provinceName" label="项目片区" align="center" ></el-table-column> 
				<el-table-column prop="details" label="项目详情" align="center" >
					<template slot-scope="scope">
							<span v-if='1==2'>{{tableData[scope.$index].id}}</span>
							<el-button @click.native.prevent="jump(tableData[scope.$index].id)" type="text" size="small" style='color:#409EFF;'>
							项目详情
							</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="principal" label="负责人" align="center" ></el-table-column>
				<el-table-column prop="mobile" label="联系电话" align="center" ></el-table-column>
				<el-table-column prop="createTime" label="入驻时间" align="center" width="200"></el-table-column>
				<el-table-column label="操作" width="200" align="center" prop='status'>
					<template slot-scope="scope">
						<span v-if='1==2' v-model='tableData[scope.$index].id'>{{tableData[scope.$index].id}}</span>
						<el-button @click.native.prevent="dugeline(scope.$index,tableData[scope.$index].id)" type="text" size="small"  v-if='tableData[scope.$index].showStatus==0'>
						' '
						</el-button>
						<el-button v-if='tableData[scope.$index].showStatus==1&&tableData[scope.$index].publishStatus==1' @click.native.prevent="dugeline(scope.$index,tableData[scope.$index].id)" type="text" size="small" style='color:#f00;' >
						上线
						</el-button>
						<el-button v-if='tableData[scope.$index].showStatus==1&&tableData[scope.$index].publishStatus==0' @click.native.prevent="dugeline(scope.$index,tableData[scope.$index].id)" type="text" size="small" style='color:#ccc;' >
						下线
						</el-button>
						<el-button
						@click.native.prevent="update(scope.$index, tableData)"
						type="text"
						size="small">
						修改
						</el-button>
						<!-- <el-button
						@click.native.prevent="deleteMan(scope.$index, tableData)"
						type="text"
						size="small">
						删除
						</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<!-- 新增的对话框 创建商家-->
			<el-dialog title='创建商家' :visible.sync="DialogAdd" width="466px" center>
				<el-form ref='form1' :model="form1" label-width="120px" :rules='rules'>
					<el-form-item label="项目名称:" prop='name'>
						<el-input placeholder="请输入内容" v-model="form1.name" ></el-input>
                	</el-form-item>
					<el-form-item label="项目负责人:" prop='principal'>
						<el-input placeholder="请输入内容" v-model="form1.principal" ></el-input>
                	</el-form-item>
					<el-form-item label="手机号码:" prop='mobile'>
						<el-input placeholder="请输入内容" v-model="form1.mobile" ></el-input>
                	</el-form-item>
					<el-form-item label="项目地址:" prop='address'>
						<el-input placeholder="请输入内容" v-model="form1.address" ></el-input>
						<!-- <i class="el-icon-location"></i> -->
                	</el-form-item>
					<el-row>
						<el-col :span="11">
							<el-form-item  label="经度:" prop='latitudes'>
								<el-input  v-model="form1.latitudes" placeholder="请输入经度" style='width:120px'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="13" style='margin-left:-16px;'>
							<el-form-item label="纬度:" prop='longitudes'>
								<el-input  v-model="form1.longitudes" placeholder="请输入纬度" style='width:120px'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="收款账号:" prop='account'>
						<el-input  v-model="form1.account" ></el-input>
                	</el-form-item>
					<div class='txt'>------以下资料仅限于企业内部管理,对外完全保密------</div>
					<el-form-item label="登录账号:" prop='username'>
						<el-input  v-model="form1.username" ></el-input>
                	</el-form-item>
					<el-form-item label="登录密码:" prop='password' >
						<el-input  v-model="form1.password" type='password'></el-input>
                	</el-form-item>
					<el-form-item>
						<template>
							<div>
								<span slot="footer" class="dialog-footer">
									<el-button type="primary" @click="save('form1')">确 定</el-button>
									<el-button type="primary" @click="cancel">取 消</el-button>
								</span>
							</div>
						</template>
					</el-form-item>
				</el-form>
				
			</el-dialog>
			<!-- 修改的对话框 -->
			<el-dialog title="修改信息" :visible.sync="DialogUpdate"  center width="466px">
				<el-form ref='form3' :model="form3" label-width="120px" :rules='rules'>
					<el-form-item label="项目名称:" prop='name' >
						<el-input placeholder="请输入内容" v-model="form3.name" ></el-input>
                	</el-form-item>
					<el-form-item label="项目负责人:" prop='principal'>
						<el-input placeholder="请输入内容" v-model="form3.principal" ></el-input>
                	</el-form-item>
					<el-form-item label="手机号码:" prop='mobile'>
						<el-input placeholder="请输入内容" v-model="form3.mobile" ></el-input>
                	</el-form-item>
					<el-form-item label="项目地址:" prop='address'>
						<el-input placeholder="请输入内容" v-model="form3.address" ></el-input>
						<!-- <i class="el-icon-location"></i> -->
                	</el-form-item>
					<!-- <el-form-item  prop='tude'>
						<template>
							<div class='tude'>
								<span>经度:</span><el-input  v-model="form3.longitude"></el-input>
								<span>纬度:</span><el-input  v-model="form3.latitude"></el-input>
							</div>
						</template>
                	</el-form-item> -->
					<el-row>
						<el-col :span="11">
							<el-form-item  label="经度:" prop='latitudes'>
								<el-input  v-model="form3.latitudes" placeholder="请输入经度" style='width:120px'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="13" style='margin-left:-16px;'>
							<el-form-item label="纬度:" prop='longitudes'>
								<el-input  v-model="form3.longitudes" placeholder="请输入纬度" style='width:120px'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="收款账号:" prop='account'>
						<el-input  v-model="form3.account" ></el-input>
                	</el-form-item>
					<div class='txt'>------以下资料仅限于企业内部管理,对外完全保密------</div>
					<el-form-item label="登录账号:" prop='username'>
						<!-- <el-input  v-model="form3.username" ></el-input> -->
						<span>{{form3.username}}</span>
                	</el-form-item>
					<el-form-item label="登录密码:" prop='password'>
						<!-- <el-input  v-model="form3.password"  type='password'></el-input> -->
						<span>{{form3.password}}</span>
                	</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="saveInfo">确 定</el-button>
					<el-button type="primary" @click="DialogUpdate=false">取 消</el-button>
				</span>
			</el-dialog>
			<!--分页器-->
			<el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pageSize" layout="total, sizes, prev, pager, next,jumper" :total="total" class='page' @current-change='currentChange(currentPage)' @size-change='sizeChange(pageSize)'>
			</el-pagination>
		</div>
		
			
			
			
    </div>
</template>  
<script>

export default {
	inject:['reload'],
    data(){
		// 手机验证
        var isvalidPhone=/^1[3|4|5|7|8][0-9]\d{8}$/;
        var validatePhone=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('请输入手机号'));
            }else if(value!==''){
                if(!isvalidPhone.test(value)){
                    callback(new Error('请输入正确的11位手机号'));
                }
            }else{
                callback();
            }
    	};
        return {
			loading:false,
			// 搜索
		   form:{
			   showStatus:null,
			   projectName:null,
			   inputPname:null,
			   principal:null,
			   mobile:null,
			   projectName1:null
		   },
		   //入驻开始时间
		   joinTimeStart:null,
		   //入驻结束时间
		   joinTimeEnd:null,
		   //新增
		   form1:{},
		   //修改
		   form3:{},
		   //true上线 false下线
		// showStatus发布状态 1发布 0已发布
		// publishStatus上线 1上线 0下线
		   DialogAdd:false,
		   DialogUpdate:false,
		   tableData:[],
		   //用来存取选中的批量删除的id值
		   multipleSelection:'',
		   total:100,
		   pageSize:10,
		   currentPage:1,
		   rules:{
			   name:[
				   {required:true,message:'请输入项目名称',trigger:'blur'},
				//    { required: true, message: '请输入图片描述', trigger: 'blur' },
				   { min: 1, max: 160, message: '长度在 1 到 160个字符', trigger: 'blur' }
			   ],
			   principal:[
				   {required:true,message:'请输入项目负责人',trigger:'blur'},
				   { min: 1, max: 30, message: '长度在 1 到 30个字符', trigger: 'blur' }
			   ],
			   latitudes:[
				   {required:true,message:'请输入经度',trigger:'blur'},
			   ],
			   longitudes:[
				   {required:true,message:'请输入纬度',trigger:'blur'},
			   ],
			   account:[
				   {required:true,message:'请输入收款账号',trigger:'blur'}
			   ],
			   address:[
				   {required:true,message:'请输入详细地址',trigger:'blur'}
			   ],
			   username:[
				   {required:true,message:'请输入登录账号',trigger:'blur'}
			   ],
			   password:[
				   {required:true,message:'请输入登录密码',trigger:'blur'}
			   ],
			   mobile:[
				   {validator: validatePhone, trigger: 'blur'}
			   ]
		   }
        }
	},
	created(){
		//列表数据渲染
		this.renderData();
	},
	methods:{
		addZero(n){
			return n<10? '0'+n :n;
		},
		// 时间戳转时间函数
		transformDate(time){
			var t=new Date(time);
			var y=t.getFullYear();
			var mon=t.getMonth()+1;
			var d=t.getDate();
			var h=t.getHours();
			var m=t.getMinutes();
			var s=t.getSeconds();
			return y+'-'+this.addZero(mon)+'-'+this.addZero(d)+' '+this.addZero(h)+':'+this.addZero(m)+':'+this.addZero(s);
		},
		renderData(){
			// var params=new URLSearchParams();
			// params.append('pageSize',this.pageSize);
			// params.append('currentPage',this.currentPage);
			// alert(123);
			this.$axios.get(request.testUrl+'/project/auth2/project/pageFindProjectList',{
				params:{
					pageSize:this.pageSize,
					page:this.currentPage
				}
			})
			.then(res=>{
				this.loading=true;
				setTimeout(()=>{
					this.tableData=res.data.data.records;
					this.total=res.data.data.total;
					console.log(res.data.data.records);
					for(var i=0;i<this.tableData.length;i++){
						this.tableData[i].createTime=this.transformDate(this.tableData[i].createTime);
						// console.log(this.tableData[i].createTime);
					}
					this.loading=false;
				},1000)
				
			})
		},
		//修改保存按钮
		saveInfo(){
			// alert(1);
			// this.DialogUpdate=false;
			this.$refs.form3.validate((valid) => {
				alert(valid);
                if (valid) {
					// this.form3={};
                    // alert('添加成功!');
					this.DialogUpdate=false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
			});
			var params=new URLSearchParams();
			params.append('name',this.form3.name);
			params.append('principal',this.form3.principal);
			params.append('latitudes',this.form3.latitudes);
			params.append('longitudes',this.form3.longitudes);
			params.append('account',this.form3.account);
			params.append('address',this.form3.address);
			params.append('username',this.form3.username);
			params.append('password',this.form3.password);
			params.append('mobile',this.form3.mobile);
			params.append('id',this.form3.id);
			this.$axios.post(request.testUrl+'/project/auth2/project/doUpdate',params)
			.then(res=>{
				console.log(res.data);
				if(res.data.code==0){
					this.$message({
						type:'success',
						message:'修改成功'
					});
					this.DialogUpdate=false;
					this.renderData();
				}
			})
		},
		tableRowClassName({row, rowIndex}) {
			// alert(rowIndex);
			if (rowIndex===1) {
			return 'odd-row';
			} else  {
			return '';
			}
		},
		// 时间值改变
		timeChange(val){
			for(var i=0;i<val.length;i++){
				// console.log(val[i].getTime());
				console.log(this.transformDate(val[i].getTime()));
				val[i]=this.transformDate(val[i].getTime());
			}
			// console.log(val[0],val[1]);
			this.joinTimeStart=val[0];
			this.joinTimeEnd=val[1];
			console.log(this.joinTimeStart);
			console.log(this.joinTimeEnd);
		},
		//列表状态改变
		changeSelect(val){
			val=parseInt(val);
			console.log(typeof(val));
		},
		// 查询
		search(){
			// this.form={};
			if(this.form.projectName==1){
				var reg=/^1[3|4|5|7|8][0-9]\d{8}$/;
				if(reg.test(this.form.inputPname)){
					this.form.mobile=this.form.inputPname;
				}else{
					this.$message({
						type:'error',
						message:'请输入正确的手机号码'
					})
				}
			}
			if(this.form.projectName==2){
				this.form.principal=this.form.inputPname;
			}
			if(this.form.projectName==3){
				this.form.projectName1=this.form.inputPname;
  			}
			this.$axios.get(request.testUrl+'/project/auth2/project/pageFindProjectList',{
				params:{
					'joinTimeStart':this.joinTimeStart,
					'joinTimeEnd':this.joinTimeEnd,
					'showStatus':this.form.showStatus,
					// 'projectName':this.form.projectName,
					'mobile':this.form.mobile,
					'principal':this.form.principal,
					"projectName":this.form.projectName1
					
				}
			})
			.then(res=>{
				console.log(res.data.data.records);
				this.total=res.data.data.total;
				this.tableData=res.data.data.records;
				// this.renderData();
				// this.reload();
			})
		},
		
		add(){
			this.DialogAdd=true;
			// alert('添加');
		},
		// 新增保存按钮
		save(form1){
			// this.$refs.form1.validate((valid) => {
			// 	alert(valid);
            //     if (valid) {
			// 		this.form1={};
            //         alert('添加成功!');
			// 		this.DialogAdd=false;
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
			var params=new URLSearchParams();
			params.append('name',this.form1.name);
			params.append('principal',this.form1.principal);
			params.append('latitudes',this.form1.latitudes);
			params.append('longitudes',this.form1.longitudes);
			params.append('account',this.form1.account);
			params.append('address',this.form1.address);
			params.append('username',this.form1.username);
			params.append('password',this.form1.password);
			params.append('mobile',this.form1.mobile);
			// console.log(params);
			this.$axios.post(request.testUrl+'/project/auth2/project/insert',params)
			.then(res=>{
				console.log(res.data)
				if(res.data.code==0){
					this.$message({
						type:'success',
						message:'添加成功'
					})
					this.form1={};
					this.DialogAdd=false;
					this.renderData();
				}else{
					this.$message({
						type:'success',
						message:'添加失败'
					})
				}
			})
		},
		cancel(){
			this.DialogAdd=false;
		},
		// 判断上线下线
		dugeline(i,id){
			console.log('下线了'+i+id);
			// this.tableData[i].status=!this.tableData[i].status;
			// console.log(this.tableData[i].status);
			//1上线变为0下线
			if(this.tableData[i].publishStatus==1){
				this.tableData[i].publishStatus=0;
				// alert(this.tableData[i].publishStatus);
				var params=new URLSearchParams();
				params.append('projectId',id);
				params.append('publishStatus',this.tableData[i].publishStatus);
				this.$axios.post(request.testUrl+'/project/auth2/project/updatePublishStatus',params).then(res=>{
					// console.log(res.data);
				})
			}else{
				//其他下线0下线变为1上线
				this.tableData[i].publishStatus=1;
				var params=new URLSearchParams();
				params.append('projectId',id);
				params.append('publishStatus',this.tableData[i].publishStatus);
				this.$axios.post(request.testUrl+'/project/auth2/project/updatePublishStatus',params).then(res=>{
					// console.log(res.data);
				})
			}
		},
		//修改数据 form3
		update(i){
			this.DialogUpdate=true;
			var id=this.tableData[i].id;
			console.log('修改了'+id);
			//渲染单个数据
			// var params=new URLSearchParams();
			// params.append('projectId',id);
			this.$axios.get(request.testUrl+'/project/auth2/project/selectOne',{
				params:{
					projectId:id
				}
			})
			.then(res=>{
				console.log(res.data.data);
				this.form3=res.data.data;
			})
		},
		export1(i){
			alert('导出了');
		},
		jump(id){
			// this.$router.push({name:"项目详情",{
			// 	params:id
			// }});
			this.$router.push({path:"/项目详情",query:{id:id}});
		},
		handleSelectionChange(val){
				this.multipleSelection=val;
		},
		//批量删除
		del(){
			let checkArr=this.multipleSelection;
			if(checkArr.length==0){
				this.$message({
					type:'warning',
					message:'请选中你将要批量删除的数据'
				});
			}
			let params=[];
			checkArr.forEach(item=>{
				params.push(item.id);
			})
			console.log(params);
			this.$axios.post(request.testUrl+'/project/auth2/project/deleteProjectBatch',params)
			.then(res=>{
				console.log(res.data);
				if(res.data.code==0){
					this.$message({
						type:'success',
						message:'删除成功'
					});
					this.renderData();
				}
			})
		},
		currentChange(currentPage){
			this.currentPage=currentPage;
			// alert(currentPage);
			this.renderData();
		},
		sizeChange(pageSize){
			this.pageSize=pageSize;
			// alert(pageSize);
			this.renderData();
		}
	}
}
</script> 
<style scoped>
	.el-table .odd-row {
    /* background-color: rgba(191,191,191,0.2); */
    background-color: rgba(0,255,255,0.2)!important;
  	}
    .manage{
		width:100%;
		color:#000;
        /* background-color: #ff0; */
    }
	.search{
		width:88%;
		height:50px;
		padding-left:20px;
		padding-top: 18px;
		margin:20px auto 0;
		background-color: rgb(25,158,216);
	}
	.btns{
		width:280px;
		float:right;
		margin:20px 0;
	}
	.btns::after{
		display: block;
		content:'';
		clear:both;
	}
	.btns button:nth-child(1){
		float:left;
	}
	.btns button:nth-child(2){
		float:right;
	}
	.page{
		text-align: center;
		margin-top:30px;
		/* width:83%; */
		/* float:right; */
	}
	.el-button--primary {
    color: #fff!important;
    background-color: #409EFF!important;
    border-color: #409EFF!important;
	}
	.demo-inline{
		color:#000;
		font-size:16px;
	}
	.txt{
		color:#ccc;
		font-size:14px;
		line-height: 20px;
		margin:10px auto;
		text-align: center;

	}
	.address{
		position:relative;
	}
	.el-icon-location{
		position:absolute;
		right:-20px;
		top:9px;
		/* color:rgb(25,158,216); */
		color:rgb(13,167,63);
	}
	/* 经纬度 */
	.tude{
		display: flex;
		justify-content: center;
	}
	.tude span{
		display: inline-block;
		width:86px;
	}
	.datePicker {
        width: 250px;
    }
	/* 导出按钮 */
    .flag{
  		color: #fff;
	    background-color: #999;
	    border-color: #dcdfe6;
	    display: inline-block;
	    font-size: 12px;
    	border-radius: 3px;
    	width: 56px;
    	text-align: center;
    	margin-left: 20px;
    }
	.datePicker[data-v-7f77fe0d] {
    width: 338px!important;
}
</style>