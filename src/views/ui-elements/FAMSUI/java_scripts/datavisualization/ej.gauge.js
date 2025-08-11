/*!
*  filename: ej.gauge.js
*  version : 18.1.0.42
*  Copyright Syncfusion Inc. 2001 - 2020. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
*/
(function (fn) {
    typeof define === 'function' && define.amd ? define(["./../common/ej.core"], fn) : fn();
})
(function () {
	
/**
* @fileOverview Plugin for Circular Gauge
* @copyright Copyright Syncfusion Inc. 2001 - 2020. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
* @version 11.2 
* @author <a href="mailto:licensing@syncfusion.com">Syncfusion Inc</a>
*/

/*global window, navigator, clearTimeout, setTimeout, document, jQuery, Syncfusion, self */
/*global requestAnimationFrame, Image, atob, ArrayBuffer, Uint8Array, Blob, URL */
(function ($, ej, undefined) {

    var _gaugeCount, initialGaugeCount, initialDivWidth;
    ej.widget({ "ejCircularGauge": "ej.datavisualization.CircularGauge"    }, {
        _rootCSS: "e-circulargauge",
        validTags: ["div", "span"],
        _savedPoints: [],
        _labelRadius:0,
        _customLblMaxSize: 0,
      
        defaults:   {

            exportSettings:{
                mode: 'client',
                type: 'png',
                fileName: 'CircularGauge',
                action: ''
            },
		
			locale: null,
			
			enableGroupSeparator: false,
              
            value: 0,
              
            minimum: 0,
              
            maximum: 100,
              
            radius: 180,
              
            width: 360,   
              
            height: 360,   
              
            frame: {
                  
                frameType: "fullcircle",   
                  
                backgroundImageUrl: null,
                  
                halfCircleFrameStartAngle: 180,
                  
                halfCircleFrameEndAngle: 360
            },
              
            backgroundColor: null,
              
            interiorGradient: null,   
              
            readOnly: true,
              
            enableAnimation: true,
              
            animationSpeed: 500,
              
            theme: "flatlight",
              
            isRadialGradient: false,
              
            enableResize: false,
              
            isResponsive: false,
              
            tooltip: {
                  
                showLabelTooltip: false,
                  
                showCustomLabelTooltip: false,
                  
                templateID: null,
            },
              
            outerCustomLabelPosition: "bottom",
              
            gaugePosition: "center",  
              
            distanceFromCorner: 20,  
              
            rangeZOrder :"rear",            
               
            drawTicks: null,
              
            drawLabels: null,
              
            drawPointers: null,
              
            drawRange: null,
              
            drawCustomLabel: null,
              
            drawIndicators: null,
              
            drawPointerCap: null,
              
            load: null,

            doubleClick: '',

            rightClick: '',
              
            renderComplete: null,
              
            mouseClick: null,
              
            mouseClickMove: null,
              
            mouseClickUp: null,

            legendItemRender: null,

            legendItemClick: null,

            rangeMouseMove:null,

            scales: null,

            legend:{

                visible: false,

                toggleVisibility: true,

                border:
                {

                    color: 'transparent',


                    width: 1
                },


                itemPadding: 20,

                shape: 'circle',

                alignment: 'center',

                position: 'bottom',

                itemStyle:
               {
                   height: 9,

                   width: 9,

                   border:
                   {

                       color: 'transparent',

                       width: 1
                   }
               },

                opacity: 1,

                fill: null,


                font:
                {
                    color: null,

                    fontFamily: 'Segoe UI',

                    fontStyle: 'Normal',

                    fontWeight: 'Regular',

                    size: '12px'
                },

                size:
                    {

                        height: null,

                        width: null
                    }

            },

			 themeProperties: {
                flatlight: {
                    backgroundColor: "#FFFFFF",
                    scales: {
                        pointerCap: {
                            borderColor: "#424242",
                            backgroundColor: "#424242"
                        },
                        backgroundColor: "#777777",
                        border: {
                            color: "#777777"
                        },
                        pointers: {
                            backgroundColor: "#424242",
                            border: {
                                color: "#424242"
                            },
                        },
                        ticks: {
                            color: "#777777"
                        },
                        labels: {
                            color: "#282828"
                        }
                    }
                },

                flatdark: {
                    backgroundColor: "#1F1F1F",
                    scales: {
                        pointerCap: {
                            borderColor: "#686868",
                            backgroundColor: "#686868"
                        },
                        backgroundColor: "#7a7a7a",
                        border: {
                            color: "#7a7a7a"
                        },
                        pointers: {
                            backgroundColor: "#686868",
                            border: {
                                color: "#686868"
                            },
                        },
                        ticks: {
                            color: "#7a7a7a"
                        },
                        labels: {
                            color: "#d3d3d3"
                        }
                    }
                }

            }
        },
          

        _defaultScaleValues: function () {
            return {
                  
                size: 6,
                  
                pointerCap: {
                      
                    radius: 7,
                      
                    borderWidth: 3,
                      
                    interiorGradient: null,   
                      
                    borderColor: null,
                      
                    backgroundColor:null
                },
                  
                showScaleBar: false,
                  
                sweepAngle: 310,
                  
                radius: 170,
                  
                startAngle: 115,
                  
                majorIntervalValue: 10,
                  
                minorIntervalValue: 2,
                  
                maximum: null,
                  
                minimum: null,
                  
                border: {
                      
                    color: null,
                      
                    width:1.5
                },
                  
                backgroundColor: null,
                  
                direction: "clockwise",   
                  
                showPointers: true,
                  
                showRanges: false,
                  
                showTicks: true,
                  
                showLabels: true,
                  
                showIndicators: false,
				  
                opacity:1,
				  
				shadowOffset:0,                  

				customLabels:[{ 
				
					value: null,
					
					color: null,
					
					textAngle: 0,
					
					positionType: "inner",
					
					position: {
					
						x: 0,
						
						y: 0
					},
					
					font: {
						
						size: "11px",
						
						fontFamily: "arial",
						
						fontStyle: "bold"
					}
				}],
                  
                pointers: [{
                      
                    distanceFromScale: 0,
                      
                    showBackNeedle: false,
                      
                    backNeedleLength: 10,
                      
                    length: 150,
                      
                    placement: "near",   
                      
                    width: 7,
                      
                    opacity: 1,
                    
                      
                    value: null,
                      
                    border: {
                          
                        color: null,
                          
                        width: 1.5
                    },
                      
                    backgroundColor: null,
                      
                    gradients: null,   
                      
                    type: "needle",   
                      
                    needleType: "triangle",   
                      
                    markerType: "rectangle",  
                      
                    imageUrl: "",
                      
                    pointerValueText: {
                          
                        showValue: false,
                          
                        distance: 20,
                          
                        font: {
                              
                            size: "11px",
                              
                            fontFamily: "Arial",
                              
                            fontStyle: "Bold"
                        },
                          
                        color: "#8c8c8c",
                          
                        opacity: 1,
                          
                        autoAngle: false,
                          
                        angle: 0,
                    }
                }],
                  
                ranges: [{

                    legendText: null,
                      
                    distanceFromScale: 25,
                      
                    size: 5,
                      
                    placement: "near",   
                      
                    startValue: null,
                      
                    endValue: null,
                      
                    startWidth: null,
                      
                    endWidth: null,
                      
                    gradients: null,   
                    
                      
                    opacity: null,
                      
                    backgroundColor: "#32b3c6",
                      
                    border: {
                          
                        color: "#32b3c6",
                          
                        width:1.5
                    }
                }],
                  
                ticks: [{
                      
                    angle: 0,
                      
                    distanceFromScale: 0,
                      
                    color:null,
                      
                    type: "major",   
                      
                    placement: "near",   
                      
                    height: 16,
                      
                    width: 3
                }, {
                    angle: 0,
                    distanceFromScale: 0,
                    color:null,
                    type: "minor",   
                    placement: "near",   
                    height: 7,
                    width: 1
                }],
                  
                labels: [{
                      
                    angle: 0,
                      
                    autoAngle:false,
                      
                    opacity: null,
                      
                    font: {
                     
                        size: "11px",
                    
                        fontFamily: "Arial",
                    
                        fontStyle: "Bold"
                    },
                      
                    color: null,
                      
                    distanceFromScale: 0,
                      
                    includeFirstValue: true,
                      
                    placement: "near",   
                      
                    type: "major",  
                      
                    unitText: "",
                      
                    unitTextPosition: "back",  

                }],
                  
                indicators: [{
                      
                    height: 15,
                      
                    width: 15,
                      
                    type: "circle",   
                      
                    imageUrl: null,
                      
                    position: {
                          
                        x: 0,
                          
                        y: 0
                    },
                      
                    stateRanges: [{
                          
                        endValue: 0,
                          
                        startValue: 0,
                          
                        backgroundColor: null,
                          
                        borderColor: null,
                          
                        text: "",
                          
                        textColor: null,
                          
                        font: null
                    }]
                }],                  
                  
                subGauges: [{
                      
                    height: 150,
                      
                    width: 150,
                      
                    position: {
                          
                        x: 0,
                          
                        y: 0
                    }
                }],
                //textAngle ,value:"CustomText", position:{X:5,Y:10}, color, font: { size: "11px", fontFamily: "Arial", fontStyle: "Bold" },
            };
        },
        dataTypes: {
            scales: "data",
            isResponsive: "boolean",
        },
        observables: ["value", "minimum", "maximum"],
        _tags: [{
            tag: "scales",
            attr: ["showScaleBar", "pointerCap.radius", "pointerCap.borderWidth", "pointerCap.interiorGradient", "pointerCap.borderColor", "pointerCap.backgroundColor", "sweepAngle", "startAngle", "showPointers", "showTicks", "backgroundColor", "scaleRadius", "majorIntervalValue", "minorIntervalValue", "shadowOffset", "showRanges", "showLabels", "showCustomLabels", "showIndicators", "border.width", "border.color",
                [{
                    tag: "pointers", attr: ["distanceFromScale", "showBackNeedle", "backNeedleLength", "backgroundColor", "needleType", "markerType", "border.width", "border.color", "imageUrl", "pointerValueText.showValue", "pointerValueText.distance", "pointerValueText.font.size", "pointerValueText.font.fontFamily", "pointerValueText.font.fontStyle", "pointerValueText.angle", "pointerValueText.autoAngle", "pointerValueText.color", "pointerValueText.opacity"]
                }, {
                    tag: "labels", attr: ["autoAngle", "distanceFromScale", "includeFirstValue", "unitText", "unitTextPosition", "font.size", "font.fontFamily", "font.fontStyle"]
                }, {
                    tag: "ticks", attr: ["distanceFromScale"]
                }, {
                    tag: "ranges", attr: ["legendText", "distanceFromScale", "startValue", "endValue", "startWidth", "endWidth", "backgroundColor", "border.color", "border.width"]
                }, {
                    tag: "indicators", attr: ["imageUrl", "position.x", "position.y",
                        [{
                            tag: "stateRanges", attr: ["endValue", "startValue", "backgroundColor", "borderColor", "textColor"]
                        }]
                    ]
                }, {
                    tag: "subGauges", attr: ["controlID", "position.x", "position.y"]
                }, {
                    tag: "customLabels", attr: ["positionType", "textAngle", "position.x", "position.y", "font.size", "font.fontFamily", "font.fontStyle"]
                }]
            ]
        }],
        value: ej.util.valueFunction("value"),
        minimum: ej.util.valueFunction("minimum"),
        maximum: ej.util.valueFunction("maximum"),
 
        _setModel: function (options) {
            var option;
            for (option in options) {
                switch (option) {
                    case "height": this.model.height = options[option]; break;
                    case "width": this.model.width = options[option]; break;
                    case "radius": this.model.radius = options[option]; break;
                    case "frame": $.extend(this.model.frame, options[option]); break;
                    case "tooltip": $.extend(this.model.tooltip, options[option]); break;
                    case "backgroundColor": this.model.backgroundColor = options[option]; break;
                    case "interiorGradient": this.model.interiorGradient = options[option]; break;
                    case "readOnly": this.model.readOnly = options[option]; break;
                    case "theme": this.model.theme = options[option]; break;
                    case "isRadialGradient": this.model.isRadialGradient = options[option]; break;
                    case "outerCustomLabelPosition": this.model.outerCustomLabelPosition = options[option]; break;
                    case "gaugePosition": this.model.gaugePosition = options[option]; break;
                    case "distanceFromCorner": this.model.distanceFromCorner = options[option]; break;
                    case "rangeZOrder ": this.model.rangeZOrder  = options[option]; break;
                    case "value":
                        (this.value() == "") && this.value(0);
                        for (var i = 0; this.model.scales[i] != null; i++) {
                            for (var j = 0; this.model.scales[i].pointers[j] != null; j++) {
                                this.model.scales[i].pointers[j].value = parseFloat(this.value());
                            }
                        }
                        break;
                    case "minimum":
                        (this.minimum() == "") && this.minimum(0);
                        for (var k = 0; this.model.scales[k] != null; k++) {
                            this.model.scales[k].minimum = parseInt(this.minimum());
                        }
                        break;
                    case "maximum":
                        (this.maximum() == "") && this.maximum(100);
                        for (var l = 0; this.model.scales[l] != null; l++) {
                            this.model.scales[l].maximum = parseInt(this.maximum());
                        }
                        break;
                    case "scales":
                        $.extend(true, this.model.scales, options[option]);
                        break;
                }
            }
            this._init();
        },

      
        _destroy: function () {
            this._unWireEvents();
            this.element.empty().removeClass("e-circulargauge e-js e-widget");
        },


        // constructor function
		  
        _init: function () {
            _gaugeCount = $(".e-circulargauge").length;
            initialGaugeCount = _gaugeCount;
            //this._isHalfCircle = false;
            this._scaleRedrawn = false;
            this._scalesInitialize();
            this._trigger("load");
            this._setTheme();
            this._initialize();
			if(this.model.frame.backgroundImageUrl)
               this.initialize();
            this._wireEvents();
            this._onWindowResize();
        },
	 
        _onWindowResize: function () {
            if (this.model.enableResize || this.model.isResponsive) {
                if (!ej.isTouchDevice())
                    this._on($(window), "resize", this.resizeCanvas);
                else
                    this._on($(window), "orientationchange", this.resizeCanvas);
            }
        },
		 
        _initialize: function () {
			//Checks whether canvas animation is supported if the device is android
			this._androidAnimation = this.isAndroid() && ej.datavisualization.CircularGauge.animationPolyfill;			
            this._initObject(this);
            this._drawOuterLayer();
            if (this.model.legend.visible && this.model.legend._legendItemHeight > 0 && this.model.legend._legendItemWidth > 0) {
                this._drawLegend();
                this._legendDrawn = true;
            }
            this._drawScales();         
            if (this.model.renderComplete)
                this._onRenderComplete();
        },

        _drawLegend:function(){
            var legendObj = this.model.legend, legendActualBounds, element = this.GaugeEl, padding = 10, legendSpacing = 20,
                position = this.model.legend.position.toLowerCase(), alignment = this.model.legend.alignment.toLowerCase(),
                legendOptions, borderWidth = this.model.legend.border.width, width = this.model.width, height = this.model.height;
            legendActualBounds = this.model.legendActualBounds;
            if(position == "top" || position == "bottom"){
                legendActualBounds.y = (position == "top") ? borderWidth + legendSpacing : (height - legendActualBounds.Height);
                if (alignment == "center")
                    legendActualBounds.x = (width / 2) - (legendActualBounds.Width / 2);
                else if (alignment == "near")
                    legendActualBounds.x = borderWidth + legendSpacing;
                else
                    legendActualBounds.x = (width - legendActualBounds.Width) - legendSpacing;
                legendActualBounds.x = ((legendActualBounds.x + legendActualBounds.Width) > width) ? (legendActualBounds.x - Math.abs((legendActualBounds.x + legendActualBounds.Width) - width)) : legendActualBounds.x;
            }
            else{
                legendActualBounds.x = (position == "left") ? borderWidth : (width - legendActualBounds.Width);
                 if (alignment == "center")
                     legendActualBounds.y = (height / 2) - (legendActualBounds.Height / 2);
                 else if (alignment == "near")
                     legendActualBounds.y = borderWidth + legendSpacing;
                 else
                     legendActualBounds.y = (height - legendActualBounds.Height) - legendSpacing;
                 legendActualBounds.y = ((legendActualBounds.y + legendActualBounds.Height) > height) ? (legendActualBounds.y - Math.abs((legendActualBounds.y + legendActualBounds.Height) - height)) : legendActualBounds.y;
            }
            this._legendBounds = legendActualBounds;
            this.contextEl.lineWidth = borderWidth;
            this.contextEl.save();
            this.contextEl.strokeStyle = this.model.legend.border.color;
            this.contextEl.strokeRect(legendActualBounds.x, legendActualBounds.y, legendActualBounds.Width, legendActualBounds.Height);
            this.contextEl.restore();
            this.model._legendCollection = [];
            for (var i = 0; i < this.model.scales.length; i++) {
                var scale = this.model.scales[i];
                for (var j = 0; j < scale.ranges.length; j++) {
                    var range = scale.ranges[j], currentLegend = {}, itemPadding = 10, legendItemSize;
                    range._visible = (ej.util.isNullOrUndefined(range._visible)) ? true : range._visible;
                    if (!(ej.util.isNullOrUndefined(range.legendText))) {
                        legendItemSize = this._getLegendSize(range, itemPadding);
                        legendOptions = {
                            "Bounds": { Height: legendItemSize.Height, Width: legendItemSize.Width },
                            "legendStyle": { font: legendObj.font, opacity: legendObj.opacity, BorderColor: legendObj.itemStyle.border.color, BorderWidth: legendObj.itemStyle.border.width },
                            "displayText": range.legendText,
                            "fill": (ej.util.isNullOrUndefined(legendObj.fill)) ? range.backgroundColor : legendObj.fill,
                            "ScaleIndex": i,
                            "RangeIndex": j,
                            "visible": range._visible
                        };
                        this.model._legendCollection.push(legendOptions);
                    }
                }
            }
            this._drawLegendItem(legendActualBounds);   
        },

        legendMouseClick: function (evt) {
            var parentLeft, parentTop, element, canvasLeft, canvasTop, offsetLeft, offsetTop, i,
                region, legendX, legendWidth, legendY, legendHeight, args, visible;
            var mouseMoveCords = this.calMousePosition(evt);
            if (this.model.legend.toggleVisibility) {
                for (i = 0; i < this.legendRegion.length; i++) {
                    region = this.legendRegion[i];
                    legendX = region.X
                    legendWidth = region.X + region.Width;
                    legendY = region.Y;
                    legendHeight = region.Y + region.Height;
                    if ((mouseMoveCords.X >= legendX && mouseMoveCords.X <= legendWidth) && (mouseMoveCords.Y >= legendY && mouseMoveCords.Y <= legendHeight)) {
                        args = { type: "legendItemClick", cancel: false, data: region, model: this.model };
                        this._trigger("legendItemClick", args);
                        visible = (this.model.scales[region.item.ScaleIndex].ranges[region.item.RangeIndex]._visible) ? false : true;
                        this.setRangeVisible(region.item.ScaleIndex, region.item.RangeIndex, visible);
                    }
                }
            }
                
        },

        calMousePosition: function (e) {
            var matched = jQuery.uaMatch(navigator.userAgent), element, mouseX, mouseY, browser, node, i;
            element = this.GaugeEl[0];
            node = element.querySelector("canvas");
            browser = matched.browser.toLowerCase();
            mouseX = (e.pageX) - $(node).offset().left;
            mouseY = (e.pageY) - $(node).offset().top;
            return { X: mouseX, Y:mouseY };
        },

        rangesMouseMove: function (evt) {
              var gauge = this, args,element, parentLeft, parentTop, canvasLeft, canvasTop, offsetLeft, offsetTop, i, region, legendX,
                        legendWidth, legendY, legendHeight, element, rectBounds, xOffset, yOffset, mouseX, mouseY, pointData,
                        startAngle, endAngle, gaugeStartAngle, j, distanceFromCenter, rangeRegion;
               var mouseMoveCords = this.calMousePosition(evt);
               if (this.model.legend.toggleVisibility && this._legendDrawn) {
                    for (i = 0; i < this.legendRegion.length; i++) {
                       region = this.legendRegion[i];
                       legendX = region.X;
                       legendWidth = region.X + region.Width;
                       legendY = region.Y;
                       legendHeight = region.Y + region.Height;
                       if ((mouseMoveCords.X >= legendX && mouseMoveCords.X <= legendWidth) && (mouseMoveCords.Y >= legendY && mouseMoveCords.Y <= legendHeight)) {
                           $(this.GaugeEl[0]).css("cursor", "pointer");
                           break;
                       }
                       else
                           $(this.GaugeEl[0]).css("cursor", "default");
                }
             }
             mouseX = mouseMoveCords.X;
             mouseY = mouseMoveCords.Y;
             pointData = [];
             startAngle = this.model.scales[0].startAngle;
             endAngle = this.model.scales[0].sweepAngle;
             gaugeStartAngle = startAngle * (Math.PI / 180);
             for (j = 0; j < this._rangeCollectionRegions.length; j++) {
                 var region = this._rangeCollectionRegions[j], fromCenterX, fromCenterY, innerRadius, totalDegree, circularStartAngle, arcAngle, clickAngle, pointStartAngle, pointEndAngle;
                 fromCenterX = mouseX - region.centerRadius.centerX;
                 fromCenterY = mouseY - region.centerRadius.centerY;
                 innerRadius = region.Radius.endRadius ? region.Radius.endRadius : 0;
                 startAngle = startAngle < 0 ? startAngle + 360 : startAngle;
                 endAngle = endAngle < 0 ? endAngle + 360 : endAngle;
                 totalDegree = endAngle - startAngle;
                 circularStartAngle = (-.5 * Math.PI) + gaugeStartAngle;
                 if (totalDegree < 0) {
                     endAngle = endAngle / 360;
                    arcAngle = (endAngle) ? 2 * Math.PI * (endAngle < 0 ? 1 + endAngle : endAngle) : 0;
                    clickAngle = (Math.atan2(fromCenterY, fromCenterX) - circularStartAngle - arcAngle) % (2 * Math.PI);
                     if (clickAngle < 0)
                         clickAngle = 2 * Math.PI + clickAngle;
                     pointStartAngle = Math.PI * (region.Region.startAngle / 180);
                     pointEndAngle = Math.PI * (region.Region.endAngle / 180);

                     if (clickAngle <= pointStartAngle && clickAngle >= pointEndAngle) {
                         distanceFromCenter = Math.sqrt(Math.pow(Math.abs(fromCenterX), 2) + Math.pow(Math.abs(fromCenterY), 2));
                         if (distanceFromCenter <= region.Radius.startRadius && distanceFromCenter > region.Radius.endRadius) {
                             args = { type: "rangeMouseMove", cancel: false, data: region, model: this.model };
                             this._trigger("rangeMouseMove", args);
                             break;
                         }
                     }
                 }
                 else {
                     clickAngle = (Math.atan2(fromCenterY, fromCenterX)) % (2 * Math.PI);
                     if (clickAngle < 0)
                         clickAngle = 2 * Math.PI + clickAngle;
                     if (region.Region.endAngle < region.Region.startAngle) {
                         pointStartAngle = (fromCenterX > 0 && fromCenterY > 0) ? 0 : Math.PI * ((region.Region.startAngle) / 180);
                         pointEndAngle = (fromCenterX > 0 && fromCenterY > 0) ? Math.PI * ((region.Region.endAngle) / 180) : Math.PI * ((360 + region.Region.endAngle) / 180);
                     }
                     else {
                         pointStartAngle = Math.PI * ((region.Region.startAngle) / 180);
                         pointEndAngle = Math.PI * ((region.Region.endAngle) / 180);
                     }
                     if (clickAngle >= pointStartAngle && clickAngle <= pointEndAngle) {
                             distanceFromCenter = Math.sqrt(Math.pow(Math.abs(fromCenterX), 2) + Math.pow(Math.abs(fromCenterY), 2));
                             if (distanceFromCenter <= region.Radius.startRadius && distanceFromCenter > region.Radius.endRadius) {
                                 rangeRegion = region;
                                 args = { type: "rangeMouseMove", cancel: false, data: region, model: this.model };
                                 this._trigger("rangeMouseMove", args);
                                 break;
                             }                       
                     }
                 }
             }
             return rangeRegion;
    },

    _cgDoubleClick: function(e){
        if(this.model.doubleClick != '')
            this._trigger("doubleClick", {data:{event: e}});
    },

    _cgRightClick: function(e){
        if(this.model.rightClick != '')
            this._trigger("rightClick", {data:{event: e}});
    },

        _drawLegendItem: function (legendBounds) {
            var legendItemCollections = [], legendTextCollection = [], args;
            this.legendRegion = [];
            this.model.legend._legendTextMaxHeight = 0; this.model.legend._legendTextMaxWidth = 0;
            var position = this.model.legend.position.toLowerCase();
            for (var i = 0; i < this.model._legendCollection.length; i++) {
                var shape = this.model.legend.shape.toLowerCase(), verPadding = 10, horPadding = 10, txtPadding = 3, itemX, itemY, textX, textY, yPos;
                var legendItem, rangeVisible, textStyle, fill, x, y, width, height, fontColor, font, textSize, shapeHeight, shapeWidth, shapeStyle, itemStyle,
                    shapeLocation, itemLocation, style, space= 10;
                legendItem = this.model._legendCollection[i];
                if (!(ej.util.isNullOrUndefined(legendItem.displayText))) {
                    args = { type: "legendItemRender", cancel: false, data: legendItem, model: this.model };
                    this._trigger("legendItemRender", args);
                    this.model.scales[legendItem.ScaleIndex].ranges[legendItem.RangeIndex]._visible = (ej.util.isNullOrUndefined(this.model.scales[legendItem.ScaleIndex].ranges[legendItem.RangeIndex]._visible)) ? true : this.model.scales[legendItem.ScaleIndex].ranges[legendItem.RangeIndex]._visible;
                    fill = (this.model.scales[legendItem.ScaleIndex].ranges[legendItem.RangeIndex]._visible) ? legendItem.fill : "#808080";
                    fontColor = (this.model.scales[legendItem.ScaleIndex].ranges[legendItem.RangeIndex]._visible) ? legendItem.legendStyle.font.color : "#808080";
                    font = this._getFontString(this, legendItem.legendStyle.font);
                    textSize = this.calcText(legendItem.displayText, legendBounds.Width, legendItem.legendStyle.font);
                    this.model.legend._legendTextMaxHeight = Math.max(textSize.height, this.model.legend._legendTextMaxHeight);
                    this.model.legend._legendTextMaxWidth = Math.max(textSize.width, this.model.legend._legendTextMaxWidth);
                    shapeHeight = this.model.legend.itemStyle.height;
                    shapeWidth = this.model.legend.itemStyle.width;
                    shapeStyle = (shapeHeight + shapeWidth) / 2;
                    itemStyle = {
                        "angle": 0,
                        "width": shapeStyle,
                        "isFill": true,
                        "isStroke": true,
                        "height": shapeStyle,
                        "lineWidth": this.model.legend.itemStyle.border.width,
                        "opacity": legendItem.legendStyle.opacity,
                        "strokeStyle": legendItem.legendStyle.BorderColor,
                        "fillStyle": fill,
                    };
                    verPadding = (shapeStyle > (textSize.height / 2)) ? verPadding + (shapeStyle / 2) : verPadding + textSize.height / 4;
                    horPadding = (shape == "circle") ? (horPadding + (shapeStyle / 2)) : horPadding;                  
                    if (i == 0) {
                       itemX = (horPadding + legendBounds.x);
                       itemY = (legendBounds.y + verPadding);
                    }
                    else {
                        if (position == "top" || position == "bottom") {
                            var xPos = (legendTextCollection[i - 1].x + legendTextCollection[i - 1].width) + (this.model.legend.itemPadding);
                            if ((xPos + shapeStyle + txtPadding + textSize.width) >= (legendBounds.x + legendBounds.Width)) {
                                itemX = (horPadding + legendBounds.x);
                                itemY = ((this.model.legend._legendTextMaxHeight / 2) > shapeStyle) ? (legendTextCollection[i - 1].y + (legendItemCollections[i - 1].actualBounds.height / 2) + shapeStyle / 2) + space : 
								space + legendItemCollections[i - 1].actualBounds.y + (legendItemCollections[i - 1].actualBounds.height / 2) + shapeStyle / 2;
                            }
                            else {
                                itemX = (shape.toLowerCase() == "circle") ? xPos + shapeStyle / 2 : xPos;
                                itemY = (legendItemCollections[i - 1].actualBounds.y);
                            }
                        }
                        else {
                            yPos = (legendTextCollection[i - 1].height > shapeStyle) ? (legendTextCollection[i - 1].y + this.model.legend.itemPadding) : (legendItemCollections[i - 1].actualBounds.y + shapeStyle) + this.model.legend.itemPadding;
                            var temp = (legendTextCollection[i - 1].height > shapeStyle) ? textSize.height : shapeStyle;
                            if ((yPos + temp - 2) > legendBounds.y + legendBounds.Height + 2) {
                                itemY = (legendBounds.y + verPadding);
                                itemX = (legendItemCollections[i - 1].actualBounds.x + legendItemCollections[i - 1].actualBounds.width) + (this.model.legend._legendTextMaxWidth + txtPadding) + 10;
                            }
                            else {
                                itemX = (legendItemCollections[i - 1].actualBounds.x);
                                itemY = yPos;
                            }
                        }
                    }
                    shapeLocation = { startX: itemX, startY: itemY };
                    shape = shape.charAt(0).toUpperCase() + shape.slice(1);
                    itemLocation = $.extend({}, shapeLocation, true);
                    itemLocation.startX = (shape.toLowerCase() == "circle") ? itemLocation.startX - (shapeStyle / 2) : itemLocation.startX;
                    itemLocation.startY = itemLocation.startY - (shapeStyle / 2);
                    legendItemCollections.push({ actualBounds: { x: shapeLocation.startX, y: shapeLocation.startY, height: shapeStyle, width: shapeStyle }, item: legendItem });
                    textStyle = {
                        "angle": 0,
                        "width": textSize.width,
                        "isFill": true,
                        "isStroke": true,
                        "height": textSize.height,
                        "textValue": legendItem.displayText,
                        "font": font,
                        "fillStyle": fontColor,
                        "opacity": legendItem.legendStyle.opacity,
                        "strokeStyle": legendItem.legendStyle.BorderColor,
                    };
                    textX = (shape.toLowerCase() == "circle") ? (shapeLocation.startX + (shapeWidth / 2) + txtPadding) : (shapeLocation.startX + itemStyle.width + txtPadding);
                    textY = shapeLocation.startY + (textSize.height / 4);
                    legendTextCollection.push({ x: textX, y: textY, height: textSize.height / 2, width: textSize.width });
                    x = itemLocation.startX;
                    width = (Math.abs((x + legendItemCollections[i].actualBounds.width) - x) + txtPadding) + (Math.abs((legendTextCollection[i].x + legendTextCollection[i].width) - legendTextCollection[i].x));
                    if ((shapeStyle) > (legendTextCollection[i].height)) {
                        y = itemLocation.startY;
                        height = shapeStyle;
                    }
                    else {
                        y = legendTextCollection[i].y - legendTextCollection[i].height;
                        height = legendTextCollection[i].height;
                    }   
                    if (shape.toLowerCase() == "circle") {
                        style = this._setPointerDimension(itemStyle, this);
                        this._contextOpenPath(style, this);
                        this._setContextRotation(style, this);
                        this.contextEl.arc(shapeLocation.startX, shapeLocation.startY, shapeStyle / 2, 0, 2 * Math.PI);
                        this._contextClosePath(style, this);
                    }
                    else
                        this["_draw" + shape](shapeLocation, itemStyle, this);
                    this._contextOpenPath(textStyle, this);
                    this.contextEl.font = textStyle.font;
                    this.contextEl.translate(textX, textY);
                    this.contextEl.fillText(textStyle.textValue, 0, 0);
                    this._contextClosePath(textStyle, this);
                    this.legendRegion.push({ X: x, Y: y, Width: width, Height: height, item: legendItem });
                }
            }
        },

        calcText: function (text, maxwidth, font) {
            var element = $(document).find("#measureTex");
            var textObj, style = null, size = null, family = null, weight = null, textArray, i, fontarray, bounds;
            $("#measureTex").css('display', 'block'); 
            if (element.length == 0) {
                textObj = document.createElement('text');
                $(textObj).attr({ 'id': 'measureTex' });
                document.body.appendChild(textObj);
            }
            else {
                textObj = element[0];
            }
            if (typeof (text) == "string" && (text.indexOf("<") > -1 || text.indexOf(">") > -1)) {
                textArray = text.split(" ");
                for (i = 0; i < textArray.length; i++) {
                    if (textArray[i].indexOf("<br/>") == -1)
                        textArray[i] = textArray[i].replace(/[<>]/g, '&');
                }
                text = textArray.join(' ');
            }
            textObj.innerHTML = text;
            if (font != undefined && font.size == undefined) {
                fontarray = font;
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
            bounds = { width: textObj.offsetWidth, height: textObj.offsetHeight };
            $("#measureTex").css('display', 'none');
            return bounds;
        },

         _calculateLegendBounds:function(){
            var self = this, legendObj;
            var legendObj = self.model.legend, rangeCount = 0, i, add, position = self.model.legend.position.toLowerCase(), legendSize,
            vericalPadding, horizontalPadding, additionalPadding = 20, space = 10, padd,
            borderWidth = self.model.legend.border.width, itemPadding = self.model.legend.itemPadding, overallMax, bounds, currentWidth, legendMax;
            overallMax = self.findMaxHeightWidth();
            if (this._gaugeResizeState || (ej.util.isNullOrUndefined(self.model.legend.size.height) && ej.util.isNullOrUndefined(self.model.legend.size.width))) {               
                legendMax = self.findLegendMax();
                bounds = { Height: legendMax.Height, Width: legendMax.Width };
                self.model.legend.size._height = self.model.legend.size._width = null;
            }
            else if ((parseInt(self.model.legend.size.width) < overallMax.width && !ej.util.isNullOrUndefined(self.model.legend.size.width)) 
			    || (parseInt(self.model.legend.size.height) < overallMax.height && !ej.util.isNullOrUndefined(self.model.legend.size.height))) {
                legendMax = self.findLegendMax();
                bounds = { Height: legendMax.Height, Width: legendMax.Width };
               self.model.legend.size._height = self.model.legend.size._width = null;
            }
        else {
            self.model.legend._legendItemHeight = 0; self.model.legend._columnWidth= 0, self.model.legend._legendItemWidth = 0, self.model.legend._rowCount = 1,
            self.model.legend._columnCount = 1, self.model.legend._maxWidth = 0, self.model.legend._maxHeight = 0, self._columnIncreasing = 0, self._columnDecreasing= 0;
                $.each(self.model.scales, function (index, element) {
                    if (element.showRanges) {
                        self.scaleIndex = index;
                        if (element.ranges != null) {
                            self.rangeEl = element.ranges;
                            self.index = 0;
                            for (i = 0; i < self.model.scales[self.scaleIndex].ranges.length ; i++) {
                                if (!(ej.util.isNullOrUndefined(self.model.scales[self.scaleIndex].ranges[i].legendText))) {
                                    rangeCount++;
                                }
                            }
                            $.each(element.ranges, function (rangeIndex, rangeElement) {
                                self.rangeIndex = rangeIndex;
                                if (!(ej.util.isNullOrUndefined(rangeElement.legendText)) && (rangeElement.legendText.replace(/\s/g,"").length > 0) && self.index < rangeCount) {
                                    legendSize = self._getLegendSize(rangeElement);
                                    if (parseInt(self.model.legend.size.width)) {
                                            horizontalPadding = (self.index == 0) ? (space + borderWidth) : (position == "top" || position == "bottom") ? itemPadding : space;
                                            vericalPadding = (self.index == 0) ? (space + borderWidth) : 0;
                                            legendObj._legendItemWidth =  (position == "top" || position == "bottom") ? (horizontalPadding + legendSize.Width + legendObj._legendItemWidth) : 
											                              (horizontalPadding + overallMax.width + legendObj._legendItemWidth);
                                            legendObj._legendItemHeight = vericalPadding + Math.max(legendSize.Height, legendObj._legendItemHeight);
                                            self._columnIncreasing++;
                                            self._columnDecreasing = Math.max(self._columnDecreasing, self._columnIncreasing);
                                            if (parseInt(self.model.legend.size.width) <= legendObj._legendItemWidth) {
                                                self.model.legend._rowCount++;
                                                self._columnIncreasing = 0;
                                                legendObj._legendItemHeight += (position == "top" || position == "bottom") ? (self.index == rangeCount - 1) ? (legendSize.Height + space * 2) : legendSize.Height + space :
                                                                               (self.index == rangeCount - 1) ? (legendSize.Height + space + itemPadding) : (legendSize.Height + itemPadding);
                                                 legendObj._legendItemWidth = (position == "top" || position == "bottom") ? (self.index == rangeCount - 1) ? parseInt(self.model.legend.size.width) : 
												                               legendSize.Width + space : overallMax.width + space;
                                            } else if (self.index == rangeCount - 1 && self.model.legend._rowCount > 1) {
                                                legendObj._legendItemHeight += space;
                                                self.model.legend.size._width = self.model.legend.size.width;
                                                if (parseInt(self.model.legend.size.width) > (overallMax.width * (self._columnDecreasing - 1)) + ((self._columnDecreasing - 1) * space) + space) {
                                                    legendObj._legendItemWidth = (overallMax.width * (self._columnDecreasing - 1)) + ((self._columnDecreasing - 1) * space) + space;
                                                    self.model.legend.size._width = null;
                                                } 
                                            }
                                    }
                                    else {
                                        if (position == "left" || position == "right") {
                                            horizontalPadding = (self.index == 0) ? (space + borderWidth) : (self.index == rangeCount - 1) ? space : 0;
                                            vericalPadding = (self.index == 0) ? (space + borderWidth) : itemPadding;
                                            legendObj._legendItemWidth = horizontalPadding + Math.max(overallMax.width, legendObj._legendItemWidth);
                                            legendObj._legendItemHeight = (vericalPadding + legendSize.Height + legendObj._legendItemHeight);
											self.model.legend.size._height = parseInt(self.model.legend.size.height);
                                            if (parseInt(self.model.legend.size.height) < legendObj._legendItemHeight) {
                                                self.model.legend._rowCount++;
                                                legendObj._legendItemWidth += (self.index == rangeCount - 1) ? (overallMax.width + space * 2) : overallMax.width + space;
                                                legendObj._legendItemHeight = legendSize.Height + space;
                                            }
                                            else if (rangeCount == 1 && parseInt(self.model.legend.size.height) > legendObj._legendItemHeight){
                                                self.model.legend.size._height = null;
                                                legendObj._legendItemWidth += space;
                                                legendObj._legendItemHeight += space;
                                            }
                                        }
                                        else {
                                            legendMax = self.findLegendMax();
                                            bounds = { Height: legendMax.Height, Width: legendMax.Width };
                                            self.index = rangeCount - 1;
                                        }
                                    }
                                }
                                self.index++;
                            });
                        }
                    }
                });
                bounds = { Height: legendObj._legendItemHeight, Width: legendObj._legendItemWidth };
            }
            return bounds;
        },

       findLegendMax:function(){
            var self = this, legendObj;
            self.model.legend._legendItemHeight = 0; self.model.legend._rowWidth = 0; self.model.legend._legendItemWidth = 0, self.model.legend._rowCount = 1,
            self.model.legend._columnCount = 1, self.model.legend._maxWidth = 0, self.model.legend._maxHeight = 0;
            var legendObj = self.model.legend, rangeCount = 0, i, add, position = self.model.legend.position.toLowerCase(), legendSize,
            vericalPadding, horizontalPadding, additionalPadding = 20, space = 10, padd,
            borderWidth = self.model.legend.border.width, itemPadding = self.model.legend.itemPadding, currentWidth;
            self.model.legend.size._height = self.model.legend.size._width = null;
            $.each(self.model.scales, function (index, element) {
                if (element.showRanges) {
                    self.scaleIndex = index;
                    if (element.ranges != null) {
                        self.rangeEl = element.ranges;
                        self.index = 0;
                        for (i = 0; i < self.model.scales[self.scaleIndex].ranges.length ; i++) {
                            if (!(ej.util.isNullOrUndefined(self.model.scales[self.scaleIndex].ranges[i].legendText))) {
                                rangeCount++;
                            }
                        }
                        $.each(element.ranges, function (rangeIndex, rangeElement) {
                            self.rangeIndex = rangeIndex;
                            if (!(ej.util.isNullOrUndefined(rangeElement.legendText))) {  
                                legendSize = self._getLegendSize(rangeElement);
                                    if (position == "top" || position == "bottom") {
                                        if (rangeCount != 1) {
                                            horizontalPadding = (self.index == 0) ? (space * 2) + (borderWidth) : (self.index == rangeCount - 1) ? (space + itemPadding) : itemPadding;
                                            vericalPadding = (self.index == 0) ? space : (self.index == rangeCount - 1) ? space : 0;
                                        }
                                        else
                                            vericalPadding = horizontalPadding = (space * 2);
                                        legendObj._legendItemHeight = vericalPadding + Math.max(legendSize.Height, legendObj._legendItemHeight);
                                        legendObj._maxHeight = Math.max(legendSize.Height, legendObj._maxHeight);
                                        legendObj._legendItemWidth = (horizontalPadding + legendSize.Width + legendObj._legendItemWidth);
                                        padd = (self.model.legend._rowCount > 1 && self.index == rangeCount - 1) ? space : 0;
                                        if ((self.model.width - (additionalPadding - borderWidth)) <= legendObj._legendItemWidth - padd) {
                                            self.model.legend._rowCount++;
                                            legendObj._rowWidth = Math.max( legendObj._rowWidth,(legendObj._legendItemWidth - itemPadding - legendSize.Width));
                                            legendObj._legendItemWidth = (self.index == rangeCount - 1) ? (legendObj._rowWidth < (self.model.width - (additionalPadding * 2))) ? legendObj._rowWidth : (self.model.width - (additionalPadding * 2))   : 
											                             (self.index == 0) ? additionalPadding + space + (borderWidth) : legendSize.Width + additionalPadding + space + (borderWidth);
                                            legendObj._legendItemHeight += legendObj._maxHeight + (space + borderWidth);
                                        }
                                        else if ((self.index == rangeCount - 1) && self.model.legend._rowCount > 1)
                                            legendObj._legendItemWidth = (legendObj._rowWidth < (self.model.width - (additionalPadding * 2))) ? legendObj._rowWidth : (self.model.width - (additionalPadding * 2));
                                    }
                                    else {
                                        if (rangeCount != 1) {
                                            vericalPadding = (self.index == 0) ? (space + borderWidth) : (self.index == rangeCount - 1) ? (space + itemPadding) : itemPadding;
                                            horizontalPadding = (self.index == 0) ? space : (self.index == rangeCount - 1) ? space * 2 : 0;
                                        }
                                        else
                                            vericalPadding = horizontalPadding = (space * 2);

                                        legendObj._legendItemHeight = legendSize.Height + vericalPadding + legendObj._legendItemHeight;
                                        legendObj._legendItemWidth = horizontalPadding + Math.max(legendSize.Width, legendObj._legendItemWidth);
                                        legendObj._maxWidth = Math.max(legendSize.Width, legendObj._maxWidth);

                                        if ((self.model.height - additionalPadding) < legendObj._legendItemHeight) {
                                            self.model.legend._columnCount++;
                                            add = (self.model.legend._columnCount == 2) ? additionalPadding : 0;
                                            legendObj._legendItemHeight = (self.index == rangeCount - 1) ? (self.model.height - (additionalPadding * 2)) : legendSize.Height + additionalPadding + space + borderWidth + add;
                                            legendObj._legendItemWidth += legendObj._maxWidth + space;
                                        }
                                        else if ((self.index == rangeCount - 1) && self.model.legend._columnCount > 1) {
                                            legendObj._legendItemHeight = self.model.height - (additionalPadding * 2);
                                        }

                                    }
                                    self.index++;
							}
						});
					}
                 }
            });
            return { Height: legendObj._legendItemHeight, Width: legendObj._legendItemWidth };
	   },
	   
        findMaxHeightWidth: function () {
            var self = this, overallHeight = 0, overallWidth = 0, size;
            $.each(self.model.scales, function (index, element) {
                $.each(element.ranges, function (rangeIndex, rangeElement) {
                    size = self._getLegendSize(rangeElement);
                    overallHeight = Math.max(size.Height, overallHeight);
                    overallWidth = Math.max(size.Width, overallWidth);
                });
            });
            return { height: overallHeight, width: overallWidth };
        },

        _getLegendSize: function (range) {
            var eqaualPadding = 3, shapeStyle, textSize, itemHeight, itemWidth, font = this.model.legend.font;
            shapeStyle = (this.model.legend.itemStyle.width + this.model.legend.itemStyle.height) / 2;
            textSize = this.calcText(range.legendText, null, font);
            itemHeight = Math.max(shapeStyle, (textSize.height / 2));
            itemWidth = shapeStyle + eqaualPadding + textSize.width;
            return {Height:itemHeight,Width:itemWidth};
        },

        _scalesInitialize: function () {
            var proxy = this;
            if (this.model.scales != null) {
                $.each(this.model.scales, function (index, element) {
                    element = proxy._checkArrayObject(element, index);
                    var obj = proxy._defaultScaleValues();
                    $.extend(obj, element);
                    $.extend(element, obj);
                });
            }
            else {
                this.model.scales = [this._defaultScaleValues()];
            }
        },
		 
        _checkArrayObject: function (element, initialName) {
            var proxy = this;            
            var type;
            $.each(element, function (name, innerElement) {
                type = typeof name;
                if ((type != "string" || (type == "string" && name.indexOf('_') == -1 && name.indexOf('__') == -1)) && typeof innerElement != "function") {
                    if (innerElement instanceof Array) {
                        proxy._checkArrayObject(innerElement, name);
                    }
                    else if (innerElement != null && typeof innerElement == "object" && !innerElement.setter && !innerElement.factory && !innerElement.key) {
                        var allObjects = proxy._defaultScaleValues();
                        proxy._LoadIndividualDefaultValues(innerElement, allObjects, (typeof name === "number") ? initialName : name);
                    }
                }
            });
            return element;
        },
	 	
        _LoadIndividualDefaultValues: function (obj, allObjects, name) {
            var defaultObj = null;
            var proxy = this;
            var type;
            $.each(allObjects, function (n, element) {
                if (name == n) {
                    defaultObj = element;
                    return;
                }
            });
            if (defaultObj instanceof Array) defaultObj = defaultObj[0];
            type = typeof name;
            $.each(obj, function (objName, ele) {
                if (ele instanceof Array) {
                    proxy._checkArrayObject(ele, name);
                }
                else if (ele != null && typeof ele == "object" && (type != "string" || (type == "string" && name.indexOf('_') == -1 && name.indexOf('__') == -1))) {
                    proxy._LoadIndividualDefaultValues(ele, ele, (typeof objName === "number") ? name : objName);
                }
            });

            $.extend(defaultObj, obj);
            $.extend(obj, defaultObj);
            return obj;
        },
		
		initialize: function () {
           this._initObject(this);

            if (this.model.frame.backgroundImageUrl)
                this._drawCustomImage(this, this.model.frame.backgroundImageUrl);
            else {
                if (this.model.scales != null)
                    this._drawScales();
            }
        },
	 	
        _initObject: function (element) {
            this._savedPoints=[];
            this.element.addClass("e-widget");
            element.GaugeEl = this.element;
            if (element.canvasEl) {
                element.canvasEl.remove();
                element.GaugeEl.empty();
            }
            else
                element.canvasEl = $("<canvas></canvas>");
                var outerLabelCount=0;
            for (var i = 0; this.model.scales[i] != null; i++) {
                if (this.model.scales[i].minimum == null)
                    this.model.scales[i].minimum = this.minimum();
                if (this.model.scales[i].maximum == null)
                    this.model.scales[i].maximum = this.maximum();
                for (var j = 0; this.model.scales[i].pointers[j] != null; j++) {
                    if (this.model.scales[i].pointers[j].value == null)
                        this.model.scales[i].pointers[j].value = this.value();
                }
                for (var k = 0; this.model.scales[i].customLabels[k] != null; k++) {
                    if (this.model.scales[i].customLabels[k].value != null) {
					  outerLabelCount++;
					  if (element.GaugeEl.find('div').length == 0) {
                        if (this.model.scales[i].customLabels[k] != null && this.model.scales[i].customLabels[k].positionType !=null && this.model.scales[i].customLabels[k].positionType == "outer") {
                            element.outerDiv = ej.buildTag("div");
                            if (element.model.outerCustomLabelPosition == "bottom") {
                                element.GaugeEl.append(element.canvasEl);
                                element.GaugeEl.append(element.outerDiv);
                                element.outerDiv.css('text-align', 'center');
                            }
                            else {
                                if (element.model.outerCustomLabelPosition != "top") {
                                    var table = ej.buildTag("TABLE");
                                    table.css('width', '100%');
                                    var tr = ej.buildTag("TR");
                                    var td1 = ej.buildTag("TD");
                                    var td2 = ej.buildTag("td");
                                    if (element.model.outerCustomLabelPosition == "left") {
                                        td1.append(element.outerDiv);
                                        td2.append(element.canvasEl);
                                    }
                                    else {
                                        td1.append(element.canvasEl);
                                        td2.append(element.outerDiv);
                                    }
                                    tr.append(td1);
                                    tr.append(td2);
                                    table.append(tr);
                                    element.GaugeEl.append(table);
                                    element.outerDiv.css({
                                        'width': this.element.width() - element.model.width
                                    });
                                }
                                else {
                                    element.GaugeEl.append(element.outerDiv);
                                    element.GaugeEl.append(element.canvasEl);
                                    element.outerDiv.css('text-align', 'center');
                                }
                            }
                        }
                        else
                            element.GaugeEl.append(element.canvasEl);
                    }
                  }
				}
                if (outerLabelCount==0)
                    element.GaugeEl.append(element.canvasEl);
            }
            element.canvasEl.attr("role", "presentation");
            if (_gaugeCount == initialGaugeCount)
            {
                initialDivWidth = window.innerWidth;
            }
            element.canvasEl[0].setAttribute("width", element.model.width);
            element.canvasEl[0].setAttribute("height", element.model.height);
            element.centerX = element.canvasEl[0].width / 2;
            element.centerY = element.canvasEl[0].height / 2;
            var padding = 20, maxRadius, legendActualBounds, position, height, width;
			var gaugePosition = this.model.gaugePosition.toLowerCase();
            if (this.model.legend.visible) {
			    if (this.model.theme == "flatdark") this.model.legend.font.color = (ej.util.isNullOrUndefined(this.model.legend.font.color)) ? "#8c8c8c" : this.model.legend.font.color;
                else this.model.legend.font.color = (ej.util.isNullOrUndefined(this.model.legend.font.color)) ? "#282828" : this.model.legend.font.color;
                position = this.model.legend.position.toLowerCase();
                legendActualBounds = this._calculateLegendBounds();
                legendActualBounds.Height = (ej.util.isNullOrUndefined(this.model.legend.size._height)) ? legendActualBounds.Height : parseInt(this.model.legend.size.height);
                legendActualBounds.Width = (ej.util.isNullOrUndefined(this.model.legend.size._width)) ? legendActualBounds.Width : parseInt(this.model.legend.size.width);
                this.model.legendActualBounds = legendActualBounds;
                if (legendActualBounds.Height > 0 && legendActualBounds.Width > 0) {
                    switch (position) {
                        case "top":
                            height = (element.model.height - (legendActualBounds.Height + padding));
                            element.centerY = (legendActualBounds.Height + padding) + height / 2;
                            maxRadius = (height / 2) - padding;
                            break;
                        case "bottom":
                            element.centerY = (element.model.height - (legendActualBounds.Height + padding)) / 2;
                            maxRadius = element.centerY - padding;
                            break;
                        case "left":
                            width = (element.model.width - (legendActualBounds.Width + padding));
                            element.centerX = (legendActualBounds.Width + padding) + (width / 2);
                            maxRadius = (width / 2) - (padding * 2);
                            break;
                        case "right":
                            element.centerX = (element.model.width - (legendActualBounds.Width + padding)) / 2;
                            maxRadius = element.centerX - (padding * 2);
                            break;
                    }

                    for (var i = 0; i < this.model.scales.length; i++) {
                        var scale = this.model.scales[i], totalSize = 0, rangeSize;
                        if (!this._scaleRedrawn)
                            scale._radius = scale.radius;
                        $.each(scale.ranges, function (rangeIndex, rangeElement) { totalSize += rangeElement.size; });
                        rangeSize = totalSize / scale.ranges.length;
                        maxRadius = Math.abs((maxRadius - rangeSize) / (i + 1));
                        maxRadius = (scale._radius < maxRadius) ? scale._radius : maxRadius;
                    }
                }
            }
            else
                $.each(this.model.scales, function (scaleIndex, scaleElement) {
                    scaleElement.radius = (!ej.util.isNullOrUndefined(scaleElement._radius)) ? scaleElement._radius : scaleElement.radius;
                });
            
            if (this._isHalfCircle && this._isHalfCircle()) {
                if ((element.model.frame.halfCircleFrameEndAngle - element.model.frame.halfCircleFrameStartAngle) >= 180) {
                    if (element.model.frame.halfCircleFrameStartAngle == 0) {
                        switch (gaugePosition) {
                            case "center":
                                element.centerY = (element.model.height / 2) - (element.model.radius / 2);
                                element.centerX = element.model.width / 2;
                                break;
                            case "topleft":
                                element.centerY = element.model.distanceFromCorner;
                                element.centerX = element.model.radius + element.model.distanceFromCorner;
                                break;
                            case "topright":
                                element.centerY = element.model.distanceFromCorner;
                                element.centerX = element.model.width - (element.model.radius + element.model.distanceFromCorner);
                                break;
                            case "topcenter":
                                element.centerY = element.model.distanceFromCorner;
                                element.centerX = element.model.width / 2;
                                break;
                            case "middleleft":
                                element.centerY = (element.model.height / 2) - (element.model.radius / 2);
                                element.centerX = element.model.radius + element.model.distanceFromCorner;
                                break;
                            case "middleright":
                                element.centerY = (element.model.height / 2) - (element.model.radius / 2);
                                element.centerX = element.model.width - (element.model.radius + element.model.distanceFromCorner);
                                break;
                            case "bottomleft":
                                element.centerY = element.model.height - (element.model.radius + element.model.distanceFromCorner);
                                element.centerX = element.model.radius + element.model.distanceFromCorner;
                                break;
                            case "bottomright":
                                element.centerY = element.model.height - (element.model.radius + element.model.distanceFromCorner);
                                element.centerX = element.model.width - (element.model.radius + element.model.distanceFromCorner);
                                break;
                            case "bottomcenter":
                                element.centerY = element.model.height - (element.model.radius + element.model.distanceFromCorner);
                                element.centerX = element.model.width / 2;
                                break;
                        }
                    }
                    else if(element.model.frame.halfCircleFrameStartAngle == 90){
                        switch (gaugePosition) {
                            case "center":
                                element.centerY = element.model.height / 2;
                                element.centerX = (element.model.width / 2) + (element.model.radius / 2);
                                break;
                            case "topleft":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = element.model.distanceFromCorner + element.model.radius;
                                break;
                            case "topright":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = element.model.width - element.model.distanceFromCorner;
                                break;
                            case "topcenter":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = (element.model.width / 2) + (element.model.radius / 2);
                                break;
                            case "middleleft":
                                element.centerY = element.model.height / 2;
                                element.centerX = element.model.distanceFromCorner + element.model.radius;
                                break;
                            case "middleright":
                                element.centerY = element.model.height / 2;
                                element.centerX = element.model.width - element.model.distanceFromCorner;
                                break;
                            case "bottomleft":
                                element.centerY = element.model.height - (element.model.distanceFromCorner + element.model.radius);
                                element.centerX = element.model.distanceFromCorner + element.model.radius;
                                break;
                            case "bottomright":
                                element.centerY = element.model.height - (element.model.distanceFromCorner + element.model.radius);;
                                element.centerX = element.model.width - element.model.distanceFromCorner;
                                break;
                            case "bottomcenter":
                                element.centerY = element.model.height - (element.model.distanceFromCorner + element.model.radius);;
                                element.centerX = (element.model.width / 2) + (element.model.radius / 2);
                                break;
                        }
                    }
                    else if (element.model.frame.halfCircleFrameStartAngle == 180) {
                        switch (gaugePosition) {
                            case "center":
                                element.centerY = (element.model.height / 2) + (element.model.radius / 2);
                                element.centerX = element.model.width / 2;
                                break;
                            case "topleft":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = element.model.distanceFromCorner + element.model.radius;
                                break;
                            case "topright":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = element.model.width - (element.model.distanceFromCorner + element.model.radius);
                                break;
                            case "topcenter":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = element.model.width / 2;
                                break;
                            case "middleleft":
                                element.centerY = element.model.height / 2 + element.model.radius / 2;
                                element.centerX = element.model.distanceFromCorner + element.model.radius;
                                break;
                            case "middleright":
                                element.centerY = element.model.height / 2 + element.model.radius / 2;
                                element.centerX = element.model.width - (element.model.distanceFromCorner + element.model.radius);
                                break;
                            case "bottomleft":
                                element.centerY = element.model.height - element.model.distanceFromCorner;
                                element.centerX = element.model.distanceFromCorner + element.model.radius;
                                break;
                            case "bottomright":
                                element.centerY = element.model.height - element.model.distanceFromCorner;
                                element.centerX = element.model.width - (element.model.distanceFromCorner + element.model.radius);
                                break;
                            case "bottomcenter":
                                element.centerY = element.model.height - element.model.distanceFromCorner;
                                element.centerX = element.model.width / 2;
                                break;
                        }
                    }
                }
                else if (element.model.frame.halfCircleFrameStartAngle == 270 && element.model.frame.halfCircleFrameEndAngle == 90) {
                    switch (gaugePosition) {
                        case "center":
                            element.centerY = element.model.height / 2;
                            element.centerX = (element.model.width / 2) - (element.model.radius / 2);
                            break;
                        case "topleft":
                            element.centerY = element.model.radius + element.model.distanceFromCorner;
                            element.centerX = element.model.distanceFromCorner;
                            break;
                        case "topright":
                            element.centerY = element.model.radius + element.model.distanceFromCorner;
                            element.centerX = element.model.width - (element.model.radius + element.model.distanceFromCorner);
                            break;
                        case "topcenter":
                            element.centerY = element.model.radius + element.model.distanceFromCorner;
                            element.centerX = (element.model.width / 2) - (element.model.radius / 2);
                            break;
                        case "middleleft":
                            element.centerY = element.model.height / 2;
                            element.centerX = element.model.distanceFromCorner;
                            break;
                        case "middleright":
                            element.centerY = element.model.height / 2;
                            element.centerX = element.model.width - (element.model.radius + element.model.distanceFromCorner);
                            break;
                        case "bottomleft":
                            element.centerY = element.model.height - (element.model.radius + element.model.distanceFromCorner);
                            element.centerX = element.model.distanceFromCorner;
                            break;
                        case "bottomright":
                            element.centerY = element.model.height - (element.model.radius + element.model.distanceFromCorner);
                            element.centerX = element.model.width - (element.model.radius + element.model.distanceFromCorner);
                            break;
                        case "bottomcenter":
                            element.centerY = element.model.height - (element.model.radius + element.model.distanceFromCorner);
                            element.centerX = (element.model.width / 2) - (element.model.radius / 2);
                            break;
                    }
                }
                else if ((element.model.frame.halfCircleFrameEndAngle - element.model.frame.halfCircleFrameStartAngle) <= 90) {
                    if (element.model.frame.halfCircleFrameStartAngle == 0) {
                        switch (element.model.gaugePosition) {
                            case "center":
                                element.centerY = (element.model.height / 2) - (element.model.radius / 2);
                                element.centerX = (element.model.width / 2) - (element.model.radius / 2);
                                break;
                            case "topleft":
                                element.centerY = element.model.distanceFromCorner;
                                element.centerX = element.model.distanceFromCorner;
                                break;
                            case "topright":
                                element.centerY = element.model.distanceFromCorner;
                                element.centerX = element.model.width - (element.model.distanceFromCorner + element.model.radius);
                                break;
                            case "topcenter":
                                element.centerY = element.model.distanceFromCorner;
                                element.centerX = (element.model.width / 2) - (element.model.radius / 2);
                                break;
                            case "middleleft":
                                element.centerY = (element.model.height / 2) - (element.model.radius / 2);;
                                element.centerX = element.model.distanceFromCorner;
                                break;
                            case "middleright":
                                element.centerY = (element.model.height / 2) - (element.model.radius / 2);;
                                element.centerX = element.model.width - (element.model.distanceFromCorner + element.model.radius);
                                break;
                            case "bottomleft":
                                element.centerY = element.model.height - (element.model.distanceFromCorner + element.model.radius);
                                element.centerX = element.model.distanceFromCorner;
                                break;
                            case "bottomright":
                                element.centerY = element.model.height - (element.model.distanceFromCorner + element.model.radius);
                                element.centerX = element.model.width - (element.model.distanceFromCorner + element.model.radius);
                                break;
                            case "bottomcenter":
                                element.centerY = element.model.height - (element.model.distanceFromCorner + element.model.radius);
                                element.centerX = (element.model.width / 2) - (element.model.radius/2);
                                break;
                        }
                    }
                    else if (element.model.frame.halfCircleFrameStartAngle == 90) {
                        switch (gaugePosition) {
                            case "center":
                                element.centerY = (element.model.height / 2) - (element.model.radius / 2);
                                element.centerX = (element.model.width/2) + (element.model.radius/2);
                                break;
                            case "topleft":
                                element.centerY = element.model.distanceFromCorner;
                                element.centerX = element.model.radius + element.model.distanceFromCorner;
                                break;
                            case "topright":
                                element.centerY = element.model.distanceFromCorner;
                                element.centerX = element.model.width - element.model.distanceFromCorner;
                                break;
                            case "topcenter":
                                element.centerY = element.model.distanceFromCorner;
                                element.centerX = (element.model.width / 2) + (element.model.radius / 2);
                                break;
                            case "middleleft":
                                element.centerY = (element.model.height / 2) - (element.model.radius / 2);
                                element.centerX = element.model.radius + element.model.distanceFromCorner;
                                break;
                            case "middleright":
                                element.centerY = (element.model.height / 2) - (element.model.radius / 2);
                                element.centerX = element.model.width - element.model.distanceFromCorner;
                                break;
                            case "bottomleft":
                                element.centerY = element.model.height - (element.model.radius + element.model.distanceFromCorner);
                                element.centerX = element.model.radius + element.model.distanceFromCorner;
                                break;
                            case "bottomright":
                                element.centerY = element.model.height - (element.model.radius + element.model.distanceFromCorner);
                                element.centerX = element.model.width - element.model.distanceFromCorner;
                                break;
                            case "bottomcenter":
                                element.centerY = element.model.height - (element.model.radius + element.model.distanceFromCorner);
                                element.centerX = (element.model.width / 2) + (element.model.radius / 2);
                                break;
                        }
                    }
                    else if (element.model.frame.halfCircleFrameStartAngle == 180) {
                        switch (element.model.gaugePosition) {
                            case "center":
                                element.centerY = (element.model.height / 2) + (element.model.radius / 2);
                                element.centerX = (element.model.width / 2) + (element.model.radius / 2);
                                break;
                            case "topleft":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = element.model.radius + element.model.distanceFromCorner;
                                break;
                            case "topright":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = element.model.width - element.model.distanceFromCorner;
                                break;
                            case "topcenter":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = (element.model.width / 2) + (element.model.radius / 2);
                                break;
                            case "middleleft":
                                element.centerY = (element.model.height / 2) + (element.model.radius / 2);
                                element.centerX = element.model.radius + element.model.distanceFromCorner;
                                break;
                            case "middleright":
                                element.centerY = (element.model.height / 2) + (element.model.radius / 2);
                                element.centerX = element.model.width - element.model.distanceFromCorner;
                                break;
                            case "bottomleft":
                                element.centerY=element.model.height-element.model.distanceFromCorner;
                                element.centerX = element.model.radius + element.model.distanceFromCorner;
                                break;
                            case "bottomright":
                                element.centerY = element.model.height - element.model.distanceFromCorner;
                                element.centerX = element.model.width - element.model.distanceFromCorner;
                                break;
                            case "bottomcenter":
                                element.centerY = element.model.height - element.model.distanceFromCorner;
                                element.centerX = (element.model.width / 2) + (element.model.radius / 2);
                                break;
                        }
                    }
                    else if (element.model.frame.halfCircleFrameStartAngle == 270) {
                        switch (element.model.gaugePosition) {
                            case "center":
                                element.centerY = (element.model.radius / 2) + (element.model.height / 2);
                                element.centerX = (element.model.width / 2) - (element.model.radius / 2);
                                break;
                            case "topleft":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = element.model.distanceFromCorner;
                                break;
                            case "topright":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = element.model.width - (element.model.distanceFromCorner + element.model.radius);
                                break;
                            case "topcenter":
                                element.centerY = element.model.distanceFromCorner + element.model.radius;
                                element.centerX = (element.model.width / 2) - (element.model.radius / 2);
                                break;
                            case "middleleft":
                                element.centerY = (element.model.height / 2) + (element.model.radius / 2);
                                element.centerX = element.model.distanceFromCorner;
                                break;
                            case "middleright":
                                element.centerY = (element.model.radius / 2) + (element.model.height / 2);;
                                element.centerX = element.model.width - (element.model.distanceFromCorner + element.model.radius);
                                break;
                            case "bottomleft":
                                element.centerY = element.model.height - element.model.distanceFromCorner;
                                element.centerX = element.model.distanceFromCorner;
                                break;
                            case "bottomright":
                                element.centerY = element.model.height - element.model.distanceFromCorner;
                                element.centerX = element.model.width - (element.model.distanceFromCorner + element.model.radius);
                                break;
                            case "bottomcenter":
                                element.centerY = element.model.height-element.model.distanceFromCorner;
                                element.centerX = (element.model.width / 2) - (element.model.radius / 2);
                                break;
                        }
                    }
                }
            }
            var elem = element.canvasEl[0];
            if (typeof window.G_vmlCanvasManager != "undefined") {
                elem = window.G_vmlCanvasManager.initElement(elem);
            }
            if (!elem || !elem.getContext) {
                return;
            }
            element.contextEl = element.canvasEl[0].getContext("2d");
        },
        _browserInfo: function () {
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
		 	
        _wireEvents: function () {
            var matched = jQuery.uaMatch(navigator.userAgent),
                browserInfo = this._browserInfo(),
                isPointer = browserInfo.isMSPointerEnabled,
	            isIE11Pointer = browserInfo.pointerEnabled;
            this.startEv = isPointer ? (isIE11Pointer ? "pointerdown" : "MSPointerDown") : "touchstart mousedown",
            this.endEv = isPointer ? (isIE11Pointer ? "pointerup" : "MSPointerUp") : "touchend mouseup",
            this.moveEv = isPointer ? (isIE11Pointer ? "pointermove" : "MSPointerMove") : "touchmove mousemove",
            this.leaveEv = isPointer ? (isIE11Pointer ? "pointerleave" : "MSPointerOut") : "touchleave mouseleave",
            this.scrollEv = matched.browser.toLowerCase() == "mozilla" ? (isIE11Pointer ? "mousewheel" : "DOMMouseScroll") : "mousewheel";
            this.model.browserInfo = browserInfo;
            
            var action= this.model.readOnly? 'pan-y pan-x' : 'none';
            $(this.element).css('touch-action', action);
            
            this.onMouseMoveHandler = $.proxy(this._onMouseMove, this);
            this.onMouseUpHandler = $.proxy(this._onMouseUp, this);
            this.onMouseDownHandler = $.proxy(this._onMouseDown, this);
            this.onHoverOCustomLabel = $.proxy(this._onHoverOCustomLabel, this);
            this.onLeaveOCustomLabel = $.proxy(this._onLeaveOCustomLabel, this);
            if (this.model.legend.visible){
                this._on($(this.canvasEl), "click", this.legendMouseClick);
            }
            this._on($(this.canvasEl), "mousemove", this.rangesMouseMove);
            this._on($(this.canvasEl), this.startEv, this.rangeMouseDown);
            this._on($(this.canvasEl), this.endEv, this.rangeMouseUp);
            this._on($(this.canvasEl), "contextmenu", this._cgRightClick);
            if (this.model.tooltip.showCustomLabelTooltip || this.model.tooltip.showLabelTooltip) {
                $(this.canvasEl).bind(this.moveEv, this.onMouseMoveHandler);
                $(this.canvasEl).bind(this.scrollEv, this.onMouseMoveHandler);
                $(this.canvasEl).bind(this.startEv, this.onMouseDownHandler);
                $(this.canvasEl).bind(this.endEv, this.onLeaveOCustomLabel);
                $(this.canvasEl).bind(this.leaveEv, this.onLeaveOCustomLabel);
            }
            if (!this.model.readOnly) {
                $(this.canvasEl).bind(this.startEv, this.onMouseDownHandler);
            }
            if (this.model.tooltip.showCustomLabelTooltip){
                $('.'+this._id + 'outercustomlbl').bind("mouseenter", this.onHoverOCustomLabel);
                $('.' + this._id + 'outercustomlbl').bind("this.leaveEv", this.onLeaveOCustomLabel);
            }
        },
		 
        _unWireEvents: function () {
            this._off($(this.canvasEl), this.startEv, this.rangeMouseDown);
            this._off($(this.canvasEl), this.endEv, this.rangeMouseUp);
            this._off($(this.canvasEl), "contextmenu", this._cgRightClick);
            $(this.canvasEl).unbind(this.startEv, this.onMouseDownHandler);
        },

        rangeMouseDown: function(e){
            if(ej.isTouchDevice() && this.model.rightClick != '')
                this._longPressTimer = new Date();
        },

        rangeMouseUp: function(e){
            var end = new Date();
            if(this._doubleTapTimer != null && end - this._doubleTapTimer < 300)
                this._cgDoubleClick(e);
            this._doubleTapTimer = end;
            
            if(ej.isTouchDevice() && this.model.rightClick != '' && end - this._longPressTimer > 1500)
                this._cgRightClick();
        },
       
        _onHoverOCustomLabel: function(e) {
            if (e.currentTarget.innerHTML!=null || e.currentTarget.innerHTML!="")
                this._showTooltip(e, e.currentTarget.innerHTML);
        },
      
        _onLeaveOCustomLabel: function (evt) {
            if (this.isTouch(evt)) {
                this._performTooltip(evt);
                window.clearTimeout(this.model.timer);
				this.model.timer = setTimeout(function () {
					$('.tooltipDiv').fadeOut(500);
	            }, 1200);
            }
            else {
                this._hideTooltip();
            }
        },
     
        isTouch: function (evt) {
            var event = evt.originalEvent ? evt.originalEvent : evt;
            if ((event.pointerType == "touch") || (event.pointerType == 2) || (event.type.indexOf("touch") > -1))
                return true;
            return false;
        },

        _showTooltip: function (event, val) {
			var locale = this.model.locale;
            var tooltipText = (locale && this.model.enableGroupSeparator) ? val.toLocaleString(locale) : val.toString();
            var tooltipdiv = $('.tooltipDiv');
            if (tooltipdiv.length == 0) {
                tooltipdiv = $("<div class='tooltipDiv' style='pointer-events:none; position: absolute; z-index: 105; display: block;'></div>");
                $(document.body).append(tooltipdiv);
            }
            if (this.model.tooltip.templateID != "" && this.model.tooltip.templateID != null) {
                var cloneNode = $("#" + this.model.tooltip.templateID).clone();
                $('.tooltipDiv')[0].innerHTML = "";
                $(cloneNode).css("display", "block").appendTo(tooltipdiv);
                $(tooltipdiv).css({
                    'pointer-events': 'none',
                    'background-color': this.model.backgroundColor,
                    'border': '1px solid #bbbcbb',
                    'border-radius': '3px',
                    'color': '#565656'
                });
                tooltipdiv.html(tooltipdiv.html().replace('#label#', tooltipText));
            } else {
                $(tooltipdiv).html(tooltipText);
                $(tooltipdiv).css({
                'pointer-events':'none',
                'background-color': 'white',
                'border': '2px solid #bbbcbb',
                'position': 'absolute',
                'padding': '10px 20px',
                'margin-top': '5px',
                'text-align': 'left',
                'font': '12px Segoe UI',
                'font-stretch': 'condensed',
                'display': 'inline-block',
                'border-radius': '3px',
                'color': '#565656',
                'width': 'auto'
                });
            }
            var tooltipMargin = 10;
            var xPos = event.pageX + tooltipMargin;
            var yPos = event.pageY + tooltipMargin;
            xPos = (((xPos + $(tooltipdiv).width())  < this.model.width)) ? (xPos) : (xPos - $(tooltipdiv).width());
            yPos = ((yPos + $(tooltipdiv).height()) < this.model.height) ? (yPos) : (yPos - $(tooltipdiv).height());
            $(tooltipdiv).css("left", xPos);
            $(tooltipdiv).css("top", yPos);
            $('.tooltipDiv').show();
        },
       
        _hideTooltip: function () {
            $('.tooltipDiv').remove();//.fadeOut(0, "linear");
        },
	 
        _onMouseDown: function (e) {
            this._blockDefaultActions(e);
            this._mouseDown = true;
            var padding = this.isTouch(e) ? 10 : 0;
            var touch = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
            var startPoint = { "x": this.centerX, "y": this.centerY };
            var endPoint = { "x": touch.pageX - $(this.canvasEl).offset().left, "y": touch.pageY - $(this.canvasEl).offset().top };
            var indegree = 180 * this._getCirucumferenceAngle(startPoint, endPoint) / Math.PI;
            var scaleRadius, majorTickHeight, self = this;
            if (!this.model.readOnly) {
                $.each(this.model.scales, function (index, element) {
                    self.scaleIndex = index;
                    if (element.pointers != null) {
                        self.pointerEl = element.pointers;
                        scaleRadius = element.radius;
                        majorTickHeight = element.ticks[0].height;
                        $.each(element.pointers, function (pointerIndex, pointerElement) {
                            if (self._isHalfCircle())
                                element.showBackNeedle = false;
                            var angle = self._getAngle(pointerElement.value);
                            if (angle > 360)
                                angle = angle - 360;
                            var greatervalue = angle + pointerElement.width;
                            var lesservalue = angle - pointerElement.width;
                            var radius = Math.sqrt((endPoint.x - startPoint.x) * (endPoint.x - startPoint.x) + (endPoint.y - startPoint.y) * (endPoint.y - startPoint.y));
                            //condition added for the markerpointer whether the user mousedown is made on marker pointer location or not.
                            var cond = radius < ((pointerElement.placement == "far") ? scaleRadius + pointerElement.width + pointerElement.distanceFromScale : (pointerElement.placement == "center") ? scaleRadius - pointerElement.distanceFromScale : scaleRadius - 15 - majorTickHeight - pointerElement.distanceFromScale) && radius > ((pointerElement.placement == "far") ? scaleRadius + pointerElement.distanceFromScale : (pointerElement.placement == "center") ? scaleRadius - pointerElement.width - pointerElement.distanceFromScale : scaleRadius - pointerElement.width - 15 - majorTickHeight - pointerElement.distanceFromScale);
                            var chkPointerType = (pointerElement.type == "needle") ? radius <= pointerElement.length : cond;
                            if (self._isBetween(lesservalue, greatervalue, indegree, padding) && chkPointerType) {
                                self._onMouseClick(angle, element.value);
                                self.activeElement = pointerElement;
                                $(document).bind(self.moveEv, self.onMouseMoveHandler);
                                $(document).bind(self.endEv, self.onMouseUpHandler);
                            }
                        });
                    }
                });
            }
        },
	 
        _onMouseUp: function () {
            this._mouseDown=false;
            $(document).unbind(self.moveEv, self.onMouseMoveHandler);
            $(document).unbind(self.endEv, self.onMouseUpHandler);
            if (this.activeElement)
                this._onMouseClickUp(this._getAngle(this.activeElement.value), this.activeElement.value);
            this.activeElement = null;
        },
        _mousePosition: function (evt) {
            if (!ej.util.isNullOrUndefined(evt.pageX) && evt.pageX > 0)
                return { x: evt.pageX, y: evt.pageY };
            else if (evt.originalEvent && !ej.util.isNullOrUndefined(evt.originalEvent.pageX) && evt.originalEvent.pageX > 0)
                return { x: evt.originalEvent.pageX, y: evt.originalEvent.pageY };
            else if (evt.originalEvent && evt.originalEvent.changedTouches != undefined) {
                if (!ej.util.isNullOrUndefined(evt.originalEvent.changedTouches[0].pageX) && evt.originalEvent.changedTouches[0].pageX > 0)
                    return { x: evt.originalEvent.changedTouches[0].pageX, y: evt.originalEvent.changedTouches[0].pageY };
            }
            else
                return { x: 0, y: 0 };

        },
        _calTouchPosition: function (e) {
            var matched = jQuery.uaMatch(navigator.userAgent);
            var mouseposition = this._mousePosition(e);
            e.pageX = mouseposition.x;
            e.pageY = mouseposition.y;
        },
        getEvent: function (event) {
            return (event.targetTouches && event.targetTouches[0]) ? event.targetTouches[0] : event
        },
        _onMouseMove: function (e) {
            if (this._mouseDown && !ej.isNullOrUndefined(this.activeElement)) {
                this._blockDefaultActions(e);
                var startPoint = { "x": this.centerX, "y": this.centerY };
                var touch = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                var endPoint = { "x": touch.pageX - $(this.canvasEl).offset().left, "y": touch.pageY - $(this.canvasEl).offset().top };
                var indegree = 180 * this._getCirucumferenceAngle(startPoint, endPoint) / Math.PI;
                if (indegree < this.scaleEl[this.scaleIndex].startAngle && !this._isHalfCircle())
                    indegree = indegree + 360;
                this._onMouseClickMove(this._getAngle(this.activeElement.value), this.activeElement.value);
                if (this._getValue(indegree) <= this.scaleEl[this.scaleIndex].maximum) {
                    if (this.scaleEl[this.scaleIndex].direction == "clockwise")
                        this.activeElement.value = this._getValue(indegree);
                    else
                        this.activeElement.value = this.scaleEl[this.scaleIndex].maximum - this._getValue(indegree);
                }
                if (this.contextEl.putImageData)
                    this._reDrawPointer();
                else
                    this._init();
            }
            else
            {
                if ((this.model.tooltip.showCustomLabelTooltip || this.model.tooltip.showLabelTooltip) && (!this.isTouch(e)))
                {

                    this._performTooltip(e);
                    
                }
            }
        },

        _performTooltip: function (e) {
            var hit = false;
            var padding = 10;
            var isTouch = this.isTouch(e);
            for (var i = 0; this._savedPoints[i] != null; i++) {
                if (isTouch) {
                    var mousedownCords = this._calTouchPosition(e),
                        pointer = this.getEvent(e),
                        currX = pointer.pageX,
                        currY = pointer.pageY;
                    var current = { "X": currX - $(this.canvasEl).offset().left, "Y": currY - $(this.canvasEl).offset().top };
                    if (current.X > this._savedPoints[i].startX - padding && current.X < (this._savedPoints[i].startX + this._savedPoints[i].width + padding) && current.Y > this._savedPoints[i].startY - padding && current.Y < (this._savedPoints[i].startY + this._savedPoints[i].height + padding)) {
                        this._showTooltip(e, this._savedPoints[i].value);
                        hit = true;

                    }
                    else if (hit == false) {
                        this._hideTooltip();
                    }
                } else {
                    var current = { "X": e.pageX - $(this.canvasEl).offset().left, "Y": e.pageY - $(this.canvasEl).offset().top };
                    if (current.X > this._savedPoints[i].startX && current.X < (this._savedPoints[i].startX + this._savedPoints[i].width) && current.Y > this._savedPoints[i].startY  && current.Y < (this._savedPoints[i].startY + this._savedPoints[i].height)) {
                        this._showTooltip(e, this._savedPoints[i].value);
                        hit = true;
                    }
                    else if (hit == false)
                        this._hideTooltip();
                }
            }
        },

		 	
        _isHalfCircle: function () {
            if (this.model.frame.frameType.toLowerCase() == "halfcircle")
                return true;
            else
                return false;
        },
        
        _calFontLength: function (font) {
            var minText = this.model.scales[0].minimum + this.model.scales[0].labels[0].unitText;
            var maxText = this.model.scales[0].maximum + this.model.scales[0].labels[0].unitText;
            var text = maxText.length > minText.length ? maxText : minText;
            var length = $('<span id="test"></span>').css({ font: font, display: 'none', whiteSpace: 'nowrap' }).appendTo($('body')).text(text).width();
            $("#test").remove();
            return length/2;
        },
		 
        _getHalfCircleYPosition: function () {
            return this._getYCordinate(this.centerY, 0, (this.model.frame.halfCircleFrameStartAngle + this.model.frame.halfCircleFrameEndAngle) / 2);
        },
		 
        _getHalfCircleXPosition: function () {
            return this._getXCordinate(this.centerX, 0, (this.model.frame.halfCircleFrameStartAngle + this.model.frame.halfCircleFrameEndAngle) / 2);
        },
		 
        _getXCordinate: function (x, radius, angle) {
            var x1 = x + radius * (Math.cos(Math.PI * (angle / 180)));
            return x1;
        },
		 	
        _getYCordinate: function (y, radius, angle) {
            var y1 = y + radius * (Math.sin(Math.PI * (angle / 180)));
            return y1;
        },
		 
        _getAngle: function (value) {
            var tempValue, angle;
            if (value >= this.scaleEl[this.scaleIndex].minimum && value <= this.scaleEl[this.scaleIndex].maximum)
                tempValue = this.scaleEl[this.scaleIndex].direction == "clockwise" ? value - this.scaleEl[this.scaleIndex].minimum : this.scaleEl[this.scaleIndex].maximum - value;
            else {
                if (this.scaleEl[this.scaleIndex].direction == "clockwise") {
                    if (value <= this.scaleEl[this.scaleIndex].minimum)
                        tempValue = this.scaleEl[this.scaleIndex].minimum;
                    else
                        tempValue = this.scaleEl[this.scaleIndex].maximum;
                }
                else {
                    if (value <= this.scaleEl[this.scaleIndex].minimum)
                        tempValue = this.scaleEl[this.scaleIndex].maximum;
                    else
                        tempValue = this.scaleEl[this.scaleIndex].minimum;
                }
            }
            angle = (tempValue * ((this.scaleEl[this.scaleIndex].sweepAngle) / (this.scaleEl[this.scaleIndex].maximum - this.scaleEl[this.scaleIndex].minimum))) + (this.scaleEl[this.scaleIndex].startAngle);
            return angle;
        },
		 
        _subtractDecimal: function (value, interval) {
            var strValue = value.toString();
            var strInterval = interval.toString();
            var vDecimal;
            var iDecimal;
            if (strValue.indexOf('.') > -1)
                vDecimal = strValue.length - strValue.indexOf('.') - 1;
            else
                vDecimal = 0;
            if (strInterval.indexOf('.') > -1)
                iDecimal = strInterval.length - strInterval.indexOf('.') - 1;
            else
                iDecimal = 0;
            var decimal = vDecimal > iDecimal ? vDecimal : iDecimal;
            var correctValue = (value * Math.pow(10, decimal) - interval * Math.pow(10, decimal)) / Math.pow(10, decimal);
            return correctValue;
        },
		 	
        _getCirucumferenceAngle: function (startPoint, endPoint) {
            if (endPoint.x > startPoint.x) {
                if (endPoint.y > startPoint.y)
                    return this._tangent(startPoint, endPoint); //quadrant2
                else {
                    if (endPoint.y == startPoint.y)
                        return 0;
                    else
                        return 2 * Math.PI + this._tangent(startPoint, endPoint); //quadrant1
                }
            }
            else {
                if (endPoint.x == startPoint.x) {
                    if (endPoint.y == startPoint.y)
                        return 0;   //0 degree
                    else {
                        if (endPoint.y > startPoint.y)
                            return Math.PI / 2;  // 90 degree
                        else
                            return 1.5 * Math.PI; // 270 degree
                    }
                }
                else {
                    if (endPoint.y == startPoint.y)
                        return Math.PI; // 180 degree
                    else {
                        if (endPoint.y > startPoint.y)
                            return Math.PI + this._tangent(startPoint, endPoint);  // quadrant3
                        else
                            return Math.PI + this._tangent(startPoint, endPoint); //quadrant4
                    }
                }
            }
        },
       
        _calcDistanceFactor: function (angle, placement, labelLength) {
            var distanceFactor;
            if ((angle > 240 && angle <= 300) || (angle > 60 && angle <= 120))
                distanceFactor = 0;
            else if ((angle > 330 && angle <= 360) || (angle >= 0 && angle <= 30))
                distanceFactor = -labelLength * 0.5;
            else if ((angle > 30 && angle <= 60) || (angle > 300 && angle <= 330))
                distanceFactor = -labelLength / 2;
            else if ((angle > 150 && angle <= 210))
                distanceFactor = labelLength * 0.5;
            else
                distanceFactor = labelLength / 2;
            return placement == "far" ? -distanceFactor : distanceFactor;
        },
		 
        _tangent: function (startPoint, endPoint) {
            var distance = (endPoint.y - startPoint.y) / (endPoint.x - startPoint.x);
            var inradians = Math.atan(distance);
            //indegrees=180*inradians/Math.PI
            return inradians;
        },
		 
        _getValue: function (angle) {
            if (this.scaleEl[this.scaleIndex].direction == "counterclockwise")
                return ((angle - this.scaleEl[this.scaleIndex].startAngle) / this.scaleEl[this.scaleIndex].sweepAngle) * (this.scaleEl[this.scaleIndex].maximum - this.scaleEl[this.scaleIndex].minimum);
            else
                return ((angle - this.scaleEl[this.scaleIndex].startAngle) / this.scaleEl[this.scaleIndex].sweepAngle) * (this.scaleEl[this.scaleIndex].maximum - this.scaleEl[this.scaleIndex].minimum) + this.scaleEl[this.scaleIndex].minimum;
        },
		 
        _drawScales: function () {
            var self = this;
            this.scaleEl = this.model.scales;
            $.each(this.model.scales, function (index, element) {
                self.scaleIndex = index;
                if (element.showScaleBar)
                    self._setScaleCordinates(element);
            });
            if (this.model.rangeZOrder  == "rear") {
                this._setRanges();
                this._setTicks();
            }
            else {
                this._setTicks();
                this._setRanges();
            }
            this._setLabels();
            this._subGauge();
            this._setCustomLabel();
            this._setPointers();
            if (!this.contextEl.putImageData)
                this.model.enableAnimation = false;
            if (this.model.animationSpeed != null && this.model.animationSpeed > 0) {
                var delay = this.model.animationSpeed / 25;
                if (delay >= 0) {
                    var myNav = navigator.userAgent.toLowerCase();
					var IEVersion = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : 0;
                    if (this.model.enableAnimation && IEVersion != 9) {
						for (var i=0; i< this.model.scales[0].pointers.length; i++){
							this.pointerValue = [];
							this.currentValue = [];
							this.pointerValue[i] = null;
							this.currentValue[i] = null;
							this.updatePointerOnAnimation = false;
						}
						this.dt = new Date().getTime();
                        this._onAnimate(this);
                    }
                }
            }
            this._setIndicators();
        },
		 
        _setTicks: function () {
            var self = this;
            $.each(this.model.scales, function (index, element) {
                if (element.showTicks) {
                    self.scaleIndex = index;
                    if (element.ticks != null) {
                        self.tickEl = element.ticks;
                        $.each(element.ticks, function (tickIndex, tickElement) {
                            self.tickIndex = tickIndex;
                            self._setTicksCordinates(tickIndex, tickElement);
                        });
                    }
                }
            });
        },
	 
        _setLabels: function () {
            var self = this;
            $.each(this.model.scales, function (index, element) {
                if (element.showLabels) {
                    self.scaleIndex = index;
                    if (element.labels != null) {
                        self.labelEl = element.labels;
                        $.each(element.labels, function (labelIndex, labelElement) {
                            self.labelIndex = labelIndex;
                            self._setLabelCoridnates(labelIndex, labelElement);
                        });
                    }
                }
            });
        },
		 
        _setIndicators: function () {
            var self = this;
            $.each(this.model.scales, function (index, element) {
                if (element.showIndicators) {
                    self.scaleIndex = index;
                    if (element.indicators != null) {
                        self.indicatorEl = element.indicators;
                        $.each(element.indicators, function (indIndex, indElement) {
                            self.indicatorIndex = indIndex;
                            self._drawIndicator(indIndex, indElement);
                        });
                    }
                }
            });
        },
		 
        _setPointers: function () {
            var self = this;
            $.each(this.model.scales, function (index, element) {
                if (element.showPointers) {
                    self.scaleIndex = index;
                    if (element.pointers != null) {
                        self.pointerEl = element.pointers;
                        $.each(element.pointers, function (pointerIndex, pointerElement) {
                            if (self._isHalfCircle())
                                element.showBackNeedle = false;
                            self.pointerIndex = pointerIndex;
                            self._drawPointers(pointerIndex, pointerElement);
                            //  setInterval( function(){ self._drawPointers(pointerIndex,pointerElement);}, 30 ); 
                        });
                    }
                }

            });
        },
		 
        _onAnimate: function (obj) {
		if(!this._androidAnimation && !ej.util.isNullOrUndefined(obj.model)){
		  var circularGaugeObject = obj, self = circularGaugeObject,
			  delay = self.model.animationSpeed / 25, pointerValue,i ,j,now,delta,animationFlag,
		      pointersLength = obj.model.scales[0].pointers.length, flag = [];
		  for (i= 0; i< pointersLength; i++) {
			flag[i] = true;
			if (self.model.scales[0].pointers[i].value != self.model.scales[0].pointers[i]._value)
				self.model.scales[0].pointers[i]._value = self.model.scales[0].pointers[i].value;
			 self.pointerValue[i] = ej.util.isNullOrUndefined(self.pointerValue[i]) ? self.model.scales[0].pointers[i]._value : self.pointerValue[i];
			 self.currentValue[i] = ej.util.isNullOrUndefined(self.currentValue[i]) ? self.model.scales[0].minimum : self.currentValue[i];
            pointerValue = self.pointerValue[i];
			now = new Date().getTime();
	        delta = now - self.dt;
                if ((delta > delay) && (pointerValue > self.currentValue[i])) {
                    self.currentValue[i] = self.currentValue[i] + ((self.model.scales[0].maximum-self.model.scales[0].minimum)/100);
					self.updatePointerOnAnimation = true;
                    pointerValue > self.currentValue[i] ? self.setPointerValue(0, i, self.currentValue[i]) : self.setPointerValue(0, i, pointerValue);
					self.dt = now - (delta % delay);
                }
                else if (self.currentValue >= pointerValue)
                    flag[i] = false;
		    }
		  for (j=0; j< flag.length; j++){
				animationFlag = flag[j];
				if (animationFlag) break;
			}	
		  if (animationFlag) {
	            requestAnimationFrame(function () {
	            circularGaugeObject._onAnimate(circularGaugeObject);
	            });
	        }
		}
        },
		
		_pointInterval: function (currentValue, pointerValue, delay, self) {
			 this.timer = setTimeout(function pointerchan() {
                if (pointerValue > currentValue) {
                    currentValue = currentValue + ((self.model.scales[0].maximum-self.model.scales[0].minimum)/100);
                    pointerValue > currentValue ? self.setPointerValue(0, 0, currentValue) : self.setPointerValue(0, 0, pointerValue);
                }
                else if (currentValue >= pointerValue) {
                    window.clearInterval(self.timer);
                }
				self._pointInterval(currentValue, pointerValue, delay, self);
               }, delay); 
		},
		 
        _setRanges: function () {
            var self = this;
            this._rangeCollectionRegions = [];
            $.each(this.model.scales, function (index, element) {
                if (element.showRanges) {
                    self.scaleIndex = index;
                    if (element.ranges != null) {
                        self.rangeEl = element.ranges;
                        $.each(element.ranges, function (rangeIndex, rangeElement) {
                            self.rangeIndex = rangeIndex;
                            if (rangeElement._visible || !self.model.legend.visible)
                               self._setRangeCordinates(rangeIndex, rangeElement);
                        });
                    }
                }
            });
        },
		 
        _setCustomLabel: function () {
            var self = this, currentCustomLabel;
            $.each(this.model.scales, function (index, element) {
                self.scaleIndex = index;
                if (element.customLabels !=null) {
                    self.customLabelEl = element.customLabels;
                    $.each(element.customLabels, function (labelIndex, labelElement) {
                        self.customLabelIndex = labelIndex;
						currentCustomLabel = self.model.scales[self.scaleIndex].customLabels[self.customLabelIndex];
						if (currentCustomLabel.value != null ) {
							if (currentCustomLabel.positionType == "outer")
								self._setOuterCustomLabels(labelIndex, labelElement);
							else
								self._setCustomLabelCordinates(labelIndex, labelElement);
						}
                    });
                }
            });
        },
	 
        _subGauge: function () {
            var self = this;
            $.each(this.model.scales, function (index, element) {
                self.scaleIndex = index;
                if (element.subGauges != null) {
                    self.subGaugeEl = element.subGauges;
                    $.each(element.subGauges, function (subGaugeIndex, subGaugeElement) {
                        self.subGaugeIndex = index;
                        self._setSubGauge(subGaugeIndex, subGaugeElement);
                    });
                }
            });
        },
        
        _setOuterCustomLabels: function (index, element) {
            this._customLblMaxSize = this._customLblMaxSize < parseFloat(element.font.size.match(/\d+/)[0]) ? parseFloat(element.font.size.match(/\d+/)[0]) : this._customLblMaxSize;
            var div = ej.buildTag("div."+this._id+"outercustomlbl");
            div.text(this.model.scales[this.scaleIndex].customLabels[index].value);
            var position=(this.model.outerCustomLabelPosition=="right" || this.model.outerCustomLabelPosition=="left")?"left":"center";
            this.outerDiv.append(div);
            this.outerDiv.append('</br>');
            if (position == "center")
                div.css({ 'display': 'inline-block', 'margin': '0 auto', 'max-width': this.model.width });
            else
                div.css({ 'display': 'inline-block', 'max-width': this.element.width() - this.model.width > 10 ? this.element.width() - this.model.width : 10 });
            div.css({
                "color": element.color,
                'overflow': 'hidden',
                'text-overflow': 'ellipsis',
                'white-space': 'nowrap',
                'font-size': (element.font != null && element.font.size != null) ? element.font.size : "12px",
                'font-family': (element.font != null && element.font.fontFamily != null) ? element.font.fontFamily : "Arial",
                'font-weight': (element.font != null && element.font.fontStyle != null) ? element.font.fontStyle : "Normal",
                'text-align': position
            });

        },
	 	
        _setScaleCordinates: function (element) {
            this.region = {
                "centerX": this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, "centerY": this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY,
                "startAngle": element.startAngle, "endAngle": (element.startAngle + element.sweepAngle),
                "startRadius": this.scaleEl[this.scaleIndex].radius - this.scaleEl[this.scaleIndex].size / 2, "endRadius": this.scaleEl[this.scaleIndex].radius + this.scaleEl[this.scaleIndex].size / 2
            };
            this.style = {
                "radius": element.radius - element.size / 2,
                "strokeStyle": (element.border.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.border.color), // this._getColor(element, element.borderColor),
                "lineWidth": element.border.width,
                "size": element.size,
                "isFill": true,
                "opacity": isNaN(element.opacity) ? 1 : element.opacity,
                "isStroke": true,
                "shadowOffset": element.shadowOffset,
                "fillStyle": (element.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.backgroundColor), //this._getColor(element, element.backgroundColor),
                "counterClockwise": element.direction == "clockwise" ? false : true
            };
            if (element.maximum < element.minimum) {
                var tempValue = element.maximum;
                element.maximum = element.minimum;
                element.minimum=tempValue;
            }
			 if (element.maximum == element.minimum)
                element.maximum = element.maximum + 1;
            this.maximum(element.maximum);
            this.minimum(element.minimum);
            if (this._notifyArrayChange) {
                this._notifyArrayChange("scales[" + this.scaleIndex + "]maximum", element.maximum);
                this._notifyArrayChange("scales[" + this.scaleIndex + "]minimum", element.minimum);
            }
            this._drawScaleBar(this.region, this.style);
            if (this.contextEl.getImageData){
				if(!ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
					this.scaleImage = this.contextEl.drawImage(this.contextEl.canvas,this.model.width, this.model.height);
				else
					this.scaleImage = this.contextEl.getImageData(0, 0, this.model.width, this.model.height);
			}
        },
		 	
        _drawOuterLayer: function () {
            var interiorGradient, startPoint, endPoint;
            if (this._isHalfCircle()) {
                startPoint = { "x": this.centerX, "y": this.centerY };
                endPoint = { "x": this.centerX + this.model.radius, "y": this.centerY / 2 };
            }
            if (!this.model.isRadialGradient) {
                interiorGradient = this.contextEl.createLinearGradient(0, 0, 0, this.canvasEl[0].height);
            }
            else {
                interiorGradient = this.contextEl.createRadialGradient(this.canvasEl[0].width / 2, this.canvasEl[0].height / 2, 0, this.canvasEl[0].width / 2, this.canvasEl[0].height / 2, this.model.radius);
            }
            if (!ej.isNullOrUndefined(this.model.interiorGradient))
                this._setGradientColor(this, interiorGradient, this.model.interiorGradient.colorInfo);

            this.frameOuterLocation = { "centerX": this.centerX, "hcCenterX": this.centerX, "hcCenterY": this.centerY, "centerY": this.centerY, "startAngle": this._isHalfCircle() ? Math.PI * ((this.model.frame.halfCircleFrameStartAngle) / 180) : 0, "endAngle": this._isHalfCircle() ? Math.PI * ((this.model.frame.halfCircleFrameEndAngle) / 180) : 2 * Math.PI };
            if (this._isHalfCircle())
                this.frameInnerLocation = { "centerX": this.centerX, "hcCenterX": this._getXCordinate(this.centerX, 0, (this.model.frame.halfCircleFrameStartAngle + this.model.frame.halfCircleFrameEndAngle) / 2), "hcCenterY": this._getYCordinate(this.centerX, 0, (this.model.frame.halfCircleFrameStartAngle + this.model.frame.halfCircleFrameEndAngle) / 2), "centerY": this.centerY, "startAngle": Math.PI * ((this.model.frame.halfCircleFrameStartAngle) / 180), "endAngle": Math.PI * ((this.model.frame.halfCircleFrameEndAngle) / 180) };
            this.frameInnerStyle = {
                "radius": this.model.radius,
                "isStroke": false, "isFill": true,
                "fillStyle": (this.model.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(null, this.model.backgroundColor),
                "counterClockwise": false
            };
            if (this.model.frame.frameType.toLowerCase() == "fullcircle") {
                this._drawCircleFrame(this.frameOuterLocation, this.frameInnerStyle);
            }
            else if (this.model.frame.frameType.toLowerCase() == "halfcircle") {
                this._drawHalfCircle(this.frameInnerLocation, this.frameInnerStyle);
            }
            if (this.contextEl.getImageData){
				if(!ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
					this.outerImage = this.contextEl.drawImage(this.contextEl.canvas,this.model.width, this.model.height);
				else 
					this.outerImage = this.contextEl.getImageData(0, 0, this.model.width, this.model.height);
			}
        },
		 
        _setTicksCordinates: function (index, element) {
            var startX, startY, lineHeight, minimumMeet, interval, radius, angle;
            if (element.type == "major") {
                interval = this.scaleEl[this.scaleIndex].majorIntervalValue;
                this.majorTickHeight = element.height;
            }
            else {
                interval = this.scaleEl[this.scaleIndex].minorIntervalValue;
            }
            if (element.placement == "far")
                radius = this.scaleEl[this.scaleIndex].radius + this.scaleEl[this.scaleIndex].size / 2 + this.scaleEl[this.scaleIndex].border.width / 2 + element.distanceFromScale;
            if (element.placement == "center")
                radius = this.scaleEl[this.scaleIndex].radius - element.height / 2 - this.scaleEl[this.scaleIndex].border.width / 2 - element.distanceFromScale;
            if (element.placement == "near")
                radius = this.scaleEl[this.scaleIndex].radius - this.scaleEl[this.scaleIndex].size / 2 - this.scaleEl[this.scaleIndex].border.width / 2 - element.distanceFromScale;
            lineHeight = element.placement == "near" ? -element.height : element.height;
            for (var value = this.scaleEl[this.scaleIndex].maximum; value >= this.scaleEl[this.scaleIndex].minimum; value -= interval) {
                if (interval == this.scaleEl[this.scaleIndex].minorIntervalValue && value % this.scaleEl[this.scaleIndex].majorIntervalValue != 0 || interval == this.scaleEl[this.scaleIndex].majorIntervalValue) {
                    if (value == this.scaleEl[this.scaleIndex].minimum)
                        minimumMeet = true;
                    angle = this._getAngle(value);
                    angle = angle > 360 ? angle - 360 : angle;
                    startX = this._getXCordinate(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, radius, angle);
                    startY = this._getYCordinate(this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, radius, angle);
                    this.region = { "startX": startX, "startY": startY };
                    this.style = { "angle": element.angle + angle, "isStroke": true, "isFill": false, "lineHeight": lineHeight, "lineWidth": element.width, "strokeStyle": (element.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.color) };
                    if (this.model.drawTicks)
                        this._onDrawTicks(angle, value);
                    this._drawTickMark(this.region, this.style);
                }
            }
            if (!minimumMeet) {
                angle = this._getAngle(this.scaleEl[this.scaleIndex].minimum);
                angle = angle > 360 ? angle - 360 : angle;
                startX = this._getXCordinate(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, radius, angle);
                startY = this._getYCordinate(this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, radius, angle);
                this.region = { "startX": startX, "startY": startY };
                this.style = { "angle": element.angle + angle, "isStroke": true, "isFill": false, "lineHeight": lineHeight, "lineWidth": element.width, "strokeStyle": (element.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.color) };
                //if (this.model.drawTicks)
                //    this._onDrawTicks(angle, value);
                //this._drawTickMark(this.region, this.style);
            }

            if (this.contextEl.getImageData){
				if(!ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
					this.tickImage = this.contextEl.drawImage(this.contextEl.canvas,this.model.width, this.model.height);
				else 
					this.tickImage = this.contextEl.getImageData(0, 0, this.model.width, this.model.height);
			}
        },
		 
        _setLabelCoridnates: function (index, element) {
            var minimumMeet;
            var startX, startY, lineHeight, incrementAngle, interval, radius;
            interval = element.type == "major" ? this.scaleEl[this.scaleIndex].majorIntervalValue : this.scaleEl[this.scaleIndex].minorIntervalValue;
            incrementAngle = element.type == "major" ? (this.majorIntervalAngle = this.scaleEl[this.scaleIndex].sweepAngle / ((this.scaleEl[this.scaleIndex].maximum - this.scaleEl[this.scaleIndex].minimum) / interval)) : this.scaleEl[this.scaleIndex].sweepAngle / ((this.scaleEl[this.scaleIndex].maximum - this.scaleEl[this.scaleIndex].minimum) / interval);
            if (element.placement == "far")
                radius = this.scaleEl[this.scaleIndex].radius + this.scaleEl[this.scaleIndex].size / 2 + this.majorTickHeight + element.distanceFromScale;
            if (element.placement == "center")
                radius = this.scaleEl[this.scaleIndex].radius - 10 - element.distanceFromScale;
            if (element.placement == "near")
                radius = this.scaleEl[this.scaleIndex].radius - this.scaleEl[this.scaleIndex].size / 2 - 10 - this.majorTickHeight - element.distanceFromScale;
            this._labelRadius = radius;
            for (var value = this.scaleEl[this.scaleIndex].maximum; value >= this.scaleEl[this.scaleIndex].minimum; value = this._subtractDecimal(value, interval)) {
                if (value == this.scaleEl[this.scaleIndex].minimum)
                    minimumMeet = true;
                if (interval == this.scaleEl[this.scaleIndex].minorIntervalValue && value % this.scaleEl[this.scaleIndex].majorIntervalValue != 0 || interval == this.scaleEl[this.scaleIndex].majorIntervalValue) {
                    if (value == this.scaleEl[this.scaleIndex].minimum && !element.includeFirstValue) {
                        continue;
                    }
                    var angle = this._getAngle(value);
                    angle = angle > 360 ? angle - 360 : angle;
                    startX = this._getXCordinate(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, radius, angle);
                    startY = this._getYCordinate(this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, radius, angle);
                    this.region = { "startX": startX, "startY": startY };
                    this.style = { "placement": element.placement, "textPositionAngle": angle, "angle": this.scaleEl[this.scaleIndex].labels[this.labelIndex].autoAngle ? angle + element.angle : element.angle, "isStroke": false, "isFill": true, "textValue": value, "opacity": !(element.opacity) ? 1 : element.opacity, "font": this._getFontString(element, element.font), "fillStyle": (element.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.color) };
                    if (this.model.drawLabels)
                        this._onDrawLabels(this.scaleEl[this.scaleIndex].labels[this.labelIndex].autoAngle ? angle + element.angle : element.angle, value);
                    this._drawLabel(this.region, this.style, false);
                    if (this.model.tooltip.showLabelTooltip)
                        this._savedPoints.push({ "startX": startX - 10, "startY": startY-5, "width": 20, "height": parseInt(element.font.size.replace(/\D/g, '')), "value": value });
                }
            }
            if (!minimumMeet) {
                angle = this._getAngle(this.scaleEl[this.scaleIndex].minimum);
                angle = angle > 360 ? angle - 360 : angle;
                startX = this._getXCordinate(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, radius, angle);
                startY = this._getYCordinate(this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, radius, angle);
                this.region = { "startX": startX, "startY": startY };
                this.style = { "angle": this.scaleEl[this.scaleIndex].labels[this.labelIndex].autoAngle ? angle + element.angle : element.angle, "isStroke": false, "isFill": true, "textValue": this.scaleEl[this.scaleIndex].minimum, "opacity": !(element.opacity) ? 1 : element.opacity, "font": this._getFontString(element, element.font), "lineHeight": lineHeight, "lineWidth": element.width, "fillStyle": (element.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.color) };
                if (this.model.drawLabels)
                    this._onDrawLabels(angle, value);
                this._drawLabel(this.region, this.style, false);
                if (this.model.tooltip.showLabelTooltip)
                     this._savedPoints.push({ "startX": startX - 10, "startY": startY-5, "width": 20, "height": parseInt(element.font.size.replace(/\D/g, '')), "value": value });
                angle = this._getAngle(value);
                angle = angle > 360 ? angle - 360 : angle;
            }
            if (this.contextEl.getImageData){
				if(!ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
					this.labelImage = this.contextEl.drawImage(this.contextEl.canvas,this.model.width, this.model.height);
				else
					this.labelImage = this.contextEl.getImageData(0, 0, this.model.width, this.model.height);
			}
        },
		 
        _setRangeCordinates: function (index, element) {
                if (element.startValue < this.scaleEl[this.scaleIndex].maximum&& element.endValue <= this.scaleEl[this.scaleIndex].maximum) {
                    var tempRangeStart = element.startValue >= this.scaleEl[this.scaleIndex].minimum ? element.startValue : this.scaleEl[this.scaleIndex].minimum;
                    var tempRangeEnd = element.endValue > this.scaleEl[this.scaleIndex].maximum ? this.scaleEl[this.scaleIndex].maximum : element.endValue;
                var startX, startY, endX, endY, startAngle, radius, endAngle, startRadius, endRadius, grd, controlAngle;
                controlAngle = this._getAngle((tempRangeStart + tempRangeEnd) / 2);
                startAngle = this._getAngle(tempRangeStart);
                endAngle = this._getAngle(tempRangeEnd);
                radius = this.scaleEl[this.scaleIndex].radius - element.distanceFromScale - this.scaleEl[this.scaleIndex].size / 2 - element.size - (ej.isNullOrUndefined(this.scaleEl[this.scaleIndex].ticks[0]) ? 16 : this.scaleEl[this.scaleIndex].ticks[0].height);
                startRadius = this.scaleEl[this.scaleIndex].radius - element.distanceFromScale - this.scaleEl[this.scaleIndex].size / 2 - (ej.isNullOrUndefined(this.scaleEl[this.scaleIndex].ticks[0]) ? 16 : this.scaleEl[this.scaleIndex].ticks[0].height);
                endRadius = this.scaleEl[this.scaleIndex].radius - element.distanceFromScale - element.size - this.scaleEl[this.scaleIndex].size / 2 - (ej.isNullOrUndefined(this.scaleEl[this.scaleIndex].ticks[0]) ? 16 : this.scaleEl[this.scaleIndex].ticks[0].height);
                startX = this._getXCordinate(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, radius, startAngle);
                startY = this._getYCordinate(this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, radius, startAngle);
                endX = this._getXCordinate(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, radius, endAngle);
                endY = this._getYCordinate(this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, radius, endAngle);
                startAngle = (180 * this._getCirucumferenceAngle({ "x": this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, "y": this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY }, { "x": startX, "y": startY })) / Math.PI;
                if( element.startValue != 0 || element.endValue != this.scaleEl[this.scaleIndex].maximum){
					endAngle = (180 * this._getCirucumferenceAngle({ "x": this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, "y": this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY }, { "x": endX, "y": endY })) / Math.PI;
				}

                if (!ej.isNullOrUndefined(element.gradients) && element.gradients.colorInfo.length > 0) {
                    grd = this.contextEl.createRadialGradient(this.centerX, this.centerY, endRadius, this.centerX, this.centerY, startRadius);
                    this._setGradientColor(this, grd, element.gradients.colorInfo);
                } else
                    grd = (element.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.backgroundColor); // this._getColor(element, element.backgroundColor);
                this.region = { "startX": startX, "startY": startY, "endX": endX, "endY": endY, "startAngle": startAngle, "endAngle": endAngle };
                this.style = {
                    "placement":element.placement,
                    "radius": element.placement=="near"?this.scaleEl[this.scaleIndex].radius - element.distanceFromScale:this.scaleEl[this.scaleIndex].radius + element.distanceFromScale,
                    "rangeStart": tempRangeStart,
                    "rangeEnd": tempRangeEnd,
                    "startWidth": element.startWidth,
                    "isFill": true,
                    "fillStyle": grd,
                    "strokeStyle": (element.border.color == "transparent") ? "rgba(0,0,0,0)" : element.border.color, // element.borderColor,
                    "opacity": isNaN(element.opacity) ? 1 : element.opacity,
                    "counterClockwise": this.scaleEl[this.scaleIndex].direction == "clockwise" ? false : true,
                    "startRadius": startRadius, "endRadius": endRadius, "endWidth": element.endWidth, "lineWidth": element.border.width, "isStroke": true
                };
                if (this.model.drawRange)
                    this._onDrawRange(this.region, this.style);
                this._rangeCollectionRegions.push({ Range:element, Region: this.region, scaleIndex: this.scaleIndex, rangeIndex: this.rangeIndex, Radius: { startRadius: this.style.startRadius, endRadius: this.style.endRadius }, centerRadius: { centerX: this.centerX, centerY: this.centerY, radius: this.style.radius } });
                this._drawRange(this.region, this.style);
                if (this.contextEl.getImageData){
					if(!ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
						this.rangeImage = this.contextEl.drawImage(this.contextEl.canvas,this.model.width, this.model.height);
					else
						this.rangeImage = this.contextEl.getImageData(0, 0, this.model.width, this.model.height);
				}
                }
        },
		 
        _setSubGauge: function (index, element) {
            var subGaugeDiv = $('div[id=' + element.controlID + ']');
            if (subGaugeDiv.length > 0 && subGaugeDiv.find('canvas').length) {
                var sourceCanvas = subGaugeDiv.find('canvas')[0].getContext('2d');
                this.contextEl.drawImage(sourceCanvas.canvas, element.position.x, element.position.y, element.width, element.height);
                subGaugeDiv.css('display', 'none');
                if (this.contextEl.getImageData){
					if(!ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
						this.subGaugeImage = this.contextEl.drawImage(this.contextEl.canvas,this.model.width, this.model.height);
					else
						this.subGaugeImage = this.contextEl.getImageData(0, 0, this.model.width, this.model.height);
				}
            }
        },
		 
        _setCustomLabelCordinates: function (index, element) {
            this._customLblMaxSize = this._customLblMaxSize < parseFloat(element.font.size.match(/\d+/)[0]) ? parseFloat(element.font.size.match(/\d+/)[0]) : this._customLblMaxSize;
            element.color = element.color ? (element.color) : "#282828";
            this.region = element.position ? ({ "startX": element.position.x, "startY": element.position.y }) : { "startX": 0, "startY": 0 };
            this.style = { "angle": element.textAngle, "textValue": element.value, "fillStyle": (element.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.color), "font": this._getFontString(element, element.font) };
            if (this.model.drawCustomLabel)
                this._onDrawCustomLabel(this.region, this.style);
            this._drawLabel(this.region, this.style, true);
            if (this.model.tooltip.showCustomLabelTooltip)
                this._savedPoints.push({ "startX": this.region.startX-30, "startY": this.region.startY-5, "width": 60, "height": !ej.isNullOrUndefined(element.font) ? parseInt(element.font.size.replace(/\D/g, '')) : 10, "value": this.style.textValue });
            if (this.contextEl.getImageData){
				if(!ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
					this.customLabelImage = this.contextEl.drawImage(this.contextEl.canvas,this.model.width, this.model.height);
				else
					this.customLabelImage = this.contextEl.getImageData(0, 0, this.model.width, this.model.height);
			}
        },
	 
        _drawIndicator: function (index, element) {
            var self = this, isInStateRange = false, indicatorType = element.type.toLowerCase(); 
            this.region = { "centerX": element.position.x - element.width / 2, "startX": element.position.x, "startY": element.position.y, "textLocation": element.position, "centerY": element.position.y - element.height / 2, "startAngle": 0, "endAngle": 2 * Math.PI };
            this.style = {
                "radius": element.width / 2,
                "strokeStyle": "#2BA104",
                "cornerRadius": element.type == "roundedrectangle" ? 2 : 0,
                "height": element.height,
                "width": element.width,
                "lineWidth": element.indicatorBorderWidth,
                "fillStyle": "#2BA104",
                "isStroke": true,
                "isFill": true,
                "indicatorText": element.indicatorText,
                "textColor": null,
                "font": null,
                "counterClockwise": false
            };
            if (this.model.drawIndicators)
                this._onDrawIndicators(this.style, this.region);
            if (indicatorType == ej.datavisualization.CircularGauge.IndicatorType.Image) {
                var image = new Image();
                image.onload = function () {
                    self.contextEl.drawImage(this, element.position.x, element.position.y);
                };
                image.src = element.imageUrl;
            }
            else if (element.stateRanges != null) {
                $.each(element.stateRanges, function (stateRangeIndex, srEl) {//srEl = StateRange Element
                    if (self.pointerEl[self.pointerIndex].value >= srEl.startValue && self.pointerEl[self.pointerIndex].value <= srEl.endValue) {
                        isInStateRange = true;
                        if (!ej.isNullOrUndefined(srEl.text) && srEl.text.length > 0) {
                            self.style.indicatorText = srEl.text;
                            self.style.textColor = (srEl.textColor == "transparent") ? "rgba(0,0,0,0)" : srEl.textColor; // srEl.textColor;
                            self.style.font = element.font;
                        }
                        self.style.strokeStyle = (srEl.borderColor == "transparent") ? "rgba(0,0,0,0)" : srEl.borderColor;
                        self.style.fillStyle = (srEl.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : srEl.backgroundColor;
                        self._drawIndicatorFrame(indicatorType, self.region, self.style);
                    }
					else{
						self.style.strokeStyle = (srEl.borderColor == "transparent") ? "rgba(0,0,0,0)" : srEl.borderColor;
						self.style.fillStyle = (srEl.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : srEl.backgroundColor;
					}
                });
            }
            if (!isInStateRange && indicatorType != ej.datavisualization.CircularGauge.IndicatorType.Image) {
                self._drawIndicatorFrame(indicatorType, self.region, self.style);
            }
            if (this.contextEl.getImageData && indicatorType != ej.datavisualization.CircularGauge.IndicatorType.Image) {
				if(!ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
					this.indicatorImage = this.contextEl.drawImage(this.contextEl.canvas,this.model.width, this.model.height);
				else
					this.indicatorImage = this.contextEl.getImageData(0, 0, this.model.width, this.model.height);
			}
        },

        _drawIndicatorFrame: function(type, location,style) {
            switch (type) {
                case "circle":
                    this._drawIndicatorCircle(location, style);
                    break;
                case "roundedrectangle":
                case "rectangle":
                    this._drawRectangleFrame(location, style);
                    break;
                case "text":
                    this._drawText(location, style);
                    break;
				case "triangle":
				    this._drawIndicatorTriangle(location, style, this)
					 break;
				case "diamond":
					this._drawDiamond(location, style, this);
					break;
				case "trapezoid":
					 this._drawTrapezoid(location, style, this);
					 break;
			    case "pentagon":
					 this._drawPentagon(location, style, this);
					 break;
			    case "wedge":
					 this._drawWedge(location, style, this);
					 break;
				case "star":
					this._drawIndicatorStar(location, style, this);
					break;
				case "ellipse":
					this._drawIndicatorEllipse(location, style, this);
					break;
				case "horizontalline":
					this._drawHorizontalLine(location, style, this);
					break;
				case "verticalline":
					this._drawVerticalLine(location, style, this);
					break;
				case "cross":
				    this._drawCross(location, style, this);
					break;
				case "uparrow":
				    this._drawUpArrow(location, style, this);
					break;
				case "downarrow":
				    this._drawDownArrow(location, style, this);
					break;
				case "invertedtriangle":
				    this._drawIndicatorInvertedTriangle(location, style, this);
					break;
				case "leftarrow":
				    this._drawLeftArrow(location, style, this);
					break;
				case "rightarrow":
				    this._drawRightArrow(location, style, this);
					break;
            }
        },
		 	
        _drawScaleBar: function (location, style) {
            this.contextEl.shadowColor = (style.strokeStyle == "transparent") ? "rgba(0,0,0,0)" : style.strokeStyle;
            if (style.shadowOffset)
                this.contextEl.shadowBlur = style.shadowOffset;
            this._contextOpenPath(style, this);
            if ((location.endAngle - location.startAngle) == 0)
                this.contextEl.arc(location.centerX, location.centerY, location.startRadius, Math.PI * (0 / 180), Math.PI * (0 / 180), false);
            else if ((location.endAngle - location.startAngle) % 360 == 0) {
                this.contextEl.arc(location.centerX, location.centerY, location.startRadius, Math.PI * (0 / 180), Math.PI * (360 / 180), false);
                this.contextEl.arc(location.centerX, location.centerY, location.endRadius, Math.PI * (360 / 180), Math.PI * (0 / 180), true);
            }
            else {
                this.contextEl.arc(location.centerX, location.centerY, location.startRadius, Math.PI * (location.startAngle / 180), Math.PI * (location.endAngle / 180), false);
                this.contextEl.arc(location.centerX, location.centerY, location.endRadius, Math.PI * (location.endAngle / 180), Math.PI * (location.startAngle / 180), true);
            }
            this._contextClosePath(style, this);
        },
		 
        _drawTickMark: function (location, style) {
            this._contextOpenPath(style, this);
            this.contextEl.translate(location.startX, location.startY);
            this.contextEl.lineTo(0, 0);
            this.contextEl.rotate((Math.PI * (style.angle / 180)));
            this.contextEl.lineTo(style.lineHeight, 0);
            this._contextClosePath(style, this);
        },
	 
        _drawLabel: function (location, style, isCustomLabel) {
            var distanceFactor = 0, locale = this.model.locale;
            if (!ej.isNullOrUndefined(isCustomLabel) && !isCustomLabel) {
                var textPostion = this.model.scales[this.scaleIndex].labels[this.labelIndex].unitTextPosition;
               style.textValue = ((style.textValue % 1 != 0 && typeof style.textValue != "string") ? + parseFloat(style.textValue.toFixed(3)) : style.textValue); 
			    style.textValue = ((locale && this.model.enableGroupSeparator) ? style.textValue.toLocaleString(locale) : style.textValue);
				if (!ej.isNullOrUndefined(textPostion) && textPostion.toString() == "back")
					style.textValue += this.model.scales[this.scaleIndex].labels[this.labelIndex].unitText;
                else if (!ej.isNullOrUndefined(textPostion) && textPostion.toString() == "front")
                    style.textValue = this.model.scales[this.scaleIndex].labels[this.labelIndex].unitText + style.textValue;
                distanceFactor = this._calcDistanceFactor(style.textPositionAngle, style.placement, this._calFontLength(style.font));
            }
            this._contextOpenPath(style, this);
            this.contextEl.textAlign = "center";
            this.contextEl.textBaseline = "middle";
            this.contextEl.font = style.font;
            this.contextEl.translate(location.startX + distanceFactor, location.startY);
            this.contextEl.lineTo(0, 0);
			if(!isCustomLabel)
			    this.scaleEl[this.scaleIndex].labels[this.labelIndex].autoAngle ? this.contextEl.rotate((Math.PI * ((style.angle - 270) / 180))) : this.contextEl.rotate((Math.PI * (style.angle / 180)));
			else if (isCustomLabel && style.angle != 0)
			    this.contextEl.rotate((Math.PI * (style.angle / 180)));
            this.contextEl.fillText(style.textValue, 0, 0);
            this._contextClosePath(style, this);
        },
		 
        _drawCircleFrame: function (location, style) {
            this._contextOpenPath(style, this);
            this.contextEl.arc(location.centerX, location.centerY, style.radius, location.startAngle, location.endAngle, style.counterClockwise);
            this._contextClosePath(style, this);
            if (style.indicatorText)
                this._drawText(location, style);
        },
		
		 _drawIndicatorCircle: function (location, style) {
            this._contextOpenPath(style, this);
            this.contextEl.arc(location.startX + (style.width/2), location.startY , style.radius, location.startAngle, location.endAngle, style.counterClockwise);
            this._contextClosePath(style, this);
            if (style.indicatorText)
                this._drawText(location, style);
        },
		 
        _drawHalfCircle: function (location, style) {
            this._contextOpenPath(style, this);
            this.contextEl.lineJoin = "round";
            this.contextEl.arc(location.centerX, location.centerY, style.radius, location.startAngle, location.endAngle, false);
            this.contextEl.lineTo(location.centerX, location.centerY);
            this._contextClosePath(style, this);
        },
		 
        _drawRectangleFrame: function (location, style) {
            this._contextOpenPath(style, this);
            this.contextEl.translate(location.startX, location.startY - style.height / 2);
            this.contextEl.lineTo(style.cornerRadius, 0);
            this.contextEl.lineTo(style.width - style.cornerRadius, 0);
            this.contextEl.quadraticCurveTo(style.width, 0, style.width, style.cornerRadius);
            this.contextEl.lineTo(style.width, style.height - style.cornerRadius);
            this.contextEl.quadraticCurveTo(style.width, style.height, style.width - style.cornerRadius, style.height);
            this.contextEl.lineTo(style.cornerRadius, style.height);
            this.contextEl.quadraticCurveTo(0, style.height, 0, style.height - style.cornerRadius);
            this.contextEl.lineTo(0, style.cornerRadius);
            this.contextEl.quadraticCurveTo(0, 0, style.cornerRadius, 0);
            this._contextClosePath(style, this);
            if (style.indicatorText)
                this._drawText(location, style);
        },
	 
        _drawText: function (location, style) {
            this.contextEl.beginPath();
            this.contextEl.textAlign = "center";
            this.contextEl.fillStyle = (style.textColor == "transparent") ? "rgba(0,0,0,0)" : style.textColor;
            this.contextEl.font = style.font;
            this.contextEl.fillText(style.indicatorText, location.textLocation.x, location.textLocation.y);
            this.contextEl.closePath();
        },
		 	
        _drawRange: function (location, style) {
            if(style.startWidth == null && style.endWidth == null){
            this._contextOpenPath(style, this);
            this.contextEl.arc(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, style.startRadius, Math.PI * (location.startAngle / 180), Math.PI * (location.endAngle / 180), style.counterClockwise);
            this.contextEl.arc(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, style.endRadius, Math.PI * (location.endAngle / 180), Math.PI * (location.startAngle / 180), !style.counterClockwise);
            this._contextClosePath(style, this);
            }
            else {
                var widthDifference = style.startWidth > style.endWidth ? style.startWidth - style.endWidth : style.endWidth - style.startWidth;
                var angleDifference = this.scaleEl[this.scaleIndex].direction == "clockwise" ? location.startAngle < location.endAngle ? location.endAngle - location.startAngle : 360 - (location.startAngle - location.endAngle) : location.endAngle < location.startAngle ? location.startAngle - location.endAngle : location.startAngle + (360 - location.endAngle);
                var degreeDifference = angleDifference / (widthDifference * 2);
                if (style.startWidth < style.endWidth) {
                    if (style.startWidth != 0) {
                        this._contextOpenPath(style, this);
                        this.contextEl.arc(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, style.radius, Math.PI * (location.startAngle / 180), Math.PI * (location.endAngle / 180), style.counterClockwise);
                        this.contextEl.arc(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, style.placement == "near" ? style.radius - style.startWidth : style.radius + style.startWidth, Math.PI * (location.endAngle / 180), Math.PI * (location.startAngle / 180), !style.counterClockwise);
                        this._contextClosePath(style, this);
                    }
                    style.radius = style.placement == "near" ? style.radius - style.startWidth : style.radius + style.startWidth;
                    style.endWidth -= style.startWidth;
                    style.startWidth = 0;
                    for (var i = style.startWidth; i < style.endWidth; i += 0.5) {
                        this.contextEl.beginPath();
                        this.contextEl.arc(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, style.radius, Math.PI * (location.endAngle / 180) , Math.PI * (location.startAngle / 180) , !style.counterClockwise);
                        this.contextEl.lineWidth = 2;
                        this.contextEl.strokeStyle = style.fillStyle;
                        this.contextEl.stroke();
                        this.contextEl.restore();
                        location.startAngle = this.scaleEl[this.scaleIndex].direction == "clockwise" ? location.startAngle + degreeDifference : location.startAngle - degreeDifference;;
                        style.radius = style.placement == "near" ? style.radius - 0.5 : style.radius + 0.5;
                    }
                }
                else {
                    if (style.endWidth != 0) {
                        this._contextOpenPath(style, this);
                        this.contextEl.arc(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, style.radius, Math.PI * (location.startAngle / 180), Math.PI * (location.endAngle / 180), style.counterClockwise);
                        this.contextEl.arc(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, style.placement == "near" ? style.radius - style.endWidth : style.radius + style.endWidth, Math.PI * (location.endAngle / 180), Math.PI * (location.startAngle / 180), !style.counterClockwise);
                        this._contextClosePath(style, this);
                    }
                    style.radius = style.placement == "near" ? style.radius - style.endWidth : style.radius + style.endWidth;
                    style.startWidth -= style.endWidth;
                    style.endWidth = 0;
                    for (i = style.endWidth; i < style.startWidth; i += 0.5) {
                        this.contextEl.beginPath();
                        this.contextEl.arc(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, style.radius,Math.PI * (location.startAngle / 180), Math.PI * (location.endAngle / 180),  style.counterClockwise);
                        this.contextEl.lineWidth = 2;
                        this.contextEl.strokeStyle = style.fillStyle;
                        this.contextEl.stroke();
                        this.contextEl.restore();
                        location.endAngle = this.scaleEl[this.scaleIndex].direction == "clockwise" ? location.endAngle - degreeDifference : location.endAngle + degreeDifference;
                        style.radius = style.placement == "near" ? style.radius - 0.5 : style.radius + 0.5;
                    }
                }
            }
        },
		 
        _drawPointers: function (index, element) {
            element.value = element.value > this.scaleEl[this.scaleIndex].maximum ? this.scaleEl[this.scaleIndex].maximum : element.value;
            element.value = element.value < this.scaleEl[this.scaleIndex].minimum ? this.scaleEl[this.scaleIndex].minimum : element.value;
            var startX, startY, angle, height, grd, locale = this.model.locale;
            angle = this._getAngle(element.value);
            angle = angle > 360 ? angle - 360 : angle;
            if (element.type == "needle") {
                if (element.placement == "far")
                    height = element.length + this.scaleEl[this.scaleIndex].size / 2;
                if (element.placement == "center")
                    height = element.length;
                if (element.placement == "near")
                    height = element.length - this.scaleEl[this.scaleIndex].size / 2;
            }
            else {
                height = element.length;
                if (element.placement == "far") {
                    startX = this._getXCordinate(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this.scaleEl[this.scaleIndex].radius + this.scaleEl[this.scaleIndex].size / 2 + element.distanceFromScale, angle);
                    startY = this._getYCordinate(this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerX, this.scaleEl[this.scaleIndex].radius + this.scaleEl[this.scaleIndex].size / 2 + element.distanceFromScale, angle);
                }
                if (element.placement == "center") {
                    startX = this._getXCordinate(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this.scaleEl[this.scaleIndex].radius - this.scaleEl[this.scaleIndex].size / 2 - element.distanceFromScale, angle);
                    startY = this._getYCordinate(this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerX, this.scaleEl[this.scaleIndex].radius - this.scaleEl[this.scaleIndex].size / 2 - element.distanceFromScale, angle);
                }
                if (element.placement == "near") {
                    startX = this._getXCordinate(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this.scaleEl[this.scaleIndex].radius - this.scaleEl[this.scaleIndex].size / 2 - element.distanceFromScale - this.majorTickHeight - 15, angle);
                    startY = this._getYCordinate(this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerX, this.scaleEl[this.scaleIndex].radius - this.scaleEl[this.scaleIndex].size / 2 - element.distanceFromScale - this.majorTickHeight - 15, angle);
                }
                if (!(this._isHalfCircle && this._isHalfCircle())) {
                    if (this.model.height > this.model.width)
                        startY += (this.model.height - this.model.width) / 2;
                    else if (this.model.height < this.model.width)
                        startY -= (this.model.width - this.model.height) / 2;
                }
            }
            if (height > this.model.radius)
                height = this.model.radius;

            this.region = { "startX": element.type == "needle" ? this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX : startX, "startY": element.type == "needle" ? this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY : startY };
            if (!ej.isNullOrUndefined(element.gradients) && element.gradients.colorInfo.length > 0) {
                grd = this.contextEl.createLinearGradient(0, 0, 0, element.width);
                this._setGradientColor(this, grd, element.gradients.colorInfo);
            } else
                grd = (element.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.backgroundColor);
            this.style = {
                "width": element.width,
                "isFill": true,
                "isStroke": true,
                "radius": 0,
                "showBackNeedle": element.showBackNeedle,
                "backNeedleLength": element.backNeedleLength,
                "angle": element.type == "needle" ? angle : element.placement == "far" ? angle : angle + 180,
                "height": height, "lineWidth": element.border.width, "opacity": isNaN(element.opacity) ? 1 : element.opacity,
                "strokeStyle": (element.border.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.border.color),
                "fillStyle": grd,
                "imageUrl": element.imageUrl,
                "type":element.type,
            };
            if (this.model.drawPointers)
                this._onDrawPointers(angle, element.value);
            if (element.type == "needle") {
                this._drawNeedlePointer(this.region, this.style, element);
                this._setPointerCap(element);
            }
            else {
                if (element.markerType == "roundedrectangle")
                    this.style.radius = 5;
                this._drawMarkerType(element.markerType, this.region, this.style);
            }
            if (element.pointerValueText.showValue) {
                startX = this._getXCordinate(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this._labelRadius + element.pointerValueText.distance, angle);
                startY = this._getYCordinate(this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, this._labelRadius + element.pointerValueText.distance, angle);
                this.region = { "startX": startX, "startY": startY };
                this.style = { "angle": element.pointerValueText.autoAngle ? element.pointerValueText.angle + angle : element.pointerValueText.angle, "textValue": (locale && this.model.enableGroupSeparator) ? element.value.toLocaleString(locale) : element.value, "fillStyle": (element.pointerValueText.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.pointerValueText.color), "font": this._getFontString(element, element.pointerValueText.font), "opacity": element.pointerValueText.opacity };
                this._drawPointerValueText(this.region, this.style);
            }
            if (this.contextEl.getImageData){
				if(!ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
					this.pointerImage = this.contextEl.drawImage(this.contextEl.canvas,this.model.width, this.model.height);
				else
					this.pointerImage = this.contextEl.getImageData(0, 0, this.model.width, this.model.height);
			}
            if (this._notifyArrayChange)
                this._notifyArrayChange("scales[" + this.scaleIndex + "]pointers[" + index + "]value", element.value);
            this.value(element.value);
        },
        _drawPointerValueText: function (location, style) {
            this._contextOpenPath(style, this);
            this.contextEl.textAlign = "center";
            this.contextEl.textBaseline = "middle";
            this.contextEl.font = style.font;
            this.contextEl.translate(location.startX , location.startY);
            this.contextEl.lineTo(0, 0);
            this.scaleEl[this.scaleIndex].pointers[this.pointerIndex].pointerValueText.autoAngle ? this.contextEl.rotate((Math.PI * ((style.angle - 270) / 180))) : this.contextEl.rotate((Math.PI * (style.angle / 180)));
            this.contextEl.fillText(style.textValue, 0, 0);
            this._contextClosePath(style, this);
        },
        
        _drawMarkerType: function (type, location, style) {
            switch (type) {
                case "rectangle":
                    this._drawRectangle(location, style, this);
                    if ((!ej.isNullOrUndefined(style.imageUrl)) || style.imageUrl != "")
                        this._drawImagePointer(location, style, this);
                    break;
                case "triangle":
                    this._drawTriangle(location, style, this);
                    if ((!ej.isNullOrUndefined(style.imageUrl)) || style.imageUrl != "")
                        this._drawImagePointer(location, style, this);
                    break;
                case "ellipse":
                    this._drawEllipse(location, style, this);
                    if ((!ej.isNullOrUndefined(style.imageUrl)) || style.imageUrl != "")
                        this._drawImagePointer(location, style, this);
                    break;
                case "diamond":
                    this._drawDiamond(location, style, this);
                    if ((!ej.isNullOrUndefined(style.imageUrl)) || style.imageUrl != "")
                        this._drawImagePointer(location, style, this);
                    break;
                case "pentagon":
                    this._drawPentagon(location, style, this);
                    if ((!ej.isNullOrUndefined(style.imageUrl)) || style.imageUrl != "")
                        this._drawImagePointer(location, style, this);
                    break;
                case "circle":
                    this._drawCircle(location, style, this);
                    if ((!ej.isNullOrUndefined(style.imageUrl)) || style.imageUrl != "")
                        this._drawImagePointer(location, style, this);
                    break;
                case "slider":
                    this._drawSlider(location, style, this);
                    if ((!ej.isNullOrUndefined(style.imageUrl)) || style.imageUrl != "")
                        this._drawImagePointer(location, style, this);
                    break;
                case "pointer":
                    this._drawPointer(location, style, this);
                    if ((!ej.isNullOrUndefined(style.imageUrl)) || style.imageUrl != "")
                        this._drawImagePointer(location, style, this);
                    break;
                case "wedge":
                    this._drawWedge(location, style, this);
                    if ((!ej.isNullOrUndefined(style.imageUrl)) || style.imageUrl != "")
                        this._drawImagePointer(location, style, this);
                    break;
                case "trapezoid":
                    this._drawTrapezoid(location, style, this);
                    if ((!ej.isNullOrUndefined(style.imageUrl)) || style.imageUrl != "")
                        this._drawImagePointer(location, style, this);
                    break;
                case "roundedrectangle":
                    this._drawRoundedRectangle(location, style, this);
                    if ((!ej.isNullOrUndefined(style.imageUrl)) || style.imageUrl != "")
                        this._drawImagePointer(location, style, this);
                    break;
                case "image":
                    this._drawImagePointer(location, style, this);
                    break;
            }
        },

	 
        _drawNeedlePointer: function (location, style, element) {
            if (this.pointerEl[this.pointerIndex].needleType == "image") {
                this._drawImagePointer(location, style, element);
            }
            else{
            this._contextOpenPath(style, this);
            this.contextEl.translate(location.startX, location.startY);
            this.contextEl.rotate(Math.PI * ((style.angle) / 180));
            this.contextEl.lineTo(0, -style.width / 2);
            if (this.pointerEl[this.pointerIndex].needleType == "triangle") {
                this.contextEl.lineTo(style.height, 0);
            }
            else if (this.pointerEl[this.pointerIndex].needleType == "rectangle") {
                this.contextEl.lineTo(style.height, -style.width / 2);
                this.contextEl.lineTo(style.height, style.width / 2);
            }
            else if (this.pointerEl[this.pointerIndex].needleType == "trapezoid") {
                this.contextEl.lineTo(style.height, -style.width / 4);
                this.contextEl.lineTo(style.height, style.width / 4);
            }
            else if (this.pointerEl[this.pointerIndex].needleType == "arrow") {
                this.contextEl.lineTo(style.height - style.height / 4, -style.width / 6);
                this.contextEl.lineTo(style.height - style.height / 4, -style.width / 2);
                this.contextEl.lineTo(style.height, 0);
                this.contextEl.lineTo(style.height - style.height / 4, style.width / 2);
                this.contextEl.lineTo(style.height - style.height / 4, style.width / 6);
            }
            this.contextEl.lineTo(0, style.width / 2);
            if (style.showBackNeedle) {
                this.contextEl.lineTo(-(style.backNeedleLength + this.scaleEl[this.scaleIndex].pointerCap.radius / 2), style.width / 2);
                this.contextEl.lineTo(-(style.backNeedleLength + this.scaleEl[this.scaleIndex].pointerCap.radius / 2), -style.width / 2);
            }
            this._contextClosePath(style, this);
            }
            this.canvasEl.attr("aria-label", this.model.scales[this.scaleIndex].pointers[this.pointerIndex].value);
        },
        
        _drawImagePointer: function (location, style, element) {
            var self = this;
            var image = new Image();
            var angle = style.angle;
            var xPos = location.startX;
            var yPos = location.startY;
            var elemWidth = style.width;
            var elemHeight = style.height;
            var type = style.type;
            image.onload = function () {
                self.contextEl.save();
                self.contextEl.translate(xPos, yPos);
                self.contextEl.rotate(Math.PI * (angle / 180));
                self.contextEl.drawImage(this, 0, -elemHeight / 2, elemWidth, elemHeight);
                self.contextEl.restore();
            };
            image.src = style.imageUrl;
        },
	 
        _setPointerCap: function (element) {
            var grd;
            //var gradients = [{ "ColorStop": 0.19, "Color": "#F2DFDF" }, { "ColorStop": 0.71, "Color": "#FFFFFF" }, { "ColorStop": 0.77, "Color": "#836B33" }];
            grd = this.contextEl.createRadialGradient(this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this._isHalfCircle() ? this._getHalfCircleYPosition() : this.canvasEl[0].height / 2, 0, this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, this._isHalfCircle() ? this._getHalfCircleYPosition() : this.canvasEl[0].height / 2, this.scaleEl[this.scaleIndex].pointerCap.radius);
            if (!ej.isNullOrUndefined(this.scaleEl[this.scaleIndex].pointerCap.interiorGradient))
                this._setGradientColor(this, grd, this.scaleEl[this.scaleIndex].pointerCap.interiorGradient.colorInfo);
            else
                grd = (this.scaleEl[this.scaleIndex].pointerCap.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(this, this._getColor(element, this.scaleEl[this.scaleIndex].pointerCap.backgroundColor)); // this._getColor(this, this._getColor(element, this.scaleEl[this.scaleIndex].pointerCap.backgroundColor));
            this.region = { "centerX": this._isHalfCircle() ? this._getHalfCircleXPosition() : this.centerX, "centerY": this._isHalfCircle() ? this._getHalfCircleYPosition() : this.centerY, "startAngle": 0, "endAngle": 2 * Math.PI };
            this.style = { "isStroke": true, "isFill": true, "strokeStyle": (this.scaleEl[this.scaleIndex].pointerCap.borderColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(this, this._getColor(element, this.scaleEl[this.scaleIndex].pointerCap.borderColor)), "radius": this.scaleEl[this.scaleIndex].pointerCap.radius, "lineWidth": this.scaleEl[this.scaleIndex].pointerCap.borderWidth, "fillStyle": grd };
            if (this.model.drawPointerCap)
                this._onDrawPointerCap();
            this._drawCircleFrame(this.region, this.style);
        },

        
        isAndroid: function () {
            return (/android/i.test(navigator.userAgent.toLowerCase()));
        },
        
        redraw: function (value) {
            switch (value) {
                case "scale":
                    this._reDrawScale(); break;
                case "pointer":
                    this._reDrawPointer(); break;
                case "range":
                    this._reDrawRange(); break;
                case "label":
                    this._reDrawLabel(); break;
                case "tickMark":
                    this._reDrawTickMark();
                    break;
                case "subGauges":
                    this._reDrawSubGauge();
                    break;
                case "CustomLabel":
                    this._reDrawCustomLabel();
                    break;
                default:
                    this._init();
            }
        },
       
        _getIndicatorImage: function () {
            if (this.pointerImage)
                return this.pointerImage;
            else
                return this._getPointerImage();
        },
      
        _getPointerImage: function () {
            if (this.customLabelImage)
                return this.customLabelImage;
            else
                return this._getCustomLabelImage();
        },
      
        _getSubGaugeImage: function () {
            if (this.labelImage)
                return this.labelImage;
            else
                return this._getLabelImage();
        },
      
        _getCustomLabelImage: function () {
            if (this.subGaugeImage)
                return this.subGaugeImage;
            else
                return this._getSubGaugeImage();
        },
       
        _getRangeImage: function () {
            if (this.model.rangeZOrder  == "rear") {
                if (this.scaleImage)
                    return this.scaleImage;
                else
                    return this.outerImage;
            }
            else {
                if (this.tickImage)
                    return this.tickImage;
                else
                    return this._getTickImage();
            }
        },
       
        _getLabelImage: function () {
            if (this.model.rangeZOrder  == "rear") {
                if (this.tickImage)
                    return this.tickImage;
                else
                    return this._getTickImage();
            }
            else {
                if (this.tickImage)
                    return this.rangeImage;
                else
                    return this._getRangeImage();
            }
        },
      
        _getTickImage: function () {
            if (this.model.rangeZOrder  == "rear") {
                if (this.rangeImage)
                    return this.rangeImage;
                else
                    return this._getRangeImage();
            }
            else {
                if (this.scaleImage)
                    return this.scaleImage;
                else
                    return this.outerImage;
            }
        },
     
        getPointerValue: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length)
                return this.scaleEl[scaleIndex].pointers[pointerIndex].value;
            else
                return null;
        },
       
        setMarkerDistanceFromScale: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length && value != null) {
                this.scaleEl[scaleIndex].pointers[pointerIndex].distanceFromScale = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawPointer();
                else
                    this._initialize();
            }
        },
        
        getMarkerDistanceFromScale: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length)
                return this.scaleEl[scaleIndex].pointers[pointerIndex].distanceFromScale;
            else
                return null;
        },
        
        setPointerLength: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length && value != null) {
                this.scaleEl[scaleIndex].pointers[pointerIndex].length = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawPointer();
                else
                    this._initialize();
            }
        },
       
        getPointerLength: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length)
                return this.scaleEl[scaleIndex].pointers[pointerIndex].length;
            else
                return null;
        },
        
        setPointerWidth: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length && value != null) {
                this.scaleEl[scaleIndex].pointers[pointerIndex].width = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawPointer();
                else this._initialize();
            }
        },
       
        getPointerWidth: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length)
                return this.scaleEl[scaleIndex].pointers[pointerIndex].width;
            else
                return null;
        },

        
        setBackNeedleLength: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length && value != null) {
                this.scaleEl[scaleIndex].pointers[pointerIndex].backNeedleLength = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawPointer();
                else this._initialize();
            }
        },
        
        getBackNeedleLength: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length)
                return this.scaleEl[scaleIndex].pointers[pointerIndex].backNeedleLength;
            else
                return null;
        },
        
        setNeedleStyle: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length && value != null) {
                this.scaleEl[scaleIndex].pointers[pointerIndex].needleType = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawPointer();
                else this._initialize();
            }
        },
        
        getNeedleStyle: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length)
                return this.scaleEl[scaleIndex].pointers[pointerIndex].needleType;
            else
                return null;
        },
       
        setPointerPlacement: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length && value != null) {
                this.scaleEl[scaleIndex].pointers[pointerIndex].placement = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawPointer();
                else this._initialize();
            }
        },
		 
        getPointerPlacement: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length)
                return this.scaleEl[scaleIndex].pointers[pointerIndex].placement;
            else
                return null;
        },
      
        setPointerNeedleType: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length && value != null) {
                this.scaleEl[scaleIndex].pointers[pointerIndex].type = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawCustomLabel();
                else this._initialize();
            }
        },
          
        getPointerNeedleType: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length)
                return this.scaleEl[scaleIndex].pointers[pointerIndex].type;
            else
                return null;
        },
          
        setMarkerStyle: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length && value != null) {
                if (value == "roundedrectangle" || !ej.isNullOrUndefined(ej.datavisualization.CircularGauge.MarkerType[value.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })])) {
                    this.scaleEl[scaleIndex].pointers[pointerIndex].markerType = value;
                    if (this.contextEl.putImageData && !this.isAndroid())
                        this._reDrawCustomLabel();
                    else this._initialize();
                }
            }
        },
          
        getMarkerStyle: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length)
                return this.scaleEl[scaleIndex].pointers[pointerIndex].markerType;
            else
                return null;
        },
          
        setCustomLabelValue: function (scaleIndex, customLabelIndex, value) {
            if (scaleIndex < this.model.scales.length && customLabelIndex < this.model.scales[scaleIndex].customLabels.length && value != null) {
                this.scaleEl[scaleIndex].customLabels[customLabelIndex].value = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawCustomLabel();
                else
                    this._initialize();
            }
        },
          
        getCustomLabelValue: function (scaleIndex, customLabelIndex) {
            if (scaleIndex < this.model.scales.length && customLabelIndex < this.model.scales[scaleIndex].customLabels.length)
                return this.scaleEl[scaleIndex].customLabels[customLabelIndex].value;
            else
                return null;
        },

          
        setSubGaugeLocation: function (scaleIndex, gaugeIndex, value) {
            if (scaleIndex < this.model.scales.length && gaugeIndex < this.model.scales[scaleIndex].subGauges.length && value != null) {
                this.scaleEl[scaleIndex].subGauges[gaugeIndex].position.x = value.x;
                this.scaleEl[scaleIndex].subGauges[gaugeIndex].position.y = value.y;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawSubGauge();
                else
                    this._initialize();
            }
        },
          
        getSubGaugeLocation: function (scaleIndex, gaugeIndex) {
            if (scaleIndex < this.model.scales.length && gaugeIndex < this.model.scales[scaleIndex].subGauges.length)
                return this.scaleEl[scaleIndex].subGauges[gaugeIndex].position;
            else
                return null;
        },
          
        setCustomLabelAngle: function (scaleIndex, customLabelIndex, value) {
            if (scaleIndex < this.model.scales.length && customLabelIndex < this.model.scales[scaleIndex].customLabels.length && value != null) {
                this.scaleEl[scaleIndex].customLabels[customLabelIndex].textAngle = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawCustomLabel();
                else
                    this._initialize();
            }
        },
          
        getCustomLabelAngle: function (scaleIndex, customLabelIndex) {
            if (scaleIndex < this.model.scales.length && customLabelIndex < this.model.scales[scaleIndex].customLabels.length)
                return this.scaleEl[scaleIndex].customLabels[customLabelIndex].textAngle;
            else
                return null;
        },
          
        setRangeStartValue: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].startValue = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawRange();
                else
                    this._initialize();
            }
        },
          
        getRangeStartValue: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].startValue;
            else
                return null;
        },
          
        setRangeEndValue: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].endValue = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawRange();
                else
                    this._initialize();
            }
        },
          
        getRangeEndValue: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].endValue;
            else
                return null;
        },
          
        setRangeSize: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].size = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawRange();
                else
                    this._initialize();
            }
        },

        setRangeVisible: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex]._visible = value;
                if (this.contextEl.putImageData && !this.isAndroid()) {
                    this._initialize();
                    this._wireEvents();
                }
                else
                    this._initialize();
            }
        },
          
        getRangeSize: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].size;
            else
                return null;
        },
          
        setRangeDistanceFromScale: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].distanceFromScale = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawRange();
                else
                    this._initialize();
            }
        },
          
        getRangeDistanceFromScale: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].distanceFromScale;
            else
                return null;
        },
          
        setRangePosition: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].placement = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawRange();
                else
                    this._initialize();
            }
        },
          
        getRangePosition: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].placement;
            else
                return null;
        },
          
        setRangeBorderWidth: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].border.width = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawRange();
                else
                    this._initialize();
            }
        },
          
        getRangeBorderWidth: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.model.scales.length && rangeIndex < this.model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].border.width;
            else
                return null;
        },
          
        setPointerValue: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.model.scales.length && pointerIndex < this.model.scales[scaleIndex].pointers.length && value != null) {
            if(value >= this.scaleEl[scaleIndex].minimum && value <= this.scaleEl[scaleIndex].maximum)
                this.scaleEl[scaleIndex].pointers[pointerIndex].value = value;
			    if (!this.updatePointerOnAnimation && this.model.enableAnimation)
                    this.pointerValue[pointerIndex] = value;
                if (this.contextEl.putImageData && !this._androidAnimation)
                   {
                    this._reDrawPointer();
                    this.updatePointerOnAnimation = false;
                   }  
                else
                    this._initialize();
            }
        },
          
        setLabelAngle: function (scaleIndex, labelIndex, angle) {
            if (scaleIndex < this.model.scales.length && labelIndex < this.model.scales[scaleIndex].labels.length && angle != null) {
                this.scaleEl[scaleIndex].labels[labelIndex].angle = angle;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawLabel();
                else this._initialize();
            }
        },
          
        getLabelAngle: function (scaleIndex, labelIndex) {
            if (scaleIndex < this.model.scales.length && labelIndex < this.model.scales[scaleIndex].labels.length)
                return this.scaleEl[scaleIndex].labels[labelIndex].angle;
            else
                return null;
        },
          
        setLabelDistanceFromScale: function (scaleIndex, labelIndex, value) {
            if (scaleIndex < this.model.scales.length && labelIndex < this.model.scales[scaleIndex].labels.length && value != null) {
                this.scaleEl[scaleIndex].labels[labelIndex].distanceFromScale = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawLabel();
                else this._initialize();
            }
        },
          
        getLabelDistanceFromScale: function (scaleIndex, labelIndex) {
            if (scaleIndex < this.model.scales.length && labelIndex < this.model.scales[scaleIndex].labels.length)
                return this.scaleEl[scaleIndex].labels[labelIndex].distanceFromScale;
            else
                return null;
        },
          
        setLabelStyle: function (scaleIndex, labelIndex, value) {
            if (scaleIndex < this.model.scales.length && labelIndex < this.model.scales[scaleIndex].labels.length && value != null) {
                this.scaleEl[scaleIndex].labels[labelIndex].type = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawLabel();
                else this._initialize();
            }
        },
          
        getLabelStyle: function (scaleIndex, labelIndex) {
            if (scaleIndex < this.model.scales.length && labelIndex < this.model.scales[scaleIndex].labels.length)
                return this.scaleEl[scaleIndex].labels[labelIndex].type;
            else
                return null;
        },
          
        setLabelPlacement: function (scaleIndex, labelIndex, value) {
            if (scaleIndex < this.model.scales.length && labelIndex < this.model.scales[scaleIndex].labels.length && value != null) {
                this.scaleEl[scaleIndex].labels[labelIndex].placement = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawLabel();
                else this._initialize();
            }
        },
          
        getLabelPlacement: function (scaleIndex, labelIndex) {
            if (scaleIndex < this.model.scales.length && labelIndex < this.model.scales[scaleIndex].labels.length)
                return this.scaleEl[scaleIndex].labels[labelIndex].placement;
            else
                return null;
        },
          
        setTickAngle: function (scaleIndex, tickIndex, angle) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length && angle != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].angle = angle;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawTickMark();
                else
                    this._initialize();
            }
        },
          
        getTickAngle: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].angle;
            else
                return null;
        },
          
        setTickStyle: function (scaleIndex, tickIndex, value) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length && value != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].type = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawTickMark();
                else this._initialize();
            }
        },
          
        getTickStyle: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].type;
            else
                return null;
        },
          
        setTickPlacement: function (scaleIndex, tickIndex, value) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length && value != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].placement = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawTickMark();
                else this._initialize();
            }
        },
          
        getTickPlacement: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].placement;
            else
                return null;
        },
          
        setTickWidth: function (scaleIndex, tickIndex, value) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length && value != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].width = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawTickMark();
                else this._initialize();
            }
        },
          
        getTickWidth: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].width;
            else
                return null;
        },
          
        setTickHeight: function (scaleIndex, tickIndex, value) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length && value != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].height = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawTickMark();
                else this._initialize();
            }
        },
          
        getTickHeight: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].height;
            else
                return null;
        },
          
        setTickDistanceFromScale: function (scaleIndex, tickIndex, value) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length && value != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].distanceFromScale = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawTickMark();
                else this._initialize();
            }
        },
          
        getTickDistanceFromScale: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.model.scales.length && tickIndex < this.model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].distanceFromScale;
            else
                return null;
        },
          
        setStartAngle: function (scaleIndex, angle) {
            if (scaleIndex < this.model.scales.length && angle != null) {
                this.scaleEl[scaleIndex].startAngle = angle;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getStartAngle: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].startAngle;
            else
                return null;
        },
          
        setSweepAngle: function (scaleIndex, angle) {
            if (scaleIndex < this.model.scales.length && angle != null) {
                this.scaleEl[scaleIndex].sweepAngle = angle;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getSweepAngle: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].sweepAngle;
            else
                return null;
        },
          
        setMinimumValue: function (scaleIndex, value) {
            if (scaleIndex < this.model.scales.length && value != null) {
                if(value < this.scaleEl[scaleIndex].maximum)
                this.scaleEl[scaleIndex].minimum = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getMinimumValue: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].minimum;
            else
                return null;
        },
          
        setMaximumValue: function (scaleIndex, value) {
            if (scaleIndex < this.model.scales.length && value != null) {
                if(value > this.scaleEl[scaleIndex].minimum)
                this.scaleEl[scaleIndex].maximum = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getMaximumValue: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].maximum;
            else
                return null;
        },
          
        setScaleBarSize: function (scaleIndex, value) {
            if (scaleIndex < this.model.scales.length && value != null) {
                this.scaleEl[scaleIndex].size = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getScaleBarSize: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].size;
            else
                return null;
        },
          
        setScaleRadius: function (scaleIndex, value) {
            if (scaleIndex < this.model.scales.length && value != null) {
                this.scaleEl[scaleIndex].radius = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getScaleRadius: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].radius;
            else
                return null;
        },
          
        setMajorIntervalValue: function (scaleIndex, value) {
            if (scaleIndex < this.model.scales.length && value != null) {
                this.scaleEl[scaleIndex].majorIntervalValue = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getMajorIntervalValue: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].majorIntervalValue;
            else
                return null;
        },
          
        setMinorIntervalValue: function (scaleIndex, value) {
            if (scaleIndex < this.model.scales.length && value != null) {
                this.scaleEl[scaleIndex].minorIntervalValue = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getMinorIntervalValue: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].minorIntervalValue;
            else
                return null;
        },
          
        setPointerCapRadius: function (scaleIndex, value) {
            if (scaleIndex < this.model.scales.length && value != null) {
                this.scaleEl[scaleIndex].pointerCap.radius = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getPointerCapRadius: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].pointerCap.radius;
            else
                return null;
        },
          
        setScaleBorderWidth: function (scaleIndex, value) {
            if (scaleIndex < this.model.scales.length && value != null) {
                this.scaleEl[scaleIndex].border.width = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getScaleBorderWidth: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].border.width;
            else
                return null;
        },
          
        setPointerCapBorderWidth: function (scaleIndex, value) {
            if (scaleIndex < this.model.scales.length && value != null) {
                this.scaleEl[scaleIndex].pointerCap.borderWidth = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getPointerCapBorderWidth: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].pointerCap.borderWidth;
            else
                return null;
        },
          
        setScaleDirection: function (scaleIndex, value) {
            if (scaleIndex < this.model.scales.length && value != null) {
                this.scaleEl[scaleIndex].direction = value;
                if (this.contextEl.putImageData && !this.isAndroid())
                    this._reDrawScale();
                else this._initialize();
            }
        },
          
        getScaleDirection: function (scaleIndex) {
            if (scaleIndex < this.model.scales.length)
                return this.scaleEl[scaleIndex].direction;
            else
                return null;
        },
          
        includeFirstValue: function (scaleIndex, labelIndex, value) {
            if (scaleIndex < this.model.scales.length && labelIndex < this.model.scales[scaleIndex].labels.length && value != null) {
                this.scaleEl[scaleIndex].labels[labelIndex].includeFirstValue = value;
                if (this.contextEl.putImageData)
                    this._reDrawLabel();
                else this.initialize();
            }
        },
          
        _reDrawScale: function () {
            if (ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
            {
                this.contextEl.putImageData(this.outerImage, 0, 0);
                this._drawScales();
            }
        },
          
        _reDrawPointer: function () {
            if (ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
            {
                this.contextEl.putImageData(this._getPointerImage(), 0, 0);
                this._setPointers();
                this._setIndicators();
            }
        },
          
        _reDrawCustomLabel: function () {
            if (ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
            {
                this.contextEl.putImageData(this._getCustomLabelImage(), 0, 0);
                this._setCustomLabel();
                this._setPointers();
                this._setIndicators();

            }
        },
          
        _reDrawRange: function () {
            if (ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
            {
                this.contextEl.putImageData(this._getRangeImage(), 0, 0);
                if (this.model.rangeZOrder  == "rear") {
                    this._setRanges();
                    this._setTicks();
                }
                else {
                    this._setRanges();
                }
                this._setLabels();
                this._subGauge();
                this._setCustomLabel();
                this._setPointers();
                this._setIndicators();

            }
        },
          
        _reDrawLabel: function () {
            if (ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
            {
                this.contextEl.putImageData(this._getLabelImage(), 0, 0);
                this._setLabels();
                this._subGauge();
                this._setCustomLabel();
                this._setPointers();
                this._setIndicators();

            }
        },
          
        _reDrawTickMark: function () {
            if (ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
            {
                this.contextEl.putImageData(this._getTickImage(), 0, 0);
                if (this.model.rangeZOrder  == "rear")
                    this._setTicks();
                else {
                    this._setTicks();
                    this._setRanges();
                }
                this._setLabels();
                this._subGauge();
                this._setCustomLabel();
                this._setPointers();
                this._setIndicators();

            }
        },
          
        _reDrawSubGauge: function () {
            if (ej.isNullOrUndefined(this.model.frame.backgroundImageUrl))
            {
                this.contextEl.putImageData(this._getSubGaugeImage(), 0, 0);
                this._subGauge();
                this._setCustomLabel();
                this._setPointers();
                this._setIndicators();

            }
        },
          
        refreshSubGauge: function () {
            if (this.contextEl.putImageData)
                this._reDrawSubGauge();
            else
                this._initialize();
        },
		  
        refresh: function () {
            this._scaleRedrawn = true;
            this._initialize();
            this._wireEvents();
        },

        "export" : function(){
            var exports = this.model.exportSettings, image, type ,attr, form, data, input;

            if(exports.mode.toLowerCase() === 'client')
                this.exportImage(exports.fileName, exports.fileType);
            else {
                type = exports.type.toLowerCase() === 'jpg' ? 'image/jpeg' : 'image/png';
                image = this.canvasEl[0].toDataURL(type);
                
                attr = { action: exports.action, method: 'post' };
                form = ej.buildTag('form', "", null, attr);
				data = { name: 'Data', type: 'hidden', value: image};
				input = ej.buildTag('input', "", null, data);
                form.append(input).append(this);
                $('body').append(form);
                form.submit();
            }
        },
          
        exportImage: function (fileName, fileType) {
            /// <summary>This function save the rendered canvas image</summary>
            /// <param name="fileName" type="String">fileName to which the image has been saved</param>
            /// <param name="fileType" type="String">fileType to which the image has been saved</param>
            if (ej.browserInfo().name === "msie" && parseFloat(ej.browserInfo().version) < 10) {
                return false;
            }
            else {
                var image = this.canvasEl[0].toDataURL();
                image = image.replace(/^data:[a-z]*;,/, '');
                var image1 = image.split(',');
                var byteString = atob(image1[1]);
                var buffer = new ArrayBuffer(byteString.length);
                var intArray = new Uint8Array(buffer);
                for (var i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }
                var blob = new Blob([buffer], { type: "image/png" });
                if (ej.browserInfo().name === "msie")
                    window.navigator.msSaveOrOpenBlob(blob, fileName + '.' + fileType);
                else {
                    var pom = document.createElement('a');
                    var url = URL.createObjectURL(blob);
                    pom.href = url;
                    pom.setAttribute('download', fileName + '.' + fileType);
                    if (document.createEvent) {
                        var e = document.createEvent("MouseEvents");
                        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        pom.dispatchEvent(e);
                    }
                    else if (pom.fireEvent) {
                        pom.fireEvent("onclick");
                    }
                }
                return true;
            }
        },
		  
        resizeCanvas: function () {
            if (_gaugeCount!=0)
                _gaugeCount = _gaugeCount - 1;
            else
                _gaugeCount = $(".e-circulargauge").length - 1;
            var state, chk=true;
            if (!ej.isNullOrUndefined(this.GaugeEl.parent().attr("style")))
                state = this.GaugeEl.parent().attr("style").split(";");
            if (!ej.isNullOrUndefined(state)){
            $.each(state, function (key, val) {
                while (val.indexOf("width")!=-1){
                    chk = val.indexOf("px") == -1 ? true : false;
                    break;
                }
            });
            }
            if (chk) {
            var ratio = window.innerWidth / initialDivWidth;
			var oldWidth = this.model.width;
			var oldHeight = this.model.height;
				if ((oldWidth *ratio > window.innerWidth) || (oldHeight *ratio > window.innerHeight))
					ratio = 1;
                this.model.width *= ratio;
                this.model.height *= ratio;
                this.model.radius *= ratio;
				this._gaugeResizeState = true;
                for (var i = 0; this.model.scales[i] != null; i++) {
                    this.model.scales[i].radius *= ratio;
                    this.model.scales[i].pointerCap.radius *= ratio;
					 for (var k = 0 ; k < this.model.scales[i].customLabels.length; k++)
                    {
                            if (!ej.isNullOrUndefined(this.model.scales[i].customLabels[k])) {
                            if (this.model.scales[i].customLabels[k].positionType != "outer")
                                this.model.scales[i].customLabels[k].position.x *= ratio;
                                this.model.scales[i].customLabels[k].position.y *= ratio;
                            this.model.scales[i].customLabels[k].font.size = (parseFloat(this.model.scales[i].customLabels[k].font.size.match(/\d+/)[0]) * ratio < 10) ? "10px" : ((parseFloat(this.model.scales[i].customLabels[k].font.size.match(/\d+/)[0]) * ratio) > this._customLblMaxSize) ? this._customLblMaxSize.toString() + 'px' : ((parseFloat(this.model.scales[i].customLabels[k].font.size.match(/\d+/)[0])) * ratio).toString() + 'px';
                        }
                    }
                    for (var j = 0; this.model.scales[i].labels[j] != null || this.model.scales[i].pointers[j] != null || this.model.scales[i].ranges[j] != null || this.model.scales[i].indicators[j] != null || this.model.scales[i].subGauges[j] != null || this.model.scales[i].ticks[j] != null; j++) {
                        if (!ej.isNullOrUndefined(this.model.scales[i].ticks[j])) this.model.scales[i].ticks[j].height *= ratio;
                        if (!ej.isNullOrUndefined(this.model.scales[i].pointers[j])) {
                            this.model.scales[i].pointers[j].length *= ratio;
                            this.model.scales[i].pointers[j].width *= ratio;
                            this.model.scales[i].pointers[j].backNeedleLength *= ratio;
                        }
                        if (!ej.isNullOrUndefined(this.model.scales[i].ranges[j])) {
                            this.model.scales[i].ranges[j].distanceFromScale *= ratio;
                            this.model.scales[i].ranges[j].size *= ratio;
                        }
                        if (!ej.isNullOrUndefined(this.model.scales[i].indicators[j]) && this.model.scales[i].showIndicators) {
                            this.model.scales[i].indicators[j].height *= ratio;
                            this.model.scales[i].indicators[j].width *= ratio;
                            this.model.scales[i].indicators[j].position.x *= ratio;
							this.model.scales[i].indicators[j].position.y *= ratio;
                        }
                        if (!(ej.isNullOrUndefined(this.model.scales[i].subGauges[j])) && (ej.isNullOrUndefined(this.model.scales[i].subGauges[j].controlID))) {
                            this.model.scales[i].subGauges[j].height *= ratio;
                            this.model.scales[i].subGauges[j].width *= ratio;
                            this.model.scales[i].subGauges[j].position.x *= ratio;
                        }
                    }
                }
                this.refresh();
                if (_gaugeCount == 0) {
                    initialDivWidth = window.innerWidth;
                }
            }
        },

          
		  
        _onDrawTicks: function (tickAngle, pointerValue) {
            var tick = { index: this.tickIndex, element: this.tickEl[this.tickIndex], angle: parseInt(tickAngle) };
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, context: this.contextEl, pointerValue: pointerValue, style: this.style, position: this.region,tick:tick };
            this._trigger("drawTicks", data);
        },
		  
        _onDrawLabels: function (labelAngle, pointerValue) {
            var label = { index: this.labelIndex, element: this.labelEl[this.labelIndex], angle: parseInt(labelAngle) };
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, context: this.contextEl, pointerValue: pointerValue, style: this.style, position: this.region,label:label };
            this._trigger("drawLabels", data);
        },
		  
        _onDrawPointers: function (pointerAngle, pointerValue) {
            var pointer = { index: this.pointerIndex, element: this.pointerEl[this.pointerIndex], angle: parseInt(pointerAngle), pointerValue: pointerValue};
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, context: this.contextEl, style: this.style, position: this.region, pointer: pointer };
            this._trigger("drawPointers", data);
        },
		  
        _onDrawRange: function () {
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, rangeIndex: this.rangeIndex, rangeElement: this.rangeEl[this.rangeEl], context: this.contextEl, style: this.style, position: this.region };
            this._trigger("drawRange", data);
        },
		  
        _onDrawCustomLabel: function () {
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, customLabelIndex: this.customLabelIndex, customLabelElement: this.customLabelEl[this.customLabelIndex], context: this.contextEl, style: this.style, position: this.region };
            this._trigger("drawCustomLabel", data);
        },
		  
        _onDrawIndicators: function () {
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, indicatorIndex: this.indicatorIndex, indicatorEl: this.indicatorEl[this.indicatorIndex], context: this.contextEl, style: this.style, position: this.region };
            this._trigger("drawIndicators", data);
        },
		  
        _onDrawPointerCap: function () {
            var data = { object: this, scaleElement: this.model.scales, position: this.region, style: this.style, context: this.contextEl };
            this._trigger("drawPointerCap", data);
        },
		  
        _onRenderComplete: function () {
            var data = { object: this, scaleElement: this.model.scales, context: this.contextEl };
            this._trigger("renderComplete", data);
        },
		  
        _onMouseClick: function (pointerAngle, pointerValue) {
            var pointer = { index: this.pointerIndex, element: this.pointerEl[this.pointerIndex], value: pointerValue, angle: parseInt(pointerAngle) }
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, context: this.contextEl, style: this.style, position: this.position, pointers: pointer };
            this._trigger("mouseClick", data);
        },
		  
        _onMouseClickMove: function (pointerAngle, pointerValue) {
            var pointer = { index: this.pointerIndex, element: this.pointerEl[this.pointerIndex], value: pointerValue, angle: parseInt(pointerAngle) }
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, context: this.contextEl, style: this.style, position: this.region, pointers: pointer };
            this._trigger("mouseClickMove", data);
        },
		  
        _onMouseClickUp: function (pointerAngle, pointerValue) {
            var pointer = { index: this.pointerIndex, element: this.pointerEl[this.pointerIndex], value: pointerValue, angle: parseInt(pointerAngle) }
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, context: this.contextEl, style: this.style, position: this.region, pointers: pointer };
            this._trigger("mouseClickUp", data);
        },

          
		  
        _setTheme: function () {
			var theme = this.model.theme.toLowerCase();
            var selectedTheme =this.model.themeProperties[theme];
            this._setThemeColors(selectedTheme);
        },
		  
        _setThemeColors: function (selectedTheme) {
            var result = [], jsonObj = this.model.themeProperties;
            for (var name in jsonObj) {
                result.push(name);
            }
            for (var th = 0; th < result.length; th++) {
                this.model.backgroundColor = ((!this.model.backgroundColor || this.model.backgroundColor == jsonObj[result[th]].backgroundColor) ? selectedTheme.backgroundColor : this.model.backgroundColor);
                for (var i = 0; i < this.model.scales.length; i++) {
                    this.model.scales[i].backgroundColor = (!this.model.scales[i].backgroundColor || this.model.scales[i].backgroundColor == jsonObj[result[th]].scales.backgroundColor) ? selectedTheme.scales.backgroundColor : this.model.scales[i].backgroundColor;
                    this.model.scales[i].border.color = (!this.model.scales[i].border.color || this.model.scales[i].border.color == jsonObj[result[th]].scales.border.color) ? selectedTheme.scales.border.color : this.model.scales[i].border.color;
                    for (var j = 0; j < this.model.scales[i].pointers.length; j++) {
                        this.model.scales[i].pointers[j].backgroundColor = (!this.model.scales[i].pointers[j].backgroundColor || this.model.scales[i].pointers[j].backgroundColor == jsonObj[result[th]].scales.pointers.backgroundColor) ? selectedTheme.scales.pointers.backgroundColor : this.model.scales[i].pointers[j].backgroundColor;
                        this.model.scales[i].pointers[j].border.color = (!this.model.scales[i].pointers[j].border.color || this.model.scales[i].pointers[j].border.color == jsonObj[result[th]].scales.pointers.border.color) ? selectedTheme.scales.pointers.border.color : this.model.scales[i].pointers[j].border.color;
                        this.model.scales[i].pointerCap.backgroundColor = (!this.model.scales[i].pointerCap.backgroundColor || this.model.scales[i].pointerCap.backgroundColor == jsonObj[result[th]].scales.pointerCap.backgroundColor) ? selectedTheme.scales.pointerCap.backgroundColor : this.model.scales[i].pointerCap.backgroundColor;
                        this.model.scales[i].pointerCap.borderColor = (!this.model.scales[i].pointerCap.borderColor || this.model.scales[i].pointerCap.borderColor == jsonObj[result[th]].scales.pointerCap.borderColor) ? selectedTheme.scales.pointerCap.borderColor : this.model.scales[i].pointerCap.borderColor;
                    }
                    for (var k = 0; k < this.model.scales[i].ticks.length; k++) {
                        this.model.scales[i].ticks[k].color = (!this.model.scales[i].ticks[k].color || this.model.scales[i].ticks[k].color == jsonObj[result[th]].scales.ticks.color) ? selectedTheme.scales.ticks.color : this.model.scales[i].ticks[k].color;
                    }
                    for (var l = 0; l < this.model.scales[i].labels.length; l++) {
                        this.model.scales[i].labels[l].color = (!this.model.scales[i].labels[l].color || this.model.scales[i].labels[l].color == jsonObj[result[th]].scales.labels.color) ? selectedTheme.scales.labels.color : this.model.scales[i].labels[l].color;
                    }
                }
            }
        },
		  
        _getFontString: function (element, font) {
            return (font ? (font.fontStyle ? font.fontStyle : "") + " " + ((font.size == null) ? "11px" : font.size) + " " + font.fontFamily : "");
        },
		  
        _drawTriangle: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width, -style.height / 2);
            element.contextEl.lineTo(style.width, style.height / 2);
            this._contextClosePath(style, element);
        },
		  
        _drawPointer: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(style.width, style.height / 4);
            element.contextEl.lineTo(style.width, -style.height / 4);
            element.contextEl.lineTo(style.width / 2, -style.height / 4);
            element.contextEl.lineTo(style.width / 2, -style.height / 2);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width / 2, style.height / 2);
            element.contextEl.lineTo(style.width / 2, style.height / 4);
            this._contextClosePath(style, element);
        },
		  
        _drawWedge: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width, -style.height / 2);
            element.contextEl.lineTo(3 * style.width / 4, 0);
            element.contextEl.lineTo(style.width, style.height / 2);
            this._contextClosePath(style, element);
        },
		  
        _drawSlider: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width / 4, -style.height / 2);
            element.contextEl.lineTo(style.width, -style.height / 2);
            element.contextEl.lineTo(style.width, style.height / 2);
            element.contextEl.lineTo(style.width / 4, style.height / 2);
            this._contextClosePath(style, element);
        },
		_drawIndicatorStar: function (location, style, element) {
			style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            element.contextEl.lineTo(0, style.height / 2);
            element.contextEl.lineTo(style.width / 2, -style.height/2 );
            element.contextEl.lineTo(style.width, style.height/2 );
			element.contextEl.lineTo(0, -style.height/4 );
			element.contextEl.lineTo(style.width, -style.height/4 );
			element.contextEl.lineTo(0, style.height/2 );
            this._contextClosePath(style, element);            
        },
		  
        _drawStar: function (location, style, element) {
            this._contextOpenPath(style, element);
            if (element.model.Orientation == "Horizontal" && element.markerPlacement == "near") {
                element.contextEl.lineTo(location.startX + style.width - (style.width / 6), location.startY);   
                element.contextEl.lineTo(location.startX, location.startY + style.height - style.height / 3);
                element.contextEl.lineTo(location.startX + style.width, location.startY + style.height - style.height / 3);
                element.contextEl.lineTo(location.startX + style.width / 6, location.startY);
                element.contextEl.lineTo(location.startX + style.width / 2, location.startY + style.height);
            }
            else {
                element.contextEl.lineTo(location.startX + (style.width / 6), location.startY + style.height);   
                element.contextEl.lineTo(location.startX + style.width, location.startY + (style.height / 3));   
                element.contextEl.lineTo(location.startX, location.startY + (style.height / 3));   
                element.contextEl.lineTo(location.startX + style.width - (style.width / 6), location.startY + style.height);   
                element.contextEl.lineTo(location.startX + style.width / 2, location.startY);   
            }
            this._contextClosePath(style, element);
        },
		  
        _drawPentagon: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width / 3, -style.height / 2);
            element.contextEl.lineTo(style.width, -style.height / 4);
            element.contextEl.lineTo(style.width, style.height / 4);
            element.contextEl.lineTo(style.width / 3, style.height / 2);
            this._contextClosePath(style, element);
        },
		  
        _drawDiamond: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width / 2, -style.height / 2);
            element.contextEl.lineTo(style.width, 0);
            element.contextEl.lineTo(style.width / 2, style.height / 2);
            element.contextEl.lineTo(0, 0);
            this._contextClosePath(style, element);
        },
		  
        _drawCircle: function (location, style, element) {
            var radius = Math.sqrt(style.height * style.height + style.width * style.width) / 2;
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.arc(radius / 2, 0, radius / 2, 0, Math.PI * 2, true);
            this._contextClosePath(style, element);
        },

        _drawLine: function (locationPoint, style, element) {
            element.contextEl.beginPath();
            element.contextEl.strokeStyle = style.fillStyle;
            element.contextEl.globalAlpha = style.opacity;
            element.contextEl.lineWidth = style.lineWidth;
            element.contextEl.moveTo(locationPoint.startX, locationPoint.startY);
            element.contextEl.lineTo((locationPoint.startX + style.width), locationPoint.startY);
            element.contextEl.closePath();
            element.contextEl.stroke();
        },
		
		_drawHorizontalLine: function (locationPoint, style, element) {
            element.contextEl.beginPath();
            element.contextEl.strokeStyle = style.fillStyle;
            element.contextEl.globalAlpha = style.opacity;
            element.contextEl.lineWidth = style.lineWidth;
            element.contextEl.moveTo(locationPoint.startX, locationPoint.startY);
            element.contextEl.lineTo((locationPoint.startX + style.width), locationPoint.startY);
            element.contextEl.closePath();
            element.contextEl.stroke();
        },
		
		_drawVerticalLine: function (locationPoint, style, element) {
            element.contextEl.beginPath();
            element.contextEl.strokeStyle = style.fillStyle;
            element.contextEl.globalAlpha = style.opacity;
            element.contextEl.lineWidth = style.lineWidth;
            element.contextEl.moveTo(locationPoint.startX, locationPoint.startY + style.height / 2);
            element.contextEl.lineTo((locationPoint.startX), locationPoint.startY + (-style.height/2));
            element.contextEl.closePath();
            element.contextEl.stroke();
        },
		
		
		_drawCross: function (location, style, element) {
			style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width , 0 );
            element.contextEl.moveTo(style.width/2, 0 );
			element.contextEl.lineTo(style.width/2, -style.height/2 );
			element.contextEl.moveTo(style.width/2, 0 );
			element.contextEl.lineTo(style.width/2, style.height/2 );
            this._contextClosePath(style, element);	
        },
		
		_drawIndicatorTriangle: function (location, style, element) {
			style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, style.height / 2);
            element.contextEl.lineTo(style.width / 2, -style.height/2 );
            element.contextEl.lineTo(style.width, style.height/2 );
            this._contextClosePath(style, element);
			
        },
		
		_drawIndicatorInvertedTriangle: function (location, style, element) {
			style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            element.contextEl.lineTo(0, -style.height / 2);
            element.contextEl.lineTo(style.width, -style.height/2 );
            element.contextEl.lineTo(style.width/2, style.height/2 );
            this._contextClosePath(style, element);
        },
		
		_drawUpArrow: function (location, style, element) {
			style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element); 
			element.contextEl.translate(location.startX, location.startY);
			element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width/2, -style.height/2);
			element.contextEl.lineTo(style.width, 0);
			element.contextEl.lineTo((style.width * (3/4)), 0);
			element.contextEl.lineTo((style.width * (3/4)) , style.height/2);
			element.contextEl.lineTo((style.width/4), style.height/2 );
            element.contextEl.lineTo((style.width/4), 0 );
            this._contextClosePath(style, element);
        },
		
		_drawDownArrow: function (location, style, element) {
			style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element); 
			element.contextEl.translate(location.startX, location.startY);
			 element.contextEl.lineTo(0, 0);
			element.contextEl.lineTo((style.width/4), 0);
            element.contextEl.lineTo((style.width/4),(-style.height/2));
			element.contextEl.lineTo((style.width * (3/4)), (-style.height/2));
			element.contextEl.lineTo((style.width * (3/4)), 0);
			element.contextEl.lineTo(style.width , 0);
			element.contextEl.lineTo(style.width/2 , (style.height/2));
            this._contextClosePath(style, element);
        },
		
		_drawLeftArrow: function (locationPoint, style, element) {
			style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.moveTo(locationPoint.startX , locationPoint.startY);
            element.contextEl.lineTo(locationPoint.startX + (style.width/2), locationPoint.startY + (-style.height/2));
			element.contextEl.lineTo((locationPoint.startX + style.width/2), locationPoint.startY + (-style.height / 4));
			element.contextEl.lineTo(locationPoint.startX + style.width, locationPoint.startY + (-style.height / 4));
			element.contextEl.lineTo(locationPoint.startX + style.width, locationPoint.startY + (style.height/4));
			element.contextEl.lineTo(locationPoint.startX + (style.width/2), locationPoint.startY + style.height/4);
			element.contextEl.lineTo(locationPoint.startX + (style.width/2), locationPoint.startY + style.height/2);
            element.contextEl.lineTo(locationPoint.startX , locationPoint.startY );
            this._contextClosePath(style, element);

					    
        },
		
		_drawRightArrow: function (location, style, element) {
			style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);  
            element.contextEl.lineTo(location.startX , location.startY);
			element.contextEl.lineTo(location.startX , location.startY + (-style.height / 4));
			element.contextEl.lineTo((location.startX + style.width/2), location.startY + (-style.height / 4));
			element.contextEl.lineTo(location.startX + (style.width/2), location.startY + (-style.height / 2) );
			element.contextEl.lineTo(location.startX + (style.width), location.startY);
			element.contextEl.lineTo(location.startX + (style.width/2), location.startY + (style.height/2));
			element.contextEl.lineTo(location.startX + (style.width/2), location.startY + (style.height/4));
			element.contextEl.lineTo(location.startX , location.startY + (style.height / 4));
			element.contextEl.lineTo(location.startX , location.startY );
            this._contextClosePath(style, element);
        },
		  
        _drawTrapezoid: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(0, -style.height / 4);
            element.contextEl.lineTo(style.width, -style.height / 2);
            element.contextEl.lineTo(style.width, style.height / 2);
            element.contextEl.lineTo(0, style.height / 4);
            this._contextClosePath(style, element);
        },
		  
        _drawRectangle: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(0, -style.height / 2);
            element.contextEl.lineTo(style.width, -style.height / 2);
            element.contextEl.lineTo(style.width, style.height / 2);
            element.contextEl.lineTo(0, style.height / 2);
            this._contextClosePath(style, element);
        },
		  
        _drawRoundedRectangle: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(style.radius, -style.height / 2);
            element.contextEl.lineTo(style.width - style.radius, -style.height / 2);
            element.contextEl.quadraticCurveTo(style.width, -style.height / 2, style.width, (-style.height / 2) + style.radius);
            element.contextEl.lineTo(style.width, (style.height / 2) - style.radius);
            element.contextEl.quadraticCurveTo(style.width, style.height / 2, style.width - style.radius, style.height / 2);
            element.contextEl.lineTo(style.radius, style.height / 2);
            element.contextEl.quadraticCurveTo(0, style.height / 2, 0, style.height / 2 - style.radius);
            element.contextEl.lineTo(0, -style.height / 2 + style.radius);
            element.contextEl.quadraticCurveTo(0, -style.height / 2, style.radius, -style.height / 2);
            this._contextClosePath(style, element);
        },
		  
        _drawCustomImage: function (element, imageUrl) {
            var image = new Image();
            $(image).on('load', function () {
                element.contextEl.drawImage(this, 0, 0, element.model.width, element.model.height);
                if (element.model.scales != null)
                    element._drawScales();
                if (element.model.items != null)
                    element._renderItems();
            }).attr('src', imageUrl);
        },
		
		_drawIndicatorEllipse: function (locationPoint, style, element) {           
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.moveTo(locationPoint.startX, locationPoint.startY);
            element.contextEl.bezierCurveTo(
				locationPoint.startX , locationPoint.startY - style.height/2, // C1
				locationPoint.startX + style.width, locationPoint.startY - style.height/2, // C2
				locationPoint.startX + style.width, locationPoint.startY); // A2
			element.contextEl.bezierCurveTo(
				locationPoint.startX + style.width, locationPoint.startY + style.height/2, // C3
				locationPoint.startX , locationPoint.startY + style.height/2, // C4
				locationPoint.startX, locationPoint.startY); // A1            
            this._contextClosePath(style, element);
								
        },
		
		
		  
        _drawEllipse: function (location, style, element) {
            var radius = Math.sqrt(style.height * style.height + style.width * style.width) / 2;
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.scale(2, 1);
            element.contextEl.arc(radius / 2, 0, radius / 2, 0, Math.PI * 2, true);
            this._contextClosePath(style, element);
        },
		  
        _setPointerDimension: function (style, element) {
            if (!ej.isNullOrUndefined(element.model.Orientation)) {
                if (element.model.Orientation == "Horizontal") {
                    var tempWidth = style.width;
                    var tempHeight = style.height;
                    style.height = tempWidth;
                    style.width = tempHeight;
                }
            }
            return style;
        },
		  
        _setContextRotation: function (style, element) {
            element.contextEl.rotate(Math.PI * (style.angle / 180));
        },
		  
        _contextOpenPath: function (style, element) {
            element.contextEl.save();
            element.contextEl.beginPath();
            if (style.strokeStyle)
                element.contextEl.strokeStyle = style.strokeStyle;
            if (style.opacity != undefined)
                element.contextEl.globalAlpha = style.opacity;
            if (style.lineWidth)
                element.contextEl.lineWidth = style.lineWidth;
            if (style.fillStyle)
                element.contextEl.fillStyle = style.fillStyle;
        },
		  
        _contextClosePath: function (style, element) {
            element.contextEl.closePath();
            if (style.isFill)
                element.contextEl.fill();
            if (style.isStroke)
                element.contextEl.stroke();
            element.contextEl.restore();
        },
		  
        _blockDefaultActions: function (e) {
            e.cancelBubble = true;
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
        },
		  
        _isBetween: function (first, last, number, padding) {
            return (first < last ? number >= first - padding && number <= last + padding : number >= last - padding && number <= first + padding);
        },
		  
        _getColor: function (element, option) {
            if (typeof (option) === "string") {
                return option;
            }
            else {
                return ("rgba(" + option.r + ", " + option.g + "," + option.b + ", " + option.a / 255 + ")");
            }
        },
		  
        _setGradientColor: function (element, gradients, options) {
            var self = element;
            if (options.Name || typeof (options) === "string") {
                gradients.addColorStop(0, this._getColor(element, options));
                gradients.addColorStop(1, this._getColor(element, options));
            }
            else
                $.each(options, function (index, colorElement) {
                    gradients.addColorStop(colorElement.colorStop != NaN ? colorElement.colorStop : 0, typeof (colorElement.color) === "string" ? colorElement.color : self._getColor(element, colorElement.color));
                });
        }
    });
      
  (function() {      // for requestAnimationFrame
    var now = 0, items = ['ms', 'moz', 'webkit', 'o'], i, prevTime, element, callNow;
    for (i = 0; i < items.length && !window.requestAnimationFrame; ++i) 
        window.requestAnimationFrame = window[items[i]+'RequestAnimationFrame'];
    if (!window.requestAnimationFrame) {
		ej.datavisualization.CircularGauge.animationPolyfill = true;
        window.requestAnimationFrame = function(callback, element) {						
            prevTime = new Date().getTime();
            callNow = Math.max(0, 16 - (prevTime - now));
            element = window.setTimeout(function() { callback(prevTime + callNow); }, callNow);
            now = prevTime + callNow;
            return element;
        };
	}
  })();

    ej.datavisualization.CircularGauge.Frame = {
          
        FullCircle: "fullcircle",
          
        HalfCircle: "halfcircle"
    };
      
    ej.datavisualization.CircularGauge.Directions = {
          
        Clockwise: "clockwise",
          
        CounterClockwise: "counterclockwise"
    };
      
    ej.datavisualization.CircularGauge.PointerPlacement = {
          
        Near: "near",
          
        Far: "far",
          
        Center: "center"
    };
      
    ej.datavisualization.CircularGauge.PointerType = {
          
        Needle: "needle",
          
        Marker: "marker"
    };
      
    ej.datavisualization.CircularGauge.NeedleType = {
          
        Triangle: "triangle",
          
        Rectangle: "rectangle",
          
        Trapezoid: "trapezoid",
          
        Arrow: "arrow",
          
        Image: "image",
    };
      
    ej.datavisualization.CircularGauge.MarkerType = {
          
        Rectangle: "rectangle",
          
        Triangle: "triangle",
          
        Ellipse: "ellipse",
          
        Diamond: "diamond",
          
        Pentagon: "pentagon",
          
        Circle: "circle",
          
        Slider: "slider",
          
        Pointer: "pointer",
          
        Wedge: "wedge",
          
        Trapezoid: "trapezoid",
          
        RoundedRectangle: "roundedrectangle",
          
        Image: "image"
    };
      
    ej.datavisualization.CircularGauge.RangePlacement = {
          
        Near: "near",
          
        Far: "far",
          
        Center: "center"
    };
      
    ej.datavisualization.CircularGauge.TickType = {
          
        Major: "major",
          
        Minor: "minor"
    };
      
    ej.datavisualization.CircularGauge.gaugePosition = {
          
        TopLeft: "topleft",
          
        TopRight: "topright",
          
        TopCenter: "topcenter",
          
        MiddleLeft: "middleleft",
          
        MiddleRight: "middleright",
          
        Center: "center",
          
        BottomLeft: "bottomleft",
          
        BottomRight: "bottomright",
          
        BottomCenter: "bottomcenter",
    };
      
    ej.datavisualization.CircularGauge.TickPlacement = {
          
        Near: "near",
          
        Far: "far",
          
        Center: "center"
    };
      
    ej.datavisualization.CircularGauge.CustomLabelPositionType = {
          
        Inner: "inner",
          
        Outer: "outer"
    };
      
    ej.datavisualization.CircularGauge.OuterCustomLabelPosition = {
          
        Left: "left",
          
        Right: "right",
          
        Top: "top",
          
        Bottom: "bottom",
    };
      
    ej.datavisualization.CircularGauge.LabelPlacement = {
          
        Near: "near",
          
        Far: "far",
          
        Center: "center"
    };
      
    ej.datavisualization.CircularGauge.LabelType = {
          
        Major: "major",
          
        Minor: "minor"
    };
      
    ej.datavisualization.CircularGauge.UnitTextPlacement = {
          
        Back: "back",
          
        Front: "front"
    };
      
    ej.datavisualization.CircularGauge.RangeZOrderPosition = {
          
        Rear: "rear",
          
        Front: "front"
    };
      
    ej.datavisualization.CircularGauge.IndicatorType = {
          
        Rectangle: "rectangle",
          
        Circle: "circle",
          
        RoundedRectangle: "roundedrectangle",
          
        Text: "text",
          
        Image:"image",
		
        Cross: "cross",
          
        Diamond: "diamond",
          
        DownArrow: "downarrow",
          
        Ellipse: "ellipse",
          
        HorizontalLine: "horizontalLine",
                  
		InvertedTriangle: "invertedtriangle",
          
        LeftArrow: "leftarrow",
          
        Pentagon: "pentagon",
                  
        RightArrow: "rightarrow",
          
        Star: "star",
          
        Trapezoid: "trapezoid",
          
        Triangle: "triangle",
          
        UpArrow: "uparrow",
          
        VerticalLine: "verticalline",
          
        Wedge: "wedge"
		
    };
	  
 	ej.datavisualization.CircularGauge.Themes= {
		
		FlatLight: 'flatlight',

		FlatDark: 'flatdark'
 	};

 	ej.datavisualization.CircularGauge.LegendPosition = {

 	    Top: "top",

 	    Bottom: "bottom",

 	    Left: "left",

        Right: "right"
 	};

 	ej.datavisualization.CircularGauge.LegendAlignment = {

 	    Near: "near",

 	    Center: "center",

        Far: "far"
 	};

 	ej.datavisualization.CircularGauge.LegendShape = {

 	    Rectangle: "rectangle",

 	    Triangle: "triangle",

 	    Diamond: "diamond",

 	    Pentagon: "pentagon",

 	    Circle: "circle",

 	    Slider: "slider",

 	    Wedge: "wedge",

 	    Trapezoid: "trapezoid",

        Line: "line"

 	};
	
      

})(jQuery, Syncfusion);;
/**
* @fileOverview Plugin to style the Html Button elements
* @copyright Copyright Syncfusion Inc. 2001 - 2020. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
* @version 12.1 
* @author <a href="mailto:licensing@syncfusion.com">Syncfusion Inc</a>
*/

/*global window, Image, atob, ArrayBuffer, Uint8Array, Blob, URL, document, jQuery, Syncfusion  */
/*global setInterval, setTimeout, self, navigator */
(function ($, ej, undefined) {
	 
    var initialLinearDivWidth, _linearGaugeCount, initialGaugeCount;
    ej.widget({ "ejLinearGauge": "ej.datavisualization.LinearGauge"}, {
       
        element: null,
        _rootCSS: "e-lineargauge",
        _animationFlag: true,
        
        model: null,
        _customLblMaxSize: 0,
        _savedPoints: [],
        validTags: ["div", "span"],

       
        defaults:  {

            exportSettings:{
                mode: 'client',
                type: 'png',
                fileName: 'CircularGauge',
                action: ''
            },
		
			locale: null,
			
			enableGroupSeparator: false,
			  	
            value: 0,
			  
            minimum: 0,
			  
            maximum: 100,
			  
            width: 150,
			  
            height: 400,
			  
            theme: "flatlight",
			  
            orientation: "Vertical",
			  
            pointerGradient1: null,
			  
            pointerGradient2: null,
			  
            backgroundColor: null,
			  
            borderColor: null,
			  
            labelColor: null,
			  
            tickColor: null,
			  
            readOnly: true,
			  
            enableResize: false,
              
            isResponsive: false,
              
            tooltip: {
                  
                showLabelTooltip: false,
                  
                showCustomLabelTooltip: false,
                  
                    templateID: null,
            },
              
            outerCustomLabelPosition: "bottom",
              
			frame: {
			      
			    backgroundImageUrl: null,
			      
			    outerWidth: 12,
			      
                innerWidth:8
			},
			  
            scales: null,
			  
            enableAnimation: true,
              
            enableMarkerPointerAnimation: true,
			  
            animationSpeed: 500,
			  
            drawTicks: null,
			  
            drawLabels: null,
			  
            drawBarPointers: null,
			  
            drawMarkerPointers: null,
			  
            drawRange: null,
			  
            drawCustomLabel: null,
			  
            drawIndicators: null,
			  
            load: null,

            doubleClick: '',

            rightClick: '',
			  
            init: null,
			  
            renderComplete: null,
              
            mouseClick: null,
              
            mouseClickMove: null,
              
            mouseClickUp: null,
			themeProperties:{
			flatlight: {
            scales: {
                backgroundColor: "#FFFFFF",
                border: { color: "#1d1e1e" },
                barPointers: {
                    backgroundColor: "#8abc3b",
                    border: { color: "#8abc3b" }
                },
                markerPointers: {
                    backgroundColor: "#212121",
                    border: { color: "#212121" }
                },
                ticks: {
                    color: "#1d1e1e"
                },
                labels: {
                    labelColor: "#222222"
                }
            }
        },
		  
        flatdark: {
            scales: {
                backgroundColor: "#808080",
                border: { color: "#808080" },
                barPointers: {
                    backgroundColor: "#8abc3b",
                    border: { color: "#8abc3b" }
                },
                markerPointers: {
                    backgroundColor: "#CCCCCC",
                    border: { color: "#CCCCCC" }
                },
                ticks: {
                    color: "#808080"
                },
                labels: {
                    labelColor: "#CCCCCC"
                }
            }
        }
			
			}
        },
				  	
        _defaultScaleValues: function () {
            return {
				  	
                minimum: null,
				  	
                maximum: null,
				  	
                majorIntervalValue: 10,
				  	
                minorIntervalValue: 2,
				  	
                direction: "counterclockwise",
				  	
                backgroundColor: null,
				  	
                border: {
                      
                    color: null,
                      
                    width:1.5
                },
				  	
                opacity: NaN,
				  	
                width: 30,
				  	
                shadowOffset: 0,
				  	
                length: 290,
				  	
                type: "rectangle",
				  	
                position: { 
				  	
				x: 50, 
				  	
				y: 50 },
				  	
                showRanges: false,
				  	
                showIndicators: false,
				  	
                showCustomLabels: false,
				  	
                showLabels: true,
				  	
                showTicks: true,
				  	
                showBarPointers: true,
				  	
                showMarkerPointers: true,
				  	
                ticks: [{
                                          
                    distanceFromScale: {
                          
                        x: 0,
                          
                        y:0
                    },
					  	
                    angle: 0,
					  	
                    color: null,
					  	
                    type: "majorinterval",
					  	
                    placement: "near",
					  	
                    opacity: 0,
					  	
                    height: 10,
					  	
                    width: 3
                },
                {              
                    distanceFromScale: {
                        x: 0,
                        y:0
                    },
                    angle: 0,
                    color: null,
                    type: "minorinterval",
                    placement: "near",
                    opacity: 0,
                    height: 5,
                    width: 2
                }],
                  
                ranges: [{
                      
                    endWidth: 10,
                      
                    placement: "center",
					  
                    startWidth: 10,
					  
                    distanceFromScale: 0,
					  
                    endValue: 60,
					  
                    startValue: 20,
					  
                    gradients: null,
					  
                    backgroundColor: null,
					  
                    border: {
                          
                        color: null,
                          
                        width:1.5
                    },
					  
                    opacity: null
                }],
					  
                labels: [{
                      
                    distanceFromScale: {
                            
                        x: -10,
                            
                        y:0
                    },
                      
                    angle: 0,
					  
                    font: { 
					  
					size: "11px", 
					  
					fontFamily: "Arial", 
					  
					fontStyle: "bold" },
					  
                    textColor: null,
					  
                    opacity: 0,
					  
                    type: "major",
					  
                    placement: "near",
					  
                    includeFirstValue: true,
					  
					unitText: "",
					  
					unitTextPlacement: "back"  
                }],
				      
                markerPointers: [{
					  
                    type: "triangle",
					  
                    length: 30,
					  
                    placement: "far",
					  
                    gradients: null,
					  
                    distanceFromScale: 0,
					  
                    width: 30,
					  
                    value: null,
					  
                    backgroundColor: null,
					  
                    border: {
                          
                        color: null,
                          
                        width:1.5
                    },
					  
                    opacity: 1
                }],
					  
                barPointers: [{
				      
                    gradients: null,
					  
                    distanceFromScale: 0,
					  
                    width: 30,
					  
                    value: null,
					  
                    backgroundColor: null,
                      
                    border: {
                          
                        color: null,
                          
                        width:1.5
                    },
					  
                    opacity: 1
                }],
					  	
                indicators: [{
					  
                    font: { 
					  
					size: "11px", 
					  
					fontFamily: "Arial",
					  					
					fontStyle: "bold" },
					  					
                    height: 30,
					  	
                    type: "rectangle",
					  	
                    width: 30,
						  	
                    position: { 
					  	
					x: 0, 
					  	
					y: 0 },
					  	
                    textLocation: { 
					  	
					x: 0, 
					  	
					y: 0 },
					  
                    stateRanges: [{
					  
                    endValue: 60,
					  
                    startValue: 50,
					  
                    backgroundColor: null,
					  
                    borderColor: null,
					  
                    text: "",
					  
                        textColor: null
                    }],
					  
                    backgroundColor: null,
                                          
                    border: {
                          
                        color: null,
                          
                        width:1.5
                    },
					  
                    opacity: NaN
                }],
					  
                customLabels: [{
					  
                    font: { 
					  
					size: "11px", 
					  
					fontFamily: "Arial", 
					  
					fontStyle: "bold" },
					  
                    color: null,
					  
                    opacity: 0,
					  
                    value: "",
					  
                    textAngle: 0,
					  
                    position: { 
					  
					x: 0, 
					  
					y: 0 },
                      
                    positionType:"inner"
                }]
            };
        },

        dataTypes: {
            scales: "data",
            isResponsive: "boolean",
        },
        observables: ["value", "minimum", "maximum"],
        _tags: [{
            tag: "scales",
            attr: ["majorIntervalValue", "minorIntervalValue", "backgroundColor", "shadowOffset", "showRanges", "showIndicators", "showCustomLabels", "showLabels", "showTicks", "showBarPointers", "showMarkerPointers", "border.color", "border.width", "position.x", "position.y",
                [{
                    tag: "markerPointers", attr: ["distanceFromScale", "backgroundColor", "border.width", "border.color"]
                }, {
                    tag: "barPointers", attr: ["distanceFromScale", "backgroundColor", "border.width", "border.color"]
                }, {
                    tag: "ranges", attr: ["distanceFromScale", "startValue", "endValue", "startWidth", "endWidth", "backgroundColor", "border.color", "border.width"]
                }, {
                    tag: "ticks", attr: ["distanceFromScale.x", "distanceFromScale.y"]
                }, {
                    tag: "indicators", attr: ["backgroundColor", "textLocation", "font.size", "font.fontFamily", "font.fontStyle", "position.x", "position.y", "textLocation.x", "textLocation.y", "borderColor", "textColor",
                        [{
                            tag: "stateRanges", attr: ["endValue", "startValue", "backgroundColor", "borderColor", "textColor"]
                        }]
                    ]
                }, {
                    tag: "labels", attr: ["distanceFromScale.x", "distanceFromScale.y", "textColor", "includeFirstValue", "unitText", "unitTextPlacement", "font.size", "font.fontFamily", "font.fontStyle"]
                }, {
                    tag: "customLabels", attr: ["textAngle", "font.size", "font.fontFamily", "font.fontStyle", "position.x", "position.y"]
                }]
            ]
        }],
        value: ej.util.valueFunction("value"),
        minimum: ej.util.valueFunction("minimum"),
        maximum: ej.util.valueFunction("maximum"),

          
		  	 
        _init: function () {
            _linearGaugeCount = $(".e-lineargauge").length;
            initialGaugeCount = _linearGaugeCount;
            this._initialize();
            this._trigger("load");
            this._setTheme();
            this._render();
            this.wireEvents();
			this._onWindowResize();
        },
		  	
		_onWindowResize:function()
        {
            if (this.model.enableResize || this.model.isResponsive) {
                if (!ej.isTouchDevice())
                    this._on($(window), "resize", this.resizeCanvas);
                else
                    this._on($(window), "orientationchange", this.resizeCanvas);
            }
        },
		  	 
        _setModel: function (options) {
            var option;
            for (option in options) {
                switch (option) {
                    case "theme": this.model.theme = options[option]; this._init(); break;
                    case "height": this.model.height = options[option]; break;
                    case "width": this.model.width = options[option]; break;
                    case "orientation": this.model.orientation = options[option]; break;
                    case "pointerGradient1": this.model.pointerGradient1 = options[option]; break;
                    case "pointerGradient2": this.model.pointerGradient2 = options[option]; break;
                    case "labelColor": this.model.labelColor = options[option]; break;
                    case "tick": $.extend(this.model.tick,options[option]); break;
                    case "backgroundColor": this.model.backgroundColor = options[option]; break;
                    case "borderColor": this.model.borderColor = options[option]; break;
                    case "frame": $.extend(this.model.frame, options[option]);
                    case "outerCustomLabelPosition": this.model.outerCustomLabelPosition = options[option]; break;
                    case "tooltip": $.extend(this.model.tooltip, options[option]); break;
                    case "readOnly": this.model.readOnly = options[option]; break;
                    case "value":
                        (this.value() == "") && this.value(0);
                        for (var i = 0; this.model.scales[i] != null; i++) {
                            for (var j = 0; this.model.scales[i].markerPointers[j] != null; j++) {
                                this.model.scales[i].markerPointers[j].value = parseFloat(this.value());
                            }
                        }
                        for (var k = 0; this.model.scales[k] != null; k++) {
                            for (var l = 0; this.model.scales[k].barPointers[l] != null; l++) {
                                this.model.scales[k].barPointers[l].value = parseFloat(this.value());
                            }
                        }
                        break;
                    case "minimum":
                        (this.minimum() == "") && this.minimum(0);
                        for (var m = 0; this.model.scales[m] != null; m++) {
                            this.model.scales[m].minimum = parseInt(this.minimum());
                        }
                        break;
                    case "maximum":
                        (this.maximum() == "") && this.maximum(0);
                        for (var n = 0; this.model.scales[n] != null; n++) {
                            this.model.scales[n].maximum = parseInt(this.maximum());
                        }
                        break;
                    case "scales":
                        this.model.scales = options[option];
                        this._itemInitialize();
                        break;
                }
            }
            this._render();
            this.wireEvents();
        },
          	       	 
        _destroy: function () {
            this.activeElement = null;
            this.canvasEl = null;
            this.contextEl = null;
            this.unWireEvents();
            this.element.empty().removeClass("e-lineargauge e-js e-widget");
        },

        _scales: function (index, property, value, old) {
            this._itemInitialize();            
            this._render();            
        },

        _scales_markerPointers: function (index, property, value, old) {
           this.refresh();
           this._trigger("refresh");     
        },

        _scales_barPointers: function (index, property, value, old) {
            this.refresh();
            this._trigger("refresh");     
         },

         _scales_ranges: function (index, property, value, old) {
            this.refresh();
            this._trigger("refresh");     
         },

         _scales_ticks: function (index, property, value, old) {
            this.refresh();
            this._trigger("refresh");     
         },

         _scales_indicators: function (index, property, value, old) {
            this.refresh();
            this._trigger("refresh");     
         },

         _scales_indicators_stateRanges: function (index, property, value, old) {
            this.refresh();
            this._trigger("refresh");     
         },

         _scales_labels: function (index, property, value, old) {
            this.refresh();
            this._trigger("refresh");     
         },

         _scales_customLabels: function (index, property, value, old) {
            this.refresh();
            this._trigger("refresh");     
         },
		  	
        _initialize: function () {
            this.GaugeEl = this.element;
            this.scaleStartX = [];
            this.scaleStartY = [];
            this.isScaleModified = false;
            this.target = this.element[0];
            this._itemInitialize();
            this.Model = this.model;
        },
		  
        _render: function () {
            this.initialize();
            this.wireEvents();
        },
		  
        _itemInitialize: function () {
            var proxy = this;
            if (this.model.scales != null) {
                $.each(this.model.scales, function (index, element) {
                    element = proxy._checkArrayObject(element, index);
                    var obj = proxy._defaultScaleValues();
                    $.extend(obj, element);
                    $.extend(element, obj);
                });
            }
            else {
                this.model.scales = [this._defaultScaleValues()];
            }
        },
		  	
         _checkArrayObject: function (element, initialName) {
            var proxy = this;
			var type;
            $.each(element, function (name, innerElement) {
			 type = typeof name;	 
			if((type!="string" ||( type=="string" && name.indexOf('_') == -1 && name.indexOf('__') == -1)) && typeof innerElement !="function"){
                if (innerElement instanceof Array  ) {
                    proxy._checkArrayObject(innerElement, name);
                }			 
                else if (innerElement != null && typeof innerElement == "object" && !innerElement.setter && !innerElement.factory && !innerElement.key) {
                    var allObjects = proxy._defaultScaleValues();
                    proxy._LoadIndividualDefaultValues(innerElement, allObjects, (typeof name === "number") ? initialName : name);
                }
				}	
               				
            });
            return element;
        },
	 	
        _LoadIndividualDefaultValues: function (obj, allObjects, name) {		    
            var defaultObj = null;
            var proxy = this;
            var type;
            $.each(allObjects, function (n, element) {
                if (name == n) {
                    defaultObj = element;
                    return;
                }
            });
            if (defaultObj instanceof Array) defaultObj = defaultObj[0];
               type = typeof name;	
            $.each(obj, function (objName, ele) {
                if (ele instanceof Array) {
                    proxy._checkArrayObject(ele, name);
                }
                else if (ele != null && typeof ele == "object" && (type!="string" ||( type=="string" && name.indexOf('_') == -1 && name.indexOf('__') == -1)) ) {
                    proxy._LoadIndividualDefaultValues(ele, defaultObj, (typeof objName === "number") ? name : objName);
                }
            });

            $.extend(defaultObj, obj);
            $.extend(obj, defaultObj);
            return obj;
			 
        },
		  
        initialize: function () {
            this._initObject(this);

            if (this.Model.frame.backgroundImageUrl)
                this._drawCustomImage(this, this.Model.frame.backgroundImageUrl);
            else {
                if (this.Model.scales != null)
                    this._drawScales();
            }
        },
		  
        _initObject: function (element) {
            this._savedPoints = [];
            this.element.addClass("e-widget");
            element.GaugeEl = element.element;
            if (element.canvasEl) {
                element.canvasEl.parent().empty();
                element.GaugeEl.empty();
            }
            element.canvasEl = $("<canvas></canvas>");
            var outerLabelCount = 0;
            for (var i = 0; this.model.scales[i] != null; i++) {
                if (this.model.scales[i].minimum == null)
                    this.model.scales[i].minimum = this.minimum();
                if (this.model.scales[i].maximum == null)
                    this.model.scales[i].maximum = this.maximum();
                for (var j = 0; this.model.scales[i].markerPointers[j] != null; j++) {
                    if (this.model.scales[i].markerPointers[j].value == null)
                        this.model.scales[i].markerPointers[j].value = this.value();
                }
                for (var l = 0; this.model.scales[i].barPointers[l] != null; l++) {
                    if (this.model.scales[i].barPointers[l].value == null)
                        this.model.scales[i].barPointers[l].value = this.value();
                }
                for (var k = 0; this.model.scales[i].customLabels[k] != null && this.model.scales[i].showCustomLabels == true; k++) {
                    outerLabelCount++;
                    if (this.model.scales[i].customLabels[k].value != null && element.GaugeEl.find('div').length == 0) {
                        if (this.model.scales[i].customLabels[k] != null && this.model.scales[i].customLabels[k].positionType != null && this.model.scales[i].customLabels[k].positionType == "outer") {
                            element.outerDiv = ej.buildTag("div");
                            if (element.model.outerCustomLabelPosition == "bottom") {
                                element.GaugeEl.append(element.canvasEl);
                                element.GaugeEl.append(element.outerDiv);
                                element.outerDiv.css('text-align', 'center');
                                element.GaugeEl.css({ 'width': element.model.width });
                            }
                            else {
                                if (element.model.outerCustomLabelPosition != "top") {
                                    var table = ej.buildTag("TABLE");
                                    table.css('width', '100%');
                                    var tr = ej.buildTag("TR");
                                    var td1 = ej.buildTag("TD");
                                    var td2 = ej.buildTag("td");
                                    if (element.model.outerCustomLabelPosition == "left") {
                                        td1.append(element.outerDiv);
                                        td2.append(element.canvasEl);
                                    }
                                    else {
                                        td1.append(element.canvasEl);
                                        td2.append(element.outerDiv);
                                    }
                                    tr.append(td1);
                                    tr.append(td2);
                                    table.append(tr);
                                    element.GaugeEl.append(table);
                                    element.outerDiv.css({
                                        'width': this.element.width() - element.model.width
                                    });
                                }
                                else {
                                    element.GaugeEl.append(element.outerDiv);
                                    element.GaugeEl.append(element.canvasEl);
                                    element.GaugeEl.css({ 'width': element.model.width });
                                    element.outerDiv.css('text-align', 'center');
                                }
                            }
                        }
                        else
                            element.GaugeEl.append(element.canvasEl);
                    }
                }
                if (outerLabelCount == 0)
                    element.GaugeEl.append(element.canvasEl);
            }
            element.canvasEl.attr("role", "presentation");
            if (_linearGaugeCount == initialGaugeCount) {
                initialLinearDivWidth = window.innerWidth;
            }
            element.canvasEl[0].setAttribute("width", element.model.width);
            element.canvasEl[0].setAttribute("height", element.model.height);
            element.centerX = element.canvasEl[0].width / 2;
            element.centerY = element.canvasEl[0].height / 2;
            var elem = element.canvasEl[0];
            if (typeof window.G_vmlCanvasManager != "undefined") {
                elem = window.G_vmlCanvasManager.initElement(elem);
            }
            if (!elem || !elem.getContext) {
                return;
            }
            element.contextEl = element.canvasEl[0].getContext("2d");
        },
		  
        _drawFrameCircle: function (location, style, element) {
            this._contextOpenPath(style, element);
            element.contextEl.arc(location.startX, location.startY, style.circleRadius, 0, 2 * Math.PI, true);
            this._contextClosePath(style, element);
            if (style.indicatorText)
                element._drawText(location, style);
        },
		  
        _drawFrameRectangle: function (location, style, element) {
            this._contextOpenPath(style, element);
            element.contextEl.lineTo(location.startX + style.radius, location.startY);
            element.contextEl.lineTo(location.startX + style.width - style.radius, location.startY);
            element.contextEl.lineTo(location.startX + style.width, location.startY + style.height - style.radius);
            element.contextEl.lineTo(location.startX + style.radius, location.startY + style.height);
            this._contextClosePath(style, element);
            if (style.indicatorText)
                element._drawText(location, style);
        },
		  
        _drawFrameThermometer: function (location, style, element) {
            var radius = element.Model.orientation == "Vertical" ? Math.sqrt(style.width * style.width + style.width * style.width) / 2 : Math.sqrt(style.height * style.height + style.height * style.height) / 2;   
            this._contextOpenPath(style, element);
            if (element.Model.orientation == "Vertical") {
                if (element.scaleEl[element.scaleIndex].direction == "counterclockwise") {
                    element.contextEl.arc(location.startX + Math.cos(Math.PI * (45 / 180)) * radius,
                                       location.startY + style.height - Math.sin(Math.PI * (45 / 180)) * radius,
                                       radius, Math.PI * (-45 / 180), Math.PI * (225 / 180), false);
                    element.contextEl.lineTo(location.startX, location.startY + style.calDistance + style.width / 2);
                    if (style.topRounded)
                        element.contextEl.arc(location.startX + style.width / 2, location.startY + style.width / 2, style.width / 2, -Math.PI, 0, false);
                    else
                        element.contextEl.lineTo(location.startX + style.width, location.startY + style.calDistance + style.width / 2);
                }
                else {
                    element.contextEl.arc(location.startX + Math.cos(Math.PI * (45 / 180)) * radius,
                                       location.startY + Math.sin(Math.PI * (45 / 180)) * radius,
                                       radius, Math.PI * (45 / 180), Math.PI * (-225 / 180), true);
                    element.contextEl.lineTo(location.startX, location.startY + style.height - style.width / 2);
                    if (style.topRounded)
                        element.contextEl.arc(location.startX + style.width / 2, location.startY + style.height - style.width / 2, style.width / 2, -Math.PI, 0, true);
                    else
                        element.contextEl.lineTo(location.startX + style.width, location.startY + style.height - style.width / 2);
                }
            }
            else {
                if (element.scaleEl[element.scaleIndex].direction == "counterclockwise") {
                    element.contextEl.arc(location.startX + style.width - radius / 4 - Math.cos(Math.PI * (45 / 180)) * radius,
                               location.startY + Math.sin(Math.PI * (45 / 180)) * radius,
                               radius, Math.PI * (135 / 180), Math.PI * (225 / 180), true);
                    element.contextEl.lineTo(location.startX + style.height / 2, location.startY);
                    if (style.topRounded)
                        element.contextEl.arc(location.startX + style.height / 2, location.startY + style.height / 2, style.height / 2, Math.PI * (270 / 180), Math.PI * (90 / 180), true);
                    else
                        element.contextEl.lineTo(location.startX + style.height / 2, location.startY + style.height);

                }
                else {
                    element.contextEl.arc(location.startX + radius / 4 + Math.cos(Math.PI * (45 / 180)) * radius,
                               location.startY + Math.sin(Math.PI * (45 / 180)) * radius,
                               radius, Math.PI * (45 / 180), Math.PI * (315 / 180), false);
                    element.contextEl.lineTo(location.startX + style.width - style.height / 2, location.startY);
                    if (style.topRounded)
                        element.contextEl.arc(location.startX + style.width - style.height / 2, location.startY + style.height / 2, style.height / 2, Math.PI * (270 / 180), Math.PI * (90 / 180), false);
                    else
                        element.contextEl.lineTo(location.startX + style.width - style.height / 2, location.startY + style.height);
                }
            }
            this._contextClosePath(style, element);
        },
		  
        _drawFrameRoundedRectangle: function (location, style, element) {
            this._contextOpenPath(style, element);
            element.contextEl.lineTo(location.startX + style.radius, location.startY);
            element.contextEl.lineTo(location.startX + style.width - style.radius, location.startY);
            element.contextEl.quadraticCurveTo(location.startX + style.width, location.startY, location.startX + style.width, location.startY + style.radius);
            element.contextEl.lineTo(location.startX + style.width, location.startY + style.height - style.radius);
            element.contextEl.quadraticCurveTo(location.startX + style.width, location.startY + style.height, location.startX + style.width - style.radius, location.startY + style.height);
            element.contextEl.lineTo(location.startX + style.radius, location.startY + style.height);
            element.contextEl.quadraticCurveTo(location.startX, location.startY + style.height, location.startX, location.startY + style.height - style.radius);
            element.contextEl.lineTo(location.startX, location.startY + style.radius);
            element.contextEl.quadraticCurveTo(location.startX, location.startY, location.startX + style.radius, location.startY);
            this._contextClosePath(style, element);
            if (style.indicatorText)
                this._drawText(location, style);
        },
		  
        _contextOpenPath: function (style, element) {
            element.contextEl.save();
            element.contextEl.beginPath();
            if (style.strokeStyle)
                element.contextEl.strokeStyle = style.strokeStyle;
            if (style.opacity != undefined)
                element.contextEl.globalAlpha = style.opacity;
            if (style.lineWidth)
                element.contextEl.lineWidth = style.lineWidth;
            if (style.fillStyle)
                element.contextEl.fillStyle = style.fillStyle;
        },
		  
        _contextClosePath: function (style, element) {
            element.contextEl.closePath();
            if (style.isFill)
                element.contextEl.fill();
            if (style.isStroke)
                element.contextEl.stroke();
            element.contextEl.restore();
        },
		  
        _drawScales: function () {
            var self = this;
            this.scaleEl = this.Model.scales;
            this.contextEl.save();
            this.contextEl.translate(this.Model.frame.outerWidth + this.Model.frame.innerWidth, this.Model.frame.outerWidth + this.Model.frame.innerWidth);
            $.each(this.Model.scales, function (index, element) {
                self.scaleIndex = index;
                self._setScaleCordinates(element, element.type);
            });
            this._setTicks();
            this._setLabels();
            this._setRange();
            this._setCustomLabel();
            this._flagPointer = false;
            this._tempOpacity=this.model.scales[0].barPointers[0].opacity;
            this._setBarPointers();
            this._setMarkerPointers();
            this._setIndicators();
            $.each(this.Model.scales, function (ind, elemt) {
                if (elemt.showBarPointers) {
                    if (elemt.barPointers.length > 1)
                        self.model.enableAnimation = false;
                }
                if (elemt.showMarkerPointers) {
                    if (elemt.markerPointers.length > 1)
                        self.model.enableAnimation = false;
                }
            });
            if (!this.contextEl.putImageData)
                this.model.enableAnimation = false;
            if (this.model.animationSpeed != null && this.model.animationSpeed > 0) {
                var delay = this.model.animationSpeed / 25;
                if (delay >= 0) {
                    if (this.model.enableAnimation && this._animationFlag) {
                        this._onAnimate(delay);
                    }
                }
            }
        },
		  
        _setTicks: function () {
            var self = this;
            $.each(this.Model.scales, function (index, element) {
                if (element.showTicks) {
                    self.scaleIndex = index;
                    if (element.ticks != null) {
                        self.tickEl = element.ticks;
                        $.each(element.ticks, function (tickIndex, tickElement) {
                            self.tickIndex = tickIndex;
                            self._setTicksCordinates(tickElement, tickIndex);
                        });
                    }
                }
            });
        },
		  
        _setLabels: function () {
            var self = this;
            $.each(this.Model.scales, function (index, element) {
                if (element.showLabels) {
                    self.scaleIndex = index;
                    if (element.labels != null) {
                        self.labelEl = element.labels;
                        $.each(element.labels, function (labelIndex, labelElement) {
                            self.labelIndex = labelIndex;
                            self._setLabelCordinates(labelElement, labelIndex);
                        });
                    }
                }
            });
        },
		  
        _setIndicators: function () {
            var self = this;
            $.each(this.Model.scales, function (index, element) {
                self.scaleIndex = index;
                if (element.indicators != null && element.showIndicators) {
                    self.indicatorEl = element.indicators;
                    $.each(element.indicators, function (indicatorIndex, indicatorElement) {
                        self.indicatorIndex = indicatorIndex;
                        self._drawIndicator(indicatorIndex, indicatorElement);
                    });
                }
            });
        },
		  
        _setBarPointers: function () {
            var self = this;
            $.each(this.Model.scales, function (index, element) {
                if (element.showBarPointers) {
                    self.scaleIndex = index;
                    if (element.barPointers != null) {
                        self.barPointerEl = element.barPointers;
                        $.each(element.barPointers, function (barPointerIndex, barPointerElement) {
                            self.barPointerIndex = barPointerIndex;
                            element.opacity = (self.scaleIndex == 0 && self.barPointerIndex == 0 && self.model.enableAnimation == true && (self._flagPointer == false && self._animationFlag == true) && self.model.scales[0].type == "thermometer") ? 0 : self._tempOpacity;
                            self._drawScaleBarPointer(barPointerElement, barPointerIndex);
                            self._flagPointer=true;
                        });
                    }
                }
            });
        },
		  
        _setMarkerPointers: function () {
            var self = this;
            $.each(this.Model.scales, function (index, element) {
                if (element.showMarkerPointers) {
                    self.scaleIndex = index;
                    if (element.markerPointers != null) {
                        self.markerPointerEl = element.markerPointers;
                        $.each(element.markerPointers, function (markerPointerIndex, markerPointerElement) {
                            self.markerPointerIndex = markerPointerIndex;
                            self._drawMarkerPointer(markerPointerElement, markerPointerIndex);
							self.canvasEl.attr("aria-label", self.model.scales[self.scaleIndex].markerPointers[self.markerPointerIndex].value);
                        });
                    }
                }
            });
        },
		  
        _onAnimate: function (delay) {
            var self = this, timer, timer1;
            var currentValue = self.model.scales[0].minimum;
            var barPointerValue = self.model.scales[0].barPointers[0].value;
            var markerPointerValue = self.model.scales[0].markerPointers[0].value;
            timer = setInterval(function pointerchan() {
			  if(self.model){
                if (barPointerValue > currentValue || currentValue == self.model.scales[0].minimum) {
                    currentValue = currentValue + ((self.model.scales[0].maximum-self.model.scales[0].minimum)/100);
                    if (self.scaleEl[0].type == "thermometer") {
                        self.model.scales[0].barPointers[0].value = (barPointerValue > currentValue) ? currentValue: barPointerValue;
                        if (self.contextEl.putImageData != "undefined") {
                            self._setBarPointers();
                        }
                        else {
                            barPointerValue > currentValue ? self.setBarPointerValue(0, 0, currentValue) : self.setBarPointerValue(0, 0, barPointerValue);
                        }
                    }
                    else
                        barPointerValue > currentValue ? self.setBarPointerValue(0, 0, currentValue) : self.setBarPointerValue(0, 0, barPointerValue);
                }
                else {
                    self._animationFlag = false;
                    self.setBarPointerValue(0, 0, barPointerValue);
                    window.clearInterval(timer);
                }
			  } else window.clearInterval(timer); 	
            }, delay);
            timer1 = setInterval(function pointerchan() {
            if(self.model && self.model.enableMarkerPointerAnimation && self.model.enableAnimation){
                if (markerPointerValue > currentValue || currentValue == self.model.scales[0].minimum) {
                    currentValue = currentValue + ((self.model.scales[0].maximum-self.model.scales[0].minimum)/100);
                    if (self.scaleEl[0].type == "thermometer") {
                        self.model.scales[0].markerPointers[0].value = (markerPointerValue > currentValue) ? currentValue : markerPointerValue;
                        if (self.contextEl.putImageData != "undefined") {
                            self._setMarkerPointers();
                            }
                            else {
                                markerPointerValue > currentValue ? self.setPointerValue(0, 0, currentValue) : self.setPointerValue(0, 0, markerPointerValue);
                            }
                        }
                        else
                            markerPointerValue > currentValue ? self.setPointerValue(0, 0, currentValue) : self.setPointerValue(0, 0, markerPointerValue);
                    }
                    else {
                        self._animationFlag = false;
                        self.setPointerValue(0, 0, markerPointerValue);
                        window.clearInterval(timer1);
                }} else window.clearInterval(timer1);
            }, delay);
        },
		  
        _setRange: function () {
            var self = this;
            $.each(this.Model.scales, function (index, element) {
                self.scaleIndex = index;
                if (element.ranges != null && element.showRanges) {
                    self.rangeEl = element.ranges;
                    $.each(element.ranges, function (rangeIndex, rangeElement) {
                        self.rangeIndex = rangeIndex;
                        self._drawRange(rangeElement);
                    });
                }
            });
        },
		  
        _setCustomLabel: function () {
            var self = this;
            $.each(this.Model.scales, function (index, element) {
                self.scaleIndex = index;
                if (element.customLabels != null && element.showCustomLabels) {
                    self.customLabelEl = element.customLabels;
                    $.each(element.customLabels, function (cusLblIndex, cusLblElement) {
                        self.customLabelIndex = cusLblIndex;
                        if (self.model.scales[self.scaleIndex].customLabels[self.customLabelIndex] != null && self.model.scales[self.scaleIndex].customLabels[self.customLabelIndex].positionType != null && self.model.scales[self.scaleIndex].customLabels[self.customLabelIndex].positionType == "outer")
                            self._setOuterCustomLabelCordinates(cusLblIndex, cusLblElement);
                        else
                            self._setCustomLabelCordinates(cusLblIndex, cusLblElement);
                    });
                }
            });
        },
          
        _setOuterCustomLabelCordinates: function (index, element) {
            this._customLblMaxSize = this._customLblMaxSize < parseFloat(element.font.size.match(/\d+/)[0]) ? parseFloat(element.font.size.match(/\d+/)[0]) : this._customLblMaxSize;
            var div = ej.buildTag("div." + this._id + "outercustomlbl");
            div.text(this.model.scales[this.scaleIndex].customLabels[index].value);
            var position = (this.model.outerCustomLabelPosition == "right" || this.model.outerCustomLabelPosition == "left") ? "left" : "center";
            this.outerDiv.append(div);
            this.outerDiv.append('</br>');
            if (position == "center")
                div.css({ 'display': 'inline-block', 'margin': '0 auto', 'max-width': this.model.width });
            else
                div.css({ 'display': 'inline-block', 'max-width': this.element.width() - this.model.width > 10 ? this.element.width() - this.model.width : 10 });
            div.css({
                "color": element.color,
                'overflow': 'hidden',
                'text-overflow': 'ellipsis',
                'white-space': 'nowrap',
                'font-size': (element.font != null && element.font.size != null) ? element.font.size : "12px",
                'font-family': (element.font != null && element.font.fontFamily != null) ? element.font.fontFamily : "Arial",
                'font-weight': (element.font != null && element.font.fontStyle != null) ? element.font.fontStyle : "Normal",
                'text-align': position
            });

        },
		  
        _setScaleCordinates: function (element, scaleStyle) {
            var location, style, radius;
            this.opacity = 1;
            this.bottomRadius = Math.sqrt(element.width * element.width + element.width * element.width) / 2;

            this.bounds = {
                height: this.canvasEl[0].height - 2 * (this.Model.frame.outerWidth + this.Model.frame.innerWidth),
                width: this.canvasEl[0].width - 2 * (this.Model.frame.outerWidth + this.Model.frame.innerWidth)
            };
            if (this.Model.orientation == "Vertical") {
                this.scaleStartX[this.scaleIndex] = (this.bounds.width - element.width) * ((element.position.x) / 100);
                this.scaleStartY[this.scaleIndex] = (this.bounds.height - element.length) * ((element.position.y) / 100);
            }
            else {
                this.scaleStartX[this.scaleIndex] = (this.bounds.width - element.length) * ((element.position.x) / 100);
                this.scaleStartY[this.scaleIndex] = (this.bounds.height - element.width) * ((element.position.y) / 100);
            }
            radius = scaleStyle == "roundedrectangle" ? 5 : 0;
            location = { "startX": this.scaleStartX[this.scaleIndex], "startY": this.scaleStartY[this.scaleIndex] };
            style = {
                "width": this.Model.orientation == "Vertical" ? element.width : element.length, "isStroke": true,
                "topRounded": true,
                "fillStyle": element.backgroundColor ? ((element.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.backgroundColor)) : ((this.Model.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, this.Model.backgroundColor)),
                "lineWidth": element.border.width,
                "radius": radius,
                "height": this.Model.orientation == "Vertical" ? element.length : element.width,
                "isFill": true,
                "strokeStyle": element.border.color ? ((element.border.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.border.color)) : ((this.Model.borderColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, this.Model.borderColor))
            };
	    if (element.maximum < element.minimum) {
                var tempValue = element.maximum;
                element.maximum = element.minimum;
                element.minimum=tempValue;
            }
			 if (element.maximum == element.minimum)
	            element.maximum = element.maximum + 1;
            this.minimum(element.minimum);
            this.maximum(element.maximum);
            if (this._notifyArrayChange) {
                this._notifyArrayChange("scales[" + this.scaleIndex + "]maximum", element.maximum);
                this._notifyArrayChange("scales[" + this.scaleIndex + "]minimum", element.minimum);
            }
            if (element.shadowOffset) {
                this.contextEl.shadowBlur = element.shadowOffset;
                this.contextEl.shadowColor = (style.fillStyle == "transparent") ? "rgba(0,0,0,0)" : style.fillStyle;
            }
            this._drawFrame(scaleStyle, location, style);
            if (this.scaleEl[this.scaleIndex].type == "thermometer" && !this.isScaleModified) {
                this._modifyWidth();
                this.isScaleModified = true;
            }
            if (this.contextEl.getImageData)
                this.scaleImage = this.contextEl.getImageData(0, 0, this.Model.width, this.Model.height);
        },
		  
        _setTicksCordinates: function (element, index) {
            var staticPosition, height, lineChangePosition, interval;
            if (this.scaleEl[this.scaleIndex].majorIntervalValue > this.scaleEl[this.scaleIndex].minorIntervalValue) {
                interval = element.type.toLowerCase() == "majorinterval" ? this.scaleEl[this.scaleIndex].majorIntervalValue : this.scaleEl[this.scaleIndex].minorIntervalValue;
                if (element.placement == "near") {
                    staticPosition = this.Model.orientation == "Vertical" ? this.scaleStartX[this.scaleIndex] : this.scaleStartY[this.scaleIndex];
                }
                else if (element.placement == "far") {
                    staticPosition = this.Model.orientation == "Vertical" ? this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width : this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width;
                }
                else if (element.placement == "center") {
                    staticPosition = this.Model.orientation == "Vertical" ? this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 : this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2;
                }
                height = element.placement == "near" ? -element.height : element.height;
                for (var value = this.scaleEl[this.scaleIndex].maximum; value >= this.scaleEl[this.scaleIndex].minimum && interval != ""; value -= interval) {
                    if (interval == this.scaleEl[this.scaleIndex].minorIntervalValue && value % this.scaleEl[this.scaleIndex].majorIntervalValue != 0 || interval == this.scaleEl[this.scaleIndex].majorIntervalValue) {
                        lineChangePosition = this._getClockwiseLinePosition(value);
                        this.region = {
                            "lineChangePosition": lineChangePosition + (this.Model.orientation == "horizontal" ? element.distanceFromScale.x : (element.distanceFromScale.y)),
                            "lineStaticPosition": staticPosition + (this.Model.orientation == "horizontal" ? element.distanceFromScale.y : (element.distanceFromScale.x))
                        };
                        this.style = {
                            "lineHeight": height,
                            "angle": this.Model.orientation == "Vertical" ? element.angle : element.angle + 270,
                            "tickShape": element.TickShape,
                            "strokeStyle": element.color ? ((element.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.color)) : ((this.Model.tickColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, this.Model.tickColor)),
                            "lineWidth": element.width
                        }
                        if (this.Model.drawTicks)
                            this._onDrawTicks(this.Model.orientation == "Vertical" ? element.angle : element.angle + 270, value);
                        this._drawTickMark(this.region, this.style);
                    }
                }

                if (this.contextEl.getImageData)
                    this.tickImage = this.contextEl.getImageData(0, 0, this.Model.width, this.Model.height);
            }
        },
		  
        _drawTickMark: function (location, style) {
            this.contextEl.beginPath();
            this.contextEl.save();
            this.contextEl.lineWidth = style.lineWidth;
            this.contextEl.strokeStyle = style.strokeStyle;
            if (this.Model.orientation == "Vertical")
                this.contextEl.translate(location.lineStaticPosition, location.lineChangePosition);
            else
                this.contextEl.translate(location.lineChangePosition, location.lineStaticPosition);
            this.contextEl.lineTo(0, 0);
            if (this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise")
                this.contextEl.rotate((Math.PI * (style.angle / 180)));
            else
                this.contextEl.rotate(-(Math.PI * (style.angle / 180)));
            this.contextEl.lineTo(style.lineHeight, 0);
            this.contextEl.stroke();
            this.contextEl.restore();
            this.contextEl.closePath();
        },
		  
        _addDecimal: function (lblValue, lblInterval) {
            var value = lblValue.toString();
            var interval = lblInterval.toString();
            var vDecimal;
            var iDecimal;
            if (value.indexOf('.') > -1)
                vDecimal = value.length - value.indexOf('.') - 1;
            else
                vDecimal = 0;
            if (interval.indexOf('.') > -1)
                iDecimal = interval.length - interval.indexOf('.') - 1;
            else
                iDecimal = 0;
            var decimal = vDecimal > iDecimal ? vDecimal : iDecimal;
            var correctValue = (lblValue * Math.pow(10, decimal) + lblInterval * Math.pow(10, decimal)) / Math.pow(10, decimal);
            return correctValue;
        },
		  
        _setLabelCordinates: function (element, index) {

            var xDistanceFromScale, yDistanceFromScale, staticPosition, lineChangePosition, interval, locale = this.model.locale;
            if (this.scaleEl[this.scaleIndex].majorIntervalValue > this.scaleEl[this.scaleIndex].minorIntervalValue) {

                if (this.Model.orientation == "Vertical") {
                    xDistanceFromScale = element.distanceFromScale.x;
                    yDistanceFromScale = element.distanceFromScale.y;
                }
                else {
                    xDistanceFromScale = element.distanceFromScale.y;
                    yDistanceFromScale = element.distanceFromScale.x;
                }
                interval = element.type == "major" ? this.scaleEl[this.scaleIndex].majorIntervalValue : this.scaleEl[this.scaleIndex].minorIntervalValue;
                if (element.placement == "near") {
                    staticPosition = this.Model.orientation == "Vertical" ? this.scaleStartX[this.scaleIndex] - this.scaleEl[this.scaleIndex].border.width / 2 : this.scaleStartY[this.scaleIndex] - this.scaleEl[this.scaleIndex].border.width - 5;
                    this.contextEl.textAlign = this.Model.orientation == "Vertical" ? "right" : "center";
                }
                else if (element.placement == "far") {
                    staticPosition = this.Model.orientation == "Vertical" ? this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width + this.scaleEl[this.scaleIndex].border.width / 2 : this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width + this.scaleEl[this.scaleIndex].border.width + 5;
                    this.contextEl.textAlign = this.Model.orientation == "Vertical" ? "left" : "center";
                }
                else {
                    this.contextEl.textAlign = "center";
                    staticPosition = this.Model.orientation == "Vertical" ? this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 + this.scaleEl[this.scaleIndex].border.width / 2 : this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 + this.scaleEl[this.scaleIndex].border.width / 2;
                }
                for (var value = this.scaleEl[this.scaleIndex].minimum; value <= this.scaleEl[this.scaleIndex].maximum; value = this._addDecimal(value, interval)) {
                    if (interval == this.scaleEl[this.scaleIndex].minorIntervalValue && value % this.scaleEl[this.scaleIndex].majorIntervalValue != 0 || interval == this.scaleEl[this.scaleIndex].majorIntervalValue) {
                        lineChangePosition = this.scaleEl[this.scaleIndex].direction == "counterclockwise" ? this._getCounterClockwiseLinePosition(value) : this._getClockwiseLinePosition(value);
                        this.labelValue = value;
                        this.region = {
                            "lineChangePosition": lineChangePosition + (yDistanceFromScale),
                            "lineStaticPosition": staticPosition + (xDistanceFromScale)
                        };
                        this.style = {
                            "angle": this.Model.orientation == "Vertical" ? element.angle : element.angle + 270,
                            "fillStyle": element.textColor ? ((element.textColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.textColor)) : ((this.Model.labelColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, this.Model.labelColor)), "opacity": isNaN(element.opacity) ? 1 : element.opacity,
                            "font": this._getFontString(this, element.font),
                            "textValue": this.labelValue
                        };
						
						this.style.textValue  = this.labelValue = (locale && this.model.enableGroupSeparator) ? this.labelValue.toLocaleString(locale) : this.labelValue;
                        if (this.Model.drawLabels)
                            this._onDrawLabels(this.Model.orientation == "Vertical" ? element.angle : element.angle + 270);
                        this._drawLabel(this.region, this.style,false);
                    }
                }
            }

            if (this.contextEl.getImageData)
                this.labelImage = this.contextEl.getImageData(0, 0, this.Model.width, this.Model.height);

        },
		  
        _drawLabel: function (location, style, isCustomLabel) {
            this.contextEl.beginPath();
            this.contextEl.save();
            this.contextEl.textBaseline = "middle";
            this.contextEl.fillStyle = style.fillStyle;
            this.contextEl.font = style.font;
            if (style.opacity)
                this.contextEl.globalAlpha = style.opacity;
            if (this.Model.orientation == "Vertical") {
                this.contextEl.translate(location.lineStaticPosition, location.lineChangePosition);
                if (this.model.tooltip.showLabelTooltip && !isCustomLabel)
                    this._savedPoints.push({ "startX": location.lineStaticPosition + 5, "startY": location.lineChangePosition + 10, "width": 15, "height": 15, "value": style.textValue });
                if (this.model.tooltip.showCustomLabelTooltip && isCustomLabel)
                    this._savedPoints.push({ "startX": location.lineStaticPosition - 35, "startY": location.lineChangePosition + 10, "width": 110, "height": 15, "value": style.textValue });
            }
            else {
                this.contextEl.translate(location.lineChangePosition, location.lineStaticPosition);
                if (this.model.tooltip.showLabelTooltip && !isCustomLabel)
                    this._savedPoints.push({ "startX": location.lineChangePosition + 10, "startY": location.lineStaticPosition + 10, "width": 15, "height": 15, "value": style.textValue });
                if (this.model.tooltip.showCustomLabelTooltip && isCustomLabel)
                    this._savedPoints.push({ "startX": location.lineChangePosition - 35, "startY": location.lineStaticPosition + 10, "width": 110, "height": 15, "value": style.textValue });
            }
            this.contextEl.lineTo(0, 0);
            if (this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise")
                this.contextEl.rotate((Math.PI * (style.angle / 180)));
            else
                this.contextEl.rotate(-(Math.PI * (style.angle / 180)));
			if(!ej.isNullOrUndefined(isCustomLabel) && !isCustomLabel){
			    var textPostion = this.model.scales[this.scaleIndex].labels[this.labelIndex].unitTextPlacement;
            if (!ej.isNullOrUndefined(textPostion) && textPostion.toString() == "back")
                style.textValue = style.textValue + this.model.scales[this.scaleIndex].labels[this.labelIndex].unitText;
            else if (!ej.isNullOrUndefined(textPostion) && textPostion.toString() == "front")
                style.textValue = this.model.scales[this.scaleIndex].labels[this.labelIndex].unitText + style.textValue;
            }
            this.contextEl.fillText(style.textValue, 0, 0);
            this.contextEl.fill();
            this.contextEl.restore();

        },
		  
        _drawScaleBarPointer: function (element, index) {
            element.value = element.value > this.scaleEl[this.scaleIndex].maximum ? this.scaleEl[this.scaleIndex].maximum : element.value;
            element.value = element.value < this.scaleEl[this.scaleIndex].minimum ? this.scaleEl[this.scaleIndex].minimum : element.value;
            var grd, lineYPosition, radius, height, width, startY, backgroundColor, startX, gradients;
            gradients = [{ "ColorStop": 0, "Color": (this.Model.pointerGradient1 == "transparent") ? "rgba(0,0,0,0)" : this.Model.pointerGradient1 }, { "ColorStop": 1, "Color": (this.Model.pointerGradient2 == "transparent") ? "rgba(0,0,0,0)" : this.Model.pointerGradient2}];
            radius = this.scaleEl[this.scaleIndex].type.toLowerCase() == "roundedrectangle" ? 5 : 0;
            if (this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise") {
                lineYPosition = this._getClockwiseLinePosition(element.value);
                if (this.scaleEl[this.scaleIndex].type == "thermometer" && this.isScaleModified) {
                    this._restoreWidth();
                    this.isModify = true;
                }
                if (this.Model.orientation == "Vertical") {
                    startX = this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - element.width / 2 + element.distanceFromScale;
                    grd = this.contextEl.createLinearGradient(startX, this.scaleStartY[this.scaleIndex], startX + element.width, this.scaleStartY[this.scaleIndex]);
                }
                else {
                    startX = this.scaleStartX[this.scaleIndex];
                    grd = this.contextEl.createLinearGradient(startX, this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - element.width / 2, startX, this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 + element.width / 2);
                }
            }
            else {
                lineYPosition = this._getCounterClockwiseLinePosition(element.value);
                if (this.scaleEl[this.scaleIndex].type == "thermometer" && this.isScaleModified) {
                    this._restoreWidth();
                    this.isModify = true;
                }
                if (this.Model.orientation == "Vertical") {
                    startX = this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - element.width / 2 + element.distanceFromScale;
                    grd = this.contextEl.createLinearGradient(startX, this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].length - lineYPosition, startX + element.width, this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].length - lineYPosition);
                }
                else {
                    startX = this.scaleEl[this.scaleIndex].type == "thermometer" ? lineYPosition - this.scaleEl[this.scaleIndex].width / 2 - this.scaleEl[this.scaleIndex].border.width / 2 : lineYPosition - this.scaleEl[this.scaleIndex].border.width / 2;
                    grd = this.contextEl.createLinearGradient(startX, this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - element.width / 2, startX, this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 + element.width / 2);
                }
            }
            if (element.backgroundColor)
                backgroundColor = ((element.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.backgroundColor));
            else if (element.gradients)
                this._setGradientColor(this, grd, element.gradients.colorInfo);
            else if (this.Model.ScaleInterior)
                this._setGradientColor(this, grd, this.Model.ScaleInterior.colorInfo);
            else
                this._setGradientColor(this, grd, gradients);
            if (this.Model.orientation == "Vertical") {
                startY = this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise" ? this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].border.width / 2 : lineYPosition;
                if (this.scaleEl[this.scaleIndex].direction == "counterclockwise" && this.scaleEl[this.scaleIndex].type == "thermometer")
                    startY = startY - this.scaleEl[this.scaleIndex].width / 2;
                height = this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise" ? lineYPosition - this.scaleStartY[this.scaleIndex] : this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].length - lineYPosition - this.scaleEl[this.scaleIndex].border.width / 2;
                width = element.width;
            }
            else {
                startY = this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - element.width / 2 + this.scaleEl[this.scaleIndex].border.width / 2 + element.distanceFromScale;
                height = element.width;
                width = this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise" ? lineYPosition - this.scaleStartX : this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].length - lineYPosition;
            }
            this.region = { "startX": startX + this.scaleEl[this.scaleIndex].border.width / 2, "startY": startY };
            this.style = {
                "width": (this.scaleEl[this.scaleIndex].type == "thermometer" && this.Model.orientation == "horizontal") ? width + height / 2 - this.scaleEl[this.scaleIndex].border.width / 2 : width,
                "lineWidth": element.border.width,
                "radius": radius,
                "topRounded": false,
                "isStroke": false,
                "isFill": true,
                "height": (this.scaleEl[this.scaleIndex].type == "thermometer" && this.Model.orientation == "Vertical") ? height + width / 2 : height,
                "strokeStyle": element.border.color == null ? ((this.Model.borderColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, this.Model.borderColor)) : ((element.border.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.border.color)),
                "fillStyle": element.backgroundColor ? ((element.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.backgroundColor)) : ((grd == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, grd)),
                "opacity": isNaN(element.opacity) ? 0.4 : element.opacity,
                "calDistance": (this.scaleEl[this.scaleIndex].type == "thermometer" && this.Model.orientation == "Vertical") ? (this.scaleEl[this.scaleIndex].width - this.barPointerEl[this.barPointerIndex].width) / 2 : 0
            };
            this.value(element.value);
            if (this._notifyArrayChange)
                this._notifyArrayChange("scales[" + this.scaleIndex + "]barpointers[" + index + "]value", element.value);
            if (this.Model.drawBarPointers)
                this._onDrawBarPointers(element.value);
            this._drawFrame(this.scaleEl[this.scaleIndex].type, this.region, this.style);
            if (this.contextEl.getImageData)
                this.barPointerImage = this.contextEl.getImageData(0, 0, this.Model.width, this.Model.height);
        },
		  
        _drawMarkerPointer: function (element, index) {
            element.value = element.value > this.scaleEl[this.scaleIndex].maximum ? this.scaleEl[this.scaleIndex].maximum : element.value;
            element.value = element.value < this.scaleEl[this.scaleIndex].minimum ? this.scaleEl[this.scaleIndex].minimum : element.value;
            var startX, startY, radius, linePosition, angle, grd, backgroundColor;
            var gradients = [{ "ColorStop": 0, "Color": (this.Model.pointerGradient1 == "transparent") ? "rgba(0,0,0,0)" : this.Model.pointerGradient1 }, { "ColorStop": 1, "Color": (this.Model.pointerGradient2 == "transparent") ? "rgba(0,0,0,0)" : this.Model.pointerGradient2}];
            this.markerPlacement = element.placement;
            radius = Math.sqrt(element.width * element.width + element.length * element.length) / 2;
            if (this.scaleEl[this.scaleIndex].type == "thermometer" && this.isModify)
                this._modifyWidth();
            if (this.Model.orientation == "Vertical") {
                if (this.markerPlacement == "far") {
                    startX = this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width + this.scaleEl[this.scaleIndex].border.width / 2 + element.distanceFromScale;
                    angle = 0;
                }
                if (this.markerPlacement == "near") {
                    if (element.type == "star")
                        startX = this.scaleStartX[this.scaleIndex] + element.distanceFromScale - element.width;
                    else
                        startX = this.scaleStartX[this.scaleIndex] + element.distanceFromScale;
                    angle = 180;
                }
                if (this.markerPlacement == "center") {
                    if (element.type == "circle")
                        startX = this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - element.width / 2 + element.distanceFromScale + (element.border.width);
                    else
                        startX = this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - element.width / 2 + element.distanceFromScale;
                    angle = 0;
                }
            }
            else {
                if (this.markerPlacement == "far") {
                    startX = this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width + this.scaleEl[this.scaleIndex].border.width / 2 + element.distanceFromScale;
                    angle = 90;
                }
                if (this.markerPlacement == "near") {
                    if (element.type == "star")
                        startX = this.scaleStartY[this.scaleIndex] - this.scaleEl[this.scaleIndex].border.width / 2 + element.distanceFromScale - element.length;
                    else
                        startX = this.scaleStartY[this.scaleIndex] - this.scaleEl[this.scaleIndex].border.width / 2 + element.distanceFromScale;
                    angle = 270;
                }
                if (this.markerPlacement == "center") {
                    if (element.type == "circle")
                        startX = this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - element.length / 2 + element.distanceFromScale + (element.border.width);
                    else
                        startX = this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - element.length / 2 + element.distanceFromScale;
                    angle = 90;
                }
            }
            linePosition = this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise" ? this._getClockwiseLinePosition(element.value) : this._getCounterClockwiseLinePosition(element.value);
            if (element.type == "star") {
                if (this.Model.orientation == "Vertical") {
                    grd = this.contextEl.createLinearGradient(startX, this.scaleStartY[this.scaleIndex], startX + element.width, this.scaleStartY[this.scaleIndex]);
                    startY = linePosition - element.length / 3;
                }
                else {
                    grd = this.contextEl.createLinearGradient(linePosition, startX, linePosition, startX + element.length);
                    startY = linePosition - element.width / 2;
                }
            }
            else {
                grd = this.contextEl.createLinearGradient(0, 0, element.width, 0);
                startY = linePosition;
            }
            if (element.type.toLowerCase() == "roundedrectangle") {
                if (this.Model.orientation == "Vertical" && this.markerPlacement == "near")
                    startY += element.length;
                else if (this.Model.orientation == "horizontal") {
                    if (this.markerPlacement == "near")
                        startY -= (element.width);
                    startX += element.width / 2;
                }
            }
            if (element.backgroundColor)
                backgroundColor = ((element.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.backgroundColor));
            else if (element.gradients)
                this._setGradientColor(this, grd, element.gradients.colorInfo);
            else if (this.Model.PointerInterior)
                this._setGradientColor(this, grd, this.Model.PointerInterior.colorInfo);
            else
                this._setGradientColor(this, grd, gradients);

            this.region = { "startX": this.Model.orientation == "Vertical" ? startX : startY, "startY": this.Model.orientation == "Vertical" ? startY : startX };
            this.style = {
                "width": element.width,
                "radius": element.type == "rectangle" ? 0 : radius,
                "height": element.length,
                "lineWidth": element.border.width,
                "isFill": true,
                "isStroke": true,
                "angle": angle,
                "strokeStyle": ((element.border.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.border.color)),
                "markerPlacement": this.markerPlacement,
                "opacity": isNaN(element.opacity) ? 0.4 : element.opacity,
                "fillStyle": element.backgroundColor ? ((element.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.backgroundColor)) : ((grd == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, grd))
            };
            this.value(element.value);
            if (this._notifyArrayChange)
                this._notifyArrayChange("scales[" + this.scaleIndex + "]markerpointers[" + index + "]value", element.value);
            if (this.Model.drawMarkerPointers)
                this._onDrawMarkerPointers(angle, element.value);
            if (element.type.toLowerCase() == "roundedrectangle")
                this.style.radius = 5;
            this._drawMarkerType(element.type, this.region, this.style);
            if (this.scaleEl[this.scaleIndex].type == "thermometer" && this.isModify) {
                this._restoreWidth();
                this.isScaleModified = false;
            }
            if (this.contextEl.getImageData)
                this.markerPointerImage = this.contextEl.getImageData(0, 0, this.Model.width, this.Model.height);
        },

        _drawMarkerType: function (type, location, style) {
            switch (type) {
                case "rectangle":
                    this._drawRectangle(location, style, this);
                    break;
                case "triangle":
                    this._drawTriangle(location, style, this);
                    break;
                case "ellipse":
                    this._drawEllipse(location, style, this);
                    break;
                case "diamond":
                    this._drawDiamond(location, style, this);
                    break;
                case "pentagon":
                    this._drawPentagon(location, style, this);
                    break;
                case "circle":
                    this._drawCircle(location, style, this);
                    break;
                case "slider":
                    this._drawSlider(location, style, this);
                    break;
                case "star":
                    this._drawStar(location, style, this);
                    break;
                case "pointer":
                    this._drawPointer(location, style, this);
                    break;
                case "wedge":
                    this._drawWedge(location, style, this);
                    break;
                case "trapezoid":
                    this._drawTrapezoid(location, style, this);
                    break;
                case "roundedrectangle":
                    this._drawRoundedRectangle(location, style, this);
                    break;
            }
        },

		  
        _drawRange: function (element) {
            if (element.startValue < this.scaleEl[this.scaleIndex].maximum && element.endValue > this.scaleEl[this.scaleIndex].minimum && this.scaleEl[this.scaleIndex].minimum < this.scaleEl[this.scaleIndex].maximum && element.endValue <= this.scaleEl[this.scaleIndex].maximum) {
                var tempStartValue = element.startValue < this.scaleEl[this.scaleIndex].minimum ? this.scaleEl[this.scaleIndex].minimum : element.startValue;
                var tempEndValue = element.endValue > this.scaleEl[this.scaleIndex].maximum ? this.scaleEl[this.scaleIndex].maximum : element.endValue;
                this.rangePosition = element.placement;
                var startLinePosition, endLinePosition, startX, startY, grd, backgroundColor;
                var gradients = [{ "ColorStop": 0, "Color": (this.Model.pointerGradient1 == "transparent") ? "rgba(0,0,0,0)" : this.Model.pointerGradient1 }, { "ColorStop": 1, "Color": (this.Model.pointerGradient2 == "transparent") ? "rgba(0,0,0,0)" : this.Model.pointerGradient2 }];
                startLinePosition = (this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise") ? this._getClockwiseLinePosition(tempStartValue) : this._getCounterClockwiseLinePosition(tempStartValue);
                endLinePosition = (this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise") ? this._getClockwiseLinePosition(tempEndValue) : this._getCounterClockwiseLinePosition(tempEndValue);
                if (this.Model.orientation == "Vertical") {
                    if (element.placement == "far")
                        startX = this.scaleStartX[this.scaleIndex] + element.distanceFromScale + this.scaleEl[this.scaleIndex].width + this.scaleEl[this.scaleIndex].border.width;
                    if (element.placement == "near")
                        startX = this.scaleStartX[this.scaleIndex] + element.distanceFromScale;
                    if (element.placement == "center")
                        startX = (element.startWidth > element.endWidth) ? this.scaleStartX[this.scaleIndex] + element.distanceFromScale + this.scaleEl[this.scaleIndex].width / 2 - element.startWidth / 2 : this.scaleStartX[this.scaleIndex] + element.distanceFromScale + this.scaleEl[this.scaleIndex].width / 2 - element.endWidth / 2;
                    grd = this.contextEl.createLinearGradient(endLinePosition, endLinePosition, endLinePosition, startLinePosition);
                    this.region = { "startX": startX, "startY": startLinePosition, "endY": endLinePosition };
                }
                else {
                    if (element.placement == "far")
                        startY = this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width + element.distanceFromScale + this.scaleEl[this.scaleIndex].border.width;
                    if (element.placement == "near")
                        startY = this.scaleStartY[this.scaleIndex] + element.distanceFromScale;
                    if (element.placement == "center")
                        startY = (element.startWidth > element.endWidth) ? this.scaleStartY[this.scaleIndex] + element.distanceFromScale + this.scaleEl[this.scaleIndex].width / 2 - element.startWidth / 2 : this.scaleStartY[this.scaleIndex] + element.distanceFromScale + this.scaleEl[this.scaleIndex].width / 2 - element.endWidth / 2;
                    grd = this.contextEl.createLinearGradient(endLinePosition, startY, startLinePosition, startY);
                    this.region = { "startX": startLinePosition, "startY": startY, "endX": endLinePosition };
                }

                if (element.backgroundColor)
                    backgroundColor = ((element.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.backgroundColor));
                else if (element.gradients)
                    this._setGradientColor(this, grd, element.gradients.colorInfo);
                else if (this.Model.RangeInterior)
                    this._setGradientColor(this, grd, this.Model.RangeInterior.colorInfo);
                else
                    this._setGradientColor(this, grd, gradients);

                this.style = {
                    "startWidth": element.startWidth, "lineWidth": element.border.width,
                    "isStroke": true, "isFill": true, "opacity": isNaN(element.opacity) ? 0.4 : element.opacity,
                    "endWidth": element.endWidth,
                    "fillStyle": element.backgroundColor ? ((backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, backgroundColor)) : ((grd == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, grd)),
                    "strokeStyle": element.border.color ? ((element.border.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.border.color)) : ((this.Model.borderColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, this.Model.borderColor))
                };
                if (this.Model.drawRange)
                    this._onDrawRange();
                this._drawRangeBar(this.region, this.style);
                if (this.contextEl.getImageData)
                    this.rangeImage = this.contextEl.getImageData(0, 0, this.Model.width, this.Model.height);
            }
        },
		  
        _drawRangeBar: function (location, style) {
            this._contextOpenPath(style, this);
            if (this.Model.orientation == "Vertical") {
                this.contextEl.lineTo(location.startX, location.startY);
                this.contextEl.lineTo(location.startX, location.endY);
                if (this.rangePosition == "near") {
                    this.contextEl.lineTo(location.startX - style.endWidth, location.endY);
                    this.contextEl.lineTo(location.startX - style.startWidth, location.startY);
                }
                else {
                    this.contextEl.lineTo(location.startX + style.endWidth, location.endY);
                    this.contextEl.lineTo(location.startX + style.startWidth, location.startY);
                }
            }
            else {
                this.contextEl.lineTo(location.startX, location.startY);
                this.contextEl.lineTo(location.endX, location.startY);
                if (this.rangePosition == "near") {
                    this.contextEl.lineTo(location.endX, location.startY - style.endWidth);
                    this.contextEl.lineTo(location.startX, location.startY - style.startWidth);
                }
                else {
                    this.contextEl.lineTo(location.endX, location.startY + style.endWidth);
                    this.contextEl.lineTo(location.startX, location.startY + style.startWidth);
                }
            }
            this._contextClosePath(style, this);
        },
		  
        _setCustomLabelCordinates: function (index, element) {
            this._customLblMaxSize = this._customLblMaxSize < parseFloat(element.font.size.match(/\d+/)[0]) ? parseFloat(element.font.size.match(/\d+/)[0]) : this._customLblMaxSize;
            var startX, startY;
            this.contextEl.textAlign = "center";
            if (this.Model.orientation == "Vertical") {
                startX = (this.bounds.width) * ((element.position.x) / 100);
                startY = (this.bounds.height) * ((element.position.y) / 100);
            }
            else {
                startX = (this.bounds.width) * ((element.position.x) / 100);
                startY = (this.bounds.height) * ((element.position.y) / 100);
            }
            this.region = { "lineStaticPosition": this.Model.orientation == "Vertical" ? startX : startY, "lineChangePosition": this.Model.orientation == "Vertical" ? startY : startX }
            this.style = { "angle": element.textAngle, "textValue": element.value, "fillStyle": element.color ? ((element.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.color)) : ((this.Model.labelColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, this.Model.labelColor)), "font": this._getFontString(this, element.font) };
            if (this.Model.drawCustomLabel)
                this._onDrawCustomLabel();
            this._drawLabel(this.region, this.style,true);

            if (this.contextEl.getImageData)
                this.customLabelImage = this.contextEl.getImageData(0, 0, this.Model.width, this.Model.height);
        },
		  
        _drawIndicator: function (index, element) {
            var self = this, xlocation, ylocation, txtLocation, isInStateRange = false;
            xlocation = (this.bounds.width - 2 * element.width) * ((element.position.x) / 100);
            ylocation = (this.bounds.height - 2 * element.height) * ((element.position.y) / 100);
            txtLocation = { "x": (this.bounds.width) * ((element.textLocation.x) / 100), "y": (this.bounds.height) * ((element.textLocation.y) / 100) };
            self.region = { "startX": element.type == "circle" ? xlocation + element.width : xlocation, "textLocation": txtLocation, "startY": element.type == "circle" ? ylocation + element.height : ylocation, "startAngle": 0, "endAngle": 2 * Math.PI };
            self.style = {
                "radius": element.type == "roundedrectangle" ? 2 : 0,
                "strokeStyle": element.border.color ? ((element.border.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.border.color)) : this._getColor(element, "#FFFFFF"),
                "angle": 0,
                "circleRadius": (element.height + element.width) / 2,
                "height": element.height,
                "width": element.width,
                "lineWidth": element.border.width,
                "fillStyle": element.backgroundColor ? ((element.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(element, element.backgroundColor)) : this._getColor(element, "#FFFFFF"),
                "isStroke": true,
                "isFill": true,
                "indicatorText": null,
                "textColor": null,
                "font": null,
                "counterClockwise": false
            };
            if (this.Model.drawIndicators)
                this._onDrawIndicators(self.style, self.region);
            if (element.stateRanges != null) {
                $.each(element.stateRanges, function (sRIndex, srEl) {  
                    if (self.markerPointerEl[self.markerPointerIndex].value >= srEl.startValue && self.markerPointerEl[self.markerPointerIndex].value <= srEl.endValue) {
                        isInStateRange = true;
                        if (!ej.isNullOrUndefined(srEl.text) && srEl.text.length > 0) {
                            self.style.indicatorText = srEl.text;
                            self.style.textColor = ((srEl.textColor == "transparent") ? "rgba(0,0,0,0)" : self._getColor(element, srEl.textColor));
                            self.style.font = self._getFontString(self, element.font);
                        }
                        if (element.type != "text") {
                            self.style.strokeStyle = ((srEl.borderColor == "transparent") ? "rgba(0,0,0,0)" : self._getColor(element, srEl.borderColor));
                            self.style.fillStyle = ((srEl.backgroundColor == "transparent") ? "rgba(0,0,0,0)" : self._getColor(element, srEl.backgroundColor));
                            self._drawFrame(element.type, self.region, self.style, self);
                        }
                        else if (element.type == "text")
                            self._drawText(self.region, self.style);
                    }
                });
                }
            if (!isInStateRange && element.type != "text")
                this._drawFrame(element.type, self.region, self.style, self);
            if (this.contextEl.getImageData)
                this.indicatorImage = this.contextEl.getImageData(0, 0, this.Model.width, this.Model.height);
        },

        _drawFrame: function (type, location, style) {
            switch (type.toLowerCase()) {
                case "circle":
                    this._drawFrameCircle(location, style, this);
                    break;
                case "rectangle":
                    this._drawFrameRectangle(location, style, this);
                    break;
                case "roundedrectangle":
                    this._drawFrameRoundedRectangle(location, style, this);
                    break;
                case "thermometer":
                    this._drawFrameThermometer(location,style,this) ;
                    break;
            }
        },
		  
        _drawText: function (location, style) {
            this.contextEl.beginPath();
            this.contextEl.textAlign = "center";
            this.contextEl.fillStyle = ((style.textColor == "transparent") ? "rgba(0,0,0,0)" : style.textColor);
            this.contextEl.font = style.font;
            this.contextEl.fillText(style.indicatorText, location.textLocation.x, location.textLocation.y);
            this.contextEl.closePath();
        },
		  
        _drawTriangle: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width, -style.height / 2);
            element.contextEl.lineTo(style.width, style.height / 2);
            this._contextClosePath(style, element);
        },
		  
        _drawPointer: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(style.width, style.height / 4);
            element.contextEl.lineTo(style.width, -style.height / 4);
            element.contextEl.lineTo(style.width / 2, -style.height / 4);
            element.contextEl.lineTo(style.width / 2, -style.height / 2);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width / 2, style.height / 2);
            element.contextEl.lineTo(style.width / 2, style.height / 4);
            this._contextClosePath(style, element);
        },
		  
        _drawWedge: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width, -style.height / 2);
            element.contextEl.lineTo(3 * style.width / 4, 0);
            element.contextEl.lineTo(style.width, style.height / 2);
            this._contextClosePath(style, element);
        },
		  
        _drawSlider: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width / 4, -style.height / 2);
            element.contextEl.lineTo(style.width, -style.height / 2);
            element.contextEl.lineTo(style.width, style.height / 2);
            element.contextEl.lineTo(style.width / 4, style.height / 2);
            this._contextClosePath(style, element);
        },
		  
        _drawStar: function (location, style, element) {
            this._contextOpenPath(style, element);
            if (element.Model.orientation == "horizontal" && element.markerPlacement == "near") {
                element.contextEl.lineTo(location.startX + style.width - (style.width / 6), location.startY);   
                element.contextEl.lineTo(location.startX, location.startY + style.height - style.height / 3);
                element.contextEl.lineTo(location.startX + style.width, location.startY + style.height - style.height / 3);
                element.contextEl.lineTo(location.startX + style.width / 6, location.startY);
                element.contextEl.lineTo(location.startX + style.width / 2, location.startY + style.height);
            }
            else {
                element.contextEl.lineTo(location.startX + (style.width / 6), location.startY + style.height);   
                element.contextEl.lineTo(location.startX + style.width, location.startY + (style.height / 3));   
                element.contextEl.lineTo(location.startX, location.startY + (style.height / 3));   
                element.contextEl.lineTo(location.startX + style.width - (style.width / 6), location.startY + style.height);   
                element.contextEl.lineTo(location.startX + style.width / 2, location.startY);   
            }
            this._contextClosePath(style, element);
        },
		  
        _drawPentagon: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width / 3, -style.height / 2);
            element.contextEl.lineTo(style.width, -style.height / 4);
            element.contextEl.lineTo(style.width, style.height / 4);
            element.contextEl.lineTo(style.width / 3, style.height / 2);
            this._contextClosePath(style, element);
        },
		  
        _drawDiamond: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(style.width / 2, -style.height / 2);
            element.contextEl.lineTo(style.width, 0);
            element.contextEl.lineTo(style.width / 2, style.height / 2);
            element.contextEl.lineTo(0, 0);
            this._contextClosePath(style, element);
        },
		  
        _drawCircle: function (location, style, element) {
            var radius = Math.sqrt(style.height * style.height + style.width * style.width) / 2;
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.arc(radius / 2, 0, radius / 2, 0, Math.PI * 2, true);
            this._contextClosePath(style, element);
        },
		  
        _drawTrapezoid: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(0, -style.height / 4);
            element.contextEl.lineTo(style.width, -style.height / 2);
            element.contextEl.lineTo(style.width, style.height / 2);
            element.contextEl.lineTo(0, style.height / 4);
            this._contextClosePath(style, element);
        },
		  
        _drawRectangle: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(0, 0);
            element.contextEl.lineTo(0, -style.height / 2);
            element.contextEl.lineTo(style.width, -style.height / 2);
            element.contextEl.lineTo(style.width, style.height / 2);
            element.contextEl.lineTo(0, style.height / 2);
            this._contextClosePath(style, element);
        },
		  
        _drawRoundedRectangle: function (location, style, element) {
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY - style.height / 2);
            this._setContextRotation(style, element);
            element.contextEl.lineTo(style.radius, 0);
            element.contextEl.lineTo(style.width - style.radius, 0);
            element.contextEl.quadraticCurveTo(style.width, 0, style.width, style.radius);
            element.contextEl.lineTo(style.width, style.height - style.radius);
            element.contextEl.quadraticCurveTo(style.width, style.height, style.width - style.radius, style.height);
            element.contextEl.lineTo(style.radius, style.height);
            element.contextEl.quadraticCurveTo(0, style.height, 0, style.height - style.radius);
            element.contextEl.lineTo(0, style.radius);
            element.contextEl.quadraticCurveTo(0, 0, style.radius, 0);
            this._contextClosePath(style, element);
        },
		  
        _drawCustomImage: function (element, imageUrl) {
            var image = new Image();
            $(image).on('load', function () {
                element.contextEl.drawImage(this, 0, 0, element.Model.width, element.Model.height);
                if (element.Model.scales != null)
                    element._drawScales();
                if (element.Model.Items != null)
                    element._renderItems();
            }).attr('src', imageUrl);
        },
		  
        _drawEllipse: function (location, style, element) {
            var radius = Math.sqrt(style.height * style.height + style.width * style.width) / 2;
            style = this._setPointerDimension(style, element);
            this._contextOpenPath(style, element);
            element.contextEl.translate(location.startX, location.startY);
            this._setContextRotation(style, element);
            element.contextEl.scale(2, 1);
            element.contextEl.arc(radius / 2, 0, radius / 2, 0, Math.PI * 2, true);
            this._contextClosePath(style, element);
        },
          
		  	
        _getIndicatorImage: function () {
            if (this.pointerImage)
                return this.pointerImage;
            else
                return this._getMarkerPointerImage();
        },
		  	
        _getBarPointerImage: function () {
            if (this.customLabelImage)
                return this.customLabelImage;
            else
                return this._getCustomLabelImage();
        },
		  	
        _getMarkerPointerImage: function () {
            if (this.barPointerImage)
                return this.barPointerImage;
            else
                return this._getCustomLabelImage();
        },
		  	
        _getCustomLabelImage: function () {
            if (this.rangeImage)
                return this.rangeImage;
            else
                return this._getRangeImage();
        },
		  	
        _getRangeImage: function () {
            if (this.labelImage)
                return this.labelImage;
            else
                return this._getLabelImage();
        },
		  	
        _getLabelImage: function () {

            if (this.tickImage)
                return this.tickImage;
            else
                return this._getTickImage();
        },
		  	
        _getTickImage: function () {
            if (this.scaleImage)
                return this.scaleImage;
            else
                return this.outerImage;
        },
		  
        setPointerValue: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length && value != null) {
            if(value <= this.scaleEl[scaleIndex].maximum && value >= this.scaleEl[scaleIndex].minimum)
                this.scaleEl[scaleIndex].markerPointers[pointerIndex].value = value;
                if (this.contextEl.putImageData) {
                    this.contextEl.putImageData(this._getMarkerPointerImage(), 0, 0);
                    if (!ej.isNullOrUndefined(this.outerDiv) && this.model.scale[scaleIndex].showCustomLabels)
                        this.outerDiv.empty();
                        this._setCustomLabel();
                        this._setMarkerPointers();
                        this._setIndicators();
                }
                else
                    this.initialize();
            }
        },
		  
        getPointerValue: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length)
                return this.scaleEl[scaleIndex].markerPointers[pointerIndex].value;
            else
                return null;
        },
		  
        setPointerWidth: function (scaleIndex, pointerIndex, width) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length && width != null) {
                this.scaleEl[scaleIndex].markerPointers[pointerIndex].width = width;
                if (this.contextEl.putImageData) {
                    if (this.scaleEl[this.scaleIndex].type == "thermometer")
                        this.initialize();
                    else {
                        this.contextEl.putImageData(this._getMarkerPointerImage(), 0, 0);
                        this._setMarkerPointers();
                    }
                }
                else
                    this.initialize();
            }
        },
		  
        getPointerWidth: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length)
                return this.scaleEl[scaleIndex].markerPointers[pointerIndex].width;
            else
                return null;
        },
		  
        setPointerHeight: function (scaleIndex, pointerIndex, height) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length && height != null) {
                this.scaleEl[scaleIndex].markerPointers[pointerIndex].length = height;
                if (this.contextEl.putImageData) {
                    if (this.scaleEl[this.scaleIndex].type == "thermometer")
                        this.initialize();
                    else {
                        this.contextEl.putImageData(this._getMarkerPointerImage(), 0, 0);
                        this._setMarkerPointers();
                    }
                }
                else
                    this.initialize();
            }
        },
		  
        getPointerHeight: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length)
                return this.scaleEl[scaleIndex].markerPointers[pointerIndex].length;
            else
                return null;
        },
		  
        _getColor: function (element, option) {
            if (typeof (option) === "string") {
                return option;
            }
            else {
                return ("rgba(" + option.r + ", " + option.g + "," + option.b + ", " + option.a / 255 + ")");
            }
        },
		  
        setPointerDistanceFromScale: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length && value != null) {
                this.scaleEl[scaleIndex].markerPointers[pointerIndex].distanceFromScale = value;
                if (this.contextEl.putImageData) {
                    if (this.scaleEl[this.scaleIndex].type == "thermometer")
                        this.initialize();
                    else {
                        this.contextEl.putImageData(this._getMarkerPointerImage(), 0, 0);
                        this._setMarkerPointers();
                    }
                }
                else
                    this.initialize();
            }
        },
		  
        getPointerDistanceFromScale: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length)
                return this.scaleEl[scaleIndex].markerPointers[pointerIndex].distanceFromScale;
            else
                return null;
        },
		  
        setPointerPlacement: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length && value != null) {
                this.scaleEl[scaleIndex].markerPointers[pointerIndex].placement = value;
                if (this.contextEl.putImageData) {
                    if (this.scaleEl[this.scaleIndex].type == "thermometer")
                        this.initialize();
                    else {
                        this.contextEl.putImageData(this._getMarkerPointerImage(), 0, 0);
                        this._setMarkerPointers();
                    }
                }
                else
                    this.initialize();
            }
        },
		  
        getPointerPlacement: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length)
                return this.scaleEl[scaleIndex].markerPointers[pointerIndex].placement;
            else
                return null;
        },
		  
        setMarkerStyle: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length && value != null) {
                this.scaleEl[scaleIndex].markerPointers[pointerIndex].type = value;
                if (this.contextEl.putImageData) {
                    if (this.scaleEl[this.scaleIndex].type == "thermometer")
                        this.initialize();
                    else {
                        this.contextEl.putImageData(this._getMarkerPointerImage(), 0, 0);
                        this._setMarkerPointers();
                    }
                }
                else
                    this.initialize();
            }
        },
		  
        getMarkerStyle: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].markerPointers.length)
                return this.scaleEl[scaleIndex].markerPointers[pointerIndex].type;
            else
                return null;
        },
		  
        setBarPointerValue: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].barPointers.length && value != null) {
            if(value <= this.scaleEl[scaleIndex].maximum && value >= this.scaleEl[scaleIndex].minimum)
                this.scaleEl[scaleIndex].barPointers[pointerIndex].value = value;
                if (this.contextEl.putImageData) {
                    if (this.scaleEl[this.scaleIndex].type == "thermometer")
                        this.initialize();
                    else
                        this._reDrawBarPointer();
                }
                else
                    this.initialize();
            }
        },
		  
        getBarPointerValue: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].barPointers.length)
                return this.scaleEl[scaleIndex].barPointers[pointerIndex].value;
            else
                return null;
        },
		  
        setBarWidth: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].barPointers.length && value != null) {
                this.scaleEl[scaleIndex].barPointers[pointerIndex].width = value;
                if (this.contextEl.putImageData) {
                    if (this.scaleEl[this.scaleIndex].type == "thermometer")
                        this.initialize();
                    else
                        this._reDrawBarPointer();
                }
                else
                    this.initialize();
            }
        },
		  
        getBarWidth: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].barPointers.length)
                return this.scaleEl[scaleIndex].barPointers[pointerIndex].width;
            else
                return null;
        },
		  
        setBarDistanceFromScale: function (scaleIndex, pointerIndex, value) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].barPointers.length && value != null) {
                this.scaleEl[scaleIndex].barPointers[pointerIndex].distanceFromScale = value;
                if (this.contextEl.putImageData) {
                    if (this.scaleEl[this.scaleIndex].type == "thermometer")
                        this.initialize();
                    else
                        this._reDrawBarPointer();
                }
                else
                    this.initialize();
            }
        },
		  
        getBarDistanceFromScale: function (scaleIndex, pointerIndex) {
            if (scaleIndex < this.Model.scales.length && pointerIndex < this.Model.scales[scaleIndex].barPointers.length)
                return this.scaleEl[scaleIndex].barPointers[pointerIndex].distanceFromScale;
            else
                return null;
        },
		  
        setCustomLabelValue: function (scaleIndex, customLabelIndex, value) {
            if (scaleIndex < this.Model.scales.length && customLabelIndex < this.Model.scales[scaleIndex].customLabels.length && value != null) {
                this.scaleEl[scaleIndex].customLabels[customLabelIndex].value = value;
                if (this.contextEl.putImageData)
                    this._reDrawCustomLabel();
                else
                    this.initialize();
            }
        },
		  
        getCustomLabelValue: function (scaleIndex, customLabelIndex) {
            if (scaleIndex < this.Model.scales.length && customLabelIndex < this.Model.scales[scaleIndex].customLabels.length)
                return this.scaleEl[scaleIndex].customLabels[customLabelIndex].value;
            else
                return null;
        },
		  
        setCustomLabelAngle: function (scaleIndex, customLabelIndex, value) {
            if (scaleIndex < this.Model.scales.length && customLabelIndex < this.Model.scales[scaleIndex].customLabels.length && value != null) {
                this.scaleEl[scaleIndex].customLabels[customLabelIndex].textAngle = value;
                if (this.contextEl.putImageData)
                    this._reDrawCustomLabel();
                else
                    this.initialize();
            }
        },
		  
        getCustomLabelAngle: function (scaleIndex, customLabelIndex) {
            if (scaleIndex < this.Model.scales.length && customLabelIndex < this.Model.scales[scaleIndex].customLabels.length)
                return this.scaleEl[scaleIndex].customLabels[customLabelIndex].textAngle;
            else
                return null;
        },
		  
        setRangeStartValue: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].startValue = value;
                if (this.contextEl.putImageData)
                    this._reDrawRange();
                else
                    this.initialize();
            }
        },
		  
        getRangeStartValue: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].startValue;
            else
                return null;
        },
		  
        setRangeEndValue: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].endValue = value;
                if (this.contextEl.putImageData)
                    this._reDrawRange();
                else
                    this.initialize();
            }
        },
		  
        getRangeEndValue: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].endValue;
            else
                return null;
        },
		  
        setRangeStartWidth: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].startWidth = value;
                if (this.contextEl.putImageData)
                    this._reDrawRange();
                else
                    this.initialize();
            }
        },
		  
        getRangeStartWidth: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].startWidth;
            else
                return null;
        },
		  
        setRangeEndWidth: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].endWidth = value;
                if (this.contextEl.putImageData)
                    this._reDrawRange();
                else
                    this.initialize();
            }
        },
		  
        getRangeEndWidth: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].endWidth;
            else
                return null;
        },
		  
        setRangeDistanceFromScale: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].distanceFromScale = value;
                if (this.contextEl.putImageData)
                    this._reDrawRange();
                else
                    this.initialize();
            }
        },
		  
        getRangeDistanceFromScale: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].distanceFromScale;
            else
                return null;
        },
		  
        setRangePosition: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].placement = value;
                if (this.contextEl.putImageData)
                    this._reDrawRange();
                else
                    this.initialize();
            }
        },
		  
        getRangePosition: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].placement;
            else
                return null;
        },
		  
        setRangeBorderWidth: function (scaleIndex, rangeIndex, value) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length && value != null) {
                this.scaleEl[scaleIndex].ranges[rangeIndex].border.width = value;
                if (this.contextEl.putImageData)
                    this._reDrawRange();
                else
                    this.initialize();
            }
        },
		  
        getRangeBorderWidth: function (scaleIndex, rangeIndex) {
            if (scaleIndex < this.Model.scales.length && rangeIndex < this.Model.scales[scaleIndex].ranges.length)
                return this.scaleEl[scaleIndex].ranges[rangeIndex].border.width;
            else
                return null;
        },
		  
        setLabelAngle: function (scaleIndex, labelIndex, angle) {
            if (scaleIndex < this.Model.scales.length && labelIndex < this.Model.scales[scaleIndex].labels.length && angle != null) {
                this.scaleEl[scaleIndex].labels[labelIndex].angle = angle;
                if (this.contextEl.putImageData) this._reDrawLabel();
                else
                    this.initialize();
            }
        },
		  
        getLabelAngle: function (scaleIndex, labelIndex) {
            if (scaleIndex < this.Model.scales.length && labelIndex < this.Model.scales[scaleIndex].labels.length)
                return this.scaleEl[scaleIndex].labels[labelIndex].angle;
            else
                return null;
        },
		  
        setLabelStyle: function (scaleIndex, labelIndex, value) {
            if (scaleIndex < this.Model.scales.length && labelIndex < this.Model.scales[scaleIndex].labels.length && value != null) {
                this.scaleEl[scaleIndex].labels[labelIndex].type = value;
                if (this.contextEl.putImageData) this._reDrawLabel();
                else
                    this.initialize();
            }
        },
		  
        getLabelStyle: function (scaleIndex, labelIndex) {
            if (scaleIndex < this.Model.scales.length && labelIndex < this.Model.scales[scaleIndex].labels.length)
                return this.scaleEl[scaleIndex].labels[labelIndex].type;
            else
                return null;
        },
		  
        setLabelPlacement: function (scaleIndex, labelIndex, value) {
            if (scaleIndex < this.Model.scales.length && labelIndex < this.Model.scales[scaleIndex].labels.length && value != null) {
                this.scaleEl[scaleIndex].labels[labelIndex].placement = value;
                if (this.contextEl.putImageData) this._reDrawLabel();
                else
                    this.initialize();
            }
        },
		  
        getLabelPlacement: function (scaleIndex, labelIndex) {
            if (scaleIndex < this.Model.scales.length && labelIndex < this.Model.scales[scaleIndex].labels.length)
                return this.scaleEl[scaleIndex].labels[labelIndex].placement;
            else
                return null;
        },
		  
        setLabelXDistanceFromScale: function (scaleIndex, labelIndex, value) {
            if (scaleIndex < this.Model.scales.length && labelIndex < this.Model.scales[scaleIndex].labels.length && value != null) {
                this.scaleEl[scaleIndex].labels[labelIndex].distanceFromScale.x = value;
                if (this.contextEl.putImageData) this._reDrawLabel();
                else
                    this.initialize();
            }
        },
		  
        getLabelXDistanceFromScale: function (scaleIndex, labelIndex) {
            if (scaleIndex < this.Model.scales.length && labelIndex < this.Model.scales[scaleIndex].labels.length)
                return this.scaleEl[scaleIndex].labels[labelIndex].distanceFromScale.x;
            else
                return null;
        },
		  
        setLabelYDistanceFromScale: function (scaleIndex, labelIndex, value) {
            if (scaleIndex < this.Model.scales.length && labelIndex < this.Model.scales[scaleIndex].labels.length && value != null) {
                this.scaleEl[scaleIndex].labels[labelIndex].distanceFromScale.y = value;
                if (this.contextEl.putImageData)
                    this._reDrawLabel();
                else
                    this.initialize();
            }
        },
		  
        getLabelYDistanceFromScale: function (scaleIndex, labelIndex) {
            if (scaleIndex < this.Model.scales.length && labelIndex < this.Model.scales[scaleIndex].labels.length)
                return this.scaleEl[scaleIndex].labels[labelIndex].distanceFromScale.y;
            else
                return null;
        },
		  
        setTickAngle: function (scaleIndex, tickIndex, angle) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length && angle != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].angle = angle;
                if (this.contextEl.putImageData) {
                    this._reDrawTickMark();
                }
                else
                    this.initialize();
            }
        },
		  
        getTickAngle: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].angle;
            else
                return null;
        },
		  
        setTickWidth: function (scaleIndex, tickIndex, value) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length && value != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].width = value;
                if (this.contextEl.putImageData) {
                    this._reDrawTickMark();
                }
                else
                    this.initialize();
            }
        },
		  
        getTickWidth: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].width;
            else
                return null;
        },
		  
        setTickHeight: function (scaleIndex, tickIndex, value) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length && value != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].height = value;
                if (this.contextEl.putImageData) {
                    this._reDrawTickMark();
                }
                else
                    this.initialize();
            }
        },
		  
        getTickHeight: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].height;
            else
                return null;
        },
		  
        setTickStyle: function (scaleIndex, tickIndex, value) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length && value != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].type = value;
                if (this.contextEl.putImageData) {
                    this._reDrawTickMark();
                }
                else
                    this.initialize();
            }
        },
		  
        getTickStyle: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].type;
            else
                return null;
        },
		  
        setTickPlacement: function (scaleIndex, tickIndex, value) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length && value != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].placement = value;
                if (this.contextEl.putImageData) {
                    this._reDrawTickMark();
                }
                else
                    this.initialize();
            }
        },
		  
        getTickPlacement: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].placement;
            else
                return null;
        },
		  
        setTickXDistanceFromScale: function (scaleIndex, tickIndex, value) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length && value != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].distanceFromScale.x = value;
                if (this.contextEl.putImageData) {
                    this._reDrawTickMark();
                }
                else
                    this.initialize();
            }
        },
		  
        getTickXDistanceFromScale: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].distanceFromScale.x;
            else
                return null;
        },
		  
        setTickYDistanceFromScale: function (scaleIndex, tickIndex, value) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length && value != null) {
                this.scaleEl[scaleIndex].ticks[tickIndex].distanceFromScale.y = value;
                if (this.contextEl.putImageData) {
                    this._reDrawTickMark();
                }
                else
                    this.initialize();
            }
        },
		  
        getTickYDistanceFromScale: function (scaleIndex, tickIndex) {
            if (scaleIndex < this.Model.scales.length && tickIndex < this.Model.scales[scaleIndex].ticks.length)
                return this.scaleEl[scaleIndex].ticks[tickIndex].distanceFromScale.y;
            else
                return null;
        },
		  
        setScaleLocation: function (scaleIndex, value) {
            if (scaleIndex < this.Model.scales.length && value != null) {
                this.scaleEl[scaleIndex].position.x = value.x;
                this.scaleEl[scaleIndex].position.y = value.y;
                this.initialize();
            }
        },
		  
        getScaleLocation: function (scaleIndex) {
            if (scaleIndex < this.Model.scales.length)
                return { "x": this.scaleEl[scaleIndex].position.x, "y": this.scaleEl[scaleIndex].position.y };
            else
                return null;
        },
		  
        setMaximumValue: function (scaleIndex, value) {
            if (scaleIndex < this.Model.scales.length && value != null) {
            if(value > this.scaleEl[scaleIndex].minimum)
                this.scaleEl[scaleIndex].maximum = value;
                this.initialize();
            }
        },
		  
        getMaximumValue: function (scaleIndex) {
            if (scaleIndex < this.Model.scales.length)
                return this.scaleEl[this.scaleIndex].maximum;
            else
                return null;
        },
		  
        setMinimumValue: function (scaleIndex, value) {
            if (scaleIndex < this.Model.scales.length && value != null) {
            if(value < this.scaleEl[scaleIndex].maximum)
                this.scaleEl[scaleIndex].minimum = value;
                this.initialize();
            }
        },
		  
        getMinimumValue: function (scaleIndex) {
            if (scaleIndex < this.Model.scales.length)
                return this.scaleEl[this.scaleIndex].minimum;
            else
                return null;
        },
		  
        setScaleBarSize: function (scaleIndex, value) {
            if (scaleIndex < this.Model.scales.length && value != null) {
                this.scaleEl[scaleIndex].width = value;
                this.initialize();
            }
        },
		  
        getScaleBarSize: function (scaleIndex) {
            if (scaleIndex < this.Model.scales.length)
                return this.scaleEl[scaleIndex].width;
            else
                return null;
        },
		  
        setScaleBarLength: function (scaleIndex, value) {
            if (scaleIndex < this.Model.scales.length && value != null) {
                this.scaleEl[scaleIndex].length = value;
                this.initialize();
            }
        },
		  
        setScaleStyle: function (scaleIndex, value) {
            if (scaleIndex < this.Model.scales.length && value != null) {
                this.scaleEl[scaleIndex].type = value;
                this.initialize();
            }
        },
		  
        getScaleStyle: function (scaleIndex) {
            if (scaleIndex < this.Model.scales.length)
                return this.scaleEl[scaleIndex].type;
            else
                return null;
        },
		  
        getScaleBarLength: function (scaleIndex) {
            if (scaleIndex < this.Model.scales.length)
                return this.scaleEl[scaleIndex].length;
            else
                return null;
        },
		  
        setScaleBorderWidth: function (scaleIndex, value) {
            if (scaleIndex < this.Model.scales.length && value != null) {
                this.scaleEl[scaleIndex].border.width = value;
                this.initialize();
            }
        },
		  
        setScaleDirection: function (scaleIndex, value) {
            if (scaleIndex < this.Model.scales.length && value != null) {
                this.scaleEl[scaleIndex].direction = value;
                this.initialize();
            }
        },
		  
        getScaleDirection: function (scaleIndex) {
            if (scaleIndex < this.Model.scales.length)
                return this.scaleEl[scaleIndex].direction;
            else
                return null;
        },
		  
        getScaleBorderWidth: function (scaleIndex) {
            if (scaleIndex < this.Model.scales.length)
                return this.scaleEl[scaleIndex].border.width;
            else
                return null;
        },
		  
        setMajorIntervalValue: function (scaleIndex, value) {
            if (scaleIndex < this.Model.scales.length && value != null) {
                this.scaleEl[scaleIndex].majorIntervalValue = value;
                this.initialize();
            }
        },
		  
        getMajorIntervalValue: function (scaleIndex) {
            if (scaleIndex < this.Model.scales.length)
                return this.scaleEl[scaleIndex].majorIntervalValue;
            else
                return null;
        },
		  
        setMinorIntervalValue: function (scaleIndex, value) {
            if (scaleIndex < this.Model.scales.length && value != null) {
                this.scaleEl[scaleIndex].minorIntervalValue = value;
                this.initialize();
            }
        },
		  
        getMinorIntervalValue: function (scaleIndex) {
            if (scaleIndex < this.Model.scales.length)
                return this.scaleEl[scaleIndex].minorIntervalValue;
            else
                return null;
        },
		  
        _reDrawBarPointer: function () {
            if (this.Model.frame.backgroundImageUrl) {
                var tmpData = !ej.isNullOrUndefined(this.customLabelImage) ? this.customLabelImage() : !ej.isNullOrUndefined(this.rangeImage) ? this.rangeImage : !ej.isNullOrUndefined(this.labelImage) ? this.labelImage : !ej.isNullOrUndefined(this.tickImage) ? this.tickImage : !ej.isNullOrUndefined(this.scaleImage) ? this.scaleImage : null;
                this.contextEl.putImageData(tmpData, 0, 0);
                this._setBarPointers();
                this._setMarkerPointers();
                this._setIndicators();
            }
            else {
                if (this.contextEl.putImageData != "undefined") {
                    this.contextEl.putImageData(this._getBarPointerImage(), 0, 0);
                    this._setBarPointers();
                    this._setMarkerPointers();
                    this._setIndicators();
                }

            }
        },
		  
        _reDrawMarkerPointer: function () {
            if (this.Model.frame.backgroundImageUrl) {
                var tmpData = !ej.isNullOrUndefined(this.customLabelImage) ? this.customLabelImage() : !ej.isNullOrUndefined(this.rangeImage) ? this.rangeImage : !ej.isNullOrUndefined(this.labelImage) ? this.labelImage : !ej.isNullOrUndefined(this.tickImage) ? this.tickImage : !ej.isNullOrUndefined(this.scaleImage) ? this.scaleImage : null;
                this.contextEl.putImageData(tmpData, 0, 0);
                this._setMarkerPointers();
            }
            else {
                if (this.contextEl.putImageData != "undefined") {
                    this.contextEl.putImageData(this._getMarkerPointerImage(), 0, 0);
                    this._setMarkerPointers();
                }

            }
        },
		  
        _reDrawCustomLabel: function () {
            if (this.Model.frame.backgroundImageUrl) {
                var tmpData = !ej.isNullOrUndefined(this.rangeImage) ? this.rangeImage : !ej.isNullOrUndefined(this.labelImage) ? this.labelImage : !ej.isNullOrUndefined(this.tickImage) ? this.tickImage : !ej.isNullOrUndefined(this.scaleImage) ? this.scaleImage : null;
                this.contextEl.putImageData(tmpData, 0, 0);
                this._setCustomLabel();
                this._setIndicators();
                this._setBarPointers();
                this._setMarkerPointers();
            }
            else {
                this.contextEl.putImageData(this._getCustomLabelImage(), 0, 0);
                this._setCustomLabel();
                this._setIndicators();
                this._setBarPointers();
                this._setMarkerPointers();

            }
        },
		  
        _reDrawRange: function () {
            if (this.Model.frame.backgroundImageUrl) {
                var tmpData = !ej.isNullOrUndefined(this.labelImage) ? this.labelImage : !ej.isNullOrUndefined(this.tickImage) ? this.tickImage : !ej.isNullOrUndefined(this.scaleImage) ? this.scaleImage : null;
                this.contextEl.putImageData(tmpData, 0, 0);
                this._setRange();
                this._setCustomLabel();
                this._setIndicators();
                this._setBarPointers();
                this._setMarkerPointers();
            }
            else {
                this.contextEl.putImageData(this._getRangeImage(), 0, 0);
                this._setRange();
                this._setCustomLabel();
                this._setIndicators();
                this._setBarPointers();
                this._setMarkerPointers();

            }
        },
		  
        _reDrawLabel: function () {
            if (this.Model.frame.backgroundImageUrl){
                var tmpData = !ej.isNullOrUndefined(this.tickImage) ? this.tickImage : !ej.isNullOrUndefined(this.scaleImage) ? this.scaleImage : null;
                this.contextEl.putImageData(tmpData, 0, 0);
                this._setLabels();
                this._setRange();
                this._setCustomLabel();
                this._setIndicators();
                this._setBarPointers();
                this._setMarkerPointers();
            }
            else {
                this.contextEl.putImageData(this._getLabelImage(), 0, 0);
                this._setLabels();
                this._setRange();
                this._setCustomLabel();
                this._setIndicators();
                this._setBarPointers();
                this._setMarkerPointers();

            }
        },
		  
        _reDrawTickMark: function () {
            if (this.Model.frame.backgroundImageUrl) {
                var tmpData = !ej.isNullOrUndefined(this.scaleImage) ? this.scaleImage : null;
                this.contextEl.putImageData(tmpData, 0, 0);
                this._setTicks();
                this._setLabels();
                this._setRange();
                this._setCustomLabel();
                this._setIndicators();
                this._setBarPointers();
                this._setMarkerPointers();
            }
            else {
                this.contextEl.putImageData(this._getTickImage(), 0, 0);
                this._setTicks();
                this._setLabels();
                this._setRange();
                this._setCustomLabel();
                this._setIndicators();
                this._setBarPointers();
                this._setMarkerPointers();

            }
        },
		  
        refresh: function () {
            this._init();
        },

        "export" : function(){
            var exports = this.model.exportSettings, image, type ,attr, form, data, input;

            if(exports.mode.toLowerCase() === 'client')
                this.exportImage(exports.fileName, exports.fileType);
            else {
                type = exports.type.toLowerCase() === 'jpg' ? 'image/jpeg' : 'image/png';
                image = this.canvasEl[0].toDataURL(type);
                
                attr = { action: exports.action, method: 'post' };
                form = ej.buildTag('form', "", null, attr);
				data = { name: 'Data', type: 'hidden', value: image};
				input = ej.buildTag('input', "", null, data);
                form.append(input).append(this);
                $('body').append(form);
                form.submit();
            }
        },
		  
		exportImage: function(fileName, fileType) {
			/// <summary>This function save the rendered canvas image</summary>
            /// <param name="fileName" type="String">fileName to which the image has been saved</param>
		    /// <param name="fileType" type="String">fileType to which the image has been saved</param>
		    if (ej.browserInfo().name === "msie" && parseFloat(ej.browserInfo().version) < 10) {
		        return false;
		    }
		    else {
		        var image = this.canvasEl[0].toDataURL();
		        image = image.replace(/^data:[a-z]*;,/, '');
		        var image1 = image.split(',');
		        var byteString = atob(image1[1]);
		        var buffer = new ArrayBuffer(byteString.length);
		        var intArray = new Uint8Array(buffer);
		        for (var i = 0; i < byteString.length; i++) {
		            intArray[i] = byteString.charCodeAt(i);
		        }
		        var blob = new Blob([buffer], { type: "image/png" });
		        if (ej.browserInfo().name === "msie")
		            window.navigator.msSaveOrOpenBlob(blob, fileName + '.' + fileType);
		        else {
		            var pom = document.createElement('a');
		            var url = URL.createObjectURL(blob);
		            pom.href = url;
		            pom.setAttribute('download', fileName + '.' + fileType);
		            if (document.createEvent) {
		                var e = document.createEvent("MouseEvents");
		                e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		                pom.dispatchEvent(e);
		            }
		            else if (pom.fireEvent) {
		                pom.fireEvent("onclick");
		            }
		        }
		        return true;
		    }
        },
		 
		resizeCanvas: function () {
		    if (_linearGaugeCount != 0)
		        _linearGaugeCount = _linearGaugeCount - 1;
		    else
		        _linearGaugeCount = $(".e-lineargauge").length - 1;
		    var state, chk = true;
		    if (!ej.isNullOrUndefined(this.GaugeEl.parent().attr("style")))
		        state = this.GaugeEl.parent().attr("style").split(";");
		    if (!ej.isNullOrUndefined(state)) {
		        $.each(state, function (key, val) {
		            while (val.indexOf("width") != -1) {
		                chk = val.indexOf("px") == -1 ? true : false;
		                break;
		            }
		        });
		    }
            if (chk) {
                var ratio = window.innerWidth / initialLinearDivWidth;
                this.model.width *=ratio;
				for(var i=0;this.model.scales[i]!=null;i++){
                this.model.scales[i].length *= ratio;
                for (var j = 0; this.model.scales[i].markerPointers[j] != null || this.model.scales[i].barPointers[j] != null || this.model.scales[i].indicators[j] != null || this.model.scales[i].customLabels[j] != null || this.model.scales[i].ranges[j] != null || this.model.scales[i].labels[j] != null || this.model.scales[i].ticks[j] != null; j++) {
                    if (!ej.isNullOrUndefined(this.model.scales[i].markerPointers[j])) {
                        this.model.scales[i].markerPointers[j].length *= ratio;
                        this.model.scales[i].markerPointers[j].width *= ratio;
                    }
                    if (!ej.isNullOrUndefined(this.model.scales[i].barPointers[j])) {
                        this.model.scales[i].barPointers[j].distanceFromScale *= ratio;
                        this.model.scales[i].barPointers[j].width *= ratio;
                    }
                    if (!ej.isNullOrUndefined(this.model.scales[i].indicators[j]) && this.model.scales[i].showIndicators) {
                        this.model.scales[i].indicators[j].height *= ratio;
                        this.model.scales[i].indicators[j].width *= ratio;
                        this.model.scales[i].indicators[j].position.x *= ratio;
                        this.model.scales[i].indicators[j].textLocation.x *= ratio;
                    }
                    if (!ej.isNullOrUndefined(this.model.scales[i].ticks[j])) {
                        this.model.scales[i].ticks[j].length *= ratio;
                        this.model.scales[i].ticks[j].width *= ratio;
                    }
                    if (!ej.isNullOrUndefined(this.model.scales[i].ranges[j])) {
                        this.model.scales[i].ranges[j].startWidth *= ratio;
                        this.model.scales[i].ranges[j].endWidth *= ratio;
                    }
                    if (!ej.isNullOrUndefined(this.model.scales[i].customLabels[j])) {
                        if (this.model.scales[i].customLabels[j].positionType != "outer")
                            this.model.scales[i].customLabels[j].position.x *= ratio;
                        this.model.scales[i].customLabels[j].font.size = (parseFloat(this.model.scales[i].customLabels[j].font.size.match(/\d+/)[0]) * ratio < 10) ? "10px" : ((parseFloat(this.model.scales[i].customLabels[j].font.size.match(/\d+/)[0]) * ratio) > this._customLblMaxSize) ? this._customLblMaxSize.toString() + 'px' : ((parseFloat(this.model.scales[i].customLabels[j].font.size.match(/\d+/)[0])) * ratio).toString() + 'px';
                    }
				}
				}
				//this._initialize();
				this._render();
				if (_linearGaugeCount == 0) {
				    initialLinearDivWidth = window.innerWidth;
				}
            }
        },
        //Client-Side Events
	 
		_onDrawTicks: function (tickAngle, tickValue) {
		    var tick = { index: this.tickIndex, element: this.tickEl[this.tickIndex], angle: parseInt(tickAngle), value: tickValue }
            var data = { Object: this, Model: this.Model, scaleElement: this.Model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, context: this.contextEl, style: this.style, position: this.region };
            this._trigger("drawTicks", data);
        },
		 
		_onDrawLabels: function (labelAngle) {
		    var label = { index: this.labelIndex, element: this.labelEl[this.labelIndex], angle: parseInt(labelAngle), value: this.labelValue }
		    var data = { object: this, Model: this.Model, scaleElement: this.Model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, context: this.contextEl, style: this.style, position: this.region, label: label };
		    this._trigger("drawLabels", data);
		},
		 
        _onDrawBarPointers: function (pointerValue) {
            var data = { object: this, Model: this.Model, scaleElement: this.Model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, barPointerIndex: this.barPointerIndex, barElement: this.barPointerEl[this.barPointerIndex], context: this.contextEl, style: this.style, position: this.region, pointerValue: pointerValue };
            this._trigger("drawBarPointers", data);
        },
		 
        _onDrawMarkerPointers: function (pointerAngle, pointerValue) {
            var data = { object: this, Model: this.Model, scaleElement: this.Model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, markerPointerIndex: this.markerPointerIndex, markerElement: this.markerPointerEl[this.markerPointerIndex], context: this.contextEl, style: this.style, position: this.region, pointerValue: pointerValue, pointerAngle: parseInt(pointerAngle) };
            this._trigger("drawMarkerPointers", data);
        },
		 
        _onDrawRange: function () {
            var data = { object: this, Model: this.Model, scaleElement: this.Model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, rangeIndex: this.rangeIndex, rangeElement: this.rangeEl[this.rangeIndex], context: this.contextEl, style: this.style, position: this.region };
            this._trigger("drawRange", data);
        },
	 
        _onDrawCustomLabel: function () {
            var data = { object: this, Model: this.Model, scaleElement: this.Model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, customLabelIndex: this.customLabelIndex, customLabelElement: this.customLabelEl[this.customLabelIndex], context: this.contextEl, style: this.style, position: this.region };
            this._trigger("drawCustomLabel", data);
        },
		 
        _onDrawIndicators: function (location, style) {
            var data = { object: this, Model: this.Model, scaleElement: this.Model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, indicatorIndex: this.indicatorIndex, indicatorEl: this.indicatorEl[this.indicatorIndex], context: this.contextEl, style: this.style, position: this.region };
            this._trigger("drawIndicators", data);
        },
		 
        onLoad: function () {
            var data = { object: this, Model: this.Model, scaleElement: this.Model.scales, context: this.contextEl };
            this._trigger("load", data);
        },
	 
        _onInit: function () {
            var data = { object: this, Model: this.Model, scaleElement: this.Model.scales, context: this.contextEl };
            this._trigger("init", data);
        },
		 
        _onRenderComplete: function () {
            var data = { object: this, Model: this.Model, scaleElement: this.Model.scales, context: this.contextEl };
            this._trigger("renderComplete", data);
        },
        
        _onMouseClick: function (pointerValue) {
            var markerpointer = { index: this.markerPointerIndex, element: this.markerPointerEl[this.markerPointerIndex], value: pointerValue };
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, context: this.contextEl, style: this.style, position: this.region, markerPointer: markerpointer };
            this._trigger("mouseClick", data);
        },
        
        _onMouseClickMove: function (pointerValue) {
            var markerpointer = { index: this.markerPointerIndex, element: this.markerPointerEl[this.markerPointerIndex], value: pointerValue };
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, context: this.contextEl, style: this.style, position: this.region, markerPointer: markerpointer };
            this._trigger("mouseClickMove", data);
        },
        
        _onMouseClickUp: function (pointerValue) {
            var markerpointer = { index: this.markerPointerIndex, element: this.markerPointerEl[this.markerPointerIndex], value: pointerValue };
            var data = { object: this, scaleElement: this.model.scales[this.scaleIndex], scaleIndex: this.scaleIndex, context: this.contextEl, style: this.style, position: this.region, markerPointer: markerpointer };
            this._trigger("mouseClickUp", data);
        },
        //_trigger: function (type, event, data) {
        //    var fn = this.Model[type];
        //    event = $.Event(event);
        //    event.type = type;
        //    $(this.GaugeEl).trigger(event, data);
        //    return !($.isFunction(fn) &&
        //        fn(this, data) === false ||
        //        event.isDefaultPrevented());
        //},

        //trigger: function (element, eventName, e) {
        //    e = $.extend(e || {}, new $.Event(eventName));
        //    e.stopPropagation();
        //    $(element).trigger(e);
        //    return e.isDefaultPrevented();
        //},
		 
        _restoreWidth: function () {
            this.scaleEl[this.scaleIndex].length = this.scaleEl[this.scaleIndex].length + this.bottomRadius + this.scaleEl[this.scaleIndex].width;
            if (this.Model.orientation == "Vertical") {
                if (this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise")
                    this.scaleStartY[this.scaleIndex] = this.scaleStartY[this.scaleIndex] - this.bottomRadius - this.scaleEl[this.scaleIndex].width / 2;
                else
                    this.scaleStartY[this.scaleIndex] = this.scaleStartY[this.scaleIndex] - this.scaleEl[this.scaleIndex].width / 2;
            }
            else {
                if (this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise")
                    this.scaleStartX[this.scaleIndex] = this.scaleStartX[this.scaleIndex] - this.bottomRadius - this.scaleEl[this.scaleIndex].width / 2;
                else
                    this.scaleStartX[this.scaleIndex] = this.scaleStartX[this.scaleIndex] - this.scaleEl[this.scaleIndex].width / 2;
            }
        },
		 
        _modifyWidth: function () {
            this.scaleEl[this.scaleIndex].length = this.scaleEl[this.scaleIndex].length - this.bottomRadius - this.scaleEl[this.scaleIndex].width;
            if (this.Model.orientation == "Vertical") {
                if (this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise")
                    this.scaleStartY[this.scaleIndex] = this.scaleStartY[this.scaleIndex] + this.bottomRadius + this.scaleEl[this.scaleIndex].width / 2;
                else
                    this.scaleStartY[this.scaleIndex] = this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2;
            }
            else {
                if (this.scaleEl[this.scaleIndex].direction.toLowerCase() == "clockwise")
                    this.scaleStartX[this.scaleIndex] = this.scaleStartX[this.scaleIndex] + this.bottomRadius + this.scaleEl[this.scaleIndex].width / 2;
                else
                    this.scaleStartX[this.scaleIndex] = this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2;
            }
        },
        // return y positions for vertical gauge
	 
        _getClockwiseLinePosition: function (value) {
            var tempVal, linePosition;
            tempVal = (value - this.scaleEl[this.scaleIndex].minimum) / (this.scaleEl[this.scaleIndex].maximum - this.scaleEl[this.scaleIndex].minimum) * 100;
            linePosition = this.Model.orientation == "Vertical" ? this.scaleStartY[this.scaleIndex] + parseInt((tempVal * this.scaleEl[this.scaleIndex].length) / 100) : this.scaleStartX[this.scaleIndex] + parseInt((tempVal * this.scaleEl[this.scaleIndex].length) / 100);
            return linePosition;
        },
		 
        _getCounterClockwiseLinePosition: function (value) {
            var tempVal, linePosition;
            tempVal = this.scaleEl[this.scaleIndex].maximum - value + this.scaleEl[this.scaleIndex].minimum;
            tempVal = (tempVal - this.scaleEl[this.scaleIndex].minimum) / (this.scaleEl[this.scaleIndex].maximum - this.scaleEl[this.scaleIndex].minimum) * 100;
            linePosition = this.Model.orientation == "Vertical" ? this.scaleStartY[this.scaleIndex] + parseInt((tempVal * this.scaleEl[this.scaleIndex].length) / 100) : this.scaleStartX[this.scaleIndex] + parseInt((tempVal * this.scaleEl[this.scaleIndex].length) / 100);
            return linePosition;
        },
		 
        _getValue: function (position) {
            var tempVal;
            if (this.Model.orientation == "Vertical")
                tempVal = ((position.y - this.scaleStartY[this.scaleIndex]) / this.scaleEl[this.scaleIndex].length) * 100;
            else
                tempVal = (((position.x - this.scaleStartX[this.scaleIndex])) / this.scaleEl[this.scaleIndex].length) * 100;
            var value = ((tempVal * (this.scaleEl[this.scaleIndex].maximum - this.scaleEl[this.scaleIndex].minimum)) + this.scaleEl[this.scaleIndex].minimum) / 100;
            if (this.scaleEl[this.scaleIndex].direction == "counterclockwise")
                value = this.scaleEl[this.scaleIndex].maximum - value;
            else
                value = this.scaleEl[this.scaleIndex].minimum + value;
            return value;
        },
		 
        _getPointerXPosition: function (element) {
            var startX, angle;
            if (this.Model.orientation == "Vertical") {
                if (this.markerPlacement == "far") {
                    startX = this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width + this.scaleEl[this.scaleIndex].border.width / 2 + element.distanceFromScale;
                    angle = 0;
                }
                if (this.markerPlacement == "near") {
                    startX = this.scaleStartX[this.scaleIndex] + element.distanceFromScale;
                    angle = 180;
                }
                if (this.markerPlacement == "center") {
                    if (element.type == "circle")
                        startX = this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - (Math.sqrt(element.length * element.length + element.width * element.width) / 2) + element.distanceFromScale;
                    else
                        startX = this.scaleStartX[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - element.width / 2 + element.distanceFromScale;
                    angle = 0;
                }
            }
            else {
                if (this.markerPlacement == "far") {
                    startX = this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width + this.scaleEl[this.scaleIndex].border.width / 2 + element.distanceFromScale;
                    angle = 90;
                }
                if (this.markerPlacement == "near") {
                    startX = this.scaleStartY[this.scaleIndex] - this.scaleEl[this.scaleIndex].border.width / 2 + element.distanceFromScale;
                    angle = 270;
                }
                if (this.markerPlacement == "center") {
                    if (element.type == "circle")
                        startX = this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - (Math.sqrt(element.length * element.length + element.width * element.width) / 2) + element.distanceFromScale;
                    else
                        startX = this.scaleStartY[this.scaleIndex] + this.scaleEl[this.scaleIndex].width / 2 - element.length / 2 + element.distanceFromScale;
                    angle = 90;
                }
            }
            return { "startx": startX, "angle": angle };
        },
		 
        _hexFromRGB: function (r, g, b) {
            var hex = [r.toString(16), g.toString(16), b.toString(16)];
            $.each(hex, function (nr, val) { if (val.length === 1) { hex[nr] = "0" + val; } });
            return hex.join("").toUpperCase();
        },
	 
        _setGradientColor: function (element, gradients, options) {
            if (options.Name || typeof (options) === "string") {
                gradients.addColorStop(0, options);
                gradients.addColorStop(1, options);
            }
            else
                $.each(options, function (index, colorElement) {
                    gradients.addColorStop(colorElement.colorStop != NaN ? colorElement.colorStop : 0, typeof (colorElement.color) === "string" ? colorElement.color : colorElement.color);
                });
        },
		 
        _getFontString: function (element, font) {
            return font.fontStyle + " " + ((font.size == null) ? "11px" : font.size) + " " + font.fontFamily;
        },
	 
        _setPointerDimension: function (style, element) {
            if (element.Model.orientation) {
                if (element.Model.orientation == "horizontal") {
                    var tempWidth = style.width;
                    var tempHeight = style.height;
                    style.height = tempWidth;
                    style.width = tempHeight;
                }
            }
            return style;
        },
		 
        _setContextRotation: function (style, element) {
            element.contextEl.rotate(Math.PI * (style.angle / 180));
        },
        _browserInfo: function () {
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
        wireEvents: function () {
            $(this.canvasEl).off();
            var matched = jQuery.uaMatch(navigator.userAgent),
               browserInfo = this._browserInfo(),
               isPointer = browserInfo.isMSPointerEnabled,
               isIE11Pointer = browserInfo.pointerEnabled;
            this.startEv = isPointer ? (isIE11Pointer ? "pointerdown" : "MSPointerDown") : "touchstart mousedown",
            this.endEv = isPointer ? (isIE11Pointer ? "pointerup" : "MSPointerUp") : "touchend mouseup",
            this.moveEv = isPointer ? (isIE11Pointer ? "pointermove" : "MSPointerMove") : "touchmove mousemove",
            this.leaveEv = isPointer ? (isIE11Pointer ? "pointerleave" : "MSPointerOut") : "touchleave mouseleave",
            this.scrollEv = matched.browser.toLowerCase() == "mozilla" ? (isIE11Pointer ? "mousewheel" : "DOMMouseScroll") : "mousewheel";
            this.model.browserInfo = browserInfo;

            var action= this.model.readOnly? 'pan-y pan-x' : 'none';
            $(this.element).css('touch-action', action);

            this.onMouseMoveHandler = $.proxy(this._onMouseMove, this);
            this.onMouseUpHandler = $.proxy(this._onMouseUp, this);
            this.onHoverOCustomLabel = $.proxy(this._onHoverOCustomLabel, this);
            this.onLeaveOCustomLabel = $.proxy(this._onLeaveOCustomLabel, this);
            if (!this.model.readOnly) {
                this.onMouseDownHandler = $.proxy(this._onMouseDown, this);
                this._on($(this.element), this.startEv, this._onMouseDown);
            }

            this._on($(this.canvasEl), this.startEv, this.lgMouseDown);
            this._on($(this.canvasEl), this.endEv, this.lgMouseUp);

            if (this.model.tooltip.showCustomLabelTooltip || this.model.tooltip.showLabelTooltip) {
                $(this.canvasEl).bind(this.moveEv, this.onMouseMoveHandler);
                $(this.canvasEl).bind(this.scrollEv, this.onMouseMoveHandler);
                $(this.canvasEl).bind(this.startEv, this.onMouseDownHandler);
                $(this.canvasEl).bind(this.endEv, this.onLeaveOCustomLabel);
                $(this.canvasEl).bind(this.leaveEv, this.onLeaveOCustomLabel);
            }
            this.element.bind(this.startEv, this.onMouseDownHandler);
            if (this.model.tooltip.showCustomLabelTooltip) {
                $('.' + this._id + 'outercustomlbl').bind("mouseenter", this.onHoverOCustomLabel);
                $('.' + this._id + 'outercustomlbl').bind(this.leaveEv, this.onLeaveOCustomLabel);
            }
            this._on($(this.canvasEl), 'contextmenu', this._lgRightClick);
        },
		 
        unWireEvents: function () {
            this.element.unbind(this.startEv, this.onMouseDownHandler);            
            this._off($(this.canvasEl), 'contextmenu', this._lgRightClick);
            this._off($(this.canvasEl), this.startEv, this.lgMouseDown);
            this._off($(this.canvasEl), this.endEv, this.lgMouseUp);
        },

        lgMouseDown: function(e){
            if(ej.isTouchDevice() && this.model.rightClick != '')
                this._longPressTimer = new Date();
        },

        lgMouseUp: function(e){
            var end = new Date();
            if(this._doubleTapTimer != null && end - this._doubleTapTimer < 300)
                this._lgDoubleClick(e);
            this._doubleTapTimer = end;
            if(ej.isTouchDevice() && this.model.rightClick != '' && new Date() - this._longPressTimer > 1500)
                this._lgRightClick(e);
        },
       
        _onHoverOCustomLabel: function (e) {
            if (e.currentTarget.innerHTML != null || e.currentTarget.innerHTML != "")
                this._showTooltip(e, e.currentTarget.innerHTML);
        },
        
        _onLeaveOCustomLabel: function (evt) {
            if (this.isTouch(evt)) {
                this._performTooltip(evt);
				window.clearTimeout(this.model.timer);
				this.model.timer = setTimeout(function () {
					$('.tooltipDiv').fadeOut(500);
	            }, 1200);
            }
            else {
                this._hideTooltip();
            }
        },
		 
        isTouch: function (evt) {
            var event = evt.originalEvent ? evt.originalEvent : evt;
            if ((event.pointerType == "touch") || (event.pointerType == 2) || (event.type.indexOf("touch") > -1))
                return true;
            return false;
        },

        _blockDefaultActions: function (e) {
            e.cancelBubble = true;
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
        },
		 
        _onMouseDown: function (e) {
            var endPoint, position, greaterValue, lesserValue, startX;
            this._blockDefaultActions(e);
            this._mouseDown = true;
            var padding = this.isTouch(e) ? 10 : 0;
            var touch = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
            endPoint = { "x": touch.pageX - $(this.canvasEl).offset().left - (this.Model.frame.outerWidth + this.Model.frame.innerWidth), "y": touch.pageY - $(this.canvasEl).offset().top - (this.Model.frame.outerWidth + this.Model.frame.innerWidth) };
            var self = this;
            if (!this.model.readOnly) {
                $.each(this.Model.scales, function (index, element) {
                    self.scaleIndex = index;
                    if (element.markerPointers != null) {
                        self.markerPointerEl = element.markerPointers;
                        $.each(element.markerPointers, function (mpIndex, mpElement) {
                            if (self.scaleEl[self.scaleIndex].direction.toLowerCase() == "clockwise")
                                position = self._getClockwiseLinePosition(mpElement.value);
                            else
                                position = self._getCounterClockwiseLinePosition(mpElement.value);
                            greaterValue = position + mpElement.width;
                            lesserValue = position - mpElement.width;
                            startX = self._getPointerXPosition(mpElement).startx;
                            var isOffset = self._isBetween(((self.Model.orientation == "horizontal" ? endPoint.y : endPoint.x) - mpElement.width), ((self.Model.orientation == "horizontal" ? endPoint.y : endPoint.x) + mpElement.width), startX, padding);
                            if ((self.Model.orientation == "horizontal" ? self._isBetween(lesserValue, greaterValue, endPoint.x, padding) : self._isBetween(lesserValue, greaterValue, endPoint.y, padding)) && isOffset)
                                self.activeElement = mpElement;
                            if (self.Model.scales[self.scaleIndex].barPointers[mpIndex] != null)
                                self.activeBarElement = self.Model.scales[self.scaleIndex].barPointers[mpIndex];
                            if (self.model.mouseClick)
                                self._onMouseClick(mpElement.value);
                            self.onMouseMoveHandler = $.proxy(self._onMouseMove, self);
                            self.onMouseUpHandler = $.proxy(self._onMouseUp, self);
                            $(document).bind(self.moveEv, self.onMouseMoveHandler);
                            $(document).bind(self.endEv, self.onMouseUpHandler);
                        });
                    }
                });
            }
        },
		 
        _isBetween: function (first, last, number, padding) {
            return (first < last ? number >= first - padding && number <= last + padding : number >= last - padding && number <= first + padding);
        },

        _lgDoubleClick: function(e){
            if(this.model.doubleClick != '')
                this._trigger("doubleClick", {data:{event: e}});
        },
    
        _lgRightClick: function(e){
            if(this.model.rightClick != '')
                this._trigger("rightClick", {data:{event: e}});
        },
		 
        _onMouseUp: function () {
            this._mouseDown = false;
            this.mouseMove = false;
            $(document).unbind(self.moveEv, self.onMouseMoveHandler);
            $(document).unbind(self.endEv, self.onMouseUpHandler);
            if (this.model.mouseClickUp && this.activeElement)
                this._onMouseClickUp(this.activeElement.value);
            this.activeElement = null;
        },
        _mousePosition: function (evt) {
            if (!ej.util.isNullOrUndefined(evt.pageX) && evt.pageX > 0)
                return { x: evt.pageX, y: evt.pageY };
            else if (evt.originalEvent && !ej.util.isNullOrUndefined(evt.originalEvent.pageX) && evt.originalEvent.pageX > 0)
                return { x: evt.originalEvent.pageX, y: evt.originalEvent.pageY };
            else if (evt.originalEvent && evt.originalEvent.changedTouches != undefined) {
                if (!ej.util.isNullOrUndefined(evt.originalEvent.changedTouches[0].pageX) && evt.originalEvent.changedTouches[0].pageX > 0)
                    return { x: evt.originalEvent.changedTouches[0].pageX, y: evt.originalEvent.changedTouches[0].pageY };
            }
            else
                return { x: 0, y: 0 };

        },
        _calTouchPosition: function (e) {
            var matched = jQuery.uaMatch(navigator.userAgent);
            var mouseposition = this._mousePosition(e);
            e.pageX = mouseposition.x;
            e.pageY = mouseposition.y;
        },
        getEvent: function (event) {
            return (event.targetTouches && event.targetTouches[0]) ? event.targetTouches[0] : event
        },
        _onMouseMove: function (e) {
            if (this._mouseDown && !ej.isNullOrUndefined(this.activeElement)) {
                this._blockDefaultActions(e);
                var touch = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                var endPoint = { "x": touch.pageX - $(this.canvasEl).offset().left - (this.Model.frame.outerWidth + this.Model.frame.innerWidth), "y": touch.pageY - $(this.canvasEl).offset().top - (this.Model.frame.outerWidth + this.Model.frame.innerWidth) };
                this.activeElement.value = this._getValue(endPoint);
                this.value(this.activeElement.value);
                if (this.model.mouseClickMove)
                    this._onMouseClickMove(this.activeElement.value);
                if (this.activeBarElement)
                    this.activeBarElement.value = this._getValue(endPoint);
                if (this.contextEl.putImageData)
                    this._reDrawBarPointer();
                else
                    this._init();
            }
            else {
                if ((this.model.tooltip.showCustomLabelTooltip || this.model.tooltip.showLabelTooltip) && (!this.isTouch(e))) {
                    this._performTooltip(e);
                    
                    
                }
            }
        },

        _performTooltip: function (e) {
            var hit = false;
            var padding = 10;
            var isTouch = this.isTouch(e);
            for (var i = 0; this._savedPoints[i] != null; i++) {
                if (isTouch) {
                    var mousedownCords = this._calTouchPosition(e),
                        pointer = this.getEvent(e),
                        currX = pointer.pageX,
                        currY = pointer.pageY;
                    var current = { "X": currX - $(this.canvasEl).offset().left, "Y": currY - $(this.canvasEl).offset().top };
                    if (current.X > this._savedPoints[i].startX - padding && current.X < (this._savedPoints[i].startX + this._savedPoints[i].width + padding) && current.Y > this._savedPoints[i].startY - padding && current.Y < (this._savedPoints[i].startY + this._savedPoints[i].height + padding)) {
                        this._showTooltip(e, this._savedPoints[i].value);
                        hit = true;
                    }
                    else if (hit == false)
                        this._hideTooltip();
                } else {
                    var current = { "X": e.pageX - $(this.canvasEl).offset().left, "Y": e.pageY - $(this.canvasEl).offset().top };

                    if (current.X > this._savedPoints[i].startX && current.X < (this._savedPoints[i].startX + this._savedPoints[i].width) && current.Y > this._savedPoints[i].startY && current.Y < (this._savedPoints[i].startY + this._savedPoints[i].height)) {
                        this._showTooltip(e, this._savedPoints[i].value);
                        hit = true;
                    }
                    else if (hit == false)
                        this._hideTooltip();
                }
            }
        },
     
        _showTooltip: function (event, val) {
            var tooltipText = val + "";
            var tooltipdiv = $('.tooltipDiv');
            if (tooltipdiv.length == 0) {
                tooltipdiv = $("<div class='tooltipDiv' style='position: absolute; z-index: 105; display: block;'></div>");
                $(document.body).append(tooltipdiv);
            }
            if (this.model.tooltip.templateID != "" && this.model.tooltip.templateID != null) {
                var cloneNode = $("#" + this.model.tooltip.templateID).clone();
                $('.tooltipDiv')[0].innerHTML = "";
                $(cloneNode).css("display", "block").appendTo(tooltipdiv);
                $(tooltipdiv).css({
                    'background-color': this.model.backgroundColor,
                    'border': '1px solid #bbbcbb',
                    'border-radius': '3px',
                    'color': '#565656'
                });
                tooltipdiv.html(tooltipdiv.html().replace('#label#', tooltipText));
            } else {
                $(tooltipdiv).html(tooltipText);
                $(tooltipdiv).css({
                    'background-color': 'white',
                    'border': '2px solid #bbbcbb',
                    'position': 'absolute',
                    'padding': '10px 20px',
                    'margin-top': '5px',
                    'text-align': 'left',
                    'font': '12px Segoe UI',
                    'font-stretch': 'condensed',
                    'display': 'inline-block',
                    'border-radius': '3px',
                    'color': '#565656',
                    'width': 'auto'
                });
            }
            var tooltipMargin = 10;
            var xPos = event.pageX + tooltipMargin;
            var yPos = event.pageY + tooltipMargin;
            xPos = ((xPos + $(tooltipdiv).width()) < $(window).width()) ? (xPos) : (xPos - $(tooltipdiv).width());
            yPos = ((yPos + $(tooltipdiv).height()) < $(window).height()) ? (yPos) : (yPos - $(tooltipdiv).height());
            $(tooltipdiv).css("left", xPos);
            $(tooltipdiv).css("top", yPos);
            $('.tooltipDiv').show();
        },
        
        _hideTooltip: function () {
            $('.tooltipDiv').remove();//.fadeOut(0, "linear");
        },
       
        _setTheme: function () {
			var theme = this.model.theme.toLowerCase();
            var selectedTheme = this.model.themeProperties[theme];
            this._setThemeColors(selectedTheme);
        },
		 
        _setThemeColors: function (selectedTheme) {
            var result = [], jsonObj = this.model.themeProperties;
            for (var name in jsonObj) {
                result.push(name);
            }
            for (var th = 0; th < result.length; th++) {
                this.model.backgroundColor = ((!this.model.backgroundColor || this.model.backgroundColor == jsonObj[result[th]].scales.backgroundColor) ? selectedTheme.scales.backgroundColor : this.model.backgroundColor);
                this.model.borderColor = ((!this.model.borderColor || this.model.borderColor == jsonObj[result[th]].scales.border.color) ? selectedTheme.scales.border.color : this.model.borderColor);
                this.model.labelColor = ((!this.model.labelColor || this.model.labelColor == jsonObj[result[th]].scales.labels.labelColor) ? selectedTheme.scales.labels.labelColor : this.model.labelColor);
                this.model.tickColor = ((!this.model.tickColor || this.model.tickColor == jsonObj[result[th]].scales.ticks.color) ? selectedTheme.scales.ticks.color : this.model.tickColor);

                for (var i = 0; i < this.model.scales.length; i++) {
                    for (var m = 0; m < this.model.scales[i].markerPointers.length; m++) {
                        this.model.scales[i].markerPointers[m].backgroundColor = (!this.model.scales[i].markerPointers[m].backgroundColor || this.model.scales[i].markerPointers[m].backgroundColor == jsonObj[result[th]].scales.markerPointers.backgroundColor) ? selectedTheme.scales.markerPointers.backgroundColor : this.model.scales[i].markerPointers[m].backgroundColor;
                        this.model.scales[i].markerPointers[m].border.color = (!this.model.scales[i].markerPointers[m].border.color || this.model.scales[i].markerPointers[m].border.color == jsonObj[result[th]].scales.markerPointers.border.color) ? selectedTheme.scales.markerPointers.border.color : this.model.scales[i].markerPointers[m].border.color;
                    }
                    for (var b = 0; b < this.model.scales[i].barPointers.length; b++) {
                        this.model.scales[i].barPointers[b].backgroundColor = (!this.model.scales[i].barPointers[b].backgroundColor || this.model.scales[i].barPointers[b].backgroundColor == jsonObj[result[th]].scales.barPointers.backgroundColor) ? selectedTheme.scales.barPointers.backgroundColor : this.model.scales[i].barPointers[b].backgroundColor;
                        this.model.scales[i].barPointers[b].border.color = (!this.model.scales[i].barPointers[b].border.color || this.model.scales[i].barPointers[b].border.color == jsonObj[result[th]].scales.barPointers.border.color) ? selectedTheme.scales.barPointers.border.color : this.model.scales[i].barPointers[b].border.color;
                    }
                }
            }
        }
    });
    
    ej.datavisualization.LinearGauge.TickType = {
          
        MajorInterval: "majorinterval",
          
        MinorInterval: "minorinterval"
    };
      
    ej.datavisualization.LinearGauge.LabelType = {
          
        Major: "major",
          
        Minor: "minor"
    };
      
    ej.datavisualization.LinearGauge.FontStyle = {
          
        Bold: "bold",
          
        Italic: "italic",
          
        Regular: "regular",
          
        Strikeout: "strikeout",
          
        Underline: "underline"
    };


      
    ej.datavisualization.LinearGauge.PointerPlacement = {
          
        Near: "near",
          
        Far: "far",
          
        Center: "center"
    };
      
    ej.datavisualization.LinearGauge.TickPlacement = {
          
        Near: "near",
          
        Far: "far",
          
        Center: "center"
    };
      
    ej.datavisualization.LinearGauge.LabelPlacement = {
          
        Near: "near",
          
        Far: "far",
          
        Center: "center"
    };
      
    ej.datavisualization.LinearGauge.RangePlacement = {
          
        Near: "near",
          
        Far: "far",
          
        Center: "center"
    };
      

    ej.datavisualization.LinearGauge.UnitTextPlacement = {
          
        Front: "front",
          
        Back: "back"
    };
      

    ej.datavisualization.LinearGauge.Directions = {
          
        Clockwise: "clockwise",
          
        CounterClockwise: "counterclockwise"
    };
      
    ej.datavisualization.LinearGauge.ScaleType = {
          
        Rectangle: "rectangle",
          
        RoundedRectangle: "roundedrectangle",
          
        Thermometer: "thermometer"
    };
      
    ej.datavisualization.LinearGauge.IndicatorType = {
          
        Rectangle: "rectangle",
          
        Circle: "circle",
          
        RoundedRectangle: "roundedrectangle",
          
        Text: "text"
    };
      
    ej.datavisualization.LinearGauge.MarkerType = {
          
        Rectangle: "rectangle",
          
        Triangle: "triangle",
          
        Ellipse: "ellipse",
          
        Diamond: "diamond",
          
        Pentagon: "pentagon",
          
        Circle: "circle",
          
        Star: "star",
          
        Slider: "slider",
          
        Pointer: "pointer",
          
        Wedge: "wedge",
          
        Trapezoid: "trapezoid",
          
        RoundedRectangle: "roundedrectangle"
    };
      
    ej.datavisualization.LinearGauge.CustomLabelPositionType = {
          
        Inner: "inner",
          
        Outer: "outer"
    };
      
    ej.datavisualization.LinearGauge.OuterCustomLabelPosition = {
          
        Left: "left",
          
        Right: "right",
          
        Top: "top",
          
        Bottom: "bottom",
    };
	  
    ej.datavisualization.LinearGauge.Themes = {
	  
        FlatLight: 'flatlight',

		FlatDark: 'flatdark'
    };

})(jQuery, Syncfusion);
;;
/**
* @fileOverview Plugin to style the Html Button elements
* @copyright Copyright Syncfusion Inc. 2001 - 2020. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
* @version 12.1 
* @author <a href="mailto:licensing@syncfusion.com">Syncfusion Inc</a>
*/

/*global window, Image, atob, ArrayBuffer, Uint8Array, Blob, URL, document, jQuery, Syncfusion  */
(function ($, ej, undefined) {

    var initialDigitalDivWidth, _digitalGaugeCount, initialGaugeCount;
    ej.widget({ "ejDigitalGauge": "ej.datavisualization.DigitalGauge" }, {
     
        element: null,
     
        model: null,
        validTags: ["div", "span"],
        _rootCSS: "e-digitalgauge",
        
        defaults:   {
              
            exportSettings:{
                mode: 'client',
                type: 'png',
                fileName: 'DigitalGauge',
                action: ''
            },

            segmentData: {
                "0": [0, 1, 2, 3, 4, 5, 14, 15], "1": [1, 2], "2": [0, 14, 1, 6, 8, 4, 3, 15], "3": [0, 1, 2, 3, 6, 8, 14, 15], "4": [1, 2, 5, 6, 8], "5": [0, 2, 3, 5, 6, 8, 14, 15], "6": [0, 2, 3, 4, 5, 6, 8, 14, 15],
                "7": [0, 1, 2, 14], "8": [0, 1, 2, 3, 4, 5, 6, 8, 14, 15], "9": [0, 1, 2, 3, 5, 6, 8, 14, 15], "A": [0, 1, 2, 4, 5, 6, 8, 14], "B": [0, 1, 2, 3, 7, 9, 8, 14, 15], "C": [0, 3, 4, 5, 14, 15],
                "D": [0, 1, 2, 3, 7, 9, 14, 15], "E": [0, 3, 4, 5, 6, 8, 14, 15], "F": [0, 4, 5, 6, 8, 14], "G": [0, 2, 3, 4, 5, 8, 14, 15], "H": [1, 2, 4, 5, 6, 8], "I": [0, 3, 7, 9, 14, 15],
                "J": [1, 2, 3, 4, 15], "K": [4, 5, 6, 10, 11], "L": [3, 4, 5, 15], "M": [1, 2, 4, 5, 10, 13], "N": [1, 2, 4, 5, 11, 13], "O": [0, 1, 2, 3, 4, 5, 14, 15], "P": [0, 1, 4, 5, 6, 8, 14],
                "Q": [0, 1, 2, 3, 4, 5, 11, 14, 15], "R": [0, 1, 4, 5, 6, 8, 11, 14], "S": [0, 2, 3, 5, 6, 8, 14, 15], "T": [0, 7, 9, 14], "U": [1, 2, 3, 4, 5, 15], "V": [4, 5, 10, 12], "W": [1, 2, 4, 5, 11, 12],
                "X": [10, 11, 12, 13], "Y": [1, 5, 6, 7, 8], "Z": [0, 3, 10, 12, 14, 15]
            },
              
            matrixSegmentData: {
                "1": [0, 3, 0, 4, 1, 1, 1, 2, 1, 3, 1, 4, 2, 3, 2, 4, 3, 3, 3, 4, 4, 3, 4, 4, 5, 3, 5, 4, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "2": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 1, 5, 1, 6, 2, 5, 2, 6, 3, 4, 3, 5, 4, 3, 4, 2, 5, 2, 5, 1, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "3": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 1, 5, 1, 6, 2, 5, 2, 6, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 5, 4, 6, 5, 5, 5, 6, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5],
                "4": [0, 3, 0, 4, 0, 5, 1, 2, 1, 3, 1, 4, 1, 5, 2, 1, 2, 2, 2, 4, 2, 5, 3, 0, 3, 1, 3, 4, 3, 5, 4, 0, 4, 1, 4, 2, 4, 3, 4, 4, 4, 5, 4, 6, 5, 4, 5, 5, 6, 4, 6, 5],
                "5": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 2, 1, 2, 2, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 5, 4, 6, 5, 5, 5, 6, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "6": [0, 3, 0, 4, 0, 5, 0, 6, 1, 2, 1, 3, 2, 1, 2, 2, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 1, 4, 2, 4, 3, 4, 6, 4, 7, 5, 2, 5, 3, 5, 6, 5, 7, 6, 3, 6, 4, 6, 5, 6, 6],
                "7": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 1, 6, 1, 7, 2, 5, 2, 6, 3, 4, 3, 5, 4, 3, 4, 4, 5, 2, 5, 3, 6, 1, 6, 2],
                "8": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 1, 4, 2, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "9": [0, 2, 0, 3, 0, 4, 0, 5, 1, 1, 1, 2, 1, 5, 1, 6, 2, 1, 2, 2, 2, 4, 2, 5, 2, 6, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 5, 4, 6, 5, 5, 5, 6, 6, 2, 6, 3, 6, 4, 6, 4, 6, 5],
                "0": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 1, 3, 2, 3, 6, 3, 7, 4, 1, 4, 2, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "a": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 6, 1, 7, 2, 6, 2, 7, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 3, 7, 4, 1, 4, 2, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6, 6, 7],
                "b": [0, 1, 0, 2, 1, 1, 1, 2, 2, 1, 2, 2, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 1, 4, 2, 4, 3, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "c": [1, 3, 1, 4, 1, 5, 1, 6, 2, 2, 2, 3, 3, 1, 3, 2, 4, 1, 4, 2, 5, 2, 5, 3, 6, 3, 6, 4, 6, 5, 6, 6],
                "d": [0, 6, 0, 7, 1, 6, 1, 7, 2, 6, 2, 7, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 3, 7, 4, 1, 4, 2, 4, 5, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6, 6, 7],
                "e": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 1, 4, 2, 5, 1, 5, 2, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6, 6, 7],
                "f": [0, 4, 0, 5, 0, 6, 0, 7, 1, 3, 1, 4, 2, 3, 2, 4, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 3, 7, 4, 3, 4, 4, 5, 3, 5, 4, 6, 3, 6, 4],
                "g": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 1, 1, 1, 2, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 3, 7, 4, 6, 4, 7, 5, 6, 5, 7, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "h": [0, 1, 0, 2, 1, 1, 1, 2, 2, 1, 2, 2, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 1, 4, 2, 4, 3, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 1, 6, 2, 6, 6, 6, 7],
                "i": [0, 3, 0, 4, 2, 1, 2, 2, 2, 3, 2, 4, 3, 3, 3, 4, 4, 3, 4, 4, 5, 3, 5, 4, 6, 3, 6, 4],
                "j": [1, 5, 1, 6, 2, 5, 2, 6, 3, 5, 3, 6, 4, 1, 4, 2, 4, 5, 4, 6, 5, 1, 5, 2, 5, 5, 5, 6, 6, 2, 6, 3, 6, 4, 6, 5],
                "k": [0, 1, 0, 2, 1, 1, 1, 2, 1, 4, 1, 5, 2, 1, 2, 2, 2, 3, 2, 4, 3, 1, 3, 2, 3, 3, 4, 1, 4, 2, 4, 3, 4, 4, 4, 5, 5, 1, 5, 2, 5, 5, 5, 6, 6, 1, 6, 2, 6, 6, 6, 7],
                "l": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 5, 1, 6, 2, 5, 2, 6, 3, 5, 3, 6, 4, 5, 4, 6, 5, 5, 5, 6, 6, 5, 6, 6],
                "m": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 2, 0, 2, 1, 2, 3, 2, 4, 2, 6, 2, 7, 3, 0, 3, 1, 3, 3, 3, 4, 3, 6, 3, 7, 4, 0, 4, 1, 4, 3, 4, 4, 4, 6, 4, 7, 5, 0, 5, 1, 5, 3, 5, 4, 5, 6, 5, 7, 6, 0, 6, 1, 6, 3, 6, 4, 6, 6, 6, 7],
                "n": [1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 2, 0, 2, 1, 2, 2, 2, 6, 2, 7, 3, 0, 3, 1, 3, 6, 3, 7, 4, 0, 4, 1, 4, 6, 4, 7, 5, 0, 5, 1, 5, 6, 5, 7, 6, 0, 6, 1, 6, 6, 6, 7],
                "o": [1, 2, 1, 3, 1, 4, 1, 5, 2, 1, 2, 2, 2, 5, 2, 6, 3, 1, 3, 2, 3, 5, 3, 6, 4, 1, 4, 2, 4, 5, 4, 6, 5, 1, 5, 2, 5, 5, 5, 6, 6, 2, 6, 3, 6, 4, 6, 5],
                "p": [1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 2, 1, 2, 2, 2, 3, 2, 6, 2, 7, 3, 1, 3, 2, 3, 6, 3, 7, 4, 1, 4, 2, 4, 3, 4, 4, 4, 5, 4, 6, 5, 1, 5, 2, 6, 1, 6, 2],
                "q": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 1, 1, 1, 2, 1, 5, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 1, 3, 2, 3, 5, 3, 6, 3, 7, 4, 2, 4, 3, 4, 4, 4, 5, 4, 6, 4, 7, 5, 6, 5, 7, 6, 6, 6, 7],
                "r": [0, 1, 0, 3, 0, 4, 0, 5, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 2, 1, 2, 2, 2, 6, 3, 1, 3, 2, 4, 1, 4, 2, 5, 1, 5, 2, 6, 1, 6, 2],
                "s": [1, 2, 1, 3, 1, 4, 1, 5, 2, 1, 2, 2, 3, 1, 3, 2, 4, 3, 4, 4, 5, 4, 5, 5, 6, 1, 6, 2, 6, 3, 6, 4],
                "t": [0, 3, 0, 4, 1, 3, 1, 4, 2, 1, 2, 2, 2, 3, 2, 4, 2, 5, 2, 6, 3, 3, 3, 4, 4, 3, 4, 4, 5, 3, 5, 4, 6, 4, 6, 5, 6, 6, 6, 7],
                "u": [1, 1, 1, 2, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 1, 3, 2, 3, 6, 3, 7, 4, 1, 4, 2, 4, 6, 4, 7, 5, 1, 5, 2, 5, 5, 5, 6, 5, 7, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6, 6, 7],
                "v": [1, 1, 1, 2, 1, 6, 1, 7, 2, 2, 2, 3, 2, 5, 2, 6, 3, 2, 3, 3, 3, 5, 3, 6, 4, 3, 4, 4, 4, 5, 5, 4, 5, 5, 6, 4],
                "w": [0, 0, 0, 1, 0, 6, 0, 7, 1, 0, 1, 1, 1, 6, 1, 7, 2, 0, 2, 1, 2, 3, 2, 4, 2, 6, 2, 7, 3, 0, 3, 1, 3, 3, 3, 4, 3, 6, 3, 7, 4, 0, 4, 1, 4, 3, 4, 4, 4, 6, 4, 7, 5, 0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6, 5, 7, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "x": [1, 1, 1, 2, 1, 6, 1, 7, 2, 2, 2, 3, 2, 5, 2, 6, 3, 3, 3, 4, 3, 5, 4, 3, 4, 4, 4, 5, 5, 2, 5, 3, 5, 5, 5, 6, 6, 1, 6, 2, 6, 6, 6, 7],
                "y": [1, 1, 1, 2, 1, 5, 1, 6, 2, 1, 2, 2, 2, 5, 2, 6, 3, 2, 3, 3, 3, 4, 3, 5, 4, 3, 4, 4, 5, 2, 5, 3, 6, 1, 6, 2],
                "z": [1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 2, 6, 2, 7, 3, 5, 3, 6, 4, 4, 4, 5, 5, 3, 5, 4, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6, 6, 7],
                "A": [0, 3, 0, 4, 1, 2, 1, 3, 1, 4, 1, 5, 2, 2, 2, 3, 2, 4, 2, 5, 3, 1, 3, 2, 3, 5, 3, 6, 4, 1, 4, 2, 4, 3, 4, 4, 4, 5, 4, 6, 5, 1, 5, 2, 5, 5, 5, 6, 6, 0, 6, 1, 6, 6, 6, 7],
                "B": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 1, 3, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 1, 4, 2, 4, 3, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "C": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 2, 0, 2, 1, 3, 0, 3, 1, 4, 0, 4, 1, 5, 1, 5, 2, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "D": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 1, 3, 2, 3, 6, 3, 7, 4, 1, 4, 2, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "E": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 2, 1, 2, 2, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 1, 4, 2, 5, 1, 5, 2, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "F": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 2, 1, 2, 2, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 1, 4, 2, 5, 1, 5, 2, 6, 1, 6, 2],
                "G": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 2, 0, 2, 1, 3, 0, 3, 1, 3, 4, 3, 5, 3, 6, 4, 0, 4, 1, 4, 6, 5, 1, 5, 2, 5, 6, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "H": [0, 1, 0, 2, 0, 6, 0, 7, 1, 1, 1, 2, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 3, 7, 4, 1, 4, 2, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 1, 6, 2, 6, 6, 6, 7],
                "I": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 4, 2, 4, 3, 4, 4, 4, 5, 4, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6, 6, 7],
                "J": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 5, 1, 6, 2, 5, 2, 6, 3, 5, 3, 6, 4, 1, 4, 2, 4, 5, 4, 6, 5, 1, 5, 2, 5, 5, 5, 6, 6, 2, 6, 3, 6, 4, 6, 5],
                "K": [0, 1, 0, 2, 0, 5, 0, 6, 1, 1, 1, 2, 1, 4, 1, 5, 2, 1, 2, 2, 2, 3, 2, 4, 3, 1, 3, 2, 3, 3, 4, 1, 4, 2, 4, 3, 4, 4, 5, 1, 5, 2, 5, 4, 5, 5, 6, 1, 6, 2, 6, 5, 6, 6],
                "L": [0, 1, 0, 2, 1, 1, 1, 2, 2, 1, 2, 2, 3, 1, 3, 2, 4, 1, 4, 2, 5, 1, 5, 2, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "M": [0, 1, 0, 2, 0, 6, 0, 7, 1, 1, 1, 2, 1, 3, 1, 5, 1, 6, 1, 7, 2, 1, 2, 2, 2, 4, 2, 6, 2, 7, 3, 1, 3, 2, 3, 6, 3, 7, 4, 1, 4, 2, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 1, 6, 2, 6, 6, 6, 7],
                "N": [0, 1, 0, 2, 0, 6, 0, 7, 1, 1, 1, 2, 1, 3, 1, 6, 1, 7, 2, 1, 2, 2, 2, 4, 2, 6, 2, 7, 3, 1, 3, 2, 3, 5, 3, 6, 3, 7, 4, 1, 4, 2, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 1, 6, 2, 6, 6, 6, 7],
                "O": [0, 2, 0, 3, 0, 4, 0, 5, 1, 1, 1, 2, 1, 5, 1, 6, 2, 0, 2, 1, 2, 6, 2, 7, 3, 0, 3, 1, 3, 6, 3, 7, 4, 0, 4, 1, 4, 6, 4, 7, 5, 1, 5, 2, 5, 5, 5, 6, 6, 2, 6, 3, 6, 4, 6, 5],
                "P": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 1, 3, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 1, 4, 2, 5, 1, 5, 2, 6, 1, 6, 2],
                "Q": [0, 2, 0, 3, 0, 4, 0, 5, 1, 1, 1, 2, 1, 5, 1, 6, 2, 0, 2, 1, 2, 6, 2, 7, 3, 0, 3, 1, 3, 6, 3, 7, 4, 0, 4, 1, 4, 4, 4, 6, 4, 7, 5, 1, 5, 2, 5, 5, 5, 6, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6, 6, 7],
                "R": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 1, 3, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 1, 3, 2, 3, 3, 3, 4, 3, 5, 3, 6, 4, 1, 4, 2, 4, 5, 5, 1, 5, 5, 6, 2, 6, 1, 6, 2, 6, 6],
                "S": [0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 1, 1, 2, 2, 1, 2, 2, 3, 2, 3, 3, 3, 4, 3, 5, 4, 5, 4, 6, 5, 5, 5, 6, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "T": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 1, 4, 2, 4, 3, 4, 4, 4, 5, 4],
                "U": [0, 1, 0, 2, 0, 6, 0, 7, 1, 1, 1, 2, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 1, 3, 2, 3, 6, 3, 7, 4, 1, 4, 2, 4, 6, 4, 7, 5, 1, 5, 2, 5, 6, 5, 7, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6],
                "V": [0, 0, 0, 1, 0, 6, 0, 7, 1, 1, 1, 2, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 2, 3, 3, 3, 5, 3, 6, 4, 3, 4, 4, 4, 5, 4, 6, 5, 4, 5, 5, 6, 4],
                "W": [0, 1, 0, 2, 0, 6, 0, 7, 1, 1, 1, 2, 1, 6, 1, 7, 2, 1, 2, 2, 2, 6, 2, 7, 3, 1, 3, 2, 3, 6, 3, 7, 4, 1, 4, 2, 4, 4, 4, 6, 4, 7, 5, 1, 5, 2, 5, 3, 5, 5, 5, 6, 5, 7, 6, 1, 6, 2, 6, 6, 6, 7],
                "X": [0, 0, 0, 1, 0, 6, 0, 7, 1, 1, 1, 2, 1, 5, 1, 6, 2, 1, 2, 2, 2, 5, 2, 6, 3, 2, 3, 3, 3, 4, 3, 5, 4, 2, 4, 3, 4, 4, 4, 5, 5, 1, 5, 2, 5, 5, 5, 6, 6, 0, 6, 1, 6, 6, 6, 7],
                "Y": [0, 0, 0, 1, 0, 6, 0, 7, 1, 0, 1, 1, 1, 6, 1, 7, 2, 1, 2, 2, 2, 5, 2, 6, 3, 2, 3, 3, 3, 4, 3, 5, 4, 3, 4, 4, 5, 3, 5, 4, 6, 3, 6, 4],
                "Z": [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 1, 6, 1, 7, 2, 5, 2, 6, 3, 4, 3, 5, 4, 2, 4, 3, 5, 1, 5, 2, 6, 1, 6, 2, 6, 3, 6, 4, 6, 5, 6, 6, 6, 7],
                ",": [5, 3, 5, 4, 5, 5, 6, 4, 6, 5, 7, 3, 7, 4],
                ":": [1, 3, 1, 4, 1, 5, 2, 3, 2, 4, 2, 5, 4, 3, 4, 4, 4, 5, 5, 3, 5, 4, 5, 5],
                "%": [0, 6, 0, 7, 1, 1, 1, 2, 1, 5, 1, 6, 2, 1, 2, 2, 2, 4, 2, 5, 3, 3, 3, 4, 4, 2, 4, 3, 5, 1, 5, 2, 5, 4, 5, 5, 6, 0, 6, 1, 6, 4, 6, 5],
                "!": [0, 3, 0, 4, 0, 5, 1, 3, 1, 4, 1, 5, 2, 3, 2, 4, 2, 5, 3, 3, 3, 4, 3, 5, 4, 3, 4, 4, 4, 5, 5, 3, 5, 4, 5, 5, 7, 4],
                "(": [0, 2, 0, 3, 1, 1, 1, 2, 2, 1, 2, 2, 3, 1, 3, 2, 4, 1, 4, 2, 5, 1, 5, 2, 6, 1, 6, 2, 7, 2, 7, 3],
                ")": [0, 5, 0, 6, 1, 6, 1, 7, 2, 6, 2, 7, 3, 6, 3, 7, 4, 6, 4, 7, 5, 6, 5, 7, 6, 6, 6, 7, 7, 5, 7, 6],
                ".": [5, 3, 5, 4, 5, 5, 6, 3, 6, 4, 6, 5, 7, 3, 7, 4, 7, 5]
            },
              
            frame: {
                  
                backgroundImageUrl: null,
                  
                innerWidth: 6,
                  
                outerWidth: 10,
            },
              
            height: 150,
              
            width: 400,
              
            enableResize: false,
              
            isResponsive: false,
              
            themes: "flatlight",
              
            items: null,
              
            init: null,
              
            load: null,

            doubleClick: '',

            rightClick: '',

            click: '',
              
            renderComplete: null,
              
            itemRendering: null,
              
            value: "text",
			themeProperties:{
			 flatlight: {
            items: {
                segmentSettings: {
                    color: "#232323",
                },
                shadowColor: "#232323",
                textColor: "#232323"
            }
        },
          
        flatdark: {
            items: {
                segmentSettings: {
                    color: "#b1b0b0",
                },
                shadowColor: "#b1b0b0",
                textColor: "#b1b0b0"
            }
        }
			}
        },

          
        dataTypes: {
            segmentData: "data",
            matrixSegmentData: "data",
            items: "array",
            isResponsive: "boolean",
        },

          
        _setValues: function () {
            this.gaugeEl = this.element;
            this.segmentCount = null;
            this.contextEl = null;
            this.style = null;
            this._value = null;
            this.region = null;
            this.canvasEl = null;
            this.segement16X = null;
            this.segment16Y = null;
            this.segmentHeight = null;
            this.segmentAngle = null;
            this.startX = 5;
            this.startY = 5;
            this.gradient = null;
            this.itemIndex = null;
            this.characterSpace = null;
            this.outerImage = null;
            this.radius = null;
            this.frameOuterLocation = null;
            this.frameInnerLocation = null;
            this.glassFrameLocation = null;
            this.glassFrameStyle = null;
            this.frameOuterStyle = null;
            this.character = null;
            this.frameInnerStyle = null;
            this._itemInitialize();
        },
        observables: ["value"],
        _tags: [{
            tag: "items",
            attr: ["textAlign","textColor","characterSettings.count", "characterSettings.opacity", "characterSettings.spacing", "characterSettings.type", "enableCustomFont", "segmentSettings.color", "segmentSettings.gradient", "segmentSettings.length", "segmentSettings.opacity", "segmentSettings.spacing", "segmentSettings.width", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textAlign", "shadowColor", "textColor", "font.size", "font.fontFamily", "font.fontStyle", "position.x", "position.y"]
        }],
        value: ej.util.valueFunction("value"),


          
        _destroy: function () {
            this._unwireEvents();
            this.element.empty().removeClass("e-digitalgauge e-js e-widget");
        },
          
        _setModel: function (options) {
            var option;
            for (option in options) {
                switch (option) {
                    case "height":
                        this.model.height = options[option];
                        break;
                    case "width":
                        this.model.width = options[option];
                        break;
                    case "items":
                        this.model.items = options[option];
                        this._itemInitialize();
                        break;
                    case "frame":
                        $.extend(this.model.frame, options[option]); break;
                    case "themes": this.model.themes = options[option]; break;
                    case "value":
                        for (var i = 0; this.model.items[i] != null; i++)
                            this.model.items[i].value = this.value();
                        break;
                }
            }
            this.refresh();
        },
          
        _init: function () {
            _digitalGaugeCount = $(".e-digitalgauge").length;
            initialGaugeCount = _digitalGaugeCount;
            this._setValues();
            this._trigger("load");
            this._setTheme();
            this._initialize();
            this._onWindowResize();
        },
          
        _onWindowResize: function () {
            if (this.model.enableResize || this.model.isResponsive) {
                if (!ej.isTouchDevice())
                    this._on($(window), "resize", this.resizeCanvas);
                else
                    this._on($(window), "orientationchange", this.resizeCanvas);
            }
        },
          
        _setTheme: function () {
            var selectedThem = this.model.themeProperties[this.model.themes];
            this._setThemeColors(selectedThem);
        },
          
        _setThemeColors: function (selectedThem) {
            var result = [], jsonObj = this.model.themeProperties;
            for (var name in jsonObj) {
                result.push(name);
            }
            for (var th = 0; th < result.length; th++) {
                for (var i = 0; i < this.model.items.length; i++) {
                    this.model.items[i].segmentSettings.color = (ej.isNullOrUndefined(this.model.items[i].segmentSettings.color) || this.model.items[i].segmentSettings.color == jsonObj[result[th]].items.segmentSettings.color) ? selectedThem.items.segmentSettings.color : this.model.items[i].segmentSettings.color;
                    this.model.items[i].shadowColor = (!this.model.items[i].shadowColor || this.model.items[i].shadowColor == jsonObj[result[th]].items.shadowColor) ? selectedThem.items.shadowColor : this.model.items[i].shadowColor;
                    this.model.items[i].textColor = (!this.model.items[i].textColor || this.model.items[i].textColor == jsonObj[result[th]].items.textColor) ? selectedThem.items.textColor : this.model.items[i].textColor;
                }
            }
        },

        _wireEvents: function(){
            this._on($(this.canvasEl), "touchstart", this._dgStart);
            this._on($(this.canvasEl), ej.isTouchDevice() ? "touchend" : "mouseup", this._dgClick);
            this._on($(this.canvasEl), "contextmenu", this._dgRightClick);
        },

        _unwireEvents: function(){
            this._off($(this.canvasEl), "touchstart", this._dgStart);
            this._off($(this.canvasEl), ej.isTouchDevice() ? "touchend" : "mouseup", this._dgClick);            
            this._off($(this.canvasEl), "contextmenu", this._dgRightClick);
        },
          
        _initialize: function () {
            if (this.model.init)
                this._clientSideOnInit();
            this._initObject(this);
            if (this.model.load)
                this._clientSideOnLoad();
            if (this.model.frame.backgroundImageUrl != null)
                this._drawCustomImage(this, this.model.frame.backgroundImageUrl);
            else
                this._renderItems();
            if (this.model.renderComplete)
                this._clientSideOnRenderComplete();
            this._wireEvents();
        },

        _dgStart: function(){
            if(ej.isTouchDevice() && this.model.rightClick != '')
                this._longPressTimer = new Date();
        },

        _dgClick: function(e){
            var end = new Date();
            if(this.model.click != '')
                this._trigger("click", {data:{event: e}});
            
            if(this._doubleTapTimer != null && end - this._doubleTapTimer < 300)
                this._dgDoubleClick(e);
            this._doubleTapTimer = end;
            if(ej.isTouchDevice() && this.model.rightClick != '' && new Date() - this._longPressTimer > 1500)
                this._dgRightClick(e);
        },

        _dgDoubleClick: function(e){
            if(this.model.doubleClick != '')
                this._trigger("doubleClick", {data:{event: e}});
            
        },
    
        _dgRightClick: function(e){
            if(this.model.rightClick != '')
                this._trigger("rightClick", {data:{event: e}});            
        },
          
        _itemInitialize: function () {
            var proxy = this;
            if (this.model.items != null) {
                $.each(this.model.items, function (index, element) {
                    var obj = proxy._sendDefaultItem();
                    $.extend(true, obj, element);
                    $.extend(true, element, obj);
                });
            }
            else {
                this.model.items = [this._sendDefaultItem()];
            }
        },
          
        _sendDefaultItem: function () {
            var defaultItems;
            return defaultItems = {
                  
                characterSettings: {
                      
                    count: 4,
                       
                    opacity: 1,
                      
                    spacing: 2,
                      
                    type:ej.datavisualization.DigitalGauge.CharacterType.EightCrossEightDotMatrix,
                },
                  
                enableCustomFont: false,
                  
                segmentSettings: {
                      
                    color: null,
                      
                    gradient:null,
                       
                    length: 2,
                      
                    opacity: 0,
                      
                    spacing: 1,
                      
                    width: 1,
                },
                  
                shadowBlur: 0,
                  
                shadowOffsetX: 1,
                  
                shadowOffsetY: 1,
                  
                textAlign: "left",
                  
                font:   {
                      
                    size: "11px",
                      
                    fontFamily: "Arial",
                      
                    fontStyle: "italic"
                },
                  
                position: {
                      
                    x: 0,
                      
                    y: 0
                },
                  
                shadowColor: null,
                  
                textColor: null,
                  
                value: null
            };
        },
          
        _initObject: function (element) {
            this.element.addClass("e-widget");
            element.gaugeEl = this.element;
            for (var i = 0; this.model.items[i] != null; i++) {
                if (this.model.items[i].value == null)
                    this.model.items[i].value = this.value();
            }
            if (element.canvasEl)
                element.canvasEl.parent().empty();
            element.canvasEl = $("<canvas></canvas>");
            element.gaugeEl.append(element.canvasEl);
            element.canvasEl.attr("role", "presentation");
            if (_digitalGaugeCount == initialGaugeCount) {
                initialDigitalDivWidth = window.innerWidth;
            }
            element.canvasEl[0].setAttribute("width", element.model.width);
            element.canvasEl[0].setAttribute("height", element.model.height);
            element.centerX = element.canvasEl[0].width / 2;
            element.centerY = element.canvasEl[0].height / 2;
            var elem = element.canvasEl[0];
            if (typeof window.G_vmlCanvasManager != "undefined") {
                elem = window.G_vmlCanvasManager.initElement(elem);
            }
            if (!elem || !elem.getContext) {
                return;
            }
            element.contextEl = element.canvasEl[0].getContext("2d");
        },
          
        _drawCustomImage: function (element, imageUrl) {
            var image = new Image();
            $(image).on('load', function () {
                element.contextEl.drawImage(this, 0, 0, element.model.width, element.model.height);
                if (element.model.Scales != null)
                    element._drawScales();
                if (element.model.items != null)
                    element._renderItems();
            }).attr('src', imageUrl);
        },
          
        _setSegmentCount: function (element) {
            switch (element) {
                case "sevensegment": this._SegmentCount = 7; break;
                case "fourteensegment": this._SegmentCount = 14; break;
                case "sixteensegment": this._SegmentCount = 16; break;
                case "eightcrosseightdotmatrix": this._SegmentCount = [8, 8]; break;
                case "eightcrosseightsquarematrix": this._SegmentCount = [8, 8]; break;
                default:
                    this._SegmentCount = 7;
            }

        },
          
        _setInnerPosition: function () {
            this.contextEl.save();
            this.contextEl.translate(this.model.frame.outerWidth + this.model.frame.innerWidth, this.model.frame.outerWidth + this.model.frame.innerWidth);
            this.bounds = {
                height: this.canvasEl[0].height - 2 * (this.model.frame.outerWidth + this.model.frame.innerWidth),
                width: this.canvasEl[0].width - 2 * (this.model.frame.outerWidth + this.model.frame.innerWidth)
            };
        },
          
        _setWidth: function () {
            var characterCount = [];
            if (this.model.items != null) {
                $.each(this.model.items, function (index, element) {
                    characterCount.push(element.characterSettings.count);
                });
            }
        },

          
        _renderItems: function () {
            if (this.model.items != null) {
                this._setInnerPosition();
                var self = this;
                $.each(this.model.items, function (index, element) {
					var characterSettingsType = element.characterSettings.type.toLowerCase();
                    self._setSegmentCount(characterSettingsType);
                    self.itemIndex = index;
                    self.canvasEl.attr("aria-label", element.value);
                    self._setShadow(index, element);
                    if (element.enableCustomFont)
                        self._setCustomFont(index, element);
                    else if (characterSettingsType.indexOf("matrix") != -1)
                        self._drawMatrixSegments(index, element);
                    else
                        self._drawSegments(index, element);
                });
            }
        },

          
        _setGradientColor: function (element, gradient, options) {
            if (options.Name || typeof (options) === "string") {
                gradient.addColorStop(0, this._getColor(element, options));
                gradient.addColorStop(1, this._getColor(element, options));
            }
            else
                $.each(options, function (index, colorElement) {
                    gradient.addColorStop(colorElement.colorStop != NaN ? colorElement.colorStop : 0, typeof (colorElement.color) === "string" ? colorElement.color : this._getColor(element, colorElement.color));
                });
        },

          
        _getColor: function (element, option) {
            if (typeof (option) === "string") {
                return option;
            }
            else {
                return ("rgba(" + option.R + ", " + option.G + "," + option.B + ", " + option.A / 255 + ")");
            }
        },

          
        _drawMatrixSegments: function (index, element) {
            var segmentXCollection = [], segmentCollection = [], characterSettingsType = element.characterSettings.type.toLowerCase();
            if (element.value) {
                this._value = element.value.toString().split('');
                  
                element.characterSettings.count = (this._value.length > 4)?this._value.length:4;
            }
            else
                this._value = "";
            this.radius = (characterSettingsType.indexOf("dot") != -1) ? (element.segmentSettings.length + element.segmentSettings.width) / 2 : element.segmentSettings.width / 2;
            var controlStartX = this.startX = (this.bounds.width - element.characterSettings.count * (this._SegmentCount[0] * (2 * this.radius) + element.characterSettings.spacing + this._SegmentCount[0] * element.segmentSettings.spacing)) * (element.position.x / 100);
            var controlStartY = this.startY = (this.bounds.height - (this._SegmentCount[1] * ((characterSettingsType.indexOf("dot") != -1) ? 2 * this.radius : element.segmentSettings.length) + this._SegmentCount[1] * element.segmentSettings.spacing)) * (element.position.y / 100);
            for (var character = 0; character < element.characterSettings.count; character++) {
                if (this._value) {
                    this.character = element.textAlign == "right" ? this._value[this._value.length - element.characterSettings.count + character] : this._value[character];
                    segmentCollection = this.model.matrixSegmentData[this.character];
                }
                if (character != 0) {
                    controlStartX = this.startX = this.startX + element.characterSettings.spacing + element.segmentSettings.spacing + (2 * this.radius);
                    this.startY = controlStartY;
                }
                for (var dotY = 0; dotY < this._SegmentCount[1]; dotY++) {
                    if (dotY != 0) {
                        this.startY = ((characterSettingsType.indexOf("dot") != -1) ? (2 * this.radius) : element.segmentSettings.length) + this.startY + element.segmentSettings.spacing;
                        this.startX = controlStartX;
                    }
                    if (segmentCollection) {
                        $.each(segmentCollection, function (segIndex) {
                            if (segIndex % 2 == 0) {
                                if (segmentCollection[segIndex] > dotY)
                                    return false;
                                if (segmentCollection[segIndex] == dotY)
                                    segmentXCollection.push(parseInt(segmentCollection[segIndex + 1]));
                            }
                        });
                    }
                    for (var dotX = 0; dotX < this._SegmentCount[0]; dotX++) {
                        if (dotX != 0)
                            this.startX = this.startX + 2 * this.radius + element.segmentSettings.spacing;
                        if (characterSettingsType.indexOf("dot") != -1)
                            this.gradient = this.contextEl.createRadialGradient(0, 0, 0, 0, 0, this.radius);
                        else
                            this.gradient = this.contextEl.createLinearGradient(0, 0, element.segmentSettings.width, 0);
                        if (element.segmentSettings.gradient)
                            this._setGradientColor(this, this.gradient, element.segmentSettings.gradient.colorInfo);
                        this.region = { "startX": this.startX, "startY": this.startY };
                        this.style = {
                            "opacity": (segmentXCollection && ($.inArray(dotX, segmentXCollection)) != -1) ? element.characterSettings.opacity : element.segmentSettings.opacity,
                            "height": element.segmentSettings.length,
                            "width": element.segmentSettings.width,
                            "fillStyle": ((element.segmentSettings.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(this, element.segmentSettings.color)),
                            "skewX": element.SkewAngleX,
                            "skewY": element.SkewAngleX
                        };
                        if (this.model.itemRendering)
                            this._clientSideOnItemRendering(true, dotX, dotY);
                        if (characterSettingsType.indexOf("dot") != -1)
                            this._drawDot(this.region, this.style);
                        else
                            this._drawSquare(this.region, this.style);
                    }
                    segmentXCollection = [];
                }
            }
        },

          
        _drawSegments: function (index, element) {
            var segmentCollection = [] , characterSettingsType = element.characterSettings.type.toLowerCase() ;
            if (element.value) {
                this._value = element.value.toUpperCase().toString().split('');
                //beyond the four character it align in center. else it align left
                element.characterSettings.count = (this._value.length > 4) ? this._value.length : 4;
            }
            this.characterSpace =  characterSettingsType == "sevensegment" ? 2 * element.segmentSettings.width : 4 * element.segmentSettings.width;
            this._renderSegmentCalculation(element);
            this.gradient = this.contextEl.createLinearGradient(0, 0, 0, element.segmentSettings.width);
            if (element.segmentSettings.color)
                this._setGradientColor(this, this.gradient, element.segmentSettings.color);
            else if (element.segmentSettings.gradient)
                this._setGradientColor(this, this.gradient, element.segmentSettings.gradient.colorInfo);
            //else
            //    this._setGradientColor(this, this.gradient, this.model.segmentColor);
            for (var character = 0; character < element.characterSettings.count; character++) {
                if (element.value)
                    segmentCollection = this.model.segmentData[element.textAlign == "right" ? this._value[this._value.length - element.characterSettings.count + character] : this._value[character]];
                for (var segment = 0; segment < this._SegmentCount; segment++) {
                    if (character != 0)
                        this.segment16X[segment] = this.segment16X[segment] + element.segmentSettings.length + this.characterSpace + element.characterSettings.spacing;
                    if (this._value)
                        this.character = element.textAlign == "right" ? this._value[this._value.length - element.characterSettings.count + character] : this._value[character];
                    this.region = { "startX": this.segment16X[segment], "startY": this.segment16Y[segment] };
                    this.style = {
                        "angle": this.angle[segment],
                        "fillStyle": this.gradient,
                        "isStroke": false,
                        "isFill": true,
                        "characterHeight": characterSettingsType == "sevensegment" ? element.segmentSettings.length : this.segmentHeight[segment],
                        "segmentWidth": element.segmentSettings.width,
                        "opacity": (segmentCollection && ($.inArray(segment, segmentCollection) != -1)) ? element.characterSettings.opacity : element.segmentSettings.opacity
                    };
                    if (this.model.itemRendering)
                        this._clientSideOnItemRendering(false, segment);
                    this._drawSegmentLayers(this.region, this.style);
                }
                if (this._notifyArrayChange)
                    this._notifyArrayChange("items[" + index + "]value", element.value);
                this.value(element.value);
                segmentCollection = [];
            }
        },

        
        _setCustomFont: function (index, element) {
            this.startX = (this.bounds.width - this._measureText(element.value, 0, this._getFontString(this, element.font)).width) * (element.position.x / 100);
            this.startY = (this.bounds.height - this._measureText(element.value, 0, this._getFontString(this, element.font)).height) * (element.position.y / 100);
            this.region = { "startX": this.startX, "startY": this.startY };
            this.style = { "font": this._getFontString(this, element.font), "text": element.value, "textColor": element.textColor ? ((element.textColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(this, element.textColor)) : ((element.segmentSettings.color == "transparent") ? "rgba(0,0,0,0)" : this._getColor(this, element.segmentSettings.color)) };
            if (this.model.itemRendering)
                this._clientSideOnItemRendering(false);
            this._drawText(this.region, this.style);
        },

          
        _getFontString: function (element, font) {
            return ((font.size == null) ? "11px" : font.size) + " " + font.fontFamily + " " + (font.fontStyle ? font.fontStyle : "");
        },

          
        _renderSegmentCalculation: function (element) {
            var length = element.segmentSettings.length, width = element.segmentSettings.width, characterSettingsType = element.characterSettings.type.toLowerCase();
            this.startX = (this.bounds.width - element.characterSettings.count * (length + this.characterSpace + element.characterSettings.spacing)) * (element.position.x / 100);
            this.startY = (this.bounds.height - 2 * length - width) * (element.position.y / 100);
            var tempLength = characterSettingsType == "sevensegment" ? length : length / 2;
            this.segment16X = [
                  this.startX + width / 2,
                  this.startX + length + 4 * width,
                  this.startX + length + 4 * width,
                  this.startX + width / 2,
                  this.startX,
                  this.startX,
                  this.startX + width / 2,
                  this.startX + tempLength + 2 * width,
                  this.startX + 2.5 * width + tempLength,
                  this.startX + tempLength + 2 * width,
                  this.startX + length + 2.5 * width,
                  this.startX + tempLength + 2.5 * width,
                  this.startX + tempLength + 1.5 * width,
                  this.startX + 1.5 * width,
                  this.startX + 5 * width / 2 + tempLength,
                  this.startX + 2.5 * width + tempLength
            ];
            this.segment16Y = [
                  this.startY,
                  this.startY,
                  this.startY + length + width,
                  this.startY + 2 * length + 2 * width,
                  this.startY + length + width,
                  this.startY,
                  this.startY + length + width,
                  this.startY + length + width,
                  this.startY + length + width,
                  this.startY,
                  this.startY + width,
                  this.startY + length + width,
                  this.startY + length + width,
                  this.startY + width,
                  this.startY,
                  this.startY + 2 * length + 2 * width
            ];
            this.segmentHeight = [
                  length / 2,
                  length,
                  length,
                  length / 2,
                  length,
                  length,
                  length / 2,
                  length,
                  length / 2,
                  length,
                  length,
                  length,
                  length,
                  length,
                  length / 2,
                  length / 2
            ];
            this.angle = [-90, 0, 0, -90, 0, 0, -90, 0, -90, 0, 27, -27, 27, -27, -90, -90];
            if (characterSettingsType == "sevensegment")
                this.segment16X[2] = this.segment16X[1] = this.startX + length + 2 * width;
            if (characterSettingsType == "fourteensegment")
                this.segmentHeight[3] = this.segmentHeight[0] = length + 2 * width;
        },

          
        _drawSegmentLayers: function (location, style) {
            this._contextOpenPath(style, this);
            this.contextEl.translate(location.startX, location.startY);
            this.contextEl.rotate(Math.PI * (style.angle / 180));
            this.contextEl.lineTo(0, 0);
            this.contextEl.lineTo(-style.segmentWidth, style.segmentWidth);
            this.contextEl.lineTo(-style.segmentWidth, style.characterHeight);
            this.contextEl.lineTo(0, style.characterHeight + style.segmentWidth);
            this.contextEl.lineTo(style.segmentWidth, style.characterHeight);
            this.contextEl.lineTo(style.segmentWidth, style.segmentWidth);
            this._contextClosePath(style, this);
        },

          
        _drawDot: function (location, style) {
            this.contextEl.beginPath();
            this.contextEl.save();
            this.contextEl.translate(location.startX, location.startY);
            this.contextEl.fillStyle = style.fillStyle;
            this.contextEl.globalAlpha = style.opacity;
            this.contextEl.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
            this.contextEl.fill();
            this.contextEl.closePath();
            this.contextEl.restore();
        },

          
        _setShadow: function (index, element) {
            this.contextEl.save();
            this.contextEl.shadowColor = ((element.shadowColor == "transparent") ? "rgba(0,0,0,0)" : this._getColor(this, element.shadowColor));
            this.contextEl.shadowOffsetY = element.shadowOffsetY;
            this.contextEl.shadowOffsetX = element.shadowOffsetX;
            this.contextEl.shadowBlur = element.shadowBlur;
        },

          
        _drawSquare: function (location, style) {
            this.contextEl.beginPath();
            this.contextEl.save();
            this.contextEl.translate(location.startX, location.startY);
              
            this.contextEl.fillStyle = style.fillStyle;
            this.contextEl.globalAlpha = style.opacity;
            this.contextEl.rect(0, 0, style.width, style.height);
            this.contextEl.fill();
            this.contextEl.closePath();
            this.contextEl.restore();
        },

          

        _drawText: function (location, style) {
            this.contextEl.beginPath();
            this.contextEl.save();
            this.contextEl.font = style.font;
            this.contextEl.textBaseline = "hanging";
            this.contextEl.fillStyle = ((style.textColor == "transparent") ? "rgba(0,0,0,0)" : style.textColor);
            this.contextEl.fillText(style.text, location.startX, location.startY);
            this.contextEl.closePath();
            this.contextEl.restore();
        },

          

        setValue: function (itemIndex, value) {
            if (itemIndex < this.model.items.length && value != null) {
                this.model.items[itemIndex].value = value;
                this._initialize();
            }
        },

          
        getValue: function (itemIndex) {
            return this.model.items[itemIndex].value;
        },

          

        setPosition: function (itemIndex, value) {
            if (itemIndex < this.model.items.length && value != null) {
                this.model.items[itemIndex].position.x = value.x;
                this.model.items[itemIndex].position.y = value.y;
                this._initialize();
            }
        },


          

        getPosition: function (itemIndex) {
            if (itemIndex < this.model.items.length)
                return { "x": this.model.items[itemIndex].position.x, "y": this.model.items[itemIndex].position.y };
            else
                return null;
        },

          
        refresh: function () {
            this._setTheme();
            this._initialize();
        },

        "export" : function(){
            var exports = this.model.exportSettings, image, type ,attr, form, data, input;

            if(exports.mode.toLowerCase() === 'client')
                this.exportImage(exports.fileName, exports.fileType);
            else {
                type = exports.type.toLowerCase() === 'jpg' ? 'image/jpeg' : 'image/png';
                image = this.canvasEl[0].toDataURL(type);
                
                attr = { action: exports.action, method: 'post' };
                form = ej.buildTag('form', "", null, attr);
				data = { name: 'Data', type: 'hidden', value: image};
				input = ej.buildTag('input', "", null, data);
                form.append(input).append(this);
                $('body').append(form);
                form.submit();
            }
        },
          
        exportImage: function (fileName, fileType) {
            /// <summary>This function save the rendered canvas image</summary>
            /// <param name="fileName" type="String">fileName to which the image has been saved</param>
            /// <param name="fileType" type="String">fileType to which the image has been saved</param>
            if (ej.browserInfo().name === "msie" && parseFloat(ej.browserInfo().version) < 10) {
                return false;
            }
            else {
                var image = this.canvasEl[0].toDataURL();
                image = image.replace(/^data:[a-z]*;,/, '');
                var image1 = image.split(',');
                var byteString = atob(image1[1]);
                var buffer = new ArrayBuffer(byteString.length);
                var intArray = new Uint8Array(buffer);
                for (var i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }
                var blob = new Blob([buffer], { type: "image/png" });
                if (ej.browserInfo().name === "msie")
                    window.navigator.msSaveOrOpenBlob(blob, fileName + '.' + fileType);
                else {
                    var pom = document.createElement('a');
                    var url = URL.createObjectURL(blob);
                    pom.href = url;
                    pom.setAttribute('download', fileName + '.' + fileType);
                    if (document.createEvent) {
                        var e = document.createEvent("MouseEvents");
                        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        pom.dispatchEvent(e);
                    }
                    else if (pom.fireEvent) {
                        pom.fireEvent("onclick");
                    }
                }
                return true;
            }
        },

      
        resizeCanvas: function () {
            if (_digitalGaugeCount != 0)
                _digitalGaugeCount = _digitalGaugeCount - 1;
            else
                _digitalGaugeCount = $(".e-digitalgauge").length - 1; var state, chk = true;
            if (!ej.isNullOrUndefined(this.canvasEl.parent().attr("style")))
                state = this.GaugeEl.parent().attr("style").split(";");
            if (!ej.isNullOrUndefined(state)) {
                $.each(state, function (key, val) {
                    while (val.indexOf("width") != -1) {
                        chk = val.indexOf("px") == -1 ? true : false;
                        break;
                    }
                });
            }
            if (chk) {
                var ratio = window.innerWidth / initialDigitalDivWidth;
                this.model.width *= ratio;
                for (var i = 0; this.model.items[i] != null; i++) {
                    this.model.items[i].segmentSettings.width *= ratio;
                    this.model.items[i].segmentSettings.length *= ratio;
                    this.model.items[i].segmentSettings.spacing *= ratio;
                    this.model.items[i].characterSettings.spacing *= ratio;
                }
                this.refresh();
                if (_digitalGaugeCount == 0) {
                    initialDigitalDivWidth = window.innerWidth;
                }
            }
        },

          
          
        _clientSideOnLoad: function () {
            var data = { object: this, items: this.model.items, context: this.contextEl };
            this._trigger("load", data);
        },

          
        _clientSideOnItemRendering: function (isMatrix, row, column) {
            var data;
            if (isMatrix)
                data = { object: this, items: this.model.items, character: this.character, context: this.contextEl, position: this.region, style: this.style, row: row, column: column };
            else
                data = { object: this, model: this.model, id: this.model.ClientId, items: this.model.items, character: this.character, context: this.contextEl, position: this.region, style: this.style, segment: row };
            this._trigger("itemRendering", data);
        },

          
        _clientSideOnInit: function () {
            var data = { object: this, items: this.model.items, context: this.contextEl };
            this._trigger("init", data);
        },

          
        _clientSideOnRenderComplete: function () {
            var data = { object: this, items: this.model.items, context: this.contextEl };
            this._trigger("renderComplete", data);
        },


          
          
        _contextOpenPath: function (style, element) {
            element.contextEl.save();
            element.contextEl.beginPath();
            if (style.strokeStyle)
                element.contextEl.strokeStyle = style.strokeStyle;
            if (style.opacity != undefined)
                element.contextEl.globalAlpha = style.opacity;
            if (style.lineWidth)
                element.contextEl.lineWidth = style.lineWidth;
            if (style.fillStyle)
                element.contextEl.fillStyle = style.fillStyle;
        },

          
        _contextClosePath: function (style, element) {
            element.contextEl.closePath();
            if (style.isFill)
                element.contextEl.fill();
            if (style.isStroke)
                element.contextEl.stroke();
            element.contextEl.restore();
        },

          
        _measureText: function (text, maxwidth, font) {
            var textObj = document.createElement('DIV');
            textObj.innerHTML = text;
            if (font != null)
                textObj.style.font = font;
            textObj.style.backgroundColor = 'white';
            textObj.style.position = 'absolute';
            textObj.style.top = -100;
            textObj.style.left = 0;
            if (maxwidth)
                textObj.style.maxwidth = maxwidth + "px";
            document.body.appendChild(textObj);
            var bounds = { width: textObj.offsetWidth, height: textObj.offsetHeight };
            $(textObj).remove();
            return bounds;
        }

    });

      
    ej.datavisualization.DigitalGauge.CharacterType = {
          
        SevenSegment: "sevensegment",
          
        FourteenSegment: "fourteensegment",
          
        SixteenSegment: "sixteensegment",
          
        EightCrossEightDotMatrix: "eightcrosseightdotmatrix",
          
        EightCrossEightSquareMatrix: "eightcrosseightsquarematrix"
    };
      
    ej.datavisualization.DigitalGauge.TextAlign = {
          
        Left: "left",
          
        Right: "right"
    };

      
    ej.datavisualization.DigitalGauge.FontStyle = {
          
        Normal: "normal",
          
        Bold: "bold",
          
        Italic: "italic",
          
        Underline: "underline",
          
        Strikeout: "strikeout"
    };

      
    ej.datavisualization.DigitalGauge.Themes = {
         FlatLight: 'flatlight',

		FlatDark: 'flatdark'
    };		
       
  

})(jQuery, Syncfusion);;;

});