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

$filename = uniqid(rand(), true) . '.png';
file_put_contents($filename, '');
$path2 = realpath($filename);
$res = new abeautifulsite\SimpleImage(null, $watermark->get_width(), $watermark->get_height(), array(0,0,0,64));
$res->save($path2);
$res->load($path2);
$res->overlay($photo, 'top', 1, -80, 50);
$res->overlay($watermark, 'top');
echo $res->output_base64();

unlink($path);
unlink($path2);