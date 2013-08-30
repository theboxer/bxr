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
        ,listeners: {
            'setup': {
                fn: this.setup
                ,scope: this
            }
        }
    });
    BXR.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(BXR.panel.Home,MODx.FormPanel,{
    setup: function(){
        var tagField = this.find('xtype', 'bxr-field-tags');

        if(tagField.length > 0){
            tagField = tagField[0];

            tagField.disable();
            tagField.setFieldValue(_('bxr.loading') + '...');

            MODx.Ajax.request({
                url: BXR.config.connectorUrl
                ,params: {
                    action: 'mgr/gettags'
                }
                ,listeners: {
                    'success':{fn:function(r){
                        tagField.store = new Ext.data.ArrayStore({
                            autoDestroy: true,
                            storeId: 'autoCompleteStore',
                            idIndex: 0,
                            fields: ['tag'],
                            data: r.object
                        });

                        tagField.setFieldValue();
                        tagField.enable();

                    },scope:this}
                }
            });
        }
        this.fireEvent('ready');
    }
});
Ext.reg('bxr-panel-home',BXR.panel.Home);