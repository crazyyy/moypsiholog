<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title><?php wp_title( '' ); ?><?php if ( wp_title( '', false ) ) { echo ' :'; } ?> <?php bloginfo( 'name' ); ?></title>

  <link href="http://www.google-analytics.com/" rel="dns-prefetch"><!-- dns prefetch -->

  <!-- icons -->
  <link href="<?php echo get_template_directory_uri(); ?>/favicon.ico" rel="shortcut icon">

  <!--[if lt IE 9]>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/selectivizr/1.0.2/selectivizr-min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->
  <!-- css + javascript -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <?php wp_head(); ?>

</head>
<?php if ( is_page('home') ) { ?>
  <body class="html front not-logged-in no-sidebars page-node navbar-fixed navbar-light wide-one-side">
<?php } else { ?>
  <body class="html not-front not-logged-in one-sidebar sidebar-first page-node page-node- page-node-3 node-type-page navbar-fixed navbar-light">
<?php } ?>
  <div id="page">
    <?php if ( is_page('home') ) { ?>
      <div id="navbar" class="navbar-bg navbar-shadow">
        <div class="region region-navbar">
          <div id="block-block-21" class="block block-block navbar-item navbar-menu-toggle hidden-sm">
            <div class="content">
              <div id="navbar-menu-toggle"><a href="#"><i class="material-icons navbar-icon">menu</i></a></div>
            </div>
          </div>
          <div id="block-block-20" class="block block-block navbar-item">
            <div class="content">
              <div class="navbar-logo"><a href="/"><span></span></a></div>
            </div>
          </div>
          <div id="block-menu-block-2" class="block block-menu-block navbar-item navbar-menu pull-right visible-sm">
            <div class="content">
              <div class="menu-block-wrapper menu-block-2 menu-name-main-menu parent-mlid-0 menu-level-1">
                <?php wpeHeadNav(); ?>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="drawer-overlay"></div>
      <div id="drawer">
        <div class="region region-drawer">
          <div id="block-block-22" class="block block-block drawer-item divider-bottom">
            <div class="content">
              <div id="drawer-menu-close"><a href="#"><i class="material-icons drawer-icon">arrow_back</i></a></div>
              <div id="drawer-title">Разделы</div>
            </div>
          </div>
          <div id="block-menu-block-3" class="block block-menu-block drawer-item">
            <div class="content">
              <div class="menu-block-wrapper menu-block-3 menu-name-main-menu parent-mlid-0 menu-level-1">
                <?php wpeHeadNav(); ?>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header id="header" role="banner">
        <div id="header-content">
          <div class="region region-header">
            <div id="block-block-19" class="block block-block container">
              <div class="content">
                <div class="front-header">
                  <div class="section-left"></div>
                  <div class="arrow-first"></div>
                  <div class="section-center">
                    <div class="header-logo"></div>
                    <div class="header-slogan">Консультации опытного практикующего психолога</div>
                  </div>
                  <div class="arrow-second"></div>
                  <div class="section-right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="header-bg" style="opacity: 0.242424;"></div>
      </header>

    <?php } else { ?>

      <div id="navbar" class="navbar-bg">
        <div class="region region-navbar">
          <div id="block-block-21" class="block block-block navbar-item navbar-menu-toggle hidden-sm">
            <div class="content">
              <div id="navbar-menu-toggle"><a href="#"><i class="material-icons navbar-icon">menu</i></a></div>
            </div>
          </div>
          <div id="block-block-20" class="block block-block navbar-item">
            <div class="content">
              <div class="navbar-logo"><a href="/"><span></span></a></div>
            </div>
          </div>
          <div id="block-menu-block-2" class="block block-menu-block navbar-item navbar-menu pull-right visible-sm">
            <div class="content">
              <div class="menu-block-wrapper menu-block-2 menu-name-main-menu parent-mlid-0 menu-level-1">
                <?php wpeHeadNav(); ?>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="drawer-overlay"></div>
      <div id="drawer">
        <div class="region region-drawer">
          <div id="block-block-22" class="block block-block drawer-item divider-bottom">
            <div class="content">
              <div id="drawer-menu-close"><a href="#"><i class="material-icons drawer-icon">arrow_back</i></a></div>
              <div id="drawer-title">Разделы</div>
            </div>
          </div>
          <div id="block-menu-block-3" class="block block-menu-block drawer-item">
            <div class="content">
              <div class="menu-block-wrapper menu-block-3 menu-name-main-menu parent-mlid-0 menu-level-1">
                <?php wpeHeadNav(); ?>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header id="header" role="banner">
        <div id="header-content">
        </div>
        <div id="header-bg" style="opacity: 1;">
        </div>
      </header>

    <?php } ?>

    <div id="content">
