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
		<script type="text/javascript"  charset="utf-8" src="resources/scripts/jquery.min.js"></script>

		<script charset="utf-8" src="editor/kindeditor.js"></script>
		<script charset="utf-8" src="editor/lang/zh_CN.js"></script>

		<script type="text/javascript">
			function IsEmpty(aTextField) {
				if ((aTextField.value.length == 0) || (aTextField.value == null)) {
					return true;
				}else{	return false;}
			}
			function Back(){
				var theForm = document.forms["newsForm"];
				var sid = theForm.sid.value;
				window.location.href= "/csueye/admin/news/newsList/sid/" + sid;
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
						<h5><?php echo $subject->name; ?> > 修改新闻</h5>
					</div>
					<form id="newsForm" name="newsForm" action="<?php echo site_url('admin/news/newsModify')?>" method="post" enctype="multipart/form-data">
					<input type="hidden" name="sid" value="<?php echo $news->subjectID;?>">
					<input type="hidden" name="id" value="<?php echo $news->id;?>">
					<div style="margin-left:20px">
						<div>新闻标题：<input name="title" style="width:300px;height:21px" value="<?php echo $news->title;?>"/></div><br/>
						<div>新闻来源：<input name="source" style="width:300px;height:21px" value="<?php echo $news->source;?>"/></div><br/>
						<div>
							<textarea id="myEditor" name="content" style="width:900px;height:420px;">
								<?php echo $news->content;?>
							</textarea>
								<script>
								    KindEditor.ready(function(K) {
						                window.editor = K.create('#myEditor');
							        });
								</script>
						</div><br/>
						<div><input type="checkbox" name="hasPic"/>新闻索引图：<input type="file" id="fileup" name="picPath" size="40" />
							<label><?php echo $news->picPath;?></label><div><br/>
						<div><input type="checkbox" name="flag" <?php if($news->flag==1){echo "checked";}?>/>推荐到首页</div><br/>						
						<center><div>
							<input type="submit" value="修 改" style="height:23px;width:45px;"/>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="button" onclick="Back()" value="返 回" style="height:23px;width:45px;"/>
						</div></center>
					</div>
					</form>
				</div>
			</div>
		</div>
		</div>
		<?php include("bottom.php"); ?>
	</body>
</html>
