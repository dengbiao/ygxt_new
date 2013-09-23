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
						<h5><?php echo $subject->name?> > 新闻列表</h5>
						<div class="search">
							<form action="<?php echo site_url('admin/news/newsSearch');?>" method="post">
								<input type="hidden" name="sid" value="<?php echo $subject->id;?>" />
								<div class="input">
									<span style="font-weight:bold;">输入关键词:</span>
									<input type="text" id="info" name="info" />
								</div>
								<div class="button">
									<input type="submit" name="submit" value="查 询" style="height:23px;width:50px;"/>
								</div>
							</form>
						</div>
					</div>
					<!-- end box / title -->
					<div class="table">
						<form action="" method="post">
						<table>
							<thead>
								<tr>
									<th>编号</th>
									<th>新闻标题</th>
									<th>所属栏目</th>
									<th>发布人</th>
									<th>发布时间</th>
									<th>首页推荐</th>
									<th>点击量</th>
									<th>操 作</th>
								</tr>
							</thead>
							<tbody>
							<?php foreach($newsList as $key => $news){?>
								<tr style="text-align:center;">
									<td width="30"><?php echo $news['id']?></td>
									<td width="250"><?php echo $news['title']?></td>
									<td width="60"><?php echo $subject->name?></td>
									<td width="50"><?php echo $news['author']?></td>
									<td width="130"><?php echo $news['addTime']?></td>
									<td width="55"><?php echo ($news['flag']==1 ? "是" : "否");?></td>
									<td width="50"><?php echo $news['clickCount']?></td>
									<td width="100">
										<a href="<?php echo site_url('admin/news/toNewsModify/id/'.$news['id'])?>">修 改</a>
										&nbsp;&nbsp;|&nbsp;&nbsp;
										<a href="<?php echo site_url('admin/news/newsDel/id/'.$news['id'])?>" onclick="return confirm('您确定要删除该记录？')">删 除</a>
									</td>
								</tr>
							<?php
							}
							 ?>
							</tbody>
						</table>
						<div class="pagination pagination-left">
							<div class="results">
								<span>总共<?php echo $total_num;?>条目</span>
							</div>
							<ul class="pager">
								<?php echo $pager?>
							</ul>
						</div>
						<div style="float:right">
							<a href="<?php echo site_url('/admin/news/toNewsAdd/sid/'.$subject->id)?>"><b> + 添加新闻</b></a> 
							&nbsp;&nbsp;
						</div>
						</form>
					</div>
				</div>	
			</div>
		</div>
<?php include("bottom.php"); ?>
	</body>
</html>