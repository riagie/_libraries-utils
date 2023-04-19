<?php

/**
    *-----
    * PUBLIC LIBRARIES
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

/**
 * @package Platform
 * @subpackage Utility
 * Libraries Static function yang sering digunakan di dalam Aplikasi Cloud Data Center API's
 */

namespace Libraries;

class Utils 
{
    /**
     * Generate 36 digit unique string
     * @return string
     */
    public static function uuid() 
    {
        $uuid = \Ramsey\Uuid\Uuid::uuid4();
        
        return $uuid->toString();
    }

    /**
     * Generate 32 digit unique string
     * @return integer
     */
    public static function secret() 
    {
        $secret = new \PragmaRX\Random\Random();
        $secret = $secret->pattern("[A-Za-z0-9]")->lowercase()->size(32)->get();

        return $secret;
    }
    
    /**
     * Generate 32 digit unique string
     * @return integer
     */
    public static function refnum() 
    {
        $refnum = new \PragmaRX\Random\Random();
        $refnum = $refnum->pattern("[A-Za-z0-9]")->uppercase()->size(32)->get();

        return $refnum;
    }
    
    /**
     * Generate 28 digit unique string
     * @return integer
     */
    public static function token() 
    {
        $token = new \PragmaRX\Random\Random();
        $token = $token->pattern("[A-Za-z0-9]")->mixedcase()->size(28)->get();

        return $token;
    }
    
    /**
     * Generate 10 digit unique string
     * @return integer
     */
    public static function apiId() 
    {
        $apiId = new \PragmaRX\Random\Random();
        $apiId = $apiId->prefix("api-")->numeric()->size(10)->get();

        return $apiId;
    }

    /**
     * Generate 16 digit random alfabet + number
     * @return integer
     */
    public static function ppid($string) 
    {
        $string = preg_replace("/[^A-Za-z0-9 ]/", "", $string);
        $string = preg_replace('/\s+/', '', $string);

        // first
        $start  = ceil(strlen($string)/12);
        $end    = ceil(strlen($string)/16);
        $mid    = 16 - ($start + $end);
        
        // second
        $prefix = substr($string, 0, $start);
        $suffix = substr($string, - $end);
        $middle = substr(str_shuffle($string), 0, $mid);

        $ppid   = strtoupper($prefix.$middle.$suffix);
        
        $length = strlen($prefix.$middle.$suffix);
        if ($length-16 != 0) {
            $random = new \PragmaRX\Random\Random();
            $random = $random->pattern("[0-9]")->uppercase()->size(16-$length)->get();
            $ppid   = $ppid.$random;
        }
        
        return $ppid;
    }

    /**
     * Generate 6 digit unique number from alfabet + digit
     * @return integer
     */
    public static function unique($string = "A", $number = 6) 
    {
        $string = strtoupper($string);
        $range  = range("A", "Z");
        $search = array_search(substr($string, 0, 1), $range);
        $prefix = substr($search, -1);

        $suffix = "";
        for ($i=1; $i<($number); $i++) {
            $suffix .= mt_rand(0, 9);
        }

        $unique = $prefix.$suffix;

        return $unique;
    }
    
    /**
     * Formatting phoneNumber from number phone + code country
     * @return string
     */
    public static function phoneNumber($number, $country = "ID") 
    {
        $phoneUtil      = \libphonenumber\PhoneNumberUtil::getInstance();
        $phoneObject    = $phoneUtil->parse($number, $country);

        // phone number
        $regionCode     = $phoneUtil->getRegionCodeForNumber($phoneObject);
        $countryCode    = $phoneObject->getCountryCode();
        $number         = $phoneObject->getNationalNumber();

        // validate number
        $possibleNumber = $phoneUtil->isPossibleNumber($phoneObject);
        $validNumber    = $phoneUtil->isValidNumber($phoneObject);
        $numberType     = $phoneUtil->getNumberType($phoneObject);
        switch (strtolower($numberType)) {
            case '0':
                $numberType = 'Fixed-line';
                break;
            case '1':
                $numberType = 'Mobile';
                break;
            case '2':
                $numberType = 'Toll-free';
                break;
            case '3':
                $numberType = 'Premium Rate';
                break;
            case '4':
                $numberType = 'Shared Cost';
                break;
            case '5':
                $numberType = 'VoIP';
                break;
            case '6':
                $numberType = 'Personal Numbers (whenever feasible)';
                break;
            default:
                $numberType = 'UNKNOWN';
                break;
        }

        // provider phone number
        $carrierMapper  = \libphonenumber\PhoneNumberToCarrierMapper::getInstance();
        $providerNumber = $carrierMapper->getNameForNumber($phoneObject, $country);

        return array (
            'regionCode'      => $regionCode,
            'numberType'      => $numberType,
            'providerNumber'  => $providerNumber,
            'countryCode'     => $countryCode,
            'number'          => $number,
            'possibleNumber'  => $possibleNumber,
            'validNumber'     => $validNumber,
        );
    }

    /**
     * Set start time to log how long script executed
     * @return int
     */
    public static function setStartTime(&$time_start) 
    {
        $time_start = microtime(true);

        return $time_start;
    }

    /**
     * Get interval time after @method setStartTime( $timestart ) executed
     * @return int total time
     */
    public static function getElapsedTime($time_start) 
    {
        $time_end = microtime(true);

        return $time_end - $time_start;
    }

    /**
     * Generate date expired by count days
     * @return integer
     */
    public static function setExpired($estimation) 
    {
        return date('Y-m-d', mktime(0, 0, 0, date("m"), date("d") + $estimation, date("Y")));
    }

    /**
     * Set header file to make file cached by browser
     * @param int $interval
     */
    public static function setHeaders($curl, $header = false, $interval = 60) 
    {
        $ts = gmdate("D, d M Y H:i:s", time() + $interval) . " GMT";

        $curl->setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0');
        $curl->setHeaders([
            'Content-Type'  => 'application/x-www-form-urlencoded',
			'Cache-Control' => 'private, max-age=' . $interval,
			'Expires'       => $ts,
        ]);
        
        if ($header) {
            foreach ($header as $key => $value) {
                $key    = trim($key);
                $value  = trim($value);
                $headers[] = $key . ": " . $value;
            }

            $curl->setHeaders($headers);
        }

        return $curl;
    }

    /**
     * Set Opts
     *
     * @access public
     * @param  $options
     *
     * @return boolean
     *   Returns true if all options were successfully set. If an option could not be successfully set, false is
     *   immediately returned, ignoring any future options in the options array. Similar to curl_setopt_array().
     */
    public static function setOpts($curl, $opt = false) 
    {
        $curl->setOpts([
            CURLOPT_FOLLOWLOCATION  => true,
            CURLOPT_RETURNTRANSFER  => true,
            CURLOPT_ENCODING        => "gzip, deflate, br",
            CURLOPT_MAXREDIRS       => 10,
            CURLOPT_HTTP_VERSION    => "CURL_HTTP_VERSION_1_1",
            CURLOPT_HEADER          => false,
            CURLINFO_HEADER_OUT     => true,
            CURLOPT_SSL_VERIFYPEER  => false,
            CURLOPT_SSL_VERIFYHOST  => false,
            CURLOPT_FAILONERROR     => false,
            CURLOPT_VERBOSE         => false,
        ]);
        
        if ($opt) {
            foreach ($opt as $key => $value) {
                $key    = trim($key);
                $value  = trim($value);
                $opts[constant($key)] = $value;
            }

            $curl->setOpts($opts);
        }
        
        if (empty(defined('MAX_TIMEOUT'))) {
            define("MAX_TIMEOUT", 30);
        }

        if (empty(defined('COOKIE'))) {
            define('COOKIE', "logs/" . date("Ymd") . "-cookie.txt");
        }
        
        if (empty(defined('MAX_EXECUTION'))) {
            define("MAX_EXECUTION", 60);
        }
        
        $curl->setTimeout(MAX_TIMEOUT);
        $curl->setCookieJar(COOKIE);
        $curl->setCookieFile(COOKIE);
        $curl->setConnectTimeout(MAX_EXECUTION);
        
        return $curl;
    }

    /**
     * load /include file
     * this just use to load file in method and all process in loaded file just can use in that method
     * @example
     * po::printStruk()
     *
     * @param string $path
     */
    public static function loadFile($path) 
    {
        if (file_exists($path)) {
            require_once $path;

            return true;
        }

        return  "file not found";
    }

    /**
     * Set environment variable phpinfo
     * @return string
     */
    public static function getEnv() 
    {
        if (getenv()) {
            return  getenv();
        } 
        
        return 'UNKNOWN';
    }
    
    /**
     * Set browser by client
     * @return string
     */
    public static function clientBrowser() 
    {
        $browser = new \Wolfcast\BrowserDetection();

        return array (
            "userAgent"         => $browser->getUserAgent(),
            "browserName"       => $browser->getName(),
            "browserVer"        => $browser->getVersion(),
            "platformFamily"    => $browser->getPlatform(),
            "platformVer"       => $browser->getPlatformVersion(true),
            "platformName"      => $browser->getPlatformVersion(),
            "platformIs64bit"   => $browser->is64bitPlatform(),
            "isMobile"          => $browser->isMobile(),
            "isRobot"           => $browser->isRobot(),
            "isInIECompat"      => $browser->isInIECompatibilityView(),
            "strEmulatedIE"     => $browser->getIECompatibilityView(),
            "arrayEmulatedIE"   => $browser->getIECompatibilityView(true),
            "isChromeFrame"     => $browser->isChromeFrame(),
        );
    }

    /**
     * Set ip hit by client
     * @return string
     */
    public static function clientIp() 
    {
        if (getenv('HTTP_CLIENT_IP')) {
            return getenv('HTTP_CLIENT_IP');
        } 
        
        if(getenv('HTTP_X_FORWARDED_FOR')) {
            return getenv('HTTP_X_FORWARDED_FOR');
        } 
        
        if(getenv('HTTP_X_FORWARDED')) {
            return getenv('HTTP_X_FORWARDED');
        } 
        
        if(getenv('HTTP_FORWARDED_FOR')) {
            return getenv('HTTP_FORWARDED_FOR');
        } 
        
        if(getenv('HTTP_FORWARDED')) {
            return getenv('HTTP_FORWARDED');
        } 
        
        if(getenv('REMOTE_ADDR')) {
            return getenv('REMOTE_ADDR');
        }
        
        return "UNKNOWN";
    }
    
    /**
     * Set Geolocation hit by client IP
     *
     * @return string
     */
    public static function geolocation($ip = false) 
    {
        $curl = new \Curl\Curl();
        Utils::setHeaders($curl);
        Utils::setOpts($curl);
        if ($ip) {
            $curl->get('http://ip-api.com/php/', [
                'query'     => $ip,
                'fields'    => "status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query",
            ]);
        } else {
            $curl->get('http://ip-api.com/php?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query');
        }
        $curl->close();

        if ($curl->error) {
            return array (
                "status"        => false,
                "errorCode"     => $curl->errorCode,
                "errorMessage"  => $curl->errorMessage,
            );
        }
        
        return unserialize($curl->response);    
    }
    
    /**
     * Set excute class file to database config
     * DB name, host, port, user, pwd
     * @return string
     */
    public static function database($class, $db) 
    {
        $_dbClass = "DB" . $class;
        if (class_exists($_dbClass)) {
            $_DB = new $_dbClass($db[0], $db[1], $db[2], $db[3], $db[4]);
            
            return $_DB;
        }
        
        return "Class ". $_dbClass ." not found";
    }
    
    /**
     * Set convert object
     * @return string
     */
    public static function Object($obj) 
    {
        if (is_array($obj)) {
            $new_obj = array();
            foreach($obj as $k => $v) {
                if (is_integer($k)) {
                    $new_obj["index"][$k] = Utils::object($v);
                } else {
                    $new_obj[$k] = Utils::object($v);
                }
            }
    
            return (object) $new_obj;
        }
        
        return $obj; 
    }
    
    /**
     * Set convert json
     * @return string
     */
    public static function Json($convert = "decode", $data, $bool = false) 
    {
        if (function_exists("json_encode")) {
            $services = "json_" . $convert;
            if ($bool) {
                return $services($data, $bool);
            }
            
            return $services($data);
        } 

        $services = new Services_JSON(SERVICES_JSON_SUPPRESS_ERRORS);
        
        return $services->$convert($data);
    }
    
    /**
     * Set convert xml
     * @return string
     */
    public static function Xml($array, $encoding = "UTF-8", $version = "1.1", $standalone = true) 
    {
        return \Spatie\ArrayToXml\ArrayToXml::convert($array, [], true, $encoding, $version, [], $standalone);
    }

    /**
     * Set convert text
     * @return string
     */
    public static function Text($arr_1, $arr_2) 
    {
        $arr_1 = implode("|", $arr_1);
        $arr_1 = preg_replace('/\s+/', '_', strtoupper($arr_1));

        if (is_array($arr_2)) {
            foreach ($arr_2 as $k => $v) {
                $arr_3[$k] = implode("|", $v);
            }

            $arr_2 = implode("\n", $arr_3);
        }

        return $arr_1 ."\n". $arr_2;
    }
    
    /**
     * Output Developer
     *
     * @return string
     */
    public static function Debug($string, $autodump = false) 
    {
        if ($autodump || (empty($string) && $string !== 0 && $string !== "0") || $string === true) {
            print_r(PHP_EOL); var_dump($string); print_r(PHP_EOL);
        } else {
            print_r(PHP_EOL); print_r($string); print_r(PHP_EOL); 
        }
    }
}
