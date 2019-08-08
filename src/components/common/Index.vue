<template>
       <div>
           <div class="indexPage">
                <!-- 头部信息 -->
                <div class="title">
                    <span>平台后端</span>
                    <div class='head'>
                        <div class="headName" @click="showLogout">
                            <span>{{realname}}</span>
                            <el-icon class="el-icon-caret-bottom"></el-icon>
                        </div>
                        <img src='../../assets/img/boy.jpg' class='headPic'/>
                        <el-button class="logout" v-if="show" @click="logot">退出登录</el-button>
                    </div>
                </div> 
                <!-- 内容区域 -->
                <div class="content">
                    <div class="list" v-for="(item,index) in projectList" :key="index">
                        <div class='desc'>
                            <p>{{item.title}}</p>
                            <p>{{item.desc}}</p>
                        </div>
                        <div class='btn'>
                            <el-button type='primary' @click='jumpPage(index+1)'>{{item.jumpTxt}}</el-button>
                        </div>
                    </div>
                </div>
           </div>
       </div>
</template>
<script>
export default {
    data(){
        return{
            show:false,
            realname:'',
            projectList:[
                {
                    title:'商家管理',
                    desc:'项目权限设置,商户管理',
                    jumpTxt:'前往管理'
                },
                 {
                    title:'个人中心管理',
                    desc:'项目权限设置,商户管理',
                    jumpTxt:'前往管理'
                },
                 {
                    title:'客户端管理',
                    desc:'项目权限设置,商户管理',
                    jumpTxt:'前往管理'
                },
                 {
                    title:'区域管理',
                    desc:'项目权限设置,商户管理',
                    jumpTxt:'前往管理'
                },
                 {
                    title:'财务管理',
                    desc:'项目权限设置,商户管理',
                    jumpTxt:'前往管理'
                },
            ],
        }
    },
    created(){
        this.renderRealName(); 
    },
    methods:{
        showLogout(){
            this.show=!this.show;
        },
        logot(){
            localStorage.removeItem("realname");
            localStorage.removeItem("token");
            this.$router.push("/login");
        },
        renderRealName(){
            this.realname=localStorage.getItem('realname');
            console.log(this.realname);
        },
        jumpPage(i){
            // alert(i);
            if(i==1){
                this.$router.push('/项目管理');
            }
            if(i==2){
                this.$router.push('/设置');
            }
            if(i==3){
                this.$router.push('/客户端管理');
            }
            if(i==4){
                this.$router.push('/城市管理');
            }
             if(i==5){
                this.$router.push('/项目财务管理');
            }
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
    .indexPage{
       width:100%;
       height:auto;
       margin:30px auto 0;
       background-color: #fff;
       padding:0 50px;
       overflow: hidden;
    }
    /* 头部信息 */
    .title{
        box-sizing: border-box;
        display:flex;
        justify-content: space-between;
        width:60%;
        height:80px;
        padding-left:30px;
        padding-right:30px;
        margin:0 auto;
        background-color: #f3f3f3;
        font-size:14px;
        line-height:80px;
        border:1px solid #bbb;
    }
    .title .head{
        position: relative;
        float: right;
        width:300px;
        height:80px;
    }
    .headName{
        float:right;
        margin-top:17px;
        height:60px;
    }
    .title .head img{
        float:right;
        width:50px;
        height:50px;
        margin-right:6px;
        border-radius:5px;
        margin-top:17px;
    }
    .logout{
        position:absolute;
        right:0;
        top:84px;
    }
    /* 内容区域 */
    .content{
        width:60%;
        margin:60px auto 0;
        height:auto;
        overflow: hidden;
    }
    .list{
        float:left;
        width:220px;
        height:200px;
        border-radius:5px;
        margin-left:30px;
        margin-top:30px;
        overflow: hidden;
        border:1px solid #000;
    }
    .list .desc{
        box-sizing: border-box;
        text-align: center;
        width:220px;;
        height:140px;
        padding-top:30px;
        background-color: #fff;
    }
    .list .desc p:nth-child(1){
        font-size:20px;
        color:#606266;
    }
    .list .desc p:nth-child(2){
        font-size:16px;
        margin-top:30px;
        color:#909399;
    }
    .btn button{
        display: block;
        width:100%;
        color:#fff;
        height:60px;
        line-height: 50px;
        text-align: center;
    }
</style>
