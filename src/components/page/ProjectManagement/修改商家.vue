<template>
    <div class="updateBusiness">
        <h2>修改商家</h2>
       <div style="width:90%;margin:0 auto;">
		    <el-form  ref='form' :model="form" label-width="120px" :rules='rules' width="80%">
					<el-form-item label="项目名称:" prop='name'>
						<el-input placeholder="请输入内容" v-model="form.name"  ></el-input>
                	</el-form-item>
					<el-form-item label="项目负责人:" prop='principal'>
						<el-input placeholder="请输入内容" v-model="form.principal" ></el-input>
                	</el-form-item>
					<el-form-item label="手机号码:" prop="mobile" @blur="jugeMobile">
						<el-input placeholder="请输入内容" v-model="form.mobile" ></el-input>
                	</el-form-item>
					<el-form-item label="项目地址:" prop="address">
						<el-input placeholder="请输入内容" v-model="form.address"></el-input>
                	</el-form-item>
					<el-row>
						<el-col :span="11">
							<el-form-item  label="经度:" prop='latitudes'>
								<el-input  v-model="form.latitudes" placeholder="请输入经度" style='width:120px' disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" style='margin-left:-16px;' >
							<el-form-item label="纬度:" prop="longitudes">
								<el-input  v-model="form.longitudes" placeholder="请输入纬度" style='width:120px' disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<img src="../../../../public/dw.png" alt="" style="width:20px;height:20px;margin-top:5px;"  @click='getLocation'>
						</el-col>
					</el-row>
					<el-form-item label="收款账号:" prop='account'>
						<el-input  v-model="form.account" @blur="jugeNum"></el-input>
                	</el-form-item>
					<div class='txt'>------以下资料仅限于企业内部管理,对外完全保密------</div>
					<el-form-item label="登录账号:" prop='username'>
						<el-input  v-model="form.username"></el-input>
                	</el-form-item>
					<el-form-item label="登录密码:" prop='password' >
						<el-input  v-model="form.password" type='password' ></el-input>
                	</el-form-item>
					<el-form-item>
						<template>
							<div>
									<el-button type="primary" @click="saveInfo('form')">确 定</el-button>
									<el-button type="primary" @click="cancel">取 消</el-button>
							</div>
						</template>
					</el-form-item>
        	</el-form>
			<!-- 修改商家 -->
			<el-dialog
				title="百度地图"
				:visible.sync="dialogUpVisible"
				center class="baiduSearch">
				经度<input v-model.number="center.lng">
				纬度<input v-model.number="center.lat">
				<!-- 放大倍数<input v-model.number="zoom" class="map"> -->
				关键字搜索<input v-model="keyword" class="baiduTxt" >
				<!-- <div id="allmap"></div> -->
				<div>
					<baidu-map class="bm-view" :center="center" :zoom="zoom"  @click="synCenterAndZoom" @rightclick="rightclick">
						<!-- 自动定位控制 -->
						<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="locationSuccess"></bm-geolocation>
						<!-- 关键字搜索 -->
						
						<bm-local-search :keyword="keyword" :pageCapacity="3" :autoViewport="true" @markersset="markersset" @infohtmlset="infohtmlset1" class="baiduSea"></bm-local-search> 
					</baidu-map>	
				</div>
			</el-dialog>
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
			center:{lng:106.536312,lat:29.599829},
			zoom:13,
			keyword:'重庆市',
			location:'重庆',
			searchTxt:'',
			//修改
			dialogUpVisible:false,
			form:{
				address:'',
				latitudes:'',
				longitudes:''
			},
			id:this.$route.query.id,
            form:{
				name:'',
				principal:'',
				mobile:'',
				address:'',
				latitudes:0,
				longitudes:0,
				account:'',
				username:'',
				password:''
			},
            //修改验证
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
				   {required:true,message:'请输入收款账号',trigger:'blur'},
				//    { type: 'number', message: '只能输入数字', trigger: 'blur' },

			   ],
			    username:[
				   {required:true,message:'请输入登录账号',trigger:'blur'}
			   ],
			    password:[
				   {required:true,message:'请输入登录密码',trigger:'blur'}
			   ],
			    mobile:[
					{validator: validatePhone, trigger: 'blur'},
					{required:true,message:'请输入经度',trigger:'blur'}
				],
				address:[
					{required:true,message:'请输入经度',trigger:'blur'}
				],
				latitudes:[
					{required:true,message:'请输入纬度',trigger:'blur'}
				],
				longitudes:[
					{required:true,message:'请输入纬度',trigger:'blur'}
				]
		   },
		   
        }
	},
	created(){
		this.renderData(this.id)
	},
    methods:{
		//账号数字验证
		jugeNum(){
			if(this.form.account!=''){
				console.log(Number(this.form.account))
				if(!Number(this.form.account)){
					this.$message({
						type:'error',
						message:'请输入数字的收款账号'
					})
					return
				}
			}
			// console.log(Number(this.form5.account))	
		},
		rightclick(){
			// alert('右键单击了')
		},
		//脚注成功后的回调函数
		markersset(pois){
			// console.log(pois)
		},
		jugeMobile(){
			if(this.form.mobile==''){
				// callback(new Error('请输入手机号'));
				this.$message({
					type:'error',
					message:'请输入手机号'
				})
            }else if(value!==''){
                if(!isvalidPhone.test(value)){
					// callback(new Error('请输入正确的11位手机号'));
					this.$message({
						type:'error',
						message:'请输入正确的11位手机号'
					})
                }
            }else{
                
            }
		},
		renderData(id){
			console.log(id)
			if(id!='undefined'){
				//渲染数据
				this.$axios.get(request.testUrl+'/project/auth2/project/selectOne',{
					params:{
						projectId:id
					}
					})
					.then(res=>{
					console.log(res.data.data)
					if(res.data.data!=null){
						if(res.data.data.password=='null'||res.data.data.username=='null'){
							let data=res.data.data;
							data.password="";
							data.username="";
							this.form=data;
						}else{
							let data=res.data.data;
							this.form=data;
							localStorage.setItem('cusMerchan1',JSON.stringify(data))
						}
					}
					
				
				})
			}else{

			}
			
		},
        //点击图标进行定位
		getLocation(){
			this.dialogUpVisible=true
		},
		//点击地图位置经纬度获取
		synCenterAndZoom(e){
			console.log(e.target)
			const {lng,lat} =e.target.getCenter()
			this.center.lng=lng
			this.center.lat=lat
			// console.log(lng,lat)
			this.form5.latitudes=lat
			this.form5.longitudes=lng
			this.zoom=e.target.getZoom()
			this.dialogVisible=false
			console.log(this.form5)
		},
		//定位完成之后
		locationSuccess(point, AddressComponent, marker){
			this.center=point.point;	
		},
		infohtmlset1(poi){
			var detalAddress=poi.address;
			this.center=poi.point;
			this.form.address=detalAddress;
			this.form.latitudes=poi.point.lat
			this.form.longitudes=poi.point.lng
			this.dialogUpVisible=false;
		},
		//修改保存按钮
		saveInfo(form){
					var params=new URLSearchParams();
					if(this.form!=null){
						if(this.form.name!='null'){
							if(this.form.name!=''){
								params.append('name',this.form.name);
							}
						}
						if(this.form.principal!='null'){
							if(this.form.principal!=''){
								params.append('principal',this.form.principal);
							}
						}
						if(this.form.latitudes!='null'){
							if(this.form.latitudes!=""){
								params.append('latitudes',this.form.latitudes);
							}
						}
						if(this.form.longitudes!="null"){
							if(this.form.longitudes!=""){
								params.append('longitudes',this.form.longitudes);
							}
						}
						if(this.form.account!="null"){
							if(this.form.account!=""){
								params.append('account',this.form.account);
							}
						}
						if(this.form.address!='null'){
							if(this.form.address!=""){
								params.append('address',this.form.address);
							}else{
								params.append('address','null');
							}
						}
						if(this.form.username!="null"){
							if(this.form.username!=""){
								params.append('username',this.form.username);
							}
						}
						if(this.form.password!="null"){
							if(this.form.password!=""){
								params.append('password',this.form.password);
							}
						}
						if(this.form.mobile!="null"){
							if(this.form.mobile!=""){
								params.append('mobile',this.form.mobile);
							}else{
								params.append('mobile','null');
							}
						}
						if(this.form.id!="null"){
							if(this.form.id!=""){
								params.append('id',this.form.id);
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
									this.renderData(this.id);
									this.$router.push({
										path:'/项目管理'
									})
								}else{
									this.$message({
										type:'error',
										message:res.data.msg
									});
								}
						})
					// }	
				} else {
                    return false;
                }
			// });
		},
		//取消按钮清空数据
		cancel(){
			// this.$nextTick(()=>{
			// 	this.$refs.form.resetFields();
			// })
			// this.renderData(this.id);
			this.$router.push({
				path:'项目管理'
			})
			localStorage.removeItem('cusMerchan1')
			localStorage.removeItem('businessAdress')
		},
    }
}
</script>
<style>
	.baiduSea{
		position:absolute;
		top:98px;
		right:26px;
		z-index: 1000;
		width:300px;
		/* height:200px; */
		height: auto;
		border:1px solid #000;
	}
	.bm-view{
	width: 100%;
	height: 400px;
	}
	.el-button--primary {
		color: #fff!important;
		background-color: #409EFF!important;
		border-color: #409EFF!important;
		margin-left: 115px;
		margin-top:30px;
	}
    .updateBusiness{
        /* padding:0 10px; */
        width:600px;
        height:600px;
        margin:20px auto 30px;
        border-radius:10px;
        overflow: hidden;
        background-color: #fff;
    }
    .updateBusiness h2{
        background-color: rgb(135,206,255);
        width:100%;
        height:50px;
        text-align:center;
        font-size:20px;
        margin:20px auto;
        color:#fff;
    }
    .txt{
		color:#000;
		font-size:14px;
		line-height: 20px;
		margin:10px auto;
		text-align: center;

	}
</style>