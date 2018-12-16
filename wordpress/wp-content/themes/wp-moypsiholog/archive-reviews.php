<?php get_header(); ?>
  <div id="main" class="container">
    <div id="main-content">

      <div class="card-holder">
        <?php if (function_exists('easy_breadcrumbs')) easy_breadcrumbs(); ?>
        <h1 class="title" id="page-title">Отзывы</h1>
        <div class="view-header">
          <div class="highlight">
            <?php $content = get_post_field('post_content', 130); echo $content; ?>
          </div>
        </div>
        <div class="tabs"></div>
        <div class="region region-content">
          <div id="block-system-main" class="block block-system">
            <div class="content">
              <div class="view view-articles view-id-articles view-display-id-page articles">
                <div class="view-content view-content--reviews">
                  <?php get_template_part('loop'); ?>
                </div>
                <nav class="pager">
                  <h2 class="element-invisible">Страницы</h2>
                  <div class="item-list">
                    <?php get_template_part('pagination'); ?>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <?php get_sidebar(); ?>
  </div>
<?php get_footer(); ?>
