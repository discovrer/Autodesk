function ShowLabel(viewer, options){
    Autodesk.Viewing.Extension.call(this, viewer, options);
}

ShowLabel.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
ShowLabel.prototype.constructor = ShowLabel;

ShowLabel.prototype.load = function(){
    if(this.viewer.toolbar){
        this.createUI();
    }else{
        this.onToolbarCreatedBinded = this.onToolbarCreatedBinded.bind(this);
        this.viewer.addEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    }

    return true;
}

ShowLabel.prototype.onToolbarCreated = function(){
    this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
}

ShowLabel.prototype.createUI = function(){
    //alert('TODO : Create Toolbar!');

    var viewer = this.viewer;

    //Button 1
    var button1 = new Autodesk.Viewing.UI.Button('front-button');
    button1.onClick = function(e){
        viewer.setViewCube('front');
    }
    button1.addClass('front-button');
    button1.setToolTip('View front');

    //Button 2
    var button2 = new Autodesk.Viewing.UI.Button('back-button');
    button2.onClick = function(e){
        viewer.setViewCube('back');
    }
    button2.addClass('back-button');
    button2.setToolTip('View back');

    //SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('custom-view-toolbar');
    this.subToolbar.addControl(button1);
    this.subToolbar.addControl(button2);

    viewer.toolbar.addControl(this.subToolbar);
}

ShowLabel.prototype.unload = function(){
    this.viewer.toolbar.removeControl(this.subToolbar);

    return true;
}

Autodesk.Viewing.theExtensionManager.registerExtension('ShowLabel',ShowLabel);