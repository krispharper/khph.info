<?php
  $photos = scandir('images/photos');
  natsort($photos);

  foreach ($photos as $photo) {
    if (is_file('images/photos/'.$photo)) {
      $path_parts = pathinfo($photo);
      $name = $path_parts['filename'];
      echo '
        <a rel="photos" id="image'.$name.'" class="photo" href="images/photos/'.$photo.'">
          <img src="images/photos/thumbnails/'.$photo.'"/>
        </a>';
    }
  }
?>
