BXR.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+_('bxr')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            deferredRender: false
            ,border: true
            ,defaults: {
                autoHeight: true
                ,layout: 'form'
                ,labelWidth: 150
                ,bodyCssClass: 'main-wrapper'
                ,layoutOnTabChange: true
            }
            ,items: [{
                defaults: {
                    msgTarget: 'side'
                    ,autoHeight: true
                }
                ,cls: 'form-with-labels'
                ,border: false
                ,items: [{
                    xtype: 'bxr-field-tags'
                    ,fieldLabel: 'Tags'
                }]
            }]
        }]
    });
    BXR.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(BXR.panel.Home,MODx.FormPanel);
Ext.reg('bxr-panel-home',BXR.panel.Home);