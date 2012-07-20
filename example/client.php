<?php

error_reporting(E_ALL);

/* Get the port for the WWW service. */
//$service_port = getservbyname('www', 'tcp');

/* Get the IP address for the target host. */
//$address = gethostbyname('www.example.com');
$ip = '127.0.0.1';
$port = 7000;

/* Create a TCP/IP socket. */
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

if ($socket === false) {
    echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
} else {
    echo "OK.\n";
}

echo "Attempting to connect to '{$ip}' on port '{$port}'...";
$result = @socket_connect($socket, $ip, $port);
if ($result === false) {
    echo "socket_connect() failed.\nReason: ($result) " . socket_strerror(socket_last_error($socket)) . "\n";
    exit(1);
} else {
    echo "OK.\n";
}

function send($socket, $data) {
	$data .= "\n";
	socket_write($socket, $data, strlen($data));
}

send($socket, 'on ' . date('c', time() + 5));
send($socket, 'do example');
send($socket, '');

/*$in = "HEAD / HTTP/1.1\r\n";
$in .= "Host: www.example.com\r\n";
$in .= "Connection: Close\r\n\r\n";
$out = '';

echo "Sending HTTP HEAD request...";
socket_write($socket, $in, strlen($in));
echo "OK.\n";

echo "Reading response:\n\n";*/
/*while ($out = socket_read($socket, 2048)) {
    echo $out;
}*/

if (socket_read($socket, 4) !== 'done') {
	throw new Exception('Job receipt not received');
}

echo "Closing socket...";
socket_close($socket);
echo "OK.\n\n";