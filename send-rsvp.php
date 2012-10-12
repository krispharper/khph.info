<?php
    $subject = "Wedding RSVP for " . $_POST['name'];
    $message = "";

    foreach($_POST as $key => $value)
    {
        $message .= ($key . ": " . $value . "\n");
    }

    echo mail("kris.p.harper@gmail.com, phorner88@gmail.com", $subject, $message);
?>
