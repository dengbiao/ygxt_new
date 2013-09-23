<div id="header" style="background-color:white">
	<!-- logo -->
	<div id="logo">
		<h1><img src="images/logo.jpg" alt="中南大学爱尔眼科学院网站后台管理系统" /></h1>
	</div>
	<!-- end logo -->
	<!-- user -->
	<ul id="user">
		<?php $login=$this->session->userdata('login');?>
		<li class="first">当前用户：<b><i><?php echo $login->account;?></i></b> 
			<?php echo ($login->isRoot==0 ? "[普通管理员]" : "[超级管理员]");?></li>
		<li class="highlight last"><a href="<?php echo site_url('index.php/admin/logout');?>" onclick="return confirm('您确定要退出系统？')">注销登录</a></li>
	</ul>
	<!-- end user -->
	<div id="header-inner">
		<div id="home">
			<a href="#" title="Home" target="_blank"></a>
		</div>
		<div class="corner tl"></div>
		<div class="corner tr"></div>
	</div>
</div>
<!-- end header -->
