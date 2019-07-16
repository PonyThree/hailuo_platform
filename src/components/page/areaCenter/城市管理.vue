<template>
    <div >
        <h2>区域管理>   &nbsp;城市管理></h2>
        <div style='margin:20px auto 0;width:80%;overflow:hidden;'>
            <div class='exportBtn'>
                <el-button type='primary' @click='del'>删除</el-button>
                <el-button type='primary' @click='exportData' @>导出</el-button>
            <!-- <a :href="serverUrl+'/adminActivity/export?status='+this.form.status+'&activityTypeId='+this.form.activityTypeId" style="margin-left: 50px;" class="flag" @click='exportData'>导出</a> -->
            </div>
            <div class="searchHead" style='width:100%;'>
                <el-form :data='form' ref='from' inline>
                    <el-form-item label="区域:" prop='region' style='margin-left:10px;'>
                        <el-select v-model="form.region" placeholder="请选择" @change="provinceChange">
                            <el-option  :label="item.name" :value="item.id" v-for='(item,index) in provinceList' :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="城市:" prop='city' style='margin-left:10px;'>
                        <el-select v-model="form.city" placeholder="请选择" @change="cityChange">
                            <el-option  :label="item.name"  v-for='(item,index) in cityList' :value="item.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地区:" prop='area' style='margin-left:10px;'>
                        <el-select v-model="form.area" placeholder="请选择" >
                            <el-option   :label="item.name"  v-for='(item,index) in areaList' :value="item.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style='margin-left:56px;'>
                        <el-input placeholder="请输入项目地址" style='width:200px' v-model='form.address1'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click='search'>查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data='areaData' style='width:100%;margin-top:10px;'  @selection-change='handleSelectionChange' v-loading="loading">
                <el-table-column type="selection" width="55" prop='checked'></el-table-column>
                <el-table-column label='区域' prop='provinceName'>

                </el-table-column>
                <el-table-column label='城市' prop='cityName'>

                </el-table-column>
                <el-table-column label='地区' prop='countyName'>

                </el-table-column>
                <el-table-column label='项目名称' prop='projectName'>

                </el-table-column>
                <el-table-column label='操作'>
                    <template slot-scope="scope">
                            <el-button type='text' style='color:rgb(25,158,216);' @click='find(scope.$index,areaData[scope.$index].id)'>查看</el-button>
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
                                <el-input v-model='form.name'></el-input>
                                <!-- <i class="el-icon-location" @click="getLocation"></i> -->
                            </div>
                        </template>
                    </el-form-item>
                    <el-form-item label='经度' prop='longitudes'>
                        <el-input v-model='form.longitudes'></el-input>
                    </el-form-item>
                    <el-form-item label='纬度' prop='latitudes'>
                        <el-input v-model='form.latitudes'></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!--分页器-->
        <el-pagination background  :current-page.sync='page' :page-sizes="[5, 10, 15]"  layout="total, sizes, prev, pager, next,jumper" :total="total" class='pageStyle' @size-change="sizeChange" @current-change="currentChange"> 
        </el-pagination>
        <!-- <div class="map">
            <div id="allmap"></div>
            <div id="r-result">
                经度: <input id="longitude" type="text" style="width:100px; margin-right:10px;" />
                纬度: <input id="latitude" type="text" style="width:100px; margin-right:10px;" />
                <input type="button" value="查询" onclick="theLocation()" />
            </div>
        </div> -->
    </div>
</template>
<script>
import loadBMap from '../../../assets/js/loadBMap';
export default {
    // allmap
    data(){
        return {
            loading:false,
            page:1,
            pageSize:10,
            total:0,
            myMap:null,
            showMap:false,
            dialogVisible:false,
            //用来存储批量选中删除的值数组
            multipleSelection:'',
            //省
            provinceList:[],
            //城市
            cityList:[],
            //地区
            areaList:[],
            form:{
                community:'恒大加州',
                // 经度
                longitude:'103.968837',
                // 纬度
                latitude:'30.604888',
                address1:''

            },
            areaData:[]
        }
    },
    mounted(){
        // this.initMap();
        this.renderAreaList(this.page,this.pageSize);
        this.getProvinceList();
    },
    methods:{
        // 城市管理列表
        renderAreaList(n1,n2){
            let data={
             
            }
            this.$axios.get(request.testUrl+'/project/auth2/project/projectList?page=1&pageSize=10').then(res=>{
                console.log(res.data.data)
                this.loading=true;
                var lock=setTimeout(()=>{
                    this.loading=false;
                    this.areaData=res.data.data.records;
                    this.total=res.data.data.total;
                    clearTimeout(lock)
                },1000)
                // console.log(res.data.data);
                
            })
        },
        currentChange(page){
            // alert(page)
			this.page=page;
			this.renderAreaList(this.page,this.pageSize,);
        },
        sizeChange(pageSize){
            // alert(pageSize)
			this.pageSize=pageSize
			this.renderAreaList(this.page,this.pageSize)
        },
        
        // initMap(){
        //     loadBMap('qzN1OxHV2ozVYx12WsGD2I7Q0bdQDVo1')
        //     .then(()=>{
        //         //百度地图API功能
        //         this.myMap=new BMap.Map('allmap');//创建Map实例
        //         this.myMap.centerAndZoom(new BMap.point(116.404,39.915));//初始化地图，设置中心点坐标和地图级别
        //         this.myMap.setCurrentCity('重庆');//设置地图显示的城市
        //         this.myMap.enableScrollWheelZoom(true);
        //     }).catch(err=>{
        //         console.log('地图加载失败');
        //     })
        // },
        find(i,id){
            // alert('查看更多'+id);
            this.dialogVisible=true;
            //获取初始化的数据
            this.$axios.get(request.testUrl+'/project/auth2/project/selectOne',{
                params:{
                    projectId:id
                }
            }).then(res=>{
                console.log(res.data.data);
                this.form=res.data.data;
            })
        },
        search(){
            alert('查询');
        },
        exportData(){
            alert('导出');
        },
        // getLocation(){
        //     alert('得到位置');
        //     this.showMap=true;
        // },
        //条件查询
        search(){
            var obj={};
            if(this.form.address1!=""){
                obj.address=this.form.address1;
            }
            if(this.form.region!=undefined){
                obj.provinceId=this.form.region;
            }
            if(this.form.city!=undefined){
                obj.cityId=this.form.city;
            }
            if(this.form.area!=undefined){
                obj.countyId=this.form.area;
            }
            this.$axios({
                method:'get',
                url:request.testUrl+"/project/auth2/project/projectList",
                params:obj
            }).then(res=>{
                console.log(res.data.data)
                this.areaData=res.data.data.records;
                this.total=res.data.data.total
                this.form={}
            })
        },
        //获取省列表
        getProvinceList(){
            this.$axios.get(request.testUrl+'/project/sysRegion/select',{
                params:{
                    parentId:0
                }
            }).then(res=>{
                // console.log(res.data.data)
                this.provinceList=res.data.data;
                // console.log(this.provinceList)
            })
        },
        // 市区域渲染
        provinceChange(){
            // alert('改变了');
            // console.log(this.form.region);
            //得到城市列表
           this.$axios.get(request.testUrl+'/project/sysRegion/select',{
                params:{
                    parentId:this.form.region
                }
            }).then(res=>{
                // console.log(res.data.data)
                this.cityList=res.data.data;
                console.log(this.cityList)
            })
        },
        //区域渲染
        cityChange(){
            // console.log(this.form.city);
            //得到地区
            this.$axios.get(request.testUrl+'/project/sysRegion/select',{
                params:{
                    parentId:this.form.city
                }
            }).then(res=>{
                // console.log(res.data.data)
                this.areaList=res.data.data;
                console.log(this.areaList)
            })
        },
        //存取批量删除选中值数组
        handleSelectionChange(val){
                this.multipleSelection=val;
                console.log(this.multipleSelection);
        },
        //批量删除
		del(){
			let checkArr=this.multipleSelection;
			if(checkArr.length==0){
				this.$message({
					type:'warning',
					message:'请选中你将要批量删除的数据'
				});
			}
			let params=[];
			checkArr.forEach(item=>{
				params.push(item.id);
			})
			console.log(params);
			this.$axios.post(request.testUrl+'/project/auth2/project/deleteProjectBatch',params)
			.then(res=>{
				console.log(res.data);
				if(res.data.code==0){
					this.$message({
						type:'success',
						message:'删除成功'
					});
					this.renderAreaList();
				}
			})
		},
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
    .pageStyle{
        text-align: center
    }
</style>

