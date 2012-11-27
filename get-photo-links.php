<?php
  $photos = scandir('images/photos');
  natsort($photos);

  foreach ($photos as $photo) {
    if (is_file('images/photos/'.$photo)) {
      echo '
        <a rel="photos" class="photo" href="images/photos/'.$photo.'">
          <img src="images/photos/thumbnails/'.$photo.'"/>
        </a>';
    }
  }
?>
