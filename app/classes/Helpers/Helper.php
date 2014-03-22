<?php namespace Helpers;

class Helper {

     public static function appendTable($data, $table, $outputArray){
        foreach ($data as $key => $value) {
            $value->table = $table;
            array_push($outputArray, $value);
        }

        return $outputArray;
    }
}