<template>
    <div style='' class='box'>
        <!-- 合作项目展示 -->
        <div class="coperationPro">
            <div class="title">
                <p>前端已展示合作项目</p>
            </div>
            <div class='content'>
                <div class="list" v-for='(item,index) in coperationList'>
                    <p>{{item.name}}</p>
                    <p>{{item.line}}</p>
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
                <div class="list" v-for='(item,index) in publishProject'>
                    <p>{{item.name}}</p>
                    <p>{{item.show}}</p>
                </div>
            </div>
            <!--分页器-->
            <el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pagesize" layout="total, sizes, prev, pager, next,jumper" :total="total" class='page'>
            </el-pagination>
        </div>
    </div>


</template>
<script>
export default {
    data(){
        return{
            //查询的文本
            searchTxt:'',
            currentPage:3,
            pagesize:10,
            total:100,
            //合作项目列表
          coperationList:[
              {
                  name:'蓝湖郡',
                  line:'下线'
              },
              {
                  name:'蓝湖郡',
                  line:'下线'
              },
              {
                  name:'蓝湖郡',
                  line:'下线'
              },
              {
                  name:'蓝湖郡',
                  line:'下线'
              },
              {
                  name:'蓝湖郡',
                  line:'下线'
              },
              {
                  name:'蓝湖郡',
                  line:'下线'
              },
               {
                  name:'蓝湖郡',
                  line:'下线'
              },
               {
                  name:'蓝湖郡',
                  line:'下线'
              },
               {
                  name:'蓝湖郡',
                  line:'下线'
              },
               {
                  name:'蓝湖郡',
                  line:'下线'
              },
              {
                  name:'蓝湖郡',
                  line:'下线'
              },
              {
                  name:'蓝湖郡',
                  line:'下线'
              },

          ],
            //   已发布项目列表  
            publishProject:[
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },
                {
                name:'蓝湖郡',
                show:'前端展示' 
                },

            ]
        }
    },
    methods:{
        find(){
            alert(this.searchTxt);
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
        height:300px;
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
        height:360px;
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