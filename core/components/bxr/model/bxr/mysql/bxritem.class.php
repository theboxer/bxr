<?php
/**
 * @package bxr
 */
require_once (strtr(realpath(dirname(dirname(__FILE__))), '\\', '/') . '/bxritem.class.php');
class BXRItem_mysql extends BXRItem {}
?>