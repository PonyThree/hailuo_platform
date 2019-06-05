<template>
    <div class='manage'>
        <h2>项目管理</h2>
		<div class='search'>
			<!--查询导出-->
			<el-form :inline="true" :model="form" class="demo-inline searchIdea" prop='startTime'>
				<el-form-item  label="入驻时间：" prop='startTime'>
					<el-date-picker
						v-model="form.dateStartEnd"
						type="daterange"
						class="datePicker"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						default-value="2019-01-01">
					</el-date-picker>
	            </el-form-item>
                <el-form-item label="发布状态:" prop='status'>
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option  label="发布状态" value=""></el-option>
                        <el-option  label="已发布" value="1"></el-option>
                        <el-option  label="未发布" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目名称:" prop='projectName'>
                    <el-select  placeholder="请选择" v-model='form.projectName'>
                        <el-option  label="手机号" value="1"></el-option>
                        <el-option  label="项目负责人" value="2"></el-option>
                        <el-option  label="项目名称" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='inputPname'>
                    <el-input v-model="form.inputPname" placeholder="请输入项目名称" size='small'></el-input>
                </el-form-item>
				<el-form-item>
					<el-button  @click="search">查询</el-button>
				</el-form-item>	
			</el-form>
			<div class='btns'>
				<!-- <el-button type="primary" @click="del()" >删除</el-button> -->
				<el-button type="primary" @click="add" >创建商家</el-button>
				<el-button @click="export1"  style='color:#00f;' type='primary'>导出</el-button>
				<!-- <a :href="serverUrl+'/adminActivity/export?status='+this.form.status+'&activityTypeId='+this.form.activityTypeId" style="margin-left: 50px;" class="flag" @click="export1" >导出</a> -->
			</div>
			<!--表格列表-->
			<el-table :data="tableData" border :row-class-name="tableRowClassName" style="width: 100%;display:block;margin-left: 0 auto;" align='center' select='changeSelect' label-width='180px'>
				<!-- <el-table-column type="selection" width="55" prop='checked'></el-table-column> -->
				<el-table-column prop="projectName" label="项目名称" align="center" width="150"  style='position:relative;'>
					<template slot-scope="scope">
						<div>
							<span style='margin-right:16px'>{{tableData[scope.$index].projectName}}</span>
							<span style='position:absolute;top:5px;right:5px;border:1px solid #f66;border-radius:5px;font-size:14px;color:#f00;'  class='iconfont icon-weifabu' v-if='tableData[scope.$index].fbstatus'>{{tableData[scope.$index].fbstatus==true?'已发布':'未发布'}}</span>
							<span style='position:absolute;top:5px;right:5px;border:1px solid #bbb;border-radius:5px;font-size:14px;color:#ccc;'  class='iconfont icon-weifabu' v-else>{{tableData[scope.$index].fbstatus==true?'已发布':'未发布'}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="account" label="项目账号" align="center" ></el-table-column>
				<el-table-column prop="area" label="项目片区" align="center" ></el-table-column> 
				<el-table-column prop="details" label="项目详情" align="center" >
					<template slot-scope="scope">
							<span v-if='1==2'>{{tableData[scope.$index]}}</span>
							<el-button @click.native.prevent="jump(scope.$index)" type="text" size="small" style='color:#409EFF;'>
							项目详情
							</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="principal" label="负责人" align="center" ></el-table-column>
				<el-table-column prop="telPhone" label="联系电话" align="center" ></el-table-column>
				<el-table-column prop="entryTime" label="入驻时间" align="center" ></el-table-column>
				<el-table-column label="操作" width="200" align="center" prop='status'>
					<template slot-scope="scope">
						<el-button @click.native.prevent="dugeline(scope.$index, tableData)" type="text" size="small" style='color:#f00;' v-if='tableData[scope.$index].status&&tableData[scope.$index].fbstatus'>
						上线
						</el-button>
						<el-button
						@click.native.prevent="dugeline(scope.$index, tableData)"
						type="text"
						size="small"  v-else style='color:#ccc;'>
						{{tableData[scope.$index].fbstatus==false?' ':'下线'}}
						</el-button>
						<el-button
						@click.native.prevent="update(scope.$index, tableData)"
						type="text"
						size="small">
						修改
						</el-button>
						<el-button
						@click.native.prevent="deleteMan(scope.$index, tableData)"
						type="text"
						size="small">
						删除
						</el-button>
					</template>
				</el-table-column>
				<!-- <template slot-scope="scope">
					<el-button
					@click.native.prevent="export1(scope.$index, tableData)"
					type="text"
					size="small">
					导出
					</el-button>
				</template> -->
				<!-- <el-table-column prop="operation" label="操作" align="center" width="200">
					<template slot-scope="scope">
	                    <el-button @click="offline(scope.$index)"  style='color:red'>下线</el-button>
	                    <el-button @click="update(scope.$index)"  style='color:#00f;'>修改</el-button>
	                    <el-button @click="export1(scope.$index)"  style='color:#00f;'>导出</el-button>
	                    
	                </template>
				</el-table-column> -->
				<!-- <el-table-column prop="editor" label="信息操作" align="center" width='200'>
					<template slot-scope="scope">
						<el-button icon="el-icon-edit" @click="handleEdit(scope.row.id,scope.row.activityTypeId)" v-if="scope.row.status!=0">编辑</el-button>
						<el-button  @click="handleCopy(scope.row.id,scope.row.activityTypeId)">复制</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="editor" label="信息操作" align="center" >
					<template slot-scope="scope">
						<el-button icon="el-icon-edit" @click="deleteMember(scope.$index)">删除</el-button>
					</template>
				</el-table-column> -->
			</el-table>
			<!-- 新增的对话框 创建商家-->
			<el-dialog title='创建商家' :visible.sync="DialogAdd" width="466px" center>
				<el-form ref='form1' :model="form1" label-width="120px" :rules='rules'>
					<el-form-item label="项目名称:" prop='projectName'>
						<el-input placeholder="请输入内容" v-model="form1.projectName" ></el-input>
                	</el-form-item>
					<el-form-item label="项目负责人:" prop='principal'>
						<el-input placeholder="请输入内容" v-model="form1.principal" ></el-input>
                	</el-form-item>
					<el-form-item label="手机号码:" prop='telPhone'>
						<el-input placeholder="请输入内容" v-model="form1.telPhone" ></el-input>
                	</el-form-item>
					<el-form-item label="项目地址:" prop='address'>
						<el-input placeholder="请输入内容" v-model="form1.address" ></el-input>
						<i class="el-icon-location"></i>
                	</el-form-item>
					<!-- <el-form-item  prop='tude'>
						<template>
							<div class='tude'>
								<span>经度:</span><el-input  v-model="form1.longitude"></el-input>
								<span>纬度:</span><el-input  v-model="form1.latitude"></el-input>
							</div>
						</template>
                	</el-form-item> -->
					<!-- <el-form-item label="纬度:" prop='latitude'>
						<el-input  v-model="form1.latitude" ></el-input>
                	</el-form-item> -->
					<el-form-item label="收款账号:" prop='receiptAccount'>
						<el-input  v-model="form1.receiptAccount" ></el-input>
                	</el-form-item>
					<div class='txt'>------以下资料仅限于企业内部管理,对外完全保密------</div>
					<el-form-item label="登录账号:" prop='loginAccount'>
						<el-input  v-model="form1.loginAccount" ></el-input>
                	</el-form-item>
					<el-form-item label="登录密码:" prop='loginpwd'>
						<el-input  v-model="form1.loginpwd" ></el-input>
                	</el-form-item>
					<el-form-item>
						<template>
							<div>
								<span slot="footer" class="dialog-footer">
									<el-button type="primary" @click="save(form1)">确 定</el-button>
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
					<el-form-item label="项目名称:" prop='projectName' >
						<el-input placeholder="请输入内容" v-model="form3.projectName" ></el-input>
                	</el-form-item>
					<el-form-item label="项目负责人:" prop='principal'>
						<el-input placeholder="请输入内容" v-model="form3.principal" ></el-input>
                	</el-form-item>
					<el-form-item label="手机号码:" prop='telPhone'>
						<el-input placeholder="请输入内容" v-model="form3.telPhone" ></el-input>
                	</el-form-item>
					<el-form-item label="项目地址:" prop='address'>
						<el-input placeholder="请输入内容" v-model="form3.address" ></el-input>
						<i class="el-icon-location"></i>
                	</el-form-item>
					<!-- <el-form-item  prop='tude'>
						<template>
							<div class='tude'>
								<span>经度:</span><el-input  v-model="form3.longitude"></el-input>
								<span>纬度:</span><el-input  v-model="form3.latitude"></el-input>
							</div>
						</template>
                	</el-form-item> -->
					<el-form-item label="收款账号:" prop='receiptAccount'>
						<el-input  v-model="form3.receiptAccount" ></el-input>
                	</el-form-item>
					<div class='txt'>------以下资料仅限于企业内部管理,对外完全保密------</div>
					<el-form-item label="登录账号:" prop='loginAccount'>
						<el-input  v-model="form3.loginAccount" ></el-input>
                	</el-form-item>
					<el-form-item label="登录密码:" prop='loginpwd'>
						<el-input  v-model="form3.loginpwd" ></el-input>
                	</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="saveInfo">确 定</el-button>
					<el-button type="primary" @click="DialogUpdate=false">取 消</el-button>
				</span>
			</el-dialog>
			<!--分页器-->
			<el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pagesize" layout="total, sizes, prev, pager, next,jumper" :total="total" class='page'>
			</el-pagination>
		</div>
		
			
			
			
    </div>
</template>  
<script>
export default {
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
		   form:{
		   },
		   form1:{},
		   form3:{},
		   //true上线 false下线
		//    status:true,
		   DialogAdd:false,
		   DialogUpdate:false,
		   tableData:[
			   {
				   projectName:'蓝湖郡',
				   //已发布
				   fbstatus:true,
				   account:'add3311',
				   area:'重庆',
				   details:'详情',
				   principal:'neymar da silva',
				   telPhone:'15121346477',
				   entryTime:'2019-5-2',
				//    status:1
					status:true,
					id:1
			   },
			   {
				   projectName:'蓝湖郡',
				   fbstatus:true,
				   account:'add3311',
				   area:'重庆',
				   details:'详情',
				   principal:'neymar da silva',
				   telPhone:'15121346477',
				   entryTime:'2019-5-2',
				//    status:1
					status:true,
					id:2
			   },
			   {
				   projectName:'蓝湖郡',
				   //未发布
				   fbstatus:false,
				   account:'add3311',
				   area:'重庆',
				   details:'详情',
				   principal:'neymar da silva',
				   telPhone:'15121346477',
				   entryTime:'2019-5-2',
				//    status:0
					status:true,
					id:3
			   },
			   {
				   projectName:'蓝湖郡',
				   //未发布
				   fbstatus:false,
				   account:'add3311',
				   area:'重庆',
				   details:'详情',
				   principal:'neymar da silva',
				   telPhone:'15121346477',
				   entryTime:'2019-5-2',
				//    status:0
					status:true,
					id:3
			   },
			   {
				   projectName:'蓝湖郡',
				   //未发布
				   fbstatus:true,
				   account:'add3311',
				   area:'重庆',
				   details:'详情',
				   principal:'neymar da silva',
				   telPhone:'15121346477',
				   entryTime:'2019-5-2',
				//    status:0
					status:true,
					id:3
			   }
		   ],
		   total:1000,
		   pagesize:10,
		   currentPage:2,
		   rules:{
			   projectName:[
				   {required:true,message:'请输入项目名称',trigger:'blur'},
				//    { required: true, message: '请输入图片描述', trigger: 'blur' },
				   { min: 1, max: 160, message: '长度在 1 到 160个字符', trigger: 'blur' }
			   ],
			   principal:[
				   {required:true,message:'请输入项目负责人',trigger:'blur'},
				   { min: 1, max: 30, message: '长度在 1 到 30个字符', trigger: 'blur' }
			   ],
			   receiptAccount:[
				   {required:true,message:'请输入收款账号',trigger:'blur'}
			   ],
			   loginAccount:[
				   {required:true,message:'请输入登录账号',trigger:'blur'}
			   ],
			   loginpwd:[
				   {required:true,message:'请输入登录密码',trigger:'blur'}
			   ],
			   telPhone:[
				   {validator: validatePhone, trigger: 'blur'}
			   ]
		   }
        }
	},
	methods:{
		saveInfo(){
			alert(1)
		},
		 tableRowClassName({row, rowIndex}) {
			// alert(rowIndex);
			if (rowIndex===1) {
			return 'odd-row';
			} else  {
			return '';
			}
		},
		search(){
			alert('查询'+this.form.inputPname);
			
		},
		del(){
			alert('删除');
		},
		add(){
			this.DialogAdd=true;
			// alert('添加');
		},
		save(form1){
			this.$refs.form1.validate((valid) => {
                if (valid) {
					this.form1={};
                    alert('添加成功!');
					this.DialogAdd=false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
			// this.DialogAdd=false;
		},
		cancel(){
			this.DialogAdd=false;
		},
		dugeline(i){
			console.log('下线了'+i);
			this.tableData[i].status=!this.tableData[i].status;
			console.log(this.tableData[i].status);
		},
		update(i){
			this.DialogUpdate=true;
			console.log('修改了'+i);
		},
		export1(i){
			alert('导出了');
		},
		jump(id){
			this.$router.push(`/项目详情/${id}`);
		},
		changeSelect(selection,row){
			console.log(selection+'====='+row);
		},
		deleteMan(i){
			// alert('删除'+i);
			this.tableData.splice(i,1);
		},
		// changeFb(i){
			// alert(i+'修改发布状态');
			// if(this.tableData[i].fbstatus){
			// 	this.tableData[i].fbstatus='未发布';
			// }else{
			// 	this.tableData[i].fbstatus='已发布';
			// }
			// this.tableData[i].fbstatus=!this.tableData[i].fbstatus;
		// }
	},
	created(){

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
		width:81%;
		height:50px;
		padding-left:20px;
		padding-top: 18px;
		margin:20px auto 0;
		background-color: rgb(25,158,216);
	}
	.btns{
		width:180px;
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
</style>