<template>
    <div class="baiduMap">
        <!-- <div class="search">
            <div id="r-result">请输入:<input type="text" id="suggestId" size="20" value="百度" style="width:150px;" /></div>
            <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
        </div>
        <div id="l-map" class="l-map">

        </div>  -->
        <div style="width:100%;height:1200px;margin:0 auto;">   
            要查询的地址：<input id="text_" type="text" value="宁波天一广场" style="margin-right:100px;" v-model="address"/>
            查询结果(经纬度)：<input id="result_" type="text" v-model="result_"/>
            <input type="button" value="查询" @click="searchByStationName();"/>
            <div id="container" 
                style="position: absolute;
                    margin-top:30px; 
                    width: 100%; 
                    height: 750px; 
                    top: 50; 
                    border: 1px solid gray;
                    overflow:hidden;">
            </div>
        </div>
    </div>
</template>
<script>
// var map='';
// var localSearch='';
export default {
    data(){
        return {
          address:'',
          lng:'',
          lat:'' ,
          localSearch:"", 
          map:'',
          result_:''
        }
    },
    methods:{
        // 百度地图API功能
        getMapData(){
            this.map = new BMap.Map("container");
            var map=this.map;
            map.centerAndZoom("宁波", 12);
            map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
            map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

            map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
            map.addControl(new BMap.OverviewMapControl()); //添加默认缩略地图控件
            map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开

            this.localSearch = new BMap.LocalSearch(map);
            var localSearch=this.localSearch;
            console.log(localSearch)
            localSearch.enableAutoViewport(); //允许自动调节窗体大小

        },
        searchByStationName() {
            var map=this.map;
            map.clearOverlays();//清空原来的标注
            var keyword = document.getElementById("text_").value;
            var localSearch=this.localSearch;
            localSearch.setSearchCompleteCallback((searchResult)=>{
            console.log(localSearch)
                var poi = searchResult.getPoi(0);
                // document.getElementById("result_").value = poi.point.lng + "," + poi.point.lat;
                this.result_=poi.point.lng + "," + poi.point.lat;
                this.lng=poi.point.lng;
                this.lat=poi.point.lat;
                map.centerAndZoom(poi.point, 13);
                var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
                map.addOverlay(marker);
                var content = document.getElementById("text_").value + "<br/><br/>经度：" + poi.point.lng + "<br/>纬度：" + poi.point.lat;
                var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + content + "</p>");
                marker.addEventListener("click", ()=>{  this.openInfoWindow(infoWindow);    } );
                // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                console.log( this.lng+"====="+this.lat+"====="+this.address)
            });
            localSearch.search(keyword);
            var lock=setTimeout(()=>{
                // this.$router.go(-1)
                this.$router.push({
                    path:'项目管理',
                    query:{
                        lng:this.lng,
                        lat:this.lat,
                        address:this.address
                    }
                })
                clearTimeout(lock)
            },3000)
        }

    },
    mounted(){
        this.getMapData()
        
    },
    // created(){
    //     this.getData()
    // }
    watch:{
        $route(to,from){
            console.log(to,from)
        }
    }
}
</script>
<style >
        .baiduMap{
            position: relative;
            width:100%;
            height:2000px;
            background-color:#CBE1FF;
        }
        .search{
            /* position:absolute;
            top:20px;
            left:20px; */
            /* background-color: */
            background-color:rgba(0,0,0,0.1);
            width: 100%;
            height:50px;
            /* height:960px; */
        }
		.l-map
        {
            width: 100%;
            height: 750px;
        }
        .addressTxt{
            position:absolute;
            top:10px;
            left:10px;
        }
	
</style>
