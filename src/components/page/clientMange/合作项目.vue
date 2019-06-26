<template>
    <div style='' class='box'>
        <!-- 合作项目展示 -->
        <div class="coperationPro">
            <div class="title">
                <p>前端已展示合作项目</p>
            </div>
            <div class='content' v-loading="loadCoperationList">
                <div class="list" v-for='(item,index) in coperationList' :key="index">
                    <p>{{item.name}}</p>
                    <p @click='jumpBom(index,item.id,item.frontShow)'>{{item.frontShow==1?'不展示':'展示'}}</p>
                    <p v-show="1==2">{{item.id}}</p>
                </div>
            </div>
        </div>
        <!-- 已发布项目 -->
        <div class="publishPro">
            <div class="title">
                <p>已发布项目</p>
            </div>
            <div class='content' v-loading="loadCoperationList">
                <div class="search">
                    <el-button style='color:#000;margin-left:20px;' @click='find'>查询</el-button>
                    <el-input placeholder="请输入项目名称" style='width:240px;' v-model='searchTxt' class='searchIpt'></el-input>
                </div>
                <div class="list" v-for='(item,index) in publishProject'  :key="index">
                    <p>{{item.name}}</p>
                    <p @click='jumpTop(index,item.id,item.frontShow)'>{{item.frontShow==0?'展示':'不展示'}}</p>
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
            pageSize:6,
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
        this.renderCoperation();
        this.renderUnShow();
    },
    methods:{
        // 数据加载 合作项目方
        renderCoperation(){
            this.$axios.get(request.testUrl+'/project/auth2/project/findFrontShowProjects')
            .then(res=>{
                // console.log(res.data.data);
                this.loadCoperationList=true;
                this.coperationList=res.data.data;
                setTimeout(()=>{
                    this.loadCoperationList=false;
                },1000);
            })
        },
        //未展示到前端的项目
        renderUnShow(){
            // var params=new URLSearchParams();
            // params.append('page',this.currentPage);
            // params.append('pageSize',this.pagesize);
            this.$axios.get(request.testUrl+'/project/auth2/project/findHasPublishProject',{
                params:{
                    page:this.currentPage,
                    pageSize:this.pageSize
                }
            })
            .then(res=>{
                // console.log(res.data.data)
                this.loadCoperationList=true;
                this.publishProject=res.data.data.records;
                this.total=res.data.data.total;
                setTimeout(()=>{
                    this.loadCoperationList=false;
                },1000);
                
            })
        },
        find(){
            // alert(this.searchTxt);

            this.$axios.get(request.testUrl+'/project/auth2/project/findHasPublishProject',{
                params:{
                    projectName:this.searchTxt,
                    page:this.currentPage,
                    pageSize:this.pageSize
                }
            }).then(res=>{
                console.log(res.data.data);
                this.publishProject=res.data.data.records;
                this.total=res.data.data.total;
                // this.renderUnShow();
                // this.reload();
            })
        },
        //切换到不展示
        jumpBom(i,id,frontShow){
            console.log(i,id,frontShow);
            if(frontShow==1){
                frontShow=0;
            }else{
                frontShow=1;
            }
            console.log(i,id,frontShow);
            var params=new URLSearchParams();
            params.append('frontShow',frontShow);
            params.append('projectId',id);
            this.$axios.post(request.testUrl+'/project/auth2/project/updateFrontShow',params)
            .then(res=>{
                console.log(res.data.data)
                this.renderUnShow();
                this.renderCoperation();
            })
        },
        //展示到小程序端
        jumpTop(i,id,frontShow){
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
                console.log(res.data)
                this.renderUnShow();
                this.renderCoperation();
            })
        },
        currentChange(currentPage){
            alert(currentPage);
            this.currentPage=currentPage;
            // this.renderUnShow();
        },
        sizeChange(pageSize){
            alert(pageSize);
        }
    }

}
</script>
<style scoped>
    .box{
        /* margin:0 auto;
        width:80%; */
        /* background-color:#ff0; */
        /* display: flex;
        justify-content: center;
        flex-direction: column; */
    }
    .coperationPro{
        overflow: hidden;
        width:69%;
        height:auto;
        /* margin:0 auto; */
        border:1px solid #bbb;
        margin-left:40px;
        margin:0 auto;
        /* margin-bottom: 30px !important; */
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
        /* height:300px; */
        height:auto;
        padding-bottom:30px;
        overflow: hidden;
    }
    .publishPro{
        overflow: hidden;
        width:69%;
        /* margin-left:40px; */
        margin:30px auto 0;
        border:1px solid #bbb;
    }
    .publishPro .content{
        width:100%;
        /* height:360px; */
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
        /* width:370px; */
        height:36px;
        /* float:right; */
        /* background-color: pink; */
        /* margin-left: 20px !important; */
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
    /* .search input.searchTxt{
        float:right !important;
    } */
    .publishPro .list p:nth-child(2){
        width:60%;
        margin:30px auto 10px;
        background-color:#409fff;
        color:#fff;
        border-radius:4px;
    }
    /* 分页样式 */
    .page{
        /* background-color: pink; */
        background-color: rgb(25,158,216);
        text-align: center;
        padding:10px 0;
    }
</style>