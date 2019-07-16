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
			<!--分页器-->
            <el-pagination background  :current-page.sync='currentPage' :page-sizes="[5, 10, 15]"  layout="total, sizes, prev, pager, next,jumper" :total="total" class='page' @size-change="sizeChange" @current-change="currentChange"> 
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
		if(this.$route.query.address!=null){
			this.getMapData();
		}
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
			this.$router.push({
				path:'/新增商家'
			})
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
					if(res.data.code==0){
						this.renderData(this.pageSize);this.renderData(this.pageSize,this.currentPage);
					}
				})
			}else{
				//其他下线0下线变为1上线
				this.tableDatass[i].publishStatus=1;
				var params=new URLSearchParams();
				params.append('projectId',id);
				params.append('publishStatus',this.tableDatass[i].publishStatus);
				this.$axios.post(request.testUrl+'/project/auth2/project/updatePublishStatus',params).then(res=>{
					if(res.data.code==0){
						this.renderData(this.pageSize);this.renderData(this.pageSize,this.currentPage);
					}
				})
			}
		},
		//修改数据 form3 //渲染单个数据
		update(i){
			// this.DialogUpdate=true;
			var id=this.tableDatass[i].id;
			console.log(id)
			this.$router.push({
				path:'/修改商家',
				query:{
					id:id,
					page:'修改商家'
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
		},
		getMapData(){
			var obj={};
			if(this.$route.query.address!=null){
				// console.log(this.$route.query.address)
				var obj={};
				obj.address=this.$route.query.address
				obj.lng=this.$route.query.lng
				obj.lat=this.$route.query.lat
				console.log(obj)
				localStorage.setItem('businessAdress',JSON.stringify(obj))
			}
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
		width:354px;
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