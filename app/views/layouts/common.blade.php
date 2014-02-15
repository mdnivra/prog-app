<!DOCTYPE HTML>
<html>
	<meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Progknows</title>
    <head>
        {{ HTML::style('/bootstrap/css/bootstrap.min.css') }}
        {{ HTML::style('/css/new-style.css') }}
    	@yield('styleAndScript')
	</head>
	<body>

        <div id="wrapper">
            <div class="prog-notification pos-absolute col-md-12 col-lg-12">
                <div class="alert"></div>
            </div>

            @include('includes.header')
            
            <div id="sidebar">
                <div class="inner">
                    <nav class="side-nav">
                        @yield('sidebar')  
                    </nav>
                </div>
            </div>

            <div id="middle">
                <div id="main-content" data-component="<?=$data['component']?>">
                    <div class="container">
                        <div class="row">
                            <div class="content-wrapper"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

		<div id="my-modal" class="modal fade full-modal" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="my-modal-label">
            <div class="modal-dialog">
                <div class="modal-content"></div>
            </div>
        </div>
        @yield('scripts')
		@include('includes.footer')
	</body>
</html>