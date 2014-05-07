<?
include('SimpleImage.php');

//header('Access-Control-Allow-Origin: http://alfajazz-avatar.github.io');
header('Access-Control-Allow-Origin: *');

$photo = new abeautifulsite\SimpleImage();
$photo->load($_FILES['file']['tmp_name']);
$photo->resize(200, 200);

$watermark = new abeautifulsite\SimpleImage();
$watermark->load('../'.$_POST['watermark']);
$watermark->resize(200, 200);

$photo->overlay($watermark);
echo $photo->output_base64();