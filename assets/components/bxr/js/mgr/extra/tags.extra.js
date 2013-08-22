BXR.extra.Tags = function(config) {
    config = config || {};
    Ext.apply(config,{
        ignoreCase: true
        ,listeners: {
            change: this.autoComplete
        }
    });
    BXR.extra.Tags.superclass.constructor.call(this,config);
};
Ext.extend(BXR.extra.Tags,Ext.form.TextField,{
    store: new Ext.data.ArrayStore({
        autoDestroy: true,
        storeId: 'tagsStore',
        idIndex: 0,
        fields: ['tag']
    })

    ,autoCompleteStore: new Ext.data.ArrayStore({
        autoDestroy: true,
        storeId: 'autoCompleteStore',
        idIndex: 0,
        fields: ['tag']
    })

    ,autoComplete: function(){
        console.log(this);
    }

    ,onRender : function(ct, position){
        if(!this.el){
            var cfg = this.getAutoCreate();

            if(!cfg.name){
                cfg.name = this.name || this.id;
            }
            if(this.inputType){
                cfg.type = this.inputType;
            }
            this.autoEl = cfg;
        }

        Ext.form.Field.superclass.onRender.call(this, ct, position);

        this.el.wrap({
            tag: 'div'
            ,id: 'bxr-field-tags'
        });

        this.el.parentNode = this.el.parent();

        if(this.submitValue === false){
            this.el.dom.removeAttribute('name');
        }
        var type = this.el.dom.type;
        if(type){
            this.el.addClass('x-form-'+type);
        }
        if(this.readOnly){
            this.setReadOnly(true);
        }
        if(this.tabIndex !== undefined){
            this.el.dom.setAttribute('tabIndex', this.tabIndex);
        }

        Ext.DomHelper.insertAfter(this.el, {tag: 'ul'});
        Ext.DomHelper.insertAfter(this.el, {tag: 'button', html: 'Add'});

        this.addButton = this.el.parentNode.child('button');
        this.insertedTagsEl = this.el.parentNode.child('ul');

        this.insertedTagsEl.wrap({tag: 'div', class: 'inserted-tags'});

        this.addButton.on('click', function(){
            var values = this.getValue().split(',');
            Ext.each(values, function (value) {
                if(this.ignoreCase){
                    value = value.toLowerCase();
                }

                value = value.replace(/^\s+|\s+$/g, '');

                if(value == ''){
                    return;
                }

                var item = new BXR.extra.TagsItem({
                    owner: this,
                    renderTo: this.insertedTagsEl,
                    value: value
                });
                item.render();
            }, this);
            this.setValue();
        }, this);

        this.el.addClass([this.fieldClass, this.cls]);
    }
});
Ext.reg('bxr-field-tags',BXR.extra.Tags);


BXR.extra.TagsItem = function(config){
    Ext.apply(this,config);
    Ext.ux.form.SuperBoxSelectItem.superclass.constructor.call(this);
};
Ext.extend(BXR.extra.TagsItem,Ext.Component, {
    renderCurrentItem: true
    ,initComponent : function(){
        BXR.extra.TagsItem.superclass.initComponent.call(this);
        this.renderCurrentItem = true;

        var itemsCount = this.owner.store.getCount();
        var record = new Ext.data.Record({tag: this.value}, this.value);
        this.owner.store.add([record]);
        if(itemsCount == this.owner.store.getCount()) this.renderCurrentItem = false;
    },
    onRender : function(ct, position){
        if(!this.renderCurrentItem) return true;
        BXR.extra.TagsItem.superclass.onRender.call(this, ct, position);

        var el = this.el;
        if(el){
            el.remove();
        }

        this.el = el = ct.createChild({ tag: 'li' }, ct.last());
        el.addClass('x-superboxselect-item');

        var btnEl = this.owner.navigateItemsWithTab ? ( Ext.isSafari ? 'button' : 'a') : 'span';

        Ext.apply(el, {
            focus: function(){
                var c = this.down(btnEl +'.x-superboxselect-item-close');
                if(c){
                    c.focus();
                }
            },
            preDestroy: function(){
                this.preDestroy();
            }.createDelegate(this)
        });

        el.update(this.value);

        var cfg = {
            tag: btnEl,
            'class': 'x-superboxselect-item-close',
            tabIndex : this.owner.navigateItemsWithTab ? '0' : '-1'
        };
        if(btnEl === 'a'){
            cfg.href = '#';
        }

        this.lnk = el.createChild(cfg);
        this.lnk.on('click', function(){
            var record = new Ext.data.Record({tag: this.value}, this.value);
            this.el.remove();
            this.owner.store.remove(this.owner.store.getById(this.value));
        }, this);
    },
    onDestroy : function() {
        Ext.destroy(
            this.lnk,
            this.el
        );

        BXR.extra.TagsItem.superclass.onDestroy.call(this);
    }
});