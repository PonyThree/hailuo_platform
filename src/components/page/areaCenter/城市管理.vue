<template>
    <div >
        <h2>区域管理>   &nbsp;城市管理></h2>
        <div style='margin:20px auto 0;width:80%;overflow:hidden;'>
            <div class='exportBtn'>
                <el-button type='primary' @click='exportData'>导出</el-button>
            <!-- <a :href="serverUrl+'/adminActivity/export?status='+this.form.status+'&activityTypeId='+this.form.activityTypeId" style="margin-left: 50px;" class="flag" @click='exportData'>导出</a> -->
            </div>
            <div class="searchHead" style='width:100%;'>
                <el-form :data='form' ref='from' inline>
                    <el-form-item label="区域:" prop='region' style='margin-left:10px;'>
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option  label="全国" value=""></el-option>
                            <el-option  label="重庆" value="1"></el-option>
                            <el-option  label="武汉" value="2"></el-option>
                            <el-option  label="上海" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="城市:" prop='city' style='margin-left:10px;'>
                        <el-select v-model="form.city" placeholder="请选择">
                            <el-option  label="全国" value=""></el-option>
                            <el-option  label="重庆" value="1"></el-option>
                            <el-option  label="武汉" value="2"></el-option>
                            <el-option  label="上海" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地区:" prop='area' style='margin-left:10px;'>
                        <el-select v-model="form.area" placeholder="请选择">
                            <el-option  label="大渡口区" value=""></el-option>
                            <el-option  label="渝中区" value="1"></el-option>
                            <el-option  label="渝北区" value="2"></el-option>
                            <el-option  label="XXX区" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style='margin-left:56px;'>
                        <el-input placeholder="请输入项目地址" style='width:200px' v-model='form.address'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click='search'>查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data='areaData' style='width:100%;margin-top:10px;'>
                <el-table-column label='区域' prop='region'>

                </el-table-column>
                <el-table-column label='城市' prop='city'>

                </el-table-column>
                <el-table-column label='地区' prop='area'>

                </el-table-column>
                <el-table-column label='项目名称' prop='projectName'>

                </el-table-column>
                <el-table-column label='操作' prop='caozuo'>
                    <template slot-scope="scope">
                            <el-button type='text' style='color:rgb(25,158,216);' @click='find(scope.$index)'>查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="查看项目" :visible.sync="dialogVisible" width="400px">
            <div class='location'> 
                <el-form :data='form' ref='form' label-width="80px">
                    <el-form-item label='社区:'>
                        <template>
                            <div>
                                <el-input v-model='form.community'></el-input>
                                <i class="el-icon-location" @click="getLocation"></i>
                            </div>
                        </template>
                    </el-form-item>
                    <el-form-item label='经度' prop='longitude'>
                        <el-input v-model='form.longitude'></el-input>
                    </el-form-item>
                    <el-form-item label='纬度' prop='latitude'>
                        <el-input v-model='form.latitude'></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <div class="map">
            <div id="allmap"></div>
            <div id="r-result">
                经度: <input id="longitude" type="text" style="width:100px; margin-right:10px;" />
                纬度: <input id="latitude" type="text" style="width:100px; margin-right:10px;" />
                <!-- <input type="button" value="查询" onclick="theLocation()" /> -->
            </div>
        </div>
    </div>
</template>


<script>
import loadBMap from '../../../assets/js/loadBMap';
export default {
    // allmap
    data(){
        return {
            myMap:null,
            showMap:false,
            dialogVisible:false,
            form:{
                community:'恒大加州',
                // 经度
                longitude:'103.968837',
                // 纬度
                latitude:'30.604888',
                address:''

            },
            areaData:[
                {
                    region:'重庆',
                    city:'重庆',
                    area:'大渡口区',
                    projectName:'北大资源'

                },
                {
                    region:'重庆',
                    city:'重庆',
                    area:'大渡口区',
                    projectName:'北大资源'

                },
                {
                    region:'重庆',
                    city:'重庆',
                    area:'大渡口区',
                    projectName:'北大资源'

                },
                {
                    region:'重庆',
                    city:'重庆',
                    area:'大渡口区',
                    projectName:'北大资源'

                }
            ]
        }
    },
    mounted(){
        this.initMap();
    },
    methods:{
        initMap(){
            loadBMap('qzN1OxHV2ozVYx12WsGD2I7Q0bdQDVo1')
            .then(()=>{
                //百度地图API功能
                this.myMap=new BMap.Map('allmap');//创建Map实例
                this.myMap.centerAndZoom(new BMap.point(116.404,39.915));//初始化地图，设置中心点坐标和地图级别
                this.myMap.setCurrentCity('重庆');//设置地图显示的城市
                this.myMap.enableScrollWheelZoom(true);
            }).catch(err=>{
                console.log('地图加载失败');
            })
        },
        find(i){
            // alert('查看更多'+i);
            this.dialogVisible=true;
        },
        search(){
            alert('查询');
        },
        exportData(){
            alert('导出');
        },
        getLocation(){
            alert('得到位置');
            this.showMap=true;
        },
        search(){
            alert(this.form.address);
        }
    }

}
</script>
<style scoped>
    #allmap{
        width: 100%;
        height: 500px;
    }
     h2{
        text-align: left;
        padding-left:40px;
    }
    .exportBtn{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        /* float:right; */
        width:100%;
        height:40px;
        margin-top:10px;
        /* background-color:pink; */
    }
    .exportBtn button{
        float:right;
    }
    .searchHead{
        width:79%;
        height:40px;
        margin-top:20px;
        /* padding-left:24px; */
        /* padding:5px; */
        padding:7px 8px 5px;
        background-color: rgb(25,158,216);
    }
    .el-button--primary {
        color: #fff!important;
        background-color: #409EFF!important;
        border-color: #409EFF!important;
    }
    .location{

    }
    .el-icon-location{
        position:absolute;
        right:-20px;
        top:9px;
        /* color:rgb(25,158,216); */
        color:rgb(13,167,63);

	}
    /* 导出按钮 */
    .flag{
  		color: #fff;
	    background-color: #999;
	    border-color: #dcdfe6;
	    display: inline-block;
	    font-size: 12px;
    	border-radius: 3px;
    	width: 56px;
    	text-align: center;
    	margin-left: 20px;
    }
</style>

