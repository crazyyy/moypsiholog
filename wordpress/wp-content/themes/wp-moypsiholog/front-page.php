<?php /* Template Name: Home Page */ get_header(); ?>

  <?php if (have_posts()): while (have_posts()) : the_post(); ?>
  <div id="before-main">
    <div class="region region-before-main">
      <div id="block-block-12" class="block block-block front-benefits container mt-64 mb-64">
        <div class="content">
          <h2 class="block-title"><?php the_field('header_title'); ?></h2>
          <div class="row">

            <?php if( have_rows('header_links') ): while ( have_rows('header_links') ) : the_row(); ?>
              <div class="col-xs-12 col-md-4">
                <div class="item">
                  <a href="<?php the_sub_field('link'); ?>">
                    <span class="icon <?php the_sub_field('ico'); ?>"></span>
                    <span class="l4"><?php the_sub_field('title'); ?></span>
                  </a>
                </div>
              </div>
            <?php endwhile; endif; ?>

          </div>
          <div class="text-box pull-center">
            <?php the_field('intro'); ?>
          </div>
        </div>
      </div>
      <div id="block-block-2" class="block block-block container front-problems">
        <div class="content">
          <h2 class="block-title mb-32"><?php the_field('block_link_title'); ?></h2>
          <div class="row problems">
            <?php if( have_rows('block_links_repeater') ): while ( have_rows('block_links_repeater') ) : the_row(); ?>
              <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="item">
                  <a href="<?php the_sub_field('дштл'); ?>">
                    <span class="icon <?php the_sub_field('ico'); ?>"></span>
                    <span class="l4"><?php the_sub_field('title'); ?></span>
                  </a>
                </div>
              </div>
            <?php endwhile; endif; ?>
          </div>
        </div>
      </div>
      <div id="block-block-7" class="block block-block container front-about-me mt-64 mb-64">
        <div class="content">
          <h2 class="block-title mb-48">Обо мне и моем подходе</h2>
          <div class="text-box pull-center clearfix">
            <div class="contacts">
              <div class="photo-big"></div>
              <div class="name">Елена Гуляева</div>
              <div class="icon phone"><a href="tel:+79162052252">+7 916 205-2252</a></div>
              <div class="icon email"><a href="mailto:elena@moypsiholog.ru">elena@moypsiholog.ru</a></div>
            </div>
            <?php the_content(); ?>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="main" class="container">
    <div id="main-content">
      <div class="card-holder">
        <div class="tabs"></div>
      </div>
    </div>
  </div>
  <div id="after-main">
    <div class="region region-after-main">
      <div id="block-block-11" class="block block-block container front-tv mt-64 mb-64">
        <div class="content">
          <h2 class="block-title mb-32">Консультирование в телепередачах</h2>
          <div class="row">
            <?php if( have_rows('video') ): while ( have_rows('video') ) : the_row(); ?>
            <div class="col-xs-12 col-md-4">
              <div class="item mt-24 mb-24">
                <div class="card">
                  <div class="card-item card-media">
                    <div class="img video-container">
                      <div class="video-responsive">
                        <iframe width="560" height="315" src="<?php the_sub_field('youtube'); ?>" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
                      </div>
                    </div>
                  </div>
                  <div class="card-item card-text">
                    <span class="l4"><?php the_sub_field('title'); ?></span>
                  </div>
                </div>
              </div>
            </div>
            <?php endwhile; endif; ?>
          </div>
        </div>
      </div>
      <div id="block-views-feedback-block" class="block block-views container front-reviews">
        <div class="content">
          <div class="view view-feedback view-id-feedback view-display-id-block reviews">
            <div class="view-header">
              <h2 class="block-title mb-32">Отзывы</h2> </div>
            <div class="view-content row">
              <?php query_posts("showposts=4&post_type=reviews"); ?>
                <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                  <div class="item col-xs-12 col-md-6 mb-24 clearfix">
                    <h3 class="mb-24"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                    <div class="text">
                      <div class="icon male"></div>
                      <?php wpeExcerpt('wpeExcerpt20'); ?>
                    </div>
                  </div>
                <?php endwhile; endif; ?>
              <?php wp_reset_query(); ?>
            </div>
          </div>
        </div>
      </div>
      <div id="block-views-articles-block" class="block block-views container front-articles mt-64 mb-64">
        <div class="content">
          <div class="view view-articles view-id-articles view-display-id-block articles">
            <div class="view-header">
              <h2 class="block-title mb-32">Последние статьи</h2> </div>
            <div class="view-content row">
              <?php query_posts("showposts=2&post_type=post"); ?>
                <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                  <div class="item col-xs-12 col-md-6 mb-24 clearfix">
                    <h3 class="mb-24"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                    <div class="text">
                      <div class="icon calendar">
                        <span class="day"><?php the_date('d'); ?></span>
                        <span class="month"><?php the_date('M'); ?></span>
                      </div>
                      <?php wpeExcerpt('wpeExcerpt20'); ?>
                    </div>
                  </div>
                <?php endwhile; endif; ?>
              <?php wp_reset_query(); ?>
            </div>
          </div>
        </div>
      </div>
      <div id="block-block-9" class="block block-block container front-contacts mt-64 mb-64">
        <div class="content">
          <h2 class="block-title mb-48">Сделайте первый шаг к решению проблемы</h2>
          <div class="contacts">
            <div class="person clearfix">
              <div class="photo-small"></div>
              <div class="name">Гуляева Елена Викторовна</div>
              <div class="text-secondary">Психолог</div>
            </div>
            <div class="icon phone"><a href="tel:+79162052252">+7 916 205-2252</a></div>
            <div class="icon email"><a href="mailto:elena@moypsiholog.ru">elena@moypsiholog.ru</a></div>
          </div>
          <div class="h3 text-align-center">Просто позвоните или напишите мне</div>
        </div>
      </div>
      <div id="block-block-10" class="block block-block container front-map mt-64 mb-64">
        <div class="content">
          <h2 class="block-title mb-48">Я рядом</h2>
          <div class="map-wrapper">
            <?php $location = get_field('maps'); if( !empty($location) ): ?>
              <div id="gmap-front">
                <div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
              </div>
            <?php endif; ?>

            <div class="row">
              <div class="col-xs-12 col-md-6 col-md-offset-6">
                <div class="card map-card">
                  <div class="card-item card-text contacts">
                    <h3>Кабинет</h3>
                    <div class="icon place">Москва
                      <br> ул. Жигулевская, д. 14, корп. 2
                      <br> м. Кузьминки, 3 минуты пешком</div>
                    <div class="icon time">
                      <span>Прием по предварительной записи</span>
                      <span>Пн-пт, с 10:00 до 20:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php endwhile; endif; ?>

<?php get_footer(); ?>
