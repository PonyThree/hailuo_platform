<template>
       <div>
           <div class="indexPage">
               <!-- 头部信息 -->
               <div class="title">
                    <span>平台后端</span>
                    <div class='head'>
                        <img src='../../assets/img/boy.jpg' class='headPic'/>
                        <p>{{realname}}</p>
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
       /* border:1px solid #f00; */
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
        /* margin-top:30px; */
    }
    .headPic{
        display: block;
        width:50px;
        height:50px;
        border-radius:5px;
    }
    .title .head p{
        text-align: center;
        line-height: 20px;
        font-size:14px;
        margin-top:8px;
        height:20px;
    }
    /* 内容区域 */
    .content{
        width:60%;
        /* margin-top:30px; */
        margin:0 auto;
        height:auto;
        overflow: hidden;
        border:1pa solid #ff0;
        /* background-color: pink; */
    }
    .content::after{
        display: block;
        content:'';
        clear: both;   
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
        /* border:1px solid #000; */
        background-color: #fff;
        /* background-color: #ff0; */
    }
    .list .desc p:nth-child(1){
        font-size:20px;
        /* margin:30px 0; */
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
