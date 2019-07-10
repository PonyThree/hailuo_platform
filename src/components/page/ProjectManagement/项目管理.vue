<template>
    <div class='manage' v-loading="loading">
        <h2>项目管理</h2>
		<div class='search' >
			<!--查询导出-->
			<el-form :inline="true" :model="form" class="demo-inline searchIdea searchTxt">
				<el-form-item  label="入驻时间：" prop='joinTime'>
					<el-date-picker
						v-model="form.joinTime"
						type="datetimerange"
						class="datePicker"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						default-value="2019-01-01" format='yyyy-MM-dd HH:mm:ss' > 
					</el-date-picker>
	            </el-form-item>
                <el-form-item label="发布状态:" prop='showStatus'>
                    <el-select v-model="form.showStatus" placeholder="请选择">
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
                    <el-input v-model="form.inputPname"  placeholder="请输入需要查询的信息" size='small'></el-input>
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
			<el-table :data="tableDatass" border :row-class-name="tableRowClassName" style="width: 100%;display:block;margin-left: 0 auto;" align='center'  label-width='180px' @selection-change='handleSelectionChange'  >
				<el-table-column type="selection" width="55" prop='checked'></el-table-column>
				<el-table-column prop="projectName" label="项目名称" align="center" width="180"  style='position:relative;'>
					<template slot-scope="scope">
						<div>
							<span style='margin-right:16px'>{{tableDatass[scope.$index].projectName}}</span>
							<div class="topIcon" v-if='tableDatass[scope.$index].showStatus==1'>
								<img src="../../../assets/img/publish.png" alt="" style="width:40px;height:40px;">
							</div>
							<div class="topIcon" v-else>
								<img src="../../../assets/img/unpublish.png" alt="" style="width:40px;height:40px;">
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="account" label="项目账号" align="center" ></el-table-column>
				<el-table-column prop="provinceName" label="项目片区" align="center" ></el-table-column> 
				<el-table-column prop="details" label="项目详情" align="center" >
					<template slot-scope="scope">
							<span v-if='1==2'>{{tableDatass[scope.$index].id}}</span>
							<el-button @click.native.prevent="jump(tableDatass[scope.$index].id)" type="text" size="small" style='color:#409EFF;'>
							项目详情
							</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="principal" label="负责人" align="center" ></el-table-column>
				<el-table-column prop="mobile" label="联系电话" align="center" ></el-table-column>
				<el-table-column prop="createTime" label="入驻时间" align="center" width="200"></el-table-column>
				<el-table-column label="操作" width="200" align="center" prop='status'>
					<template slot-scope="scope">
						<span v-if='1==2' :v-model='tableDatass[scope.$index].id'>{{tableDatass[scope.$index].id}}</span>
						<el-button @click.native.prevent="dugeline(scope.$index,tableDatass[scope.$index].id)" type="text" size="small"  v-if='tableDatass[scope.$index].showStatus==0'>
						</el-button>
						<el-button v-if='tableDatass[scope.$index].showStatus==1&&tableDatass[scope.$index].publishStatus==0' @click.native.prevent="dugeline(scope.$index,tableDatass[scope.$index].id)" type="text" size="small" style='color:#f00;' >
						上线
						</el-button>
						<el-button v-if='tableDatass[scope.$index].showStatus==1&&tableDatass[scope.$index].publishStatus==1' @click.native.prevent="dugeline(scope.$index,tableDatass[scope.$index].id)" type="text" size="small" style='color:#ccc;' >
						下线
						</el-button>
						<el-button
						@click.native.prevent="update(scope.$index, tableDatass)"
						type="text"
						size="small">
						修改
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 新增的对话框 创建商家 form5-->
			<el-dialog title='创建商家' :visible.sync="DialogAdd" width="466px" center @close="close">
				<el-form  ref='form5' :model="form5" label-width="120px" :rules='rules'>
					<el-form-item label="项目名称:" prop='name'>
						<el-input placeholder="请输入内容" v-model="form5.name" ></el-input>
                	</el-form-item>
					<el-form-item label="项目负责人:" prop='principal'>
						<el-input placeholder="请输入内容" v-model="form5.principal" ></el-input>
                	</el-form-item>
					<el-form-item label="手机号码:" prop="mobile">
						<el-input placeholder="请输入内容" v-model="form5.mobile" ></el-input>
                	</el-form-item>
					<el-form-item label="项目地址:" >
						<el-input placeholder="请输入内容" v-model="form5.address"  disabled></el-input>
                	</el-form-item>
					<el-row>
						<el-col :span="11">
							<el-form-item  label="经度:">
								<el-input  v-model="form5.latitudes" placeholder="请输入经度" style='width:100px' disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" style='margin-left:-16px;'>
							<el-form-item label="纬度:">
								<el-input  v-model="form5.longitudes" placeholder="请输入纬度" style='width:100px' disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<i class="el-icon-location" @click="getLocation"></i>
						</el-col>
					</el-row>
					<el-form-item label="收款账号:" prop='account'>
						<el-input  v-model="form5.account" ></el-input>
                	</el-form-item>
					<div class='txt'>------以下资料仅限于企业内部管理,对外完全保密------</div>
					<el-form-item label="登录账号:" prop='username'>
						<el-input  v-model="form5.username" ></el-input>
                	</el-form-item>
					<el-form-item label="登录密码:" prop='password' >
						<el-input  v-model="form5.password" type='password'></el-input>
                	</el-form-item>
					<el-form-item>
						<template>
							<div>
								<span slot="footer" class="dialog-footer">
									<el-button type="primary" @click="save('form5')">确 定</el-button>
									<el-button type="primary" @click="cancel">取 消</el-button>
								</span>
							</div>
						</template>
					</el-form-item>
				</el-form>
				<!-- 百度地图对话框 -->
				<!-- <el-dialog
					width="60%"
					title="百度地图小窗"
					:visible.sync="baiDuVisible"
					append-to-body style="width:1600px;height:750px;overflow:hidden;margin:30px auto 0;box-sizing:border-box;" @close="closeMap" ref="formMap" :model="formMap">
						<div style="width:100%;height:700px;margin:0 auto;background-color:#CBE1FF;">   
								要查询的地址：<input id="text_" type="text" value="宁波天一广场" style="margin-right:100px;" v-model="formMap.address"/>
								查询结果(经纬度)：<input id="result_" type="text" v-model="formMap.result_"/>
								<input type="button" value="查询" @click="searchByStationName();"/>
								<div id="container" 
									style="position: absolute;
										width: 95%; 
										height: 480px; 
										top: 50; 
										border: 1px solid gray;
										overflow:hidden;">
								</div>
						</div>
				</el-dialog> -->
			</el-dialog>
			<!-- 修改的对话框 form3-->
			<el-dialog title="修改信息" :visible.sync="DialogUpdate"  center width="466px" @close="close1">
				<el-form ref='form3' :model="form3" label-width="120px" :rules='rules1'>
					<el-form-item label="项目名称:" prop='name' >
						<el-input placeholder="请输入内容" v-model="form3.name" ></el-input>
                	</el-form-item>
					<el-form-item label="项目负责人:" prop='principal'>
						<el-input placeholder="请输入内容" v-model="form3.principal" ></el-input>
                	</el-form-item>
					<el-form-item label="手机号码:">
						<el-input placeholder="请输入内容" v-model="form3.mobile" ></el-input>
                	</el-form-item>
					<el-form-item label="项目地址:">
						<el-input placeholder="请输入内容" v-model="form3.address" ></el-input>
                	</el-form-item>
					<el-row>
						<el-col :span="11">
							<el-form-item  label="经度:">
								<el-input  v-model="form3.latitudes" placeholder="请输入经度" style='width:120px'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="13" style='margin-left:-16px;'>
							<el-form-item label="纬度:">
								<el-input  v-model="form3.longitudes" placeholder="请输入纬度" style='width:120px'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="收款账号:" prop='account'>
						<el-input  v-model="form3.account" ></el-input>
                	</el-form-item>
					<div class='txt'>------以下资料仅限于企业内部管理,对外完全保密------</div>
					<el-form-item label="登录账号:" prop='username'>
						<!-- <el-input>{{form3.username}}</el-input> -->
						<span>{{form3.username}}</span>
                	</el-form-item>
					<el-form-item label="登录密码:" prop='password'>
						<!-- <el-input>{{form3.password}}</el-input> -->
						<span>{{form3.password}}</span>
                	</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="saveInfo">确 定</el-button>
					<el-button type="primary" @click="DialogUpdate=false">取 消</el-button>
				</span>
			</el-dialog>
			<!--分页器-->
            <el-pagination background  :current-page.sync='currentPage' :page-sizes="[5, 10, 15]"  layout="total, sizes, prev, pager, next,jumper" :total="total" class='page' @size-change="sizeChange" @current-change="currentChange"> 
            </el-pagination>
			<!-- <el-pagination
				@size-change="sizeChange"
				@current-change="currentChange"
				:current-page.sync="currentPage"
				:page-size="pageSize"
				layout="prev, pager, next, jumper"
				:total="total">
			</el-pagination> -->
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
			baiDuVisible:false,
			//百度地图参数
			localSearch:"",
			lng:'',
			lat:'', 
			map:'',
			address:'',
			//百度地图
			formMap:{
				address:'',
				result_:'',
			},
			loading:false,

			// 搜索
		    form:{
			   showStatus:'',
			   projectName:'',
			   inputPname:'',
			   principal:'',
			   mobile:'',
			   projectName1:'',
			   joinTime: ''
		   },
		   form2:{},
		   //入驻开始时间
		   joinTimeStart:'',
		   //入驻结束时间
		   joinTimeEnd:'',
		   //新增dialog
		   form5:{},
		   //修改
		   form3:{
			   mobile:'',
			   address:'',
		   },
		   //true上线 false下线
		// showStatus发布状态 1发布 0已发布
		// publishStatus上线 1上线 0下线
		   DialogAdd:false,
		   DialogUpdate:false,
		   tableDatass: [],
		   //用来存取选中的批量删除的id值
		   multipleSelection:'',
		   total:15,
		   pageSize:10,
		   currentPage:1,
		   //新增验证
		   rules:{
			   name:[
				   { required:true, message:'请输入项目名称', trigger:'blur' },
				   { min: 1, max: 160, message: '长度在 1 到 160个字符', trigger: 'blur' }
			   ],
			   principal:[
				   {required:true,message:'请输入项目负责人',trigger:'blur'},
				   { min: 1, max: 30, message: '长度在 1 到 30个字符', trigger: 'blur' }
			   ],
			   account:[
				   {required:true,message:'请输入收款账号',trigger:'blur'}
			   ],
			   username:[
				   {required:true,message:'请输入登录账号',trigger:'blur'}
			   ],
			   password:[
				   {required:true,message:'请输入登录密码',trigger:'blur'}
			   ],
			  telPhone:[
                    {validator: validatePhone, trigger: 'blur'}
				]
		   },
		   //修改验证
		   rules1:{
			   name:[
				   { required:true, message:'请输入项目名称', trigger:'blur' },
				   { min: 1, max: 160, message: '长度在 1 到 160个字符', trigger: 'blur' }
				],
				principal:[
					{required:true,message:'请输入项目负责人',trigger:'blur'},
					{ min: 1, max: 30, message: '长度在 1 到 30个字符', trigger: 'blur' }
				],
				// username:[
				//    {required:true,message:'请输入登录账号',trigger:'blur'}
				// ],
				account:[
				   {required:true,message:'请输入收款账号',trigger:'blur'}
			   	],
			//    password:[
			// 	   {required:true,message:'请输入登录密码',trigger:'blur'}
			//    ],
		   }   
        }
	},
	mounted(){
		// 地图加载
		// this.getMapData();
	},
	created(){
		//列表数据渲染
		this.renderData(this.pageSize,this.currentPage);
		// console.log( this.lng+"====="+this.lat+"====="+this.formMap.address)
		this.getMapData();
	},
	methods:{
		currentChange(currentPage){
			this.currentPage=currentPage;
			this.renderData(this.pageSize,this.currentPage);
        },
        sizeChange(pageSize){
			this.pageSize=pageSize
			this.renderData(this.pageSize,this.currentPage)
        },
		//数据渲染
		renderData(n1,n2){
			this.loading=true;
			this.$axios.get(request.testUrl+'/project/auth2/project/pageFindProjectList',{
				params:{
					pageSize:n1,
					page:n2
				}
			})
			.then(res=>{
				this.loading=false;
				if (res.data.code == 0) {
					let data = res.data.data
					this.tableDatass = data.records
					this.total=data.total
					if(data.records==[]){
						// console.log(data.total)
					}
					for(var i=0;i<this.tableDatass.length;i++){
						this.tableDatass[i].createTime=this.transformDate(this.tableDatass[i].createTime);
					}
				} else {
					this.$message({
						message:res.data.msg,
						type:'error'
					});
				}
			})
		},
		//新增商家 点击X 号清空数据
		close(){
			this.DialogAdd=false;
			this.$nextTick(()=>{
				this.$refs.form5.resetFields();
			})
		},
		//修改商家 点击X 号清空数据
		close1(){
			// this.DialogAdd=false;
			this.$nextTick(()=>{
				this.$refs.form3.resetFields();
			})
		},
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
		tableRowClassName({row, rowIndex}) {
			if (rowIndex===1) {
			return 'odd-row';
			} else  {
			return '';
			}
		},
		// 时间值改变
		timeChange(val){
			if(val!=null){
				for(var i=0;i<val.length;i++){
					val[i]=this.transformDate(val[i]);
				}
				this.joinTimeStart=val[0];
				this.joinTimeEnd=val[1];	
			}
		},
		//列表状态改变
		changeSelect(val){
			val=parseInt(val);
		},
		// 查询
		search(){
			// this.$nextTick(()=>{
			// 	this.$refs.form2.resetFields();
			// })
			this.form2={};
			this.timeChange(this.form.joinTime)
			//查询之前将上一次的条件筛选清空
			// this.form2={};
			if(this.form.projectName==1){
				// var reg=/^1[3|4|5|7|8][0-9]\d{8}$/;
				// if(reg.test(this.form.inputPname)){
				// 	this.form.mobile=this.form.inputPname;
				// }else{
				// 	this.$message({
				// 		type:'error',
				// 		message:'请输入正确的手机号码'
				// 	})
				// }
				this.form2.mobile=this.form.inputPname;
			}
			else if(this.form.projectName==2){
				this.form2.principal=this.form.inputPname;
			}
			else{
				this.form2.projectName1=this.form.inputPname;
  			}
			this.$axios.get(request.testUrl+'/project/auth2/project/pageFindProjectList',{
				params:{
					'joinTimeStart':this.joinTimeStart,
					'joinTimeEnd':this.joinTimeEnd,
					'showStatus':this.form.showStatus,
					// 'projectName':this.form.projectName,
					'mobile':this.form2.mobile,
					'principal':this.form2.principal,
					"projectName":this.form2.projectName1
					
				}
			})
			.then(res=>{
				this.joinTimeStart = ''
				this.joinTimeEnd = ''
				if (res.data.code == 0) {
					let data = res.data.data
					this.tableDatass = data.records
					this.total = data.total
					for(var i=0;i<this.tableDatass.length;i++){
						this.tableDatass[i].createTime=this.transformDate(this.tableDatass[i].createTime);
					}
				} else {
					this.$message({
						message:res.data.msg,
						type:'error'
					});
				}
			})
		},
		//新增商家点击弹窗 清空数据
		add(){
			// this.$nextTick(()=>{
			// 	this.$refs.form5.resetFields();
			// })
			this.DialogAdd=true;
		},
		// 新增保存按钮
		save(form5){
				var params=new URLSearchParams();
					if(this.form5.name!=undefined){
						params.append('name',this.form5.name);
					}else{
						this.form5.name=''
					}
					if(this.form5.principal){
						params.append('principal',this.form5.principal);
					}else{
						this.form5.principal=''
					}
					if(this.form5.latitudes!=undefined){
						params.append('latitudes',this.form5.latitudes);
					}else{
						this.form5.latitudes=''
					}
					if(this.form5.longitudes!=undefined){
						params.append('longitudes',this.form5.longitudes);
					}else{
						this.form5.longitudes=''
					}
					if(this.form5.account!=undefined){
						params.append('account',this.form5.account);
					}else{
						this.form5.account=''
					}
					if(this.form5.address!=undefined){
						params.append('address',this.form5.address);
					}else{
						this.form5.address=''
					}
					if(this.form5.username!=undefined){
						params.append('username',this.form5.username);
					}else{
						this.form5.username=''
					}
					if(this.form5.password!=undefined){
						params.append('password',this.form5.password);
					}else{
						this.form5.password=''
					}
					if(this.form5.mobile!=undefined){
						params.append('mobile',this.form5.mobile);
					}else{
						this.form5.mobile=''
					}
					this.$axios.post(request.testUrl+'/project/auth2/project/insert',params)
					.then(res=>{
						if(res.data.code==0){
							this.$message({
								type:'success',
								message:'添加成功'
							})
							this.DialogAdd=false;
							this.renderData();
						}else{
							this.$message({
								type:'error',
								message:res.data.msg
							})
						}
					})
		},
		//取消按钮清空数据
		cancel(){
			this.$nextTick(()=>{
				this.$refs.form5.resetFields();
			})
			this.DialogAdd=false;
		},
		// 判断上线下线
		dugeline(i,id){
			//1上线变为0下线
			if(this.tableDatass[i].publishStatus==1){
				this.tableDatass[i].publishStatus=0;
				var params=new URLSearchParams();
				params.append('projectId',id);
				params.append('publishStatus',this.tableDatass[i].publishStatus);
				this.$axios.post(request.testUrl+'/project/auth2/project/updatePublishStatus',params).then(res=>{
				})
				
				//其他下线0下线变为1上线
				this.tableDatass[i].publishStatus=1;
				var params=new URLSearchParams();
				params.append('projectId',id);
				params.append('publishStatus',this.tableDatass[i].publishStatus);
				this.$axios.post(request.testUrl+'/project/auth2/project/updatePublishStatus',params).then(res=>{
				})
			}
		},
		//修改数据 form3 //渲染单个数据
		update(i){
			this.DialogUpdate=true;
			var id=this.tableDatass[i].id;
			this.$axios.get(request.testUrl+'/project/auth2/project/selectOne',{
				params:{
					projectId:id
				}
			})
			.then(res=>{
				if(res.data.data.password=='null'||res.data.data.username=='null'){
					
					let data=res.data.data;
					data.password="";
					data.username="";
					this.form3=data;
				}else{
					this.form3=res.data.data;
				}
			
			})
		},
		//修改保存按钮
		saveInfo(){
			this.$refs.form3.validate((valid) => {
                if (valid) {
					this.DialogUpdate=false;
					var params=new URLSearchParams();
					if(this.form3.name!='null'){
						if(this.form3.name!=''){
							params.append('name',this.form3.name);
						}
					}
					if(this.form3.principal!='null'){
						if(this.form3.principal!=''){
							params.append('principal',this.form3.principal);
						}
					}
					if(this.form3.latitudes!='null'){
						if(this.form3.latitudes!=""){
							params.append('latitudes',this.form3.latitudes);
						}
					}
					if(this.form3.longitudes!="null"){
						if(this.form3.longitudes!=""){
							params.append('longitudes',this.form3.longitudes);
						}
					}
					if(this.form3.account!="null"){
						if(this.form3.account!=""){
							params.append('account',this.form3.account);
						}
					}
					if(this.form3.address!='null'){
						if(this.form3.address!=""){
							params.append('address',this.form3.address);
						}else{
							params.append('address','null');
						}
					}
					if(this.form3.username!="null"){
						if(this.form3.username!=""){
							params.append('username',this.form3.username);
						}
					}
					if(this.form3.password!="null"){
						if(this.form3.password!=""){
							params.append('password',this.form3.password);
						}
					}
					if(this.form3.mobile!="null"){
						if(this.form3.mobile!=""){
							params.append('mobile',this.form3.mobile);
						}else{
							params.append('mobile','null');
						}
					}
					if(this.form3.id!="null"){
						if(this.form3.id!=""){
							params.append('id',this.form3.id);
						}
					}
					this.$axios.post(
						request.testUrl+'/project/auth2/project/doUpdate',params)
						.then(res=>{
							if(res.data.code==0){
								this.$message({
									type:'success',
									message:'修改成功'
								});
								this.DialogUpdate=false;
								this.renderData();
							}else{
								this.$message({
									type:'error',
									message:res.data.msg
								});
							}
					})
                } else {
                    return false;
                }
			});
		},
		export1(i){
			// alert('导出了');
		},
		jump(id){
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
			this.$axios.post(request.testUrl+'/project/auth2/project/deleteProjectBatch',params)
				.then(res=>{
					if(res.data.code==0){
						this.$message({
							type:'success',
							message:'删除成功'
						});
						this.renderData();
					}
			})
		},
		//点击图标进行定位
		getLocation(){
			// alert('查询')
			this.baiDuVisible=true;
			// this.renderMap()
			this.$router.push({
				path:'/Map',
				// query:{

				// }
			})
		},
		//点击X号清空百度地图参数
		closeMap(){
		// 	this.$nextTick(()=>{
		// 		this.$refs.formMap.resetFields();
		// 	});
		// 	this.baiDuVisible=false;
		},
		// renderMap(){
		// 	this.map = new BMap.Map("container");
		// 	var map=this.map;
		// 	console.log(map)
        //     // map.centerAndZoom("宁波", 12);
        //     // map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
        //     // map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
        //     // map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
        //     // map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
        //     // map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开
        //     this.localSearch = new BMap.LocalSearch(map);
        //     var localSearch=this.localSearch;
        //     console.log(localSearch)
        //     // localSearch.enableAutoViewport(); //允许自动调节窗体大小
		// },
		// getMapData(){
        //     this.map = new BMap.Map("container");
        //     var map=this.map;
        //     // map.centerAndZoom("宁波", 12);
        //     // map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
        //     // map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

        //     // map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
        //     // map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
        //     // map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开

        //     this.localSearch = new BMap.LocalSearch(map);
        //     var localSearch=this.localSearch;
        //     // console.log(localSearch)
        //     localSearch.enableAutoViewport(); //允许自动调节窗体大小

        // },
		// searchByStationName() {
        //     var map=this.map;
        //     map.clearOverlays();//清空原来的标注
        //     var keyword = document.getElementById("text_").value;
        //     var localSearch=this.localSearch;
        //     localSearch.setSearchCompleteCallback((searchResult)=>{
        //     	// console.log(localSearch)
        //         var poi = searchResult.getPoi(0);
        //         document.getElementById("result_").value = poi.point.lng + "," + poi.point.lat;
        //         this.formMap.result_=poi.point.lng + "," + poi.point.lat;
        //         this.lng=poi.point.lng;
        //         this.lat=poi.point.lat;
        //         map.centerAndZoom(poi.point, 13);
        //         var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
        //         map.addOverlay(marker);
        //         // var content = document.getElementById("text_").value + "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat;
        //         // var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
        //         // marker.addEventListener("click", ()=>{  this.openInfoWindow(infoWindow);    } );
        //         // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        //     });
		// 	localSearch.search(keyword)
		// 	// var lock=setTimeout(()=>{
		// 	// 	this.baiDuVisible=false;
		// 	// },4000)
        //     console.log( this.lng+"====="+this.lat+"====="+this.formMap.result_)
		// }
		getMapData(){
			var obj={};
			if(this.$route.query.address!=undefined){
				// console.log(this.$route.query.address)
				var obj={};
				obj.address=this.$route.query.address
				obj.lng=this.$route.query.lng
				obj.lat=this.$route.query.lat
				console.log(obj)
				localStorage.setItem('businessAdress',JSON.stringify(obj))
			}
			// obj.address=
			// console.log(localStorage.setItem({

			// }))
			console.log(localStorage.getItem('businessAdress'))
			this.form5.address=JSON.parse(localStorage.getItem('businessAdress')).address;
			this.form5.latitudes=JSON.parse(localStorage.getItem('businessAdress')).lat;
			this.form5.longitudes=JSON.parse(localStorage.getItem('businessAdress')).lng;
		}
		
	}
}
</script> 
<style scoped>
	.el-table .odd-row {
    background-color: rgba(0,255,255,0.2)!important;
  	}
    .manage{
		width:100%;
		color:#000;
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
.topIcon {
	width:40px;
	height:40px;
	position:absolute;
	top:0;
	right:0;
}
.manage >>> .el-pagination{
	text-align:right;
	margin-top:10px;
	font-size:20px;
}
.searchTxt >>>.el-form-item__label{
	color:#fff;
}
.search >>> .el-icon-location[data-v-7f77fe0d]{
	position: absolute;
    right: -3px;
    top: 9px;
}	
</style>