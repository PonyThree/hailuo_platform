 <template>
    <div class="addBusiness">
        <h2 style="">新增商家</h2>
       <div style="width:90%;margin:0 auto;">
		    <el-form  ref='form5' :model="form5" label-width="120px" :rules='rules' width="80%">
					<el-form-item label="项目名称:" prop='name'>
						<el-input placeholder="请输入内容" v-model="form5.name"  ></el-input>
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
								<el-input  v-model="form5.latitudes" placeholder="请输入经度" style='width:120px' disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" style='margin-left:-16px;'>
							<el-form-item label="纬度:">
								<el-input  v-model="form5.longitudes" placeholder="请输入纬度" style='width:120px' disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<img src="../../../../public/dw.png" alt="" style="width:20px;height:20px;margin-top:5px;"  @click='getLocation'>
						</el-col>
					</el-row>
					<el-form-item label="收款账号:" prop='account'>
						<el-input  v-model="form5.account" ></el-input>
                	</el-form-item>
					<div class='txt'>------以下资料仅限于企业内部管理,对外完全保密------</div>
					<el-form-item label="登录账号:" prop='username'>
						<el-input  v-model="form5.username"></el-input>
                	</el-form-item>
					<el-form-item label="登录密码:" prop='password' >
						<el-input  v-model="form5.password" type='password' ></el-input>
                	</el-form-item>
					<el-form-item>
						<template>
							<div>
									<el-button type="primary" @click="save('form5')">确 定</el-button>
									<el-button type="primary" @click="cancel">取 消</el-button>
							</div>
						</template>
					</el-form-item>
        	</el-form>
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
            form5:{
				name:'',
				principal:'',
				mobile:'',
				address:'',
				latitudes:'',
				longitudes:'',
				account:'',
				username:'',
				password:''
			},
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
			  mobile:[
                    {validator: validatePhone, trigger: 'blur'}
				]
		   },
		   
        }
	},
	mounted() {
		
	},
	created(){
		this.form5=JSON.parse(localStorage.getItem('cusMerchan')) || {}
		let addressObj=JSON.parse(localStorage.getItem('businessAdress'))||{}
		console.log(addressObj)
		if(addressObj!={}){
			this.form5.address=addressObj.address
			this.form5.latitudes=addressObj.lat
			this.form5.longitudes=addressObj.lng
		}
		console.log(this.form5)
	},
    methods:{
		//本地存储数据对象
		saveLocalData(form5){
			var obj={};
			obj=form5;
			localStorage.setItem('cusMerchan',JSON.stringify(obj))
		},
        //点击图标进行定位
		getLocation(){
			this.saveLocalData(this.form5)
			this.baiDuVisible=true;
			this.$router.push({
				path:'/Map',
				query:{
					page:'新增商家'
				}
			})
		},
		
        // 新增保存按钮
		save(form5){
			console.log(this.form5.latitudes)
			console.log(this.form5.longitudes)
			console.log(this.form5.address)
				var params=new URLSearchParams();
					if(this.form5.name!=undefined){
						if(this.form5.name!=''){
							params.append('name',this.form5.name);
						}
					}else{
						this.form5.name=''
					}
					if(this.form5.principal!=undefined){
						if(this.form5.principal!=''){
							params.append('principal',this.form5.principal);
						}
					}else{
						this.form5.principal=''
					}
					if(this.form5.latitudes!=undefined){
						if(this.form5.latitudes!=''){
							params.append('latitudes',this.form5.latitudes);
						}
					}else{
						this.form5.latitudes=''
					}
					if(this.form5.longitudes!=undefined){
						if(this.form5.longitudes!=""){
							params.append('longitudes',this.form5.longitudes);
						}
					}else{
						this.form5.longitudes=''
					}
					if(this.form5.account!=undefined){
						if(this.form5.account!=""){
							params.append('account',this.form5.account);
						}
					}else{
						this.form5.account=''
					}
					if(this.form5.address!=undefined){
						if(this.form5.address!=""){
							params.append('address',this.form5.address);
						}
					}else{
						this.form5.address=''
					}
					if(this.form5.username!=undefined){
						if(this.form5.username!=""){
							params.append('username',this.form5.username);
						}
					}else{
						this.form5.username=''
					}
					if(this.form5.password!=undefined){
						if(this.form5.password!=""){
							params.append('password',this.form5.password);
						}
					}else{
						this.form5.password=''
					}
					if(this.form5.mobile!=undefined){
						if(this.form5.mobile!=""){
							params.append('mobile',this.form5.mobile);
						}
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
							this.$router.push({
								path:'/项目管理'
							})
							localStorage.removeItem('cusMerchan')
							localStorage.removeItem('businessAdress')
							console.log(localStorage.getItem('cusMerchan'))
							console.log(localStorage.getItem('businessAdress'))
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
    }
}
</script>
<style>
	.el-button--primary {
		color: #fff!important;
		background-color: #409EFF!important;
		border-color: #409EFF!important;
		margin-left: 115px;
		margin-top:30px;
	}
    .addBusiness{
        /* padding:0 10px; */
        width:600px;
        height:600px;
        margin:20px auto 30px;
        border-radius:10px;
        overflow: hidden;
        background-color: #fff;
    }
    .addBusiness h2{
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