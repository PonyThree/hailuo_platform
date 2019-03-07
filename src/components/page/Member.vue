<template>
	<div>
		<h2>活动成员</h2>
			<!--查询导出-->
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="参与活动时间范围:" style="margin-left: 10px;">
					<el-date-picker v-model="form.data" :picker-options="pickerOptions" type="datetimerange" range-separator="至" start-placeholder="搜索开始日期" end-placeholder="搜索结束日期" align="right" size="small" >
					</el-date-picker>
				</el-form-item>
				
				<el-form-item  label="手机号:" style="margin-left: 100px;">
	                <el-input v-model="form.phone" style="width:160px"></el-input>
	            </el-form-item>
				
				<el-form-item id="hhh">
				    <el-button type="primary" @click="onCheck">查询</el-button>
				    <el-button type="primary" @click="onExport" id="eeee">导出</el-button>
				</el-form-item>
			</el-form>
			
			<!--新增-->
			<el-button class="btn" @click="addMember" style="margin-left: 10px;">新增成员</el-button>
			
			<!--表格列表-->
			<el-table :data="memberTable" border style="width: 50%;margin-left: 10px;">
				<el-table-column prop="num" label="序号" align="center" width="50"></el-table-column>
				<el-table-column prop="phone" label="用户手机号" align="center" ></el-table-column>
				<el-table-column prop="data" label="参与活动时间" align="center" ></el-table-column> 
				<el-table-column prop="operation" label="操作" align="center" width="250">
					<template slot-scope="scope">
	                    <el-button @click="revise">删除成员</el-button>
	                </template>
				</el-table-column>
			</el-table>
			
			<!--分页器-->
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next,jumper" :total="20">
			</el-pagination>
			
			
			<!-- 新增提示框 -->
	        <el-dialog title="新增选项" :visible.sync="addPhone" width="350px">
	            <el-form>
	            	<el-form-item  label="手机号:">
	                	<el-input placeholder="请输入需要添加成员的手机号" style="width:220px"></el-input>
	                </el-form-item>
	            </el-form>
	            <span slot="footer" class="dialog-footer">
	            	<el-button type="primary" @click="saveEdit">提交</el-button>
	                <el-button @click="addPhone = false">取 消</el-button> 
	            </span>
	        </el-dialog>
	</div>
</template>

<script>
	export default{
		name:"member",
		data(){
			return{
				form:{},
				memberTable:[{}],
				pickerOptions:{
					
				},
				currentPage:1,
				addPhone:false,
			}
		},
		methods:{
			//查询按钮
			onCheck(){},
			//导出
			onExport(){},
			//新增成员按钮
			addMember(){
				this.addPhone=true;
			},
			//删除成员按钮
			revise(){
				
			},
			//分页功能
		    handleSizeChange(val) {
		        
		    },
		    handleCurrentChange(val) {
		        
		    },
		    //弹框保存
		    saveEdit(){
		    	
		    }
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