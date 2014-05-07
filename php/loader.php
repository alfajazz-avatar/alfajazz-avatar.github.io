<?
//header('Access-Control-Allow-Origin: http://alfajazz-avatar.github.io');
header('Access-Control-Allow-Origin: *');

$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query(array('photo' => $_POST['data'])),
    ),
);
$context = stream_context_create($options);
echo file_get_contents($_POST['url'], false, $context);