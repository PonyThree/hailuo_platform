<template>
	<div>
		<h2>活动管理</h2>

			<!--查询导出-->
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="活动有效期：" >
					<el-date-picker v-model="form.value" :picker-options="pickerOptions" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" size="small" >
					</el-date-picker>
				</el-form-item>
				&nbsp;&nbsp;&nbsp;&nbsp;	
				<el-form-item  label="活动状态：">
	                <el-select v-model="form.region" placeholder="请选择">
	                    <el-option key="bbk" label="所有状态" value="bbk"></el-option>
	                    <el-option key="xtc" label="已关闭" value="xtc"></el-option>
	                    <el-option key="imoo" label="发布" value="imoo"></el-option>
	                </el-select>
	            </el-form-item>
				
				<el-form-item id="hhh">
				    <el-button type="primary" @click="onSubmit">查询</el-button>
				    <el-button type="primary" @click="onExport" id="eeee">导出</el-button>
				</el-form-item>
			</el-form>
			
			<!--新增-->
			<el-button class="btn" @click="addActivity">新增</el-button>
			
			<!--表格列表-->
			<el-table :data="tableActivity" border style="width: 100%">
				<el-table-column prop="num" label="序号" align="center" width="50"></el-table-column>
				<el-table-column prop="number" label="活动编号" align="center" ></el-table-column>
				<el-table-column prop="name" label="活动名称" align="center" ></el-table-column> 
				<el-table-column prop="type" label="活动类型" align="center" ></el-table-column>
				<el-table-column prop="originator" label="活动发起方" align="center" ></el-table-column>
				<el-table-column prop="production" label="活动有效期" align="center" width="250"></el-table-column>
				<el-table-column prop="state" label="活动状态" align="center" ></el-table-column>
				<el-table-column prop="sort" label="首页排序" align="center" ></el-table-column>
				<el-table-column prop="operation" label="操作" align="center" width="250">
					<template slot-scope="scope">
	                    <el-button @click="revise(scope.$index, scope.row)">修改时限</el-button>
	                    <el-button @click="derail">关闭活动</el-button>
	                </template>
				</el-table-column>
				<el-table-column prop="editor" label="信息操作" align="center" >
					<template slot-scope="scope">
						<el-button icon="el-icon-edit" @click="handleEdit">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			
			<!--分页器-->
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next,jumper" :total="20">
			</el-pagination>
			
			<!-- 新增提示框 -->
	        <el-dialog title="新增选项" :visible.sync="addChoice" width="400px">
	            <el-form>
	            	<el-form-item  label="活动状态：">
	                <el-select v-model="form.region" placeholder="请选择活动类型">
	                    <el-option key="many" label="多人拼团" value="many"></el-option>
	                    <el-option key="absolutely" label="万人众筹" value="absolutely"></el-option>
	                    <el-option key="colonel" label="我要当团长" value="colonel"></el-option>
	                </el-select>
	                </el-form-item>
	            </el-form>
	            <span slot="footer" class="dialog-footer">
	            	<el-button type="primary" @click="saveEdit">保存</el-button>
	                <el-button @click="addChoice = false">取 消</el-button> 
	            </span>
	        </el-dialog>

	</div>
</template>

<script>
	export default{
		name:'activity',
		data(){
			return{
				value:"",
				pickerOptions:{
					
				},
				input:"",
				form:{
					regin:"",
					value:"",
				},
				tableActivity:[
					{
					
				}
				],
				currentPage4: 1,
				addChoice:false,
			}
		},
		methods:{
			//查询按钮
			onSubmit(){
				
			},
			//导出按钮
			onExport(){
			},
			//新增表格按钮
			addActivity(){
				this.addChoice=true;
			},
			//编辑按钮
			handleEdit(){
				
			},
			//修改时限按钮
			revise(){
				
			},
			//关闭活动按钮
			derail(){
				
			},
			//分页功能
		    handleSizeChange(val) {
		        
		    },
		    handleCurrentChange(val) {
		        
		    },
		    //新增选项
		    saveEdit(){
		    	
		    }
		}
	}
</script>

<style>
	
	.demo-form-inline{
		margin-top: 40px;
		
	}
	/*.el-form-item__label{
		margin-left: 50px;
	}*/
	#hhh{
		margin-left: 450px;
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