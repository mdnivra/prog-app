<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Progknows</title>
    </head>
    <body>
    	<script type="text/javascript" src="js/libs/jquery.js"></script>
		<script type="text/javascript">
		
		$(document).ready(function () { 
			window.close();
			opener.closeAuth('<?php echo $data ?>');
		});
		</script>
       
    </body>
</html>