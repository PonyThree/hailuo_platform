<template>
    <div>
        <h2>项目详情</h2>
        <div class="container">
            <!-- <div class='content1 content'>
                <div class="text">账号密码</div>
            </div> -->
            <div class='content2 content'>
                <div class="text">基本信息</div>
                <el-form ref='form' :data='form'  label-width="120px" size='mini'>
                    <el-form-item prop='projectName' label='项目名称:'>
                        <!-- <el-input v-model='form.projectName' style='width:360px;'></el-input> -->
                        <span v-model='form.projectName'>{{form.projectName}}</span>
                    </el-form-item>
                    <el-form-item prop='address' label='项目地址:'>
                        <template>
                            <!-- <div>
                                <span>重庆市</span>
                                <span>江北区</span>
                                <span>观音桥龙湖时代天街</span> 
                            </div> -->
                        </template>
                    </el-form-item>
                    <el-form-item prop='qrCode' label='推广活动二维码:' class='qrCode'>
                        <template>
                            <div>
                                <!-- <image :src='form.qrCode' class='codePic'></image> -->
                                <img src="../../../assets/img/boy.jpg" alt=""  class='codePic'>
                                <a @click="downLoad(form.qrCode)" class="down">下载</a>
                            </div>
                        </template>
                    </el-form-item>
                    <el-form-item prop='receiptName' label='收款账号名称:' class='receiptAccount'>
                        <!-- <el-input v-model='form.receiptName' style='width:360px;'></el-input> -->
                        <span v-model='form.receiptName'>{{form.receiptName}}</span>
                    </el-form-item>
                </el-form>

            </div>
            <div class='content content3'>
                <div class="text">项目banner</div>
                <el-table :data='bannerTable'>
                    <el-table-column prop='' label='序号' width='100px'  align='center'>
                        <template slot-scope="scope">
                            <span>{{scope.$index+1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop='form.bannerPic' label='图片' width='160px'  align='center'>
                        <template slot-scope="scope">
                            <span v-show='false'>{{scope.$index}}</span>
                            <span>{{bannerTable[scope.$index].bannerPic}}</span>
                            <!-- <image :src='bannerTable[scope.$index].bannerPic'></image> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop='jumpUrl' label='跳转链接设置' width='220px'  align='center'>
                        <template slot-scope="scope">
                            <span @click='jump(bannerTable[scope.$index].jumpUrl)'>{{bannerTable[scope.$index].jumpUrl}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop='desc' label='图片描述' width='160px'  align='center'>
                    </el-table-column>
                    <el-table-column prop='sort' label='排序值' align='center'>
                    </el-table-column>
                   
                    <!-- <el-table-column prop='operation' label='操作'>
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="update(scope.$index, bannerTable[scope.$index])"  size="small" style='color:#00f;' type='text'>
                            修改
                            </el-button>
                            <el-button
                            @click.native.prevent="deletePicInfo(scope.$index, bannerTable[scope.$index])"
                            size="small" style='color:#00f;' type='text'>
                            删除
                            </el-button>
					    </template>
                    </el-table-column> -->
                </el-table>
                <!--分页器-->
                <el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pagesize" layout="total, sizes, prev, pager, next,jumper" :total="total" class='page'>
                </el-pagination>
            </div>
            <div class='content content4'>
                <div class="text">小区详情</div>
                <el-form ref='form' ::data='form'>
                    <el-row>
                        <el-col :span='8'>
                            <el-form-item label='全部车位:' prop='parkNum'>
                                <span v-model='form.parkNum'>10个</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span='8'>
                            <el-form-item label='全部业主:' prop='noBuy'>
                                <span v-model='form.noBuy'>20位</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span='8'>
                            <el-form-item label='车位配比:' prop='parkRatio'>
                                <span v-model='form.parkRatio'>2:1个</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-form-item   label="小区政策" style="margin-bottom: 0;"> 
                    </el-form-item> -->
                    <!-- <el-form-item label="" prop='finanPolicy' style='margin-left:60px;'> -->
                        <!-- <el-input v-model="domain.id" v-show="1==2" ></el-input> -->
                        <!-- v-if="num==index"下面的注释 -->
                    <el-form-item v-for="(domain, index) in form.finanPolicy"   :prop="'telPhoneList.'+index+'.telPhone'" :label="'小区政策'+(index+1)+':'" style="width: 60%;margin-bottom: 0;margin-left:56px;">
                            <template>
                                <div>
                                    <el-input v-model="domain.name"  style="width: 200px;" placeholder="请输入政策或者平均价格"></el-input>
                                    <el-input v-model="domain.id" v-show="1==2" ></el-input>
                                    <i class="iconfont icon-add_x use" @click="addpromptList" v-if="num==index"></i>
                                    <i class="iconfont icon-jian use" @click="deletepromptList(domain)" v-if="form.finanPolicy.length>1"></i>
                                </div>
                            </template>
                    </el-form-item>
                        <!-- <el-input v-model="form.finanPolicy"  style="width:300px;">3年首付,10年分期</el-input>
                        <i class="iconfont icon-add_x use" @click="addpromptList" ></i>
                        <i class="iconfont icon-jian use" @click="deletepromptList()" ></i>
                    </el-form-item> -->
                    <!-- <el-form-item label="平均价格:" prop='avgPrice' style='margin-left:56px;margin-top:20px;'>
                        v-if="form.projectDistrict.policyList.length>1" 下面的注释
                        <el-input v-model="form.avgPrice"  style="width:200px;">￥{{form.avgPrice}}/个</el-input>
                        <i class="iconfont icon-add_x use" @click="addpromptList" ></i>
                        <i class="iconfont icon-jian use" @click="deletepromptList()" ></i>
                    </el-form-item> -->
                </el-form>
            </div>
            <div class='content content5'>
                <div class="text">项目介绍</div>
                <el-form :data='form'>
                    <el-form-item  :label="'默认链接'+(parseInt(index)+1)+':'" style="width: 50%;margin-left: 30%;"  v-for="(domains, index) in form.activityPresentationVoList">
                        <!-- <el-form-item  v-for="(domains, index2) in form.activityPresentationVoList" :label="(index2+1)+':'" style="width: 50%;margin-top: 40px;margin-left: 10%;">
                            <span>{{domains.linkName}}</span>
                            <span v-show="false">{{domains.content}}</span>
                            <span v-show="false">{{domains.id}}</span>
                            <el-button type="primary" style="margin-left: 10%;" @click="derails(index2)">修改</el-button>
                        </el-form-item> -->
                        <span>{{index+1}}.{{domains.name}}</span>
                        <image src=''></image>
                        <el-button type='primary' size='mini' @click='find(1)' style='margin-left:10px;'>查看</el-button>
				    </el-form-item>
                </el-form>  
            </div>
            <!-- 编辑默认链接弹出框 -->
	        <el-dialog title="修改活动介绍" :visible.sync="revise" width="40%">
	            <el-form ref="info" v-model="info" label-width="100px" >
	                <el-form-item label="链接名称:">
	                    <el-input v-model="info.linkName" placeholder="请输入需要添加人员的姓名"></el-input>
	                </el-form-item>
	                
	                <el-form-item label="跳转链接地址:">
	                    <el-input v-model="info.content" placeholder="请输入需要添加人员的手机号"></el-input>
	                </el-form-item>
	                
	                <el-form-item label="图片" style="width:92%;">
	                	<div style="width: 80%;height: 150px;display: block;float: left;position: relative;" id="aa">
	                		<!-- <img :src="info.imgUrl" alt="" style="width: 100%;height: 150px;display: block;"/> -->
                            <img src="../../../assets/img/car.jpg" alt="" style="width: 286px;height: 100px;">
	                		<img src="../../../assets/img/2.png" alt="" style="width:10%;height:25%;position: absolute; right:0px;top:5px;" @click="show"/>
	                	</div>
						
						<div style="position: relative;float:left;display: none;" class="22222" id="cc">
							<el-upload action="auto" list-type="picture-card" :file-list="fileList" with-credentials :before-upload="beforeUpload" :http-request="uploadSectionFile" :on-remove="afterRemove" :on-exceed="handleExceed" :limit='1'>
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="info.imgUrl" alt="">
							</el-dialog>
						</div>
	 
	                </el-form-item>
	                
	                <el-form-item v-show="false">
	                    <el-input v-model="info.id" ></el-input>
	                </el-form-item>
	            </el-form>
	            
	            <span slot="footer" class="dialog-footer">
	            	<el-button type="primary" @click="saveInfo">保存</el-button>
	                <el-button @click="deletInfo">取 消</el-button> 
	            </span>
	        </el-dialog>
            <div class='content content6'>
                <div class="text">项目落位控制</div>
                <el-form :data='form' ref='form' label-width="160px">
                    <el-form-item label='请设置落位金:' prop='money'>
                        <el-input v-model='form.money' style='width:100px'>1000</el-input>
                        <span>元</span>
                    </el-form-item>
                    <el-form-item label="可落位开始时间:">
                        <el-date-picker
                            v-model="form.luoweiTime"
                            type="daterange"
                            class="datePicker"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            default-value="2019-01-01">
                        </el-date-picker>
                    </el-form-item>
                    <el-row>
                        <el-col :span='6'>
                            <el-form-item prop='cancalOrder'>
                                <el-checkbox v-model="form.cancalOrder">允许落位后取消订单</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="18">
                            <el-form-item prop='parkNum'>
                               <template>
                                   <div class='luoweiCondition'>
                                        &nbsp;&nbsp;&nbsp;&nbsp;一个人可落<span v-model='form.parkNum'>3</span>个位&nbsp;&nbsp;&nbsp;&nbsp;
                                        一个人车位可落<span v-model='form.person'>3</span>个人
                                   </div>
                               </template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='24'>
                            <el-form-item prop='timing'>
                                <el-checkbox v-model="form.timing">
                                    落位后，可认购时间开始计时，若超过
                                    <span v-model='form.luoweiEndTime'>10</span>
                                    小时后未认购，则取消落位订单
                                </el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="content content7">
                <div class="text">项目认购控制</div>
                <el-form>
                    <el-form-item label='请设置认购金:' prop='subscriptionFee' >
                        <el-input v-model='form.subscriptionFee' style='width:100px'></el-input>元
                    </el-form-item>
                    <el-row>
                    <el-col :span='20'>
                         <el-form-item label="可落位开始时间:">
                            <el-date-picker
                                v-model="form.luoweiTime1"
                                type="daterange"
                                class="datePicker"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                default-value="2019-01-01">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='4'>
                        <el-form-item prop='sameTime'>
                            <el-checkbox v-model="form.sameTime">与开盘时间一致</el-checkbox>
                        </el-form-item>
                    </el-col>
                    </el-row>
                </el-form>
                
            </div>
            <div class="content content8">
                <div class="text">展示信息</div>
                <el-form  :data='form' label-width='100px'>
                    <el-row>
                        <el-col :span='12'>
                            <el-form-item label='客服名称:' prop='serviceName'>
                                <el-input v-model='form.serviceName'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label='客服电话:' prop='servicePhone'>
                                <el-input v-model='form.servicePhone'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item prop='pAnnouncement' label='项目公告：'>
                        <el-input type="textarea" autosize placeholder="请输入项目公告，用于在小程序展示给用户" v-model="form.textarea1" style='width:500px'>
                        </el-input >
                    </el-form-item>

                </el-form>
            </div>
            <div class="content content9">
                <div class="text" >置业顾问管理</div>
    			<!--新增成员-->
				<!-- <el-button class="member" @click="addMember" style="margin-left: 20%;">新增成员</el-button> -->
				
				<!--表格列表-->
				<el-table :data="memberData" border style="width:46%; margin-left: 20%;overflow-x:hidden;">
					<el-table-column prop="num" label="序号" align="center" width="100">
						<template scope="scope">
							<span>{{scope.$index+1}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="置业顾问名称" align="center" width="266"></el-table-column>
					<el-table-column prop="id" label="" align="center" v-show:"1==2"></el-table-column>
					<el-table-column prop="phone" label="手机号" align="center" width="266"></el-table-column>
				</el-table>
            </div>
            <el-button type='primary' style='margin:0 auto;' class='goBack' size='middle' @click="goBack">返回</el-button>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            dialogVisible:false,
            fileList:[],
            revise:false,
            form:{
                finanPolicy:[
                    {
                        name:'',
                    }
                ],
                projectName:'蓝湖郡',
                receiptName:'add3311',
                avgPrice:13.000,
                activityPresentationVoList:[
                    {
                        name:'那些车位不能买?'
                    },
                     {
                        name:'那些车位不能买?'
                    },
                     {
                        name:'那些车位不能买?'
                    },
                     {
                        name:'那些车位不能买?'
                    },
                ]
            },
            
            info:{
                imgUrl:'../../../assets/img/car.jpg'
            },
            num:0,
            currentPage:3,
            pagesize:10,
            total:100,
            memberData:[
                {
                    name:'杜晓尔',
                    phone:1564454851
                },
                {
                    name:'赵晓柳',
                    phone:1568454542
                },
                {
                    name:'孙劳斯',
                    phone:1684782748
                }
            ],
            bannerTable:[
                {
                    // bannerPic:'../../../assets/img/car.jpg',
                    jumpUrl:'https://www.baidu.com/',
                    desc:'祝贺平台上线',
                    sort:1
                },
                 {
                    // bannerPic:'../../../assets/img/car.jpg',
                    jumpUrl:'https://www.baidu.com/',
                    desc:'祝贺平台上线',
                    sort:2
                },
                 {
                    // bannerPic:'../../../assets/img/car.jpg',
                    jumpUrl:'https://www.baidu.com/',
                    desc:'祝贺平台上线',
                    sort:3
                }
            ]
        }
    },
    
    created(){

    },
    mounted(){
        // this.form=
    },
    methods:{
        //下载
        downLoad(qrCodeUrl){
            //console.log(qrCodeUrl)
            // window.location.href=request.testUrl+"/activityProject/download?fileUrl="+qrCodeUrl;
        },
        update(i){
            // alert(i+'修改了');
            this.revise=true;
        },
        deletePicInfo(i){
            // alert(i+'删除了');
            this.bannerTable.splice(i,1);
            console.log(this.bannerTable);
        },
         //增加提示
        addpromptList(){
            // if(this.num==2){
            //     alert('一个人最多可以设置3个不同手机号接受信息');
            //     return;
            // }
            // alert('增加!');
            this.form.finanPolicy.push({
            });
            this.num=this.form.finanPolicy.length-1;
            
        },
        //删除
        deletepromptList(item){
            // alert('减少!');
            var index = this.form.finanPolicy.indexOf(item)
            if (index !== -1) {
                this.form.finanPolicy.splice(index, 1)
            }
            this.num=this.form.finanPolicy.length-1;                        
        },
        find(i){
            // alert('查看了'+i+'条数据');
            console.log(this.bannerTable[i].jumpUrl);
            window.location.href=`${this.bannerTable[i].jumpUrl}`;
            // 跳转到相应的软文链接
            // this.$router.push()
        },
        goBack(){
            this.$router.go(-1);
        },
        saveInfo(){
            this.revise=false;
        },
        deletInfo(){
            this.revise=false;
        },
        show(){
            document.getElementById("aa").style.display="none",
            document.getElementById("cc").style.display="block"
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
            jump(url){
                // alert(url);
                window.location.href=url;
            }

    }
}
</script>
<style  scoped>
    h2{
    	margin-bottom: 20px;
    }
    .container{
        /* width:100%; */
        margin-top: 40px;
		height: auto;
        overflow: hidden;
        background-color: #fff;
        /* background-color: pink; */
    }
    .content{
        border:1px solid #eee;
        margin-bottom:30px;
        height:auto;
        overflow: hidden;
        border:1px solid #eee;
    }
    /* .content1{
        background-color: pink;
    }
    .content2{
        margin-bottom:30px;
        border:1px solid #eee;
    } */
	.info{
		width:100%;
		height: auto;
		overflow: hidden;
	}
	.text{
		width:100%;
		height: 40px;
		line-height: 40px;
		background: rgb(243,243,243);
		margin-bottom: 40px;
		color:#000;
		font-size: 18px;
		letter-spacing: 2px;
		text-indent: 16px;
	}
	/* .el-button:focus, .el-button:hover {
	    color: #fff;
	    border-color: #999999;
	    background-color: #999999;
    } */
    form{
        display: block;
        width:600px;
        height:auto;
        /* background-color: #ff0; */
        margin:0 auto;
    }
    
    .qrCode{
        margin-left:40px;
    }
    .codePic{
        width:80px;
        height:80px;
        border: 1px solid #999;
        float: left;
        margin-right: 20px;
    }
    .down{
		color: cadetblue;
		font-size: 14px;
		margin-left: 20px;
        margin-top:40px;
		display: inline-block;
	}
    .down:active{
		color: rgb(50, 65, 87);
	}
	.down:hover{
		cursor: pointer;
	}
    .receiptAccount{
        margin-left:24px;
    }
    .content3 .el-table{
        border:1px solid #409EFF;
        display: block;
        width:800px;
        height:auto;
        /* background-color: pink; */
        margin:0 auto;
    }
    .page{
        width:100%;
        box-sizing: border-box;
        text-align: right;
        margin:30px auto 0;
        padding:10px 298px 0 0;
        height:48px;
        background-color: rgb(25,158,216)
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
    .el-button--primary {
    color: #fff!important;
    background-color: #409EFF!important;
    border-color: #409EFF!important;
    }
    .luoweiCondition{
        display: inline-block;
        font-size:14px;
        color:#606266;
    }
    .goBack{
        display: block;
        margin:0 auto;
    }
    .datePicker {
        width: 250px;
    }
</style>