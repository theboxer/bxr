BXR.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,cls: 'container'
        ,useLoadingMask: true
        ,items: [{
            html: '<h2>'+_('bxr')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'bxr-grid-items'
            ,preventRender: true
            ,cls: 'main-wrapper'
            ,anchor: '100%'
        }]
    });
    BXR.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(BXR.panel.Home,MODx.FormPanel);
Ext.reg('bxr-panel-home',BXR.panel.Home);