<?
include('conf.php');
include('SimpleImage.php');

$photo = new abeautifulsite\SimpleImage();
$photo->load($_FILES['file']['tmp_name']);
$photo->resize(WIDTH, HEIGHT);

$watermark = new abeautifulsite\SimpleImage();
$watermark->load('../'.$_POST['watermark']);
$watermark->resize(WIDTH, HEIGHT);

$photo->overlay($watermark);
echo $photo->output_base64();