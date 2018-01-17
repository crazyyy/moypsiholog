<?php get_header(); ?>
  <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <h1 class="ctitle"><?php _e( 'Page not found', 'wpeasy' ); ?></h1>
    <h2><a href="<?php echo home_url(); ?>"><?php _e( 'Return home?', 'wpeasy' ); ?></a></h2>

  </article>
<?php get_sidebar(); ?>
<?php get_footer(); ?>

<?php get_header(); ?>

  <div id="main" class="container">
    <div id="main-content">
      <div class="card-holder">
        <h2 class="element-invisible">Вы здесь</h2>
        <?php if (function_exists('easy_breadcrumbs')) easy_breadcrumbs(); ?>
        <h1 class="title" id="page-title">Страница не найдена</h1>
        <div class="tabs"></div>
        <div class="region region-content">
          <div id="block-system-main" class="block block-system">
            <div class="content">
              <article class="node node-page clearfix" role="article">
                <div class="content">
                  <div class="field field-name-body field-type-text-with-summary field-label-hidden">
                    <div class="field-items">
                      <div class="field-item even" property="content:encoded">
                        <div class="media-right">
                          Запрашиваемая страница "/sdfasd" не найдена.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>

    <?php get_sidebar(); ?>

  </div>

<?php get_footer(); ?>
