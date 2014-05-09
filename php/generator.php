<?
include('conf.php');
include('SimpleImage.php');

$filename = uniqid(rand(), true) . '.png';
file_put_contents($filename, '');
$path = realpath($filename);

$photo = new abeautifulsite\SimpleImage();
$photo->load_base64($_POST['photo']);
$photo->save($path);

$photo = new abeautifulsite\SimpleImage();
$photo->load($path);

$watermark = new abeautifulsite\SimpleImage();
$watermark->load('../'.$_POST['watermark']);
$watermark->resize(WIDTH, HEIGHT);

$photo->overlay($watermark);
echo $photo->output_base64();
unlink($path);