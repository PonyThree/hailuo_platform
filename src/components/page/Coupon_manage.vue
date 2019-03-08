<template>
	<div>
		<h2>礼券包管理</h2>
	
		<!--查询导出-->
		<el-form :inline="true" :model="form" class="demo-form-inline">
			<el-form-item label="礼券名称:" style="margin-left: 10px;">
				<el-input v-model="form.name" style="width:260px"></el-input>
			</el-form-item>
			
			<el-form-item label="适用活动类型:" style="margin-left: 100px;">
				<el-select v-model="form.activityTypeId" placeholder="所有类型" style="width:260px">
                    <el-option v-for="item in typeList" :label="item.name" :value="item.id"></el-option>
                </el-select>
			</el-form-item>
			
			<el-form-item id="hhh" style="margin-left: 550px;">
			    <el-button type="primary" @click="onCheck">查询</el-button>
			</el-form-item>
		</el-form>
		
		<!--新增-->
		<el-button class="btn" @click="addGift" style="margin-left: 10px; width:120px;">新增礼券</el-button>
		
		<!--表格列表-->
		<el-table :data="giftTable" border style="width: 100%;margin-left: 10px;">
			<el-table-column prop="num" label="序号" align="center" width="50">
				<template scope="scope">
					<span>{{scope.$index+1}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="礼券名称" align="center" ></el-table-column>
			<el-table-column prop="typeName" label="适用活动类型" align="center" ></el-table-column>
			<el-table-column prop="money" label="礼券面额" align="center" ></el-table-column> 
			<el-table-column prop="data" label="礼券有效期" align="center" >
				<template slot-scope="scope">
					<span>{{scope.row.startTime}}</span>~<p>{{scope.row.endTime}}</p>
                </template>
			</el-table-column>
			
			<el-table-column prop="num" label="礼券库存" align="center" ></el-table-column>
			<el-table-column prop="operation" label="操作" align="center" width="250">
				<template slot-scope="scope">
					<el-button @click="revise">修改库存数量</el-button>
				</template>
			</el-table-column>
			<el-table-column align="center">
				<template slot-scope="scope">
					<el-button @click="check">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column align="center">
				<template slot-scope="scope">
					<el-button @click="delate">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--分页器-->
		<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next,jumper" :total="20">
		</el-pagination>
		
		<!-- 新增提示框 -->
        <el-dialog title="修改礼券库存数量" :visible.sync="modify" width="400px">
            <el-form>
            	<el-form-item  label="礼券数量:">
                	<el-input style="width:260px" placeholder="请输入需要将库存数量修改的数值"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            	<el-button type="primary" @click="saveEdit">提交</el-button>
                <el-button @click="modify = false">取 消</el-button> 
            </span>
        </el-dialog>
        
	</div>
</template>

<script>
	
	export default{
		name:"coupon_manage",
		data(){
			return{
				form:{},
				giftTable:[{}],
				currentPage:1,
				modify:false,
				typeList:[],
				activityTypeId:''
				
			}
		},
		created(){
			//获取活动类型
			
			this.$axios.get("http://192.168.1.114:9919/productpack/selActivityType")
				.then(res=>{
					//console.log(res.data)
					if(res.data.code==0){
						this.typeList=res.data.data
					}
				})
				
				
			this.$axios.post("http://192.168.1.114:9919/productpack/pageData")
				.then(res=>{
					//console.log(res.data)
//					if(res.data.code==0){
//						this.typeList=res.data.data
//					}
				})
				
				
		},
		methods:{
			//查询按钮
			onCheck(){
				var params = new URLSearchParams();	
                params.append('name', this.form.name);
                params.append('activityTypeId', this.form.activityTypeId);
				this.$axios.post("http://192.168.1.114:9919/productpack/pageData",params)
					.then(res=>{
					console.log(res.data)
					
				})
				
				
			},
			//新增礼券
			addGift(){
				this.$router.push({ path: '/Added'}) 
			},
			//修改库存数量
			revise(){
				this.modify=true
			},
			//修改库存数量提交
			saveEdit(){
				
			},
			//查看礼券包
			check(){
				
			},
			//删除礼券
			delate(){
				
			},
			//分页功能
		    handleSizeChange(val) {
		        
		    },
		    handleCurrentChange(val) {
		        
		    },
		    

		}
	}
</script>

<style>
	.demo-form-inline{
		margin-top: 40px;
		
	}
	
	#hhh{
		margin-left: 400px;
	}
	#eeee{
		margin-left: 50px;
	}
	.el-date-table td.today span {
	    color: rgb(50, 65, 87);
	}
	.el-date-table td:hover span{
	    background: rgb(50, 65, 87);
	    color:#fff;
	}
	.el-date-table td.end-date span, .el-date-table td.start-date span {
	    background-color: rgb(50, 65, 87);
	}
	.el-time-panel__btn.confirm {
	    color: rgb(50, 65, 87);
	}
	.el-button--text{
		color:#999;
	}

	.el-button.is-plain:hover {
	    background: #fff;
	    border-color: rgb(50, 65, 87);
	    color: rgb(50, 65, 87);
	}
	.el-button--text:focus, .el-button--text:hover{
		color:#999;
	}
	.el-range-editor.is-active, .el-range-editor.is-active:hover {
	    border-color: rgb(50, 65, 87);
	}
	.el-select-dropdown__item.selected {
	    color: rgb(50, 65, 87);
	}
	.el-select .el-input.is-focus .el-input__inner {
	    border-color: rgb(50, 65, 87);
	}
	.el-button:active {
	    color: #999;
	    border-color: #999;
	}
	.btn{
		margin-top: 40px;
		margin-bottom: 30px;
		width: 100px;
		height: 40px;
		font-size: 16px;
		color:#999;
		letter-spacing: 2px;
	}
	.el-button:focus, .el-button:hover {
	    color: #fff;
	    border-color: rgb(50, 65, 87);
	    background-color: rgb(50, 65, 87);
	}
	.el-pagination li.active {
        background: rgb(50, 65, 87) !important;
    }
    .el-pager li.active {
        color: #fff;
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover {
    	color: #999;
    }
    .el-select .el-input.is-focus .el-input__inner {
    	border-color: #999;
	}
	.el-pagination__sizes .el-input .el-input__inner:hover {
    	border-color: #999;
	}
	.el-select-dropdown__item.selected {
	    background: rgb(50, 65, 87);
	    color:#fff;
	    font-weight: 700;
	}
	.el-pagination{
		margin-top: 20px;
		text-align: center;
	}
	.el-input__inner:focus {
    	border-color: #999;
    }
    .el-dialog__header{
  		background: #999;
  	}
  	.el-pagination.is-background{
  		margin-top: 50px;
  	}
</style>