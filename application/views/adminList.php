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
		<div id="content">
			<?php include("left.php"); ?>
			<!-- content / right -->
			<div id="right">
				<!-- table -->
				<div class="box">
					<!-- box / title -->
					<div class="title">
						<h5>管理员列表</h5>
						<div class="search">
							<form action="<?php echo site_url('admin/admin/adminSearch');?>" method="post">
								<div class="input">
									<span style="font-weight:bold;">输入用户名:</span>
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
									<th>用户名</th>
									<th>管理员类型</th>
									<th>真实姓名</th>
									<th>最近登录</th>
									<th>登录IP</th>
									<th>登录次数</th>
									<th>状 态</th>
									<th>操 作</th>
								</tr>
							</thead>
							<tbody>
							<?php 
								$login=$this->session->userdata('login');
								foreach($adminList as $key => $admin){?>
								<tr align="center">
									<!-- <td class="selected last"><input type="checkbox" /></td> -->
									<td><?php echo $admin['account']?></td>
									<td>
										<?php echo ($admin['isRoot']==0 ? "普通管理员" : "系统管理员");?></td>
									<td><?php echo $admin['realName'];?></td>
									<td><?php echo $admin['lastLoginTime'];?></td>
									<td><?php echo $admin['lastLoginIP'];?></td>
									<td><?php echo $admin['loginCount'];?></td>
									<td>
										<?php if($admin['enable']==1){echo "正 常";}else{echo "已冻结";} ?>
									<td>										
										<?php if($admin['isRoot']==0 || $admin['account']==$login->account || $login->isRoot==-1){?>
											<a href="<?php echo site_url('admin/admin/toAdminModify/account/'.$admin['account'])?>">修改</a>
										<?php }?>
										<?php if($admin['isRoot']==0 || ($login->isRoot==-1 && $admin['account']!=$login->account)){ ?>
											&nbsp;&nbsp;|&nbsp;&nbsp;										
											<a href="<?php echo site_url('admin/admin/adminDel/account/'.$admin['account'])?>" onclick="return confirm('您确定要删除该记录？')">删除</a>&nbsp;&nbsp;|&nbsp;&nbsp;
											<?php if($admin['enable']==1){ 
												$url = site_url("admin/admin/adminEnable/account/".$admin['account']."/enable/0");
												echo "<a href='".$url."'>冻结</a>";
											}else{
												$url = site_url("admin/admin/adminEnable/account/".$admin['account']."/enable/1");
												echo "<a href='".$url."'>解冻</a>";
											}?>
										<?php }?>
										
									</td>
								</tr>
							<?php
							}
							 ?>
							</tbody>
						</table>
						<!-- pagination -->
						<div class="pagination pagination-left">
							<div class="results">
								<span>总共<?php echo $total_num;?>条目</span>
							</div>
							<ul class="pager">
								<?php echo $pager?>
								</ul>
						</div>
						<div style="float:right">
							<a href="/csueye/admin/admin/toAdminAdd"><b> + 添加用户</b></a> &nbsp;&nbsp;
						</div>
						<!-- end pagination -->
						</form>
					</div>
				</div>
			</div>
			<!-- end content / right -->
		</div>
		<!-- end content -->
<?php include("bottom.php"); ?>
	</body>
</html>