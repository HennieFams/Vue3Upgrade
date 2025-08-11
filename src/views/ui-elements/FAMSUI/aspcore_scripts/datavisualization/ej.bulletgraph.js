/*!
*  filename: ej.bulletgraph.js
*  version : 18.1.0.42
*  Copyright Syncfusion Inc. 2001 - 2020. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
*/
(function (fn) {
    typeof define === 'function' && define.amd ? define(["./../common/ej.core","./../common/ej.data","./../common/ej.globalize"], fn) : fn();
})
(function () {
	
/**
* @fileOverview Plugin to style the Html Button elements
* @copyright Copyright Syncfusion Inc. 2001 - 2020. All rights reserved.s
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
* @version 12.1 
* @author <a href="mailto:licensing@syncfusion.com">Syncfusion Inc</a>
*/

/*global window, navigator, clearTimeout, setTimeout, document, jQuery, Syncfusion */
(function ($, ej, undefined) {
  
    ej.widget("ejBulletGraph", "ej.datavisualization.BulletGraph",    {
    
        element: null,

        model: null,
        validTags: ["div"],
    
        _tags: [{
            tag: 'qualitativeRanges',
            attr: ['rangeEnd', 'rangeStroke', 'rangeOpacity']
        },
        {
            tag: 'quantitativeScaleSettings.featureMeasures',
            attr: ['value', 'comparativeMeasureValue']
        }],
    
        defaults:   {
              
            locale: null,
			
			enableGroupSeparator: false,
			
			value: 0,
              
            comparativeMeasureValue: 0,
              
            width: null,
              
            height: null,
              
            theme: "flatlight",
              
            orientation: "horizontal",
              
            flowDirection: "forward",
              
            qualitativeRangeSize: 32,
              
            quantitativeScaleLength: 475,
              
            tooltipSettings:   {
                  
                  
                enableCaptionTooltip: false,
                  
                captionTemplate: null,
                  
                visible: true,
                  
                template: null
            },
              
            quantitativeScaleSettings:    {
                  
                location: {
                      
                    x: 10,
                      
                    y: 10
                },
                  
                minimum: 0,
                  
                maximum: 10,
                  
                interval: 1,
                  
                minorTicksPerInterval: 4,
                  
                majorTickSettings: {
                      
                    size: 13,
                      
                    stroke: null,
                      
                    width: 2
                },
                  
                minorTickSettings: {
                      
					size: 7,
                 
                    stroke: null,
                      
                    width: 2
                },
                  
                tickPosition: "far",
                  
                tickPlacement: "outside",
                  
                labelSettings: {
                      
                    labelPlacement: "outside",
                      
                    labelPrefix: "",
                      
                    labelSuffix: "",
                      
                    stroke: null,
                      
                    size: 12,
                      
                    offset: 15,
                      
                    font: {
                          
                        fontFamily: 'Segoe UI',
                          
                        fontStyle: 'Normal ',
                          
                        fontWeight: 'regular',
                          
                        opacity: 1
                    },
                      
                    position: "below"
                },
                  
                featuredMeasureSettings: {
                      

                    stroke: null,
                      
                    width: 6
                },
                  
                comparativeMeasureSettings: {
                      
                    stroke: null,
                      
                    width: 5
                },
                  
                featureMeasures: [{
                      
                    value: null,
                      
                    comparativeMeasureValue: null,
                      
                    category: null
                }]
            },
              
            fields: {
                  
                dataSource: null,
                  
                query: null,
                  
                tableName: null,
                  
                category: null,
                  
                featureMeasures: null,
                  
                comparativeMeasure: null
            },
              
            enableAnimation: true,
              
            enableResizing: true,
              
            isResponsive: true,
              
            applyRangeStrokeToTicks: false,
              
            applyRangeStrokeToLabels: false,
              
            qualitativeRanges: [{
                  
                rangeEnd: 4.3,
                  
                rangeStroke: null,
                  
                rangeOpacity: 1
            }, {
                  
                rangeEnd: 7.3,
                  
                rangeStroke: null,
                  
                rangeOpacity: 1
            }, {
                  
                rangeEnd: 10,
                  
                rangeStroke: null,
                  
                rangeOpacity: 1
            }],
              
            captionSettings: {
                  
                enableTrim: true,
                  
                textPosition: 'float',
                  
                textAlignment: 'Near',
                  
                textAnchor: 'start',
                  
                padding: 5,
                  
                textAngle: 0,
                  
                location: {
                      
                    x: 17,
                      
                    y: 30
                },
                  
                text: "",
                  
                font: {
                      
                    color: null,
                      
                    fontFamily: 'Segoe UI',
                      
                    fontStyle: 'Normal',
                      
                    size: '12px',
                      
                    fontWeight: 'regular',
                      
                    opacity: 1
                },
                  
                subTitle: {
                      
               textPosition: 'float',
                 
               textAlignment: 'Near',
                 
               textAnchor: 'start',
                 
                    padding: 5,
                      
                    textAngle: 0,
                      
                    text: "",
                      
                    location: {
                          
                        x: 10,
                          
                        y: 45
                    },
                      
                    font: {
                          
                        color: null,                          
                        
                        fontFamily: 'Segoe UI',
                          
                        
                        fontStyle: 'Normal ',                          
                        
                        size: '12px',
                          
                        fontWeight: 'regular',
                          
                        opacity: 1
                    }
                },

                  
                indicator: {
                      
                    textPosition: 'float',
                      
                    textAlignment: 'Near',
                      
                    textAnchor: 'start',
                      
                    padding:5,
                      
                    visible: false,
                      
                    textAngle: 0,
                      
                    textSpacing: 3,
                      
                    text: "",                    
                      
                    symbol: {
                          
                        border: {
                              
                            color: null,
                              
                            width: 1,
                        },
                          
                        color: null,
                          
                        shape: "",
                          
                        imageURL: "",
                          
                        size: {
                              
                            width: 10,
                              
                            height: 10
                        },
                          
                        opacity: 1
                    },
                      
                    location: {
                          
                        x: 10,
                          
                        y: 60
                    },
                      
                    font: {
                          
                        color: null,
                          

                        fontFamily: 'Segoe UI',
                          

                        fontStyle: 'Normal ',
                          

                        size: '12px',
                          
                        fontWeight: 'regular',
                          
                        opacity: 1
                    }
                }
            },

              
              
            load: '',

            click: '',

            doubleClick: '',

            rightClick: '',
              
            drawTicks: null,
              
            drawLabels: null,
              
            drawCaption: null,
              
            drawIndicator: null,
              
            drawQualitativeRanges: null,
              
            drawFeatureMeasureBar: null,
              
            drawCategory: null,
              
            drawComparativeMeasureSymbol: null
        },

        observables: ["value", "comparativeMeasureValue"],
        value: ej.util.valueFunction("value"),
        comparativeMeasureValue: ej.util.valueFunction("comparativeMeasureValue"),
          
        dataTypes: {
            quantitativeScaleSettings: {
                labelSettings: "data",
                featureMeasures: "array"
            },
            fields: { dataSource: "data", query: "data" },
            qualitativeRanges: "array",
            captionSettings: "data",
            isResponsive: "boolean",
        },

        // constructor function
          
        _init: function () {
            this._renderBulletGraph();
        },
          
		 _destroy: function () {
            $(this.element).removeClass("e-datavisualization-bulletgraph e-js").find("#" + this.svgObject.id).remove();
        },
        _isSVG: function () {
            if (window.SVGSVGElement)
                return true;
            else
                return false;
        },
          
        _value: ej.util.valueFunction("value"),
        _comparativeMeasureValue: ej.util.valueFunction("comparativeMeasureValue"),
          
        _qualitativeRanges: function (index, property, value, old) {
            this.redraw();
            this._trigger('refresh');
        },
          
        _quantitativeScaleSettings_featureMeasures: function (index, property, value, old) {
            this.redraw();
            this._trigger('refresh');
        },
          
        _renderBulletGraph: function () {
			var theme =  this.model.theme.toLowerCase();
            if (this._isSVG()) {
                this.svgRenderer = new ej.EjSvgRender(this.element);
                this.svgObject = this.svgRenderer.svgObj;
                this._trigger("load");
                this._setSvgSize(this);
                this._setTheme(ej.datavisualization.BulletGraph.Themes,theme);
                this.bindEvents();
                this._renderBulletElements();               
                if (this.model.enableAnimation)
                    this._animateMeasures();
            }
        },
          
        _animateMeasures: function () {
            this._doAnimation();
            this._doLineAnimation();
        },

        _setSvgSize: function (sender) {
            var chartObj = sender;
            var containerHeight = $(chartObj.element).height();
            var height = 90; //set default height if size not specified to chart or container
            var width = (ej.isTouchDevice()) ? 250 : 595;
            var containerWidth = $(chartObj.element).width();
            if (chartObj.model.width)
                width = parseInt(chartObj.model.width);
            else if (containerWidth > 0 && containerWidth < 595)
                width = containerWidth;
            else if(containerWidth > 595)
                width = 595;

            $(chartObj.svgObject).width(width);

            if (chartObj.model.height)
                height = parseInt(chartObj.model.height);
            else if (containerHeight > 0)
                height = containerHeight;
            else
                $(chartObj.svgObject).css("display", "block");
            $(chartObj.svgObject).height(height);


			chartObj.svgObject.setAttribute('width', width);
            chartObj.svgObject.setAttribute('height', height);
        },
        _renderBulletElements: function () {
            var width = this.model.width ? this.model.width : 595;
            var height = this.model.height ? this.model.height : 90;
            this.svgObject.setAttribute('viewBox', "0 0 " + width + " " + height);
            this.svgObject.setAttribute('preserveAspectRatio', "xMinYMin");
            this.svgWidth = $(this.svgObject).width();
            this.svgHeight = $(this.svgObject).height();
            var captionGroup = this.svgRenderer.createGroup({ 'id': this.svgObject.id + '_captionGroup' });
            var scaleGroup = this.svgRenderer.createGroup({ 'id': this.svgObject.id + '_scaleGroup' });
            var bulletGroup = this.svgRenderer.createGroup({ 'id': this.svgObject.id + '_outerWrap' });

            this._initializeValues();
            var intervalValue = ((this.model.quantitativeScaleLength) / ((this._scale.maximum - this._scale.minimum) / this._scale.interval));

            //render captionSettings
            this._drawCaption();

            //render indicator
            this._drawIndicator();

            //render caption group
            this._drawCaptionGroup(captionGroup);

            //render scale
            this._scaleGroup = scaleGroup;
            this._drawScale(captionGroup, scaleGroup);

            //draw ranges
            this._drawQualitativeRanges(scaleGroup);

            //render ticks
            this._drawMajorTicks(intervalValue, scaleGroup);
            this._drawMinorTicks(intervalValue, scaleGroup);

            //render labels
            this._drawLabels(intervalValue, scaleGroup);

            // data binding
            this._bindData();
                        
            $(scaleGroup).appendTo(bulletGroup);
            $(captionGroup).appendTo(bulletGroup);

            this._changeOrientation(scaleGroup);

            $(bulletGroup).appendTo(this.svgObject);
            $(this.svgObject).appendTo(this.element);

            this._bindHighlightRemoving(); // binding highlight style removing function for feature measure bars
            
        },

        _bindHighlightRemoving:function(){
            var isPointer = this.model.browserInfo.isMSPointerEnabled, touchStartOut,
            isIE11Pointer = this.model.browserInfo.pointerEnabled;
            touchStartOut = isPointer ? (isIE11Pointer ? "pointerout" : "MSPointerOut") : "touchout mouseout",
            this._on($("[id*=" + this.svgObject.id + "_FeatureMeasure_" + "]"), touchStartOut, function (evt) {
                if (!this.isTouch(evt))
                    $(evt.target).attr("opacity", 1);
            });
        },
      
        _drawCaptionGroup: function (captionGroup) {
            var caption = this.model.captionSettings;
            var subTitle = caption.subTitle;
            var indicator = (this._indicator ? this._indicator.settings : caption.indicator);
            var location;

            caption._location = subTitle._location = indicator._location = location;

            var smartCaptionPlacement = (caption.textPosition.toLowerCase()!='float' && caption.text!="");
            var smartSubTitlePlacement = (subTitle.textPosition.toLowerCase() != 'float' && subTitle.text != "");
            var smartIndicatorPlacement = indicator.visible && (indicator.textPosition.toLowerCase() != 'float');

            if (smartCaptionPlacement || smartSubTitlePlacement || smartIndicatorPlacement) {                

                var captionSize = ej.EjSvgRender.utils._measureText(caption.text, null, caption.font);
                var subTitleSize = ej.EjSvgRender.utils._measureText(subTitle.text, null, subTitle.font);
                var indicatorTextSize;
                var indicatorRegion;
                if (indicator.visible) {                    
                    indicatorTextSize = this._indicator.bounds;
                    var indicatorSize = {
                        width: indicator.symbol.size.width + indicatorTextSize.width + indicator.textSpacing,
                        height: Math.max(indicator.symbol.size.height, indicatorTextSize.height)
                    }
                    indicatorRegion = {
                        x: 0,
                        y: 0,
                        width: indicatorSize.width,
                        height: indicatorSize.height,
                        padding: indicator.padding,
                        anchor: indicator.textAnchor.toLowerCase(),
                        alignment: indicator.textAlignment.toLowerCase()
                    };
                }

                var captionRegion = { 
                    x: 0, 
                    y: 0, 
                    width: captionSize.width,                    
                    height: parseFloat(caption.font.size),
                    padding: caption.padding,
                    anchor: caption.textAnchor.toLowerCase(),
                    alignment: caption.textAlignment.toLowerCase()
                };
                var subTitleRegion = {
                    x: 0,
                    y: 0,
                    width: subTitleSize.width,
                    height: parseFloat(subTitle.font.size),
                    padding: subTitle.padding,
                    anchor: subTitle.textAnchor.toLowerCase(),
                    alignment: subTitle.textAlignment.toLowerCase()
                };
                
                var scaleRegion = { x: this._scale.location.x, y: this._scale.location.y, width: this.model.quantitativeScaleLength, height: this.model.qualitativeRangeSize };
                var elements= [ smartCaptionPlacement ?caption : null, smartSubTitlePlacement ? subTitle : null, smartIndicatorPlacement ? indicator : null];

                this._positionTextGroup(elements, [captionRegion, subTitleRegion, indicatorRegion], scaleRegion);
                this._locateTextGroup(elements, [captionRegion, subTitleRegion, indicatorRegion]);
            }
            var captionLocation = caption._location == undefined ? caption.location : caption._location;
            var subTitleLocation = subTitle._location == undefined ? subTitle.location : subTitle._location;
            var indicatorLocation = indicator._location == undefined ? indicator.location : indicator._location;

            caption.displayText = caption.text;
            if (caption.enableTrim == true) {
                captionLocation.x = captionLocation.x < 0 ? 0 : captionLocation.x;
                captionLocation.y = captionLocation.y < 0 ? 0 : captionLocation.y;
                caption.displayText = this._displayText(caption, captionLocation);
            }
            if (subTitle.text != "") {
                subTitle.displayText = subTitle.text;
                if (caption.enableTrim == true) {
                    subTitleLocation.x = subTitleLocation.x < 0 ? 0 : subTitleLocation.x;
                    subTitleLocation.y = subTitleLocation.y < 0 ? 0 : subTitleLocation.y;
                    subTitle.displayText = this._displayText(subTitle, subTitleLocation);
                }
            }
            if (indicator.visible) {
                indicator.displayText = indicator.text;
                if (this.model.captionSettings.enableTrim == true) {
                    indicatorLocation.x = indicatorLocation.x < 0 ? 0 : indicatorLocation.x;
                    indicatorLocation.y = indicatorLocation.y < 0 ? 0 : indicatorLocation.y;
                }
                var location = (indicator._location ? indicator._location : indicator.location);
                var symbolRect = {
                    'x': location.x + indicator.symbol.size.width / 2,
                    'y': location.y - indicator.symbol.size.height / 2,
                    'width': indicator.symbol.size.width,
                    'height': indicator.symbol.size.height,
                };
                var textOptions = this._indicatorTextOptions(indicator, symbolRect, this._indicator.bounds, this.svgObject.id + '_Indicator');
                var symbolOptions = this._indicatorSymbolOptions(captionGroup, indicator);
                this._drawBulletSymbol(this._indicator.settings.symbol.shape, symbolRect, symbolOptions, captionGroup);
                if (this.model.captionSettings.enableTrim == true)
                    indicator.displayText = this._displayText(indicator, symbolRect);
            }
            caption.displayText = caption.textPosition.toLowerCase() != "float" ? this._captionOverlap(this.model.captionSettings) : caption.displayText;
            this.svgRenderer.drawText(this._textOptions(caption, this.svgObject.id + '_Caption'), caption.displayText, captionGroup);
            if (subTitle.text != ""){
                subTitle.displayText = subTitle.textPosition.toLowerCase() != "float" ? this._subOverlap(this.model.captionSettings.subTitle) : subTitle.displayText;
                this.svgRenderer.drawText(this._textOptions(subTitle, this.svgObject.id + '_SubTitle'), subTitle.displayText, captionGroup);
            }   
            if (indicator.visible) {
                indicator.displayText = indicator.textPosition.toLowerCase() != "float" ? this._indOverlap(indicator,symbolRect) : indicator.displayText;
                this.svgRenderer.drawText(textOptions, indicator.displayText, captionGroup);
            }
        },
        // text overlap method is perform herer for caption , subtitle and indicator when position is except float
       _captionOverlap: function (settings) {
                var gap, isRotate;
				isRotate = true;
                if ((settings.textPosition == settings.subTitle.textPosition) && (settings.textAlignment == settings.subTitle.textAlignment) && settings.textAngle > 0 && settings.textAngle < 120 ) {
                    gap = settings.subTitle._location.y - settings._location.y;
                }
                else if ((settings.textPosition == settings.indicator.textPosition) && (settings.textAlignment == settings.indicator.textAlignment) && settings.textAngle > 0 && settings.textAngle < 120 ){
                    gap = settings.indicator._location.y - settings._location.y;
                }
                else{
                   if ((settings.textPosition == settings.subTitle.textPosition) && (settings._location.y < settings.subTitle._location.y) && settings.textAngle > 0 && settings.textAngle < 180 ){
                       gap = settings.subTitle._location.y - settings._location.y;
                   }
                   else if ((settings.textPosition == settings.subTitle.textPosition) && (settings._location.y > settings.subTitle._location.y) && settings.textAngle > 190 && settings.textAngle < 360     ){
                        gap = settings._location.y - settings.subTitle._location.y;
                   }
                   else if ((settings.textPosition == settings.indicator.textPosition) && (settings._location.y < settings.indicator._location.y) && settings.textAngle > 0 && settings.textAngle < 180 ){
                       gap = settings.indicator._location.y - settings._location.y;
                   }
                   else if ((settings.textPosition == settings.indicator.textPosition) && (settings._location.y > settings.indicator._location.y) && settings.textAngle > 190 && settings.textAngle < 360    ){
                        gap = settings._location.y - settings.indicator._location.y;
                   }
                }
                 var text = this._trim(settings.displayText,settings,gap,isRotate);           
            return text;             
        },
        _indOverlap: function (settings,loc) {
            var gap, isRotate;
			isRotate = true;
            var subTitle = this.model.captionSettings.subTitle;
            var title = this.model.captionSettings;
             if ((settings.textPosition == subTitle.textPosition) && (settings.textAlignment == subTitle.textAlignment) && settings.textAngle > 190 && settings.textAngle < 360 ) {
                    gap = loc.y - subTitle._location.y;
                }
                else if ((settings.textPosition == title.textPosition) && (settings.textAlignment ==title.textAlignment) && settings.textAngle > 190 && settings.textAngle < 360 ){
                    gap = loc.y - title._location.y;
                }
                else{
                   if ((settings.textPosition == subTitle.textPosition) && (settings._location.y < subTitle._location.y) && settings.textAngle > 0 && settings.textAngle < 180 ){
                       gap = subTitle._location.y - settings._location.y;
                   }
                   else if ((settings.textPosition == subTitle.textPosition) && (settings._location.y > subTitle._location.y) && settings.textAngle > 190 && settings.textAngle < 360     ){
                        gap = settings._location.y - subTitle._location.y;
                   }
                   else if ((settings.textPosition == title.textPosition) && (settings._location.y < title._location.y) && settings.textAngle > 0 && settings.textAngle < 180 ){
                       gap = title._location.y - settings._location.y;
                   }
                   else if ((settings.textPosition == title.textPosition) && (settings._location.y > title._location.y) && settings.textAngle > 190 && settings.textAngle < 360    ){
                        gap = settings._location.y - title._location.y;
                   }
                }
                 var text = this._trim(settings.displayText,settings,gap,isRotate);           
            return text;             
        },
        _subOverlap: function (settings) {
            var gap, isRotate;
			isRotate = true;
            var indicator = this.model.captionSettings.indicator;
            var title = this.model.captionSettings;
             if ((settings.textPosition == indicator.textPosition) && (settings.textAlignment == indicator.textAlignment) && settings.textAngle > 0 && settings.textAngle < 180 ) {
                    gap = indicator._location.y - settings._location.y;
                }
                else if ((settings.textPosition == title.textPosition) && (settings.textAlignment ==title.textAlignment) && settings.textAngle > 190 && settings.textAngle < 360 ){
                    gap = settings._location.y - title._location.y;
                }
                else{
                   if ((settings.textPosition == indicator.textPosition) && (settings._location.y < indicator._location.y) && settings.textAngle > 0 && settings.textAngle < 180 ){
                       gap = indicator._location.y - settings._location.y;
                   }
                   else if ((settings.textPosition == indicator.textPosition) && (settings._location.y > indicator._location.y) && settings.textAngle > 190 && settings.textAngle < 360     ){
                        gap = settings._location.y - indicator._location.y;
                   }
                   else if ((settings.textPosition == title.textPosition) && (settings._location.y < title._location.y) && settings.textAngle > 0 && settings.textAngle < 180 ){
                       gap = title._location.y - settings._location.y;
                   }
                   else if ((settings.textPosition == title.textPosition) && (settings._location.y > title._location.y) && settings.textAngle > 190 && settings.textAngle < 360    ){
                        gap = settings._location.y - title._location.y;
                   }
                }
                 var text = this._trim(settings.displayText,settings,gap,isRotate);           
            return text;             
        },
        // rotated label width calculated here
        rotatedLabel: function (font, sender, value, rotatedLabel) {
            var rotatedOptions = {
                'font-size': font.size,
                'transform': 'rotate(' + value + ',0,0)',
                'font-family': font.fontFamily,
                'font-style': font.fontStyle,
                'rotateAngle': 'rotate(' + value + 'deg)',
                'text-anchor': 'middle'
            };
            var text = sender.svgRenderer.createText(rotatedOptions, rotatedLabel);
            var width = Math.ceil((ej.EjSvgRender.utils._measureBounds(text, sender).width));
            return width;
        },
        // Trim size calculated here
        calcGap: function (angle, location, maxWidth, maxHeight, isRotate, Width, Height) {
            var trimSize, space, rotate;
            if (angle >= 0 && angle <= 90) {

                if (((maxHeight + location.y) >= Height)&& angle > 0) {
                    space = Height - location.y;
                    isRotate = true;
                }
                else if (((maxHeight + location.y) <= Height) && ((maxWidth + location.x) >= Width) && angle > 0) {
                    space = Width - location.x;
                }
                else {
                    if (((maxHeight + location.y) <= Height) && (angle > 0)) {
                        space = Height - location.y;
                        isRotate = true;
                    }
                    else
                        space = Width - location.x;
                }
            }
            else if (angle > 90 && angle < 180) {

                if (((maxHeight + location.y) >= Height)) {
                    space = Height - location.y;
                    isRotate = true;
                }
                else if (((maxHeight + location.y) <= Height) && ((maxWidth + location.x) >= Width)) {
                    space = location.x;
                }
                else {
                    if ((maxWidth + location.x) <= Width) {
                        space = location.x;
                    }
                    else {
                        space = Height - location.y;
                        isRotate = true;
                    }

                }
            }
            else if (angle >= 180 && angle < 270) {

                if ((location.x - maxWidth) >= 0) {
                    space = location.y;
                    isRotate = true;
                }
                else if (((location.y - maxHeight) <= 0) && ((location.x - maxWidth) <= 0)) {
                    space = location.x;
                }
                else {
                    if ((location.y - maxHeight) <= 0) {
                        space = Height - location.y;
                        isRotate = true;
                    }
                    else {
                        space = location.x;
                    }
                }

            }
            else {
                if ((maxWidth + location.x) <= Width) {
                    space = location.y;
                    isRotate = true;
                }
                else if (((location.y - maxHeight) >= 0) && ((maxWidth + location.x) >= Width)) {
                    space = Width - location.x;
                }
                else {
                    if ((maxWidth + location.x) >= Width) {
                        space = Width - location.x;
                    }
                    else {
                        space = location.y;
                        isRotate = true;
                    }
                }
            }

            return { trimSize: space, rotate: isRotate };
        },
        // Scale Location calculated here
        _scaleLoc: function () {
            var scale = this._scale;
            var offset = scale.labelSettings.offset;
            var tickSize = scale.majorTickSettings.size;
            var pointY, pointHeight;
            var label = this._scale.labelSettings;
            var labelBounds = ej.EjSvgRender.utils._measureText(label.labelPrefix + scale.maximum + label.labelSuffix, null, label);
            var labelSize = (this._orientation == ej.datavisualization.BulletGraph.Orientation.Horizontal) ? labelBounds.height : labelBounds.width;            
            pointY = scale.location.y;
            var qualitativeRangeSize = this.model.qualitativeRangeSize;
            var placement = this._tickPosition + this._tickPlacement + this._labelPosition + this._labelPlacement;
            if (this._tickPosition == "center")
                tickSize = (tickSize > qualitativeRangeSize) && ((tickSize - qualitativeRangeSize) / 2);
            switch (placement) {
                case 'faroutsidebelowoutside':
                    pointHeight = pointY + labelSize + qualitativeRangeSize + offset + ((tickSize > offset) && (tickSize - offset));
                    break;
                case 'faroutsidebelowinside':
                    pointHeight = pointY + tickSize + qualitativeRangeSize 
                    pointY = pointY - (((offset + labelSize) > qualitativeRangeSize) && ((offset + labelSize) - qualitativeRangeSize));
                    break;
                case 'faroutsideaboveoutside':
                    pointHeight = pointY + tickSize + qualitativeRangeSize;
                    pointY = pointY - (offset + labelSize)
                    break;
                case 'faroutsideaboveinside':
                    pointHeight = pointY + tickSize + qualitativeRangeSize + (((offset + labelSize) > (qualitativeRangeSize + tickSize)) ? ((offset + labelSize) - (qualitativeRangeSize + tickSize)) : 0 );
                    break;
                case 'farinsidebelowoutside':
                    pointHeight = pointY + labelSize + qualitativeRangeSize + offset;
                    pointY = pointY - ((tickSize > qualitativeRangeSize) && (tickSize - qualitativeRangeSize));
                    break;
                case 'farinsidebelowinside':
                    pointHeight = pointY + qualitativeRangeSize;
                    pointY = pointY - ((tickSize > qualitativeRangeSize) && (tickSize -qualitativeRangeSize)) - (((offset + labelSize) > (qualitativeRangeSize + tickSize)) && (offset + labelSize - tickSize)) 
                    break;
                case 'farinsideaboveoutside':
                    pointHeight = pointY + qualitativeRangeSize;
                    pointY = pointY - (offset + labelSize) - ((tickSize > (offset + labelSize + qualitativeRangeSize)) && (tickSize - (offset + labelSize + qualitativeRangeSize)));
                    break;
                case 'farinsideaboveinside':
                    pointHeight = pointY + qualitativeRangeSize + (((offset + labelSize) > qualitativeRangeSize) && (labelSize + offset - qualitativeRangeSize));
                    pointY = pointY - ((tickSize > qualitativeRangeSize) && (tickSize - qualitativeRangeSize));
                    break;
                case 'nearoutsidebelowoutside':
                    pointHeight = pointY + qualitativeRangeSize + offset + labelSize;
                    pointY = pointY - tickSize;
                    break;
                case 'nearoutsidebelowinside':
                    pointHeight = pointY + qualitativeRangeSize;
                    pointY = pointY - tickSize - (((offset + labelSize) > (qualitativeRangeSize + tickSize)) && ((offset + labelSize) - (qualitativeRangeSize + tickSize)));
                    break;
                case 'nearoutsideaboveoutside':
                    pointHeight = pointY + qualitativeRangeSize;
                    pointY = pointY - tickSize - ((tickSize < (offset + labelSize)) && (offset + labelSize - tickSize));
                    break;
                case 'nearoutsideaboveinside':
                    pointHeight = pointY + qualitativeRangeSize + (((offset + labelSize) > qualitativeRangeSize) && (offset + labelSize - qualitativeRangeSize));
                    pointY = pointY - tickSize;
                    break;
                case 'nearinsidebelowoutside':
                    pointHeight = pointY + qualitativeRangeSize + ((tickSize > (offset + labelSize + qualitativeRangeSize)) ? (tickSize - (qualitativeRangeSize)) : (offset + labelSize));
                    break;
                case 'nearinsidebelowinside':
                    pointHeight = pointY + qualitativeRangeSize + ((tickSize > qualitativeRangeSize) && (tickSize - qualitativeRangeSize));
                    pointY = pointY - (((offset + labelSize) > qualitativeRangeSize) && (offset + labelSize - qualitativeRangeSize));
                    break;
                case 'nearinsideaboveoutside':
                    pointHeight = pointY + ((tickSize > qualitativeRangeSize) ? tickSize : qualitativeRangeSize);
                    pointY = pointY - offset - labelSize;
                    break;
                case 'nearinsideaboveinside':
                    pointHeight = pointY + qualitativeRangeSize + ((tickSize > (labelSize + offset)) ? (tickSize - qualitativeRangeSize) : (labelSize + offset - qualitativeRangeSize));
                    break;
                case 'centeroutsidebelowoutside':
                    pointHeight = pointY + qualitativeRangeSize + ((tickSize > offset + labelSize) ? tickSize : offset + labelSize);
                    pointY = pointY - tickSize;
                    break;
                case 'centeroutsidebelowinside':
                    pointHeight = pointY + qualitativeRangeSize + tickSize;
                    pointY = pointY - tickSize - (((offset + labelSize) > (qualitativeRangeSize + tickSize)) && ((offset + labelSize) - (qualitativeRangeSize + tickSize)));
                    break;
                case 'centeroutsideaboveoutside':
                    pointHeight = pointY + qualitativeRangeSize + tickSize;
                    pointY = pointY - tickSize - ((tickSize < (offset + labelSize)) && (offset + labelSize - tickSize));
                    break;
                case 'centeroutsideaboveinside':
                    pointHeight = pointY + qualitativeRangeSize + (((offset + labelSize) > (qualitativeRangeSize + tickSize)) ? (offset + labelSize - qualitativeRangeSize - tickSize) : tickSize);
                    pointY = pointY - tickSize;
                    break;
                case 'centerinsidebelowoutside':
                    pointHeight = pointY + qualitativeRangeSize + ((tickSize > (offset + labelSize)) ? tickSize : (offset + labelSize));
                    pointY = pointY - tickSize;
                    break;
                case 'centerinsidebelowinside':
                    pointHeight = pointY + qualitativeRangeSize + tickSize;
                    pointY = pointY -  (((offset + labelSize - qualitativeRangeSize) > tickSize ) ? (offset + labelSize - qualitativeRangeSize) : tickSize);
                    break;
                case 'centerinsideaboveoutside':
                    pointHeight = pointY + qualitativeRangeSize + tickSize;
                    pointY = pointY - tickSize - ((tickSize < (offset + labelSize)) && (offset + labelSize - tickSize));
                    break;
                case 'centerinsideaboveinside':
                    pointHeight = pointY + qualitativeRangeSize + ((tickSize > (labelSize + offset)) ? tickSize : (labelSize + offset - qualitativeRangeSize));
                    pointY = pointY - tickSize;
                    break;
            }
            return {x: scale.location.x, y: pointY, height:pointHeight };

        },
        // display text method for trimming
        _displayText: function (settings, loc) {
             var location = $.extend(true, loc);
            var angle = settings.textAngle % 360;
            var text = settings.text;
            var font = settings.font;
            var scale = this._scale;
            var label = this._scale.labelSettings;
            var labelWidth = ej.EjSvgRender.utils._measureText(label.labelPrefix + scale.minimum + label.labelSuffix, null, label).width;
            var textWidth = ej.EjSvgRender.utils._measureText(text, null, font).width;
            var maxHeight = ej.EjSvgRender.utils.rotatedLabel(settings, this, angle, settings.text);
            var maxWidth = this.rotatedLabel(font, this, angle, settings.text);
            var gap, padding = 5;
            var height =this.svgHeight;
            var width = this.svgWidth;
            var isRotate = false;
            var scaleLocation = this._scaleLoc();
            if (settings.textSpacing) {
                textWidth = textWidth + settings.textSpacing;
                maxWidth = maxWidth + settings.textSpacing;
            }

            if (this._orientation == ej.datavisualization.BulletGraph.Orientation.Horizontal) {

               if ((location.x <= scaleLocation.x) && (scaleLocation.y <= location.y) && (location.y <= scaleLocation.height)) {
                    width = (scale.location.x - labelWidth / 2);
               }
               else if ((location.x <= scaleLocation.x) && (location.y <= scaleLocation.y) && (angle < 90)) {
                    height = scaleLocation.y;
               }
               else if ((location.x >= scaleLocation.x) && (location.x <= (scaleLocation.x + this.model.quantitativeScaleLength)) && (location.y <= scaleLocation.y)) {
                    height = scaleLocation.y;
               }
               else if ((location.y <= scaleLocation.y) && (location.x >= (scaleLocation.x + this.model.quantitativeScaleLength)) && (angle >= 90)) {
                    height = scaleLocation.y;
               }

               else if ((location.x >= (scaleLocation.x + this.model.quantitativeScaleLength)) && (scaleLocation.y <= location.y) && (location.y <= scaleLocation.height) && (angle < 270)) {
                    width = width - (scaleLocation.x + this.model.quantitativeScaleLength);
                    location.x = location.x - (scaleLocation.x + this.model.quantitativeScaleLength);
               }
               else if ((location.x <= scaleLocation.x) && (location.y >= scaleLocation.height) && (angle > 270)) {
                    location.y = location.y - scaleLocation.height;
               }
               else if ((location.x >= scaleLocation.x) && (location.x <= (scaleLocation.x + this.model.quantitativeScaleLength)) && (location.y >= scaleLocation.height)) {
                    location.y = location.y - scaleLocation.height;
               }
               else if ((location.x >= (scaleLocation.x + this.model.quantitativeScaleLength)) && (location.y >= scaleLocation.height) && (angle >= 180) && (angle < 270)) {
                    location.y = location.y - scaleLocation.height;
               }

               gap = this.calcGap(angle, location, maxWidth, maxHeight, isRotate, width, height);
               isRotate = gap.rotate;
               gap = gap.trimSize;
            }
            else {
                var scaleWidth = scaleLocation.height - scaleLocation.y;
                scaleLocation.y =this.svgHeight - scale.location.y - this.model.quantitativeScaleLength;
                scaleLocation.height = scaleLocation.y + this.model.quantitativeScaleLength;

                if ((location.x <= scaleLocation.x) && (scaleLocation.y <= location.y) && (location.y <= scaleLocation.height)) {
                    width = (scale.location.x - labelWidth / 2);
                }
                else if ((location.x <= scaleLocation.x) && (location.y <= scaleLocation.y) && (angle < 90)) {
                    height = scaleLocation.y;
                }
                else if ((location.x >= scaleLocation.x) && (location.x <= (scaleLocation.x + scaleWidth)) && (location.y <= scaleLocation.y)) {
                    height = scaleLocation.y;
                }
                else if ((location.y <= scaleLocation.y) && (location.x >= (scaleLocation.x + scaleWidth)) && (angle >= 90)) {
                    height = scaleLocation.y;
                }

                else if ((location.x >= (scaleLocation.x + scaleWidth)) && (scaleLocation.y <= location.y) && (location.y <= scaleLocation.height) && (angle <= 260)) {
                    width = width - (scaleLocation.x + scaleWidth);
                    location.x = location.x - (scaleLocation.x + scaleWidth);
                }
                else if ((location.x <= scaleLocation.x) && (location.y >= scaleLocation.height) && (angle >= 280)) {
                    location.y = location.y - scaleLocation.height;
                }
                else if ((location.x >= scaleLocation.x) && (location.x <= (scaleLocation.x + scaleWidth)) && (location.y >= scaleLocation.height)) {
                    location.y = location.y - scaleLocation.height;
                }
                else if ((location.x >= (scaleLocation.x + scaleWidth)) && (location.y >= scaleLocation.height) && (angle >= 180) && (angle <= 260)) {
                    location.y = location.y - scaleLocation.height;
                }

                gap = this.calcGap(angle, location, maxWidth, maxHeight, isRotate, width, height);
                isRotate = gap.rotate;
                gap = gap.trimSize;
            }
            // Trimming opetation called here
            var displayText = text;
            displayText = this._trim(text,settings,gap,isRotate);
            return displayText;
        },

        // trim calculation perform here
        _trim: function (text, settings, gap, isRotate) {
            var displayText = text;
            var maxWidth = this.rotatedLabel(settings.font, this, settings.textAngle, text);
            var textWidth = ej.EjSvgRender.utils._measureText(text, null, settings.font).width;
            if (settings.textSpacing) {
                textWidth = textWidth + settings.textSpacing;
                maxWidth = maxWidth + settings.textSpacing;
            }
            if (textWidth > gap && text != "") {
                var space;
                for (var t = 1; t <= text.toString().length; t++) {
                    text = displayText.toString().substring(0, t) + '... ';
                    if (isRotate == true)
                        space = ej.EjSvgRender.utils.rotatedLabel(settings, this, settings.textAngle, text);
                    else
                        space = ej.EjSvgRender.utils._measureText(text, null, settings.font).width;

                    if (settings.textSpacing) {
                        space = space + settings.textSpacing;
                    }
                    if (space >= gap) {
                        text = text.toString().substring(0, t - 1) + '... ';
                        displayText = text;
                        break;
                    }
                }
                var temp = displayText.toString(0, text.toString.lenght - 4);
                if (temp != displayText)
                    displayText = text;
            }
            return displayText;
        },
       
        _getVerticalScaleLocation: function(scaleWidth){
            return { x: this._scale.location.y, y:this.svgHeight - this._scale.location.x - scaleWidth };

        },
      
        _horizontalTextPositioning: function (element, region, scaleLocation, scaleRegion, regions) {
            var position = element.textPosition.toLowerCase();
            var alignment = region.alignment;
            var scaleLocation = this._scaleLoc();
            var label = this._scale.labelSettings;
            var maxLabelWidth = ej.EjSvgRender.utils._measureText(label.labelPrefix + this._scale.maximum + label.labelSuffix, null, label).width;            
            switch (position) {
                case 'left':
                    region.x = scaleLocation.x - region.width - region.padding - maxLabelWidth/2;
                    region.y = scaleLocation.y + ((alignment == 'center') ? scaleRegion.height / 2 + region.height/3: (alignment == 'far' ? scaleRegion.height : region.height));
                    regions[0].push(region);
                    break;
                case 'right':
                    region.x = scaleLocation.x + scaleRegion.width + region.padding + maxLabelWidth/2;
                    region.y = scaleLocation.y + ((alignment == 'center') ? scaleRegion.height / 2 + region.height / 3 : (alignment == 'far' ? scaleRegion.height : region.height));
                    regions[1].push(region);
                    break;
                case 'top':
                    region.x = (alignment == 'center') ? scaleRegion.x + scaleRegion.width / 2 - region.width / 2 : (alignment == 'near' ? scaleRegion.x : scaleRegion.x + scaleRegion.width - region.width);
                    region.y = scaleLocation.y - region.padding;
                    regions[2].push(region);
                    break;
                case 'bottom':                    
                    region.x = (alignment == 'center') ? scaleRegion.x + scaleRegion.width / 2 - region.width / 2 : (alignment == 'near' ? scaleRegion.x : scaleRegion.x + scaleRegion.width - region.width);
                    region.y = scaleLocation.height + region.height / 2 + region.padding;
                    regions[3].push(region);
                    break;
            }
        },
       
        _VerticalTextPositioning: function (element, region, scaleLocation, scaleRegion, regions) {
            var position = element.textPosition.toLowerCase();
            var alignment = region.alignment;
            var scaleBounds = this._scaleLoc();
            switch (position) {
                case 'left':
                    region.x = scaleBounds.y - region.width - region.padding;
                    region.y = scaleLocation.y + ((alignment == 'center') ? scaleRegion.height / 2 + region.height / 3 : (alignment == 'far' ? scaleRegion.height : region.height));
                    if (this._tickPosition == 'near' && this._tickPlacement == 'inside' && (this._labelPosition=='above' && this._labelPlacement=='inside'))
                        region.x += this._scale.majorTickSettings.size;
                    regions[0].push(region);
                    break;
                case 'right':
                    region.x = scaleBounds.height + region.padding;
                    region.y = scaleLocation.y + ((alignment == 'center') ? scaleRegion.height / 2 + region.height / 3 : (alignment == 'far' ? scaleRegion.height : region.height));
                    regions[1].push(region);
                    break;
                case 'top':
                    region.x = scaleRegion.x - region.width / 2 + (alignment == 'center' ? scaleRegion.width / 2 : (alignment == 'far' && scaleRegion.width));
                    region.y = scaleRegion.y - region.padding;                   
                    regions[2].push(region);
                    break;
                case 'bottom':
                    region.x = scaleRegion.x - region.width / 2 + (alignment=='center' ? scaleRegion.width / 2 : (alignment == 'far' && scaleRegion.width));
                    region.y = scaleRegion.y + scaleRegion.height + region.height + region.padding - region.height / 3 + this._scale.labelSettings.size / 2;
                    regions[3].push(region);
                    break;
            }
        },
    
        _positionTextGroup: function (elements, regions, horScaleRegion) {
            var elementRegions=[[], [], [], []];
            var isHorizontal = (this._orientation == 'horizontal');            
            var scaleLocation = isHorizontal ? this._scaleLocation : this._getVerticalScaleLocation(horScaleRegion.width);
            var scaleRegion = isHorizontal ? horScaleRegion : { x: scaleLocation.x, y: scaleLocation.y, width: horScaleRegion.height, height: horScaleRegion.width };
            for (var i = 0; i < elements.length; i++) {
                if (elements[i]) {
                    if (isHorizontal)
                        this._horizontalTextPositioning(elements[i], regions[i], scaleLocation, scaleRegion, elementRegions);
                    else
                        this._VerticalTextPositioning(elements[i], regions[i], scaleLocation, scaleRegion, elementRegions);
                }                
            }
            this._avoidElementsOverlapping(elementRegions);
        },
       
        _avoidElementsOverlapping: function (regions) {
            for (var j = 0; j < regions.length; j++) {
                var region = regions[j];
                var isOverlap = false;
                do {
                    for (var i = 0; i < region.length; i++) {
                        for (var k = i - 1; k >= 0; k--) {
                            if (this._isOverlapping(region[i], region[k])) {
                                switch (j) {
                                    //Placing overlapped text for left and right positioned text elements
                                    case 0:
                                    case 1:
                                        if (region[k].y > region[i].y)
                                            region[k].y = region[i].y + region[k].height + (region[k].padding > 1 ? region[k].padding : 1);
                                        else
                                            region[i].y = region[k].y + region[i].height + (region[i].padding > 1 ? region[i].padding : 1);
                                        break;
                                        //Placing overlapped text at top position
                                    case 2:
                                        region[k].y = region[i].y - region[i].height - (region[k].padding > 1 ? region[k].padding : 1);
                                        break;
                                        //Placing overlapped text at bottom position
                                    default:
                                        region[i].y = region[k].y + region[k].height + (region[k].padding > 1 ? region[k].padding : 1);
                                        break;
                                }
                                isOverlap = true;
                                break;
                            }
                            else
                                isOverlap = false;
                        }
                    }
                } while (isOverlap);
            }
            this._applyLeftRightAnchor([regions[0], regions[1]]);
            this._applyTopBottomAnchor([regions[2], regions[3]]);
        },
      
        _locateTextGroup: function (elements, regions) {            
            for (var i = 0; i < elements.length; i++) {
                if (elements[i]) {
                    elements[i]._location = { x: 0, y: 0 };
                    elements[i]._location.x = regions[i].x;
                    elements[i]._location.y = regions[i].y;
                }
            }
        },
     
        _applyLeftRightAnchor: function (regions) {
            var anchor;
            for (var i = 0; i < regions.length; i++) {
                var region = regions[i];
                var maxSize = 0;
                for (var j = 0; j < region.length; j++)
                    maxSize = Math.max(maxSize, region[j].width);
                for (var j = 0; j < region.length; j++) {
                    anchor = region[j].anchor;
                    if (anchor == 'start')
                        region[j].x += (i == 0) && (region[j].width - maxSize);
                    else if (anchor == 'middle')
                        region[j].x += (i == 0) ? (region[j].width - maxSize) / 2 : (maxSize - region[j].width) / 2;
                    else
                        region[j].x += (i != 0) && (maxSize - region[j].width);
                }
            }
        },
     
        _applyTopBottomAnchor: function (regions) {            
            for (var i = 0; i < regions.length; i++) {
                var nearAlignment = [], farAlignment = [], centerAlignment = [];
                var region = regions[i];
                for (var j = 0; j < region.length; j++)
                    if (region[j].alignment == 'near')
                        nearAlignment.push(region[j])
                    else if (region[j].alignment == 'far')
                        farAlignment.push(region[j]);
                    else
                        centerAlignment.push(region[j]);

                this._applyNearAnchor(nearAlignment);
                this._applyCenterAnchor(centerAlignment);
                this._applyFarAnchor(farAlignment);
            }
        },
       
        _applyNearAnchor: function (regions) {
            if (regions.length > 1) {
                var maxSize = 0;
                for (var i = 0; i < regions.length; i++)
                    maxSize = Math.max(maxSize, regions[i].width);
                for (var i = 0; i < regions.length; i++)
                    if (regions[i].anchor == 'start')
                        regions[i].x += (this._orientation == 'vertical') && (regions[i].width - maxSize) / 2;
                    else if (regions[i].anchor == 'middle')
                        regions[i].x += (this._orientation == 'horizontal') && (maxSize - regions[i].width) / 2;
                    else
                        regions[i].x += (this._orientation == 'horizontal') ? (maxSize - regions[i].width) : (maxSize - regions[i].width) / 2;
            }
        },
      
        _applyCenterAnchor: function (regions) {
            if (regions.length > 1) {
                var maxSize = 0;
                for (var i = 0; i < regions.length; i++)
                    maxSize = Math.max(maxSize, regions[i].width);
                for (var i = 0; i < regions.length; i++)
                    if (regions[i].anchor == 'start')
                        regions[i].x += (regions[i].width - maxSize) / 2;
                    else if (regions[i].anchor == 'end')
                        regions[i].x += (maxSize - regions[i].width) / 2;
            }
        },
     
        _applyFarAnchor: function (regions) {
            if (regions.length > 1) {
                var maxSize = 0;
                for (var i = 0; i < regions.length; i++)
                    maxSize = Math.max(maxSize, regions[i].width);
                for (var i = 0; i < regions.length; i++)
                    if (regions[i].anchor == 'start')
                        regions[i].x += (this._orientation == 'horizontal') ? regions[i].width - maxSize : (regions[i].width - maxSize) / 2;
                    else if (regions[i].anchor == 'middle')
                        regions[i].x += (this._orientation == 'horizontal') && (regions[i].width - maxSize) / 2;
                    else if (regions[i].anchor == 'end')
                        regions[i].x += (this._orientation == 'vertical') && (maxSize - regions[i].width) / 2;
            }
        },
       
        _isOverlapping: function (reg1, reg2) {
            return !(reg1.x + reg1.width < reg2.x || reg1.x > reg2.x + reg2.width || reg1.y - reg1.height > reg2.y || reg1.y < reg2.y - reg2.height);
        },
        
        _initializeValues: function () {
            this._scale = this.model.quantitativeScaleSettings;
            this._labelPosition = this._scale.labelSettings.position.toLowerCase();
            this._tickPosition = this._scale.tickPosition.toLowerCase();
            this._flowDirection = this.model.flowDirection.toLowerCase();
            this._orientation = this.model.orientation.toLowerCase();
            this._tickPlacement = this._scale.tickPlacement.toLowerCase();
            this._labelPlacement = this._scale.labelSettings.labelPlacement.toLowerCase();
        },
      
        _changeOrientation: function (bulletGroup) {
            if (this._orientation == ej.datavisualization.BulletGraph.Orientation.Vertical) {               
                bulletGroup.setAttribute("transform", "translate(0," +this.svgHeight +")rotate(-90)");
            }
        },
       
        _setModel: function (options) {
            var isFlag = true;
            for (var key in options) {
                this.model.enableAnimation = false;
                switch (key) {
                    case "height":
                        this.model.height = options[key];
                        break;
                    case "width":
                        this.model.width = options[key];
                        break;
                    case "theme":
                        this.model.theme = options[key];
                        this._setTheme(ej.datavisualization.BulletGraph.Themes, this.model.theme);
                        break;
                    case "orientation":
                        this.model.orientation = options[key];
                        break;
                    case "flowDirection":
                        this.model.flowDirection = options[key];
                        break;
                    case "qualitativeRangeSize":
                        this.model.qualitativeRangeSize = options[key];
                        break;
                    case "quantitativeScaleLength":
                        this.model.quantitativeScaleLength = options[key];
                        break;
                    case "quantitativeScaleSettings":
                        $.extend(true, this.model.quantitativeScaleSettings, {}, options[key]);
                        break;
                    case "applyRangeStrokeToTicks":
                        this.model.applyRangeStrokeToTicks = options[key];
                        break;
                    case "applyRangeStrokeToLabels":
                        this.model.applyRangeStrokeToLabels = options[key];
                        break;
                    case "qualitativeRanges":
                        $.extend(true, this.model.qualitativeRanges, {}, options[key]);
                        break;
                    case "captionSettings":
                        $.extend(true, this.model.captionSettings, {}, options[key]);
                        break;
                    case "dataSource":
                        $.extend(true, this.model.fields, {}, options[key]);
                        break;
                    case "value":
                        for (var i = 0; this.model.quantitativeScaleSettings.featureMeasures[i] != null; i++) {
                            this.model.quantitativeScaleSettings.featureMeasures[i].value = parseFloat(this.value());
                        }
                        break;
                    case "comparativeMeasureValue":
                        for (var i = 0; this.model.quantitativeScaleSettings.featureMeasures[i] != null; i++) {
                            this.model.quantitativeScaleSettings.featureMeasures[i].comparativeMeasureValue = parseFloat(this.comparativeMeasureValue());
                        }
                        break;
                    case "enableAnimation":
                        this.model.enableAnimation = options[key];
                        if (this.model.enableAnimation) {
                            $(this.svgObject).empty();
                            this._renderBulletElements();
                            this._animateMeasures();
                        }
                        isFlag = false;
                        break;
                }
            }
            if (isFlag) {
                $(this.svgObject).empty();
                this._renderBulletElements();
            }
        },
      
        _bindData: function () {

            if (!ej.isNullOrUndefined(this.model.fields) && this.model.fields["dataSource"] != null) {
                if (this.model.fields["dataSource"] instanceof ej.DataManager) {
                    this._initDataSource();
                }
                else {
                    this._dataCount = this.model.fields["dataSource"].length;
                    this._drawMeasures();
                }
            }
            else {      //this.model.quantitativeScaleSettings.featureMeasures != null
                this._dataCount = this._scale.featureMeasures.length;
                this._drawMeasures();
            }
        },
      
        _drawMeasures: function () {
            this._drawFeatureMeasureBar();
            this._drawComparativeMeasureSymbol();
        },
      
        _initDataSource: function () {
            var query = this._columnToSelect(this.model.fields);
            var proxy = this;
            var queryPromise = this.model.fields["dataSource"].executeQuery(query);
            queryPromise.done(function (e) {
                proxy.model.fields["dataSource"] = e.result;
                proxy._dataCount = e.result.length;
                proxy._drawFeatureMeasureBar();
                proxy._drawComparativeMeasureSymbol();
                proxy._bindHighlightRemoving();
            });
        },
      
        _columnToSelect: function (mapper) {
            var column = [], queryManager = ej.Query();
            if (ej.isNullOrUndefined(mapper.query)) {
                for (var col in mapper) {
                    if (col !== "tableName" && col !== "query" && col !== "dataSource")
                        column.push(mapper[col]);
                }
                if (column.length > 0)
                    queryManager.select(column);
                if (!this.model.fields["dataSource"].dataSource.url.match(mapper.tableName + "$"))
                    !ej.isNullOrUndefined(mapper.tableName) && queryManager.from(mapper.tableName);
            }
            else
                queryManager = mapper.query;
            return queryManager;
        },
             
        _drawCaption: function () {
            if (this.model.drawCaption) {
                var data = { font: this.model.captionSettings.font, location: this.model.captionSettings.location, subTitle: this.model.captionSettings.subTitle, text: this.model.captionSettings.text, textAngle: this.model.captionSettings.textAngle };
                this._trigger("drawCaption", data);
                this.model.captionSettings = $.extend(this.model.captionSettings, data);
            }
        },
      
        _drawBulletSymbol: function(shape, symbolRect, symbolOptions, captionGroup){
            var arrowPath = "M" + " " + ((symbolRect.x - (symbolRect.width / 2)) + symbolRect.width) + " " + (symbolRect.y + (symbolRect.height / 4)) + " "
                    + "L" + " " + ((symbolRect.x - (symbolRect.width / 2)) + symbolRect.width) + " " + (symbolRect.y + (-symbolRect.height / 4)) + " "
                    + "L" + " " + ((symbolRect.x - (symbolRect.width / 2)) + (symbolRect.width / 2)) + " " + (symbolRect.y + (-symbolRect.height / 4)) + " "
                    + "L" + " " + ((symbolRect.x - (symbolRect.width / 2)) + (symbolRect.width / 2)) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                    + "L" + " " + ((symbolRect.x - (symbolRect.width / 2))) + " " + (symbolRect.y) + " "
                    + "L" + " " + ((symbolRect.x - (symbolRect.width / 2)) + (symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                    + "L" + " " + ((symbolRect.x - (symbolRect.width / 2)) + (symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 4)) + " "
                    + "L" + " " + ((symbolRect.x - (symbolRect.width / 2)) + symbolRect.width) + " " + (symbolRect.y + (symbolRect.height / 4));

            switch (shape.toLowerCase()) {
                case 'circle':
                    var radius = Math.min(symbolRect.height, symbolRect.width) / 2;
                    symbolOptions.cx = symbolRect.x;
                    symbolOptions.cy = symbolRect.y,
                    symbolOptions.r = radius,
                    this.svgRenderer.drawCircle(symbolOptions, captionGroup);
                    break;

                case 'leftarrow':                        
                    symbolOptions.d = arrowPath;
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'rightarrow':
                    symbolOptions.d = arrowPath;
                    symbolOptions.transform = 'rotate(180,' + (symbolRect.x) + ',' + symbolRect.y + ')';
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'uparrow':
                    symbolOptions.d = arrowPath;
                    symbolOptions.transform = 'rotate(90,' + (symbolRect.x) + ',' + symbolRect.y + ')';
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'downarrow':
                    symbolOptions.d = arrowPath;
                    symbolOptions.transform = 'rotate(-90,' + (symbolRect.x) + ',' + symbolRect.y + ')';
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'cross':
                    var crossPath = "M" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 2)) + " " + (symbolRect.y) + " " +
                        "M" + " " + (symbolRect.x) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x) + " " + (symbolRect.y + (-symbolRect.height / 2));
                    symbolOptions.d = crossPath;
                    symbolOptions.stroke = (symbolOptions.stroke) ? symbolOptions.stroke : symbolOptions.fill;
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'horizontalline':
                    var horizPath = "M" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y) + " " + "L" + " " + (symbolRect.x + (symbolRect.width / 2)) + " " + (symbolRect.y);
                    symbolOptions.d = horizPath;
                    symbolOptions.stroke = (symbolOptions.stroke) ? symbolOptions.stroke : symbolOptions.fill;
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'verticalline':
                    var verPath = "M" + " " + (symbolRect.x) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x) + " " + (symbolRect.y + (-symbolRect.height / 2));
                    symbolOptions.d = verPath;
                    symbolOptions.stroke = (symbolOptions.stroke) ? symbolOptions.stroke : symbolOptions.fill;
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'triangle':
                    var triPath = "M" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " Z";
                    symbolOptions.d = triPath;
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'invertedtriangle':
                    var triPath = "M" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " Z";
                    symbolOptions.d = triPath;
                    symbolOptions.transform = 'rotate(180,' + (symbolRect.x) + ',' + symbolRect.y + ')';
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'hexagon':
                    var hexPath = "M" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 4)) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 4)) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 2)) + " " + (symbolRect.y) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 4)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 4)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y);
                    symbolOptions.d = hexPath;
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'wedge':
                    var wedgePath = "M" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y) + " "
                        + "L" + " " + (symbolRect.x + symbolRect.width / 2) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 4)) + " " + (symbolRect.y) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y);
                    symbolOptions.d = wedgePath;
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'pentagon':
                    var eq = 72;
                    var radius = Math.sqrt(symbolRect.height * symbolRect.height + symbolRect.width * symbolRect.width) / 2;
                    var sb = ej.EjSvgRender.utils._getStringBuilder();
                    for (var i = 0; i <= 5; i++) {
                        var deg = i * eq;
                        var rad = (Math.PI / 180) * deg;
                        var x1 = radius * Math.cos(rad);
                        var y1 = radius * Math.sin(rad);
                        if (i == 0)
                            sb.append("M" + " " + (symbolRect.x + x1) + " " + (symbolRect.y + y1) + " ");

                        else
                            sb.append("L" + " " + (symbolRect.x + x1) + " " + (symbolRect.y + y1) + " ");

                    }                        
                    symbolOptions.d = sb.toString();
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'star':
                    var starPath = "M" + " " + (symbolRect.x + (symbolRect.width / 3)) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 6)) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 6)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 3)) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 3)) + " " + (symbolRect.y + (-symbolRect.height / 2));
                    symbolOptions.d = starPath;
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'rectangle':
                    var rectPath = "M" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 2)) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y + (-symbolRect.height / 2));
                    symbolOptions.d = rectPath;
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'trapezoid':
                    var path = "M" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y + (-symbolRect.height / 4)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2) + (symbolRect.width)) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2) + (symbolRect.width)) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y + (symbolRect.height / 4)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y);
                    symbolOptions.d = path;
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'diamond':
                    var path = "M" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y) + " "
                        + "L" + " " + (symbolRect.x) + " " + (symbolRect.y + (-symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (symbolRect.width / 2)) + " " + (symbolRect.y) + " "
                        + "L" + " " + (symbolRect.x) + " " + (symbolRect.y + (symbolRect.height / 2)) + " "
                        + "L" + " " + (symbolRect.x + (-symbolRect.width / 2)) + " " + (symbolRect.y);
                    symbolOptions.d = path;
                    this.svgRenderer.drawPath(symbolOptions, captionGroup);
                    break;
                case 'ellipse':                        
                    symbolOptions.cx = symbolRect.x;
                    symbolOptions.cy = symbolRect.y;
                    symbolOptions.rx = symbolRect.width/2;
                    symbolOptions.ry = symbolRect.height/2;
                    this.svgRenderer.drawEllipse(symbolOptions, captionGroup);
                    break;
                case 'image':
                    symbolOptions.x = symbolRect.x - symbolRect.width / 2;
                    symbolOptions.y = symbolRect.y - symbolRect.height / 2;
                    symbolOptions.width = symbolRect.width;
                    symbolOptions.height = symbolRect.height;
                    symbolOptions.href = this.model.captionSettings.indicator.symbol.imageURL;
                    symbolOptions.visibility = 'visible';
                    this.svgRenderer.drawImage(symbolOptions, captionGroup);
                    break;
                default:
                    break;
            }                
        },
       
        _drawIndicator: function () {
            if (this.model.captionSettings.indicator.visible) {
                var indicatorSettings = this.model.captionSettings.indicator;
                var indicatorEventArgs = $.extend({}, { indicatorSettings: this.model.captionSettings.indicator });
                if (this.model.drawIndicator) {
                    this._trigger("drawIndicator", indicatorEventArgs);
                    if (indicatorEventArgs.cancel == false) {
                        indicatorSettings = indicatorEventArgs.indicatorSettings;
                        this.model.captionSettings.indicator = indicatorSettings;
                    }
                }
                var textBounds = ej.EjSvgRender.utils._measureText(indicatorSettings.text, null, indicatorSettings.font);
                this._indicator = { 'bounds': textBounds, 'settings': indicatorSettings };
            }
        },
      
        _indicatorTextOptions: function (settings, rect, bounds, id) {
            var location = settings._location ? settings._location : settings.location;
            return {
                'class' : id,
                'x': location.x + rect.width + settings.textSpacing,
                'y': location.y - rect.height / 2 + parseFloat(settings.font.size) / 3,
                'fill': settings.font.color,
                'font-size': settings.font.size,
                'font-family': settings.font.fontFamily,
                'font-style': settings.font.fontStyle,
                'font-weight': settings.font.fontWeight,
                'text-anchor': 'start',
                'opacity': settings.font.opacity,
                'transform': 'rotate(' + settings.textAngle + ',' + rect.x  + ',' + rect.y + ')'
            };
        },
      
        _indicatorSymbolOptions: function (group, settings) {
            return {
                'id': group.id + '_indicatorSymbol',
                'stroke': settings.symbol.border.color,
                'fill': settings.symbol.color,
                'stroke-width': settings.symbol.border.width,
                'opacity': settings.symbol.opacity
            };
        },
       
        _textOptions: function (text, id) {
            var location = (text._location ? text._location : text.location);
            var textOptions = {
                'class': id,
                'x': location.x,
                'y': location.y,
                'fill': text.font.color,
                'font-size': text.font.size,
                'font-family': text.font.fontFamily,
                'font-style': text.font.fontStyle,
                'font-weight': text.font.fontWeight,
                'text-anchor': 'start',
                'opacity': text.font.opacity,
				'cursor':'default',
                'transform': 'rotate(' + text.textAngle + ',' + (location.x) + ',' + (location.y) + ')'
            };
            return textOptions;
        },
       
        _drawScale: function (captionGroup, scaleGroup) {
            var scaleLocation = this._scale._location ? this._scale._location : this._scale.location;
            var pointY, pointX;
            if (this._tickPosition == ej.datavisualization.BulletGraph.TickPosition.Far || this._tickPosition == ej.datavisualization.BulletGraph.TickPosition.Center)
                pointY = (this._labelPosition == ej.datavisualization.BulletGraph.LabelPosition.Below) ? scaleLocation.y : scaleLocation.y + this._scale.labelSettings.offset + this._scale.labelSettings.size;
            else
                pointY = (this._labelPosition == ej.datavisualization.BulletGraph.LabelPosition.Below) ? scaleLocation.y + this._scale.majorTickSettings.size : scaleLocation.y + this._scale.labelSettings.offset + this._scale.labelSettings.size + this._scale.majorTickSettings.size;

            if (this._flowDirection == ej.datavisualization.BulletGraph.FlowDirection.Forward)
                pointX = scaleLocation.x;
            else
                pointX = (this._orientation == ej.datavisualization.BulletGraph.Orientation.Horizontal) ? scaleLocation.x - this._scale.labelSettings.offset : scaleLocation.x;

            var scaleOptions = {
                'id': this.svgObject.id + '_SvgScale',
                'x': pointX,
                'y': pointY,
                'width': this.model.quantitativeScaleLength,
                'height': this.model.qualitativeRangeSize,
                'fill': "transparent",
                'stroke-width': 0
            };
            this.svgRenderer.drawRect(scaleOptions, scaleGroup);
        },
     
        _drawMajorTicks: function (intervalValue, scaleGroup) {
            var majorPointX, y1, tickIndex = 0;
            var scaleLocation = this._scale.location;
            var isTicksInside = (this._tickPlacement == 'inside');
            var locX = this._scale.location.x;
            var scaleLength = this.model.quantitativeScaleLength;
            var labelOffset = this._scale.labelSettings.offset;

            var rangeSize = this.model.qualitativeRangeSize;
            var majorTickWidth = this._scale.majorTickSettings.width;
            var majorTickSize = this._scale.majorTickSettings.size;

            var isHorizontal = (this._orientation == ej.datavisualization.BulletGraph.Orientation.Horizontal);
            var isForward = (this._flowDirection == ej.datavisualization.BulletGraph.FlowDirection.Forward);
            var isBelow = (this._labelPosition == ej.datavisualization.BulletGraph.LabelPosition.Below);

            if (isForward)
                majorPointX = isHorizontal ? locX + (majorTickWidth / 2) : locX + scaleLength + (majorTickWidth / 2);
            else
                majorPointX = isHorizontal ? locX + scaleLength - (majorTickWidth / 2) : locX + (majorTickWidth / 2);
            
            if(this._tickPosition == 'far')
                y1 = scaleLocation.y + rangeSize + (isTicksInside ? -majorTickSize : 0);
            else if(this._tickPosition == 'near')
                y1 = scaleLocation.y + (isTicksInside ? 0 : -majorTickSize);
            else
                y1 = scaleLocation.y + (rangeSize / 2) - (majorTickSize / 2);
            
            var min = this._scale.minimum;
            var max = this._scale.maximum;
            var interval = this._scale.interval;
            
            for (var i = min; i <= max; i += interval) {
                tickIndex++;
                if (i >= max)
                    if (isHorizontal && !isForward)
                        majorPointX += majorTickWidth;
                    else
                        majorPointX -= majorTickWidth;
                if (!isHorizontal && isForward)
                    majorPointX = (i >= max) ? majorPointX + (majorTickWidth) : (i == min) ? majorPointX - (majorTickWidth) : majorPointX;

                if (this.model.applyRangeStrokeToTicks)
                   var strokeColor = this._bindingRangeStrokes(majorPointX - (majorTickWidth / 2));

                var options = this._majorTickLines(this._scale, majorPointX, y1, strokeColor);

                if (!isHorizontal && isForward && i == min)
                    majorPointX = majorPointX + majorTickWidth;
                
                if (this.model.drawTicks) {
                    var data = { majorTickSettings: this._scale.majorTickSettings, minorTickSettings: this._scale.minorTickSettings, minorTicksPerInterval: this._scale.minorTicksPerInterval, maximum: max, minimum: min, interval: interval };
                    this._trigger("drawTicks", data);                    
                    options = this._majorTickLines(data, majorPointX, y1, strokeColor);
                }
                var majorTicks = this.svgRenderer.createLine(options);
                majorPointX = ((!isForward && isHorizontal) || (isForward && !isHorizontal)) ? majorPointX - intervalValue : majorPointX + intervalValue;
                scaleGroup.appendChild(majorTicks);
            }
        },
        _majorTickLines: function (data, majorPointX, y1, strokeColor) {
            var options = {
                'x1': majorPointX,
                'y1': y1,
                'x2': majorPointX,
                'y2': y1 + data.majorTickSettings.size,
                'stroke-width': data.majorTickSettings.width,
                'stroke': (this.model.applyRangeStrokeToTicks && strokeColor) ? strokeColor : data.majorTickSettings.stroke
            };
            return options;
        },
       
        _forwardStrokeBinding: function (majorPointX) {
            if (majorPointX >= this._scale.location.x && majorPointX <= (this._rangeCollection[0] + this._scale.location.x)) {
                return this.model.qualitativeRanges[0].rangeStroke;
            }
            for (var k = 0; k <= this._rangeCollection.length - 1; k++) {
                if (majorPointX >= (this._rangeCollection[k] + this._scale.location.x) && majorPointX <= (this._rangeCollection[k + 1] + this._scale.location.x))
                    return this.model.qualitativeRanges[k + 1].rangeStroke;
            }
        },
       
        _backwardStrokeBinding: function (majorPointX) {
            if (majorPointX >= this._rangeCollection[this._rangeCollection.length - 1]) {
                return this.model.qualitativeRanges[0].rangeStroke;
            }
            for (var k = 0; k <= this._rangeCollection.length - 1; k++) {
                if (majorPointX >= this._rangeCollection[k] && majorPointX < this._rangeCollection[k + 1]) {
                    var index = $.inArray(this._rangeCollection[k], this._rangeCollection)
                    return this.model.qualitativeRanges[(this._rangeCollection.length - 1) - index].rangeStroke;
                }
            }
        },
      
        _bindingRangeStrokes: function (majorPointX) {
            if (this._rangeCollection.length == 1) {
                if (majorPointX >= this._scale.location.x && majorPointX <= (this._rangeCollection[0] + this._scale.location.x))
                    return this.model.qualitativeRanges[0].rangeStroke;
            }
            else {
                if ((this.model.orientation == ej.datavisualization.BulletGraph.Orientation.Horizontal && this._flowDirection == ej.datavisualization.BulletGraph.FlowDirection.Forward) || (this.model.orientation == ej.datavisualization.BulletGraph.Orientation.Vertical && this._flowDirection == ej.datavisualization.BulletGraph.FlowDirection.Backward)) {
                    return this._forwardStrokeBinding(majorPointX);
                }
                else {
                    return this._backwardStrokeBinding(majorPointX);
                }
            }
        },
       
        _drawMinorTicks: function (intervalValue, scaleGroup) {
            var majorPointX, minorPointX, y1, y2, x, tickIndex = 0;

            var isForward = (this._flowDirection == ej.datavisualization.BulletGraph.FlowDirection.Forward);
            var isHorizontal = (this._orientation == ej.datavisualization.BulletGraph.Orientation.Horizontal);

            var isTicksInside = (this._tickPlacement == 'inside');
            var locX = this._scale.location.x;
            var rangeSize = this.model.qualitativeRangeSize;
            var labelOffset = this._scale.labelSettings.offset;

            var majorTickSize = this._scale.majorTickSettings.size;
            var minorTickSize = this._scale.minorTickSettings.size;
            var minorTickWidth = this._scale.minorTickSettings.width;
            var scaleLength = this.model.quantitativeScaleLength;

            if (isForward)
                majorPointX = isHorizontal ? locX : locX + scaleLength;
            else
                majorPointX = isHorizontal ? locX + scaleLength - (minorTickWidth / 2) : locX;

            switch (this._tickPosition) {
                case 'far':
                    y1 = this._scale.location.y + rangeSize;
                    y2 = y1 + (isTicksInside ? -minorTickSize : minorTickSize);
                    break;
                case 'near':
                    y1 = this._scale.location.y + (isTicksInside ? minorTickSize : -minorTickSize);
                    y2 = this._scale.location.y;
                    break;                
                default:
                    y1 = this._scale.location.y + (rangeSize / 2) - (minorTickSize / 2);
                    y2 = y1 + minorTickSize;
                    break;
            }
            var maxLimit = this._scale.maximum;
            var min = this._scale.minimum;
            var interval = this._scale.interval;
            var minorTicksPerInterval = this._scale.minorTicksPerInterval;
           
            for (var i = min; i <= maxLimit; i += interval) {
                minorPointX = intervalValue / minorTicksPerInterval;

                for (var j = 1; j <= minorTicksPerInterval; j++) {
                    tickIndex++;
                    x = ((!isHorizontal && isForward) || (isHorizontal && !isForward))
                        ? majorPointX - minorPointX + (minorPointX / (minorTicksPerInterval + 1))
                        : majorPointX + minorPointX - (minorPointX / (minorTicksPerInterval + 1));

                    if (!isForward && isHorizontal) {
                        if (tickIndex >= ((maxLimit - min) * minorTicksPerInterval))
                            x += (minorTickWidth / 2);
                    }

                    if (this.model.applyRangeStrokeToTicks)
                       var strokeColor = this._bindingRangeStrokes(x);
                   
                    var options = this._minorTickLines(this._scale, x, y1, y2, strokeColor);
                    if (this.model.drawTicks) {
                        var data = { majorTickSettings: this._scale.majorTickSettings, minorTickSettings: this._scale.minorTickSettings, minorTicksPerInterval: this._scale.minorTicksPerInterval, maximum: this._scale.maximum, minimum: this._scale.minimum, interval: this._scale.interval };
                        this._trigger("drawTicks", data);
                        this._scale = $.extend(this._scale, data);
                        options = this._minorTickLines(data, x, y1, y2, strokeColor);
                    }
                   
                    var chkMax;
                    if (!isForward && isHorizontal) {
                        chkMax = (scaleLength + locX + 1);
                        if (x <= chkMax && x >= locX + 1) {
                            var minorTicks = this.svgRenderer.createLine(options);
                            scaleGroup.appendChild(minorTicks);
                        }
                    }
                    else if (isForward && !isHorizontal) {
                        chkMax = (locX + 1);
                        if (x >= chkMax) {
                            var minorTicks = this.svgRenderer.createLine(options);
                            scaleGroup.appendChild(minorTicks);
                        }
                    }
                    else {
                        chkMax = scaleLength + locX + 1;
                        if (x <= chkMax) {
                            var minorTicks = this.svgRenderer.createLine(options);
                            scaleGroup.appendChild(minorTicks);
                        }
                    }
                    
                    minorPointX = (intervalValue / minorTicksPerInterval) * (j + 1);
                }
                majorPointX = ((!isForward && isHorizontal) || (isForward && !isHorizontal)) ? majorPointX - intervalValue : majorPointX + intervalValue;
            }
        },
        _minorTickLines: function (data, x, y1, y2, strokeColor) {
            var options = {
                'x1': x,
                'y1': y1,
                'x2': x,
                'y2': y2,
                'stroke-width': data.minorTickSettings.width,
                'stroke': (this.model.applyRangeStrokeToTicks && strokeColor) ? strokeColor : data.minorTickSettings.stroke
            };
            return options;
        },
       
        _drawLabels: function (intervalValue, scaleGroup) {
            var labelX, pointY, locale = this.model.locale, localizedText = locale && this.model.enableGroupSeparator, text, transformText;
            var isForward = (this._flowDirection == ej.datavisualization.BulletGraph.FlowDirection.Forward);
            var isHorizontal = (this._orientation == ej.datavisualization.BulletGraph.Orientation.Horizontal);

            var locX = this._scale.location.x;
            var offset = this._scale.labelSettings.offset;
            var scaleLength = this.model.quantitativeScaleLength;

            var majorTickWidth = this._scale.majorTickSettings.width;
            var displayText;
            if (isForward)
                labelX = isHorizontal ? locX : locX + scaleLength;
            else
                labelX = isHorizontal ? locX + scaleLength : locX;
            
            var placement = this._tickPosition + this._labelPlacement;
            var isLabelsBelow = (this._labelPosition == ej.datavisualization.BulletGraph.LabelPosition.Below);

            var locY = this._scale.location.y;
            var rangeSize = this.model.qualitativeRangeSize;
            var labelSize = this._scale.labelSettings.size;
            var majorTickSize = this._scale.majorTickSettings.size;

            switch (placement) {
                case 'faroutside':
                case 'centeroutside':                    
                    pointY = isLabelsBelow ? this._scale.location.y + rangeSize + offset + labelSize : this._scale.location.y - offset;
                    break;
                case 'farinside':
                case 'centerinside':
                    pointY = isLabelsBelow ? this._scale.location.y + rangeSize - offset : this._scale.location.y + offset + (isHorizontal ? labelSize : 0);
                    break;
                case 'nearoutside':
                    pointY = isLabelsBelow ? this._scale.location.y + rangeSize + offset + labelSize : this._scale.location.y - offset;
                    break;
                case 'nearinside':
                    pointY = isLabelsBelow ? this._scale.location.y + rangeSize - offset : this._scale.location.y + offset + labelSize;
                    break;
            }
            var min = this._scale.minimum;
            var max = this._scale.maximum;
            var interval = this._scale.interval;
            var isLabelsInside = (this._labelPlacement == "inside");

            for (var i = min; i <= max; i += interval) {               
                var y = pointY;
                var x = labelX;
                var font = this._scale.labelSettings.font;
                font.size = labelSize;
                var labelWidth = {width: 0, height: 0};
                if (!isHorizontal) {
                    var label = this._scale.labelSettings.labelPrefix + i + this._scale.labelSettings.labelSuffix;
                    switch (placement) {
                        case 'faroutside':
                        case 'centeroutside':
                            if (isLabelsBelow)
                                y -= labelSize;
                            else {
                                labelWidth = ej.EjSvgRender.utils._measureText(label, null, font);
                                y -= labelWidth.width;
                            }
                            break;
                        case 'farinside':
                        case 'centerinside':
                            if (isLabelsBelow) {                                
                                labelWidth = ej.EjSvgRender.utils._measureText(label, null, font);
                                y -= labelWidth.width;
                            }
                            break;
                        case 'nearoutside':
                            if (!isLabelsBelow) {
                                labelWidth = ej.EjSvgRender.utils._measureText(label, null, font);
                                y -= labelWidth.width;
                            }
                            else
                                y -= labelSize;
                            break;
                        case 'nearinside':
                            if (isLabelsBelow) {
                                labelWidth = ej.EjSvgRender.utils._measureText(label, null, font);
                                y -= labelWidth.width;
                            }
                            else
                                y -= labelSize;
                            break;
                    }                    
                    x -= labelSize/3;
                    transformText = 'rotate(' + 90 + ',' + (x) + ',' + (y) + ')';
                }
                else
                    transformText = 'rotate(' + 0 + ',' + (x) + ',' + (y) + ')';

                if (this.model.applyRangeStrokeToLabels)
                   var strokeColor = this._bindingRangeStrokes(labelX);
                var labelOptions = this._labelOptions(this.model.quantitativeScaleSettings.labelSettings, x, y, transformText,strokeColor);
                if (this.model.drawLabels) {
                    var data = { font: this._scale.labelSettings.font, labelPrefix: this._scale.labelSettings.labelPrefix, labelSuffix: this._scale.labelSettings.labelSuffix, offset: offset, size: labelSize, stroke: this._scale.labelSettings.stroke };
                    this._trigger("drawLabels", data);
                    labelOptions = this._labelOptions(data, x, y, transformText,strokeColor);
                }

                if (isForward)
                    labelX = isHorizontal ? labelX + intervalValue : labelX - intervalValue;
                else
                    labelX = isHorizontal ? labelX - intervalValue : labelX + intervalValue;
                
				 text = localizedText ? i.toLocaleString(locale) : i;
                 displayText = text;
                if (!ej.util.isNullOrUndefined(labelOptions.labelPrefix))
                    displayText = labelOptions.labelPrefix + text;
                if (!ej.util.isNullOrUndefined(labelOptions.labelSuffix))
                    displayText = displayText + labelOptions.labelSuffix;
                             
                this.svgRenderer.drawText(labelOptions,displayText, scaleGroup);
            }
        },

        _labelOptions: function (data, labelX, pointY, transformText, strokeColor) {
            var labelOptions = {
                'x': labelX,
                'y': pointY,
                'text-anchor': (this._orientation == ej.datavisualization.BulletGraph.Orientation.Horizontal) ? 'middle' : 'start',
                'fill': (this.model.applyRangeStrokeToLabels && strokeColor) ? strokeColor : data.stroke,
                'font-size': data.size + "px",
                'font-family': data.font.fontFamily,
                'font-style': data.font.fontStyle,
                'font-weight': data.font.fontWeight,
                'opacity': data.font.opacity,
                'transform': transformText,
             
            };
            if (data.labelPrefix != "")
                labelOptions.labelPrefix = data.labelPrefix;
            if (data.labelSuffix != "")
                labelOptions.labelSuffix = data.labelSuffix;
            return labelOptions;
        },
      
        _drawQualitativeRanges: function (scaleGroup) {
            var pointX = this._scale.location.x, pointY = this._scale.location.y, width;
            var isForward = (this._flowDirection == ej.datavisualization.BulletGraph.FlowDirection.Forward);
            var isHorizontal = (this._orientation == ej.datavisualization.BulletGraph.Orientation.Horizontal);
            var labelOffset = this._scale.labelSettings.offset;

            this._rangeCollection = [];

            var placement = this._tickPosition + this._labelPlacement;
            var isLabelBelow = (this._labelPosition == ej.datavisualization.BulletGraph.LabelPosition.Below);

            var scaleHeight = this.model.qualitativeRangeSize;
            
            var locX = this._scale.location.x;
            var min = this._scale.minimum;
            var max = this._scale.maximum;
            var scaleLength = this.model.quantitativeScaleLength;            

            for (var i = this.model.qualitativeRanges.length - 1; i >= 0; i--) {
                var data = { object: this, rangeIndex: i, rangeOptions: this.model.qualitativeRanges[i], rangeEndValue: this.model.qualitativeRanges[i].rangeEnd };
                if (this.model.drawQualitativeRanges)
                    this._trigger("drawQualitativeRanges", data);
                var rangeEnd = data.rangeEndValue;
                rangeEnd = (rangeEnd > max) ? max : rangeEnd;
                if (isForward) {
                    pointX = isHorizontal ? locX : locX + (scaleLength - scaleLength / ((max - min) / ((max - min) - (max - rangeEnd))));
                    width = isHorizontal ? scaleLength / ((max - min) / ((max - min) - (max - rangeEnd))) : scaleLength / ((max - min) / ((max - min) - (max - rangeEnd)));
                }
                else {
                    pointX = isHorizontal ? locX + (scaleLength - scaleLength / ((max - min) / ((max - min) - (max - rangeEnd)))) : locX;
                    width = isHorizontal ? scaleLength / ((max - min) / ((max - min) - (max - rangeEnd))) : scaleLength / ((max - min) / ((max - min) - (max - rangeEnd)));
                }
                var rangeOptions = {
                    'x': pointX,
                    'y': pointY,
                    'height': this.model.qualitativeRangeSize,
                    'width': (width > 0) ? (width < scaleLength ? width : scaleLength) : 0,
                    'fill': data.rangeOptions.rangeStroke,
                    'opacity': data.rangeOptions.rangeOpacity
                };
                ((isHorizontal && isForward) || (!isHorizontal && !isForward)) ? this._rangeCollection.push(width) : this._rangeCollection.push(pointX);                
                this.svgRenderer.drawRect(rangeOptions, scaleGroup);
            }
            this._rangeCollection.sort(this._sortRangeCollection);
        },
      
        _sortRangeCollection: function (a, b) {
            return (a - b);
        },
      
        _calculateFeatureMeasureBounds: function (value, categoryValue) {
            var min = this._scale.minimum;
            value = (value < min && min < 0) ? min : value;                
            if (value >= min) {
                var x, lx, width;
                var locX = this._scale.location.x;
                var scaleLength = this.model.quantitativeScaleLength;
                var diff = this._scale.maximum - this._scale.minimum;
                var valueDiff = this._scale.maximum - value;
                var orientation = this._flowDirection.toLowerCase() + this._orientation.toLowerCase();
                categoryValue = (categoryValue == null) ? "" : categoryValue;
                var font = this._scale.labelSettings.font;
                font.size = this._scale.labelSettings.size;
                var stringLength = ej.EjSvgRender.utils._measureText(categoryValue.toString(), null, font).width;

                switch (orientation) {
                    case 'forwardhorizontal':
                    case 'backwardvertical':                        
                            x = locX + ((min > 0) ? 0 : scaleLength / diff * Math.abs(min));
                            width = scaleLength / (diff / ( (min > 0) ? diff - valueDiff : value));                            
                            if (value < 0) {
                                width = Math.abs(width);
                                x -= width;
                            }
                            width = (x + width < locX + scaleLength) ? width : locX + scaleLength - x;
                            lx = locX - ((orientation == 'forwardhorizontal') ? (stringLength / 2 + this._scale.labelSettings.offset) : this._scale.labelSettings.offset);
                            break;
                    default:
                        x = locX + (scaleLength - scaleLength / (diff / (diff - valueDiff)));
                        width = (min > 0) ? scaleLength / (diff / (diff - valueDiff)) : scaleLength / (diff / (value));
                        if (value < 0) {
                            width = Math.abs(width);
                            x -= width;
                        }
                        if (x < locX ) {
                            width = x + width - locX;
                            x = locX;
                        }                        
                        lx = locX + scaleLength + ((orientation == 'backwardhorizontal') ? (stringLength / 2 + this._scale.labelSettings.offset) : this._scale.labelSettings.offset);
                        break;
                }
                return { pointX: x, Width: width, lPointX: lx };
            }
            return false;
        },
      
        _drawFeatureMeasureBar: function () {
            var j = 1, count, value, categoryValue, transformText;
            var pointY, lPointY, locale = this.model.locale, localizedText = locale && this.model.enableGroupSeparator;
            var isDataFields = (!ej.isNullOrUndefined(this.model.fields) && this.model.fields["dataSource"] != null);
            var isVertical = (this._orientation == ej.datavisualization.BulletGraph.Orientation.Vertical);
            var bulletValue = (typeof (this.model.value) == 'function') ? this._value() : this.model.value;
            if (this._dataCount > 0) {
                for (var i = this._dataCount - 1; i >= 0; i--) {
                    value = isDataFields ? this.model.fields["dataSource"][i][this.model.fields.featureMeasures] : (ej.isNullOrUndefined(this._scale.featureMeasures[i].value) ? bulletValue : this._scale.featureMeasures[i].value);
                    categoryValue = isDataFields ? this.model.fields["dataSource"][i][this.model.fields.category] : this._scale.featureMeasures[i].category;

                    pointY = this._scale.location.y + (((this.model.qualitativeRangeSize / this._dataCount) * j) / 2) - (this._scale.featuredMeasureSettings.width / 2);
                    lPointY = this._scale.location.y + (((this.model.qualitativeRangeSize / this._dataCount) * j) / 2) + (this._scale.featuredMeasureSettings.width / 2) - 1;

                    var bounds = this._calculateFeatureMeasureBounds(value, categoryValue);
                    if (bounds) {

                        var featureBarOptions = this._featureBar(this._scale, bounds.pointX, pointY, bounds.Width, i);
                        if (this.model.drawFeatureMeasureBar) {
                            var data = { featuredMeasureSettings: this._scale.featuredMeasureSettings };
                            this._trigger("drawFeatureMeasureBar", data);
                            featureBarOptions = this._featureBar(data, bounds.pointX, pointY, bounds.Width, i);
                        }
                        this.svgRenderer.drawRect(featureBarOptions, this._scaleGroup);

                        if (isVertical)
                            transformText = 'rotate(' + 90 + ',' + bounds.lPointX + ',' + (lPointY - 4) + ')';
                        else
                            transformText = 'rotate(' + 0 + ',' + bounds.lPointX + ',' + lPointY + ')';


                        var categoryOptions = this._drawcategory(this.model.quantitativeScaleSettings.labelSettings, bounds.lPointX, lPointY, transformText);
                        if (this.model.drawCategory) {
                            var data = { size: this.model.quantitativeScaleSettings.labelSettings.size, stroke: this.model.quantitativeScaleSettings.labelSettings.stroke, font: this.model.quantitativeScaleSettings.labelSettings.font, categoryValue: categoryValue };
                            this._trigger("drawCategory", data);
                            categoryOptions = this._drawcategory(data, bounds.lPointX, lPointY, transformText);
                            categoryValue = data.categoryValue;
                        }
                        if (!ej.isNullOrUndefined(categoryValue))
                            this.svgRenderer.drawText(categoryOptions, localizedText ? categoryValue.toLocaleString(locale) : categoryValue, this._scaleGroup);
                        j += 2;
                        this.value(value);
                    }
                }

            }
        },
        _drawcategory: function (category, lPointX, lPointY, transformText) {
            var categoryOptions = {
                'x': lPointX,
                'y': lPointY + (this._scale.featuredMeasureSettings.width / 2),
                'text-anchor': 'middle',
                'fill': category.stroke,
                'font-size': category.size + "px",
                'font-family': category.font.fontFamily,
                'font-style': category.font.fontStyle,
                'font-weight': category.font.fontWeight,
                'opacity': category.font.opacity,
                'transform': transformText
            };
            return categoryOptions;
        },
        _featureBar: function (data, pointX, pointY, width, i) {
            var featureBarOptions = {
                'class': this.svgObject.id + "_FeatureMeasure",
                'id': this.svgObject.id + "_FeatureMeasure_" + i,
                'x': pointX,
                'y': pointY,
                'height': data.featuredMeasureSettings.width,
                'width': width,
                'fill': data.featuredMeasureSettings.stroke            
            };           
            return featureBarOptions;
        },
       
        _drawComparativeMeasureSymbol: function () {
            var j = 1, value;
            var y1, y2, x1;

            var isForward = (this._flowDirection == ej.datavisualization.BulletGraph.FlowDirection.Forward);
            var isHorizontal = (this._orientation == ej.datavisualization.BulletGraph.Orientation.Horizontal);
            var bulletCMValue = (typeof (this.model.comparativeMeasureValue) == 'function') ? this._comparativeMeasureValue() : this.model.comparativeMeasureValue;
            if (this._dataCount > 0) {
                for (var i = this._dataCount - 1; i >= 0; i--) {
                    value = (!ej.isNullOrUndefined(this.model.fields) && this.model.fields["dataSource"] != null) ? this.model.fields["dataSource"][i][this.model.fields.comparativeMeasure] : (ej.isNullOrUndefined(this._scale.featureMeasures[i].comparativeMeasureValue) ? bulletCMValue : this._scale.featureMeasures[i].comparativeMeasureValue);
                    if (value >= this._scale.minimum && value <= this._scale.maximum) {
                        y1 = this._scale.location.y + (((this.model.qualitativeRangeSize / this._dataCount) * j) / 2) - (this._scale.featuredMeasureSettings.width / 2) - this._scale.featuredMeasureSettings.width;
                        y2 = this._scale.location.y + (((this.model.qualitativeRangeSize / this._dataCount) * j) / 2) - (this._scale.featuredMeasureSettings.width / 2) + (2 * this._scale.featuredMeasureSettings.width);
                        
                        if (isForward)
                            x1 = isHorizontal ? this._scale.location.x + (this.model.quantitativeScaleLength / ((this._scale.maximum - this._scale.minimum) / ((this._scale.maximum - this._scale.minimum) - (this._scale.maximum - value)))) : this._scale.location.x + (this.model.quantitativeScaleLength - (this.model.quantitativeScaleLength / ((this._scale.maximum - this._scale.minimum) / ((this._scale.maximum - this._scale.minimum) - (this._scale.maximum - value)))));
                        else
                            x1 = isHorizontal ? this._scale.location.x + (this.model.quantitativeScaleLength - (this.model.quantitativeScaleLength / ((this._scale.maximum - this._scale.minimum) / ((this._scale.maximum - this._scale.minimum) - (this._scale.maximum - value))))) : this._scale.location.x + (this.model.quantitativeScaleLength / ((this._scale.maximum - this._scale.minimum) / ((this._scale.maximum - this._scale.minimum) - (this._scale.maximum - value))));

                        var compareMeasureOptions = this._compareMeasure(this._scale, x1, y1, y2, i, value);
                        if (this.model.drawComparativeMeasureSymbol) {
                            var data = { comparativeMeasureSettings: this._scale.comparativeMeasureSettings };
                            this._trigger("drawComparativeMeasureSymbol", data);
                            compareMeasureOptions = this._compareMeasure(data, x1, y1, y2, i, value);
                        }
                       
                        this.svgRenderer.drawLine(compareMeasureOptions, this._scaleGroup);
                        j += 2;
                        this.comparativeMeasureValue(value);
                    }
                }
            }
        },
        _compareMeasure: function(data, x1, y1, y2, i, value){
            var compareMeasureOptions = {
                'class': this.svgObject.id + "_ComparativeMeasure",
                'id': this.svgObject.id + "_ComparativeMeasure_" + i,
                'x1': (value == this._scale.maximum) ? x1 - (data.comparativeMeasureSettings.width / 2) : (value == this._scale.minimum) ? x1 + (data.comparativeMeasureSettings.width / 2) : x1,
                'y1': y1,
                'x2': (value == this._scale.maximum) ? x1 - (data.comparativeMeasureSettings.width / 2) : (value == this._scale.minimum) ? x1 + (data.comparativeMeasureSettings.width / 2) : x1,
                'y2': y2,
                'stroke-width': data.comparativeMeasureSettings.width,
                'stroke': data.comparativeMeasureSettings.stroke
            };
            return compareMeasureOptions;
        },
       
        _setTheme: function (jsonObj, themeName) {
            var result = [];
            this._scale = this.model.quantitativeScaleSettings;
            for (var name in jsonObj) {
                result.push(name);
            }
            for (var i = 0; i < result.length; i++) {
                this._scale.majorTickSettings.stroke = ((!this._scale.majorTickSettings.stroke || this._scale.majorTickSettings.stroke == jsonObj[result[i]].quantitativeScaleSettings.majorTickSettings.stroke) ? jsonObj[themeName].quantitativeScaleSettings.majorTickSettings.stroke : this._scale.majorTickSettings.stroke);
                this._scale.minorTickSettings.stroke = ((!this._scale.minorTickSettings.stroke || this._scale.minorTickSettings.stroke == jsonObj[result[i]].quantitativeScaleSettings.minorTickSettings.stroke) ? jsonObj[themeName].quantitativeScaleSettings.minorTickSettings.stroke : this._scale.minorTickSettings.stroke);
                this._scale.labelSettings.stroke = ((!this._scale.labelSettings.stroke || this._scale.labelSettings.stroke == jsonObj[result[i]].quantitativeScaleSettings.labelSettings.stroke) ? jsonObj[themeName].quantitativeScaleSettings.labelSettings.stroke : this._scale.labelSettings.stroke);
                this._scale.featuredMeasureSettings.stroke = ((!this._scale.featuredMeasureSettings.stroke || this._scale.featuredMeasureSettings.stroke == jsonObj[result[i]].quantitativeScaleSettings.featuredMeasureSettings.stroke) ? jsonObj[themeName].quantitativeScaleSettings.featuredMeasureSettings.stroke : this._scale.featuredMeasureSettings.stroke);
                this._scale.comparativeMeasureSettings.stroke = ((!this._scale.comparativeMeasureSettings.stroke || this._scale.comparativeMeasureSettings.stroke == jsonObj[result[i]].quantitativeScaleSettings.comparativeMeasureSettings.stroke) ? jsonObj[themeName].quantitativeScaleSettings.comparativeMeasureSettings.stroke : this._scale.comparativeMeasureSettings.stroke);
                this.model.captionSettings.font.color = ((!this.model.captionSettings.font.color || this.model.captionSettings.font.color == jsonObj[result[i]].captionSettings.font.color) ? jsonObj[themeName].captionSettings.font.color : this.model.captionSettings.font.color);
                this.model.captionSettings.subTitle.font.color = ((!this.model.captionSettings.subTitle.font.color || this.model.captionSettings.subTitle.font.color == jsonObj[result[i]].captionSettings.subTitle.font.color) ? jsonObj[themeName].captionSettings.subTitle.font.color : this.model.captionSettings.subTitle.font.color);
                this.model.captionSettings.indicator.font.color = ((!this.model.captionSettings.indicator.font.color || this.model.captionSettings.indicator.font.color == jsonObj[result[i]].captionSettings.indicator.font.color) ? jsonObj[themeName].captionSettings.indicator.font.color : this.model.captionSettings.indicator.font.color);
                this.model.captionSettings.indicator.symbol.color = ((!this.model.captionSettings.indicator.symbol.color || this.model.captionSettings.indicator.symbol.color == jsonObj[result[i]].captionSettings.indicator.symbol.color) ? jsonObj[themeName].captionSettings.indicator.symbol.color : this.model.captionSettings.indicator.symbol.color);
                for (var j = 0; j < this.model.qualitativeRanges.length; j++)
                    this.model.qualitativeRanges[j].rangeStroke = ((!this.model.qualitativeRanges[j].rangeStroke) ? (ej.isNullOrUndefined(jsonObj[themeName].qualitativeRanges[j]) ? jsonObj[themeName].qualitativeRanges[0].rangeStroke : jsonObj[themeName].qualitativeRanges[j].rangeStroke) : this.model.qualitativeRanges[j].rangeStroke);
            }
            //            this.model = $.extend(true, this.model, jsonObj[themeName], this.model);
        },

      
       
        _onDrawQualitativeRanges: function (rangeOptions, rangeEnd, rangeIndex) {
            var data = { object: this, scaleElement: this.model.quantitativeScaleSettings, rangeIndex: rangeIndex, rangeElement: rangeOptions, rangeEndValue: rangeEnd };
            this._trigger("drawQualitativeRanges", data);
        },
        
       
        _doAnimation: function () {
            var elements = $("." + this.svgObject.id + "_FeatureMeasure");
            for (var i = elements.length - 1; i >= 0; i--) {
                var element = elements[i];
                this._animateFeatureBar(element);
            }
        },
      
        _doLineAnimation: function () {
            var compareElements = $("." + this.svgObject.id + "_ComparativeMeasure");
            var secondsPerPoint = 2000 / compareElements.length;
            for (var i = compareElements.length - 1; i >= 0; i--) {
                var element = compareElements[i];
                $(element).attr("transform", "scale(0)");
                this._doLineSymbol(element, secondsPerPoint, i);
            }
        },
       
        _animateFeatureBar: function (element) {
            var box = element.getBBox();
            var left, top, scaleVal;
            if (((this._orientation == ej.datavisualization.BulletGraph.Orientation.Horizontal) && (this._flowDirection == ej.datavisualization.BulletGraph.FlowDirection.Backward)) || ((this._orientation == ej.datavisualization.BulletGraph.Orientation.Vertical) && (this._flowDirection == ej.datavisualization.BulletGraph.FlowDirection.Forward))) {
                left = box.x + box.width;
                top = box.y + box.height;
            }
            else {
                left = box.x;
                top = box.y;
            }
            $(element).animate(
            {
                scale: 1
            },
            {
                duration: 1000,

                step: function (now) {
                    scaleVal = now;
                    $(element).attr("transform", "translate(" + left + " " + top + ") scale(" + now + ",1) translate(" + (-left) + " " + (-top) + ")");
                }
            });
        },
      
        _doLineSymbol: function (element, sec, val) {
            var beginTime = parseInt(val * sec);
            var box = element.getBBox();
            var centerX = box.x + (box.width / 2);
            var centerY = box.y + (box.height / 2);
            $(element).delay(beginTime).animate(
                {
                    scale: 1
                },
                {
                    duration: 200,
                    step: function (now) {
                        $(element).attr("transform", "translate(" + centerX + " " + centerY + ") scale(" + now + ") translate(" + (-centerX) + " " + (-centerY) + ")");
                    }
                });
        },
      
        bindEvents: function () {
            var browserInfo = ej.EjSvgRender.utils.browserInfo(),
            isPointer = browserInfo.isMSPointerEnabled,
            isIE11Pointer = browserInfo.pointerEnabled,
            touchStartEvent = isPointer ? (isIE11Pointer ? "pointerdown" : "MSPointerDown") : "touchstart mousedown",
            touchStopEvent = isPointer ? (isIE11Pointer ? "pointerup" : "MSPointerUp") : "touchend mouseup",
            touchMoveEvent = isPointer ? (isIE11Pointer ? "pointermove" : "MSPointerMove") : "touchmove mousemove",
            touchCancelEvent = isPointer ? (isIE11Pointer ? "pointerleave" : "MSPointerOut") : "touchleave mouseleave";
            this.model.browserInfo = browserInfo;

            this._on($(this.svgObject), touchMoveEvent, this._bulletMouseMove);
            this._on($(this.svgObject), touchCancelEvent, this._bulletMouseLeave);
            this._on($(this.svgObject), touchStartEvent, this._bulletMouseDown);
            this._on($(this.svgObject), touchStopEvent, this._bulletMouseUp);
            this._on($(this.svgObject), "contextmenu", this._bulletRightClick);
            this._on($(this.svgObject), "click", this._bulletClick);
             
            if (this.model.enableResizing || this.model.isResponsive) {
                if (!ej.isTouchDevice())
                    this._on($(window), "resize", this._bulletResize);
                else
                    this._on($(window), "orientationchange", this._bulletResize);
            }
        },

        _unwireEvents: function(){
            this._off($(this.svgObject), "contextmenu", this._bulletRightClick);
            this._off($(this.svgObject), "click", this._bulletClick);
        },
       
        isDevice: function () {
            // return (/mobile|tablet|android|kindle/i.test(navigator.userAgent.toLowerCase()));
            // comment above line temporary. Due to the below code event wont bind for tablet device
            return (/mobile|tablet|android|kindle/i.test(navigator.userAgent.toLowerCase()));
        },
       
        _bulletResize: function () {
            var bullet = this,
				height = this.model.height,
				width = this.model.width;
            var $svgObj = $(bullet.svgObject);
            var height = 90;
            var width = (ej.isTouchDevice()) ? 250 : 595;
            var containerWidth = $(bullet.element).width();
            if (bullet.model.width)
                width = parseInt(bullet.model.width);
            else if (containerWidth > 0 && containerWidth < 595)
                width = containerWidth;
            else if(containerWidth > 595)
                width = 595;
            if (bullet.model.height)
                height = parseInt(bullet.model.height);
            var containerHeight = $(bullet.element).height() > height ? height : $(bullet.element).height();
            if (this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function () {
				if(width < $(bullet.element).width())
					$svgObj.width(width);
				else
					$svgObj.width($(bullet.element).width());
                $svgObj.height(containerHeight);
                bullet.redraw();
            }, 500);
        },
		
        _bulletMouseLeave: function (evt) {
            if (!this.isTouch(evt)) {
                $('#tooltip').remove();
                $(".tooltipDiv" + this._id).remove();            
            }
		},
		isTouch: function (evt) {
		    var event = evt.originalEvent ? evt.originalEvent : evt;
		    if ((event.pointerType == "touch") || (event.pointerType == 2) || (event.type.indexOf("touch") > -1))
		        return true;
		    return false;
		},
       
        _bulletMouseMove: function (evt) {
            var currentVal, targetVal, categoryVal, measureId, targetId, targetClass;        
            targetId = $(evt.target).attr("id"),
            targetClass = $(evt.target).attr("class");           
            if (!this.isTouch(evt)) {
                $('#tooltip').remove();
                $(".tooltipDiv" + this._id).remove();
                this._elementTooltip(evt, targetClass, targetId);
                this._displayTooltip(evt, targetClass, targetId);
            }
         
        },

        _bulletMouseDown: function (evt) {
            if (this.isTouch(evt)) {
                $('#tooltip').remove();
                $(".tooltipDiv" + this._id).remove();
                var targetId = $(evt.target).attr("id"),
                    targetClass = $(evt.target).attr("class");
                this._elementTooltip(evt, targetClass, targetId);
                this._displayTooltip(evt, targetClass, targetId);
            }
            if(ej.isTouchDevice() && this.model.rightClick != '')
                this._longPressTimer = new Date();
        },
        _bulletMouseUp: function (evt) {
            if (this.isTouch(evt)) {
                var bullet = this, element;
                window.clearTimeout(bullet.model.timer);
                if ($(".tooltipDiv" + this._id).length == 1)
                    element = $(".tooltipDiv" + this._id);
                if (element) {                   
                    bullet.model.trackerElement = element;
                    bullet.model.timer = setTimeout(function () {
                        if (bullet.model.trackerElement)
                            $(".tooltipDiv" + bullet._id).fadeOut(500, function () {
                                $(".tooltipDiv" + bullet._id).remove();
                                $("[id*=" + bullet.svgObject.id + "_FeatureMeasure_" + "]").attr("opacity", "1");
                            });
                    }, 1200);
                }
            }
            if(ej.isTouchDevice() && this.model.rightClick != '' && new Date() - this.model._longPressTimer > 1500)
                this._bulletRightClick(evt);
        },

        _bulletClick: function(e){
            var end = new Date();
            if(this.model.click != '')
                this._trigger("click", {data: {event: e}});
            if(this._doubleTapTimer != null && end - this._doubleTapTimer < 300)
                this._bulletDoubleClick(e);
            this._doubleTapTimer = end;
        },

        _bulletDoubleClick: function(e){
            if(this.model.doubleClick != '')
                this._trigger("doubleClick", {data: {event: e}});
        },

        _bulletRightClick: function(e){
            if(this.model.rightClick != '')
                this._trigger("rightClick", { data:{event: e}});
        },

        _elementTooltip: function (evt,targetClass, targetId) {             
            var captionSettings = this.model.captionSettings,
             tooltipdiv = $("<div></div>").attr({ 'id': 'tooltip', "class": "tooltipDiv" + this._id }),
             pointer = this.mousePosition(evt);
           var str = "";
            // adding css prop to the div
            $(tooltipdiv).css({
                "left": pointer.pageX + 10,
                "top": pointer.pageY + 10,
                "display": "block",
                "position": "absolute",
                "z-index": "13000",
                "cursor": "default",
                "font-family": "Segoe UI",
                "color": "#707070",
                "font-size": "12px",
                "background-color": "#FFFFFF",
                "border": "1px solid #707070"
            });
            if (targetClass == this.svgObject.id + "_Caption")
                str = evt.target.textContent == captionSettings.text ? "" : captionSettings.text;
            else if (targetClass == this.svgObject.id + "_SubTitle")
                str = evt.target.textContent == captionSettings.subTitle.text ? "" : captionSettings.subTitle.text;
            else if (targetClass == this.svgObject.id + "_Indicator")
                str = evt.target.textContent == captionSettings.indicator.text ? "" : captionSettings.indicator.text;
            if (str != "") {
                $(tooltipdiv).html("&nbsp" + str + "&nbsp");
                $(document.body).append(tooltipdiv);
            }
            else if (this.model.tooltipSettings.enableCaptionTooltip && (targetClass == this.svgObject.id + '_Caption' || targetClass == this.svgObject.id + '_SubTitle' || targetClass == this.svgObject.id + '_Indicator')) {
                var text = $('.' + targetClass).text();
                var data = { Text: text };
                var template = this.model.tooltipSettings.captionTemplate;
                if ($('.tooltipDiv' + this._id).length == 0) {
                    tooltipdiv = $("<div></div>").attr('class', 'tooltipDiv' + this._id).css({ 'position': 'absolute', 'z-index': '13000', 'display': 'block' });                   
                    $(document.body).append(tooltipdiv);
                    
                }
                if (template != "" && template != null) {
                    var cloneNode = document.getElementById(template);
                    cloneNode = (cloneNode ? $(cloneNode).clone() : $(template));
                    $(cloneNode).css("display", "block").appendTo(tooltipdiv);
                    $(tooltipdiv).html($(cloneNode).render(data));
                } else {
                    $(tooltipdiv).html(text);
                }
                $(tooltipdiv).css('font-size', '12px');
                var xPos = pointer.clientX + $(document).scrollLeft() + 10;
                var yPos = pointer.clientY + $(document).scrollTop() + 10;
                xPos = ((xPos + $(tooltipdiv).width()) < $(window).width()) ? (xPos) : (xPos - $(tooltipdiv).width());
                yPos = ((yPos + $(tooltipdiv).height()) < $(window).height()) ? (yPos) : (yPos - $(tooltipdiv).height());

                if (xPos === undefined || xPos === null)
                    xPos = pointer.clientX + $(document).scrollLeft() + 10;
                if (yPos === undefined || yPos === null)
                    yPos = pointer.clientY + $(document).scrollTop() + 10;
                $(tooltipdiv).css({
                    'left': xPos,
                    'top': yPos,
                    '-webkit-border-radius': "5px 5px 5px 5px",
                    '-moz-border-radius': "5px 5px 5px 5px",
                    '-o-border-radius': "5px 5px 5px 5px",
                    'border-radius': "5px 5px 5px 5px",
                    'background-color': "White",
                    'border': "1px Solid Black",
                    'padding-bottom': "5px",
                    'padding-left': "5px",
                    'padding-right': "5px",
                    'padding-top': "5px"
                });

            }
        },
        mousePosition: function (evt) {
            if (!ej.util.isNullOrUndefined(evt.pageX) && evt.pageX > 0)
                return evt;
            else if (evt.originalEvent && !ej.util.isNullOrUndefined(evt.originalEvent.pageX) && evt.originalEvent.pageX > 0)
                return evt.originalEvent;
            else if (evt.originalEvent && evt.originalEvent.changedTouches != undefined) {
                if (!ej.util.isNullOrUndefined(evt.originalEvent.changedTouches[0].pageX) && evt.originalEvent.changedTouches[0].pageX > 0)
                    return evt.originalEvent.changedTouches[0];
            }
            return evt;

        },
        _displayTooltip: function (evt, targetClass, targetId) {
            if (targetClass != "undefined" && (targetClass == this.svgObject.id + '_FeatureMeasure' || targetClass == this.svgObject.id + '_ComparativeMeasure')) {
                var locale = this.model.locale, localizedText = locale && this.model.enableGroupSeparator, data, measureId, currentVal, targetVal, categoryVal, tooltipdiv;
                var bulletValue = (typeof (this.model.value) == 'function') ? this._value() : this.model.value,
                 bulletCMValue = (typeof (this.model.comparativeMeasureValue) == 'function') ? this._comparativeMeasureValue() : this.model.comparativeMeasureValue,
                 pointer = this.mousePosition(evt);
                measureId = targetId.substring(targetId.lastIndexOf("_") + 1);
                currentVal = (!ej.isNullOrUndefined(this.model.fields) && this.model.fields["dataSource"] != null) ? this.model.fields["dataSource"][measureId][this.model.fields.featureMeasures] : (ej.isNullOrUndefined(this._scale.featureMeasures[measureId].value) ? bulletValue : this._scale.featureMeasures[measureId].value);
                targetVal = (!ej.isNullOrUndefined(this.model.fields) && this.model.fields["dataSource"] != null) ? this.model.fields["dataSource"][measureId][this.model.fields.comparativeMeasure] : (ej.isNullOrUndefined(this._scale.featureMeasures[measureId].comparativeMeasureValue) ? bulletCMValue : this._scale.featureMeasures[measureId].comparativeMeasureValue);
                categoryVal = (!ej.isNullOrUndefined(this.model.fields) && this.model.fields["dataSource"] != null) ? (ej.isNullOrUndefined(this.model.fields["dataSource"][measureId][this.model.fields.category])) ? null : this.model.fields["dataSource"][measureId][this.model.fields.category] : (ej.isNullOrUndefined(this._scale.featureMeasures[measureId].category)) ? null : this._scale.featureMeasures[measureId].category;
				if (localizedText)
					data = {currentValue: currentVal.toLocaleString(locale), targetValue: targetVal.toLocaleString(locale), 
							category: (!ej.util.isNullOrUndefined(categoryVal) ? categoryVal.toLocaleString(locale) : categoryVal)};
				else
					data = {currentValue: currentVal, targetValue: targetVal, category: categoryVal};
                if ($('.tooltipDiv' + this._id).length == 0) {
                    tooltipdiv = $("<div></div>").attr('class', 'tooltipDiv' + this._id).css({ 'position': 'absolute', 'z-index': '13000', 'display': 'block' });                  
                    $(document.body).append(tooltipdiv);                   
                }
                if (this.model.tooltipSettings.template != "" && this.model.tooltipSettings.template != null) {
                    var cloneNode = $("#" + this.model.tooltipSettings.template).clone();
                    $(cloneNode).css("display", "block").appendTo(tooltipdiv);
                    $(tooltipdiv).html($(cloneNode).render(data));
                } else {
                    var category = (!ej.isNullOrUndefined(data.category)) ? ("<br/> Category : " + data.category) : "";
                    $(tooltipdiv).html("Current : " + data.currentValue + "<br/> Target : " + data.targetValue + category);
                }
                $(tooltipdiv).css("font-size", "12px");
                var xPos = pointer.clientX + $(document).scrollLeft() + 10;
                var yPos = pointer.clientY + $(document).scrollTop() + 10;
                xPos = ((xPos + $(tooltipdiv).width()) < $(window).width()) ? (xPos) : (xPos - $(tooltipdiv).width());
                yPos = ((yPos + $(tooltipdiv).height()) < $(window).height()) ? (yPos) : (yPos - $(tooltipdiv).height());

                if (xPos === undefined || xPos === null)
                    xPos = pointer.clientX + $(document).scrollLeft() + 10;
                if (yPos === undefined || yPos === null)
                    yPos = pointer.clientY + $(document).scrollTop() + 10;
                $(tooltipdiv).css({
                    'left': xPos,
                    'top': yPos,
                    '-webkit-border-radius': "5px 5px 5px 5px",
                    '-moz-border-radius': "5px 5px 5px 5px",
                    '-o-border-radius': "5px 5px 5px 5px",
                    'border-radius': "5px 5px 5px 5px",
                    'background-color': "White",
					'color':"black",
                    'border': "1px Solid Black",
                    'padding-bottom': "5px",
                    'padding-left': "5px",
                    'padding-right': "5px",
                    'padding-top': "5px"
                });
                if (targetClass == this.svgObject.id + '_FeatureMeasure')
                    $("#" + targetId).attr("opacity", "0.7");
            }          
            
        },

       
        redraw: function () {
            $(this.svgObject).empty();
            this._renderBulletElements();
        },
        
        destroy: function () {
            this._unwireEvents();
            $(this.element).removeClass("e-bulletgraph e-js").find("#" + this.svgObject.id).remove();
        },
          
        setFeatureMeasureBarValue: function (index, measureValue) {
            this._scale = this.model.quantitativeScaleSettings;
            var length = (!ej.isNullOrUndefined(this.model.fields) && this.model.fields["dataSource"] != null) ? this.model.fields["dataSource"].length : this._scale.featureMeasures.length;   
            if (index < length && measureValue != null) {
                if (!ej.isNullOrUndefined(this.model.fields) && this.model.fields["dataSource"] != null)
                    this.model.fields["dataSource"][index][this.model.fields.featureMeasures] = measureValue;
                else
                    this._scale.featureMeasures[index].value = measureValue;
                this.redraw();
                if (this.model.enableAnimation)
                    this._doAnimation();
            }
        },
          
        setComparativeMeasureSymbol: function (index, measureValue) {
            this._scale = this.model.quantitativeScaleSettings;
            var length = (!ej.isNullOrUndefined(this.model.fields) && this.model.fields["dataSource"] != null) ? this.model.fields["dataSource"].length : this._scale.featureMeasures.length;   
            if (index < length && measureValue != null) {
                if (!ej.isNullOrUndefined(this.model.fields) && this.model.fields["dataSource"] != null)
                    this.model.fields["dataSource"][index][this.model.fields.comparativeMeasure] = measureValue;
                else
                    this._scale.featureMeasures[index].comparativeMeasureValue = measureValue;
                this.redraw();
                if (this.model.enableAnimation)
                    this._doLineAnimation();
            }
        }

    });
      
    ej.datavisualization.BulletGraph.Orientation = {
          
        Horizontal: "horizontal",
          
        Vertical: "vertical"
    };
      
    ej.datavisualization.BulletGraph.TickPlacement = {
          
        Inside: "inside",
          
        Outside: "outside"
    };
      
    ej.datavisualization.BulletGraph.LabelPlacement = {
          
        Inside: "inside",
          
        Outside: "outside"
    };
      
    ej.datavisualization.BulletGraph.Shape = {
          
        Circle: "circle",
          
        Cross: "cross",
          
        Diamond: "diamond",
          
        DownArrow: "downarrow",
          
        Ellipse: "ellipse",
          
        HorizontalLine: "horizontalLine",
          
        Image: "image",
          
        InvertedTriangle: "invertedtriangle",
          
        LeftArrow: "leftarrow",
          
        Pentagon: "pentagon",
          
        Rectangle: "Rectangle",
          
        RightArrow: "rightarrow",
          
        Star: "star",
          
        Trapezoid: "trapezoid",
          
        Triangle: "triangle",
          
        UpArrow: "uparrow",
          
        VerticalLine: "verticalline",
          
        Wedge: "wedge",
    };
      
    ej.datavisualization.BulletGraph.TickPosition = {
          
        Far: "far",
          
        Near: "near",
          
        Center: "center"
    };
      
    ej.datavisualization.BulletGraph.LabelPosition = {
          
        Below: "below",
          
        Above: "above"
    };
      
    ej.datavisualization.BulletGraph.FlowDirection = {
          
        Forward: "forward",
          
        Backward: "backward"
    };
      
    ej.datavisualization.BulletGraph.FontStyle = {
          
        Normal: "Normal",
          
        Italic: "Italic",
          
        Oblique: "Oblique"
    };
      
    ej.datavisualization.BulletGraph.FontWeight = {
          
        Normal: "Normal",
          
        Bold: "Bold",
          
        Bolder: "Bolder",
          
        Lighter: "Lighter"
    };
      
    ej.datavisualization.BulletGraph.Themes = {
          
        flatlight: {
            quantitativeScaleSettings: {
                majorTickSettings: { stroke: "#191919" },
                minorTickSettings: { stroke: "#191919" },
                labelSettings: {
                    stroke: "#191919"
                },
                featuredMeasureSettings: { stroke: "#191919" },
                comparativeMeasureSettings: { stroke: "#191919" }
            },
            qualitativeRanges: [{
                rangeStroke: "#ebebeb"
            }, {
                rangeStroke: "#d8d8d8"
            }, {
                rangeStroke: "#7f7f7f"
            }],
            captionSettings: {
                font: { color: "#191919" },
                subTitle: {
                    font: { color: "#191919" }
                },
                indicator: {
                    font: { color: "#191919" },
                    symbol: { color: "#191919" }
                }
            }
        },
        material: {
            quantitativeScaleSettings: {
                majorTickSettings: { stroke: "#333333" },
                minorTickSettings: { stroke: "#191919" },
                labelSettings: {
                    stroke: "#333333"
                },
                featuredMeasureSettings: { stroke: "#333333" },
                comparativeMeasureSettings: { stroke: "#333333" }
            },
            qualitativeRanges: [{
                rangeStroke: "#ebebeb"
            }, {
                rangeStroke: "#d8d8d8"
            }, {
                rangeStroke: "#7f7f7f"
            }],
            captionSettings: {
                font: { color: "#333333" },
                subTitle: {
                    font: { color: "#333333" }
                },
                indicator: {
                    font: { color: "#333333" },
                    symbol: { color: "#333333" }
                }
            }
        },
          
        flatdark: {
              
            quantitativeScaleSettings: {
                majorTickSettings: { stroke: "#ffffff" },
                minorTickSettings: { stroke: "#ffffff" },
                labelSettings: {
                    stroke: "#ffffff"
                },
                featuredMeasureSettings: { stroke: "#ffffff" },
                comparativeMeasureSettings: { stroke: "#ffffff" }
            },
            qualitativeRanges: [{
                rangeStroke: "#b3b3b3"
            }, {
                rangeStroke: "#999999"
            }, {
                rangeStroke: "#4d4d4d"
            }],
            captionSettings: {
                font: { color: "#ffffff" },
                subTitle: {
                    font: { color: "#ffffff" }
                },
                indicator: {
                    font: { color: "#ffffff" },
                    symbol: { color: "#ffffff" }
                }
            }
        }
    };

})(jQuery, Syncfusion);
;
/* global jQuery, document, ej, $, navigator, window, math */
ej.EjSvgRender = function (element) {

    this.svgLink = "http://www.w3.org/2000/svg";
    this.svgObj = document.createElementNS(this.svgLink, "svg");
    this._rootId = jQuery(element).attr("id");
    var id = this._rootId + '_svg';
    if ($(document).find("#" + id).length > 0) {
        var count = 0
        do {
            count++;
        } while ($(document).find("#" + this._rootId + '_svg' + count).length > 0);
        id = this._rootId + '_svg' + count;
    }
    this.svgObj.setAttribute('id', id);

};
(function ($) {
    ej.EjSvgRender.prototype = {
        drawPath: function (options, element) {
            if ($("#" + options.id).length > 0) {
                $("#" + options.id).attr(options);
            }
            else {
                var path = document.createElementNS(this.svgLink, "path");
                $(path).attr(options).appendTo(element);
            }

        },
        createLegendSvg: function (element) {
            this.svgLink = "http://www.w3.org/2000/svg";
            this.legendsvgObj = document.createElementNS(this.svgLink, "svg");
            this._rootId = jQuery(element).attr("id");
            this.legendsvgObj.setAttribute('id', "legend_" + this._rootId + '_svg');
            return this.legendsvgObj;
        },
        drawPolyline: function (options, element) {
            if ($("#" + options.id).length > 0) {
                $("#" + options.id).attr(options);
            }
            else {
                var polyline = document.createElementNS(this.svgLink, "polyline");
                $(polyline).attr(options).appendTo(element);
            }

        },

        drawLine: function (options, element) {
            if ($("#" + options.id).length > 0) {
                $("#" + options.id).attr(options);
            }
            else {
                var path = document.createElementNS(this.svgLink, "line");
                $(path).attr(options);
                $(path).appendTo(element);
            }
        },
        drawPolygon: function (options, element) {
            if ($("#" + options.id).length > 0) {
                $("#" + options.id).attr(options);
            }
            else {
                var polygon = document.createElementNS(this.svgLink, "polygon");
                $(polygon).attr(options);
                $(polygon).appendTo(element);
            }
        },
        drawCircle: function (options, element) {
            if ($("#" + options.id).length > 0) {
                $("#" + options.id).attr(options);
            }
            else {
                var circle = document.createElementNS(this.svgLink, "circle");
                $(circle).attr(options).appendTo(element);
            }
        },
        drawEllipse: function (options, element) {
            if ($("#" + options.id).length > 0) {
                $("#" + options.id).attr(options);
            }
            else {
                var ellipse = document.createElementNS(this.svgLink, "ellipse");
                $(ellipse).attr(options).appendTo(element);
            }
        },

        drawRect: function (options, element) {
            if ($("#" + options.id).length > 0) {
                $("#" + options.id).attr(options);
            }
            else {
                var rect = document.createElementNS(this.svgLink, "rect");
                $(rect).attr(options).appendTo(element);
            }
        },
        drawCylinder: function (options, element, seriesOption) {
            if ($("#" + options.id).length > 0) {
                $("#" + options.id).attr(options);
            }
            else {
                var x = options.x, y = options.y, id = options.id;
                var gradientColor = options.fill;
                var fillColor = gradientColor;
                var format = this.checkColorFormat(gradientColor);
                if (!format)
                    gradientColor = ej.datavisualization.Chart.prototype.colorNameToHex(gradientColor);
                var AEx, AEy, LX, LY, X, Y, X2, Y2, i = 2, X1, Y1, GX = 0, GY = 0, direction;
                var obj = { svgRenderer: this };
                if (seriesOption.isColumn == true) {
                    var rx = options.width / 2;
                    var length = options.height;
                    var ry = rx / 4;
                    X = X1 = x;
                    Y = ry < y ? y - ry : seriesOption.stacking ? y + ry : (y - ry);
                    Y1 = Y;
                    AEx = 2 * rx;
                    AEy = 0;
                    LX = 0;
                    LY = ry < y ? length : (length < 2 * ry ? length : seriesOption.stacking ? length - (2 * ry) : length);
                    X2 = X;
                    Y2 = ry < y ? Y + length : (length < Y ? length + Y : seriesOption.stacking ? length + (y - ry) : length + Y);
                    GX = 100;
                    if (seriesOption.stacking = true) {
                        if (!seriesOption.isLastSeries) {
                            Y = Y1 = y + ry;
                            LY = length < rx / 2 ? length : length - rx / 2;
                        }
                    }
                }
                else {
                    var ry = options.height / 2;
                    var length = options.width;
                    var rx = ry / 4;
                    Y = Y1 = y;
                    X = X1 = (x + rx);
                    AEx = 0;
                    AEy = 2 * ry;
                    LX = length;
                    LY = 0;
                    X2 = X + length;
                    Y2 = Y;
                    GY = 100;
                    if (seriesOption.stacking = true) {
                        if (!seriesOption.isLastSeries) {
                            X2 = (X + length - rx * 2);
                            LX = length - rx * 2;
                        }
                    }
                }
                delete options.x;
                delete options.y;
                delete options.width;
                delete options.height;
                delete options.isColumn;
                //options.stroke = "black";
                while (i--) {
                    direction = "M" + X.toString() + "," + Y.toString();
                    direction += "a" + rx.toString() + "," + ry.toString() + " 0 1,0 " + AEx.toString() + "," + AEy.toString();
                    direction += "a" + rx.toString() + "," + ry.toString() + " 0 1,0 " + (-1 * AEx).toString() + "," + (-1 * AEy).toString();
                    options.d = direction;
                    options.id = id + "_" + "Region_" + i;
                    options.fill = ej.Ej3DRender.prototype.polygon3D.prototype.applyZLight(gradientColor, obj);
                    this.drawPath(options, element);
                    X = X2;
                    Y = Y2;
                }
                direction = "M" + X1.toString() + "," + Y1.toString();
                direction += "a" + rx.toString() + "," + ry.toString() + " 0 1,0 " + AEx.toString() + "," + AEy.toString();
                direction += "l" + LX.toString() + " " + LY.toString();
                direction += "a" + rx.toString() + "," + ry.toString() + " 0 1,1 " + (-1 * AEx).toString() + "," + (-1 * AEy).toString() + " z";

                options.d = direction;
                options.id = id + "_" + "Region_2";
                if (fillColor.indexOf("url") == -1) {
                    var gradientId = id;
                    if ($("#" + gradientId).length == 0) {

                        var optiong = { 'id': gradientId, x1: "0%", y1: "0%", x2: GX.toString() + "%", y2: GY.toString() + "%" };
                        var gradientele = [];
                        gradientele[0] = { colorStop: "0%", color: gradientColor };
                        gradientele[1] = { colorStop: "30%", color: ej.Ej3DRender.prototype.polygon3D.prototype.applyXLight(gradientColor, obj) };
                        gradientele[2] = { colorStop: "70%", color: ej.Ej3DRender.prototype.polygon3D.prototype.applyXLight(gradientColor, obj) };
                        gradientele[3] = { colorStop: "100%", color: gradientColor };
                        this.drawGradient(optiong, gradientele, element);
                    }
                    options.fill = "url(#" + gradientId + ")";
                }
                this.drawPath(options, element);

            }
        },

        createGradientElement: function (name, colors, x1, y1, x2, y2, element) {
            var colorName;
            if (Object.prototype.toString.call(colors) == '[object Array]') {
                var options = {
                    'id': this.svgObj.id + '_' + name + 'Gradient',
                    'x1': x1 + '%',
                    'y1': y1 + '%',
                    'x2': x2 + '%',
                    'y2': y2 + '%'
                };
                var cName = '#' + this.svgObj.id + '_' + name + 'Gradient';
                this.drawGradient(options, colors, element);
                colorName = 'url(#' + this.svgObj.id + '_' + name + 'Gradient)';
            }
            else {
                colorName = colors;
            }
            return colorName;
        },

        drawGradient: function (options, gradientEle, element) {

            var defs = this.createDefs();
            var linerGradient = document.createElementNS(this.svgLink, "linearGradient");

            $(linerGradient).attr(options);
            for (var i = 0; i < gradientEle.length; i++) {
                var stop = document.createElementNS(this.svgLink, "stop");
                $(stop).attr({
                    'offset': gradientEle[i].colorStop,
                    'stop-color': gradientEle[i].color,
                    'stop-opacity': 1
                });
                $(stop).appendTo(linerGradient);
            }

            $(linerGradient).appendTo(defs);
            $(defs).appendTo(element);
        },

        drawText: function (options, label, groupEle, font) {

            if ($("#" + options.id).length > 0)
                this._textAttrReplace(options, label, font);
            else {
                var text = document.createElementNS(this.svgLink, "text");
                var $text = $(text);


                if (jQuery.type(label) == "array") {
                    var j = 0;
                    $text.attr(options);
                    for (var i = 0; i < label.length; i++) {
                        var textspan = document.createElementNS(this.svgLink, "tspan");
                        textspan.textContent = label[i];
                        $(textspan).attr({ "x": options.x, "dy": j });
                        $(textspan).appendTo(text);
                        font = this.enable3D ? font.font : font;
                        var bounds = ej.EjSvgRender.utils._measureText(label[i], null, font);
                        j = options.isTrackball ? bounds.height + 2 : bounds.height;
                    }
                } else {
                    text.textContent = label;
                    $text.attr(options);
                }
                $text.appendTo(groupEle);


            }
        },
        //text element attributes values are replaced 
        _textAttrReplace: function (options, label, font) {
            $("#" + options.id).attr(options);

            if (jQuery.type(label) == "array") {
                var elements = $("#" + options.id).children("tspan");
                var j = 0;
                if (elements.length > 0 && elements.length == label.length) {
                    for (var i = 0; i < elements.length; i++) {
                        var element = elements[i];
                        $(element).attr({ "x": options.x, "dy": j });
                        element.textContent = label[i];
                        var bounds = ej.EjSvgRender.utils._measureText(label[i], null, font);
                        j = bounds.height + 2;
                    }
                }
                else {
                    $("#" + options.id).remove();
                    this.drawText(options, label, this.gTransToolEle, font);

                }
            } else {
                $("#" + options.id).text(label);
            }

        },

        drawImage: function (options, element) {

            var img = document.createElementNS(this.svgLink, 'image');
            img.setAttributeNS(null, 'height', options.height);
            img.setAttributeNS(null, 'width', options.width);
            img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', options.href);
            img.setAttributeNS(null, 'x', options.x);
            img.setAttributeNS(null, 'y', options.y);
            img.setAttributeNS(null, 'id', options.id);
            img.setAttributeNS(null, 'visibility', options.visibility);
            if (!ej.util.isNullOrUndefined(options.clippath) || !ej.util.isNullOrUndefined(options.preserveAspectRatio)) {
                img.setAttributeNS(null, 'clip-path', options.clippath);
                img.setAttributeNS(null, "preserveAspectRatio", options.preserveAspectRatio);
            }
            $(img).appendTo(element);

        },

        createDefs: function () {
            var defs = document.createElementNS(this.svgLink, "defs");
            return defs;
        },

        createClipPath: function (options) {
            var clipPath = document.createElementNS(this.svgLink, "clipPath");
            $(clipPath).attr(options);
            return clipPath;
        },
        createForeignObject: function (options) {
            var object = document.createElementNS(this.svgLink, "foreignObject");
            $(object).attr(options);
            return object;
        },
        createGroup: function (options) {
            var group = document.createElementNS(this.svgLink, "g");
            $(group).attr(options);
            return group;
        },
        createPattern: function (options, element) {
            var pattern = document.createElementNS(this.svgLink, element);
            for (var name in options) {
                if (options.hasOwnProperty(name)) {
                    pattern.setAttribute(name, options[name]);
                }
            }
            return pattern;
        },
        createText: function (options, label) {
            var text = document.createElementNS(this.svgLink, "text");
            $(text).attr(options);
            if (!ej.util.isNullOrUndefined(label))
                text.textContent = label;
            return text;
        },

        createPath: function (options) {
            var path = document.createElementNS(this.svgLink, "path");
            $(path).attr(options);
            return path;
        },

        createCircle: function (options) {
            var circle = document.createElementNS(this.svgLink, "circle");
            $(circle).attr(options);
            return circle;
        },

        createLine: function (options) {
            var line = document.createElementNS(this.svgLink, "line");
            $(line).attr(options);
            return line;
        },


        _getAttrVal: function (ele, val, option) {
            var value = $(ele).attr(val);
            if (value != null)
                return value;
            else
                return option;
        },


        hexFromRGB: function (color) {
            var r = color.R;
            var g = color.G;
            var b = color.B;
            if (color.A) {
                var returncolor = "rgba(" + r.toString() + "," + g.toString() + "," + b.toString() + "," + color.A + ")";
                return returncolor;
            }
            else {
                var hex = [r.toString(16), g.toString(16), b.toString(16)];
                $.each(hex, function (nr, val) { if (val.length === 1) { hex[nr] = "0" + val; } });
                return "#" + (hex.join("").toUpperCase());
            }
        },

        checkColorFormat: function (color) {
            return /(rgba?\((?:\d{1,3}[,\)]){3}(?:\d+\.\d+\))?)|(^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$)/gmi.test(color);
        },

        hexToRGB: function (hex) {
            var rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/.test(hex);
            var result;
            if (rgbRegex == true) {
                result = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/.exec(hex);
                return result ? {
                    R: parseInt(result[1]),
                    G: parseInt(result[2]),
                    B: parseInt(result[3]),
                    A: result[4],
                } : null;
            }
            else {
                result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    R: parseInt(result[1], 16),
                    G: parseInt(result[2], 16),
                    B: parseInt(result[3], 16)
                } : null;
            }
        },


        createDelegate: function (context, handler) {
            return function (e) {
                handler.apply(context, [e, this]);
            };
        },

        drawClipPath: function (options, element) {
            //To avoid creating and appending the same element more than once
            if ($(element).find('#' + options.id).length > 0) {
                $(element).find('#' + options.id).attr(options);
            }
            else {
                var defs = this.createDefs();
                var clipPath = this.createClipPath({ 'id': options.id });
				options.id = options.id + '_Rect';
                this.drawRect(options, clipPath);
                this.append(clipPath, defs);
                this.append(defs, element);
            }
        },

        drawCircularClipPath: function (options, element) {
            var defs = this.createDefs();
            var clipPath = this.createClipPath({ 'id': options.id });
            this.drawCircle(options, clipPath);
            this.append(clipPath, defs);
            this.append(defs, element);
        },

        append: function (childEle, parentEle) {
            $(childEle).appendTo(parentEle);
        },
        _setAttr: function (element, attribute) {
            $(element).attr(attribute);
        }
    };

    ej.EjSvgRender.commonChartEventArgs = {
        cancel: false,
        data: null
    };
    ej.EjSvgRender.utils = {



        _decimalPlaces: function (num) {
            var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            if (!match) { return 0; }
            return Math.max(
                0,
                // Number of digits right of decimal point.
                (match[1] ? match[1].length : 0)
                // Adjust for scientific notation.
                - (match[2] ? +match[2] : 0));
        },
        _getLabelContent: function (pos, axis, locale) {
            switch (axis._categoryValueType) {
                case 'number':
                    var customFormat = (ej.util.isNullOrUndefined(axis.labelFormat)) ? null : axis.labelFormat.match('{value}');
                    return (ej.util.isNullOrUndefined(axis.labelFormat)) ? axis.labels[Math.floor(pos)] : (customFormat != null) ? axis.labelFormat.replace('{value}', axis.labels[Math.floor(pos)]) : (ej.format(axis.labels[Math.floor(pos)], axis.labelFormat, locale));
                case 'date':
                    return (ej.format(new Date(axis.labels[Math.floor(pos)]), ((ej.util.isNullOrUndefined(axis.labelFormat)) ? "dd/MM/yyyy" : axis.labelFormat), locale));
                case 'string':
                    return axis.labels[Math.floor(pos)];
                default:
                    return "";
            }
        },

        //Calculation for label size in template
        _getSeriesTemplateSize: function (point, pointIndex, series, isLeft, sender) {
            var point;
            var pointIndex;
            var areaType = sender.model.AreaType;

            var chartContainer = sender._id;
            var seriesIndex = $.inArray(series, sender.model._visibleSeries);

            if ($('#template_group_' + chartContainer).length != 0)
                var templateContainer = $('#template_group_' + chartContainer);
            else
                templateContainer = $("<div></div>").attr('id', "template_group_" + chartContainer);

            templateContainer.css('position', 'relative').css('z-index', 1000);
            var cloneNode = $("#" + series.marker.dataLabel.template).clone();
            $(cloneNode).attr("id", series.marker.dataLabel.template + '_' + seriesIndex + '_' + pointIndex + '_' + chartContainer);
            var $cloneNode = $(cloneNode);
            $cloneNode.css("position", "absolute");

            point.count = 1;
            var data = { series: series, point: point };
            $cloneNode.html($cloneNode.html().parseTemplate(data));

            var display = (areaType == "cartesianaxes" || !series.enableAnimation || (series.type.toLowerCase() == "pyramid" || series.type.toLowerCase() == "funnel")) ? "block" : "none";
            $cloneNode.css("display", display).appendTo($(templateContainer));
            $(templateContainer).appendTo('#' + chartContainer);
            point.size = { height: $cloneNode.height(), width: $cloneNode.width() };

            if (isLeft) {
                if (ej.util.isNullOrUndefined(series.LeftLabelMaxHeight) || series.LeftLabelMaxHeight < point.size.height) {
                    series.LeftLabelMaxHeight = point.size.height;
                }
                if (ej.util.isNullOrUndefined(series.LeftLabelMaxWidth) || series.LeftLabelMaxWidth < point.size.width) {
                    series.LeftLabelMaxWidth = point.size.width;
                }
            }
            else {
                if (ej.util.isNullOrUndefined(series.RightLabelMaxHeight) || series.RightLabelMaxHeight < point.size.height) {
                    series.RightLabelMaxHeight = point.size.height;
                }
                if (ej.util.isNullOrUndefined(series.RightLabelMaxWidth) || series.RightLabelMaxWidth < point.size.width) {
                    series.RightLabelMaxWidth = point.size.width;
                }
            }

        },
        getMinPointsDelta: function (axis, chartObj, start) {
            var chart = chartObj;
            var m_minPointsDelta = Number.MAX_VALUE;
            $.each(chart.model._visibleSeries, function (index, series) {
                if (series.visibility.toLowerCase() == 'visible' && axis.name == series._xAxisName) {
                    var xValues = ej.DataManager(series.points, ej.Query().sortBy("xValue")).executeLocal();
                    if ((xValues.length == 1) && (!chart.currentSeries || chart.currentSeries._yAxisName.toLowerCase() == series._yAxisName.toLowerCase())) {
                        var minValue = ej.util.isNullOrUndefined(start) ? series.xAxis.visibleRange.min : start;
                        var delta = xValues[0].xValue - minValue;
                        if (delta != 0)
                            m_minPointsDelta = Math.min(m_minPointsDelta, delta);
                    }
                    else {
                        $.each(xValues, function (pointIndex, point) {
                            if (pointIndex > 0 && point.xValue) {
                                var deltaValue = point.xValue - xValues[pointIndex - 1].xValue;
                                if (deltaValue != 0) {
                                    m_minPointsDelta = Math.min(m_minPointsDelta, deltaValue);
                                }
                            }
                        });
                    }
                }
            });

            if (m_minPointsDelta == Number.MAX_VALUE) {
                m_minPointsDelta = 1;
            }
            return m_minPointsDelta;
        },
        //Calculation for label size
        _getSeriesMaxLabel: function (series) {
            var maxTxtDim = { width: 0, height: 0 };
            var width = $(this.svgObject).width();
            var labels = [], currentLabel, word, dim;
            if (series.labels.length > 0) {
                for (var j = 0; j < series.labels.length; j++) {
                    var dim = this._measureText(series.visibleLabels[j], width, series.marker.dataLabel.font);
                    if (maxTxtDim.width < dim.width) {
                        maxTxtDim.width = dim.width;
                    }
                    if (maxTxtDim.height < dim.height) {
                        maxTxtDim.height = dim.height;
                    }
                }
                series.LabelMaxHeight = maxTxtDim.height;
                series.LabelMaxWidth = maxTxtDim.width;
            }
            else {
                labels.push(series.rightsidePoints);
                labels.push(series.leftsidePoints);

                for (var k = 0; k < labels.length; k++) {
                    for (var j = 0; j < labels[k].length; j++) {
						currentLabel = labels[k][j];
                        word = (currentLabel.text) ? currentLabel.text : currentLabel.y; 
                        dim = this._measureText(word, width, series.marker.dataLabel.font);
                        if (maxTxtDim.width < dim.width) {
                            maxTxtDim.width = dim.width;
                        }
                        if (maxTxtDim.height < dim.height) {
                            maxTxtDim.height = dim.height;
                        }
                    }
                    if (k == 0) {
                        series.RightLabelMaxHeight = maxTxtDim.height;
                        series.RightLabelMaxWidth = maxTxtDim.width;
                    }
                    else {
                        series.LeftLabelMaxHeight = maxTxtDim.height;
                        series.LeftLabelMaxWidth = maxTxtDim.width;
                    }
                }
            }


        },
        // to get highest label from label collection or label with <br> tag
        _getHighestLabel: function (axis, sender, text, intersectAction) {
            var largestLabel, maxWidth = 0, labelCollection = [], label, width, w = 0, labelText;
            if (ej.isNullOrUndefined(text)) {

                var labels = axis.labels.length == 0 ? axis.visibleLabels : axis.labels;
                for (var l = 0; l < labels.length; l++) {
                    var currentLabel = axis.labels.length == 0 ? labels[l].Text : labels[l], w = 0;
                    if (currentLabel.indexOf('<br>') != -1)
                        labelCollection = currentLabel.split('<br>');
                    else
                        labelCollection.push(currentLabel);
                    for (var r = 0; r < labelCollection.length; r++) {
                        label = labelCollection[r];
                        width = this._measureText(label, $(sender.svgObject).width(), axis.font).width;
                        if (w < width) {
                            w = width;
                            largestLabel = label;
                        }
                    }
                    if (maxWidth < w) {
                        maxWidth = w;
                        labelText = largestLabel;
                    }
                }
            }
            else if (text && ((typeof text == "string" && text.indexOf('<br>') != -1) || typeof text == "object")) {
                var w = 0;
                labelCollection = typeof text == "object" ? text : text.split('<br>');
                for (var r = 0; r < labelCollection.length; r++) {
                    label = typeof labelCollection[r] == "object" ? labelCollection[r].Text : labelCollection[r];
                    width = this._measureText(label, sender, axis.font).width;
                    if (w < width) {
                        w = width;
                        largestLabel = label;
                    }
                    labelText = largestLabel;
                }
            }
            return labelText;
        },
        _getMaxLabelWidth: function (axis, sender) {
            this.chartObj = sender;
            var maxTxtDim = { width: 0, height: 0, maxHeight: 0, maxWidth: 0 };
            var rotateLabel = '';
            var currentRow = 1;
            var vmlrendering = sender.svgRenderer.vmlNamespace;
            var range = axis.visibleRange;
            var intersectAction = (axis.labelIntersectAction) ? axis.labelIntersectAction.toLowerCase() : "";
            var labelPlacement = axis.labelPlacement;
            var opposedPosition = axis.opposedPosition;
            var orientation = axis.orientation.toLowerCase();
            var isHorizontal = sender.model.requireInvertedAxes ? (orientation == 'vertical') : orientation == 'horizontal';
            var roundingPlaces = axis.roundingPlaces;
            var labelRotation = axis.labelRotation;
            var orientation = axis.orientation;
            var maxHeight = 0;
            var prevLabels = [];
            var visibleLabels = axis.visibleLabels;
            var visibleLabelsLength = visibleLabels.length, textCollection, label, prevPoint, axisTitle, axisTitleText;
            if (axis.visible) {
                for (var j = 0; j < visibleLabelsLength; j++) {
                    axis.visibleLabels[j].y = 0;
                    if (typeof axis.visibleLabels[j].Text == "string" && axis.visibleLabels[j].Text.indexOf('<br>') != -1 && axis.orientation == "vertical") {
                        textCollection = axis.visibleLabels[j].Text.split('<br>');
                        label = this._getHighestLabel(axis, $(this.svgObject).width(), textCollection);
                        var dim = this._measureText(label, $(this.svgObject).width(), axis.font, axis.labelRotation);
                    }
                    else
                        var dim = this._measureText(axis.visibleLabels[j].Text, $(this.svgObject).width(), axis.font, axis.labelRotation);
                    if (maxTxtDim.width < dim.width) {
                        maxTxtDim.width = dim.width;
                        rotateLabel = axis.visibleLabels[j].Text;
                    }
                    if (maxTxtDim.height < dim.height)
                        maxTxtDim.height = dim.height;
                }

                if (axis.enableTrim || (intersectAction == "trim" && axis.orientation != "vertical")) {   // for enable trim
                    var derivedGap = axis.maximumLabelWidth;
                    maxTxtDim.width = maxTxtDim.width > derivedGap ? derivedGap : maxTxtDim.width;
                }

                // initialize rows to 1
                maxTxtDim.rows = 1;
                maxTxtDim.maxWidth = maxTxtDim.width;
                maxTxtDim.maxHeight = maxTxtDim.height;

                if (!vmlrendering && (labelRotation || intersectAction)) {
                    var intersectRotation = 0;
                    if (intersectAction == 'rotate45')
                        intersectRotation = 45;
                    else if (intersectAction == 'rotate90')
                        intersectRotation = 90;
                    labelRotation = labelRotation != null || orientation == "vertical" ? labelRotation : intersectRotation;
                    axis.rotationValue = labelRotation;
                    if (labelRotation) {
                        rotateLabel = (!ej.isNullOrUndefined(rotateLabel)) ? rotateLabel : '';
                        var labeltextWidth = this._measureText(rotateLabel, $(this.svgObject).width(), axis.font, axis.labelRotation);
                        if ((axis.enableTrim || intersectAction == "trim") && labeltextWidth.width > derivedGap && rotateLabel != "") { // to find trimmed text
                            var t, textWidth, text = rotateLabel;
                            for (t = 1; t < text.toString().length; t++) {
                                text = text.toString().substring(0, t) + '... ';
                                textWidth = this._measureText(text, $(sender.svgObject).width(), axis.font);
                                if (textWidth.width >= derivedGap) {
                                    text = text.toString().substring(0, t - 1) + '... ';
                                    rotateLabel = text;
                                    break;
                                }
                            }
                        }
                        rotateLabel = (intersectAction || axis.enableTrim) && labelRotation ? typeof rotateLabel == "string" && rotateLabel.indexOf('<br>') != -1 ? this._getHighestLabel(axis, sender, null) : rotateLabel : this._getHighestLabel(axis, sender, null);
                        var maxSize = this.rotatedLabel(axis, sender, labelRotation, rotateLabel);
                        if (axis.labelIntersectAction && axis.labelIntersectAction.toLowerCase() == 'multiplerows')
                            maxHeight = maxTxtDim.height + maxSize.height;

                        maxTxtDim.height = axis.rowsCount && axis.rowsCount > 1 && labelRotation != 90 && axis.enableTrim ? (axis.rowsCount) * maxTxtDim.height : maxSize.height;
                        maxTxtDim.width = maxSize.width;
                    }
                }

                if (axis.labelIntersectAction) {
                    if (axis.rowsCount && (intersectAction == "none" || intersectAction == "trim" || intersectAction == "hide" || labelRotation == 0) &&
                        (intersectAction != "wrap" || axis.enableTrim) && (intersectAction != "wrapbyword" || axis.enableTrim) && (intersectAction != "multiplerows" || axis.enableTrim)) {
                        if (labelRotation == 0) {
                            maxTxtDim.rows = axis.rowsCount;
                            maxTxtDim.height = ((axis.rowsCount) * maxTxtDim.height);
                        }
                    }
                    else if (intersectAction == 'wrap' || intersectAction == 'wrapbyword') {
                        // pointX calculation to find the gap between the ticks
                        var pointX, tempInterval;
                        labelPlacement = (!(labelPlacement)) ? ej.datavisualization.Chart.LabelPlacement.BetweenTicks : labelPlacement;
                        if (labelPlacement.toLowerCase() == "betweenticks") {
                            tempInterval = 1 + (axis.labels.length > 1 ? -0.5 : 0);
                            tempInterval = (!(roundingPlaces)) ? parseFloat(tempInterval.toFixed((ej.EjSvgRender.utils._decimalPlaces(range.interval) == 0 ?
                                1 : ej.EjSvgRender.utils._decimalPlaces(range.interval)))) : parseFloat(tempInterval.toFixed(roundingPlaces));
                            pointX = Math.ceil(((tempInterval - range.min) / (range.max - range.min)) * (axis.length));
                        }
                        else {
                            pointX = Math.ceil(axis.length / visibleLabels.length);
                        }
                        if (axis.orientation == "horizontal") {
                            var rowCount = 0, elementSpacing = 20, highestWidth = 0, highestLabel;
                            var labels = axis.labels.length > 0 && axis.valueType != "datetimecategory" ? axis.labels : axis.visibleLabels;
                            var gap = axis.width ? axis.width / labels.length : ((axis.length - (sender.svgWidth - axis.length)) - elementSpacing) / labels.length;
                            axis.labelsCollection = [];
                            for (var l = 0; l < labels.length; l++) {
                                var count = 0, labelsCollection = [], labeltxtcoll = [];
                                var labeltxt = typeof labels[l] === 'object' ? labels[l].Text : labels[l];
                                if (typeof labeltxt == "string" && labeltxt.indexOf('<br>') != -1)
                                    labeltxtcoll = labeltxt.split('<br>');
                                else
                                    labeltxtcoll.push(labeltxt);
                                for (var c = 0; c < labeltxtcoll.length; c++) {
                                    var textcoll = ej.EjAxisRenderer.prototype.rowscalculation(labeltxtcoll[c], sender.model.m_AreaBounds, axis, gap, null);
                                    count = textcoll.length + count;
                                    for (var t = 0; t < textcoll.length; t++)
                                        labelsCollection.push(textcoll[t]);
                                }
                                if (labelRotation) {
                                    rotateLabel = this._getHighestLabel(axis, sender, labelsCollection);
                                    var width = this._measureText(rotateLabel, $(sender.svgObject).width(), axis.font).width;
                                    if (highestWidth < width) {
                                        highestWidth = width;
                                        highestLabel = rotateLabel;
                                    }
                                }
                                rowCount = Math.max(count, rowCount);
                                axis.labelsCollection[l] = labelsCollection;
                            }
                            var maxSize = this.rotatedLabel(axis, sender, labelRotation, highestLabel);
                        }
                        pointX = pointX < 0 ? Math.ceil(axis.length / visibleLabels.length) : pointX;
                        var row = Math.round(maxTxtDim.width / pointX);
                        maxTxtDim.rows = labelRotation ? row - currentRow : row + currentRow;
                        if (maxTxtDim.rows < 0)
                            maxTxtDim.rows = 0;
                        var row1 = rowCount && !labelRotation ? rowCount : maxTxtDim.rows;
                        if (rowCount > row && !labelRotation)
                            row1 = row1 - 1;
                        maxTxtDim.height = labelRotation ? (maxSize.height + (row1) * maxSize.height) : (maxTxtDim.height + (row1) * maxTxtDim.height);
                    }
                    else if (intersectAction == 'multiplerows') {
                        var spaceValue = sender._getLegendSpace();
                        var chartBorderWidth = sender.model.border.width;

                        var verticalaxis = sender.model._axes[1];
                        var realWidth = $(sender.svgObject).width() - sender.model.margin.left - sender.model.margin.right;
						axisTitle = axis.title;
						axisTitleText = axisTitle.text;
                        var axisTitleHeight = (axisTitleText == "" || !(axis.visible)) ? 0 : (this._measureText(axisTitleText, realWidth, axisTitle.font).height + (2 * sender.model.elementSpacing));
                        var vAxesWidth = sender.model.elementSpacing + axisTitleHeight + axis.majorTickLines.size + axis.axisLine.width;
                        var yLabels = sender._getYValues(sender.model._visibleSeries[0].points);
                        var largest = Math.max.apply(Math, yLabels);
                        var vaxis = sender.model._axes[1];
                        var dim = this._measureText(largest, $(this.svgObject).width(), vaxis.font, vaxis.labelRotation);

                        var rightSpacing = spaceValue.rightLegendWidth + vAxesWidth + dim.width + sender.model.margin.right + sender.model.margin.left + (2 * chartBorderWidth);
                        var boundsWidth = $(sender.svgObject).width() - (rightSpacing);
                        if (isHorizontal) {
                            var addedMaxHeight = 0; var count1 = 0; var multipleRowsColl = []; var count2 = 0;
                            var row = 0; var highestLabel, highestWidth = 0;
                            //loop to get current label

                            for (j = 0; j < visibleLabels.length; j++) {
                                //declaration
                                var currentLabel = visibleLabels[j]; var currentLabelColl = [];
                                if (typeof currentLabel.Text == "string" && currentLabel.Text.indexOf('<br>') != -1)
                                    currentLabelColl = currentLabel.Text.split('<br>');
                                else
                                    currentLabelColl.push(currentLabel);
                                var collectionLength = currentLabelColl.length;
                                var isMultiRows = false;
                                maxHeight = Math.max(maxHeight, addedMaxHeight);
                                addedMaxHeight = currentLabel.y = maxTxtDim.height;
                                var text = this._measureText(currentLabel.Text, $(this.svgObject).width(), axis.font);
                                var textHeight = text.height;
                                var currentPoint = Math.abs(Math.floor(((currentLabel.Value - range.min) / (range.delta)) * (boundsWidth)));
                                if (multipleRowsColl.length > 0) {
                                    var previousLabels = multipleRowsColl;
                                    var flag1 = true;
                                    for (var k = 0; k < previousLabels.length && flag1; k++) {
                                        var count = 0; var labelCount = 0;
                                        var prevLabel = previousLabels[k];
                                        for (var l = 0; prevLabel && l < prevLabel.length; l++) {
                                            for (var c = 0; c < collectionLength; c++) {
                                                var temp = 0;
                                                var textWidth = ej.EjSvgRender.utils._measureText(collectionLength == 1 ? currentLabelColl[c].Text : currentLabelColl[c], $(this.svgObject).width(), axis.font).width;
                                                var textHeight = ej.EjSvgRender.utils._measureText(currentLabelColl[c], $(this.svgObject).width(), axis.font).height;
                                                var preLabel = l == prevLabel.length ? prevLabel[l - 1] : prevLabel[l];
                                                var prePoint = Math.abs(Math.floor(((preLabel.Value - range.min) / (range.delta)) * (boundsWidth)));
                                                var preTextWidth = ej.EjSvgRender.utils._measureText(preLabel.Text, $(this.svgObject).width(), axis.font).width;
                                                textWidth = textWidth / 2;
                                                var value = prePoint + ((axis.isInversed) ? -preTextWidth / 2 : preTextWidth / 2);
                                                if (value >= currentPoint - textWidth) {
                                                    addedMaxHeight = currentLabel.y + textHeight;
                                                    currentLabel.y += textHeight;
                                                    count++;
                                                    if (k + 1 == previousLabels.length)
                                                        flag1 = false;

                                                }
                                                else {
                                                    if (l + 1 == prevLabel.length) {
                                                        if (c == collectionLength - 1) flag1 = false;
                                                        else {
                                                            flag1 = true;
                                                        }
                                                        break;
                                                    }
                                                }

                                            }
                                        }
                                    }
                                }
                                currentLabel.y = addedMaxHeight;
                                row = (addedMaxHeight / textHeight) - 1;
                                if (multipleRowsColl[row] == undefined)
                                    multipleRowsColl[row] = [];
                                if (collectionLength == 1) multipleRowsColl[row].push(currentLabel);
                                else {
                                    for (var c = 0; c < collectionLength; c++) {
                                        if (multipleRowsColl[row] == undefined)
                                            multipleRowsColl[row] = [];
                                        multipleRowsColl[row].push({
                                            Text: currentLabelColl[c],
                                            Value: currentLabel.Value
                                        });
                                        if (c != collectionLength - 1) {
                                            row = row + 1;
                                            addedMaxHeight = currentLabel.y + textHeight;
                                        }
                                    }
                                }

                            }

                            maxHeight = (multipleRowsColl.length * textHeight);
                            maxTxtDim.height = maxTxtDim.height > maxHeight ? maxTxtDim.height : maxHeight;
                            //calculating rows
							if(textHeight > 0){
                            if (opposedPosition)
                                maxTxtDim.rows = Math.round((maxHeight + textHeight) / textHeight);
                            else
                                maxTxtDim.rows = Math.round(maxHeight / textHeight);
							}
                            maxTxtDim.rows = labelRotation ? maxTxtDim.rows - 1 : maxTxtDim.rows;
                            if (maxTxtDim.rows < 1) maxTxtDim.rows = 1;
                        }
                        if (!isHorizontal) {
                            var addedMaxWidth = 0;
                            //loop to get current label
                            for (j = 0; j < axis.visibleLabels.length; j++) {
                                currentLabel = axis.visibleLabels[j];
                                text = this._measureText(currentLabel.Text, $(this.svgObject).width(), axis.font);
                                textWidth = text.width;
                                textHeight = text.height;
                                currentPoint = Math.abs(Math.floor(((currentLabel.Value - axis.visibleRange.min) / (axis.visibleRange.delta)) * (axis.length)));
                                for (var i = 0; i < j; i++) {
                                    // loop to get previous labels
                                    prevLabel = axis.visibleLabels[i];
                                    prevPoint = Math.abs(Math.floor(((prevLabel.Value - axis.visibleRange.min) / (axis.visibleRange.delta)) * (axis.length)));
                                    var prevTextHeight = this._measureText(prevLabel.Text, $(this.svgObject).width(), axis.font).height;
                                    value = prevPoint + prevTextHeight / 2;
                                    if (value > currentPoint - textHeight / 2 && axis.visibleLabels[i].y == currentLabel.y) {
                                        addedMaxWidth = currentLabel.y + textWidth;
                                        currentLabel.y = addedMaxWidth;
                                        isMultiRows = true;
                                    }
                                }
                                var maxheight = addedMaxWidth;
                            }
                            // label width + multiple rows width + gap between the rows added only on text render in multiple rows
                            maxTxtDim.width = maxTxtDim.width + maxheight + (isMultiRows ? 5 : 0);
                        }
                    }
                }
            }
            return maxTxtDim;
        },

        rotatedLabel: function (axis, sender, value, rotatedLabel, is3D) {
            // to get height of rotated labels
            var rotatedOptions = {
                'font-size': axis.font.size,
                'transform': 'rotate(' + value + ',0,0)',
                'font-family': axis.font.fontFamily,
                'font-style': axis.font.fontStyle,
                'rotateAngle': 'rotate(' + value + 'deg)',
                'text-anchor': 'middle'
            };
            sender = is3D ? this.chartObj : sender;
            var text = sender.svgRenderer.createText(rotatedOptions, rotatedLabel);
            var height = Math.ceil((this._measureBounds(text, sender).height));
            var width = Math.ceil((this._measureBounds(text, sender).width));
            return { height: height, width: width };
        },

        _getTransform: function (xAxis, yAxis, invertedAxis) {
            var x, y, width, height;
            if (invertedAxis) {
                x = yAxis.x;
                y = xAxis.y;
                width = yAxis.width;
                height = xAxis.height;
            } else {
                {
                    x = xAxis.x;
                    y = yAxis.y;
                    width = xAxis.width;
                    height = yAxis.height;
                }
            }
            return { x: x, y: y, width: width, height: height };
        },
        //calculate path for roundedCorner of the series column,bar,stacking column,stacking bar,range column
        _calculateroundedCorner: function (cornerRadius, options, isArrow, orientation, tipPosition, tracker) {
            var x1 = options.x, y1 = options.y, padding = 5, canvasPadding = (this.chartObj.model.enableCanvasRendering && !tracker) ? padding / 4 : 0,
                width = options.width, height = options.height, topLeft,
                bottomLeft, topRight, bottomRight, d;

            if (typeof (cornerRadius) != "object" || ej.util.isNullOrUndefined(cornerRadius))
                topLeft = bottomLeft = topRight = bottomRight = cornerRadius;
            else {
                topLeft = cornerRadius.topLeft;
                bottomLeft = cornerRadius.bottomLeft;
                topRight = cornerRadius.topRight;
                bottomRight = cornerRadius.bottomRight;
            }
            topLeft = ej.util.isNullOrUndefined(options.rx) ? topLeft : options.rx;
            bottomLeft = ej.util.isNullOrUndefined(options.rx) ? bottomLeft : options.rx;
            topRight = ej.util.isNullOrUndefined(options.ry) ? topRight : options.ry;
            bottomRight = ej.util.isNullOrUndefined(options.ry) ? bottomRight : options.ry;

            d = "M" + " " + x1 + " " + (topLeft + y1) + " Q " + x1 + " " + y1 + " " + (x1 + topLeft) + " " + y1 + " ";
            if (isArrow && orientation == "top")
                d += "L " + (x1 + width / 2 - padding / 2 + canvasPadding) + " " + (y1) + " L " + (x1 + width / 2 + canvasPadding - tipPosition) + " " + (y1 - padding) + " L " + (x1 + width / 2 + padding / 2 + canvasPadding) + " " + (y1) + " ";
            d += "L" + " " + (x1 + width - topRight) + " " + y1 + " Q " + (x1 + width) + " " + y1 + " " + (x1 + width) + " " + (y1 + topRight) + " ";
            if (isArrow && orientation == "right")
                d += "L " + (x1 + width) + " " + (y1 + height / 2 - padding / 2 + canvasPadding) + " L " + (x1 + width + padding) + " " + (y1 + height / 2 + canvasPadding - tipPosition) + " L " + (x1 + width) + " " + (y1 + height / 2 + padding / 2 + canvasPadding) + " ";
            d += "L " + (x1 + width) + " " + (y1 + height - bottomRight) + " Q " + (x1 + width) + " " + (y1 + height) + " " + (x1 + width - bottomRight) + " " + (y1 + height) + " ";
            if (isArrow && orientation == "bottom")
                d += "L " + (x1 + width / 2 - padding / 2 + canvasPadding) + " " + (y1 + height) + " L " + (x1 + width / 2 + canvasPadding - tipPosition) + " " + (y1 + height + padding) + " L " + (x1 + width / 2 + padding / 2 + canvasPadding) + " " + (y1 + height) + " ";
            d += "L " + (x1 + bottomLeft) + " " + (y1 + height) + " Q " + x1 + " " + (y1 + height) + " " + x1 + " " + (y1 + height - bottomLeft) + " ";
            if (isArrow && orientation == "left")
                d += "L " + (x1) + " " + (y1 + height / 2 - padding / 2 + canvasPadding) + " L " + (x1 - padding) + " " + (y1 + height / 2 + canvasPadding - tipPosition) + " L " + (x1) + " " + (y1 + height / 2 + padding / 2 + canvasPadding) + " ";
            d += "L" + " " + x1 + " " + (topLeft + y1) + " " + "z";
            return d;

        },
        browserInfo: function () {
            var browser = {}, clientInfo = [],
                browserClients = {
                    webkit: /(chrome)[ \/]([\w.]+)/i, safari: /(webkit)[ \/]([\w.]+)/i, msie: /(msie) ([\w.]+)/i,
                    opera: /(opera)(?:.*version|)[ \/]([\w.]+)/i, mozilla: /(mozilla)(?:.*? rv:([\w.]+)|)/i
                };
            for (var client in browserClients) {
                if (browserClients.hasOwnProperty(client)) {
                    clientInfo = navigator.userAgent.match(browserClients[client]);
                    if (clientInfo) {
                        browser.name = clientInfo[1].toLowerCase();
                        browser.version = clientInfo[2];
                        if (!!navigator.userAgent.match(/Trident\/7\./)) {
                            browser.name = "msie";
                        }
                        break;
                    }
                }
            }
            browser.isMSPointerEnabled = (browser.name == 'msie') && browser.version > 9 && window.navigator.msPointerEnabled;
            browser.pointerEnabled = window.navigator.pointerEnabled;
            return browser;
        },
        _measureText: function (text, maxwidth, font) {
            var element = $(document).find("#measureTex");
            $("#measureTex").css('display', 'block'); // fixed for scroll issue in sample browser
            if (element.length == 0) {
                var textObj = document.createElement('text');
                $(textObj).attr({ 'id': 'measureTex' });
                document.body.appendChild(textObj);
            }
            else {
                var textObj = element[0];
            }

            var style = null, size = null, family = null, weight = null;
            if (typeof (text) == "string" && (text.indexOf("<") > -1 || text.indexOf(">") > -1)) {
                var textArray = text.split(" ");
                for (var i = 0; i < textArray.length; i++) {
                    if (textArray[i].indexOf("<br/>") == -1)
                        textArray[i] = textArray[i].replace(/[<>]/g, '&');
                }
                text = textArray.join(' ');
            }
			if(/<\/?[a-z][\s\S]*>/.test(text))
				$(textObj).html(text);
			else
				textObj.textContent = text;
            if (font != undefined && font.size == undefined) {
                var fontarray = font;
                fontarray = fontarray.split(" ");
                style = fontarray[0];
                size = fontarray[1];
                family = fontarray[2];
                weight = fontarray[3];
            }

            if (font != null) {
                textObj.style.fontSize = (font.size > 0) ? (font.size + "px") : font.size ? font.size : size;
                if (textObj.style.fontStyle)
                    textObj.style.fontStyle = (font.fontStyle) ? font.fontStyle : style;
                textObj.style.fontFamily = font.fontFamily ? font.fontFamily : family;
                if (window.navigator.userAgent.indexOf('MSIE 8.0') == -1)
                    textObj.style.fontWeight = font.fontWeight ? font.fontWeight : weight;
            }
            textObj.style.backgroundColor = 'white';
            textObj.style.position = 'absolute';
            textObj.style.top = -100;
            textObj.style.left = 0;
            textObj.style.visibility = 'hidden';
            textObj.style.whiteSpace = 'nowrap';
            if (maxwidth)
                textObj.style.maxwidth = maxwidth + "px";


            var bounds = { width: textObj.offsetWidth, height: textObj.offsetHeight };
            $("#measureTex").css('display', 'none'); // fixed for scroll issue in sample browser
            return bounds;
        },
        //to trim legend text
        _trimText: function (legendtext, maxwidth, font) {
            var textWidth, text, textLength;
            text = legendtext.toString();
            textLength = text.length;
            for (var t = 1; t < textLength; t++) {
                text = legendtext.substring(0, t) + '...';
                textWidth = ej.EjSvgRender.utils._measureText(text, null, font).width;
                if (textWidth >= maxwidth) {
                    text = text.substring(0, t - 1) + '... ';
                    return text;
                }
            }
            return legendtext;
        },
        _measureBounds: function (element, sender) {
            if (sender.model.enableCanvasRendering)
                $(document.body).append(element);
            else {
                sender.svgRenderer.append(element, sender.svgObject);
                sender.svgRenderer.append(sender.svgObject, sender.element);
            }
            var box = element.getBoundingClientRect();
            var bounds = { left: box.left, right: box.right, top: box.top, bottom: box.bottom, width: (box.right - box.left), height: (box.bottom - box.top) };
            $(element).remove();
            return bounds;
        },
        //Draw clip path for each series to avoid series overlap in multiple axes zooming
        _drawAxesBoundsClipPath: function (gSeriesGroupEle, options, sender) {
            var clipOptions;
            var element = $(gSeriesGroupEle);
            var trans = this._getTransform(options.xAxis, options.yAxis, sender.model.requireInvertedAxes);
            var width = (sender.model.AreaType == "polaraxes") ? $(sender.svgObject).width() : trans.width;
            var height = (sender.model.AreaType == "polaraxes") ? $(sender.svgObject).height() : trans.height;

            var hPlotOffset = sender.model.requireInvertedAxes ? options.yAxis.plotOffset : options.xAxis.plotOffset;
            var vPlotOffset = sender.model.requireInvertedAxes ? options.xAxis.plotOffset : options.yAxis.plotOffset;
            if (sender.model.AreaType == 'polaraxes') {
                clipOptions = {
                    'id': gSeriesGroupEle ? gSeriesGroupEle.id + '_ClipRect' : '',
                    'cx': sender.model.centerX,
                    'cy': sender.model.centerY,
                    'r': sender.model.Radius,
                    'fill': 'white',
                    'stroke-width': 1,
                    'stroke': 'transparent'
                };
                sender.svgRenderer.drawCircularClipPath(clipOptions, gSeriesGroupEle);
            }
            else {
                clipOptions = {
                    'id': gSeriesGroupEle ? gSeriesGroupEle.id + '_ClipRect' : '',
                    'x': (0 - hPlotOffset),
                    'y': (0 - vPlotOffset),
                    'width': (width + 2 * hPlotOffset),
                    'height': (height + 2 * vPlotOffset),
                    'fill': 'white',
                    'stroke-width': 1,
                    'stroke': 'transparent'
                };
                sender.svgRenderer.drawClipPath(clipOptions, gSeriesGroupEle);
            }
			// fixed for duplicate ID attributes values
			if(clipOptions.id.indexOf('_Rect'))
				clipOptions.id = clipOptions.id.replace('_Rect', '');
            element.attr('clip-path', 'url(#' + clipOptions.id + ')');

        },
        _getStringBuilder: function () {

            var data = [];
            var counter = 0;

            return {
                // adds string s to the stringbuilder

                append: function (s) {
                    data[counter++] = s;
                    return this;
                },

                // removes j elements starting at i, or 1 if j is omitted

                remove: function (i, j) {
                    data.splice(i, j || 1);
                    return this;
                },

                // inserts string s at i

                insert: function (i, s) {
                    data.splice(i, 0, s);
                    return this;
                },

                // builds the string

                toString: function (s) { return data.join(s || ""); }
            };


        },
        _addRegion: function (chart, bounds, series, point, pointIndex) {
            var type = series.type;
            var seriesIndex = $.inArray(series, chart.model._visibleSeries);
            if (seriesIndex >= 0) {
                var regionItem = { SeriesIndex: seriesIndex, Region: { PointIndex: pointIndex, Bounds: bounds }, type: type };
                chart.model.chartRegions.push(regionItem);
            }
        },

        AddRegion: function (chart, bounds, isStripLine) {

            if (isStripLine) {
                var regionItem = { isStripLine: isStripLine, Region: { Bounds: bounds } };
                chart.model.chartRegions.push(regionItem);
            }
        },


        _getSvgXY: function (x, y, series, sender) {
            var svgX, svgY;
            if (!(sender.model.requireInvertedAxes)) {
                svgX = x + series.xAxis.x;
                svgY = y + series.yAxis.y;
            } else {
                svgX = x + series.yAxis.x;
                svgY = y + series.xAxis.y;
            }
            return { X: svgX, Y: svgY };
        },
        _getPoint: function (point, series) {
            var x = point.xValue, low, xvalue, yvalue,
                y = series.type == "boxandwhisker" ? point.YValues : point.YValues[0],
                xLength = series._isTransposed ? series.xAxis.height : series.xAxis.width,
                yLength = series._isTransposed ? series.yAxis.width : series.yAxis.height;

            point.location = {};

            if (series._hiloTypes) {
                low = point.YValues[1];
                low = (series.yAxis._valueType == "logarithmic") ? ej.EjSvgRender.utils._logBase((low == 0 ? 1 : low), series.xAxis.logBase) : low;
                low = this._getPointXY(low, series.yAxis.visibleRange, series.yAxis.isInversed);
                point.location.low = (series._isTransposed ? low : (1 - low)) * (yLength);
            }

            xvalue = (series.xAxis._valueType == "logarithmic") ? ej.EjSvgRender.utils._logBase((x == 0 ? 1 : x), series.xAxis.logBase) : x;
            yvalue = (series.yAxis._valueType == "logarithmic") ? ej.EjSvgRender.utils._logBase((y == 0 ? 1 : y), series.xAxis.logBase) : y;

            xvalue = (this._getPointXY(xvalue, series.xAxis.visibleRange, series.xAxis.isInversed));
            yvalue = this._getPointXY(yvalue, series.yAxis.visibleRange, series.yAxis.isInversed);
            point.location.X = series._isTransposed ? yvalue * (yLength) : xvalue * (xLength);
            point.location.Y = series._isTransposed ? (1 - xvalue) * (xLength) : (1 - yvalue) * (yLength);

            return point.location;
        },
        _getPointXY: function (value, Range, isInversed) {

            var result = 0;
            result = (value - Range.min) / (Range.delta);
            result = isNaN(result) ? 0 : result;
            return (isInversed) ? (1 - result) : result;

        },

        _dateTimeLabelFormat: function (intervalType, axis) {
            switch (intervalType.toLowerCase()) {
                case "years":
                    return axis._labelFormat = "MMM, yyyy";
                case "months":
                    return axis._labelFormat = "dd, MMM";
                case "days":
                    return axis._labelFormat = "dd/MM/yyyy";
                case "hours":
                    return axis._labelFormat = "dd, hh:mm";
                case "minutes":
                    return axis._labelFormat = "hh:mm";
                case "seconds":
                    return axis._labelFormat = "mm:ss";
                case "milliseconds":
                    return axis._labelFormat = "ss:fff";
                default:
                    return axis._labelFormat = "dd/MM/yyyy";
            }
        },
        _getFontString: function (fontObj) {
            if (fontObj == null)
                fontObj = {};
            if (!fontObj.FontFamily)
                fontObj.FontFamily = "Arial";
            if (!fontObj.FontStyle)
                fontObj.FontStyle = "Normal";
            if (!fontObj.Size)
                fontObj.Size = "12px";

            return fontObj.FontStyle + " " + fontObj.Size + " " + fontObj.FontFamily;
        },

        _valueToVector: function (axis, value) {
            return this._coefficientToVector(this._valueToPolarCoefficient(axis, value));
        },

        TransformToVisible: function (currentseries, x, y, sender) {
            x = (currentseries.xAxis._valueType == "logarithmic") && x > 0 ? Math.log(x, currentseries.xAxis.logBase) : x;
            y = (currentseries.xAxis._valueType == "logarithmic") && y > 0 ? Math.log(y, currentseries.yAxis.logBase) : y;
            var radius = sender.model.Radius * this._valueToCoefficient(currentseries.yAxis, y);
            //var radius = this.chartObj.model.Radius * ej.EjSvgRender.utils._valueToPolarCoefficient(currentseries.yAxis, y);
            var point = this._valueToVector(currentseries.xAxis, x);
            return { X: sender.model.centerX + radius * point.X, Y: sender.model.centerY + radius * point.Y };
        },

        Transform3DToVisible: function (currentseries, x, y, sender) {
            if (currentseries.xAxis != null && currentseries.yAxis != null) {
                var valueType = currentseries.xAxis._valueType.toLowerCase(), xlogarithmicBase, Point;
                var xIsLogarithmic = (valueType == "logarithmic") ? true : false;
                x = x = xIsLogarithmic && x > 0 ? math.log(x, xlogarithmicBase) : x;
                y = y;

                if (sender.model.requireInvertedAxes) {
                    var left = sender.model.m_AreaBounds.X;
                    var top = sender.model.m_AreaBounds.Y;
                    var pointX = left + currentseries.yAxis.width * ej.EjSvgRender.utils._valueToCoefficient(currentseries.yAxis, y, sender);
                    var pointY = top + currentseries.xAxis.height * (1 - ej.EjSvgRender.utils._valueToCoefficient(currentseries.xAxis, x, sender))
                    return { X: pointX, Y: pointY }
                }
                else {
                    var left = currentseries.xAxis.x;
                    var top = currentseries.yAxis.y;
                    var x = left + Math.round(currentseries.xAxis.width * ej.EjSvgRender.utils._valueToCoefficient(currentseries.xAxis, x, sender));
                    var y = top + Math.round(currentseries.yAxis.height * (1 - ej.EjSvgRender.utils._valueToCoefficient(currentseries.yAxis, y, sender)));
                    return { X: x, Y: y }
                }
            }

            return new Point(0, 0);
        },

        _valueToPolarCoefficient: function (axis, value) {
            var start = axis.visibleRange.min;
            var delta;
            var length, result;
            if (axis._valueType != "category") {
                delta = (axis.visibleRange.max - axis.visibleRange.interval) - axis.visibleRange.min;
                length = axis.visibleLabels.length - 1;
            }
            else {
                delta = axis.visibleRange.delta;
                length = axis.visibleLabels.length;
            }

            result = (value - start) / delta;
            result *= 1 - 1 / (length);
            result = isNaN(result) ? 0 : result;

            return axis.isInversed ? result : 1 - result;
        },

        _coefficientToVector: function (coefficient) {
            var angle = Math.PI * (1.5 - 2 * coefficient);

            return { X: Math.cos(angle), Y: Math.sin(angle) };
        },


        _valueToCoefficient: function (axis, value, sender) {
            if (sender && sender.model.AreaType == 'polaraxes') {
                var yvalue = value;
            }
            else
                var yvalue = (axis._valueType && axis._valueType.toLowerCase() == "logarithmic") ?
                    ej.EjSvgRender.utils._logBase((value == 0 ? 1 : value), axis.logBase) : value;

            yvalue = (yvalue - axis.visibleRange.min) / (axis.visibleRange.delta);

            return (axis.isInversed) ? 1 - yvalue : yvalue;
        },
        _getBoundingClientRect: function (element, sender, series, invertedAxes) {
            var box = element.getBoundingClientRect();
            var position = $("#" + (sender.svgObject.id))[0].getBoundingClientRect();
            var xSeries, ySeries;
            if (invertedAxes) {
                xSeries = this._getTransform(series.xAxis, series.yAxis, true).x;
                ySeries = this._getTransform(series.xAxis, series.yAxis, true).y;
            } else {
                xSeries = this._getTransform(series.xAxis, series.yAxis, false).x;
                ySeries = this._getTransform(series.xAxis, series.yAxis, false).y;
            }
            var x = box.left - (xSeries + position.left);
            var y = box.top - (ySeries + position.top);
            return { x: x, y: y, width: (box.right - box.left), height: (box.bottom - box.top) };
        },
        _minMax: function (value, min, max) {
            return value > max ? max : (value < min ? min : value);
        },
        _inside: function (value, range) {
            if (value === "")
                return false;
            return (value <= range.max) && (value >= range.min);
        },
        _logBase: function (val, base) {
            return Math.log(val) / Math.log(base);
        },
        _correctRect: function (x1, y1, x2, y2) {
            return { X: Math.min(x1, x2), Y: Math.min(y1, y2), Width: Math.abs(x2 - x1), Height: Math.abs(y2 - y1) };
        },
        _getValuebyPoint: function (x, y, series, requireInvertedAxes) {

            var xSize = (requireInvertedAxes) ? series.xAxis.height : series.xAxis.width;
            var ySize = (requireInvertedAxes) ? series.yAxis.width : series.yAxis.height;

            var xValue = (series.xAxis.isInversed) ? (1 - (x / xSize)) : (x / xSize);
            var yValue = (series.yAxis.isInversed) ? (1 - (y / ySize)) : (y / ySize);

            xValue = xValue * (series.xAxis.visibleRange.delta) + series.xAxis.visibleRange.min;

            yValue = yValue * (series.yAxis.visibleRange.delta) + series.yAxis.visibleRange.min;

            xValue = (series.xAxis._valueType == "logarithmic") ? Math.pow(series.xAxis.logBase, xValue) : xValue;

            yValue = (series.yAxis._valueType == "logarithmic") ? Math.pow(series.yAxis.logBase, yValue) : yValue;

            return { PointX: xValue, PointY: yValue };

        }

    };
    ej.EjSvgRender.chartTransform3D = {
        ToRadial: Math.PI / 180,

        transform3D: function (size) {
            if (!this.vector) {
                this.vector = new (new ej.Ej3DRender()).vector3D();
                this.matrixobj = new (new ej.Ej3DRender()).matrix3D();
                this.bsptreeobj = new (new ej.Ej3DRender()).BSPTreeBuilder();
                this.polygon = new (new ej.Ej3DRender()).polygon3D();
            }
            return {
                mViewport: size,
                Rotation: 0,
                Tilt: 0,
                Depth: 0,
                PerspectiveAngle: 0,
                needUpdate: true,
                centeredMatrix: this.matrixobj.getIdentity(),
                Perspective: this.matrixobj.getIdentity(),
                resultMatrix: this.matrixobj.getIdentity(),
                viewMatrix: this.matrixobj.getIdentity(),
                Depth: 0
            };
        },

        transform: function (trans) {
            this.setCenter(this.vector.vector3D(trans.mViewport.Width / 2, trans.mViewport.Height / 2, trans.Depth / 2), trans);
            this.setViewMatrix(this.matrixobj.transform(0, 0, trans.Depth), trans)
            this.setViewMatrix(this.matrixobj.getMatrixMultiplication(trans.viewMatrix, this.matrixobj.turn(-this.ToRadial * trans.Rotation)), trans);
            this.setViewMatrix(this.matrixobj.getMatrixMultiplication(trans.viewMatrix, this.matrixobj.tilt(-this.ToRadial * trans.Tilt)), trans);
            this.updatePerspective(trans.PerspectiveAngle, trans);
            trans.needUpdate = true;

        },

        updatePerspective: function (angle, trans) {
            var width = (((trans.mViewport.Width + trans.mViewport.Height) * Math.tan(this.degreeToRadianConverter((180 - Math.abs(angle % 181)) / 2.0))) + (trans.Depth * 2) / 2);
            trans.Perspective[0][0] = width;
            trans.Perspective[1][1] = width;
            trans.Perspective[2][3] = 1;
            trans.Perspective[3][3] = width;

        },

        degreeToRadianConverter: function (degree) {
            return degree * Math.PI / 180;
        },
        toScreen: function (vector3D, trans, result, chartObj) {
            var result = result ? result : this.result;
            if (!chartObj) {
                trans.chartObj = this.matrixobj;
                vector3D = this.matrixobj.getMatrixVectorMutiple(result(trans), vector3D);
            }
            else {
                this.matrixobj = chartObj;
                vector3D = chartObj.getMatrixVectorMutiple(result(trans, chartObj), vector3D);
            }
            return { x: vector3D.x, y: vector3D.y };
        },

        setViewMatrix: function (value, trans) {
            if (trans.viewMatrix == value) return;
            trans.viewMatrix = value;
            trans.needUpdate = true;

        },

        setCenteredMatrix: function (value, trans) {
            if (trans.viewMatrix == value) return;
            trans.centeredMatrix = value;
            trans.needUpdate = true;

        },

        result: function (trans, matrixobj) {
            var chartObj = trans.chartObj ? trans.chartObj : this.matrixobj;
            if (!chartObj) chartObj = matrixobj;
            if (!trans.needUpdate) return trans.resultMatrix;
			var matrixObj =  this.matrixobj ? this.matrixobj : matrixobj;
            trans.resultMatrix = chartObj.getMatrixMultiplication(matrixObj.getInvertal(trans.centeredMatrix),
                trans.Perspective);
            trans.resultMatrix = chartObj.getMatrixMultiplication(trans.resultMatrix, trans.viewMatrix);
            trans.resultMatrix = chartObj.getMatrixMultiplication(trans.resultMatrix, trans.centeredMatrix);
            trans.needUpdate = false;

            return trans.resultMatrix;
        },


        setCenter: function (center, trans) {
            trans.centeredMatrix = this.matrixobj.transform(-center.x, -center.y, -center.z);
            trans.needUpdate = true;
        },
        toPlane: function (point, plane, trans) {
            var vec1 = this.vector.vector3D(point.x, point.y, 0);
            var vec2 = this.vector.vector3DPlus(vec1, this.vector.vector3D(0, 0, 1));

            vec1 = this.vector.vector3DMultiply(trans.centeredMatrix, vec1);
            vec2 = this.vector.vector3DMultiply(trans.centeredMatrix, vec2);

            vec1 = this.vector.vector3DMultiply(this.matrixobj.getInvertal(trans.Perspective), vec1);
            vec2 = this.vector.vector3DMultiply(this.matrixobj.getInvertal(trans.Perspective), vec2);

            vec1 = this.polygon.getPoint(vec1, this.vector.vector3DMinus(vec2 - vec1));

            vec1 = this.vector.vector3DMultiply(this.matrixobj.getInvertal(trans.viewMatrix), vec1);
            vec1 = this.vector.vector3DMultiply(this.matrixobj.getInvertal(trans.centeredMatrix), vec1);

            return vec1;
        }

    };
    ej.EjSvgRender.chartSymbol =
        {
            _drawSeriesType: function (location, symbolStyle, sender) {
                var seriesType = sender.model.series[symbolStyle.SeriesIndex].type.toLowerCase();
                var trendlinetype = sender.legendItem.drawType;
                seriesType = ej.util.isNullOrUndefined(trendlinetype) ? seriesType : trendlinetype;
                switch (seriesType) {
                    case ej.datavisualization.Chart.Type.Line: {
                        var line;
                        if (ej.util.isNullOrUndefined(trendlinetype))
                            line = this._drawLine(location, symbolStyle, sender, sender.gLegendItemEle);
                        else
                            line = this._drawStraightLine(location, symbolStyle, sender, sender.gLegendItemEle);
                        return line;
                    }

                    case ej.datavisualization.Chart.Type.StepLine:
                        return this._drawStepLine(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.StackingArea:
                    case ej.datavisualization.Chart.Type.StackingArea100:
                    case ej.datavisualization.Chart.Type.Area:
                    case ej.datavisualization.Chart.Type.RangeArea:
                        return this._drawArea(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.StepArea:
                        return this._drawStepArea(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.Bar:
                    case ej.datavisualization.Chart.Type.StackingBar100:
                    case ej.datavisualization.Chart.Type.StackingBar:
                        return this._drawBar(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.Pie:
                        return this._drawPie(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.Doughnut:
                        return this._drawDoughnut(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.Hilo:
                        return this._drawHilo(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.HiloOpenClose:
                        return this._drawHiloOpenClose(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.Candle:
                        return this._drawCandle(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.Pyramid:
                        return this._drawPyramid(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.Funnel:
                        return this._drawFunnel(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.Spline:
                        return this._drawSpline(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.SplineArea:
                    case ej.datavisualization.Chart.Type.StackingSplineArea:
                    case ej.datavisualization.Chart.Type.StackingSplineArea100:
                        return this._drawSplineArea(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.RangeColumn:
                        return this._drawRangeColumn(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.Bubble:
                    case ej.datavisualization.Chart.Type.Scatter:
                        return this._drawCircle(location, symbolStyle, sender, sender.gLegendItemEle);

                    case ej.datavisualization.Chart.Type.Column:
                    case ej.datavisualization.Chart.Type.StackingColumn:
                    case ej.datavisualization.Chart.Type.StackingColumn100:
                    case ej.datavisualization.Chart.Type.Waterfall:
                        return this._drawColumn(location, symbolStyle, sender, sender.gLegendItemEle);

                    default:
                        return this._drawRectangle(location, symbolStyle, sender, sender.gLegendItemEle);

                }

            },

            _drawCircle: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer, svgObj = sender.svgObject, style = symbolStyle.ShapeSize,
                    radius = Math.sqrt(style.height * style.height + style.width * style.width) / 2,
                    symbolstyleStyle = symbolStyle.Style;

                var options = {
                    'id': symbolStyle.ID,
                    'cx': location.startX,
                    'cy': location.startY,
                    'r': radius,
                    'fill': symbolstyleStyle.Color,
                    'stroke-width': symbolstyleStyle.BorderWidth,
                    'stroke': symbolstyleStyle.BorderColor,
                    'opacity': symbolstyleStyle.Opacity,
                    'visibility': symbolstyleStyle.Visibility,
                    'lgndCtx': symbolStyle.context
                };

                svgRender.drawCircle(options, element);

                return (location.startX - radius);
            },

            _drawLeftArrow: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var path;
                path = "M" + " " + ((location.startX - (style.width / 2)) + style.width) + " " + (location.startY + (style.height / 4)) + " " + "L" + " " + ((location.startX - (style.width / 2)) + style.width) + " " + (location.startY + (-style.height / 4)) + " " + "L" + " " + ((location.startX - (style.width / 2)) + (style.width / 2)) + " " + (location.startY + (-style.height / 4)) + " " + "L" + " " + ((location.startX - (style.width / 2)) + (style.width / 2)) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + ((location.startX - (style.width / 2))) + " " + (location.startY) + " " + "L" + " " + ((location.startX - (style.width / 2)) + (style.width / 2)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + ((location.startX - (style.width / 2)) + (style.width / 2)) + " " + (location.startY + (style.height / 4)) + " " + "L" + " " + ((location.startX - (style.width / 2)) + style.width) + " " + (location.startY + (style.height / 4)) + " z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);

            },


            _drawRightArrow: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var path;
                path = "M" + " " + ((location.startX - (style.width / 2))) + " " + (location.startY + (style.height / 4)) + " " + "L" + " " + ((location.startX - (style.width / 2))) + " " + (location.startY + (-style.height / 4)) + " " + "L" + " " + ((location.startX - (style.width / 2)) + (style.width / 2)) + " " + (location.startY + (-style.height / 4)) + " " + "L" + " " + ((location.startX - (style.width / 2)) + (style.width / 2)) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + ((location.startX - (style.width / 2)) + style.width) + " " + (location.startY) + " " + "L" + " " + ((location.startX - (style.width / 2)) + (style.width / 2)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + ((location.startX - (style.width / 2)) + (style.width / 2)) + " " + (location.startY + (style.height / 4)) + " " + "L" + " " + ((location.startX - (style.width / 2))) + " " + (location.startY + (style.height / 4)) + " z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };


                svgRender.drawPath(options, element);


            },


            _drawUpArrow: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var path;
                path = "M" + " " + ((location.startX - (style.width / 2) + (style.width / 4))) + " " + (location.startY - (style.height / 2) + (style.height)) + " " + "L" + " " + ((location.startX - (style.width / 2) + (style.width / 4))) + " " + (location.startY - (style.height / 2) + (style.height / 2)) + " " + "L" + " " + ((location.startX - (style.width / 2))) + " " + (location.startY - (style.height / 2) + (style.height / 2)) + " " + "L" + " " + ((location.startX)) + " " + (location.startY - (style.height / 2)) + " " + "L" + " " + ((location.startX + (style.width / 2))) + " " + (location.startY - (style.height / 2) + (style.height / 2)) + " " + "L" + " " + ((location.startX + (style.width / 2) - (style.width / 4))) + " " + (location.startY - (style.height / 2) + (style.height / 2)) + " " + "L" + " " + ((location.startX + (style.width / 2) - (style.width / 4))) + " " + (location.startY - (style.height / 2) + (style.height)) + " " + "L" + " " + ((location.startX - (style.width / 2) + (style.width / 4))) + " " + (location.startY - (style.height / 2) + (style.height)) + " z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };


                svgRender.drawPath(options, element);


            },

            _drawDownArrow: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var path;
                path = "M" + " " + ((location.startX - (style.width / 2) + (style.width / 4))) + " " + (location.startY - (style.height / 2)) + " " + "L" + " " + ((location.startX + (style.width / 2) - (style.width / 4))) + " " + (location.startY - (style.height / 2)) + " " + "L" + " " + ((location.startX + (style.width / 2) - (style.width / 4))) + " " + (location.startY - (style.height / 2) + (style.height / 2)) + " " + "L" + " " + ((location.startX + (style.width / 2))) + " " + (location.startY - (style.height / 2) + (style.height / 2)) + " " + "L" + " " + ((location.startX)) + " " + (location.startY - (style.height / 2) + (style.height)) + " " + "L" + " " + ((location.startX - (style.width / 2))) + " " + (location.startY - (style.height / 2) + (style.height / 2)) + " " + "L" + " " + ((location.startX - (style.width / 2) + (style.width / 4))) + " " + (location.startY - (style.height / 2) + (style.height / 2)) + " " + "L" + " " + ((location.startX - (style.width / 2) + (style.width / 4))) + " " + (location.startY - (style.height / 2)) + " z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };


                svgRender.drawPath(options, element);

            },

            _drawCross: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;

                var path;
                path = "M" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY) + " " +
                    "M" + " " + (location.startX) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX) + " " + (location.startY + (-style.height / 2));
                var options = {
                    'id': symbolStyle.ID,
                    'opacity': symbolStyle.Style.Opacity,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.Color,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);

            },

            _drawHorizLine: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;

                var path;
                path = "M" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY);
                var options = {
                    'id': symbolStyle.ID,
                    'opacity': symbolStyle.Style.Opacity,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.Color,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);


            },
            _drawVertLine: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var path;
                path = "M" + " " + (location.startX) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX) + " " + (location.startY + (-style.height / 2));
                var options = {
                    'id': symbolStyle.ID,
                    'opacity': symbolStyle.Style.Opacity,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.Color,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };


                svgRender.drawPath(options, element);

            },

            _drawTriangle: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var path;
                path = "M" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY + (style.height / 2)) + " z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);

            },

            _drawInvertedTriangle: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;

                var path;
                path = "M" + " " + (location.startX + (style.width / 2)) + " " + (location.startY - (style.height / 2)) + " "
                    + "L" + " " + (location.startX) + " " + (location.startY + (style.height / 2)) + " "
                    + "L" + " " + (location.startX - (style.width / 2)) + " " + (location.startY - (style.height / 2)) + " "
                    + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY - (style.height / 2)) + " z";
                var x = location.startX;
                var y = location.startY;
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);


            },

            _drawHexagon: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;

                var path;
                path = "M" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY) + " " + "L" + " " + (location.startX + (-style.width / 4)) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX + (style.width / 4)) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY) + " " + "L" + " " + (location.startX + (style.width / 4)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 4)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY) + " z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);

            },

            _drawWedge: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;

                var path;
                path = "M" + " " + (location.startX - style.width) + " " + (location.startY) + " " + "L" + " " + (location.startX + style.width) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX + (3 * (style.width / 4))) + " " + (location.startY) + " " + "L" + " " + (location.startX + (style.width)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX - style.width) + " " + (location.startY) + " z";
                var options = {
                    'stroke-linecap': 'miter',
                    'stroke-miterlimit': style.width / 4,
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);

            },

            _drawPentagon: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;

                var eq = 72;
                var radius = Math.sqrt(style.height * style.height + style.width * style.width) / 2;
                var sb = ej.EjSvgRender.utils._getStringBuilder();
                for (var i = 0; i <= 5; i++) {
                    var deg = i * eq;
                    var rad = (Math.PI / 180) * deg;
                    var x1 = radius * Math.cos(rad);
                    var y1 = radius * Math.sin(rad);
                    if (i == 0)
                        sb.append("M" + " " + (location.startX + x1) + " " + (location.startY + y1) + " ");

                    else
                        sb.append("L" + " " + (location.startX + x1) + " " + (location.startY + y1) + " ");


                }
                sb.append("z");
                var path = sb.toString();
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);


            },

            _drawStar: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var style = symbolStyle.ShapeSize;
                var svgObj = sender.svgObject;

                var path;
                path = "M" + " " + (location.startX + (style.width / 3)) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY + (style.height / 6)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (style.height / 6)) + " " + "L" + " " + (location.startX + (-style.width / 3)) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (style.width / 3)) + " " + (location.startY + (-style.height / 2)) + " z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);


            },

            _drawRectangle: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;

                var path;
                path = "M" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY + (-style.height / 2)) + " z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);
            },

            _drawTrapezoid: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;

                var path;
                path = "M" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY) + " " + "L" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY + (-style.height / 4)) + " " + "L" + " " + (location.startX + (-style.width / 2) + (style.width)) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 2) + (style.width)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY + (style.height / 4)) + " " + "L" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY) + " z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);

            },

            _drawDiamond: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;

                var path;
                path = "M" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY) + " " + "L" + " " + (location.startX) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY) + " " + "L" + " " + (location.startX) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY) + " z";

                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'd': path
                };

                svgRender.drawPath(options, element);


            },
            _drawEllipse: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;

                var x = location.startX;
                var y = location.startY;
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'lgndCtx': symbolStyle.context,
                    'cx': x,
                    'cy': y,
                    'rx': style.width,
                    'ry': style.height / 2
                };


                svgRender.drawEllipse(options, element);


            },
            _drawImage: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var x = location.startX + (-style.width / 2);
                var y = location.startY + (-style.width / 2);
                var width = style.width;
                var height = style.height;
                var options = {
                    'id': svgObj.id + '_image' + symbolStyle.PointIndex, 'height': height, 'width': width, 'href': symbolStyle.Imageurl,
                    'x': x, 'y': y, 'visibility': 'visible', 'lgndCtx': symbolStyle.context
                };

                svgRender.drawImage(options, element);


            },

            _drawStraightLine: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;

                path = "M" + " " + (location.startX + (-style.width / 2) + (-elementspace / 4)) + " " + (location.startY + (style.height / 10)) + " " +
                    "L" + " " + (location.startX + (style.width / 2) + (elementspace / 4)) + " " + (location.startY + (style.height / 10));
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth * 2,
                    'stroke': symbolStyle.Style.Color,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };
                svgRender.drawPath(options, element);
                return (location.startX + (-style.width / 2) + (-elementspace / 4));
            },

            _drawLine: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;

                if (sender.model.enableCanvasRendering === true) {
                    path = "M" + " " + (location.startX + (-style.width / 2) + (-elementspace / 4)) + " " + (location.startY + (style.height / 10)) + " " + "L" + " " + (location.startX - Math.floor(style.width / 3)) + " " + (location.startY + (style.height / 10)) + " " + "M" + " " + (location.startX + Math.floor(style.width / 3)) + " " + (location.startY + (style.height / 10)) + " " + "L" + " " + (location.startX + (style.width / 2) + (elementspace / 4)) + " " + (location.startY + (style.height / 10));
                    var options = {
                        'id': symbolStyle.ID,
                        'fill': symbolStyle.Style.Color,
                        'stroke-width': symbolStyle.Style.BorderWidth * 2,
                        'stroke': symbolStyle.Style.Color,
                        'opacity': symbolStyle.Style.Opacity,
                        'visibility': symbolStyle.Style.Visibility,
                        'd': path,
                        'lgndCtx': true
                    };
                    var circlepath = "M" + " " + (location.startX - Math.floor(style.width / 3)) + " " + (location.startY + (style.height / 10)) + " " + "a " + (Math.floor(style.width / 3)) + " " + (Math.floor(style.width / 3)) + " " + 0 + " " + 1 + " " + 0 + " " + 2 * (Math.floor(style.width / 3)) + " " + 0 + " " + "a" + (Math.floor(style.width / 3)) + " " + (Math.floor(style.width / 3)) + " " + 0 + " " + 1 + " " + 0 + " " + (-2 * (Math.floor(style.width / 3))) + " " + 0;
                    var circleoptions = {
                        'id': symbolStyle.ID,
                        'fill': "transparent",
                        'stroke-width': symbolStyle.Style.BorderWidth * 2,
                        'stroke': symbolStyle.Style.Color,
                        'opacity': symbolStyle.Style.Opacity,
                        'visibility': symbolStyle.Style.Visibility,
                        'd': circlepath,
                        'lgndCtx': true
                    };

                    svgRender.drawPath(options, element);
                    svgRender.drawPath(circleoptions, element);
                }
                else {
                    path = "M" + " " + (location.startX + (-style.width / 2) + (-elementspace / 4)) + " " + (location.startY + (style.height / 10)) + " " + "L" + " " + (location.startX - Math.floor(style.width / 3)) + " " + (location.startY + (style.height / 10)) + " " + "M" + " " + (location.startX + Math.floor(style.width / 3)) + " " + (location.startY + (style.height / 10)) + " " + "L" + " " + (location.startX + (style.width / 2) + (elementspace / 4)) + " " + (location.startY + (style.height / 10)) + " " + "M" + " " + (location.startX - Math.floor(style.width / 3)) + " " + (location.startY + (style.height / 10)) + " " + "a " + (Math.floor(style.width / 3)) + " " + (Math.floor(style.width / 3)) + " " + 0 + " " + 1 + " " + 0 + " " + 2 * (Math.floor(style.width / 3)) + " " + 0 + " " + "a" + (Math.floor(style.width / 3)) + " " + (Math.floor(style.width / 3)) + " " + 0 + " " + 1 + " " + 0 + " " + (-2 * (Math.floor(style.width / 3))) + " " + 0;
                    var options = {
                        'id': symbolStyle.ID,
                        'fill': "transparent",
                        'stroke-width': symbolStyle.Style.BorderWidth * 2,
                        'stroke': symbolStyle.Style.Color,
                        'opacity': symbolStyle.Style.Opacity,
                        'visibility': symbolStyle.Style.Visibility,
                        'd': path,
                        'lgndCtx': true
                    };
                    svgRender.drawPath(options, element);
                }
                return (location.startX + (-style.width / 2) + (-elementspace / 4));

            },
            _drawColumn: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;
                path = "M" + " " + (location.startX - 3 * (style.width / 5)) + " " + (location.startY - (style.height / 5)) + " " + "L" + " " + (location.startX + 3 * (-style.width / 10)) + " " + (location.startY - (style.height / 5)) + " " + "L" + " " + (location.startX + 3 * (-style.width / 10)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX - 3 * (style.height / 5)) + " " + (location.startY + (style.height / 2)) + " " + "Z" + " " + "M" + " " + (location.startX + (-style.width / 10) - (style.width / 20)) + " " + (location.startY - (style.height / 4) - (elementspace / 2)) + " " + "L" + " " + (location.startX + (style.width / 10) + (style.width / 20)) + " " + (location.startY - (style.height / 4) - (elementspace / 2)) + " " + "L" + " " + (location.startX + (style.width / 10) + (style.width / 20)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 10) - (style.width / 20)) + " " + (location.startY + (style.height / 2)) + " " + "Z" + " " + "M" + " " + (location.startX + 3 * (style.width / 10)) + " " + (location.startY) + " " + "L" + " " + (location.startX + 3 * (style.width / 5)) + " " + (location.startY) + " " + "L" + " " + (location.startX + 3 * (style.width / 5)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + 3 * (style.width / 10)) + " " + (location.startY + (style.height / 2)) + " " + "Z";

                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX - 3 * (style.width / 5));

            },
            _drawRangeColumn: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;
                path = "M" + " " + (location.startX + (-style.width / 5)) + " " + (location.startY + (style.height / 2) + (elementspace / 4)) + " " + "L" + " " + (location.startX + (-style.width / 5)) + " " + (location.startY - (style.height / 2) - (elementspace / 4)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (-style.height / 2) + (-elementspace / 4)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (style.height / 2) + (elementspace / 4)) + " " + "Z";

                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX + (-style.width / 5));

            },

            _drawBar: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;

                path = "M" + " " + (location.startX + (-style.width / 2) + (-elementspace / 4)) + " " + (location.startY - 3 * (style.height / 5)) + " " + "L" + " " + (location.startX + 3 * (style.width / 10)) + " " + (location.startY - 3 * (style.height / 5)) + " " + "L" + " " + (location.startX + 3 * (style.width / 10)) + " " + (location.startY - 3 * (style.height / 10)) + " " + "L" + " " + (location.startX - (style.width / 2) + (-elementspace / 4)) + " " + (location.startY - 3 * (style.height / 10)) + " " + "Z" + " " + "M" + " " + (location.startX + (-style.width / 2) + (-elementspace / 4)) + " " + (location.startY - (style.height / 5) + (elementspace / 20)) + " " + "L" + " " + (location.startX + (style.width / 2) + (elementspace / 4)) + " " + (location.startY - (style.height / 5) + (elementspace / 20)) + " " + "L" + " " + (location.startX + (style.width / 2) + (elementspace / 4)) + " " + (location.startY + (style.height / 10) + (elementspace / 20)) + " " + "L" + " " + (location.startX - (style.width / 2) + (-elementspace / 4)) + " " + (location.startY + (style.height / 10) + (elementspace / 20)) + " " + "Z" + " " + "M" + " " + (location.startX - (style.width / 2) + (-elementspace / 4)) + " " + (location.startY + (style.height / 5) + (elementspace / 10)) + " " + "L" + " " + (location.startX + (-style.width / 4)) + " " + (location.startY + (style.height / 5) + (elementspace / 10)) + " " + "L" + " " + (location.startX + (-style.width / 4)) + " " + (location.startY + (style.height / 2) + (elementspace / 10)) + " " + "L" + " " + (location.startX - (style.width / 2) + (-elementspace / 4)) + " " + (location.startY + (style.height / 2) + (elementspace / 10)) + " " + "Z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX + (-style.width / 2) + (-elementspace / 4));

            },

            _drawStepLine: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;

                path = "M" + " " + (location.startX + (-style.width / 2) - (elementspace / 4)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 2) + (style.width / 10)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 2) + (style.width / 10)) + " " + (location.startY) + " " + "L" + " " + (location.startX + (-style.width / 10)) + " " + (location.startY) + " " + "L" + " " + (location.startX + (-style.width / 10)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (style.width / 5)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (style.width / 5)) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (-style.height / 2)) + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (style.height / 2)) + " " + "L" + "" + (location.startX + (style.width / 2) + (elementspace / 4)) + " " + (location.startY + (style.height / 2));
                var options = {
                    'id': symbolStyle.ID,
                    'fill': "transparent",
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.Color,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX + (-style.width / 2) - (elementspace / 4));

            },
            _drawSpline: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var path;
                path = "M" + " " + (location.startX - (style.width / 2)) + " " + (location.startY + (style.height / 5)) + " " + "Q" + " " + location.startX + " " + (location.startY - style.height) + " " + location.startX + " " + (location.startY + (style.height / 5)) + " " + "M" + " " + location.startX + " " + (location.startY + (style.height / 5)) + " " + "Q" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (style.height / 2)) + " " + (location.startX + (style.width / 2)) + " " + (location.startY - (style.height / 2));
                var options = {
                    'id': symbolStyle.ID,
                    'fill': "transparent",
                    'stroke-width': symbolStyle.Style.BorderWidth * 2,
                    'stroke': symbolStyle.Style.Color,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX - (style.width / 2));

            },
            _drawSplineArea: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var path;
                path = "M" + " " + (location.startX - (style.width / 2)) + " " + (location.startY + (style.height / 5)) + " " + "Q" + " " + location.startX + " " + (location.startY - style.height) + " " + location.startX + " " + (location.startY + (style.height / 5)) + " " + "Z" + " " + "M" + " " + location.startX + " " + (location.startY + (style.height / 5)) + " " + "Q" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (style.height / 2)) + " " + (location.startX + (style.width / 2)) + " " + (location.startY - (style.height / 2)) + " " + " Z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.Color,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX - (style.width / 2));

            },
            _drawArea: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;
                path = "M" + " " + (location.startX - (style.width / 2) - (elementspace / 4)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 4) + (-elementspace / 8)) + " " + (location.startY - (style.height / 2)) + " " + "L" + " " + (location.startX) + " " + (location.startY + (style.height / 4)) + " " + "L" + " " + (location.startX + (style.width / 4) + (elementspace / 8)) + " " + (location.startY + (-style.height / 2) + (style.height / 4)) + " " + "L" + " " + (location.startX + (style.height / 2) + (elementspace / 4)) + " " + (location.startY + (style.height / 2)) + " " + "Z";

                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX - (style.width / 2) - (elementspace / 4));

            },
            _drawStepArea: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;

                path = "M" + " " + (location.startX + (-style.width / 2) + (-elementspace / 4)) + " " + (location.startY + (style.height / 2)) + " " + "L" + " " + (location.startX + (-style.width / 2) + (-elementspace / 4)) + " " + (location.startY + (-style.height / 2)) + " " + "L" + " " + (location.startX - (style.width / 4)) + " " + (location.startY - (style.height / 2)) + " " + "L" + " " + (location.startX - (style.width / 4)) + " " + (location.startY - (style.height / 4)) + " " + "L" + " " + (location.startX + (style.width / 4)) + " " + (location.startY - (style.height / 4)) + " " + "L" + " " + (location.startX + (style.width / 4)) + " " + (location.startX) + " " + "L" + " " + (location.startX + (style.width / 2) + (elementspace / 4)) + " " + (location.startY) + " " + "L" + " " + (location.startX + (style.width / 2) + (elementspace / 4)) + " " + (location.startY + (style.height / 2)) + " " + "Z";
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX + (-style.width / 2) + (-elementspace / 4));

            },
            _drawPyramid: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;
                path = "M" + " " + (location.startX + (-style.width / 2) + (-elementspace / 4)) + " " + (location.startY + (style.height / 2) + (elementspace / 8)) + " " + "L" + " " + (location.startX) + " " + (location.startY + (-style.height / 2) + (-elementspace / 8)) + " " + "L" + " " + (location.startX + (style.width / 2) + (elementspace / 4)) + " " + (location.startY + (style.height / 2) + (elementspace / 8)) + " " + "Z";

                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX + (-style.width / 2) + (-elementspace / 4));


            },
            _drawFunnel: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;
                path = "M" + " " + (location.startX + (-style.width / 2) + (-elementspace / 5)) + " " + (location.startY + (-style.height / 2) + (-elementspace / 4)) + " " + "L" + " " + (location.startX + (-style.width / 5)) + " " + (location.startY + (style.height / 4)) + " " + "L" + " " + (location.startX + (-style.width / 5)) + " " + (location.startY + (style.height / 2) + (elementspace / 4)) + " " + "L" + " " + (location.startX + (style.width / 5)) + " " + (location.startY + (style.height / 2) + (elementspace / 4)) + " " + "L" + " " + (location.startX + (style.width / 5)) + " " + (location.startY + (style.height / 4)) + " " + "L" + " " + (location.startX + (style.width / 2) + (elementspace / 5)) + " " + (location.startY + (-style.height / 2) + (-elementspace / 4)) + " " + "Z";

                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX + (-style.width / 2) + (-elementspace / 5));

            },
            _drawCandle: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;

                path = "M" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY + (style.height / 4) + (elementspace / 8)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (style.height / 4) + (elementspace / 8)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (-style.height / 2) + (elementspace / 8)) + " " + "L" + " " + (location.startX + (-style.width / 2)) + " " + (location.startY + (-style.height / 2) + (elementspace / 8)) + " " + "Z" + " " + "M" + " " + (location.startX) + " " + (location.startY + (-style.height / 2) + (elementspace / 8)) + " " + "L" + " " + (location.startX) + " " + (location.startY + (-style.height / 2) + (-elementspace / 4)) + " " + "M" + " " + (location.startX) + " " + (location.startY + (style.height / 4) + (elementspace / 8)) + " " + "L" + " " + (location.startX) + " " + (location.startY + (style.height / 4) + (elementspace / 2));
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.Color,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX + (-style.width / 2));

            },
            _drawHilo: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var path;
                path = "M" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (style.height / 2) + (elementspace / 4)) + " " + "L" + " " + (location.startX + (style.width / 2)) + " " + (location.startY + (-style.height / 2) + (-elementspace / 4));
                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.Color,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return (location.startX + (style.width / 2));

            },
            _drawHiloOpenClose: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var cartesian = polarToCartesian(18, 12, 4.0710678118654755, 270);
                var elementspace = symbolStyle.ElementSpace;
                var path;

                path = "M" + " " + (location.startX) + " " + (location.startY - 3 * (style.height / 10)) + " " + "L" + " " + (location.startX - (style.width / 2) - (elementspace / 4)) + " " + (location.startY - 3 * (style.height / 10)) + " " + "M" + " " + (location.startX) + " " + (location.startY - (style.height / 2) - (elementspace / 4)) + " " + "L" + " " + (location.startX) + " " + (location.startY + (style.height / 2) + (elementspace / 4)) + " " + "M" + " " + (location.startX) + " " + (location.startY + 3 * (style.height / 10)) + " " + "L" + " " + (location.startX + (style.width / 2) + (elementspace / 4)) + " " + (location.startY + 3 * (style.height / 10));
                var options = {
                    'id': symbolStyle.ID,
                    'fill': "transparent",
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.Color,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);

                return ((location.startX) - (style.width / 2));

            },

            _drawDoughnut: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var radius = Math.sqrt(style.height * style.width) / 2;
                radius = radius + (elementspace / 5);
                var cartesianlarge = polarToCartesian(location.startX, location.startY, radius, 270);
                var cartesiansmall = polarToCartesian(location.startX + (style.width / 10), location.startY, radius, 270);
                var elementspace = symbolStyle.ElementSpace;
                var path = "M" + " " + location.startX + " " + location.startY + " " + "L" + " " + (location.startX + radius) + " " + (location.startY) + " " + "A" + " " + (radius) + " " + (radius) + " " + 0 + " " + 1 + " " + 1 + " " + cartesianlarge[0] + " " + cartesianlarge[1] + " " + "Z" + " " + "M" + " " + (location.startX + (style.width / 10)) + " " + (location.startY - (style.height / 10)) + " " + "L" + (location.startX + (radius)) + " " + (location.startY - style.height / 10) + " " + "A" + " " + (radius) + " " + (radius) + " " + 0 + " " + 0 + " " + 0 + " " + cartesiansmall[0] + " " + cartesiansmall[1] + " " + "Z";

                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };
                var circle = {
                    'id': symbolStyle.ID, 'cx': location.startX, 'cy': location.startY, 'r': (radius / 2), 'lgndCtx': true,
                    'fill': "white", 'stroke-width': symbolStyle.Style.BorderWidth, 'stroke': symbolStyle.Style.BorderColor, 'opacity': symbolStyle.Style.Opacity, 'visibility': symbolStyle.Style.Visibility
                };

                svgRender.drawPath(options, element);
                svgRender.drawCircle(circle, element);

                return (location.startX - radius);
            },

            _drawPie: function (location, symbolStyle, sender, element) {
                var svgRender = sender.svgRenderer;
                var svgObj = sender.svgObject;
                var style = symbolStyle.ShapeSize;
                var elementspace = symbolStyle.ElementSpace;
                var radius = Math.sqrt(style.height * style.width) / 2;
                radius = radius + (elementspace / 5);
                var cartesianlarge = polarToCartesian(location.startX, location.startY, radius, 270);
                var cartesiansmall = polarToCartesian(location.startX + (style.width / 10), location.startY, radius, 270);
                var elementspace = symbolStyle.ElementSpace;
                var path = "M" + " " + location.startX + " " + location.startY + " " + "L" + " " + (location.startX + radius) + " " + (location.startY) + " " + "A" + " " + (radius) + " " + (radius) + " " + 0 + " " + 1 + " " + 1 + " " + cartesianlarge[0] + " " + cartesianlarge[1] + " " + "Z" + " " + "M" + " " + (location.startX + (style.width / 10)) + " " + (location.startY - (style.height / 10)) + " " + "L" + (location.startX + (radius)) + " " + (location.startY - style.height / 10) + " " + "A" + " " + (radius) + " " + (radius) + " " + 0 + " " + 0 + " " + 0 + " " + cartesiansmall[0] + " " + cartesiansmall[1] + " " + "Z";

                var options = {
                    'id': symbolStyle.ID,
                    'fill': symbolStyle.Style.Color,
                    'stroke-width': symbolStyle.Style.BorderWidth,
                    'stroke': symbolStyle.Style.BorderColor,
                    'opacity': symbolStyle.Style.Opacity,
                    'visibility': symbolStyle.Style.Visibility,
                    'd': path,
                    'lgndCtx': true
                };

                svgRender.drawPath(options, element);
                return (location.startX - radius);
            }

        };
    function polarToCartesian(startX, startY, radius, angleInDegrees) {
        var angleInRadians = angleInDegrees * Math.PI / 180.0;
        var x = startX + radius * Math.cos(angleInRadians);
        var y = startY + radius * Math.sin(angleInRadians);
        return [x, y];
    }
    ej.EjSvgRender.seriesPalette = {
        defaultMetro: ["#E94649", "#F6B53F", "#6FAAB0", "#C4C24A", "#FB954F", "#005277", "#8BC652", "#69D2E7", "#E27F2D", "#6A4B82"],
        defaultHighContrast: ["#F93A00", "#44E2D6", "#DDD10D", "#0AA368", "#0556CB", "#AB40B2", "#5F930A", "#D12E41", "#E0670E", "#008FFF"],
        defaultOffice: ["#005277", "#8BC652", "#6A4B82", "#E94649", "#6FAAB0", "#F7B74F", "#C4C24A", "#EF863F", "#69D2E7", "#FFD13E"],
        defaultMaterial: ["#663AB6", "#EB3F79", "#F8AB1D", "#B82E3D", "#049CB1", "#F2424F", "#C2C924", "#3DA046", "#074D67", "#02A8F4"],
        defaultGradient:
            {
                borderColors: ["#F34649", "#F6D321", "#6EB9B0", "#CBC26A", "#FBAF4F", "#E2CDB1", "#FFC0B7", "#68E1E6", "#E1A62D", "#9C6EBF"],
                seriesColors: [[{ color: "#F34649", colorStop: "0%" }, { color: "#B74143", colorStop: "100%" }],
                [{ color: "#F6D321", colorStop: "0%" }, { color: "#F6AE26", colorStop: "100%" }],
                [{ color: "#6EB9B0", colorStop: "0%" }, { color: "#3F77BD", colorStop: "100%" }],
                [{ color: "#CBC26A", colorStop: "0%" }, { color: "#9AAD21", colorStop: "100%" }],
                [{ color: "#FBAF4F", colorStop: "0%" }, { color: "#F07542", colorStop: "100%" }],
                [{ color: "#E2CDB1", colorStop: "0%" }, { color: "#AAA089", colorStop: "100%" }],
                [{ color: "#8BC652", colorStop: "0%" }, { color: "#6F9E41", colorStop: "100%" }],
                [{ color: "#68E1E6", colorStop: "0%" }, { color: "#3D9CBE", colorStop: "100%" }],
                [{ color: "#E1A62D", colorStop: "0%" }, { color: "#B66824", colorStop: "100%" }],
                [{ color: "#9C6EBF", colorStop: "0%" }], [{ color: "#593F6D", colorStop: "100%" }]]
            },
        blueMetro: ["#005378", "#006691", "#007EB5", "#0D97D4", "#00AEFF", "#14B9FF", "#54CCFF", "#87DBFF", "#ADE5FF", "#C5EDFF"],
        blueGradient:
            {
                seriesColors: [[{ color: "#005277", colorStop: "0%" }, { color: "#00304F", colorStop: "100%" }],
                [{ color: "#006590", colorStop: "0%" }, { color: "#004068", colorStop: "100%" }],
                [{ color: "#007DB4", colorStop: "0%" }, { color: "#00558B", colorStop: "100%" }],
                [{ color: "#0D97D4", colorStop: "0%" }, { color: "#057FC7", colorStop: "100%" }],
                [{ color: "#00ADFE", colorStop: "0%" }, { color: "#008BE9", colorStop: "100%" }],
                [{ color: "#14B8FE", colorStop: "0%" }, { color: "#0798EB", colorStop: "100%" }],
                [{ color: "#53CBFF", colorStop: "0%" }, { color: "#35AFEB", colorStop: "100%" }],
                [{ color: "#86DAFF", colorStop: "0%" }, { color: "#64C0EC", colorStop: "100%" }],
                [{ color: "#ACE5FF", colorStop: "0%" }, { color: "#8DCEED", colorStop: "100%" }],
                [{ color: "#C4ECFF", colorStop: "0%" }], [{ color: "#A3D1E6", colorStop: "100%" }]],
                borderColors: ["#005277", "#006590", "#007DB4", "#0D97D4", "#00ADFE", "#14B8FE", "#53CBFF", "#86DAFF", "#ACE5FF", "#C4ECFF"]
            },
        greenMetro: ["#496612", "#597B15", "#709A1B", "#87B62A", "#9AD926", "#A6DC37", "#BCE654", "#C8E780", "#D5EFA5", "#E2F3BE"],
        greenGradient:
            {

                seriesColors: [[{ color: "#5C7F16", colorStop: "0%" }, { color: "#384C08", colorStop: "100%" }],
                [{ color: "#6A9319", colorStop: "0%" }, { color: "#486009", colorStop: "100%" }],
                [{ color: "#739D1C", colorStop: "0%" }, { color: "#57760B", colorStop: "100%" }],
                [{ color: "#90B546", colorStop: "0%" }, { color: "#6E9215", colorStop: "100%" }],
                [{ color: "#9AD826", colorStop: "0%" }, { color: "#75A010", colorStop: "100%" }],
                [{ color: "#A5DB36", colorStop: "0%" }, { color: "#8EB91D", colorStop: "100%" }],
                [{ color: "#BBE554", colorStop: "0%" }, { color: "#A4C849", colorStop: "100%" }],
                [{ color: "#C8E780", colorStop: "0%" }, { color: "#B4D072", colorStop: "100%" }],
                [{ color: "#D4EEA5", colorStop: "0%" }, { color: "#BFD593", colorStop: "100%" }],
                [{ color: "#E1F2BD", colorStop: "0%" }], [{ color: "#C8D7A8", colorStop: "100%" }]],
                borderColors: ["#5C7F16", "#6A9319", "#739D1C", "#90B546", "#9AD826", "#A5DB36", "#BBE554", "#C8E780", "#D4EEA5", "#E1F2BD"]
            },

        sandleMetro: ["#6C450C", "#82520D", "#A36812", "#C07F1F", "#E69719", "#E89A2B", "#EEB564", "#F3CB93", "#F7DEB4", "#F9E6CA"],
        sandleGradient:
            {


                seriesColors: [[{ color: "#7F602F", colorStop: "0%" }, { color: "#512D04", colorStop: "100%" }],
                [{ color: "#986827", colorStop: "0%" }, { color: "#673803", colorStop: "100%" }],
                [{ color: "#A16C1F", colorStop: "0%" }, { color: "#8A4B05", colorStop: "100%" }],
                [{ color: "#BF812A", colorStop: "0%" }, { color: "#AD630D", colorStop: "100%" }],
                [{ color: "#E49519", colorStop: "0%" }, { color: "#B86607", colorStop: "100%" }],
                [{ color: "#E7992A", colorStop: "0%" }, { color: "#D7780D", colorStop: "100%" }],
                [{ color: "#EDB463", colorStop: "0%" }, { color: "#D98F31", colorStop: "100%" }],
                [{ color: "#F2CA92", colorStop: "0%" }, { color: "#DAAC6F", colorStop: "100%" }],
                [{ color: "#F6DDB3", colorStop: "0%" }, { color: "#DABE8F", colorStop: "100%" }],
                [{ color: "#F8E5C9", colorStop: "0%" }], [{ color: "#DDBE92", colorStop: "100%" }]],
                borderColors: ["#7F602F", "#986827", "#A16C1F", "#BF812A", "#E49519", "#E7992A", "#EDB463", "#F2CA92", "#F6DDB3", "#F8E5C9"]

            }
    };

    ej.EjSvgRender.themes = {
        flatlight:
            {
                highlightColor: 'black',

                background: 'transparent',
                legend:
                    {
                        font: { color: "#282828" },
                        title:
                            {
                                font: { color: "#282828" }
                            }
                    },
                title:
                    {
                        font: { color: '#565656' },
                        subTitle:
                            {
                                font: { color: '#565656' }
                            }
                    },
                primaryXAxis:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder:
                            {
                                color: "#8E8E8E"
                            },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#282828",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#282828' },
                        title:
                            {
                                font: { color: '#282828' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, border: { color: '#3D3D3D', width: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                secondaryX:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder:
                            {
                                color: "#8E8E8E"
                            },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#282828",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#282828' },
                        title:
                            {
                                font: { color: '#282828' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, border: { color: '#3D3D3D', width: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },

                primaryYAxis:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder: {
                            color: "#8E8E8E"
                        },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#282828",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#282828' },
                        title:
                            {
                                font: { color: '#282828' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, border: { color: '#3D3D3D', borderWidth: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                secondaryY:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder: {
                            color: "#8E8E8E"
                        },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#282828",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#282828' },
                        title:
                            {
                                font: { color: '#282828' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, border: { color: '#3D3D3D', width: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                commonSeriesOptions:
                    {
                        marker: {
                            dataLabel: { font: { color: '#565656' } }
                        },
                        errorBar: {
                            fill: "#000000",
                            cap:
                                {
                                    fill: "#000000"
                                }
                        },
                        connectorLine: { color: '#565656' }
                    },
                crosshair:
                    {
                        line:
                            {
                                width: 1,
                                color: 'Black'
                            }
                    },

                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.defaultMetro,
                colors: ej.EjSvgRender.seriesPalette.defaultMetro

            },

        flatdark:
            {
                highlightColor: 'white',

                background: '#111111',

                legend:
                    {
                        font: { color: "#C9C9C9" },
                        title:
                            {
                                font: { color: "#C9C9C9" }
                            }
                    },
                title:
                    {
                        font: { color: '#C9C9C9' },
                        subTitle:
                            {
                                font: { color: '#C9C9C9' }
                            }
                    },
                primaryXAxis:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        labelBorder: {
                            color: "#AAAAAA"
                        },
                        multiLevelLabelsColor: "#AAAAAA",
                        multiLevelLabelsFontColor: "#C9C9C9",
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#C9C9C9' },
                        title:
                            {

                                font: { color: '#C9C9C9' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 1 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                secondaryX:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        labelBorder: {
                            color: "#AAAAAA"
                        },
                        multiLevelLabelsColor: "#AAAAAA",
                        multiLevelLabelsFontColor: "#C9C9C9",
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#C9C9C9' },
                        title:
                            {

                                font: { color: '#C9C9C9' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 1 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                primaryYAxis:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        labelBorder: {
                            color: "#AAAAAA"
                        },
                        multiLevelLabelsColor: "#AAAAAA",
                        multiLevelLabelsFontColor: "#C9C9C9",
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#C9C9C9' },
                        title:
                            {

                                font: { color: '#C9C9C9' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 1 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                secondaryY:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        labelBorder: {
                            color: "#AAAAAA"
                        },
                        multiLevelLabelsColor: "#AAAAAA",
                        multiLevelLabelsFontColor: "#C9C9C9",
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#C9C9C9' },
                        title:
                            {

                                font: { color: '#C9C9C9' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 1 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                commonSeriesOptions:
                    {
                        marker: {
                            dataLabel: { font: { color: '#C9C9C9' } }
                        },
                        errorBar: {
                            fill: "#ffffff",
                            cap:
                                {
                                    fill: "#ffffff"
                                }
                        },
                        connectorLine: { color: '#C9C9C9' }
                    },
                crosshair:
                    {
                        line:
                            {
                                width: 1,
                                color: 'White'
                            }
                    },

                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.defaultMetro,
                colors: ej.EjSvgRender.seriesPalette.defaultMetro

            },


        gradientlight:
            {
                highlightColor: 'black',

                background: 'transparent',
                legend:
                    {
                        font: { color: "#282828" },
                        title:
                            {
                                font: { color: "#282828" }
                            }
                    },
                title:
                    {
                        font: { color: '#565656' },
                        subTitle:
                            {
                                font: { color: '#565656' }
                            }
                    },
                primaryXAxis:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder: {
                            color: "#8E8E8E"
                        },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#282828",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#282828' },
                        title:
                            {

                                font: { color: '#282828' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#3D3D3D', border: { color: '#3D3D3D', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                secondaryX:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder: {
                            color: "#8E8E8E"
                        },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#282828",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#282828' },
                        title:
                            {

                                font: { color: '#282828' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#3D3D3D', border: { color: '#3D3D3D', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                primaryYAxis:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder: {
                            color: "#8E8E8E"
                        },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#282828",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#282828' },
                        title:
                            {

                                font: { color: '#282828' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#3D3D3D', border: { color: '#3D3D3D', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                secondaryY:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder: {
                            color: "#8E8E8E"
                        },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#282828",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#282828' },
                        title:
                            {

                                font: { color: '#282828' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#3D3D3D', border: { color: '#3D3D3D', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                commonSeriesOptions:
                    {
                        marker: {
                            dataLabel: { font: { color: '#565656' } }
                        },
                        errorBar: {
                            fill: "#000000",
                            cap:
                                {
                                    fill: "#000000"
                                }
                        },
                        connectorLine: { color: '#565656' }
                    },
                crosshair:
                    {
                        line:
                            {
                                width: 1,
                                color: 'Black'
                            }
                    },

                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.defaultGradient.borderColors,
                colors: ej.EjSvgRender.seriesPalette.defaultGradient.seriesColors

            },

        gradientdark:
            {
                highlightColor: 'white',

                background: '#111111',
                legend:
                    {
                        font: { color: "#C9C9C9" },
                        title:
                            {
                                font: { color: "#C9C9C9" }
                            }
                    },
                title:
                    {
                        font: { color: '#C9C9C9' },
                        subTitle:
                            {
                                font: { color: '#C9C9C9' }
                            }
                    },
                primaryXAxis:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        labelBorder: {
                            color: "#AAAAAA"
                        },
                        multiLevelLabelsColor: "#AAAAAA",
                        multiLevelLabelsFontColor: "#C9C9C9",
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#C9C9C9' },
                        title:
                            {

                                font: { color: '#C9C9C9' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                secondaryX:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        labelBorder: {
                            color: "#AAAAAA"
                        },
                        multiLevelLabelsColor: "#AAAAAA",
                        multiLevelLabelsFontColor: "#C9C9C9",
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#C9C9C9' },
                        title:
                            {

                                font: { color: '#C9C9C9' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                primaryYAxis:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        labelBorder: {
                            color: "#AAAAAA"
                        },
                        multiLevelLabelsColor: "#AAAAAA",
                        multiLevelLabelsFontColor: "#C9C9C9",
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#C9C9C9' },
                        title:
                            {

                                font: { color: '#C9C9C9' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                secondaryY:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        labelBorder: {
                            color: "#AAAAAA"
                        },
                        multiLevelLabelsColor: "#AAAAAA",
                        multiLevelLabelsFontColor: "#C9C9C9",
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#C9C9C9' },
                        title:
                            {

                                font: { color: '#C9C9C9' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                commonSeriesOptions:
                    {
                        marker: {
                            dataLabel: { font: { color: '#C9C9C9' } }
                        },
                        errorBar: {
                            fill: "#ffffff",
                            cap:
                                {
                                    fill: "#ffffff"
                                }
                        },
                        connectorLine: { color: "#C9C9C9" }
                    },

                crosshair:
                    {
                        line:
                            {
                                width: 1,
                                color: 'White'
                            }
                    },

                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.defaultGradient.borderColors,
                colors: ej.EjSvgRender.seriesPalette.defaultGradient.seriesColors

            },

        highcontrast01:
            {
                highlightColor: 'white',

                background: '#111111',
                legend:
                    {
                        font: { color: '#ffffff' },
                        title:
                            {
                                font: { color: '#ffffff' }
                            }
                    },
                title:
                    {
                        font: { color: '#ffffff' },
                        subTitle:
                            {
                                font: { color: '#ffffff' }
                            }
                    },
                primaryXAxis:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        labelBorder: {
                            color: "#AAAAAA"
                        },
                        multiLevelLabelsColor: "#AAAAAA",
                        multiLevelLabelsFontColor: "#ffffff",
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#ffffff' },
                        title:
                            {

                                font: { color: '#ffffff' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                secondaryX:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#ffffff' },
                        title:
                            {

                                font: { color: '#ffffff' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                primaryYAxis:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        labelBorder: {
                            color: "#AAAAAA"
                        },
                        multiLevelLabelsColor: "#AAAAAA",
                        multiLevelLabelsFontColor: "#ffffff",
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#ffffff' },
                        title:
                            {

                                font: { color: '#ffffff' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                secondaryY:
                    {
                        majorGridLines:
                            {
                                color: "#333333"
                            },
                        majorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        minorGridLines:
                            {
                                color: "#333333"
                            },
                        minorTickLines:
                            {
                                color: "#AAAAAA"
                            },
                        axisLine: { color: '#AAAAAA' },
                        font: { color: '#ffffff' },
                        title:
                            {

                                font: { color: '#ffffff' }
                            },
                        crosshairLabel: { rx: 3, ry: 3, fill: '#B5B5B5', border: { color: '#B5B5B5', width: 2 }, font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#444444' } }
                    },
                commonSeriesOptions:
                    {
                        marker: {
                            dataLabel: { font: { color: '#ffffff' } }
                        },
                        errorBar: {
                            fill: "#ffffff",
                            cap:
                                {
                                    fill: "#ffffff"
                                }
                        },
                        connectorLine: { color: "#C9C9C9" }
                    },

                crosshair:
                    {
                        line:
                            {
                                width: 1,
                                color: 'White'
                            }
                    },

                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.defaultHighContrast,
                colors: ej.EjSvgRender.seriesPalette.defaultHighContrast

            },
        material:
            {
                highlightColor: 'black',

                background: 'transparent',
                legend:
                    {
                        font: { color: "#333333" },
                        title:
                            {
                                font: { color: "#333333" }
                            }
                    },
                title:
                    {
                        font: { color: '#333333' },
                        subTitle:
                            {
                                font: { color: '#333333' }
                            }
                    },
                primaryXAxis:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder:
                            {
                                color: "#8E8E8E"
                            },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#333333",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#333333' },
                        title:
                            {
                                font: { color: '#333333' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, border: { color: '#3D3D3D', width: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                secondaryX:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#333333' },
                        title:
                            {
                                font: { color: '#333333' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, border: { color: '#3D3D3D', width: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },

                primaryYAxis:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder:
                            {
                                color: "#8E8E8E"
                            },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#333333",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#333333' },
                        title:
                            {
                                font: { color: '#333333' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, border: { color: '#3D3D3D', borderWidth: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                secondaryY:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#333333' },
                        title:
                            {
                                font: { color: '#333333' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, border: { color: '#3D3D3D', width: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                commonSeriesOptions:
                    {
                        marker: {
                            dataLabel: { font: { color: '#333333' } }
                        },
                        errorBar: {
                            fill: "#000000",
                            cap:
                                {
                                    fill: "#000000"
                                }
                        },
                        connectorLine: { color: '#565656' }
                    },
                crosshair:
                    {
                        line:
                            {
                                width: 1,
                                color: 'Black'
                            }
                    },

                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.defaultMaterial,
                colors: ej.EjSvgRender.seriesPalette.defaultMaterial

            },
        office365:
            {
                highlightColor: 'black',

                background: 'transparent',
                legend:
                    {
                        font: { color: "#333333" },
                        title:
                            {
                                font: { color: "#333333" }
                            }
                    },
                title:
                    {
                        font: { color: '#333333' },
                        subTitle:
                            {
                                font: { color: '#333333' }
                            }
                    },
                primaryXAxis:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder:
                            {
                                color: "#8E8E8E"
                            },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#333333",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#333333' },
                        title:
                            {
                                font: { color: '#333333' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, border: { color: '#3D3D3D', width: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                secondaryX:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#333333' },
                        title:
                            {
                                font: { color: '#333333' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, border: { color: '#3D3D3D', width: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },

                primaryYAxis:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        labelBorder:
                            {
                                color: "#8E8E8E"
                            },
                        multiLevelLabelsColor: "#8E8E8E",
                        multiLevelLabelsFontColor: "#333333",
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#333333' },
                        title:
                            {
                                font: { color: '#333333' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, border: { color: '#3D3D3D', borderWidth: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                secondaryY:
                    {
                        majorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        majorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        minorGridLines:
                            {
                                color: "#DFDFDF"
                            },
                        minorTickLines:
                            {
                                color: "#8E8E8E"
                            },
                        axisLine: { color: '#8E8E8E' },
                        font: { color: '#333333' },
                        title:
                            {
                                font: { color: '#333333' }
                            },
                        crosshairLabel: { rx: 0, ry: 0, border: { color: '#3D3D3D', width: 1 }, fill: '#3D3D3D', font: { fontFamily: 'Segoe UI', fontStyle: 'Normal', size: '13px', fontWeight: 'regular', opacity: 1, color: '#DBDBDB' } }
                    },
                commonSeriesOptions:
                    {
                        marker: {
                            dataLabel: { font: { color: '#333333' } }
                        },
                        errorBar: {
                            fill: "#000000",
                            cap:
                                {
                                    fill: "#000000"
                                }
                        },
                        connectorLine: { color: '#565656' }
                    },
                crosshair:
                    {
                        line:
                            {
                                width: 1,
                                color: 'Black'
                            }
                    },

                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.defaultOffice,
                colors: ej.EjSvgRender.seriesPalette.defaultOffice

            }
    };
    $.extend(ej.EjSvgRender.themes, {

        "azure":
            {

                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.blueMetro,
                colors: ej.EjSvgRender.seriesPalette.blueMetro
            },

        "azuredark":
            {
                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.blueMetro,
                colors: ej.EjSvgRender.seriesPalette.blueMetro
            },
        "gradient-azure":
            {
                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.blueGradient.borderColors,
                colors: ej.EjSvgRender.seriesPalette.blueGradient.seriesColors
            },

        "gradient-azuredark":
            {
                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.blueGradient.borderColors,
                colors: ej.EjSvgRender.seriesPalette.blueGradient.seriesColors
            },

        "lime":
            {
                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.greenMetro,
                colors: ej.EjSvgRender.seriesPalette.greenMetro
            },

        "limedark":
            {
                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.greenMetro,
                colors: ej.EjSvgRender.seriesPalette.greenMetro
            },
        "gradient-lime":
            {
                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.greenGradient.borderColors,
                colors: ej.EjSvgRender.seriesPalette.greenGradient.seriesColors
            },

        "gradient-limedark":
            {
                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.greenGradient.borderColors,
                colors: ej.EjSvgRender.seriesPalette.greenGradient.seriesColors
            },
        "saffron":
            {
                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.sandleMetro,
                colors: ej.EjSvgRender.seriesPalette.sandleMetro
            },

        "saffrondark":
            {
                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.sandleMetro,
                colors: ej.EjSvgRender.seriesPalette.sandleMetro
            },
        "gradient-saffron":
            {
                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.sandleGradient.borderColors,
                colors: ej.EjSvgRender.seriesPalette.sandleGradient.seriesColors
            },

        "gradient-saffrondark":
            {
                seriesBorderDefaultColors: ej.EjSvgRender.seriesPalette.sandleGradient.borderColors,
                colors: ej.EjSvgRender.seriesPalette.sandleGradient.seriesColors
            }
    });
})(jQuery);;

});