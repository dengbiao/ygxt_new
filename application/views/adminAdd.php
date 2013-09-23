<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>中南大学爱尔眼科学院网站后台管理系统</title>
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
	
		<script type="text/javascript">
			function IsEmpty(aTextField) {
				if ((aTextField.value.length == 0) || (aTextField.value == null)) {
					return true;
				}else{
				 	return false;
				}
			}
			function Validator(){
				var theForm = document.forms["adminForm"];
				if (!theForm) {
					theForm = document.forms(0);
				}
				if (IsEmpty(theForm.account)) {
					alert("用户名不能为空!");
					return;
				}
				if (IsEmpty(theForm.password1)||IsEmpty(theForm.password2)) {
					alert("密码不能为空!");
					return;
				}
				if(theForm.password1.value!=theForm.password2.value){
					alert("两次密码不一致!");
					return;
				}
				if (IsEmpty(theForm.realName)) {
					alert("真实姓名不能为空!");
					return;
				}
				theForm.submit();
			}
			function Back(){
				window.location.href= "<?php echo site_url('admin/admin/adminList');?>";
				return true;
			}
		</script>
	</head>
	<body>
		<?php include("top.php"); ?>
		<div id="content">
			<?php include("left.php"); ?>
			<div id="right">
				<div class="box">
					<div class="title">
						<h5>添加管理员</h5>
					</div>
					<form id="adminForm" name="adminForm" action="<?php echo site_url('admin/admin/adminAdd')?>" method="post">
					<div class="form">
						<div class="fields">
							<div class="field field-first">
								<div class="label">
									<label for="input-small">用户名:</label>
								</div>
								<div class="input">
									<input type="text" id="account" name="account" class="small"/>
								</div>
							</div>
							<div class="field ">
								<div class="label">
									<label for="input-small">输入密码:</label>
								</div>
								<div class="input">
									<input type="password" id="password1" name="password1" class="small"/>
								</div>
							</div>
							<div class="field">
								<div class="label">
									<label for="input-small">确认密码:</label>
								</div>
								<div class="input">
									<input type="password" id="password2" name="password2" class="small"/>
								</div>
							</div>
							<div class="field">
								<div class="label">
									<label for="input-small">真实姓名:</label>
								</div>
								<div class="input">
									<input type="text" id="realName" name="realName" class="small"/>
								</div>
							</div>						
							<div class="field">
								<div class="label label-radio">
									<label>管理员类型:</label>
								</div>
								<div class="radios">
									<div class="radio">
										<label>
											<input type="radio" name="isRoot" value="0" checked=true/>
											&nbsp;普通管理员 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</label> 
										<label>
											<input type="radio" name="isRoot" value="1"/>
											&nbsp;超级管理员
										</label>
									</div>
								</div>
							</div>
							<div class="buttons">
								<input type="button" onclick="Validator()" value="添 加" style="height:23px;width:45px;"/>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<input type="button" onclick="Back()" value="返 回" style="height:23px;width:45px;"/>
							</div>
						</div>
					</div>
					</form>
				</div>
			</div>
		</div>
</div>
		<?php include("bottom.php"); ?>
	</body>
</html>