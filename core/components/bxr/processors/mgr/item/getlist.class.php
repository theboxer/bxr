<?php
/**
 * Get list Items
 *
 * @package bxr
 * @subpackage processors
 */
class BXRGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'BXRItem';
    public $languageTopics = array('bxr:default');
    public $defaultSortField = 'position';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'bxr.items';

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                    'name:LIKE' => '%'.$query.'%',
                    'OR:description:LIKE' => '%'.$query.'%',
                ));
        }
        return $c;
    }
}
return 'BXRGetListProcessor';