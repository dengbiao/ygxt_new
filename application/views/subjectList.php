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
						<h5><?php echo $pSubject->name;?> > 栏目列表</h5>
					</div>
					<!-- end box / title -->
					<div class="table">
						<table>
							<thead>
								<tr>
									<!-- <th class="selected last"><input type="checkbox" class="checkall" /></th> -->
									<th>栏目编号</th>
									<th>栏目名称</th>
									<!-- <th>父栏目名</th> -->
									<th>栏目类型</th>
									<th>操 作</th>
								</tr>
							</thead>
							<tbody>
							<?php foreach($subjectList as $key => $subject){?>
								<tr style="text-align:center;">
									<!-- <td class="selected last"><input type="checkbox" /></td> -->
									<td width="50"><?php echo $subject['id']?></td>
									<td width="100"><?php echo $subject['name']?></td>
									<!-- <td width="100"><?php echo $pSubject->name?></td> -->
									<td width="100">
										<?php if($subject['flag']==0){ 
											echo " ———— ";
										}else if($subject['flag']==1){ 
											echo "固定文章";
										}else{
											echo "动态新闻";
										}
										?></td>
									<td width="400">
										<?php $login=$this->session->userdata('login');
											if($login->isRoot!=0){?>
										<a href="<?php echo site_url('admin/subject/toSubjectModify/id/'.$subject['id'])?>">修 改</a>&nbsp;&nbsp;|&nbsp;&nbsp;
										<a href="<?php echo site_url('admin/subject/subjectDel/id/'.$subject['id'])?>" onclick="return confirm('您确定要删除选中记录？')">删 除</a>
										&nbsp;&nbsp;|&nbsp;&nbsp;										
										<?php }?>
										<a href="<?php echo site_url('admin/subject/subjectList/pid/'.$subject['id'])?>"> 子栏目 </a>							 
										<?php if($subject['flag']==1){ ?> 			
											&nbsp;&nbsp;|&nbsp;&nbsp;
											<a href="<?php echo site_url('admin/article/toArticle/sid/'.$subject['id'])?>"> 编辑文章 </a>
										<?php }else if($subject['flag']==2){?>			
											&nbsp;&nbsp;|&nbsp;&nbsp;	
											<a href="<?php echo site_url('admin/news/newsList/sid/'.$subject['id'])?>"> 新闻列表 </a>&nbsp;&nbsp;
											<a href="<?php echo site_url('admin/news/toNewsAdd/sid/'.$subject['id'])?>"> 添加新闻 </a>
										<?php }else if($subject['flag']==3){?>
											&nbsp;&nbsp;|&nbsp;&nbsp;	
											<a href="<?php echo site_url('admin/document/documentList/sid/'.$subject['id'])?>"> 文件列表 </a>&nbsp;&nbsp;
											<a href="<?php echo site_url('admin/document/toDocumentAdd/sid/'.$subject['id'])?>"> 添加文件 </a>
										<?php }?>
									</td>
								</tr>
							<?php
							}
							 ?>
							</tbody>
						</table>
						<br/>
						<?php if($login->isRoot!=0){?>
						<div style="float:right">
							<?php $action=site_url("admin/subject/subjectAdd/pid/".$pSubject->id);?>
							<form action="<?php echo $action;?>" method="post">
							*选择类型:
								<select name="flag">
									<option value="1">固定文章</option>
									<option value="2">动态新闻</option>
									<option value="3">文件资料</option>
								</select>&nbsp;
							*输入名称:<input name="name">
							<input type="submit" value="添加栏目">
							</form>
						</div>
						<?php }?>
					</div>
				</div>
			</div>
			<!-- end content / right -->
		</div>
		<!-- end content -->
<?php include("bottom.php"); ?>
	</body>
</html>