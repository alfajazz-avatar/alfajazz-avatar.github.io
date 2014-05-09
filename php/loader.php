<?
include('conf.php');
include('SimpleImage.php');

$filename = uniqid(rand(), true) . '.png';
file_put_contents($filename, '');
$path = realpath($filename);

$photo = new abeautifulsite\SimpleImage();
$photo->load_base64($_POST['data']);
$photo->save($path);

$post = array('photo'=>'@'.$path);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $_POST['url']);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($ch);
curl_close($ch);
unlink($path);
echo $result;