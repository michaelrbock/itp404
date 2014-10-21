<?php
    $make = $_GET['make'];
    $url = 'https://api.edmunds.com/api/vehicle/v2/' . $make . '/models?fmt=json&api_key=5w6hts6mvxdbv7m3bcdrukcy&state=new&year=2014';
    $json = file_get_contents($url);
    echo $json;
?>