<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>中南大学爱尔眼科网站后台管理系统</title>
		<base href="<?php echo base_url()?>"/>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<!-- stylesheets -->
		<link rel="stylesheet" type="text/css" href="resources/css/reset.css" />
		<link rel="stylesheet" type="text/css" href="resources/css/style.css" media="screen" />
		<style type="text/css">

		.page {border-top:1px solid #dfdfdf; padding-top: 10px; text-align: left; margin-bottom: 10px; font-size: 14px;}
		.page a {margin: 0 5px 0 0; padding: 3px 6px; border: 1px solid #D1D1D1;}
		.page .current{margin: 0 5px 0 0; padding: 3px 6px; border: 1px solid #A4A4A4; background:#EBEBEB; }
		.page a { color:#333; text-decoration:none;}
		.page a:hover {border-color:#AAA !important; background:#FAFAFA; color: #000 !important; text-decoration:underline;}


		</style>
		<link id="color" rel="stylesheet" type="text/css" href="resources/css/colors/blue.css" />
		<!-- scripts (jquery) -->
		<script src="resources/scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
		<!--[if IE]><script language="javascript" type="text/javascript" src="resources/scripts/excanvas.min.js"></script><![endif]-->
		<script src="resources/scripts/jquery-ui-1.8.custom.min.js" type="text/javascript"></script>
		<script src="resources/scripts/jquery.ui.selectmenu.js" type="text/javascript"></script>
		<script src="resources/scripts/jquery.flot.min.js" type="text/javascript"></script>
		<script src="resources/scripts/tiny_mce/tiny_mce.js" type="text/javascript"></script>
		<script src="resources/scripts/tiny_mce/jquery.tinymce.js" type="text/javascript"></script>
		<!-- scripts (custom) -->
		<script src="resources/scripts/smooth.js" type="text/javascript"></script>
		<script src="resources/scripts/smooth.menu.js" type="text/javascript"></script>
		<script src="resources/scripts/smooth.chart.js" type="text/javascript"></script>
		<script src="resources/scripts/smooth.table.js" type="text/javascript"></script>
		<script src="resources/scripts/smooth.form.js" type="text/javascript"></script>
		<script src="resources/scripts/smooth.dialog.js" type="text/javascript"></script>
		<script src="resources/scripts/smooth.autocomplete.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(document).ready(function () {
				style_path = "resources/css/colors";

				$("#date-picker").datepicker();

				$("#box-tabs, #box-left-tabs").tabs();
			});
		</script>
		<script type="text/javascript">
			function IsEmpty(aTextField) {
				if ((aTextField.value.length == 0) || (aTextField.value == null)) {
					return true;
				} else {
					return false;
				}
			}
			
			function Validator(){
				var theForm = document.forms["typeForm"];
				if (!theForm) {
					theForm = document.forms(0);
					alert('1');
				}
				if (IsEmpty(theForm.name)) {
					alert("栏目名称不能为空!");
					return;
				}
				theForm.submit();
			}
			function Back(){
				var theForm = document.forms["typeForm"];
				var pid = theForm.pid.value;
				window.location.href = "/csueye/admin/subject/subjectList/pid/" + pid;
				return true;
			}
		</script>
	</head>
	<body>
		<?php include("top.php"); ?>

		<!-- content -->
		<div id="content">
			<?php include("left.php"); ?>
			<!-- content / right -->
			<div id="right">
				<!-- table -->
				<div class="box">
					<!-- box / title -->
					<div class="title">
						<h5><?php $subject->name;?> > 修改栏目信息</h5>
					</div>
					<!-- end box / title -->
					<form id="typeForm" name="typeForm" action="<?php echo site_url('admin/subject/subjectModify')?>" method="post">
					<input type="hidden" id="pid" name="pid" value="<?php echo $subject->parentID;?>"/>
					<input type="hidden" id="id" name="id" value="<?php echo $subject->id;?>"/>
					<table >
						<?php if($subject->flag!=0){?>
						<tr>
							<td align="right">栏目类型：</td>
							<td>								
							<input type="radio" name="flag" value="1" <?php if($subject->flag==1) echo "checked='true'";?>/>
							固定文章 &nbsp;&nbsp;&nbsp;&nbsp;
							<input type="radio" name="flag" value="2" <?php if($subject->flag==2) echo "checked='true'";?>/>
							动态新闻 &nbsp;&nbsp;&nbsp;&nbsp;
							<input type="radio" name="flag" value="3" <?php if($subject->flag==3) echo "checked='true'";?>/>
							文件资料 &nbsp;&nbsp;&nbsp;&nbsp;
							</td>
						</tr>
						<?php }?>
						<tr>
						<td align="right">栏目名称：</td>
						<td><input type="text" id="name" name="name" class="small" value="<?php echo $subject->name;?>"/></td>
						</tr>
						<tr>
						<td align="right">栏目简介：</td>
						<td><input type="text" id="brief" name="brief" class="small" value="<?php echo $subject->brief;?>"/></td>
						</tr>
						<tr>
							<td colspan=2 align="center">
								<input type="button" onclick="Validator()" value="修 改" style="height:23px;width:45px;"/>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<input type="button" onclick="Back()" value="返 回" style="height:23px;width:45px;"/>
							</td>
						</tr>
					</table>
					</form>
				</div>
				<!-- end forms -->
	
			</div>
			<!-- end content / right -->
		</div>
</div>
		<!-- end content -->
		<?php include("bottom.php"); ?>
	</body>
</html>
