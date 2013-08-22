<?php
/**
 * Remove an Item.
 * 
 * @package bxr
 * @subpackage processors
 */
class BXRRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'BXRItem';
    public $languageTopics = array('bxr:default');
    public $objectType = 'bxr.items';
}
return 'BXRRemoveProcessor';