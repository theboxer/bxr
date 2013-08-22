<?php
/**
 * BXR Connector
 *
 * @package bxr
 */
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/config.core.php';
require_once MODX_CORE_PATH.'config/'.MODX_CONFIG_KEY.'.inc.php';
require_once MODX_CONNECTORS_PATH.'index.php';

$corePath = $modx->getOption('bxr.core_path',null,$modx->getOption('core_path').'components/bxr/');
require_once $corePath.'model/bxr/bxr.class.php';
$modx->bxr = new BXR($modx);

$modx->lexicon->load('bxr:default');

/* handle request */
$path = $modx->getOption('processorsPath',$modx->bxr->config,$corePath.'processors/');
$modx->request->handleRequest(array(
    'processors_path' => $path,
    'location' => '',
));