<template>
    <div>
        <h2>项目详情</h2>
        <div class="container">
            <!-- <div class='content1 content'>
                <div class="text">账号密码</div>
            </div> -->
            <!-- 基本信息 -->
            <div class='content2 content'>
                <div class="text">基本信息</div>
                <el-form ref='form' :data='form.projectInfoVo'  label-width="120px" size='mini'>
                    <el-form-item prop='name' label='项目名称:'>
                        <!-- <el-input v-model='form.projectName' style='width:360px;'></el-input> -->
                        <span>{{form.projectInfoVo.name}}</span>
                    </el-form-item>
                    <el-form-item prop='address' label='项目地址:'>
                        <template>
                            <span>{{form.projectInfoVo.address}}</span>
                        </template>
                    </el-form-item>
                    <el-form-item prop='qrCode' label='推广活动二维码:' class='qrCode'>
                        <template>
                            <div>
                                <img :src="form.projectInfoVo.qrCodeUrl" alt="二维码" class='codePic'>
                                <a @click.prevent="downLoad(form.projectInfoVo.qrCodeUrl)" class="down">下载</a>
                            </div>
                        </template>
                    </el-form-item>
                    <el-form-item prop='accountName' label='收款账号名称:' class='receiptAccount'>
                        <span>{{form.projectInfoVo.accountName}}</span>
                    </el-form-item>
                </el-form>

            </div>
            <!-- 项目banner -->
            <div class='content content3'>
                <div class="text">项目banner</div>
                <el-table :data='bannerTable'>
                    <el-table-column prop='' label='序号' width='100px'  align='center'>
                        <template slot-scope="scope">
                            <span>{{scope.$index+1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop='img_url' label='图片' width='320px'  align='center'>
                        <template slot-scope="scope">
                            <!-- <span v-show='false'>{{scope.$index}}</span>
                            <span>{{bannerTable[scope.$index].bannerPic}}</span> -->
                            <!-- <image :src='bannerTable[scope.$index].bannerPic'></image> -->
                            <img :src="bannerTable[scope.$index].img_url" alt="" style="width:200px;height:100px;">
                        </template>
                    </el-table-column>
                    <el-table-column prop='href' label='跳转链接设置' width='220px'  align='center'>
                        <template slot-scope="scope">
                            <!-- <span @click='jump(bannerTable[scope.$index].href)'>{{bannerTable[scope.$index].href}}</span> -->
                            <span>{{bannerTable[scope.$index].href}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop='description' label='图片描述' width='160px'  align='center'>
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
                <el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pageSize" layout="total, sizes, prev, pager, next,jumper" :total="total" class='page' @size-change="sizeChange" @current-change="currentChange"> 
                </el-pagination>
            </div>
            <!-- 小区详情 -->
            <div class='content content4'>
                <div class="text">小区详情</div>
                <el-form ref='form' :data='form.districtVo'>
                    <el-row>
                        <el-col :span='8'>
                            <el-form-item label='全部车位:' prop='parkNum'>
                                <span>{{form.districtVo.surplusTruckSpace}}个</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span='8'>
                            <el-form-item label='全部业主:' prop='noBuy'>
                                <span>{{form.districtVo.ownerNobuy}}位</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span='8'>
                            <el-form-item label='车位配比:' prop='parkRatio'>
                                <span>{{form.districtVo.compareA}}：{{form.districtVo.compareB}}个</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- v-if="num==index"下面的注释 -->
                    <el-form-item v-for="(domain, index) in form.districtVo.policyList" :key="index"  :prop="'telPhoneList.'+index+'.telPhone'" :label="'小区政策'+(index+1)+':'" style="width: 60%;margin-bottom: 0;margin-left:56px;" label-width="180px">
                            <template>
                                <div>
                                    <el-input v-model="domain.policy">{{domain.policy}}</el-input>
                                    <!-- <span>{{domain.policy}}</span> -->
                                    <!-- <el-input v-model="domain.policy"  style="width: 200px;" placeholder="请输入政策或者平均价格"></el-input>
                                    <el-input v-model="domain.id" v-show="1==2" ></el-input>
                                    <i class="iconfont icon-add_x use" @click="addpromptList" v-if="num==index"></i>
                                    <i class="iconfont icon-jian use" @click="deletepromptList(domain)" v-if="form.finanPolicy.length>1"></i> -->
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
            <!-- 项目介绍 -->
            <div class='content content5'>
                <div class="text">项目介绍</div>
                <el-form :data='form.activityInfoList'>
                    <el-form-item  style="width: 80%;display:flex;justify-content:center;" v-for="(domains, index) in form.activityInfoList" inline-message :key="index">
                                <span style="margin-right:25px;">{{index+1}}.{{domains.linkName}}</span>
                                <span v-show="1==2">{{domains.content}}</span>
                                <img :src="domains.image" alt="" style="width:200px;height:90px;overflow:hidden;margin:0 25px;"/>
                                <el-button type='primary' size='mini' @click='find(domains.content)' style='margin-left:10px;display:inline;'>查看</el-button>
				    </el-form-item>
                </el-form>  
            </div>
            <!-- 编辑默认链接弹出框 -->
	        <!-- <el-dialog title="修改活动介绍" :visible.sync="revise" width="40%">
	            <el-form ref="info" v-model="info" label-width="100px" >
	                <el-form-item label="链接名称:">
	                    <el-input v-model="info.linkName" placeholder="请输入需要添加人员的姓名"></el-input>
	                </el-form-item>
	                
	                <el-form-item label="跳转链接地址:">
	                    <el-input v-model="info.content" placeholder="请输入需要添加人员的手机号"></el-input>
	                </el-form-item>
	                
	                <el-form-item label="图片" style="width:92%;">
	                	<div style="width: 80%;height: 150px;display: block;float: left;position: relative;" id="aa">
	                		<img :src="info.imgUrl" alt="" style="width: 100%;height: 150px;display: block;"/>
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
	        </el-dialog> -->
            <!-- 项目开盘 -->
            <div class='content content6'>
                <div class="text">项目开盘控制</div>
                <!-- <el-form :data='form' ref='form' label-width="160px">
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
                </el-form> -->
                <el-form ref="form.controllRespDto" :data="form.controllRespDto">
                    <el-form-item label="当前状态:">
                        <span>{{form.controllRespDto.openQuotation==1?"已开盘":"未开盘"}}</span>
                    </el-form-item>
                    <el-form-item label="开盘时间">
                        <el-date-picker v-model="form.controllRespDto.startTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>
                        <span style="margin:0 20px;">~</span>
                        <el-date-picker v-model="form.controllRespDto.endTime" btype="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 项目落位 -->
            <div class='content content6'>
                <div class="text">项目落位控制</div>
                <el-form :data='form.controllRespDto' ref='form.controllRespDto' label-width="120px">
                    <el-form-item label='请设置落位金:' prop='downMoney'>
                        <el-input v-model='form.controllRespDto.downMoney' style='width:100px'>1000</el-input>
                        <span>元</span>
                    </el-form-item>
                    <el-form-item label="可落位开始时间:" inline-message>
                        <template>
                            <div>
                                <el-date-picker label-width="120px" v-model="form.controllRespDto.downStartTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>
                                <span style="margin:0 5px;">~</span>
                                <el-date-picker label-width="120px" v-model="form.controllRespDto.downEndTime" btype="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>
                            </div>
                        </template>
                    </el-form-item>
                    <el-row>
                        <el-col :span='6'>
                            <el-form-item prop='cancalOrder'>
                                <el-checkbox v-model="form.controllRespDto.downDelOrder" :checked="form.controllRespDto.downDelOrder" @change="change1">允许落位后取消订单</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="18">
                            <el-form-item prop='parkNum'>
                               <template>
                                   <div class='luoweiCondition'>
                                        &nbsp;&nbsp;&nbsp;&nbsp;一个人可落<span v-model='form.parkNum' style="margin:0 5px;">{{form.controllRespDto.downCarspaceNum}}</span>个位&nbsp;&nbsp;&nbsp;&nbsp;
                                        一个人车位可落<span v-model='form.person' style="margin:0 5px;">{{form.controllRespDto.downLimitNum}}</span>个人
                                   </div>
                               </template>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='24'>
                            <el-form-item prop='timing' style="color:#606266">
                                <!-- <el-checkbox v-model="form.timing"> -->
                                    落位后，可认购时间开始计时，若超过
                                    <span v-model='form.controllRespDto.downExpireTime'>{{form.controllRespDto.downExpireTime}}</span>
                                    小时后未认购，则取消落位订单
                                <!-- </el-checkbox> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <!-- 项目认购 -->
            <div class="content content7">
                <div class="text">项目认购控制</div>
                <el-form>
                    <el-form-item label='请设置认购金:' prop='subscriptionFee' >
                        <el-input v-model='form.controllRespDto.buyMoney' style='width:100px'></el-input>元
                    </el-form-item>
                    <el-row>
                         <el-form-item label="可认购开始时间:">
                            <template>
                                <div>
                                    <el-date-picker v-model="form.controllRespDto.buyStartTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>
                                    <span style="margin:0 5px;">~</span>
                                    <el-date-picker  v-model="form.controllRespDto.buyEndTime" btype="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>
                                </div>
                            </template>
                        </el-form-item>
                        <el-form-item prop='openProjectStatus'>
                            <el-checkbox v-model="form.controllRespDto.openProjectStatus" :checked="form.controllRespDto.openProjectStatus">与开盘时间一致</el-checkbox>
                        </el-form-item>
                    </el-row>
                </el-form>
                
            </div>
            <!-- 展示信息 -->
            <div class="content content8">
                <div class="text">展示信息</div>
                <el-form  :data='form.noticeRespDto.services' label-width='100px' >
                    <el-form-item style="margin-left:-111px;">
                        <el-row v-for="(item,index) in form.noticeRespDto.services"  :key="index" v-if="form.noticeRespDto.services.length>=1">
                            <el-col :span='12'>
                                <el-form-item label='客服名称:' prop='name'>
                                    <!-- <el-input v-model='form.serviceName'></el-input> -->
                                    <span>{{item.name}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label='客服电话:' prop='mobile'>
                                    <!-- <el-input v-model='item.phone'></el-input> -->
                                    <span>{{item.mobile}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    
                    <el-form-item prop='notice' label='项目公告：'>
                        <el-input type="textarea" autosize placeholder="请输入项目公告，用于在小程序展示给用户" v-model="form.noticeRespDto.notice" style='width:500px'>
                        </el-input >
                        <!-- <span>{{form.noticeRespDto.notice}}</span> -->
                    </el-form-item>
                </el-form>
            </div>
            <!-- 置业顾问 -->
            <div class="content content9">
                <div class="text" >置业顾问管理</div>
    			<!--新增成员-->
				<!-- <el-button class="member" @click="addMember" style="margin-left: 20%;">新增成员</el-button> -->
				
				<!--表格列表-->
				<el-table :data="form.consultantVo" border style="width:36%;margin:0 auto;display:block">
					<el-table-column prop="num" label="序号" align="center" width="100">
						<template scope="scope">
							<span>{{scope.$index+1}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="置业顾问名称" align="center" width="266"></el-table-column>
					<el-table-column prop="id" label="" align="center" v-show:"1==2"></el-table-column>
					<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
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
            id:this.$route.query.id,
            dialogVisible:false,
            fileList:[],
            revise:false,
            form:{
                //基本信息
                projectInfoVo:{

                },
                // 小区详情
                districtVo:{

                },
                //置业顾问
                consultantVo:[

                ],
                // 展示信息
                noticeRespDto:{
                    //联系人 电话
                     services:[],
                     notice:''
                },
                // 项目介绍
                activityInfoList:[

                ],
                // 控制
                controllRespDto:{

                }
            },
            //获取当前日期时间
            currentTime:'',
            num:0,
            currentPage:1,
            pageSize:6,
            total:100,
            bannerTable:[
            ]
        }
    },
    
    created(){
        this.renderData();
    },
    mounted(){
    },
    methods:{
        // 初始数据渲染
        renderData(){
            this.$axios.get(request.testUrl+"/project/auth2/project/selectProjectInfo",{
                params:{
                    projectId:this.id
                }
            }).then(res=>{
                console.log(res.data.data);
                //项目基本信息
                this.form.projectInfoVo=res.data.data.projectInfoVo;
                // 小区政策
                this.form.districtVo=res.data.data.districtVo;
                // 置业顾问
                this.form.consultantVo=res.data.data.consultantVo;
                //展示信息
                this.form.noticeRespDto=res.data.data.noticeRespDto;
                // 项目介绍
                this.form.activityInfoList=res.data.data.activityInfoList;
                //控制
                this.form.controllRespDto=res.data.data.controllRespDto;
                //落位控制订单
                if(this.form.controllRespDto.downDelOrder==1){
                    this.form.controllRespDto.downDelOrder=true;
                }else{
                    this.form.controllRespDto.downDelOrder=false;
                }
                //认购是否与开盘时间一致
                // openProjectStatus
                if(this.form.controllRespDto.openProjectStatus==1){
                    this.form.controllRespDto.openProjectStatus=true;
                }else{
                    this.form.controllRespDto.openProjectStatus=false;
                }
                //是否开盘状态判断
                this.form.controllRespDto.openQuotation=res.data.data.projectInfoVo.openStatus;
                // 项目banner
                this.$axios.get(request.testUrl+"/project/auth2/banner/pageSelect",{
                    params:{
                        projectId:this.id,
                        page:this.currentPage,
                        pageSize:this.pageSize
                    }
                }).then(res=>{
                    console.log(res.data.data.records)
                    this.bannerTable=res.data.data.records;
                })

            })
        },
        //下载
        downLoad(qrCodeUrl){
            console.log(qrCodeUrl)
            alert(qrCodeUrl);
            window.location.href=request.testUrl+"/project/image/downloadFile?fileUrl="+qrCodeUrl;
        },
        // 落位取消订单
        change1(val){
            alert(val);
        },
        //分页控制
        currentChange(currentPage){
            alert(currentPage);
            this.currentPage=currentPage;
            // this.renderUnShow();
        },
        sizeChange(pageSize){
            // alert(123);
            alert(pageSize);
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
        find(jumpUrl){
            // alert(jumpUrl);
            // alert('查看了'+i+'条数据');
            window.location.href=jumpUrl;
        },
        jump(url){

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
    .content9{
        padding-bottom:40px;
    }
</style>