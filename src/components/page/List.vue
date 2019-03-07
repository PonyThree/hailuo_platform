<template>
	<div>
		<h2>团列表</h2>
		<div class="container">
			<!--查询-->
			<el-form :inline="true" :model="form" class="demo-form-inline" style="margin-bottom: 50px;">
				<el-form-item label="团时间:" >
					<el-date-picker v-model="form.data" :picker-options="pickerOptions" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" size="small" >
					</el-date-picker>
				</el-form-item>
				&nbsp;&nbsp;&nbsp;&nbsp;	
				<el-form-item  label="团类型:">
	                <el-select v-model="form.typeRegion" placeholder="所有类型">
	                    <el-option key="bb" label="我要当团长" value="bb"></el-option>
	                    <el-option key="cc" label="三人拼团" value="cc"></el-option>
	                    <el-option key="dd" label="万人拼团" value="dd"></el-option>
	                </el-select>
	            </el-form-item>
	           
				&nbsp;&nbsp;	
				<el-form-item  label="团状态:">
	                <el-select v-model="form.stateRegion" placeholder="所有状态">
	                    <el-option key="ee" label="已达成" value="ee"></el-option>
	                    <el-option key="ff" label="活动中" value="ff"></el-option>
	                    <el-option key="gg" label="活动失败" value="gg"></el-option>
	                </el-select>
	            </el-form-item>
	            
	            &nbsp;&nbsp;
	            <el-form-item label="团编号:" >
					<el-date-picker v-model="value" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				
	            &nbsp;&nbsp;&nbsp;&nbsp;
				<el-form-item>
				    <el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
			
			<!--表格-->
			<el-table :data="groupData" border style="width: 100%">
				<el-table-column prop="num" label="序号" align="center" width="50"></el-table-column>
				<el-table-column prop="number" label="团编号" align="center" ></el-table-column>
				<el-table-column prop="type" label="活动类型" align="center" ></el-table-column> 
				<el-table-column prop="name" label="活动名称" align="center" ></el-table-column>
				<el-table-column prop="begin" label="团开始时间" align="center" width="250"></el-table-column>
				<el-table-column prop="end" label="团终止时间" align="center" ></el-table-column>
				<el-table-column prop="goal" label="活动目标" align="center" ></el-table-column>
				<el-table-column prop="member" label="团成员" align="center" >
					<template slot-scope="scope">
						<el-button icon="el-icon-check" @click="checkMember">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="code" label="团推广二维码" align="center" >
					<template slot-scope="scope">
						<el-button icon="el-icon-check" @click="checkCode">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="info" label="信息操作" align="center">
	                <template slot-scope="scope">
						<el-button icon="el-icon-check" @click="checkInfo">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			
			
			<!--分页器-->
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next,jumper"  :total="20">
			</el-pagination>
            
		</div>
	</div>
</template>

<script>
	export default{
		name:"list",
		data(){
			return{
				form:{},
				value:'',
				groupData:[{
					
				}],
				currentPage: 1,
			}
		},
		methods:{
			//日期
			pickerOptions(){
				
			},
			//查询按钮
			onSubmit(){
				
			},
			//查看团成员
			checkMember(){
				
			},
			//查看推广二维码
			checkCode(){
				
			},
			//查看活动详情页
			checkInfo(){
				
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
	.container{
		margin-top: 40px;
		height: auto;
		overflow: hidden;
	}
	.el-button:focus, .el-button:hover {
	    color: #fff;
	    border-color: rgb(50, 65, 87);
	    background-color: rgb(50, 65, 87);
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
	.el-pagination li.active {
        background: rgb(50, 65, 87) !important;
    }
    .el-pager li.active {
        color: #fff;
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover {
    	color: #999;
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
	
	
	
</style>