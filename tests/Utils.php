<?php

/**
    *-----
    * TEST LIBRARIES
    * @return
    *-----
    *
    *-----
    * About author or Developer
    *-----
    *
    * @package	riagie/libraries-utils
    * @author	Ogie Nurdiana
    * @copyright Ogie Nurdiana
    * @license	LICENSE.MD MIT
    *
*/

define ("__ROOT__", dirname(__DIR__, 1)); 

/**
    *-----
    * REQUIRE VENDOR AUTOLOADING AND SYSTEM
    * @return
    *-----
*/

require_once (__ROOT__. "/vendor/autoload.php"); 

/**
    *-----
    * SYSTEM TESTING
    * @return
    *-----
*/

echo "\n Uuid: " . \Libraries\Utils::uuid();
echo "\n Secret: " . \Libraries\Utils::secret();
echo "\n Refnum: " . \Libraries\Utils::refnum();
echo "\n Token: " . \Libraries\Utils::token();
echo "\n ApiId: " . \Libraries\Utils::apiId();
echo "\n PPID: " . \Libraries\Utils::ppid("OGIE NURDIANA");
echo "\n CID: " . \Libraries\Utils::unique("D", 6);
echo "\n Phone Number: 081323456789 ";
$phoneNumber = (object) \Libraries\Utils::phoneNumber('081323456789', 'ID');
print_r ($phoneNumber);

$time_start = microtime(true);
echo "\n Start Time: " . \Libraries\Utils::setStartTime($time_start);
echo "\n Elapsed Time: " . \Libraries\Utils::getElapsedTime($time_start);
echo "\n Expired: " . \Libraries\Utils::setExpired(1);

echo "\n Curl Headers: ";
$curl = new \Curl\Curl();
$setHeaders["Accept-Encoding"] = "gzip, deflate, br";
$setHeaders = (object) \Libraries\Utils::setHeaders($curl, $setHeaders, 30);
print_r ($setHeaders);

echo "\n Curl Opts: ";
$setOpts["CURLOPT_ENCODING"] = "gzip, deflate, br";
$setOpts = (object) \Libraries\Utils::setOpts($curl, $setOpts);
print_r ($setOpts);

echo "\n Load File: ";
echo \Libraries\Utils::loadFile(__ROOT__."/README.md");

echo "\n Environment: ";
$getEnv = (object) \Libraries\Utils::getEnv();
print_r($getEnv);

echo "\n Browser: ";
$clientBrowser = (object) \Libraries\Utils::clientBrowser();
print_r($clientBrowser);

echo "\n IP: " . \Libraries\Utils::clientIp();
echo "\n Geolocation: ";
$geolocation = (object) \Libraries\Utils::geolocation();
print_r($geolocation);

echo "\n Database: ";
$database = array ("API_CENTRAL", "127.0.0.1", 3306, "root", "root");
$database = (object) \Libraries\Utils::database("MySQL", $database);
print_r($database);

echo "\n Object: ";
$object = array(
    'opacity'   => '0.5',
    'white',
    'black',
    'colors'    => array ('White','Black','Red', 'Green', 'Blue'),
    'red'       => array('r' => 'ff', 'g' => '00', 'b' => '00'),
    'green'     => array('r' => '00', 'g' => 'ff', 'b' => '00'),
    'blue'      => array('r' => '00', 'g' => '00', 'b' => 'ff'),
);
$object = (object) \Libraries\Utils::Object($object);
print_r($object);

echo "\n Json: ";
$json = array(
    'red'   => 'ff0000',
    'green' => '00ff00',
    'blue'  => '0000ff',
);
$json = (object) \Libraries\Utils::Json("encode", $json);
print_r($json);

echo "\n Xml: ";
$xml = [
    'Good guy' => [
        'name' => 'Luke Skywalker',
        'weapon' => 'Lightsaber'
    ],
    'Bad guy' => [
        'name' => 'Sauron',
        'weapon' => 'Evil Eye'
    ]
];
$xml =  \Libraries\Utils::Xml($xml);
print_r($xml);
