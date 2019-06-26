<template>
    <div>
       <h2>客户端管理</h2>
       <div style='border:1px solid rgba(25, 158, 216, 1);width:80%;overflow: hidden;margin:30px auto 0'>
           <!-- 第三方链接 -->
            <div class="content">
                    <!-- 头部标题 -->
                    <div class="conTil">
                        <span>第三方链接</span>
                        <el-button style='color:rgb(25,158,216)' size:='small' @click='addlj'>新增</el-button>
                    </div>
                    <!-- 链接列表 -->
                    <div class="conList" v-loading="loading">
                        <div class="list" v-for="(item,index) in linkList" :key="index">
                            <div class="pic">
                                <!-- <image :src='item.imgUrl'></image> -->
                                <img :src="item.image" alt="跳转地址"/>
                                <!-- <img src="../../../assets/img/headCar.png" alt=""> -->
                            </div>
                            <div class='desc'>
                                <p>{{item.linkName}}</p>
                                <p>排序:{{item.sort}}</p>
                            </div>
                            <div class='btn'>
                                <span v-show='1==2'>{{item.id}}</span>
                                <el-button @click="dellj(item.id)" type='primary' size='small'>删除</el-button>
                                <el-button @click="updatelj(item.id)" type='primary' size='small'>修改</el-button>
                            </div>
                        </div>
                    </div> 
                    
            </div>
            <div style='width:80%;margin-top:10px;text-align:center;margin-left: 100px;'>
                        <!-- 分页 -->
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total='total' class='page'  @current-change="currentChange" :current-page="currentPage" :page-size="pageSize"  >
                        </el-pagination>
            </div> 
       </div>
       <!-- 首页咨询 -->
       <div style='border:1px solid rgba(25, 158, 216, 1);width:80%;overflow: hidden;margin:30px auto 0'>
           <!-- 首页咨询   -->
            <div class="content">
                    <!-- 头部标题 -->
                    <div class="conTil">
                        <span>首页咨询</span>
                        <el-button style='color:rgb(25,158,216)' size:='small' @click='addzx'>新增</el-button>
                    </div>
                    <!-- 咨询列表 -->
                    <div class="conList" v-loading="loading">
                        <div class="list" v-for="(item,index) in advisoryList" :key="index">
                            <div class="pic">
                                <img :src='item.image'/>
                                <!-- <img src="../../../assets/img/headCar.png" alt=""> -->
                            </div>
                            <div class='desc'>
                                <p>{{item.linkName}}</p>
                            </div>
                            <div v-if='1==2'>
                                <span>{{item.id}}</span>
                            </div>
                            <div class='btn'>
                                <el-button @click="delzx(advisoryList[index].id)" type='primary' size='small'>删除</el-button>
                                <el-button @click="updatezx(advisoryList[index].id)" type='primary' size='small'>修改</el-button>
                            </div>
                        </div>
                    </div> 
                    
            </div>
       </div>
        <!-- 平台软文 -->
        <div style='border:1px solid rgba(25, 158, 216, 1);width:80%;overflow: hidden;margin:30px auto 0'>
           <!-- 平台软文   -->
            <div class="content">
                    <!-- 头部标题 -->
                    <div class="conTil">
                        <span>平台软文</span>
                        <el-button style='color:rgb(25,158,216)' size:='small' @click='addrw'>新增</el-button>
                    </div>
                    <!-- 平台软文列表 -->
                    <div class="softTxt" v-loading="loading">
                        <div v-for='(item,index) in softTextList' class='softList' :key="index">
                            <span>{{index+1}}.{{item.linkName}}</span>
                            <el-button type='text' style='color: #199ED8' @click='delrw(item.id)'>删除</el-button>
                            <span v-show='1==2'>{{item.id}}</span>
                            <el-button type='text' style='color: #199ED8' @click='updaterw(item.id)'>修改</el-button>
                        </div>
                    </div>
                   
                    
            </div>
            <div style='width:80%;margin-top:10px;text-align:center;margin-left: 100px;'>
                        <!-- 分页 -->
                        <!-- @size-change="sizeChange" -->
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="total1"  @current-change="currentChange1" :current-page="currentPage1" :page-size="pageSize1">
                        </el-pagination>
            </div> 
       </div>
       <!-- 确定和取消按钮 -->
       <div class="bomBtns">
           <el-button type='primary' @click='determine()' size='middle'>确定</el-button>
           <el-button @click='cancel' size='middle'>取消</el-button>
       </div>
       <!-- 平台软文新增对话框 -->
        <el-dialog title="新增" :visible.sync="rweditVisible" width="25%">
            <el-form  :model="form" ref="form" label-width="116px" :label-position="labelPosition" :rules='rules'>
                <el-form-item label="链接名称:" prop='linkName'>
                    <el-input v-model="form.linkName" ></el-input>
                </el-form-item>
                <el-form-item label="跳转链接地址:" prop='href'>
                    <el-input v-model="form.href" ></el-input>
                </el-form-item>
                <el-form-item label="活动介绍图片:" style="width:92%;">
                    <div style="width: 80%;height: 150px;display: block;float: left;position: relative;" id="aa">
                        <!-- <img :src="form.imgUrl" alt="" style="width: 100%;height: 150px;display: block;"/> -->
                        <img src="../../../assets/img/banner1.png" alt="">
                        <img src="../../../assets/img/2.png" alt="" style="width:10%;height:25%;position: absolute; right:-15px;top:-5px;" @click="show"/>
                    </div>
                    
                    <div style="position: relative;float:left;display: none;" class="22222" id="cc">
                        <el-upload action="auto" list-type="picture-card" :file-list="fileList" with-credentials :before-upload="beforeUpload" :http-request="uploadSectionFile" :on-remove="afterRemove" :on-exceed="handleExceed" :limit='1'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="form.image" alt="">
                        </el-dialog>
                    </div>
    
                </el-form-item>
                <el-form-item >
                    <el-input v-model="form.id" v-show="1==2"></el-input>
                </el-form-item>
                <el-form-item>
                    <template>
                        <div>
                             <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="savePic(form)">确定</el-button>
                                <el-button @click="rweditVisible = false">取 消</el-button> 
                            </span>
                        </div>
                    </template>
                </el-form-item>
            </el-form>
           
        </el-dialog> 
        <!-- 软文修改对话框 -->
        <el-dialog title="修改" :visible.sync="rwUpdateVisible" width="25%">
            <el-form ref="form" :model="form" label-width="116px" :label-position="labelPosition" :rules='rules'>
                <el-form-item label="链接名称:" prop='linkName'>
                    <el-input v-model="form.linkName"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接地址:" prop='href'>
                    <el-input v-model="form.href"></el-input>
                </el-form-item>
                <el-form-item label="活动介绍图片:" style="width:92%;">
                    <div style="width: 80%;height: 150px;display: block;float: left;position: relative;" id="aa">
                        <!-- <img :src="form.imgUrl" alt="" style="width: 100%;height: 150px;display: block;"/> -->
                        <img :src="form.image" alt="" style="width: 100%;height: 150px;display: block;">
                        <img src="../../../assets/img/2.png" alt="" style="width:10%;height:25%;position: absolute; right:0px;top:5px;" @click="show"/>
                    </div>
                    
                    <div style="position: relative;float:left;display: none;" class="22222" id="cc">
                        <el-upload action="auto" list-type="picture-card" :file-list="fileList" with-credentials :before-upload="beforeUpload" :http-request="uploadSectionFile" :on-remove="afterRemove" :on-exceed="handleExceed" :limit='1'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="form.image" alt="">
                        </el-dialog>
                    </div>
    
                </el-form-item>
                <el-form-item >
                    <el-input v-model="form.id" v-show="1==2"></el-input>
                </el-form-item>
                <el-form-item>
                    <template>
                        <div>
                             <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="savePicUpdate(form)">确定</el-button>
                                <el-button @click="rwUpdateVisible = false">取 消</el-button> 
                            </span>
                        </div>
                    </template>
                </el-form-item>
            </el-form>
        </el-dialog> 
        <!-- 链接新增对话框 -->
        <el-dialog title="新增" :visible.sync="linkeditVisible" width="25%">
            <el-form ref="form1" :model="form1" label-width="116px" :label-position="labelPosition" :rules='rules'>
                <el-form-item label="链接名称:" prop='linkName'>
                    <el-input v-model="form1.linkName" ></el-input>
                </el-form-item>
                <el-form-item label="跳转链接地址:" prop='href'>
                    <el-input v-model="form1.href" ></el-input>
                </el-form-item>
                <el-form-item label="排     序:" prop='sort'>
                    <el-input v-model="form1.sort"></el-input>
                </el-form-item>
                <el-form-item label="活动介绍图片:" style="width:92%;">
                    <div style="width: 80%;height: 150px;display: block;float: left;position: relative;" id="aa">
                        <!-- <img :src="form1.imgUrl" alt="" style="width: 100%;height: 150px;display: block;"/> -->
                        <img src="../../../assets/img/banner1.png" alt="">
                        <img src="../../../assets/img/2.png" alt="" style="width:10%;height:25%;position: absolute; right:0px;top:5px;" @click="show"/>
                    </div>
                    
                    <div style="position: relative;float:left;display: none;" class="22222" id="cc">
                        <el-upload action="auto" list-type="picture-card" :file-list="fileList1" with-credentials :before-upload="beforeUpload1" :http-request="uploadSectionFile" :on-remove="afterRemove" :on-exceed="handleExceed" :limit='1'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="form1.image" alt="">
                        </el-dialog>
                    </div>
    
                </el-form-item>
                
                <el-form-item >
                    <el-input v-model="form1.id" v-show="1==2"></el-input>
                </el-form-item>
                <el-form-item>
                    <template>
                        <div>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="savePic1(form1)">确定</el-button>
                                <el-button @click="linkeditVisible = false">取 消</el-button> 
                            </span>
                        </div>
                    </template>
                </el-form-item>
            </el-form>
            
        </el-dialog> 
        <!-- 链接修改对话框 -->
        <el-dialog title="新增" :visible.sync="linkupdateVisible" width="25%">
            <el-form ref="form1" :model="form1" label-width="116px" :label-position="labelPosition" :rules='rules'>
                <el-form-item label="链接名称:" prop='linkName'>
                    <el-input v-model="form1.linkName" ></el-input>
                </el-form-item>
                <el-form-item label="跳转链接地址:" prop='href'>
                    <el-input v-model="form1.href" ></el-input>
                </el-form-item>
                <el-form-item label="排     序:" prop='sort'>
                    <el-input v-model="form1.sort"></el-input>
                </el-form-item>
                <el-form-item label="活动介绍图片:" style="width:92%;">
                    <div style="width: 80%;height: 150px;display: block;float: left;position: relative;" id="aa">
                        <img :src="form1.image" alt="" style="width: 100%;height: 150px;display: block;"/>
                        <!-- <img src="../../../assets/img/banner1.png" alt=""> -->
                        <img src="../../../assets/img/2.png" alt="" style="width:10%;height:25%;position: absolute; right:0px;top:5px;" @click="show"/>
                    </div>
                    
                    <div style="position: relative;float:left;display: none;" class="22222" id="cc">
                        <el-upload action="auto" list-type="picture-card" :file-list="fileList1" with-credentials :before-upload="beforeUpload1" :http-request="uploadSectionFile" :on-remove="afterRemove" :on-exceed="handleExceed" :limit='1'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="form1.image" alt="">
                        </el-dialog>
                    </div>
    
                </el-form-item>
                
                <el-form-item >
                    <el-input v-model="form1.id" v-show="1==2"></el-input>
                </el-form-item>
                <el-form-item>
                    <template>
                        <div>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="savePic1Update(form1)">确定</el-button>
                                <el-button @click="linkupdateVisible = false">取 消</el-button> 
                            </span>
                        </div>
                    </template>
                </el-form-item>
            </el-form>
            
        </el-dialog>
        <!-- 咨询新增对话框 -->
        <el-dialog title="新增" :visible.sync="zxeditVisible" width="25%">
            <el-form ref="form3" :model="form3" label-width="116px" :label-position="labelPosition" :rules='rules'>
                <el-form-item label="链接名称:" prop='linkName'>
                    <el-input v-model="form3.linkName" ></el-input>
                </el-form-item>

                <el-form-item label="跳转链接地址:" prop='href'>
                    <el-input v-model="form3.href" ></el-input>
                </el-form-item>
                <el-form-item label="活动介绍图片:" style="width:92%;">
                    <div style="width: 80%;height: 150px;display: block;float: left;position: relative;" id="aa">
                        <!-- <img :src="form3.imgUrl" alt="" style="width: 100%;height: 150px;display: block;"/> -->
                        <img src="../../../assets/img/banner2.png" alt="">
                        <img src="../../../assets/img/2.png" alt="" style="width:10%;height:25%;position: absolute; right:-20px;top:-5px;" @click="show"/>
                    </div>
                    
                    <div style="position: relative;float:left;display: none;" class="22222" id="cc">
                        <el-upload action="auto" list-type="picture-card" :file-list="fileList3" with-credentials :before-upload="beforeUpload3" :http-request="uploadSectionFile" :on-remove="afterRemove" :on-exceed="handleExceed" :limit='1'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="form3.image" alt="">
                        </el-dialog>
                    </div>
    
                </el-form-item>
                
                <el-form-item >
                    <el-input v-model="form3.id" v-show="1==2"></el-input>
                </el-form-item>
                <el-form-item>
                    <template>
                        <div>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="savePic3(form3)">确定</el-button>
                                <el-button @click="zxeditVisible = false">取 消</el-button> 
                            </span>
                        </div>
                    </template>
                </el-form-item>
            </el-form>
            
        </el-dialog> 
         <!-- 咨询修改对话框 -->
        <el-dialog title="修改" :visible.sync="zxupdateVisible" width="25%">
            <el-form ref="form3" :model="form3" label-width="116px" :label-position="labelPosition" :rules='rules'>
                <el-form-item label="链接名称:" prop='linkName'>
                    <el-input v-model="form3.linkName" ></el-input>
                </el-form-item>
                <el-form-item label="跳转链接地址:" prop='href'>
                    <el-input v-model="form3.href" ></el-input>
                </el-form-item>
                <!-- <el-form-item label="排     序:">
                    <el-input v-model="form3.sort"></el-input>
                </el-form-item> -->
                <el-form-item label="活动介绍图片:" style="width:92%;">
                    <div style="width: 80%;height: 150px;display: block;float: left;position: relative;" id="aa">
                        <!-- <img :src="form3.imgUrl" alt="" style="width: 100%;height: 150px;display: block;"/> -->
                        <img :src="form3.image" alt="" style="width: 100%;height: 150px;display: block;">
                        <img src="../../../assets/img/2.png" alt="" style="width:10%;height:25%;position: absolute; right:0px;top:5px;" @click="show"/>
                    </div>
                    
                    <div style="position: relative;float:left;display: none;" class="22222" id="cc">
                        <el-upload action="auto" list-type="picture-card" :file-list="fileList3" with-credentials :before-upload="beforeUpload3" :http-request="uploadSectionFile" :on-remove="afterRemove" :on-exceed="handleExceed" :limit='1'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="form3.image" alt="">
                        </el-dialog>
                    </div>
    
                </el-form-item>
                
                <el-form-item >
                    <el-input v-model="form3.id" v-show="1==2"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savePic3Update(form3)">确定</el-button>
                <el-button @click="zxupdateVisible = false">取 消</el-button> 
            </span>
        </el-dialog> 
    </div>


</template>
<script>
export default {
    inject:['reload'],
    data(){
        return{
            loading:false,
            // 软文form
            rwUpdateVisible:false,
            rweditVisible:false,
            dialogVisible:false,
            currentPage1:1,
            pageSize1:8,
            total1:100,
            form:{
                
            },
            
            fileList:[],
            // 链接form1
            // page1:1,
            // pageSize1:6,
            currentPage:1,
            pageSize:6,
            linkeditVisible:false,
            linkupdateVisible:false,
            form1:{},
            total:50,
            fileList1:[],
            //咨询
            form3:{
                linkName:'',
                href:'',
                image:''
            },
            fileList3:[],
            zxeditVisible:false,
            zxupdateVisible:false,
            labelPosition: 'left',
            // currentPage:1,
            linkList:[],
            // 咨询列表
            advisoryList:[
            ],
            // 软文列表
            softTextList:[],
            rules:{
                href:{ required: true, message: '请输入跳转链接', trigger: 'blur' },
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                linkName:[
                    { required: true, message: '请输入图片描述', trigger: 'blur' },
                    { min: 1, max: 4, message: '长度在 1 到 4个字符', trigger: 'blur' }
                ],
                // date1: [
                // 	{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                // ],
                sort:[
                    {required:true,message:'请输入排序数字',trigger:'blur'},
                    // { type: 'number', message: '排序必须为数字值',trigger:'blur'}
                ]
			}
        }
        
    },
    created(){
        //咨询列表
        this.showzxList();
        //软文列表
        this.showrwList();
        //链接列表渲染
        this.showLinkList();
    },
    methods:{
        // 咨询列表渲染
        showzxList(){
            this.$axios.get(request.testUrl+'/platform/auth2/information/findList')
            .then(res=>{
                // console.log(res.data.data);
                this.loading=true;
                setTimeout(()=>{
                    this.loading=false;
                    this.advisoryList=res.data.data;
                },1000);
            })
        },
        //渲染软文列表
        showrwList(){
            this.$axios.get(request.testUrl+'/platform/auth2/softArticle/pageFind',{
                params:{
                    page:this.currentPage1,
                    pageSize:this.pageSize1
                }
            })
            .then(res=>{
                this.loading=true;
                setTimeout(()=>{
                    this.loading=false;
                    this.softTextList=res.data.data.records;
                    this.total1=res.data.data.total;
                },1000);
                // console.log(res.data.data.records);
               
            })
        },
        // 链接列表渲染
        showLinkList(){
             this.$axios.get(request.testUrl+'/platform/auth2/thirdLinks/pageFind',{
                params:{
                    page:this.currentPage,
                    pageSize:this.pageSize
                }
            })
            .then(res=>{
                this.loading=true;
                setTimeout(()=>{
                    this.loading=false;
                    this.linkList=res.data.data.records;
                    this.total=res.data.data.total;
                },1000);
                // console.log(res.data.data.total);
                
                // alert(this.total);
            })
        },
        // 链接系列form1
            //链接图片上传
            addlj(){
                // alert('新增');
                this.linkeditVisible=true;
            },
            //链接图片上传
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
                        this.form1.image=res.data.data;
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
            //链接新增保存
            savePic1(form1) {
                this.$refs.form1.validate((valid) => {
                        if (valid) {
                            // alert('新增成功!');
                            // this.form1={};
                            this.linkeditVisible=false;
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                });
                var params = new URLSearchParams();
                params.append('image', this.form1.image);
                params.append('href', this.form1.href);
                params.append('linkName', this.form1.linkName);
                params.append('sort', this.form1.sort);
                this.$axios.post(request.testUrl+"/platform/auth2/thirdLinks/doInsertOrUpdate",params)
                	.then(res=>{
                		if(res.data.code==0){
                  			//console.log(res)
                			this.linkeditVisible=false;
                			// this.reload();
                		}else{
                			this.$message({
                				type: 'success',
                				message: '新增成功'
                			});
                		}
                })
                this.reload();
            },
            
            dellj(id){
                // alert('删除'+i);
                // this.linkList.splice(i,1);
                // console.log(this.linkList);
                var params=new URLSearchParams();
                params.append('id',id);
                this.$axios.post(request.testUrl+'/platform/auth2/thirdLinks/doDelete',params)
                .then(res=>{
                    // console.log(res.data.code);
                    // console.log(this.linkList);
                    this.showLinkList();
                    if(res.data.code==0){
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })
                    }
                })
            },
            //修改链接
            updatelj(id){
                // alert('修改'+i);
                this.linkupdateVisible=true;
                //渲染修改链接之前的单个数据
                this.$axios.get(request.testUrl+'/platform/auth2/thirdLinks/findOneById',
                    {
                        params: {
                        id: id
                    }
                })
                .then(res=>{
                    // console.log(res.data.data)
                    this.form1=res.data.data;
                })
            },
            //链接修改保存
            savePic1Update(form1,id){
                this.$refs.form1.validate((valid) => {
                        if (valid) {
                            this.linkupdateVisible=false;
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                });
                var params = new URLSearchParams();
                params.append('image', this.form1.image);
                params.append('id', this.form1.id);
                params.append('href', this.form1.href);
                params.append('linkName', this.form1.linkName);
                params.append('sort', this.form1.sort);
                this.$axios.post(request.testUrl+"/platform/auth2/thirdLinks/doInsertOrUpdate",params)
                	.then(res=>{
                		if(res.data.code==0){
                  			//console.log(res)
                			this.linkupdateVisible=false;
                            this.reload();
                            this.showLinkList();
                		}else{
                			this.$message({
                				type: 'success',
                				message: '修改成功'
                			});
                		}
                })
                this.reload();

            },
        // 咨询系列form3
            // 资询图片上传
            beforeUpload3(file) {
                var param = new FormData(); // FormData 对象
                param.append("file", file); // 文件对象
                // console.log(file);
                // console.log(request.testUrl);
                this.$axios({
                method: "post",
                url: request.testUrl+"/project/auth2/image/upload",
                data: param
                })
                .then(res => {
                    // console.log(res.data);
                    if(res.data.code==0){
                        this.form3.image=res.data.data;
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
            addzx(){
                // alert('新增');
                this.zxeditVisible=true;
            },
            delzx(id){
                // alert('删除'+id);
                // this.advisoryList.splice(i,1);
                var params=new URLSearchParams();
                params.append('id',id);
                this.$axios.post(request.testUrl+'/platform/auth2/information/doDelete',params)
                .then(res=>{
                    console.log(res.data.code);
                    this.showzxList();
                    if(res.data.code==0){
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })
                    }
                })
                // console.log(this.advisoryList);
            },
            //修改咨询
            updatezx(id){
                this.zxupdateVisible=true;
                // 渲染修改之前单个的原有数据
                this.$axios.get(request.testUrl+'/platform/auth2/information/findOneById',
                    {
                        params: {
                        id: id
                    }
                })
                .then(res=>{
                    // console.log(res.data.data)
                    this.form3=res.data.data;
                })
            },
            // 咨询新增保存编辑
            savePic3(form3) {
                this.$refs.form3.validate((valid) => {
                        if (valid) {
                            // alert('新增成功!');
                            // this.form3={};
                            this.zxeditVisible=false;
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                });
                var params = new URLSearchParams();
                params.append('image', this.form3.image);
                params.append('href', this.form3.href);
                params.append('linkName', this.form3.linkName);
                this.$axios.post(request.testUrl+"/platform/auth2/information/doInsertOrUpdate",params)
                    .then(res=>{
                        console.log(res.data);
                        if(res.data.code==0){
                            this.zxeditVisible=false;
                            this.showzxList();
                            if(res.data.code==0){
                            this.$message({
                                type:'success',
                                message:'新增成功'
                            })
                    }
                        }else{
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                        }
                })
            },
            // 3656285477608095744
            //咨询修改保存
            savePic3Update(form3){
                this.$refs.form3.validate((valid) => {
                        if (valid) {
                            var params = new URLSearchParams();
                            params.append('image', this.form3.image);
                            params.append('href', this.form3.href);
                            params.append('linkName', this.form3.linkName);
                            params.append('id', this.form3.id);
                            this.$axios.post(request.testUrl+'/platform/auth2/information/doInsertOrUpdate',
                                params
                            )
                            .then(res=>{
                                if(res.data.code==0){
                                    this.zxupdateVisible=false;
                                    this.reload();
                                    this.showzxList();
                                    this.$message({
                                        type:'success',
                                        message:'修改成功'
                                    });  	
                                }     
                            })
                        
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                });
               this.reload();
            },
        // 软文系列form
             //图片上传
            beforeUpload(file) {
                var param = new FormData(); // FormData 对象
                param.append("file", file); // 文件对象
                console.log(file);
                console.log(request.testUrl);
                this.$axios({
                method: "post",
                url: request.testUrl+"/project/auth2/image/upload",
                data: param
                })
                .then(res => {
                    console.log(res.data);
                    if(res.data.code==0){
                        this.form.image=res.data.data;
                        // console.log(this.form);
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
            addrw(){
                // alert('新增');
                this.rweditVisible=true;
            },
             // 软文新增保存
            savePic(form) {
                this.$refs.form.validate((valid) => {
                        if (valid) {
                            // alert('新增成功!');
                            this.rweditVisible=false;
                            // this.form={};
                            this.reload();
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                });
                var params = new URLSearchParams();
                params.append('image', this.form.image);
                params.append('href', this.form.href);
                params.append('linkName', this.form.linkName);
                this.$axios.post(request.testUrl+'/platform/auth2/softArticle/doInsertOrUpdate',params)
                .then(res=>{
                    // console.log(res.data);
                    this.dialogVisible=false;
                    if(res.data.code==0){
                        this.$message({
                            type:'success',
                            message:'新增成功'
                        })
                    }
                });
                this.reload();
            },
            delrw(id){
                // alert('删除'+i);
                // console.log(this.softTextList.splice(i,1));
                // console.log(this.softTextList);
                var params=new URLSearchParams();
                params.append('id',id);
                this.$axios.post(request.testUrl+'/platform/auth2/softArticle/doDelete',params)
                .then(res=>{
                    // console.log(res.data.code);
                    this.showrwList();
                    if(res.data.code==0){
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })
                    }
                })
            },
            updaterw(id){
                // alert('修改'+i);
                this.rwUpdateVisible=true;
                // 渲染修改之前单个的原有数据
                this.$axios.get(request.testUrl+'/platform/auth2/softArticle/findOneById',
                    {
                        params: {
                        id: id
                    }
                })
                .then(res=>{
                    console.log(res.data.data)
                    this.form=res.data.data;
                })
            },
            //软文修改保存
            savePicUpdate(form){
                // alert('修改保存');
                // console.log(this.$refs.form);
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // alert(valid);
                        var params = new URLSearchParams();
                        params.append('image', this.form.image);
                        params.append('href', this.form.href);
                        params.append('linkName', this.form.linkName);
                        params.append('id', this.form.id);
                        this.$axios.post(request.testUrl+'/platform/auth2/softArticle/doInsertOrUpdate',params)
                            .then(res=>{
                                // console.log(res.data)
                                if(res.data.code==0){
                                    this.rwUpdateVisible=false;
                                    this.showrwList();
                                    console.log(this.form);
                                    this.$message({
                                        type:'success',
                                        message:'修改成功'
                                    });  	
                                }     
                        })
                        this.reload();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.reload();
            },
            //全部保存
            determine(){
                // alert('确定');
            },
            cancel(){
                alert('取消');
            },
        //点击x 上传图片
        show(){
        		document.getElementById("aa").style.display="none";
        		document.getElementById("cc").style.display="block";
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
        //链接系列form1   
            //已有的图片删除
            // afterRemove1(file, fileList){
            //     this.$message({
            //         type: 'info',
            //         message: '已删除原有图片',
            //         duration: 6000
            //     });
            // }, 
        // sizeChange(pageSize1){
        //     alert(pageSize1);
        // },
        //链接当前页码
        currentChange(currentPage){
            // alert(currentPage);
            // if(currentPage>this.total){
            //     this.$message({
            //         type:'error',
            //         message:'当前页码已超过数据量'
            //     });
            //     return;
            // }
            this.currentPage=currentPage;
            this.showLinkList();
        },
        // 软文当前页码
        currentChange1(currentPage1){
            this.currentPage1=currentPage1;
            this.showrwList();
        }
    } 

}
</script>
<style scoped>
    .el-button--primary {
        color: #fff!important;
        background-color: #409EFF!important;
        border-color: #409EFF!important;
    }
    .content{
        box-sizing: border-box;
        width:100%;
        /* height:600px; */
        height:auto;
        margin:20px auto;
        /* padding:0 0 10px; */
        /* border:1px solid rgba(25, 158, 216, 1); */
        /* margin:20px 0 20px 10px; */
        
    }
    .content .conTil{
        box-sizing: border-box;
        width:100%;
        height:50px;
        padding-left:20px;
        font-size:14px;
        color:#fff;
        padding-right:20px;
        background-color: #199ef8;
        line-height: 50px;
    }
    .content .conTil::after{
        display: block;
        content:'';
        clear: both;
    }
    .conTil span{
        float:left;
    }
    .conTil button{
        float:right;
        margin-right:10px;
    }
    .content .conTil button{
        /* margin-right:10px; */
        height:40px;
        line-height: 20px;
        margin:5px 0;
    }
    .conList{
        /* display: flex; */
        width: 100%;
        padding:0 20px;
    }
    .conList .list{
        float:left;
    }
    .list{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width:330px;
        height:80px;
        border:1px solid #000;
        padding:5px;
        margin: 21px 8px 10px 14px;
    }
    .list .pic{
        width:66px;
        height:66px;
        overflow: hidden;
        border-radius:5px;
        border:1px solid #f00;

    }
    .list .pic img{
        width:66px;
        height:66px;
    }
    .list .desc{
        font-size:14px;
    }
    .list .desc p:nth-child(1){
        font-size: 15px;
        margin-bottom:5px;
    }
   
    .list .btn{
        display: flex;
        flex-direction: column;
    }
    .list .btn button{
        margin:5px;
    }
    .page{
        text-align:center;
        margin-left:20px;
    }
    /* .rwDesc{
        display: inline-block;
    }
    .rwDesc p{
        font-size:14px;
    } */
    /* 平台软文样式 */
    .softTxt .softList{
        font-size: 14px;
        display: inline-block;
    }
    .softList{
        width:260px;
        height:40px;
        margin:60px 8px  10px;
        line-height: 40px;
        text-align:center;
        /* background-color: #ff0; */
    }
    .softList span{
        margin-left:20px;
    }
    .softList button{
        margin:0 10px;
    }
    /* 底部按钮 */
    .bomBtns{
        width:80%;
        /* margin-top:30px; */
        display: flex;
        margin:30px auto 0;
        justify-content: center;
    }
</style>