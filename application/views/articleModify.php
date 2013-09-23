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
			function Back(){
				var theForm = document.forms["articleForm"];
				var pid = theForm.pid.value;
				window.location.href= "/csueye/admin/subject/subjectList/pid/" + pid;
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
						<h5><?php echo $subject->name; ?> > 编辑文章</h5>
					</div>
					<form id="articleForm" name="articleForm" action="<?php echo site_url('admin/article/articleModify')?>" method="post">
					<input type="hidden" name="pid" value="<?php echo $subject->parentID;?>">
					<input type="hidden" name="id" value="<?php echo $article->id;?>">
					<div>
						<center><div>文章标题：<input name="title" value="<?php echo $article->title;?>" style="width:300px;height:20px" /></div><br/>
						<div>
							<textarea id="myEditor" name="content" style="width:900px;height:520px;">
								<?php echo $article->content;?>
							</textarea>
								<script>
								    KindEditor.ready(function(K) {
						                window.editor = K.create('#myEditor');
							        });
								</script>
						</div><br/>
						<div>
							<input type="submit" value="修 改 " style="height:23px;width:45px;"/>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="button" onclick="Back()" value="返 回" style="height:23px;width:45px;"/>
						</div>
						</center>
					</div>
					</form>
				</div>
			</div>
		</div>
		</div>
		<?php include("bottom.php"); ?>
	</body>
</html>
