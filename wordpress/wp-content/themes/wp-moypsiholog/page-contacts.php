<?php /* Template Name: Contacts Page */ get_header(); ?>

  <div id="main" class="container">
    <div id="main-content">
      <div class="card-holder">
        <?php if (function_exists('easy_breadcrumbs')) easy_breadcrumbs(); ?>
        <h1 class="title" id="page-title"><?php the_title(); ?></h1>
        <div class="tabs"></div>
        <div class="region region-content">
          <div id="block-system-main" class="block block-system">
            <div class="content">
              <?php if (have_posts()): while (have_posts()) : the_post(); ?>
                <article class="node node-page clearfix" role="article">
                  <div class="content">
                    <div class="field field-name-body field-type-text-with-summary field-label-hidden">
                      <div class="field-items">
                        <div class="field-item even" property="content:encoded">
                          <div class="media-right">
                            <?php the_content(); ?>
                          </div>
                          <?php $location = get_field('maps', 124); if( !empty($location) ): ?>
                            <div class="row">
                              <div class="col-xs-12">
                                <div id="gmap-front">
                                  <div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
                                </div>
                              </div>
                            </div>
                          <?php endif; ?>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              <?php endwhile; endif; ?>
            </div>
          </div>
        </div>
      </div>
    </div>

    <?php get_sidebar(); ?>

  </div>

<?php get_footer(); ?>
