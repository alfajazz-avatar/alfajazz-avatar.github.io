<?
include('conf.php');
include('SimpleImage.php');

$coords = json_decode($_POST['coords']);

$photo = new abeautifulsite\SimpleImage();
$photo->load($_FILES['file']['tmp_name']);
$photo->crop($coords->x, $coords->y, $coords->x2, $coords->x2);
$photo->resize(WIDTH, HEIGHT);

echo $photo->output_base64();