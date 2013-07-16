<?php
	$TEXT = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tortor lorem, placerat eu hendrerit a, dictum id turpis. Nam tincidunt sem quis metus tempor sed gravida leo ultricies. Nullam convallis magna at neque suscipit consectetur. Sed purus sem, facilisis at volutpat non, semper sed sapien. Aliquam varius luctus orci nec lobortis.</p>';
	$EXCLUDE = array( ".", "..", ".DS_Store", "_notes", "thumbs" );
	$IMAGES = array();
	$fh = opendir( "images" );
	while( false !== ( $file = readdir( $fh ) ) ) {
		if( !in_array( $file, $EXCLUDE ) ) {
			$IMAGES[ $file ] = array(
				"file" => "images/" . $file,
				"title" => str_replace( ".jpg", "", $file ),
				"description" => $TEXT
			);
		}
	}
	asort( $IMAGES );
?>
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>ascensor gallery</title>
		<meta name="viewport" content="user-scalable=0, width=640" />
		<link rel="stylesheet" type="text/css" media="all" href="css/normalize.css" />
		<link rel="stylesheet" type="text/css" media="all" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/start/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" media="all" href="http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" />
		<link rel="stylesheet" type="text/css" media="all" href="http://fonts.googleapis.com/css?family=Josefin+Slab:300,400,700,300italic,400italic,700italic" />
		<link rel="stylesheet" type="text/css" media="all" href="http://fonts.googleapis.com/css?family=Allerta+Stencil" />
		<link rel="stylesheet" type="text/css" media="all" href="css/jquery.jscrollpane.css" />
		<link rel="stylesheet" type="text/css" media="all" href="css/ascensor_gallery.css" />
		<link rel="stylesheet" type="text/css" media="all" href="css/style.css" />
	</head>
	<body>
		<div class="header" id="header">
			<div class="header-inner" id="header-inner">
				<a class="ascensorLink ascensorLink1" title="home"><h1>RBS<span class="smaller">gallery</span></h1></a>
			</div>
		</div>
		<div class="container" id="container">
			<?php foreach( $IMAGES as $image ) { ?>
				<div>
					<img src="<?php echo $image["file"]; ?>" title="<?php echo $image["title"]; ?>" alt="<?php echo $image["title"]; ?>" />
					<div>
						<h2><?php echo $image["title"]; ?></h2>
						<?php echo $image["description"]; ?>
					</div>
				</div>
			<?php } ?>
		</div>
		<div class="footer" id="footer">
			&copy; <?php if( date( "Y" ) == 2013 ) { echo date( "Y" ); } else { echo "2013 - " . date( "Y" ); } ?> red brick shack
		</div>
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
		<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
		<script type="text/javascript" src="js/jquery.ascensor.min.js"></script>
		<script type="text/javascript" src="js/jquery.mousewheel.js"></script>
		<script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>
		<script type="text/javascript" src="js/jquery.touchSwipe.min.js"></script>
		<script type="text/javascript" src="js/jquery.backgroundSize.js"></script>
		<script type="text/javascript" src="js/ascensor_gallery.js"></script>
		<script type="text/javascript" src="js/source.js"></script>
	</body>
</html>