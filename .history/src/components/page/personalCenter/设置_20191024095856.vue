<template>
    <div  stytle="margin-top:80px;width:60%;overflow:hidden;">
        <h2>设置>  {{tagTitle}}</h2>
        <div class="setting">
            <el-tabs v-model="activeName" @tab-click="handleClick" class='tabs' stretch v-if='show'> 
                <!-- 个人资料 -->
                <el-tab-pane label="个人资料" name="first">
                    <div class='content'>
                        <div class="title">
                            <span class="iconfont icon-shuxian"></span>
                            <span>个人资料</span>
                        </div>
                        <!-- 用户个人信息 -->
                        <div class="personInfo" v-loading="loading">
                            <div class="perPic">
                                <img src='../../../assets/img/girl.jpg' style='width:80px;height:80px;margin-left:130px;'/>
                            </div>
                            <div>
                                <el-form :model='personData' style='width:600px;margin:0 auto;' ref='personData' :rules='rules2'>
                                    <el-form-item label='账号:' prop='username'> 
                                        <el-input v-model='personData.username' style='width:300px'></el-input>
                                    </el-form-item>
                                    <el-form-item label='职务:' prop='position'> 
                                        <el-input v-model='personData.position' style='width:300px'></el-input>
                                    </el-form-item>
                                    <el-form-item label='姓名:' prop='realname'> 
                                        <el-input v-model='personData.realname' style='width:300px'></el-input>
                                    </el-form-item>
                                    <el-form-item label='性别:' prop='gender' label-width="300px" style='margin-left:-258px;'> 
                                        <el-radio-group v-model='personData.sex'>
                                            <el-radio  :label=1>男</el-radio>
                                            <el-radio  :label=0>女</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-row>
                                        <el-col :span='18'>
                                            <el-form-item label='验证手机:' prop='mobile'> 
                                                <el-input v-model='personData.mobile' style='width:300px'></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span='6'>
                                            <!-- 未验证时 -->
                                            <el-form-item  prop='verification' v-if='personData.verification'> 
                                                <el-checkbox v-model='checked'></el-checkbox>
                                                <el-button type="text" @click='handleTel' v-if='personData.verification'>立即验证</el-button>
                                            </el-form-item>
                                            <!-- 验证完成 -->
                                            <el-form-item  prop='verification' v-else> 
                                                <span style='color:#f00;'>验证完成</span>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <!-- <el-form-item label='身份证号:' prop='identityNumber'> 
                                        <el-input v-model='personData.identityNumber' style='width:300px'></el-input>
                                    </el-form-item> -->
                                </el-form>
                            </div>
                        </div>
                        <!-- 个人资料中的手机号验证 -->
                        <el-dialog title="验证手机" :visible.sync="dialogVisible" width="30%">
                            <el-form  width='20%'  :model='form' :rules='rules1'>
                                <el-form-item label='手机号码:' prop='telPhone'>
                                    <template>
                                        <el-input v-model='form.telPhone' style='width:200px;' placeholder="请输入手机号码"></el-input>
                                    </template>
                                </el-form-item>
                                <el-form-item label='验证码:' prop='yzCode' class='yzCode'>
                                    <template>
                                        <el-input v-model='form.yzCode' style='width:200px;' placeholder="请输入验证码"></el-input>
                                        <el-button type='primary' size='small' style='margin-left:10px' @click='getTelCode' v-if="sendAuthCode">获取验证码</el-button>
                                        <span v-else class="auth_text" style='margin-left:10px;'> <span style='color:#409EFF;font-size:16px;margin-right:5px;'>{{auth_time}}</span>秒之后重新发送验证码</span> 
                                    </template>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer footBtn">
                                <el-button type="primary" @click="nextStep" style='margin:0 auto'>下一步</el-button>
                            </span>
                        </el-dialog>
                        <!-- 手机完成提示 -->
                        <el-dialog title='验证手机' width="30%" :visible.sync="dialogVisible1">
                            <el-form :data='form' width='20%'>
                                <el-form-item label='手机号码:' prop='telPhone'>
                                    <template>
                                        <el-input v-model='form.telPhone' style='width:200px;'></el-input>
                                    </template>
                                </el-form-item>
                                <span class='sucInfo'>恭喜您手机号验证成功</span>
                            </el-form>
                            <span slot="footer" class="dialog-footer footBtn">
                                <el-button type="primary" @click="success" style='margin:0 auto'>完成</el-button>
                            </span>
                        </el-dialog>
                    </div>
                </el-tab-pane>
                <!-- 员工管理 -->
                <el-tab-pane label="员工管理" name="second" >
                    <div class='content'>
                        <div class="title">
                            <div class='tilTop'>
                                <span class="iconfont icon-shuxian"></span>
                                <span>员工管理</span>
                            </div>
                            <div class='tilCon'>
                                <div style='float:right;'>
                                    <span style='font-size:14px;color:#409EFF'>车位宝账号:</span>
                                    <span style='color:#409EFF;font-size:16px;margin-right: 60px;'>{{name}}</span>
                                    <el-input placeholder="请输入员工账号或姓名" style='width:300px;margin-right:5px;margin-left:20px;' v-model='form1.keyword' ></el-input>
                                    <el-button type='primary' size='small' @click="searchEmp">搜索</el-button>
                                </div>
                            </div>
                        </div>
                        <!-- 员工信息表 -->
                        <div class="empTable" v-loading="loading">
                            <div class='addEmp'>
                                <el-button type='primary'  @click='addEmp' size='small'>新增员工+</el-button>
                            </div>
                            <el-table :data='empData'>
                                <el-table-column label='员工账号' prop='username'>
                                    <template slot-scope="scope">
                                        <div>
                                            <span class="iconfont icon-shou" style='color:#409EFF;font-size:18px;margin-right:5px;'></span>
                                            <span>{{empData[scope.$index].username}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label='姓名' prop='realname'></el-table-column>
                                <el-table-column label='职务' prop='position'></el-table-column>
                                <el-table-column label='手机号码' prop='mobile'></el-table-column>
                                <el-table-column label='权限' prop='telPhone'>
                                    <template slot-scope="scope">
                                        <el-button type='text' style='color:#169BD5;'  @click="goDetails(empData[scope.$index].id)">详情</el-button>
                                        <!-- <span style='color:#169BD5;' @click='goDetails(scope.$index)'>详情</span> -->
                                    </template>
                                </el-table-column>
                                <el-table-column label='操作'>
                                    <template slot-scope="scope">
                                        <el-button type='primary' v-if='scope.$index!==0' @click="deleteEmp(empData[scope.$index].id)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </div>
                        <!-- 新增的对话框 添加员工-->
                        <el-dialog title='添加员工' :visible.sync="dialogAdd" width="466px" center>
                            <el-form  ref='merchantForm' :model="merchantForm"   label-width="120px" :rules='rules'>
                                <el-form-item label="员工账号:" prop='empAccount'>
                                    <el-input placeholder="请输入内容" v-model="merchantForm.empAccount" ></el-input>
                                </el-form-item>
                                <el-form-item label="姓名:" prop='name'>
                                    <el-input placeholder="请输入内容" v-model="merchantForm.name" ></el-input>
                                </el-form-item>
                                <div class='txt'>添加完员工后方可编辑员工权限，详细权限请到权限管理设置</div>
                                <el-form-item label="密码" prop="pass">
                                    <el-input type="password" v-model="merchantForm.pass" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="checkPass">
                                    <el-input type="password" v-model="merchantForm.checkPass" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码:" prop='telPhone'>
                                    <el-input  v-model="merchantForm.telPhone" ></el-input>
                                </el-form-item>
                                <el-form-item label="职务:" prop='position'>
                                    <el-input  v-model="merchantForm.position" ></el-input> 
                                </el-form-item>
                                <el-form-item>
                                    <template slot-scope="scope">
                                        <div>
                                            <el-button type="primary" @click="submitForm('merchantForm')">保存</el-button>
                                            <el-button type="primary" @click="cancel()">取 消</el-button>
                                        </div>
                                    </template>
                                </el-form-item>
                            </el-form>
                        </el-dialog>    
                    </div>
                </el-tab-pane>
                <el-tab-pane label="消息通知" name="third">
                    <div class='content'>
                        <div class="title">
                            <span class="iconfont icon-shuxian"></span>
                            <span>消息通知</span>
                        </div>
                        <el-form :model='form2' ref='form2' style='width:680px;margin-left:75px;' class="infoForm">
                            <el-form-item v-for="(domain, index) in form2.telPhoneList"  :key="index" :prop="'telPhoneList.'+index+'.telPhone'" :label="'接收手机号'+(index+1)" :rules='rules.telPhone' style="width: 60%;margin-left:30%;margin-bottom: 0;" >
                                <template>
                                    <div>
                                        <el-input v-model="domain.telPhone"  style="width: 180px;"></el-input>
                                        <el-input v-model="domain.id" v-show="1==2" ></el-input>
                                        <i class="iconfont icon-add_x use" @click="addpromptList" v-if="num==index"></i>
                                        <i class="iconfont icon-jian use" @click="deletepromptList(domain)" v-if="form2.telPhoneList.length>1"></i>
                                    </div>
                                </template>
                            </el-form-item>
                            <div style='width:500px;margin:24px auto;font-size:14px;line-height:20px;color:#606266;text-align:center;'>一个人最多可以设置3个不同手机号接受信息</div>
                            <div style='width:50%;margin:0 auto;'>
                                <el-form-item prop='checkedList'  style='margin-top:30px;'>
                                    <div style="margin: 10px 33px;width:130px;color:#606266;">设置提醒内容:</div>
                                    <el-checkbox-group v-model="form2.checkedList" @change="handleCheckedListChange" style='margin-left:180px;'>
                                        <el-checkbox v-for="(item,index) in contentList" :label="item" :key="index" style='display:block;' >{{item}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </div> 
                            <el-button type='primary' size='middle' align='center' class='save' @click='save'>保存</el-button>  
                        </el-form>
                    </div>
                </el-tab-pane>
                <!-- 账号安全 -->
                <el-tab-pane label="账号安全" name="fourth">
                    <div >
                        <!-- 账号安全页面 -->
                       <div class='content' v-if='show2'>
                            <div class="title">
                                <span class="iconfont icon-shuxian"></span>
                                <span>账号安全</span>
                                <span style='margin-left:40px;font-size:14px;color:#409EFF'>车位宝账号:</span>
                                <span style='margin-left:5px;color:#409EFF;font-size:16px'>{{name}}</span>
                            </div>
                            <div class='accountSafe'>
                                <!-- 登录密码 -->
                                <div class='box box1'>
                                    <!-- 四分之一圆 -->
                                    <div class="circle">
                                        <!-- 正确符号 -->
                                        <span class="iconfont icon-zhengque"></span>
                                    </div>
                                    <div class='con'>
                                        <span class="iconfont icon-font50"></span>
                                        <p>登录密码</p>
                                        <p>定期更换有助于账号安全</p>
                                        <el-button type='text'  class='pwdBtn' @click="updatePwd">修改密码</el-button>
                                    </div>
                                </div>
                                <!-- 修改手机 -->
                                <div class='box box2'>
                                    <!-- 四分之一圆 -->
                                    <div class="circle">
                                        <!-- 正确符号 -->
                                        <span class="iconfont icon-zhengque"></span>
                                    </div>
                                    <div class='con' style='padding-top:6px;'>
                                        <span class="iconfont icon-bangdingshouji" style='font-size:72px;'></span>
                                        <p>绑定手机</p>
                                        <p>176****5241</p>
                                        <div class='phoneBtn'>
                                            <el-button  type='text' @click="updateTel">修改</el-button>
                                            <el-button  type='text' @click="untied">解绑</el-button>
                                        </div>
                                    </div>
                                    <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisibleAccount"
                                    width="30%">
                                        <div style='font-size:14px;'>
                                            <span>确定解绑已验证的账号吗?</span>
                                            <div style='margin-top:10px;'>
                                                <el-checkbox v-model="bindAccount">禁止此页再显示对话框。</el-checkbox>
                                            </div>
                                        </div>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button type="primary" @click="dialogVisibleAccount = false">确 定</el-button>
                                            <el-button @click="dialogVisibleAccount = false">取 消</el-button>
                                        </span>
                                    </el-dialog>
                                </div>
                            </div>
                       </div>
                       <!-- 修改手机页面 -->
                        <div class="content" v-if='showTel'>
                            <div class="title">
                                <span class="iconfont icon-shuxian"></span>
                                <span>便捷登录</span>
                            </div>
                            <div class='updateTel'>
                                <div class="telHead">
                                    <div class='circleTel'>
                                        <div class="pic">
                                            <span class="iconfont icon-bangdingshouji1"></span>
                                        </div>
                                    </div>
                                    
                                    <p>修改手机号码</p>
                                </div>
                                <div class="conTel">
                                    <el-form :model='form3' ref='form3' style='width:600px;' label-width="180px" v-if='updateTelInfo' :rules='rules1'>
                                        <el-form-item label='当前手机号码:' prop='currentTel'>
                                                <span>15213779663</span>
                                        </el-form-item>
                                        <el-form-item prop='telPhone' label='新手机号码:'>
                                            <el-input v-model='form3.telPhone' placeholder="输入新手机号码" style='width:200px'></el-input>
                                        </el-form-item>
                                        <el-form-item prop='yzCode' label='验证码:' >
                                           <template>
                                               <div>
                                                    <el-input v-model='form3.yzCode' placeholder="输入验证码" style='width:128px;'></el-input>
                                                    <el-button type='text' @click="getyzCode" style='color:#fff;background-color:rgb(22,155,213);margin-left:9px' v-if="sendAuthCode">获取验证码</el-button>
                                                    <span v-else class="auth_text" style='margin-left:10px;'> <span style='color:#409EFF;font-size:16px;margin-right:5px;'>{{auth_time}}</span>秒之后重新发送验证码</span> 
                                               </div>
                                           </template>
                                        </el-form-item>
                                        <el-form-item prop='loginPwd' label='登录密码:'>
                                            <el-input v-model='form3.loginPwd' placeholder="输入登录密码" style='width:200px' type='password'></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type='primary' @click="telNextStep">下一步</el-button>
                                        </el-form-item>
                                    </el-form>
                                    <p v-if='updateSuccess'>修改绑定手机成功</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class='content' v-if='show1'>
                <div class="title">
                    <span class="iconfont icon-shuxian"></span>
                    <span>修改密码</span>
                </div>
                <div class='updateInfo'>
                    <span>136****1223</span>
                    <el-button type='primary' style='color:#409EFF;margin:0 15px;' @click='recevie()' v-if="sendAuthCode">获取验证码</el-button>
                    <span v-else class="auth_text" style='margin-left:15px;'> <span style='color:#409EFF;font-size:16px;margin-right:5px;'>{{auth_time}}</span>秒之后重新发送验证码</span> 
                    <span style='color:#f66;margin-left:30px;'>显示手机号,中间四位为星号</span>
                    
                </div>
                <el-form :model='form' ref='form' label-width="180px" v-if='updateTelInfo' :rules='updateTelRules'>
                        <el-form-item label='验证码:' prop='yzCode'>
                            <el-input placeholder="验证码" style='width:160px' v-model='form.yzCode'></el-input>
                        </el-form-item>
                        <el-form-item label='新密码:' prop='newPass'>
                            <el-input placeholder="请输入新密码" style='width:160px' v-model='form.newPass' type='password'></el-input>
                        </el-form-item>
                        <el-form-item label='确认密码:' prop='checkNewPass'>
                            <el-input placeholder="请确认密码" style='width:160px' v-model='form.checkNewPass' type='password'></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type='primary' size='small' style='width:160px;' @click="confirmUpdate(form)">确认修改</el-button>
                        </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
    

</template>
<script>
export default {
    // 250 194 88警告橙色
    inject:['reload'],//注入依赖
    data(){
        // 登录密码验证
        var validatePass1 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.merchantForm.checkPass !== '') {
                    // this.$refs.merchantForm.validateField('checkPass')
                }
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.merchantForm.pass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        // 账号安全时登录密码验证
        var validateNewPass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入新密码'));
            } else {
            if (this.form.checkNewPass !== '') {
                this.$refs.form.validateField('checkNewPass');
            }
            // callback();
            }
        };
        // 账号安全时确认密码验证
        var validateNewPass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'));
            } else if (value !== this.form.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
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
                // callback();
            }
        };
        var isvalidIdentity=/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
        //身份证号验证
        var validateIdentity=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('请输入手机号'));
            }else if(value!==''){
                if(!isvalidIdentity.test(value)){
                    callback(new Error('请输入正确的18位身份证号码'));
                }
            }else{
                callback();
            }
        };
        return {
            loading:false,
            //默认显示 员工账号查询
            showSearch:true,
            searchObj:{},
            // 员工查询数据默认页码和页大小
            current:1,
            pageSize:10,
            //sendAuthCode用来控制显示获取手机验证码还是显示倒计时
            sendAuthCode:true,
            auth_time:'60',
            contentList:['用户退款异常','商家组团成功','用户付款成功','活动兑换成功'],
            tagTitle:'个人资料',
            form:{},
            form1:{
                keyword:''
            },
            form2:{
                telPhoneList:[
                    {
                        telPhone:12345698752,
                        id:1
                    }
                ],
                checkedList:['用户退款异常','用户付款成功']
            },
            form3:{},
            show:true,
            show1:false,
            show2:true,
            showTel:false,
            updateTelInfo:true,
            updateSuccess:false,
            num:0,
            merchantForm:{
                empAccount:'',
                name:'',
                pass: '',
                checkPass: '',
                telPhone:'',
                position:''

            },
            checked:false,
            dialogVisible:false,
            dialogVisible1:false,
            //解绑手机对话框
            dialogVisibleAccount:false,
            //禁止此页再显示对话框
            bindAccount:false,
            dialogAdd:false,
            activeName:'first',
            personData:{},
            empData:[
            ],
            // 员工表验证
            rules:{
                empAccount:[
                    {required:true,message:'请输入员工账号',trigger:'blur'},
                ],
                name:[
                    {required:true,message:'请输入姓名',trigger:'blur'},
                ],
                pass: [
                    { validator: validatePass1, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                //手机号验证
                telPhone:[
                    {validator: validatePhone, trigger: 'blur'}
                ]

            },
            // 个人资料中的验证手机
            rules1:{
                telPhone:[
                    {validator: validatePhone, trigger: 'blur'}
                ],
                yzCode:[
                    {required:true,trigger:'blur',message:'请输入验证码'}
                ],
                loginPwd:[
                    {required:true,trigger:'blur',message:'请输入登录密码'}
                ]
            },
            rules2:{
                identityNumber:[
                    {validator: validateIdentity, trigger: 'blur'}
                ],
                telPhone:[
                    {validator: validatePhone, trigger: 'blur'}
                ],
            },
            telPhoneListRules:{
                telPhone:[
                    {validator: validatePhone, trigger: 'blur'}
                ],
            },
            //修改手机时 密码和确认密码验证
            updateTelRules:{
                yzCode:[
                    {required:true,trigger:'blur',message:'请输入验证码'}
                ],
                newPass:[
                    {validator: validateNewPass, trigger: 'blur'}
                ],
                checkNewPass:[
                    {validator: validateNewPass2, trigger: 'blur'}
                ]
            }
        }
        
    },
    created(){
        this.renderEmp();
        this.renderPerInfo();
        this.renderAccountName();
    },
    methods:{
        renderAccountName(){
            this.name=localStorage.getItem("name");
        },
        handleClick(tag){
            this.tagTitle=tag.label;
        },
        // 员工数据加载
        renderEmp(){
            this.$axios.post(request.testUrl+"/platform/auth2/adminUser/pageList",JSON.stringify({
                pageSize:this.pageSize,
                current:this.current
            })).then(res=>{
                this.loading=true;
                setTimeout(()=>{
                    this.loading=false;
                    this.empData=res.data.data.records;
                },1000);
                // console.log(res.data.data.records);
            })
        },
        // 用户个人信息加载
        renderPerInfo(){
            // var token=localStorage.getItem('token');
            this.$axios.post(request.testUrl+"/auth/platform/getLoginInfo")
            .then(res=>{
                this.loading=true;
                setTimeout(()=>{
                    this.loading=false;
                    this.personData=res.data.data;
                },1000);
                // console.log(res.data.data)
            })
        },
        //手机号验证
        handleTel(){
            // this.reload();
            // console.log(this.checked);
            if(this.checked==true){
                this.dialogVisible=true;
                // this.form.telPhone=this.personData.telPhone;
            }
            else{
                this.$message({
                    message:'请选中左边的选择框,再点击验证',
                    type:'error'
                });
            }
        },
        nextStep(){
            this.dialogVisible=false;
            this.dialogVisible1=true;
        },
        // handleClose(done){
        //     this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
        // },
        getTelCode(){
            // 发送请求
            //隐藏获取手机验证码 显示倒计时
            this.sendAuthCode=false;
            var auth_time=parseInt(this.auth_time);
            var timer=setInterval(()=>{
                auth_time--;
                // console.log(auth_time);
                this.auth_time=auth_time;
                if(auth_time<=0){
                    clearInterval(timer);
                    this.sendAuthCode=true;
                    this.auth_time=60;
                    clearInterval(timer);
                }
            },1000)

        },
        success(){
            this.dialogVisible=false;
            this.dialogVisible1=false;
            this.personData.verification=false;
            this.show=true;
            this.tagTitle='个人资料';
        },
        searchEmp(){
            this.$axios.post(request.testUrl+"/platform/auth2/adminUser/pageList",JSON.stringify(this.form1))
            .then(res=>{
                this.empData=res.data.data.records;
                this.form1={};
            })
        },
        //新增员工按钮
        addEmp(){
            this.$nextTick(()=>{
                if (this.$refs.merchantForm !== undefined){
                    this.$refs.merchantForm.resetFields();//等弹窗里的form表单的dom渲染完在执行this.$refs.staffForm.resetFields()，去除验证
                }
            });
            this.dialogAdd=true;   
        },
        goDetails(id){
            // alert(id)
        },
        deleteEmp(id){
            this.$axios.delete(request.testUrl+"/platform/auth2/adminUser/"+id)
            .then(res=>{
                if(res.data.code==0){
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    });
                    this.renderEmp();
                }
            })
        },
        save(){
            // alert('消息通知中的保存');
            this.$message({
                message:'保存成功',
                type:'success'
            });

        },
        //取消按钮清空数据
        cancel(){
            this.dialogAdd=false;
            this.$nextTick(()=>{
                this.$refs.merchantForm.resetFields();
            })
            // this.reload();
        },
         //增加提示
        addpromptList(){
            if(this.num==2){
                // alert('一个人最多可以设置3个不同手机号接受信息');
                return;
            }
            this.form2.telPhoneList.push({
            });
            this.num=this.form2.telPhoneList.length-1;
            
        },
        //删除
        deletepromptList(item){
            var index = this.form2.telPhoneList.indexOf(item)
            if (index !== -1) {
                this.form2.telPhoneList.splice(index, 1)
            }
            this.num=this.form2.telPhoneList.length-1;                        
        },
        handleCheckedListChange(){
        },
        //修改密码
        updatePwd(){
            // console.log('修改密码');
            this.show=false;
            this.tagTitle='账号安全';
            this.show1=true;
            // this.$router.push('/修改密码');
        },
        //修改手机
        updateTel(){
            this.tagTitle='绑定手机';
            this.show2=false;
            this.showTel=true;
        },
        recevie(){
            //隐藏获取手机验证码 显示倒计时
            this.sendAuthCode=false;
            var auth_time=parseInt(this.auth_time);
            var timer=setInterval(()=>{
                auth_time--;
                this.auth_time=auth_time;
                if(auth_time<=0){
                    clearInterval(timer);
                    this.sendAuthCode=true;
                    this.auth_time=60;
                    clearInterval(timer);
                }
            },1000);
        },
        confirmUpdate(form){
             this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$message({
                        message:'修改成功',
                        type:'success'
                    });
                    var timer=setTimeout(()=>{
                        this.show1=false;
                        this.show=true;
                        clearTimeout(timer)
                    },1000);
                    
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        //解绑手机
        untied(){
            this.dialogVisibleAccount=true;
        },
        //修改手机获得验证码
        getyzCode(){
            // alert('获得验证码');
            //隐藏获取手机验证码 显示倒计时
            this.sendAuthCode=false;
            var auth_time=parseInt(this.auth_time);
            var timer=setInterval(()=>{
                auth_time--;
                this.auth_time=auth_time;
                if(auth_time<=0){
                    clearInterval(timer);
                    this.sendAuthCode=true;
                    this.auth_time=60;
                    clearInterval(timer);
                }
            },1000);
        },
        telNextStep(){
            this.updateTelInfo=false;
            this.updateSuccess=true;
            this.form3={};
        },
        //新增员工保存
        submitForm(merchantForm) {
            this.$refs.merchantForm.validate((valid)=>{
                if(valid){
                }else{
                    this.$message({
                        type:'error',
                        message:'新增保存失败'
                    })
                    return ;
                }
            })
            this.$axios.post(request.testUrl+"/platform/auth2/adminUser/add",JSON.stringify({
                        mobile:this.merchantForm.telPhone,
                        position:this.merchantForm.position,
                        username:this.merchantForm.empAccount,
                        realname:this.merchantForm.name,
                        password:this.merchantForm.checkPass
                        })).then(res=>{
                            // console.log(res.data);
                                this.dialogAdd=false;
                                if(res.data.code==0){
                                    this.$message({
                                        type:'success',
                                        message:'新增成功'
                                });
                                this.renderEmp();
                            }
            })
        }
    }
}
</script>
<style scoped>
    h2{
        text-align: left;
        padding-left:40px;
    }
    .title{
        display: flex;
        font-size:14px;
        height:auto;
        line-height: 60px;
    }
    .tilCon{
        width:580px;
        /* margin:0 auto; */
        margin-left:492px;
    }
    .title .icon-shuxian{
        font-size:16px;
        padding-right:4px;
        color:rgb(1,119,213);
    }
    /* 1 119 213 */
    .tabs{
        width:90%;
        height:800px;
        padding-left:40px;
        /* background-color: pink; */
    }
    .content{
        /* height:600px!important; */
        margin-top: 46px!important;
    }
    .el-button--primary {
    color: #fff!important;
    background-color: #409EFF!important;
    border-color: #409EFF!important;
    }
    .yzCode{
        margin-left:13px;
        margin-right:8px;
    }
    .footBtn{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sucInfo{
        display: block;
        margin: 0 auto;
        text-align:center;
    }
    .empInfo{
        width:600px;
        margin:10px auto 0;
    }
    .empTable{
        width:100%;
        height:auto;
        margin:20px auto 0;
    }
    .empTable .addEmp{
        float:right;
        margin-bottom:30px;
    }
    .txt{
		color:#f66;
		font-size:14px;
		line-height: 20px;
		margin:14px auto 36px;
        text-align: center;
    }
    /* 添加减少符号样式 */
    .use{
        display: inline-block;
        font-size:26px;
        margin-left:10px;
        color:#409EFF;
        line-height: 20px;
        vertical-align: middle;
    }
    .save{
        display: block;
        margin-left:350px;
    }
    /* 账号安全 */
    .accountSafe{
        display: flex;
        width:99%;
        height:386px;
        overflow: hidden;
        margin-top:10px;
        border:1px solid #ccc;
        border-radius:10px;
        background-color:#fff;
        margin-left:10px;
    }
    .box{
        position:relative;
        width:180px;
        height:240px;
        margin:50px 40px 0 80px;
        border:1px solid #bbb;
        background-color:#fff;
        border-radius:5px; 
    }
    .accountSafe .box1{
        box-shadow:0px 0px 0px 4px rgba(1,1,1,0.05);
    }
    /* 四分之一圆样式 */
    .circle{
        display: flex;
        justify-content: center;
        align-items: center;
        position:absolute;
        right:0;
        top:0;
        width:26px;
        height:26px;
        background-color: #09bb07;
        border-radius:0 0 0 26px;
    }
    .circle .icon-zhengque{
        margin-left: 4px;
        margin-top: -2px;
        font-size:22px;
        color:#fff;
        text-align: center;
        line-height: 26px;
    }
    /* 中间内容区域 */
    .box .con{
        display:flex;
        flex-direction: column;
        justify-content: center;
    }
    .con span{
        font-size:68px;
        line-height:68px;
        margin:30px auto 20px;
        color:#409EFF;
    }
    .con p{
        text-align: center;
        font-size:14px;
        color:#000;
    }
    .con p:nth-child(2){
        text-align: center;
        color:#aaa;
        margin:10px 0;
    }
    .phoneBtn{
        display: flex;
        justify-content: center;
    }
    .pwdBtn{
        width:60%;
        border:1px solid #409eff;
        margin:10px auto 0;
    }
    .phoneBtn button{
        border:1px solid #409eff;
        padding:5px 10px;
        margin-top:15px;
    }
    /* 修改密码 */
      .updateInfo{
        font-size:14px;
        width:900px;
        margin-left:90px;
        margin-bottom:20px;
    }
    .updateInfo >button{
        margin:0 80px 0 20px;
    }
    .updateTel{
        width:99%;
        height:auto;
        margin-top:10px;
        padding:35px 0 0 75px;
        border:1px solid #ccc;
        border-radius:10px;
        margin-left:10px;
    }
    .telHead{
        display: flex;
        align-items: center;
        width:100%;
        height:90px;
        border-bottom: 1px solid #aaa;
        padding-bottom:20px;
    }
    .circleTel{
        display: flex;
        align-items: center;
        justify-content: center;
        width:90px;
        height:90px;
        background-color: rgb(102,204,255);
        border-radius:50%;
        margin-right:20px;
    }
    .circleTel .pic{
        width:40px;
        height:48px;
        background-color: #fff;
    }
    .circleTel .pic span{
        line-height: 48px;
        font-size:40px;
    }
    .telHead p{
        font-size:16px;
    }
    .conTel{
        margin-top:30px;
    }
    .conTel p{
        font-size:14px;
        color:#000;
        margin: 110px 0 90px 50px;
    }
    .infoForm >>> .el-form-item.el-form-item--small{
        margin-top:30px;
    }
    .infoForm >>> .el-form-item__error{
        margin-left: 105px;
        margin-top: 6px;
    }
    .setting >>> .tabs[data-v-b5790acc] {
    width: 90%;
    height: 577px;
    padding-left: 40px;
    }
</style>