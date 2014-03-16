<header id="header">
	<nav class="navbar navbar-default">
		<div class="collapse navbar-collapse" id="topnav">

			<ul class="nav navbar-nav header-navbar navbar-right">
				<li class="dropdown">
					<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
						<i class="glyphicon glyphicon-user"></i> Admin <b class="caret"></b>
					</a>
					<ul class="dropdown-menu">
						<li><a href="#"><i class="glyphicon glyphicon-wrench"></i> Settings</a></li>
						<li><a href="<?= URL::route('logout'); ?>"><i class="glyphicon glyphicon-off"></i> Logout</a></li>
					</ul>
				</li>
			</ul>


			<ul class="nav nav-pills nav-stacked navbar-left">
				<li>
					<a class="navbar-brand" id="brand" href="<?= URL::route('home'); ?>"><img style="height: 29px" src="images/logo.png" /></a>
				</li>
			</ul>
			

			<ul class="nav navbar-nav header-navbar navbar-left">
				<li class="dropdown <? if(Route::currentRouteName() === "home") echo "active"; ?>">
					<a href="<?= URL::route('home'); ?>">
						<i class="glyphicon glyphicon-home"></i> Home
					</a>
				</li>

				<li class="dropdown <? if(Route::currentRouteName() === "get analysis") echo "active"; ?>">
					<a href="<?= URL::route('analysis');  ?>">
						<i class="glyphicon glyphicon-stats"></i> Insights
					</a>
				</li>
			</ul>

		</div>
	</nav>

</header>