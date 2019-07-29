<template>
    <div style='margin-top:30px;' class='box' v-loading="loadCoperationList">
        <!-- 合作项目展示 -->
        <div class="coperationPro">
            <div class="title">
                <p>前端已展示合作项目</p>
            </div>
            <div class='content' >
                <div class="list" v-for='(item,index) in coperationList' :key="index">
                    <p>{{item.name}}</p>
                    <p @click='jumpPD(index,item.id,item.frontShow,item.publishStatus)' :style="{backgroundColor:item.publishStatus==0?'#ccc':'rgb(64,159,255)'}">{{item.frontShow==1?'不展示':'展示'}}</p>
                    <p v-show="1==2">{{item.id}}</p>
                </div>
            </div>
        </div>
        <!-- 已发布项目 -->
        <div class="publishPro">
            <div class="title">
                <p>已发布项目</p>
            </div>
            <div class='content'>
                <div class="search">
                    <el-button style='color:#000;margin-left:20px;' @click='find'>查询</el-button>
                    <el-input placeholder="请输入项目名称" style='width:240px;' v-model='searchTxt' class='searchIpt'></el-input>
                </div>
                <div class="list" v-for='(item,index) in publishProject'  :key="index">
                    <p>{{item.name}}</p>
                    <p @click='jumpPD(index,item.id,item.frontShow,item.publishStatus)' :style="{backgroundColor:item.publishStatus==0?'#ccc':'rgb(64,159,255)'}">{{item.frontShow==0?'展示':'不展示'}}</p>
                    <p v-show="1==2">{{item.id}}</p>
                </div>
            </div>
            <!--分页器-->
            <el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pageSize" layout="total, sizes, prev, pager, next,jumper" :total="total" class='page' @size-change="sizeChange" @current-change="currentChange"> 
            </el-pagination>
        </div>
    </div>
</template>
<script>

export default {
    inject:['reload'],
    data(){
        return{
            //查询的文本
            searchTxt:'',
            currentPage:1,
            pageSize:5,
            total:100,
            loadCoperationList:false,
            //合作项目列表
            coperationList:[
            ],
            //   已发布项目列表  
            publishProject:[
            ]
        }
    },
    created(){
        this.renderData();
    },
    methods:{
        renderData(){
            this.loadCoperationList=true;
            var lock=setTimeout(()=>{
                this.loadCoperationList=false;
                this.renderCoperation();
                this.renderUnShow();
                clearTimeout(lock);
            },1000)
            
        },
        // 数据加载 合作项目方
        renderCoperation(){
            this.$axios.get(request.testUrl+'/project/auth2/project/findFrontShowProjects')
            .then(res=>{
                this.loadCoperationList=true;
                this.coperationList=res.data.data;
            })
        },
        //未展示到前端的项目
        renderUnShow(){
            this.$axios.get(request.testUrl+'/project/auth2/project/findHasPublishProject',{
                params:{
                    page:this.currentPage,
                    pageSize:this.pageSize
                }
            })
            .then(res=>{
                this.publishProject=res.data.data.records;
                this.total=res.data.data.total;
            })
        },
        find(){
            this.$axios.get(request.testUrl+'/project/auth2/project/findHasPublishProject',{
                params:{
                    projectName:this.searchTxt,
                    page:this.currentPage,
                    pageSize:this.pageSize
                }
            }).then(res=>{
                this.publishProject=res.data.data.records;
                this.total=res.data.data.total;
            })
        },
        //展示到小程序端
        jumpPD(i,id,frontShow,publishStatus){
            console.log(id+"-------"+frontShow);
            if(publishStatus==0){
                this.$message({
                    message:'已下线的项目不能再被进行任何操作',
                    type:'info'
                })
            }else{
                //不下线的项目才可以进行操作
                if(frontShow==0){
                    frontShow=1;
                }else{
                    frontShow=0;
                }
                var params=new URLSearchParams();
                params.append('frontShow',frontShow);
                params.append('projectId',id);
                this.$axios.post(request.testUrl+'/project/auth2/project/updateFrontShow',params)
                .then(res=>{
                    console.log(res.data.data)
                    this.renderUnShow();
                    this.renderCoperation();
                })
            }
        },
        currentChange(currentPage){
            // alert(currentPage);
            this.currentPage=currentPage;
            this.renderUnShow();
        },
        sizeChange(pageSize){
            // alert(pageSize);
            this.pageSize=pageSize;
            this.renderUnShow();
        }
    }

}
</script>
<style scoped>
    .coperationPro{
        overflow: hidden;
        width:69%;
        height:auto;
        border:1px solid #bbb;
        margin-left:40px;
        margin:0 auto;
    }
    .title{
        overflow: hidden;
        width:100%;
        height:50px;
        background-color: rgb(25,158,216);
    }
    .title p{
        font-size:14px;
        line-height: 50px;
        margin-left:20px;
    }
    .content{
        width:100%;
        height:auto;
        padding-bottom:30px;
        overflow: hidden;
    }
    .publishPro{
        overflow: hidden;
        width:69%;
        margin:50px auto 0;
        border:1px solid #bbb;
    }
    .publishPro .content{
        width:100%;
        height:auto;
    }
    .content .list{
        float:left;
    }
    .content::after{
        display: block;
        content:'',
        clear：both;
    }
    .content .list{
        width:140px;
        height:100px;
        background-color: #fff;
        border:1px solid #dcdfd6;
        overflow: hidden;
        text-align: center;
        border-radius:5px;
        margin-left:18px;
        margin-top:20px;
    }
    .content .list  p:nth-child(1){
        width:140px;
        height:20px;
        font-size:20px;
        margin-top:20px;
        font-weight: 600;
        line-height: 20px;
        color:#606266;
    }
    .content .list  p:nth-child(2){
        width:60%;
        margin:30px auto 10px;
        background-color:#eee;
        color:#ccc;
        border-radius:4px;
    }
    .search{
        width:100%;
        height:36px;
        margin-top:20px;
    }
    .search::after{
        display: block;
        clear:both;
        content:'';
    }
    .search button{
        float:right;
    }
    .search .searchIpt{
        float:right;
    }
    .publishPro .list p:nth-child(2){
        width:60%;
        margin:30px auto 10px;
        background-color:#409fff;
        color:#fff;
        border-radius:4px;
    }
    /* 分页样式 */
    .page{
        background-color: rgb(25,158,216);
        text-align: center;
        padding:10px 0;
    }
</style>