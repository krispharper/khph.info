<?php
  $section = $_GET['section'];

  if (!in_array($section, array('engagement', 'crowd-sourced'))) {
    exit;
  }

  $photos = scandir('images/photos/'.$section);
  natsort($photos);

  echo '<div id="thumbnails">';
  foreach ($photos as $photo) {
    if (is_file('images/photos/'.$section.'/'.$photo)) {
      $path_parts = pathinfo($photo);
      $name = $path_parts['filename'];
      echo '
        <a rel="'.$section.'-photos" id="'.$section.'-image'.$name.'" class="photo" href="images/photos/'.$section.'/'.$photo.'">
          <img src="images/photos/'.$section.'/thumbnails/'.$photo.'"/>
        </a>';
    }
  }
  echo '</div>';
  echo '
    <hr>
    <div>
      <p>
        Our engagement photos were taken by the wonderful <a href="http://on.fb.me/QUkGrZ">Sarina Cass</a>
      </p>
    </div>';
?>
