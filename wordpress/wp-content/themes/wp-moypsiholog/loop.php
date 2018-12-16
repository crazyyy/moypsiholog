<?php if (have_posts()): while (have_posts()) : the_post(); ?>
  <div id="post-<?php the_ID(); ?>" <?php post_class('item-paddinger item mt-32 mb-32 clearfix'); ?>>
    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    <div class="text">
      <div class="submitted"><?php the_time('d.m.Y'); ?></div>
      <?php wpeExcerpt('wpeExcerpt40'); ?>
    </div>
  </div>
<?php endwhile; endif; ?>
