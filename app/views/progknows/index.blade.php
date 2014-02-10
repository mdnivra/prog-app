<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Progknows</title>
        {{ HTML::style('/bootstrap/css/bootstrap.min.css') }}
        {{ HTML::style('/css/index.css') }}
        <link rel="author" href="humans.txt">
    </head>
    <body>
        <div class="container login-form">
          <div class="row">
                <div class="col-md-8 col-lg-8 caption">
                    <h2>Go Beyond Ads, Understand Social Segments</h2>
                </div>
                <div class="col-md-3 col-lg-3 well">
                    {{ Form::open(array('url'=>'/login', 'class'=>'form-signin')) }}
                        <h2>Login</h2>
                        <div class="form-group">
                            <input type="text"  name="email" class="form-control col-md-12 col-lg-12" placeholder="Email address">
                        </div>
                        <div class="form-group">
                            <input type="password" name="password" class="form-control col-md-12 col-lg-12" placeholder="Password">
                        </div>
                        @if(Session::has('message'))
                            <p class="alert alert-error">{{ Session::get('message') }}</p>
                        @endif
                        <button class="btn btn-primary" type="submit">Login</button>
                    {{ Form::close() }}
                </div>  
            </div>        
        </div>
    </body>
</html>