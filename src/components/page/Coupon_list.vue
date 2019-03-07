<template>
	<div>
		<h2>礼券列表</h2>
		<!--查询导出-->
		<el-form :inline="true" :model="form" class="demo-form-inline" style="margin-bottom: 40px;">
			<el-form-item label="礼券名称：" style="margin-right: 30px;">
				<el-input v-model="form.name" style="width:180px"></el-input>
			</el-form-item>
			
			<el-form-item label="礼券编号：" style="margin-right: 30px;">
				<el-input v-model="form.num" style="width:180px"></el-input>
			</el-form-item>
			
			<el-form-item  label="适用活动类型:" style="margin-right: 30px;">
                <el-select v-model="form.region" >
                	<el-option key="aa" label="所有类型" value="aa"></el-option>
                    <el-option key="bb" label="我要当团长" value="bb"></el-option>
                    <el-option key="cc" label="三人拼团" value="cc"></el-option>
                    <el-option key="dd" label="万人拼团" value="dd"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item  label="礼券状态:" style="margin-right: 30px;">
                <el-select v-model="form.state">
                	<el-option key="ee" label="所有状态" value="ee"></el-option>
                    <el-option key="ff" label="未使用" value="ff"></el-option>
                    <el-option key="gg" label="已验证" value="gg"></el-option>
                    <el-option key="hh" label="已过期" value="hh"></el-option>
                </el-select>
            </el-form-item>
			
			<el-form-item style="margin-left: 200px;">
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			    <el-button type="primary" @click="onExport">导出</el-button>
			</el-form-item>
		</el-form>
			
		<!--表格列表-->
		<el-table :data="tableCoupon" border style="width: 100%;margin-bottom:50px;">
			<el-table-column prop="num" label="序号" align="center" width="50"></el-table-column>
			<el-table-column prop="number" label="礼券编号" align="center" ></el-table-column>
			<el-table-column prop="name" label="礼券名称" align="center" ></el-table-column> 
			<el-table-column prop="type" label="适用活动类型" align="center" ></el-table-column>
			<el-table-column prop="quota" label="礼券额度" align="center" ></el-table-column>
			<el-table-column prop="production" label="礼券有效期" align="center"></el-table-column>
			<el-table-column prop="begin" label="礼券创建时间" align="center"></el-table-column>
			<el-table-column prop="state" label="活动规则" align="center" ></el-table-column>
			<el-table-column prop="phone" label="所属人手机号"  align="center" ></el-table-column>
			<el-table-column prop="code" label="所属活动编码" align="center" ></el-table-column>
			<el-table-column prop="getDate" label="礼券获得时间" align="center" ></el-table-column>
			<el-table-column prop="status" label="礼券状态" align="center" ></el-table-column>
			<el-table-column prop="suit" label="核销人" align="center" ></el-table-column>
			<el-table-column prop="suitData" label="核销时间" align="center" ></el-table-column>
			
			<el-table-column prop="operation" label="操作" align="center">
				<template slot-scope="scope">
                    <el-button @click="derail">核销</el-button>
                </template>
			</el-table-column>
			
			<el-table-column >
				<template slot-scope="scope">
					<el-button icon="el-icon-edit" @click="handleEdit">查看</el-button>
				</template>
			</el-table-column>
		</el-table>	
		
		<!--分页器-->
		<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next,jumper" :total="0">
		</el-pagination>
		
			
	</div>
</template>

<script>
	export default{
		name:"coupon_list",
		data(){
			return{
				form:{},
				tableCoupon:[{}],
				currentPage:1,

			}
		},    
		methods:{
			//查询按钮
			onSubmit(){
				
			},
			//导出按钮
			onExport(){
				
			},
			//核销按钮
			derail(){
				
			},
			//查看按钮
			handleEdit(){
				
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
		margin-bottom: 15px;
		width: 80px;
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
</style>