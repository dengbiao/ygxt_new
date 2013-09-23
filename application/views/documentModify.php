<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>中南大学爱尔眼科学院网站后台管理系统</title>
		<base href="<?php echo base_url()?>"/>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<!-- stylesheets -->
		<link rel="stylesheet" type="text/css" href="resources/css/reset.css" />
		<link rel="stylesheet" type="text/css" href="resources/css/style.css" media="screen" />
		<link id="color" rel="stylesheet" type="text/css" href="resources/css/colors/blue.css" />

		<script charset="utf-8" src="editor/kindeditor.js"></script>
		<script charset="utf-8" src="editor/lang/zh_CN.js"></script>

		<script type="text/javascript">
			function IsEmpty(aTextField) {
				if ((aTextField.value.length == 0) || (aTextField.value == null)) {
					return true;
				}else{	return false;}
			}
			function Validator(){
				var theForm = document.forms["docForm"];
				if (!theForm) {
					theForm = document.forms(0);
				}
				if (IsEmpty(theForm.title)) {
					alert("标题不能为空!");
					return;
				}
				theForm.submit();
			}
			function Back(){
				var theForm = document.forms["docForm"];
				var sid = theForm.sid.value;
				window.location.href= "/csueye/admin/document/documentList/sid/" + sid;
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
						<h5><?php echo $subject->name; ?> > 修改文件</h5>
					</div>
					<form id="docForm" name="docForm" action="<?php echo site_url('admin/document/documentModify')?>" method="post" method="post" enctype="multipart/form-data">
						<input type="hidden" name="id" value="<?php echo $document->id;?>">
					<input type="hidden" name="sid" value="<?php echo $document->subjectID;?>">
					<div class="form">
						<div class="fields">
							<div class="field field-first">
								<div class="label">
									<label for="input-small">输入标题:</label>
								</div>
								<div class="input">
									<input type="text" id="title" name="title" class="small" value="<?php echo $document->title;?>"/>
								</div>
							</div>
							<div class="field">
								<div class="label">
									<label for="input-small">文件描述:</label>
								</div>
								<div class="input">
									<textarea name="brief" rows=8 cols=80>
									<?php echo $document->brief;?></textarea>
								</div>
							</div>						
							<div class="field">
								<div class="label label-radio">
									<label>上传文件:</label>
								</div>
								<div class="input">
									<input type="file" id="docPath" name="docPath" size="40" />
								</div>
								<div style="margin-top:10px"><?php echo $document->path;?></div>
							</div>
							<div class="buttons">
								<input type="button" onclick="Validator()" value="修 改" style="height:23px;width:45px;"/>
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
