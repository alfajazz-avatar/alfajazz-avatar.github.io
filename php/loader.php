<?
include('SimpleImage.php');

//header('Access-Control-Allow-Origin: http://alfajazz-avatar.github.io');
header('Access-Control-Allow-Origin: *');

$photo = new abeautifulsite\SimpleImage();
$photo->load_base64($_POST['data']);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($_POST['data']),
    ),
);
$context = stream_context_create($options);
$res = file_get_contents($_POST['url'], false, $context);
echo $res;