<?php get_header(); ?>

  <div id="main" class="container">
    <div id="main-content">
      <div class="card-holder">
        <h2 class="element-invisible">Вы здесь</h2>

        <?php if (function_exists('easy_breadcrumbs')) easy_breadcrumbs(); ?>

        <h1 class="title" id="page-title"><?php the_title(); ?></h1>
        <div class="tabs"></div>
        <div class="region region-content">
          <div id="block-system-main" class="block block-system">
            <div class="content">

              <?php if (have_posts()): while (have_posts()) : the_post(); ?>
                <div class="node node-feedback node-promoted clearfix" role="article">
                  <div class="content">
                    <div class="media-right reviews">
                      <div class="img-right">
                        <div class="icon male"></div>
                        <div class="submitted">
                          <span>Опубликовано <?php the_date('d.m.Y'); ?></span> </div>
                      </div>
                      <div class="field field-name-body field-type-text-with-summary field-label-hidden">
                        <div class="field-items">
                          <div class="field-item even" property="content:encoded">
                            <?php the_content(); ?>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <?php endwhile; endif; ?>

            </div>
          </div>
        </div>
      </div>
    </div>

    <?php get_sidebar(); ?>

  </div>

<?php get_footer(); ?>
