<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>中南大学透明计算实验室网站后台管理系统</title>
		<base href="<?php echo base_url()?>"/>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	</head>
	<body>
		<div id="left">
			<div id="menu">
				<h6 id="h-menu-products" class="selected"><span>栏目管理</span></h6>
				<ul id="menu-products" class="opened">
					<li><a href="<?php echo site_url('subject/subjectList/pid/1')?>">学院概况</a></li>
					<li><a href="<?php echo site_url('subject/subjectList/pid/2')?>">教育教学</a></li>
					<li><a href="<?php echo site_url('subject/subjectList/pid/3')?>">科学研究</a></li>
					<li><a href="<?php echo site_url('subject/subjectList/pid/4')?>">学生风采</a></li>
					<li><a href="<?php echo site_url('subject/subjectList/pid/5')?>">招生就业</a></li>
					<li><a href="<?php echo site_url('subject/subjectList/pid/6')?>">下载中心</a></li>
				</ul>
				<!-- <h6 id="h-menu-products" class="selected"><span>学院概况</span></h6>
				<ul id="menu-products" class="opened">
					<li><a href="<?php echo site_url('subject/subjectList/pid/1')?>">栏目管理</a></li>
					<li><a href="<?php echo site_url('news/newsList/rid/1')?>">新闻管理</a></li>
				</ul>
				<h6 id="h-menu-products" class="selected"><span>教育教学</span></h6>
				<ul id="menu-products" class="opened">
					<li><a href="<?php echo site_url('subject/subjectList/pid/2')?>">栏目管理</a></li>
					<li><a href="<?php echo site_url('news/newsList/rid/1')?>">新闻管理</a></li>
				</ul>
				<h6 id="h-menu-products" class="selected"><span>科学研究</span></h6>
				<ul id="menu-products" class="opened">
					<li><a href="<?php echo site_url('subject/subjectList/pid/3')?>">栏目管理</a></li>
					<li><a href="<?php echo site_url('news/newsList/rid/1')?>">新闻管理</a></li>
				</ul>
				<h6 id="h-menu-products" class="selected"><span>学生风采</span></h6>
				<ul id="menu-products" class="opened">
					<li><a href="<?php echo site_url('subject/subjectList/pid/4')?>">栏目管理</a></li>
					<li><a href="<?php echo site_url('news/newsList/rid/1')?>">新闻管理</a></li>
				</ul>
				<h6 id="h-menu-products" class="selected"><span>招生就业</span></h6>
				<ul id="menu-products" class="opened">
					<li><a href="<?php echo site_url('subject/subjectList/pid/5')?>">栏目管理</a></li>
					<li><a href="<?php echo site_url('news/newsList/rid/1')?>">新闻管理</a></li>
				</ul>
				<h6 id="h-menu-products" class="selected"><span>下载中心</span></h6>
				<ul id="menu-products" class="opened">
					<li><a href="<?php echo site_url('subject/subjectList/pid/6')?>">栏目管理</a></li>
					<li><a href="#">文件管理</a></li>
				</ul> -->
				<!-- <h6 id="h-menu-events" class="selected"><span>菜单管理</span></h6>
				<ul id="menu-events" class="opened">
					<li class="last"><a href="<?php echo site_url('newsType/menuList')?>">菜单列表</a></li>
				</ul> -->
				<?php 
					$admin = $this->session->userdata('admin');
					if($admin->isRoot==1){
					echo "<h6 id='h-menu-events' class='selected'><span>用户信息</span></h6>
						<ul id='menu-events' class='opened'>
						<li><a href='/csueye/admin/toAdminAdd'>添加用户</a></li>
						<li class='last'><a href='/csueye/admin/adminList'>用户管理</a></li></ul>";
				};?>
			</div>
			<div id="date-picker"></div>
		</div>
	</body>
</html>