/*!
*  filename: ej.rangenavigator.js
*  version : 18.1.0.42
*  Copyright Syncfusion Inc. 2001 - 2020. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
*/
(function (fn) {
    typeof define === 'function' && define.amd ? define(["./../common/ej.core","./../common/ej.data","./../common/ej.scroller","./ej.chart","./../common/ej.globalize"], fn) : fn();
})
(function () {
	
/**
* @fileOverview Plugin to style the Html RangeNavigator elements
* @copyright Copyright Syncfusion Inc. 2001 - 2020. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
* @version 12.1 
* @author <a href="mailto:licensing@syncfusion.com">Syncfusion Inc</a>
*/

/*global window, jQuery, navigator, document, clearTimeout, setTimeout, Syncfusion, event*/
(function ($, ej, undefined) {
    
    ej.widget("ejRangeNavigator", "ej.datavisualization.RangeNavigator", {

        ejChart: "",

        validTags: ["div"],
       
        defaults: {

            theme: "",

            padding: "0",

            enableAutoResizing: false,

            isResponsive: false,

            allowSnapping: false,
			
			allowNextValue: true,


            sizeSettings: {

                width: "",

                height: ""
            },
            _size: {

            },

            locale: "en-US",

            valueType: "datetime",

            valueAxisSettings: {

                rangePadding: 'none',

                range: {

                    min: null,

                    max: null,

                    interval: null
                },

                axisLine:
                    {

                        visible: false
                    },

                font: {

                    size: '0px',
                },

                majorTickLines:
                {

                    width: 0,

                    size: 0,

                    visible: true
                },

                majorGridLines: {

                    visible: false
                },

                visible: false
            },

            rangePadding: "none",

            enableRTL: false,

            enableScrollbar: false,

            dataSource: "",

            xName: "x",

            yName: "y",

            tooltipSettings: {

                visible: true,

                labelFormat: "MM/dd/yyyy",

                tooltipDisplayMode: "always",

                backgroundColor: "#303030",

                font:
                {

                    color: '#FFFFFF',

                    family: 'Segoe UI',

                    fontStyle: 'Normal',

                    size: '10px',
                    opacity: 1,

                    weight: 'regular'
                }
            },

            zoomPosition: "0",

            zoomFactor: "1",

            selectedRangeSettings: {

                start: "",

                end: ""
            },

            selectedData: "",

            rangeSettings: {

                start: "",

                end: ""
            },

            border: {

                width: 1,

                color: null,

                opacity: 1
            },

            scrollRangeSettings: {

                start: "",

                end: ""
            },

            enableDeferredUpdate: true,

            series: "",

            seriesSettings: "",

            labelSettings: {

                style: {

                    font: {

                        color: '#333333',

                        family: 'Segoe UI',

                        style: 'Normal',

                        size: '10px',

                        opacity: 1,

                        weight: 'regular'
                    },

                    horizontalAlignment: "middle"
                },


                higherLevel: {

                    intervalType: null,

                    style: {

                        font: {

                            color: "black",

                            fontFamily: "Segoe UI",

                            fontStyle: "Normal",

                            size: "12px",

                            opacity: 1,

                            fontWeight: "regular"
                        },

                        horizontalAlignment: "middle"
                    },

                    gridLineStyle: {

                        color: "#B5B5B5",

                        width: 1,

                        dashArray: "20 5 0"
                    },


                    border:
                    {

                        color: "transparent",

                        width: 0.5
                    },

                    fill: "transparent",

                    position: "top",

                    visible: true,

                    labelPlacement: "outside",
					
					labelIntersectAction: "none"
                },

                lowerLevel: {

                    intervalType: null,

                    style: {

                        font: {

                            color: "black",

                            fontFamily: "Segoe UI",

                            fontStyle: "Normal",

                            size: "12px",

                            opacity: 1,

                            fontWeight: "regular"
                        },

                        horizontalAlignment: "middle"
                    },

                    gridLineStyle:
                    {
                        color: "#B5B5B5",

                        width: 1,

                        dashArray: ""
                    },

                    border:
                    {

                        color: "transparent",

                        width: 0.5
                    },

                    fill: "transparent",

                    position: "bottom",

                    visible: true,

                    labelPlacement: "outside",
					
					labelIntersectAction: "none"
                }
            },

            navigatorStyleSettings: {

                selectedRegionColor: "#EFEFEF",

                unselectedRegionColor: "#5EABDE",

                thumbColor: "#2382C3",

                thumbRadius: 10,

                leftThumbTemplate: null,

                rightThumbTemplate: null,

                thumbStroke: "#303030",

                background: "#dddddd",

                border:
                {

                    color: "transparent",

                    width: 0.5,

                    dashArray: ""
                },

                opacity: 1,

                selectedRegionOpacity: 0,

                unselectedRegionOpacity: 0.3,

                highlightSettings: {

                    enable: false,

                    opacity: 0.5,

                    color: '#006fa0',

                    border: {

                        color: '',

                        width: 1
                    }

                },

                selectionSettings: {

                    enable: false,

                    opacity: 0.5,

                    color: '#0e4a7c',

                    border: {

                        color: '',

                        width: 1
                    }

                },

                majorGridLineStyle:
                {

                    color: "#B5B5B5",

                    visible: true
                },

                minorGridLineStyle:
                {

                    color: "#B5B5B5",

                    visible: true
                },
            },


            loaded: "",

            load: "",

            click: "",

            doubleClick: "",

            rightClick: "",

            rangeChanged: "",

            scrollEnd: "",

            scrollStart: "",

            scrollChanged: "",

            selectedRangeStart: "",
            selectedRangeEnd: ""
        },

        dataTypes: {
        
            enableAutoResizing:"boolean",
            isResponsive: "boolean",
            allowSnapping:"boolean",
            allowNextValue:"boolean",
            dataSource: "data",
            tooltipSettings: {
                visible:"boolean",
                labelFormat:"string",
                tooltipDisplayMode:"string",
            },
            
            zoomPosition: "string",
            zoomFactor: "string",
           
            selectedData: "string",
            enableDeferredUpdate: "boolean",
            series: "array",
           
            labelSettings: {
                higherLevel: {
                    intervalType: 'string',
                    position: "string",
                    visible: "boolean",
                    labelPlacement: "string",
					labelIntersectAction: "string"
                },
                lowerLevel: {
                    intervalType: 'string',
                    position: "string",
                    visible: "boolean",
                    labelPlacement:"string",
					labelIntersectAction: "string"
                }
            },
            navigatorStyleSettings: {
                thumbRadius:"number",
            },
       
        },

        observables: ["selectedRangeStart", "selectedRangeEnd"],

         _tags: [{
                tag: "series", 
                attr: ["xName", "yName", "dataSource", "enableAnimation",
				[
				     {
				       tag: "points", attr:["x", "y", "text", "isEmpty", "fill", "visible"]
				     }
				 ]				
				],
				 singular:"series"
				                
            } 
         ],

          _selectedRangeStart: ej.util.valueFunction("selectedRangeStart"),
          _selectedRangeEnd: ej.util.valueFunction("selectedRangeEnd"),

		 _series: function (index, property, value, old) {		   
		  this.renderNavigator();
		  this._trigger("refresh");           
        },
		_series_points:function(index, property, value, old){		   
		  this.renderNavigator();
		  this._trigger("refresh");    
		},


        _themes: {
            flatlight: {
                tooltipSettings: {
                    backgroundColor: "#303030",
                    font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1 ,weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {                        
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0},
                        fill: "transparent",
                        gridLineStyle: { color: "#B5B5B5", width:1, dashArray:"15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width:0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#e5e5e5",
                    unselectedRegionColor: "#5EABDE",
                    thumbColor: "#2382C3",
                    thumbRadius: 10,
                    thumbStroke: "#303030",
                    background: "#EFEFEF",
                    border: { color: "#606262", width: 0 },
                    opacity:1,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity:0,
                    majorGridLineStyle: { color: "#8c8c8c", visible: true },
                    minorGridLineStyle: { color: "#8c8c8c", visible: true },
                },
            },

            azurelight: {
                tooltipSettings: {
                    backgroundColor: "#303030",
                    font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#B5B5B5", width: 1,dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#e5e5e5",
                    unselectedRegionColor: "#5EABDE",
                    thumbColor: "#2382C3",
                    thumbRadius: 10,
                    thumbStroke: "#303030",
                    background: "#EFEFEF",
                    border: { color: "#606262", width: 0 },
                    opacity: 1,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    majorGridLineStyle: { color: "#8c8c8c", visible: true },
                    minorGridLineStyle: { color: "#8c8c8c", visible: true },
                },
            },

            limelight: {
                tooltipSettings: {
                    backgroundColor: "#303030",
                    font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#B5B5B5", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#e5e5e5",
                    unselectedRegionColor: "#A9CA44 ",
                    thumbColor: "#AECF49",
                    thumbRadius: 10,
                    thumbStroke: "#303030",
                    background: "#EFEFEF",
                    border: { color: "#606262", width: 0 },
                    opacity: 1,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    majorGridLineStyle: { color: "#8c8c8c", visible: true },
                    minorGridLineStyle: { color: "#8c8c8c", visible: true },
                },
            },

            saffronlight: {
                tooltipSettings: {
                    backgroundColor: "#303030",
                    font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#B5B5B5", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#e5e5e5",
                    unselectedRegionColor: "#FAA113",
                    thumbColor: "#F9920B",
                    thumbRadius: 10,
                    thumbStroke: "#303030",
                    background: "#EFEFEF",
                    border: { color: "#606262", width: 0 },
                    opacity: 1,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    majorGridLineStyle: { color: "#8c8c8c", visible: true },
                    minorGridLineStyle: { color: "#8c8c8c", visible: true },
                },
            },

            gradientlight: {
                tooltipSettings: {
                    backgroundColor: "#303030",
                    font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#B5B5B5", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: [{ color: "#bbbbbb", colorStop: "0%" }, { color: "#efefef", colorStop: "15%" }, { color: "#bbbbbb", colorStop: "85%" }, { color: "#efefef", colorStop: "100%" }],
                    unselectedRegionColor: [{ color: "#67C1DC", colorStop: "50%" }, { color: "#3D93AA", colorStop: "100%" }],
                    thumbColor: [{ color: "#67C1DC", colorStop: "50%" }, { color: "#3D93AA", colorStop: "100%" }],
                    thumbRadius: 10,
                    thumbStroke: "#303030",
                    background: "#EFEFEF",
                    border: { color: "#606262", width: 0 },
                    opacity: 1,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    majorGridLineStyle: { color: "#8c8c8c", visible: true },
                    minorGridLineStyle: { color: "#8c8c8c", visible: true },
                },
            },

            gradientazure: {
                tooltipSettings: {
                    backgroundColor: "#303030",
                    font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#B5B5B5", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: [{ color: "#bbbbbb", colorStop: "0%" }, { color: "#efefef", colorStop: "15%" }, { color: "#bbbbbb", colorStop: "85%" }, { color: "#efefef", colorStop: "100%" }],
                    unselectedRegionColor: [{ color: "#67C1DC", colorStop: "50%" }, { color: "#3D93AA", colorStop: "100%" }],
                    thumbColor: [{ color: "#67C1DC", colorStop: "50%" }, { color: "#3D93AA", colorStop: "100%" }],
                    thumbRadius: 10,
                    thumbStroke: "#303030",
                    background: "#EFEFEF",
                    border: { color: "#606262", width: 0 },
                    opacity: 1,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    majorGridLineStyle: { color: "#8c8c8c", visible: true },
                    minorGridLineStyle: { color: "#8c8c8c", visible: true },
                },
            },

            gradientlime: {
                tooltipSettings: {
                    backgroundColor: "#303030",
                    font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#1E1E1E', family: 'Segoe UI',style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#B5B5B5", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: [{ color: "#bbbbbb", colorStop: "0%" }, { color: "#efefef", colorStop: "15%" }, { color: "#bbbbbb", colorStop: "85%" }, { color: "#efefef", colorStop: "100%" }],
                    unselectedRegionColor: [{ color: "#A5C14A", colorStop: "50%" }, { color: "#738B1F", colorStop: "100%" }],
                    thumbColor: [{ color: "#A5C14A", colorStop: "50%" }, { color: "#738B1F", colorStop: "100%" }],
                    thumbRadius: 10,
                    thumbStroke: "#303030",
                    background: "#EFEFEF",
                    border: { color: "#606262", width: 0 },
                    opacity: 1,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    majorGridLineStyle: { color: "#8c8c8c", visible: true },
                    minorGridLineStyle: { color: "#8c8c8c", visible: true },
                },
            },

            gradientsaffron: {
                tooltipSettings: {
                    backgroundColor: "#303030",
                    font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#B5B5B5", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: [{ color: "#bbbbbb", colorStop: "0%" }, { color: "#efefef", colorStop: "15%" }, { color: "#bbbbbb", colorStop: "85%" }, { color: "#efefef", colorStop: "100%" }],
                    unselectedRegionColor: [{ color: "#FEB75B", colorStop: "50%" }, { color: "#ED7E16", colorStop: "100%" }],
                    thumbColor: [{ color: "#FEB75B", colorStop: "50%" }, { color: "#ED7E16", colorStop: "100%" }],
                    thumbRadius: 10,
                    thumbStroke: "#303030",
                    background: "#EFEFEF",
                    border: { color: "#606262", width: 0 },
                    opacity: 1,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    majorGridLineStyle: { color: "#8c8c8c", visible: true },
                    minorGridLineStyle: { color: "#8c8c8c", visible: true },
                },
            },

            flatdark: {
                tooltipSettings: {
                    backgroundColor: "#FFFFFF",
                    font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {                        
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#FFFFFF", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#353635",
                    unselectedRegionColor: "#5EABDE",
                    thumbColor: "#2382C3",
                    thumbRadius: 10,
                    thumbStroke: "#FFFFFF",
                    background: "#FFFFFF",
                    opacity: 0.08,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    border: { color: "#FFFFFF", width:0 },
                    majorGridLineStyle: { color: "#FFFFFF", visible: true },
                    minorGridLineStyle: { color: "#FFFFFF", visible: true },
                },
            },

            material: {
                tooltipSettings: {
                    backgroundColor: "#303030",
                    font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#333333', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#333333', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#B5B5B5", width: 1 },
                    },
                    lowerLevel: {
                        style: { font: { color: '#333333', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#f5f5f5",
                    unselectedRegionColor: "#8d8afd",
                    thumbColor: "#8d8afd",
                    thumbRadius: 10,
                    thumbStroke: "#000000",
                    background: "#EFEFEF",
                    border: { color: "#606262", width: 0 },
                    opacity: 1,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    majorGridLineStyle: { color: "#8c8c8c", visible: true },
                    minorGridLineStyle: { color: "#8c8c8c", visible: true },
                },
            },
            office: {
                tooltipSettings: {
                    backgroundColor: "#303030",
                    font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#333333', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#333333', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#B5B5B5", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#333333', family: 'Segoe UI', style: 'Normal', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#eaeaea",
                    unselectedRegionColor: "#0078d7",
                    thumbColor: "#0078d7",
                    thumbRadius: 10,
                    thumbStroke: "#000000",
                    background: "#EFEFEF",
                    border: { color: "#606262", width: 0 },
                    opacity: 1,
                    unselectedRegionOpacity: 0.6,
                    selectedRegionOpacity: 0,
                    majorGridLineStyle: { color: "#8c8c8c", visible: true },
                    minorGridLineStyle: { color: "#8c8c8c", visible: true },
                },
            },

            highcontrast01: {
                tooltipSettings: {
                    backgroundColor: "#FFFFFF",
                    font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#FFFFFF", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#353635",
                    unselectedRegionColor: "#008000",
                    thumbColor: "#008000",
                    thumbRadius: 10,
                    thumbStroke: "#FFFFFF",
                    background: "#FFFFFF",
                    opacity: 0.08,
                    unselectedRegionOpacity: 0.6,
                    selectedRegionOpacity: 0,
                    border: { color: "#FFFFFF", width: 0 },
                    majorGridLineStyle: { color: "#FFFFFF", visible: true },
                    minorGridLineStyle: { color: "#FFFFFF", visible: true },
                },
            },
            highcontrast02: {
                tooltipSettings: {
                    backgroundColor: "#FFFFFF",
                    font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#FFFFFF", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#353635",
                    unselectedRegionColor: "#0000ff",
                    thumbColor: "#0000ff",
                    thumbRadius: 10,
                    thumbStroke: "#FFFFFF",
                    background: "#FFFFFF",
                    opacity: 0.08,
                    unselectedRegionOpacity: 0.6,
                    selectedRegionOpacity: 0,
                    border: { color: "#FFFFFF", width: 0 },
                    majorGridLineStyle: { color: "#FFFFFF", visible: true },
                    minorGridLineStyle: { color: "#FFFFFF", visible: true },
                },
            },

            azuredark: {
                tooltipSettings: {
                    backgroundColor: "#FFFFFF",
                    font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#FFFFFF", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#353635",
                    unselectedRegionColor: "#5EABDE",
                    thumbColor: "#2382C3",
                    thumbRadius: 10,
                    thumbStroke: "#FFFFFF",
                    background: "#FFFFFF",
                    opacity: 0.08,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    border: { color: "#FFFFFF", width: 0 },
                    majorGridLineStyle: { color: "#FFFFFF", visible: true },
                    minorGridLineStyle: { color: "#FFFFFF", visible: true },
                },
            },

            limedark: {
                tooltipSettings: {
                    backgroundColor: "#FFFFFF",
                    font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#FFFFFF", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#353635",
                    unselectedRegionColor: "#A9CA44",
                    thumbColor: "#AECF49",
                    thumbRadius: 10,
                    thumbStroke: "#FFFFFF",
                    background: "#FFFFFF",
                    opacity: 0.08,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    border: { color: "#FFFFFF", width: 0 },
                    majorGridLineStyle: { color: "#FFFFFF", visible: true },
                    minorGridLineStyle: { color: "#FFFFFF", visible: true },
                },
            },
            
            saffrondark: {
                tooltipSettings: {
                    backgroundColor: "#FFFFFF",
                    font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#FFFFFF', family: 'Segoe UI',style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#FFFFFF", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: "#353635",
                    unselectedRegionColor: "#FAA113",
                    thumbColor: "#F9920B",
                    thumbRadius: 10,
                    thumbStroke: "#FFFFFF",
                    background: "#FFFFFF",
                    opacity: 0.08,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    border: { color: "#FFFFFF", width: 0 },
                    majorGridLineStyle: { color: "#FFFFFF", visible: true },
                    minorGridLineStyle: { color: "#FFFFFF", visible: true },
                },
            },

            gradientdark: {
                tooltipSettings: {
                    backgroundColor: "#FFFFFF",
                    font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI',style: 'Regular', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#FFFFFF", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: [{ color: "#0a0a0a", colorStop: "0%" }, { color: "#282828", colorStop: "15%" }, { color: "#282828", colorStop: "85%" }, { color: "#0a0a0a", colorStop: "100%" }],
                    unselectedRegionColor: [{ color: "#67C1DC", colorStop: "50%" }, { color: "#3D93AA", colorStop: "100%" }],
                    thumbColor: [{ color: "#67C1DC", colorStop: "50%" }, { color: "#3D93AA", colorStop: "100%" }],
                    thumbRadius: 10,
                    thumbStroke: "#FFFFFF",
                    background: "#FFFFFF",
                    opacity: 0.08,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    border: { color: "#FFFFFF", width: 0 },
                    majorGridLineStyle: { color: "#FFFFFF", visible: true },
                    minorGridLineStyle: { color: "#FFFFFF", visible: true },
                },
            },

            gradientazuredark: {
                tooltipSettings: {
                    backgroundColor: "#FFFFFF",
                    font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#FFFFFF", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: [{ color: "#0a0a0a", colorStop: "0%" }, { color: "#282828", colorStop: "15%" }, { color: "#282828", colorStop: "85%" }, { color: "#0a0a0a", colorStop: "100%" }],
                    unselectedRegionColor: [{ color: "#67C1DC", colorStop: "50%" }, { color: "#3D93AA", colorStop: "100%" }],
                    thumbColor: [{ color: "#67C1DC", colorStop: "50%" }, { color: "#3D93AA", colorStop: "100%" }],
                    thumbRadius: 10,
                    thumbStroke: "#FFFFFF",
                    background: "#FFFFFF",
                    opacity: 0.08,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    border: { color: "#FFFFFF", width: 0 },
                    majorGridLineStyle: { color: "#FFFFFF", visible: true },
                    minorGridLineStyle: { color: "#FFFFFF", visible: true },
                },
            },

            gradientlimedark: {
                tooltipSettings: {
                    backgroundColor: "#FFFFFF",
                    font: { color: '#1E1E1E', family: 'Segoe UI', style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', fontStyle: 'Regular', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#FFFFFF", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1,weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: [{ color: "#0a0a0a", colorStop: "0%" }, { color: "#282828", colorStop: "15%" }, { color: "#282828", colorStop: "85%" }, { color: "#0a0a0a", colorStop: "100%" }],
                    unselectedRegionColor: [{ color: "#A5C14A", colorStop: "50%" }, { color: "#738B1F", colorStop: "100%" }],
                    thumbColor: [{ color: "#A5C14A", colorStop: "50%" }, { color: "#738B1F", colorStop: "100%" }],
                    thumbRadius: 10,
                    thumbStroke: "#FFFFFF",
                    background: "#FFFFFF",
                    opacity: 0.08,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    border: { color: "#FFFFFF", width: 0 },
                    majorGridLineStyle: { color: "#FFFFFF", visible: true },
                    minorGridLineStyle: { color: "#FFFFFF", visible: true },
                },
            },

            gradientsaffrondark: {
                tooltipSettings: {
                    backgroundColor: "#FFFFFF",
                    font: { color: '#1E1E1E', family: 'Segoe UI',style: 'Normal', size: '10px', opacity: 1, weight: 'regular' },
                },
                labelSettings: {
                    style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                    higherLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' }, horizontalAlignment: "left" },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "#FFFFFF", width: 1, dashArray: "15 5 0" },
                    },
                    lowerLevel: {
                        style: { font: { color: '#FFFFFF', family: 'Segoe UI', style: 'Regular', size: '13px', opacity: 1, weight: 'regular' } },
                        border: { color: "transparent", width: 0 },
                        fill: "transparent",
                        gridLineStyle: { color: "transparent", width: 0 },
                    },
                },
                navigatorStyleSettings: {
                    selectedRegionColor: [{ color: "#0a0a0a", colorStop: "0%" }, { color: "#282828", colorStop: "15%" }, { color: "#282828", colorStop: "85%" }, { color: "#0a0a0a", colorStop: "100%" }],
                    unselectedRegionColor: [{ color: "#FEB75B", colorStop: "50%" }, { color: "#ED7E16", colorStop: "100%" }],
                    thumbColor: [{ color: "#FEB75B", colorStop: "50%" }, { color: "#ED7E16", colorStop: "100%" }],
                    thumbRadius: 10,
                    thumbStroke: "#FFFFFF",
                    background: "#FFFFFF",
                    opacity: 0.08,
                    unselectedRegionOpacity: 0.3,
                    selectedRegionOpacity: 0,
                    border: { color: "#FFFFFF", width: 0 },
                    majorGridLineStyle: { color: "#FFFFFF", visible: true },
                    minorGridLineStyle: { color: "#FFFFFF", visible: true },
                },
            },

        },
        /**
                * To configure the properties at runtime using SetModel		
                * @private
                */
        _setModel: function (options) {
            for (var prop in options) {
              //  this.disableAnimation();
                switch (prop) {                   
                    case "theme":
                        this.model._themeChanged = true;
                        this.model.theme = options[prop];
                        this._setTheme(this._themes, this.model.theme);
						break;
                    case "selectedRangeStart":
                        this.model.selectedRangeSettings.start = this._selectedRangeStart();
                        break;
                    case "selectedRangeEnd":
                        this.model.selectedRangeSettings.end = this._selectedRangeEnd();
                        break;
                    default:
                        $.extend(true, this.model, {}, options[prop]);
                }
            }
          //  $(this.svgDocument).empty();		  
            this.bindTo();
			this.renderNavigator(this);
			this._bindevents();
        },
     
        _destroy: function () {
            this._unbindEvents();
            this.element.empty().removeClass(this.model.cssClass);
        },


        _createSvg: function (element) {

            this.svgSupport = (window.SVGSVGElement) ? true : false;
            this.vmlRendering = !this.svgSupport;
            var bwr = jQuery.uaMatch(navigator.userAgent);
            this.brow = bwr.browser.toLowerCase();
            if (this.svgSupport) {
                //rendering object created
                this.renderer = new ej.EjSvgRender(this.element);
                //Creating svg document
                this.svgns = this.renderer.svgLink;
                this.svgDocument = this.renderer.svgObj;
            }
            else {
                //rendering object created
                this.renderer = new ej.EjVmlRender(this.element);
                //Creating VML document
                this.svgDocument = this.renderer.svgObj;
            }

        },
        _setSVGSize: function () {

            //initializing minimum height and width for the control
            var type = this.model.valueType, height, rangeModel = this.model, size = rangeModel.sizeSettings,
                fontsize = parseFloat(rangeModel.labelSettings.higherLevel.style.font.size);
            if (type == "datetime") {
                this.minHighHeight = fontsize < 20 ?
                    20 :
                    fontsize + 2;
                fontsize = parseFloat(this.model.labelSettings.lowerLevel.style.font.size);
            }
            else
                this.minHighHeight = 0;
            this.minLowHeight = fontsize < 20 ?
                20 :
                fontsize + 2;
            this.scrollbarLoaded = (this.model.scrollObj && this.model.scrollObj[0].scrollbarLoaded) ? true : false;
            //Scrollbar height included on calculating rangenavigator height on update scrollbar with dynamically
            var scrollHeight = this.model.enableScrollbar && this.scrollbarLoaded && this.svgSupport ? 18 : 0;
            height = ($(this.element).height()) ? ($(this.element).height() > this.newHeight ? $(this.element).height() - scrollHeight : $(this.element).height()) :
                      this.newHeight == undefined ? (type == "datetime" ? 120 : 100) : this.newHeight;
            this.minCenterHeight = parseFloat(height) - parseFloat(this.minLowHeight) - parseFloat(this.minHighHeight);

            height = (height <= 0) ? 120 : height;
            this.minHeight = height;
            this.padding = parseFloat(rangeModel.padding);

            //calculating the height and width of the control
            this.newWidth = size.width ? size.width : $(this.element).width();
            this.newHeight = size.height ? size.height :
                ($(this.element).height() && this.newHeight == undefined) > this.minHeight ? $(this.element).height() - scrollHeight : this.minHeight;

            //allocate space for display scrollbar in range control
            this.scrollWidth = this.newWidth - this.padding * 2;
        },
        _setTheme: function (jsonObj, themeName) {
            var name = themeName.toLowerCase();
            if ((name.indexOf("high") >= 0) && (name.indexOf("01") >= 0))
                jsonObj[name] = $.extend(true, {}, jsonObj["highcontrast01"], jsonObj[name]);
            else if ((name.indexOf("high") >= 0) && (name.indexOf("02") >= 0))
                jsonObj[name] = $.extend(true, {}, jsonObj["highcontrast02"], jsonObj[name]);
            else if ((name.indexOf("material") >= 0))
                jsonObj[name] = $.extend(true, {}, jsonObj["material"], jsonObj[name]);
            else if ((name.indexOf("office") >= 0))
                jsonObj[name] = $.extend(true, {}, jsonObj["office"], jsonObj[name]);

            this.model = ej.copyObject({}, this.model, jsonObj[name]);
        },

        _setPositions: function () {
            
            var higherLevel = this.model.labelSettings.higherLevel,
                lowerLevel = this.model.labelSettings.lowerLevel,
                higherposition = higherLevel.position,
                lowerposition = lowerLevel.position,
                highervisible = higherLevel.visible,
                lowervisible = lowerLevel.visible,
                higherlabelplace = higherLevel.labelPlacement,
                lowerlabelplace = lowerLevel.labelPlacement;
            //to initialize the positions of the sliders, labelbars and chart
            if (higherposition === "top" && lowerposition === "bottom") {
                this.centerPosition = this.minHighHeight + 1;
                this.centerHeight = this.newHeight - this.minHighHeight - this.minLowHeight;
                this.bottomPosition = this.minHighHeight + this.centerHeight + 1;                    
            }
            else if ((higherposition === "bottom" && lowerposition === "bottom")) {
                this.centerPosition = 0;
                this.centerHeight = this.newHeight - this.minHighHeight - this.minLowHeight;
                this.bottomPosition = this.minLowHeight + this.centerHeight + 1;

            }
            else if (higherposition === "bottom" && lowerposition === "top") {
                this.centerPosition = this.minLowHeight + 1;
                var topPosition = 0;
                this.centerHeight = this.newHeight - this.minHighHeight - this.minLowHeight;
                this.bottomPosition = this.minLowHeight + this.centerHeight + 1;
            }
            else if (higherposition === "top" && lowerposition === "top") {
                this.centerPosition = this.minLowHeight + this.minHighHeight + 1;
                this.centerHeight = this.newHeight - this.minHighHeight - this.minLowHeight;
                this.bottomPosition = this.newHeight;
            }

            if (highervisible === false && lowervisible === false) {
                this.centerPosition = 0;
                this.centerHeight = this.newHeight;
                this.bottomPostion = this.newHeight;
            }
            else if (highervisible === false) {
                this.centerPosition = 0;
                this.centerHeight = this.newHeight - this.minLowHeight;
                this.bottomPosition = this.newHeight;
            }
            else if (lowervisible === false) {
                this.centerPosition = this.minHighHeight + 1;
                this.centerHeight = this.newHeight - this.minHighHeight;
                this.bottomPosition = this.minHighHeight + this.centerHeight + 1;
            }

            if (higherlabelplace === "outside" && lowerlabelplace === "outside") {
                this.sliderPosition = this.centerPosition;
                this.sliderHeight = this.centerHeight;
            }
            else if (higherlabelplace === "outside") {
                this.sliderPosition = this.centerPosition;
                this.sliderHeight = this.newHeight;
            }
            else if (lowerlabelplace === "outside") {
                this.sliderPosition = 0;
                this.sliderHeight = this.centerHeight + this.minHighHeight;
            }
            else {
                this.sliderPosition = 0;
                this.sliderHeight = this.newHeight;
            }
            
        },

        //adding redraw method

        redraw: function (evt) {

            //Set virtual range and enable scrollbar on redraw
            var virtualRange = this.model.scrollRangeSettings,rangeSettings = this.model.rangeSettings, scrollRange, start = virtualRange.start,
                end = virtualRange.end, rangeStart, rangeEnd;//,actualScrollRange = this._scrollRangeSettings;
            this.loadScrollbar = false
            if (this.model.enableScrollbar) {
                this.scrollUpdate = true;
                scrollRange = this._scrollRange;
                if (this.model.valueType.toLowerCase() == "datetime") {
                    start = Date.parse(virtualRange.start);
                    end = Date.parse(virtualRange.end);
                    rangeStart = Date.parse(rangeSettings.start);
                    rangeEnd = Date.parse(rangeSettings.end);
                    //actualStart = Date.parse(actualScrollRange.start);
                    //actualEnd = Date.parse(actualScrollRange.end);
                }
                if (!scrollRange || rangeStart < scrollRange.min || scrollRange.max < rangeEnd || scrollRange.min != start || scrollRange.max != end || ej.isNullOrUndefined(this.scrollsvgObj)) {
                    //Load new scrollbar or update for the dynamic virtualRange changes
                    this.loadScrollbar = true;
                    this.scrollbarLoaded = false;
                    $(this.scrollsvgObj).remove();
                }
            }

            this.renderNavigator(this);

        },

        renderNavigator: function (evt) {
            $(this.svgDocument).empty();
            var locale = this.model.locale;
            this.culture = ej.preferredCulture(locale);
            this._localizedLabels = this._getLocalizedLabels();
            this._initializeVariables.call(this, this.model, this.model.series, this.model.seriesSettings);

            this._rootId = $(this.element).attr("id");
            this.leftPadding =parseFloat($("#"+this._rootId).css('padding-left'));

            this._setSVGSize.call(this);
            var type = this.model.valueType;
            //initializing the higherlevel and lowerlevel collections
            this._higherTextNode = [];
            this._higherTotalValues = [];
            this._higherLineLeft = [];
            this._higherTextLeft = [];
            this._lowerTextNode = [];
            this._lowerTotalValues = [];
            this._lowerLineLeft = [];
            this._lowerTextLeft = [];

            //inizialize the higher level and lower level labels regions
            this.labelRegions =[];
            
            //Checking selection and highlight enable
            var labelSettings = this.model.labelSettings,
                higherLevel = labelSettings.higherLevel,
                lowerLevel = labelSettings.lowerLevel,
                valueType = this.model.valueType;

            //calculating positions
            this.centerPosition=0;
            this.bottomPosition = 0;
            this.centerHeight = 0;
            this.sliderPosition = 0;
            this.sliderHeight = 0;
            
            //set positions
            this._setPositions();

            //set initial width and height for the svg document
            this.svgDocument.setAttribute('style', 'overflow:visible;position:relative;display:block');
            if (this.svgSupport) {
                this.svgDocument.setAttribute("height", this.newHeight);
                this.svgDocument.setAttribute("width", this.newWidth);
            }
            else {
                $(this.svgDocument).width(this.newWidth);
                $(this.svgDocument).height(this.newHeight);
            }
            this.model._size.width = this.newWidth;
            this.model._size.height = this.newHeight;
            var commonLoadedEventArgs = $.extend({}, ej.EjSvgRender.commonChartEventArgs);
            commonLoadedEventArgs.data = { model: this.model };
            this._trigger("loaded", commonLoadedEventArgs);
            if (this.model.theme != "")
                this._setTheme(this._themes, this.model.theme);
            //create gradient
            var navigatorStyleSettings = this.model.navigatorStyleSettings;
            var uncolor = navigatorStyleSettings.unselectedRegionColor;
            this.unselectgrad = this.renderer.createGradientElement('unselected', uncolor, 150, 0, 150, 100, this.svgDocument);
            var navibackcolor = navigatorStyleSettings.background;
            this.naviback = this.renderer.createGradientElement('naviback', navibackcolor, 150, 0, 150, 100, this.svgDocument);
            var selcolor = navigatorStyleSettings.selectedRegionColor;
            this.selectedgrad = this.renderer.createGradientElement('selected', selcolor, 150, 0, 150, 100, this.svgDocument);
            var tbColor = navigatorStyleSettings.thumbColor;
            this.tbClr = this.renderer.createGradientElement('thumbClr', tbColor, 150, 0, 150, 100, this.svgDocument);
            
            var border = this.model.border;
            var borderColor = border.color ? border.color :(this.model.enableScrollbar? "#B4B4B4": "transparent");
            //Creating layout for navigator
            var naviLayoutOptions = {
                'id': this._rootId + '_Layout',
                'x': this.padding,
                'width': this.newWidth > 0 ? this.newWidth - this.padding * 2 : 0,
                'height': this.newHeight,
                'fill': 'transparent',
                'stroke-width': border.width,
                'stroke': borderColor,
                'opacity': border.opacity
            };

            this.renderer.drawRect(naviLayoutOptions, this.svgDocument);
            var areaHeight;
            if (type == "numeric")
                areaHeight = this.newHeight - navigatorStyleSettings.border.width - this.minLowHeight;
            else
                areaHeight = this.newHeight - navigatorStyleSettings.border.width - this.minLowHeight - this.minHighHeight;
            //Creating border for navigator
            var naviBorderOptions = {
                'id':this._rootId+'_Border',
                'x':this.padding,
                'y': this.sliderPosition,
                'width': this.newWidth >0 ? this.newWidth-this.padding * 2: 0,
                'height': this.sliderHeight,
                'fill': this.naviback,
                'stroke-width': navigatorStyleSettings.border.width,
                'stroke': navigatorStyleSettings.border.color,
                'opacity': navigatorStyleSettings.opacity,
                'stroke-dasharray': navigatorStyleSettings.border.dashArray,
                
            }

            this.renderer.drawRect(naviBorderOptions, this.svgDocument);

            //creating g tags to group higherlevel and lowerlevel elements(txt,line).
            if ($("#" + this._rootId + 'higherLevel').length == 0)
                this.higherLevel = this.renderer.createGroup({ 'id': this._rootId + 'higherLevel' });
            if ($("#" + this._rootId + 'lowerLevel').length == 0)
                this.lowerLevel = this.renderer.createGroup({ 'id': this._rootId + 'lowerLevel' });
            this.centerLevel = this.renderer.createGroup({ 'id': this._rootId + 'centerLelvel' });
            this.higherLevel.height = this.minHighHeight;
            this.lowerLevel.height = this.minLowHeight;

            //creating g tags to group tooltipSettings
            if (this.model.tooltipSettings.visible && this.svgSupport) {
                this.leftTooltip = this.renderer.createGroup({ 'id': this._rootId + 'leftTooltip' });
                this.rightTooltip = this.renderer.createGroup({ 'id': this._rootId + 'rightTooltip' });

                var leftToolOptions = {
                    'fill': this.model.tooltipSettings.backgroundColor,
                    'd': 'M 0 0 L 0 21 L 64 21 L 64 6 L 70 0 Z'
                };
                this.renderer.drawPath(leftToolOptions, this.leftTooltip);
                var tooltipoptions = this.model.tooltipSettings.font;
                

                var textOptions = {
                    'id': this._rootId + '_LeftToolText',
                    'x': 5,
                    'fill': tooltipoptions.color,
                    'font-size': tooltipoptions.size,
                    'font-family': tooltipoptions.family,
                    'font-style': tooltipoptions.style,
                    'font-weight': tooltipoptions.weight,
                    'text-anchor': 'start',
                    'opacity': tooltipoptions.opacity,
                    'dominant-baseline': 'middle',
                    
                    
                };
                this.renderer.drawText(textOptions, ej.format(new Date(1 / 1 / 2000), "MMMM, yyyy", locale), this.leftTooltip);
                this.leftTxt = this.leftTooltip.childNodes[1];
                var rightToolOptions = {
                    'fill': this.model.tooltipSettings.backgroundColor,
                    'd': 'M 0 0 L 70 0 L 70 21 L 6 21 L 6 6 Z',
                    'horizontal-alignment': 'stretch'
                };
                this.renderer.drawPath(rightToolOptions, this.rightTooltip);
                textOptions.id = this._rootId + '_RightToolText';
                this.renderer.drawText(textOptions, ej.format(new Date(1 / 1 / 2000), "MMMM, yyyy", locale), this.rightTooltip);
                this.rightTxt = this.rightTooltip.childNodes[1];

             
            }
            //creating g tag for holding chart
            this.chartGView = this.renderer.createGroup({ 'id': this._rootId + 'charView' });
            
            this.renderer.append(this.chartGView, this.svgDocument);
            if (this.model.navigatorStyleSettings.highlightSettings.enable || this.model.navigatorStyleSettings.selectionSettings.enable) {
                this.styleRect = this.renderer.createGroup({ 'id': this._rootId + 'highlightRect' });
                this.renderer.append(this.styleRect, this.svgDocument);
            }
            if(this.model.valueType=="datetime")
            this.renderer.append(this.higherLevel, this.svgDocument);
            this.renderer.append(this.lowerLevel, this.svgDocument);
            this.renderer.append(this.centerLevel, this.svgDocument);
            
            //creating g tag for sliders
            this.leftUnSelected=this.renderer.createGroup({'id':'unselectleft'});
            this.gLeftSlider = this.renderer.createGroup({ 'id': 'leftslider' });
            this.gRightSlider = this.renderer.createGroup({ 'id': 'rightslider' });
            this.gCenterSlider = this.renderer.createGroup({ 'id': 'centerslider' });
            this.rightUnSelected = this.renderer.createGroup({ 'id': 'unselectright' });

            var unLeftSliderOptions = {
                'width': this.newWidth > 0 ? this.newWidth - this.padding * 2 : 0,
                'height': this.sliderHeight,
                'fill':this.unselectgrad,
                'opacity': navigatorStyleSettings.unselectedRegionOpacity,
                'transform': 'translate('+this.padding+',' + this.sliderPosition + ')'
            };
            this.renderer.drawRect(unLeftSliderOptions, this.leftUnSelected);
            this.leftUnArea = this.leftUnSelected.firstChild;
            this.renderer.append(this.leftUnSelected, this.svgDocument);

            var centerSliderOptions = {
                'width': this.newWidth > 0 ? this.newWidth - 4 - this.padding * 2 : 0,
                'height': this.sliderHeight,
                'fill': this.selectedgrad,
                'opacity': navigatorStyleSettings.selectedRegionOpacity,
                'transform': 'translate('+this.padding+','+this.sliderPosition+')'
            };

            this.renderer.drawRect(centerSliderOptions, this.gCenterSlider);
            this.centerSlider = this.gCenterSlider.firstChild;
            $(this.centerSlider).css('cursor', 'pointer');

            this.renderer.append(this.gCenterSlider, this.svgDocument);
            var leftSliderOptions = {                 
                'width': '2',
                'height': this.sliderHeight,
                'fill': navigatorStyleSettings.thumbStroke,
                'opacity': '1',
                'y': this.sliderPosition,
                'transform': 'translate(' + this.padding + ')'
               
                
            };
            var lcircleOptions = {
                'id': 'leftCircle' + this._id,
                'cx': this.padding,
                'cy': this.sliderPosition + (this.sliderHeight / 2),
                'r': navigatorStyleSettings.thumbRadius,
                'stroke-width': 2,
                'stroke': navigatorStyleSettings.thumbStroke,
                'fill': this.tbClr
            };

                
            this.renderer.drawRect(leftSliderOptions, this.gLeftSlider);
			// checking condition for whether using thumb
            if (this.model.navigatorStyleSettings.leftThumbTemplate == null) {
                this.renderer.drawCircle(lcircleOptions, this.gLeftSlider);
                this.leftCircle = this.gLeftSlider.lastChild;
                $(this.leftCircle).css('cursor', 'pointer');
            }

            // Adding left Thumb  

            else {
                var isID = document.getElementById(this.model.navigatorStyleSettings.leftThumbTemplate) ? true : false;
                if ($('#' + this._id + "thumbleft").length > 0)
                    $('#' + this._id + "thumbleft").remove();
                var container = this._id;
				if (($("#" + container).css('transform')) == 'none')
                    $("#" + container).css('transform', 'translate(0, 0)');
                if ($("#" + container+"template_group_").length != 0)
                    var templateContainer = $("#" + container + "template_group_");
				else
				{
                   var templateContainer = $("<div></div>").attr('id',container+"template_group_");
				    $(templateContainer).css("position", "relative");
				}
                var temp = $("<div></div>").attr("id", this._id + "thumbleft");
                var cloneNode;
                if (isID == true)
                    cloneNode = $("#" + this.model.navigatorStyleSettings.leftThumbTemplate)[0].innerHTML;
                else
                    cloneNode = this.model.navigatorStyleSettings.leftThumbTemplate;
                var $cloneNode = $(cloneNode);
                $(temp).css("position", "absolute");
                $cloneNode.appendTo($(temp));
                $(temp).appendTo(templateContainer);
                if (this.svgSupport) 
					$(templateContainer).appendTo('#' + container);
                else
                    $(templateContainer).appendTo(this.svgDocument);
            	var top = this.sliderPosition + (this.sliderHeight / 2) - (($cloneNode.height()) / 2);
				$(temp).css("top", top).css('cursor', 'pointer').css('z-index','1');
			}
            this.leftSlider = this.gLeftSlider.firstChild;
            $(this.leftSlider).css('cursor', 'w-resize');

            this.renderer.append(this.gLeftSlider, this.svgDocument);

			var width = parseFloat(this.newWidth - this.padding*2); // To check width on initialize the range navigator.
			width = width < 0 ? 0 : width;
			
            var unRightSliderOptions = {
                'width': width,
                'height': this.sliderHeight,
                'fill': this.unselectgrad,
                'opacity': navigatorStyleSettings.unselectedRegionOpacity,
                'transform': 'translate('+this.padding+',' + this.sliderPosition + ')'
            };
            this.renderer.drawRect(unRightSliderOptions, this.rightUnSelected);
            this.rightUnArea = this.rightUnSelected.firstChild;
            this.renderer.append(this.rightUnSelected, this.svgDocument);
            var rightSliderOptions = {               
                'width': '2',
                'height': this.sliderHeight,
                'fill': this.model.navigatorStyleSettings.thumbStroke,
                'opacity': '1',
                'transform': 'translate(' + parseFloat(this.newWidth - 4-this.padding) + ', ' + this.sliderPosition + ' )'
            };
            var rcircleOptions = {
                'id': "rightCircle" + this._id,
                'cx': this.newWidth - 4 - this.padding,
                'cy': this.sliderPosition + (this.sliderHeight / 2),
                'r': this.model.navigatorStyleSettings.thumbRadius,
                'stroke-width': 2,
                'stroke': this.model.navigatorStyleSettings.thumbStroke,
                'fill': this.tbClr
            };
            this.renderer.drawRect(rightSliderOptions, this.gRightSlider);
            if (this.model.navigatorStyleSettings.rightThumbTemplate == null)
            {
                this.renderer.drawCircle(rcircleOptions, this.gRightSlider);
                this.rightCircle = this.gRightSlider.lastChild;
                $(this.rightCircle).css('cursor', 'pointer');
            }

            // append right thumb   

            else {
                var isID = document.getElementById(this.model.navigatorStyleSettings.rightThumbTemplate) ? true : false;
                if ($('#' + this._id + "thumbright").length > 0)
                    $('#' + this._id + "thumbright").remove();
                var container = this._id;
                if ($("#" + container + "template_group_").length != 0)
                    var templateContainer = $("#" + container + "template_group_");
                else
				 {
                    var templateContainer = $("<div></div>").attr('id',container+ "template_group_");
					 $(templateContainer).css("position", "absolute");
				 }
                var temp = $("<div></div>").attr("id", this._id + "thumbright");
                var cloneNode;
                if (isID == true)
                    cloneNode = $("#" + this.model.navigatorStyleSettings.rightThumbTemplate)[0].innerHTML;
                else
                    cloneNode = this.model.navigatorStyleSettings.rightThumbTemplate;
                var $cloneNode = $(cloneNode);
                $(temp).css("position", "absolute");
                $cloneNode.appendTo($(temp));
                $(temp).appendTo(templateContainer);
                if (this.svgSupport) 
					$(templateContainer).appendTo('#' + container);
                else
                    $(templateContainer).appendTo(this.svgDocument);
                var top = this.sliderPosition + (this.sliderHeight / 2) - (($cloneNode.height()) / 2);
                $(temp).css("top", top).css('cursor', 'pointer').css('z-index', '1');
             }

            this.rightSlider = this.gRightSlider.firstChild;
            $(this.rightSlider).css('cursor', 'w-resize');

            this.renderer.append(this.gRightSlider, this.svgDocument);
            if (this.model.tooltipSettings.visible && this.svgSupport) {
                this.renderer.append(this.leftTooltip, this.svgDocument);
                this.renderer.append(this.rightTooltip, this.svgDocument);
            }
            
            this.element.append(this.svgDocument);
            if (this.svgSupport) {
                this.trueCoords = this.svgDocument.createSVGPoint();

                this.grabPoint = this.svgDocument.createSVGPoint();
            }

            this.backDrop = this.element;
            this.dragTarget = null;            
            if(this.sliderHeight > 0)
                 this._renderChart.call(this, this.model);
            if (evt != undefined && evt.target != undefined)
                this.resize = true;
            
            if ((this.startDateTime != undefined && this.endDateTime != undefined) || (this.startValue != undefined && this.endValue != undefined)) {
                this.calculateInterval.call(this, this.model.labelSettings.higherLevel, this.model.labelSettings.lowerLevel);

                this.setSliders();
            } else {
                if (!this.svgSupport)
                    this.renderer._setAttr($(this.leftSlider), { 'transform': 'translate(' + this.padding + ',' + this.sliderPosition + ')' });
                else
                    this.renderer._setAttr($(this.leftSlider), { 'transform': 'translate(' + this.padding + ',' + 0 + ')' });

                this.leftTooltip.setAttribute('opacity', 0);
                this.rightTooltip.setAttribute('opacity', 0);
            }
            if (this.model.tooltipSettings.visible && this.svgSupport && this.model.tooltipSettings.tooltipDisplayMode.toLowerCase() == "ondemand") {
                this.rightTooltip.setAttribute('opacity', 0);
                this.leftTooltip.setAttribute('opacity', 0);
            }
            this._scrollChanged = this._scrollChanged ? false : this._scrollChanged;
            //this._trigger("loaded", this.model);

            //Add or remove scrollbar dynamically
            if (!this.model.enableScrollbar) {
                $(this.scrollsvgObj).remove();
                this.scrollsvgObj = null;
                this.scrollZoomPos = null;
                this.scrollZoomFact = null;
            } else {
                if ((this.loadScrollbar && !this.scrollbarUpdate) || (this.model.scrollObj && this.model.scrollObj[0].width != this.scrollWidth)) {
                    this.model.scrollObj[0].width = this.scrollWidth;
                    this.scrollbarContainer = new ej.EjSvgScrollbarRender(this.element, this.model.scrollObj[0]);
                    this.scrollbarContainer._initializeScrollbarVariables.call(this, this.model.scrollObj[0]);
                    this.scrollbarContainer._renderScrollbar.call(this, this.model.scrollObj[0]);

                } else
                    this.renderer.append(this.scrollsvgObj, this.element);
                this._bindevents();
            }
        },

        eachInterval:"",

        //Rendering chart
        _renderChart: function (model) {
            var valueType = model.valueType.toLowerCase();
            var range, rangeSettings = model.rangeSettings;
            if (model.enableScrollbar || (rangeSettings.start != "" && rangeSettings.end != "")) {
                if (valueType == "datetime")
                    range = { min: this.startDateTime, max: this.endDateTime };
                else
                    range = { min: this.startValue, max: this.endValue };
            }
            if (model.dataSource != "" && model.series == "" && model.seriesSettings == "") {
                $(this.chartGView).ejChart(
                {
				    locale : this.model.locale,
                    border: { width: 0, color: "transparent" },
                    margin: { left: 0, right: 0, top: 0, bottom: 0 },
                    elementSpacing: 0,
                    chartArea:
                    {
                        background: "transparent",
                        border: { width: 0 }
                    },
                    primaryXAxis: {
                        axisLine: { visible: false },
                        font: { size: '0px' },
                        range:range,
                        majorTickLines:
                        {
                            lineWidth: 0,
                            size: 0,
                            visible: true
                        },
                        majorGridLines: { visible: false },
                        rangePadding: this.model.rangePadding,
                        visible: false,
                        isInversed: this.model.enableRTL

                    },
                    primaryYAxis: this.model.valueAxisSettings,
                 series: [{
                     dataSource: model.dataSource, xName: model.xName, yName: model.yName,
                     type: 'line',
                     width:1.5,
                     enableAnimation:false

                 },
                 ],
                 size: { height: parseFloat(this.sliderHeight).toString(), width: parseFloat(this.newWidth - (2 * this.padding)).toString(), padding: -10 },
                 legend: {
                     visible: false,
                     itemSize: { height: 0, width: 0, borderColor: 'transparent', borderWidth: 0 },
                 }
             });
            }
            else if (model.dataSource != "" && model.series != "" && model.series[0].dataSource == undefined || model.seriesSettings != "" && model.seriesSettings.dataSource == undefined && model.dataSource!="") {
                model.seriesSettings.dataSource = model.dataSource;
                model.seriesSettings.xName = model.seriesSettings.xName ? model.seriesSettings.xName : model.xName;
                model.seriesSettings.yName = model.seriesSettings.yName ? model.seriesSettings.yName : model.yName;
                var series = model.series;
                if (series == "") {
                    series = [{
                        dataSource: model.dataSource, xName: model.seriesSettings.xName, yName: model.seriesSettings.yName,
                        type: 'line',
                        width: 1.5,
                        enableAnimation: false

                    }];
                }
               
                $(this.chartGView).ejChart(
            {
			    locale : this.model.locale,
                border: { width: 0, color: "transparent" },
                margin: { left: 0, right: 0, top: 0, bottom: 0 },
                elementSpacing: 0,
                chartArea:
                {
                    background: "transparent",
                    border: { width: 0 }
                },
                primaryXAxis: {

                    axisLine: { visible: false },
                    font: { size: '0px' },
                    range:range,
                    majorTickLines:
                    {
                        lineWidth: 0, size: 0, visible: true
                    },
                    majorGridLines: { visible: false },
                    rangePadding: this.model.rangePadding,
                    visible: false,
                    isInversed: this.model.enableRTL

                },
                primaryYAxis: this.model.valueAxisSettings,
                series: series,
                commonSeriesOptions: model.seriesSettings,
                size: { height: parseFloat(this.sliderHeight).toString(), width: parseFloat(this.newWidth - (2 * this.padding)).toString(), padding: -10 },
                legend: {
                    visible: false,
                    itemSize: { height: 0, width: 0, borderColor: 'transparent', borderWidth: 0 },
                }
            });
            }
            else if (model.series != "" && model.series[0].dataSource != undefined || model.seriesSettings != "" && model.seriesSettings.dataSource != undefined) {
                if (model.seriesSettings == "") {
                    model.seriesSettings = {
                        type: 'line'
                    };
                }
                var series = model.series;
                var length = series.length;
                if (series == "") {
                    series = [{
                        dataSource: model.seriesSettings.dataSource, xName: model.seriesSettings.xName, yName: model.seriesSettings.yName,
                        type: 'line',
                        width: 1.5,
                        enableAnimation: false

                    }];
                }
                
                $(this.chartGView).ejChart(
            {
			    locale : this.model.locale,
                border: { width: 0, color: "transparent" },
                margin: { left: 0, right: 0, top: 0, bottom: 0 },
                elementSpacing: 0,
                chartArea:
                {
                    background: "transparent",
                    border: { width: 0 }
                },
                primaryXAxis: {

                    axisLine: { visible: false },
                    range:range,
                    font: { size: '0px' },
                    majorTickLines:
                    {
                        lineWidth: 0, size: 0, visible: true
                    },
                    majorGridLines: { visible: false },
                    rangePadding: this.model.rangePadding,
                    visible: false,
                    isInversed: this.model.enableRTL

                },
                primaryYAxis: this.model.valueAxisSettings,
                series: series,
                commonSeriesOptions: model.seriesSettings,
                size: { height: parseFloat(this.sliderHeight).toString(), width: parseFloat(this.newWidth - (2 * this.padding)).toString(), padding: -10 },
                legend: {
                    visible: false,
                    itemSize: { height: 0, width: 0, borderColor: 'transparent', borderWidth: 0 },
                }
            });
            }

            this.ejChart = $(this.chartGView).data("ejChart");
            this.renderer._setAttr($(this.chartGView), { 'transform': 'translate(' + this.padding + ',' + this.sliderPosition + ')' });
            $("#chartContainer_" +this.chartGView.id).remove();
        },

        _init: function () {
            this._createSvg(this);
            var commonLoadedEventArgs = $.extend({}, ej.EjSvgRender.commonChartEventArgs), virtualRange;
            commonLoadedEventArgs.data = { model: this.model };
            this._trigger("load", commonLoadedEventArgs);
            virtualRange = this.model.scrollRangeSettings;

            this.renderNavigator(this);
            if (this.model.enableScrollbar) {
                this.model.scrollObj = [];
                var scrollObj = this.model.scrollObj;
                scrollObj[0] = {
                   'orientation': 'horizontal',
                   'index': 0,
                   'width': this.scrollWidth,
                   'x':0,
                   'y': this.newHeight,
                   'isRTL': this.model.enableRTL,
                   'zoomPosition':this.scrollZoomPos,
                   'zoomFactor': this.scrollZoomFact,
                   'scrollRange': this._scrollRange,
                   'valueType': this.model.valueType,
                   'parent': this.element,
                   'enableResize': true
               };
               if (scrollObj[0].valueType == 'datetime') {
                    scrollObj[0].startDateTime = this.startDateTime;
                    scrollObj[0].endDateTime = this.endDateTime;
               } else {
                    scrollObj[0].startValue = this.startValue;
                    scrollObj[0].endValue = this.endValue;
               }
               this.scrollbarContainer = new ej.EjSvgScrollbarRender(this.element, this.model.scrollObj[0]);
               this.scrollbarContainer._initializeScrollbarVariables.call(this, this.model.scrollObj[0]);
               this.scrollbarContainer._renderScrollbar.call(this, this.model.scrollObj[0]);
            }
            if (this.model.enableAutoResizing || this.model.isResponsive)
                this.bindResizeEvents();
            else
               this.removeResizeEvents();
            this._bindevents();
        },
        bindResizeEvents: function () {
            if (this.model._rangeResizeEventRegistered)
                return 0;
            if (!this.model.enableScrollbar || (this.model.enableScrollbar && this.svgSupport))
                this._on($(window), "resize", this.rangeChange);
            this.model._rangeResizeEventRegistered = true;
        },

        removeResizeEvents: function () {
            if (this.model._rangeResizeEventRegistered) {
                this._off($(window), "resize", this.rangeChange);
                this.model._rangeResizeEventRegistered = false;
            }
        },
             
         
		 rangeChange:function(evt){
             var id, _this = this;
			 this.rangeResize = true;
			 clearTimeout(id);
			 
			 if (!ej.isNullOrUndefined(window.orientation))			     
			     id = setTimeout(function(){_this.renderNavigator();}, 500);
			 else 
			     this.renderNavigator();
			 if (this.model.enableScrollbar) {
			     this.model.scrollObj[0].width = this.scrollWidth;
			     this.scrollbarContainer._renderScrollbar.call(this, this.model.scrollObj[0]);
			 }
          },

        isDevice: function () {
            // return (/mobile|tablet|android|kindle/i.test(navigator.userAgent.toLowerCase()));
            // comment above line temporary. Due to the below code event wont bind for tablet device
            return (/mobile|android|kindle/i.test(navigator.userAgent.toLowerCase()));
        },

		//To check whether the device is Windows
        isWindows: function () {
          if (!ej.getBooleanVal($('head'), 'data-ej-android') && !ej.getBooleanVal($('head'), 'data-ej-ios') && !ej.getBooleanVal($('head'), 'data-ej-ios7') && !ej.getBooleanVal($('head'), 'data-ej-flat'))
            return this._windows();
        },
		
		 _windows: function () {
          return (/trident|windows phone/i.test(navigator.userAgent.toLowerCase())) || (ej.getBooleanVal($('head'), 'data-ej-windows', false) === true);
        },

        _unbindEvents: function(){
            this._off($(this.element), "contextmenu", this._rightClick);
            this._off($(this.element), "click", this._rangeClick);
        },
		
        _bindevents: function () {
            var matched = jQuery.uaMatch(navigator.userAgent),
                browserInfo = ej.EjSvgRender.utils.browserInfo(),
                isPointer = browserInfo.isMSPointerEnabled,
	            isIE11Pointer = browserInfo.pointerEnabled,
                touchStartEvent = isPointer ? (isIE11Pointer ? "pointerdown" : "MSPointerDown") : "touchstart mousedown",
                touchStopEvent = isPointer ? (isIE11Pointer ? "pointerup" : "MSPointerUp") : "touchend mouseup",
                touchMoveEvent = isPointer ? (isIE11Pointer ? "pointermove" : "MSPointerMove") : "touchmove mousemove",
                touchCancelEvent = isPointer ? (isIE11Pointer ? "pointerleave" : "MSPointerOut") : "touchleave mouseleave";
            this.model.browserInfo = browserInfo;


            this._on(this.element, touchMoveEvent, this._drag);
            this._on(this.element, touchCancelEvent, this._leave);
            this._on($(document), touchStopEvent, this._drop);
            this._on($(this.element), touchStartEvent, this._grab);
            this._on($(this.element), "contextmenu", this._rightClick);
            this._on($(this.element), "click", this._rangeClick);


            this._on($("#" + this._id + "template_group_"), touchStartEvent, this._grab);
            this._on($("#" + this._id + "template_group_"), touchMoveEvent, this._drag);
            this._on($("#" + this._id + "template_group_"), touchStopEvent, this._drop);
            this._on($(window), touchStopEvent, this.mouseup);

            $(this.element).css('touch-action', 'none');

        },

        _initializeVariables: function (model, series, sSettings) {
            //intializing ismouseup flag
			var startDateTime, endDateTime;
            this.ismouseup = false;
            var rangeSettings= this.model.rangeSettings,
                labelStyle = this.model.labelSettings.style,
                lowLabelStyle = this.model.labelSettings.lowerLevel.style,
                highLabelStyle = this.model.labelSettings.higherLevel.style,
                scrollRangeSettings = this.model.scrollRangeSettings;
            //checking labelstyle
            if (highLabelStyle == "")
                this.model.labelSettings.higherLevel.style = labelStyle;
            if (lowLabelStyle == "") {
                this.model.labelSettings.lowerLevel.style = labelStyle;
            }
            else if (lowLabelStyle != undefined && lowLabelStyle.horizontalAlignment == undefined) {
                this.model.labelSettings.lowerLevel.style.horizontalAlignment = "middle";
            }
            if (this.model.valueType == "numeric" && this.model.tooltipSettings.labelFormat=="MM/dd/yyyy") {
                this.model.tooltipSettings.labelFormat = "d";
            }
            //checking for datasource and finding start and end values
            if (model.dataSource != "" && model.xName != "" && model.yName != "") {
                var length = series.length;
                if (length > 0) {
                    for (var i = 0; i < length; i++) {
                        series[i].dataSource = model.dataSource;
                        series[i].type = series[i].type ? series[i].type : (sSettings.type ? model.type : "line");
                        series[i].xName = series[i].xName ? series[i].xName : model.xName;
                        series[i].yName = series[i].yName ? series[i].yName : model.yName;
                        this._processJsonData(series[i].dataSource, series[i]);
                    }
                } else
                    this._processJsonData(model.dataSource, this.model);
            }
            else if (series!="" && series != undefined && series[0].dataSource != undefined && series[0].xName != undefined && series[0].yName != undefined) {
                this._processJsonData(series[0].dataSource, series[0]);
            }
            else if (sSettings.dataSource != undefined) {
                var length = series.length;
                if (length > 0) {
                    for (var i = 0; i < length; i++) {
                        series[i].dataSource = sSettings.dataSource;
                        series[i].type = series[i].type ? series[i].type : (sSettings.type ? sSettings.type : "line");
                        series[i].xName = series[i].xName ? series[i].xName : sSettings.xName;
                        series[i].yName = series[i].yName ? series[i].yName : sSettings.yName;
                        this._processJsonData(series[i].dataSource, series[i]);
                    }
                } else
                    this._processJsonData(sSettings.dataSource, sSettings);
            }
            else if (rangeSettings.start != "" && rangeSettings.end != "") {
                var minX = startDateTime = rangeSettings.start, maxX = endDateTime = rangeSettings.end;
                if (this.model.enableScrollbar) {
                    var args = [minX, maxX, new Date(minX), new Date(maxX)];
                    this.calculateZoomingRange.apply(this, args);

                } else
                    this.setRange.call(this, minX, maxX, startDateTime, endDateTime);               
            }
            // initializing start year and end year
            if (this.startDateTime != undefined && this.endDateTime != undefined) {
                if (this.model.valueType == "datetime" && this.model.rangePadding == "round") {
                    var start = new Date(this.startValue);
                    var end = new Date(this.endValue);
                    this.startDateTime = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0);
                    this.endDateTime = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59);
                }
                this.startYear = this.startDateTime.getFullYear();
                this.startMonth = this.startDateTime.getMonth(); 
                this.endYear = this.endDateTime.getFullYear();
                this.endMonth = this.endDateTime.getMonth();
            }           
        },

        setSliders: function () {
            var wholeSize = this.newWidth - this.padding * 2,
                type = this.model.valueType,
                selectedRangeStart = this.model.selectedRangeSettings.start,
                selectedRangeEnd = this.model.selectedRangeSettings.end,
                padding = this.padding, startRange = this.startDateTime.getTime(), endRange = this.endDateTime.getTime(),
                interval, startValue = this.startValue, endValue = this.endValue;
            if (type == "datetime")
                this.eachInterval = wholeSize / parseFloat(endRange - startRange);
            else
                this.eachInterval = wholeSize / parseFloat(endValue - startValue);

            interval = this.eachInterval;
            if (!this.model.enableScrollbar) {
                if (type == "datetime") {
                    if (selectedRangeStart == "" || new Date(selectedRangeStart).getTime() < startRange)
                        selectedRangeStart = this.startDateTime;
                    if (selectedRangeEnd == "" || new Date(selectedRangeEnd).getTime() > endRange || new Date(selectedRangeEnd).getTime() < startRange)
                        selectedRangeEnd = this.endDateTime;
                }
                else {
                    if (selectedRangeStart == "" || selectedRangeStart < startValue)
                        selectedRangeStart = startValue;
                    if (selectedRangeEnd == "" || selectedRangeEnd > endValue)
                        selectedRangeEnd = endValue;
                }
            }
            
            if (!this.model.enableRTL) {
                if (type == "datetime") {
                    this.leftSliderPosition = (new Date(selectedRangeStart).getTime() - startRange) * interval + padding;
                    this.rightSliderPosition = (new Date(selectedRangeEnd).getTime() - startRange) * interval + padding;
                    selectedRangeStart = new Date(selectedRangeStart);
                    selectedRangeEnd = new Date(selectedRangeEnd)
                }
                else {
                    this.leftSliderPosition = (selectedRangeStart - startValue) * interval + padding;
                    this.rightSliderPosition = (selectedRangeEnd - startValue) * interval + padding;
                }
            } else {
                if (type == "datetime") {
                    this.leftSliderPosition = (endRange - new Date(selectedRangeEnd).getTime()) * interval + padding;
                    this.rightSliderPosition = (endRange - new Date(selectedRangeStart).getTime()) * interval + padding;
                    selectedRangeStart = new Date(selectedRangeStart);
                    selectedRangeEnd = new Date(selectedRangeEnd);
                }
                else {
                    this.leftSliderPosition = (endValue - selectedRangeEnd) * interval + padding;
                    this.rightSliderPosition = (endValue - selectedRangeStart) * interval + padding;
                }               
            }

            if (this.model.tooltipSettings.tooltipDisplayMode == "always")
                this.setopacity = 1;
            else
                this.setopacity = 0;

            if (!this.model.enableScrollbar)
                this.setSliderPositions(this.leftSliderPosition, null, null);
            else {
                if ((this.leftSliderPosition >= padding && this.leftSliderPosition < this.newWidth - padding))
                    this.setSliderPositions(this.leftSliderPosition, null, null);
                else {
                    if (this.leftSliderPosition > this.newWidth) {
                        $(this.leftTooltip).hide();
                        $(this.gLeftSlider).hide();
                    } else {
                        $(this.leftTooltip).hide();
                        $(this.gLeftSlider).hide();
                        $(this.leftUnSelected).hide();
                    }
                }
            }
            if (!this.model.enableScrollbar)
                this.setSliderPositions(null, null, this.rightSliderPosition);
            else {
                if ((this.rightSliderPosition <= (this.newWidth - padding) && this.rightSliderPosition > padding))
                    this.setSliderPositions(null, null, this.rightSliderPosition);
                else {
                    if (this.rightSliderPosition < 0) {
                        $(this.rightTooltip).hide();
                        $(this.gRightSlider).hide();
                    } else {
                        $(this.rightTooltip).hide();
                        $(this.gRightSlider).hide();
                        $(this.rightUnSelected).hide();
                    }
                }
            }
                
           this.setopacity = 1;
           if (this.model.enableDeferredUpdate) {
               this._calculateSelectedData();
               this._calculateSliderZoomFactPosition();
               this.previousSelectedRangeStart = this.previousSelectedRangeStart ? this.previousSelectedRangeStart : (type == "datetime") ? this.startDateTime.getTime() : this.startValue;
               this.previousSelectedRangeEnd = this.previousSelectedRangeEnd ? this.previousSelectedRangeEnd : (type == "datetime") ? this.endDateTime.getTime() : this.endValue;
               // checking condition for range event fire
               if (!this._scrollChanged) {
                   if (type == "datetime") {
                       if (this.previousSelectedRangeStart !== selectedRangeStart.getTime() || this.previousSelectedRangeEnd !== selectedRangeEnd.getTime() && !this.rangeResize) {
                           this._trigger("rangeChanged", this.model);
                       }
                   }
                   else {
                       if (this.previousSelectedRangeStart !== selectedRangeStart || this.previousSelectedRangeEnd !== selectedRangeEnd && !this.rangeResize) {
                           this._trigger("rangeChanged", this.model);
                       }
                   }
                   this.previousSelectedRangeStart = (type == "datetime") ? selectedRangeStart.getTime() : selectedRangeStart;
                   this.previousSelectedRangeEnd = (type == "datetime") ? selectedRangeEnd.getTime() : selectedRangeEnd;
               }
				this.rangeResize=false;
            }
        },

        centerSliderWidth: "",
        zoomp: 0,
        zoomf:1,

        setSliderPositions: function (leftValue, centerValue, rightValue) {
            var doubledate, locale = this.model.locale;
            var type = this.model.valueType;
            var cPosition;
            var labelPlacement = this.model.labelSettings.higherLevel.labelPlacement;
            cPosition = labelPlacement == "inside" ? 0 : this.centerPosition;
            var rtlValue, tooltipPrecision, defaultPrecision=6, highestPrecision=20,
                tooltipFormat = this.model.tooltipSettings.labelFormat;
            if (type == 'numeric' && (tooltipFormat.indexOf('e') == 0 || tooltipFormat.indexOf('E') == 0)) {
                tooltipPrecision = tooltipFormat.match(/(\d+)/g);
                tooltipPrecision = tooltipPrecision == null ? defaultPrecision : tooltipPrecision > highestPrecision ? highestPrecision : tooltipPrecision;
            }
            if (leftValue != null && leftValue >= this.padding && leftValue < this.newWidth - this.padding) {
                this.leftSliderPosition = leftValue;
                rtlValue = this.model.enableRTL ? (this.newWidth - leftValue) : leftValue;
                if(type=="datetime"){
                    doubledate = (rtlValue / this.eachInterval) + this.startDateTime.getTime() - (this.padding / this.eachInterval);
					doubledate -= this.endDateTime.getTime() == doubledate ? 0 :(this.model.enableRTL && !this.model.allowNextValue) ? 1 : 0; 
				}
                else{
                    doubledate = (rtlValue / this.eachInterval) + this.startValue - (this.padding / this.eachInterval)
				}
                if (this.model.tooltipSettings.visible && this.svgSupport && this.leftTxt) {
                    this.leftTooltip.setAttribute('opacity', this.setopacity);
                    if(type=="datetime")
                        this.leftTxt.textContent = ej.format(new Date(doubledate), this.model.tooltipSettings.labelFormat, locale);
                    else {
                        if (tooltipFormat.indexOf('e') == 0 || tooltipFormat.indexOf('E') == 0)
                            this.leftTxt.textContent = doubledate.toExponential(tooltipPrecision);
                        else this.leftTxt.textContent = ej.format(doubledate, this.model.tooltipSettings.labelFormat, locale);
                    }
                    var textOffset = ej.EjSvgRender.utils._measureText(this.leftTxt.textContent, null, this.model.tooltipSettings.font);
                    var txtwidth = textOffset.width + 15;
                    var txtheight = textOffset.height;
                    var txty = this.brow!="msie" ? (txtheight + 6) / 2 : (txtheight / 2) + 6;
                    this.leftTxt.setAttribute('y', txty);
                    this.leftd = "M 0 0 L 0 " + (txtheight + 6) + " L " + (txtwidth - 6) + " " + (txtheight + 6) + " L " + (txtwidth - 6) + " 6 L " + txtwidth + " 0 Z";
                    this.rightd = "M 0 0 L " + txtwidth + " 0 L " + txtwidth + " " + (txtheight + 6) + " L 6 " + (txtheight + 6) + " L 6 6 Z";

                    if (leftValue - txtwidth >= 0) {
                        this.leftTooltip.firstChild.setAttribute('d', this.leftd);
                        this.renderer._setAttr($(this.leftTooltip), { 'transform': 'translate(' + (leftValue - txtwidth) + ',' + cPosition + ')' });
                        this.leftTxt.setAttribute('x', 5);
                    }
                    else if (leftValue + txtwidth < this.rightTooltip.getCTM().e) {
                        this.renderer._setAttr($(this.leftTooltip), { 'transform': 'translate(' + (leftValue) + ',' + cPosition + ')' });
                        this.leftTooltip.firstChild.setAttribute('d', this.rightd);
                        this.leftTxt.setAttribute('x', 10);
                    }
                    else if (this.rightTooltip.getCTM().f < 30) {
                        this.renderer._setAttr($(this.leftTooltip), {'transform': 'translate(' + (leftValue) + ',' + (cPosition + 30) + ')'});
                        this.leftTooltip.firstChild.setAttribute('d', this.rightd);
                    }
                    else {
                        this.renderer._setAttr($(this.leftTooltip), {'transform': 'translate(' + (leftValue) + ',' + (cPosition) + ')'});
                        this.leftTooltip.firstChild.setAttribute('d', this.rightd);
                    }
                    if (leftValue > this.newWidth - this.rightTooltip.lastChild.getBBox().width - 15 && this.rightTooltip.getCTM().f < 30) {
                        this.renderer._setAttr($(this.leftTooltip), {'transform': 'translate(' + (leftValue - txtwidth) + ',' + (cPosition + 30) + ')'});
                    }
                    if (this.rightTooltip.getCTM().f >= 30 && leftValue < this.rightTooltip.getCTM().e) {
                        this.renderer._setAttr($(this.rightTooltip), { 'transform': 'translate(' + this.rightTooltip.getCTM().e + ',' + (cPosition) + ')'});
                    }
                }
                if (this.ismouseup == false) {
                    // this.renderer._setAttr($(this.leftUnArea), { 'width': leftValue - this.padding});
                    this.renderer._setAttr($(this.leftUnArea), { 'width': leftValue - this.padding, 'transform': 'translate(' + this.padding + ',' + this.sliderPosition + ')' });
                    if (!this.svgSupport)
                        this.renderer._setAttr($(this.leftSlider), { 'transform': 'translate(' + leftValue + ',' + this.sliderPosition + ')' });
                    else
                        this.renderer._setAttr($(this.leftSlider), { 'transform': 'translate(' + leftValue + ',' + 0 + ')' });
                    if (this.leftCircle != undefined) {
                        if(this.svgSupport)
                            this.renderer._setAttr($(this.leftCircle), { 'cx': leftValue });
                        else
                            this.renderer._setAttr($(this.leftCircle), { 'transform': 'translate(' + parseFloat(leftValue-10) + ',' + parseFloat(this.sliderPosition + (this.sliderHeight / 2)) + ')' }); //this.sliderPosition + (this.sliderHeight / 2)
                        this._leftValue = {
                            'left': leftValue - this.model.navigatorStyleSettings.thumbRadius,
                            'right': leftValue + this.model.navigatorStyleSettings.thumbRadius
                        }
                    }// adding the left position for thumbleft
                    else {
                        var left = leftValue - ($("#" + this._id + "thumbleft").width() / 2);
                        $("#" + this._id + "thumbleft").css("left", left);
                        this._leftValue = {
                            'left': left,
                            'right': left + $("#" + this._id + "thumbleft").width()
                        }
                    }
                    this.renderer._setAttr($(this.centerSlider), {'transform': 'translate(' + parseFloat(leftValue) + ',' + this.sliderPosition + ')'});                   
                    var width = parseFloat(this.rightSlider.getBoundingClientRect().left) - parseFloat(this.leftSlider.getBoundingClientRect().left);
					if(width > 0) this.renderer._setAttr($(this.centerSlider), { 'width': width});
                }
                else {
                    this.ismouseup = false;
                    this.renderer._setAttr($(this.leftUnArea), { 'width': leftValue - this.padding, 'transform': 'translate(' + this.padding + ',' + this.sliderPosition + ')' });
                    if (!this.svgSupport)
                        this.renderer._setAttr($(this.leftSlider), { 'transform': 'translate(' + leftValue + ',' + this.sliderPosition + ')' });
                    else
                        this.renderer._setAttr($(this.leftSlider), { 'transform': 'translate(' + leftValue + ',' + 0 + ')' });
                    if (this.leftCircle != undefined) {
                        if (this.svgSupport)
                            this.renderer._setAttr($(this.leftCircle), { 'cx': leftValue });
                        else
                            this.renderer._setAttr($(this.leftCircle), { 'transform': 'translate(' + parseFloat(leftValue - 10) + ',' + parseFloat(this.sliderPosition + (this.sliderHeight / 2)) + ')' }); //this.sliderPosition + (this.sliderHeight / 2)
                        this._leftValue = {
                            'left': leftValue - this.model.navigatorStyleSettings.thumbRadius,
                            'right': leftValue + this.model.navigatorStyleSettings.thumbRadius
                        }
                    }   // adding the left position for thumbleft
                    else {
                        var left = leftValue - ($("#" + this._id + "thumbleft").width() / 2);
                        $("#" + this._id + "thumbleft").css("left", left);
                        this._leftValue = {
                            'left': left,
                            'right': left + $("#" + this._id + "thumbleft").width()
                        }
                    }
                    this.renderer._setAttr($(this.centerSlider), {'transform': 'translate(' + parseFloat(leftValue) + ',' + this.sliderPosition + ')'});
                    var width = parseFloat(this.rightSlider.getBoundingClientRect().left) - parseFloat(this.leftSlider.getBoundingClientRect().left);
                    if(width > 0) this.renderer._setAttr($(this.centerSlider), { 'width': width});
                }
                this.model.zoomPosition = (leftValue-this.padding) / (this.newWidth-this.padding*2);
                this.model.zoomFactor = (this.rightSlider.getBoundingClientRect().left + parseFloat(this.renderer._getAttrVal($(this.rightSlider), 'width')) - this.leftSlider.getBoundingClientRect().left) / (this.newWidth - this.padding * 2);
               
                if (!this.model.enableRTL) {
                    if (type == "datetime")
                        this.model.selectedRangeSettings.start = new Date(doubledate);
                    else
                        this.model.selectedRangeSettings.start = doubledate;
                } else {
                    if (type == "datetime")
                        this.model.selectedRangeSettings.end = new Date(doubledate);
                    else
                        this.model.selectedRangeSettings.end = doubledate;
                }
				
                $(this.leftTooltip).show();
                $(this.gLeftSlider).show();
                $(this.leftUnSelected).show();
            }
            else if (rightValue != null && rightValue > this.padding) {
                if (rightValue > this.newWidth - this.padding + 1)
                    rightValue = this.newWidth - this.padding;
                this.rightSliderPosition = rightValue;
                var startDateTime = new Date(this.model.rangeSettings.start);
                rtlValue = this.model.enableRTL ? (this.newWidth - rightValue) : rightValue;
                doubledate = (rtlValue / this.eachInterval) + this.startDateTime.getTime() - (this.padding / this.eachInterval);
				doubledate -= this.endDateTime.getTime() == doubledate ? 0 :(!this.model.enableRTL && !this.model.allowNextValue) ? 1 : 0; 
                if(type=="datetime")
                    doubledate = new Date(doubledate);
                    //fixed issue for end value change
                else
                    doubledate = (rtlValue / this.eachInterval) + this.startValue - (this.padding / this.eachInterval);
                if (!this.model.enableRTL)
                    this.model.selectedRangeSettings.end = doubledate;
                else
                    this.model.selectedRangeSettings.start = doubledate;
                if (this.model.tooltipSettings.visible && this.svgSupport && this.rightTxt) {
                    this.rightTooltip.setAttribute('opacity', this.setopacity);
                    if(type=="datetime")
                        this.rightTxt.textContent = ej.format(new Date(doubledate), this.model.tooltipSettings.labelFormat, locale);
                    else {
                        if (tooltipFormat.indexOf('e') == 0 || tooltipFormat.indexOf('E') == 0)
                            this.rightTxt.textContent = doubledate.toExponential(tooltipPrecision);
                        else this.rightTxt.textContent = ej.format(doubledate, this.model.tooltipSettings.labelFormat, locale);
                    }
                    var textOffset = ej.EjSvgRender.utils._measureText(this.rightTxt.textContent, null, this.model.tooltipSettings.font);
                    var txtwidth = textOffset.width + 15;
                    var txtheight = textOffset.height;
                    var txty = this.brow != "msie" ? (txtheight + 6) / 2 : (txtheight / 2) + 6;
                    this.rightTxt.setAttribute('y', txty);
                    this.rightTxt.setAttribute('x', 10);
                    this.leftd = "M 0 0 L 0 " + (txtheight + 6) + " L " + (txtwidth - 6) + " " + (txtheight + 6) + " L " + (txtwidth - 6) + " 6 L " + txtwidth + " 0 Z";
                    this.rightd = "M 0 0 L " + txtwidth + " 0 L " + txtwidth + " " + (txtheight + 6) + " L 6 " + (txtheight + 6) + " L 6 6 Z";
                    if (rightValue + txtwidth <= this.newWidth) {
                        this.rightTooltip.firstChild.setAttribute('d', this.rightd);
                        this.renderer._setAttr($(this.rightTooltip), {'transform': 'translate(' + (rightValue) + ',' + cPosition + ')'});
                    }
                    else if (rightValue + txtwidth >= this.newWidth && rightValue - txtwidth > this.centerSlider.getCTM().e) {
                        this.renderer._setAttr($(this.rightTooltip), {'transform': 'translate(' + (rightValue - txtwidth) + ',' + cPosition + ')'});
                        this.rightTooltip.firstChild.setAttribute('d', this.leftd);
                        this.rightTxt.setAttribute('x', 5);
                    }
                    else if (this.leftTooltip.getCTM().f < 30) {
                        this.renderer._setAttr($(this.rightTooltip), { 'transform': 'translate(' + (rightValue - txtwidth) + ',' + (cPosition + 30) + ')'});
                        this.rightTooltip.firstChild.setAttribute('d', this.leftd);
                    }
                    else {
                        this.renderer._setAttr($(this.rightTooltip), { 'transform': 'translate(' + (rightValue - txtwidth) + ',' + cPosition + ')'});
                        this.rightTooltip.firstChild.setAttribute('d', this.leftd);
                    }
                    if (rightValue < this.leftTooltip.getCTM().e + txtwidth && this.leftTooltip.getCTM().f < 30 && this.leftSliderPosition >= this.padding) {
                        this.renderer._setAttr($(this.rightTooltip), { 'transform': 'translate(' + (rightValue) + ',' + (cPosition + 30) + ')'});
                    }
                    if (this.leftTooltip.getCTM().f >= 30 && rightValue > this.leftTooltip.getCTM().e + txtwidth && this.rightTooltip.getCTM().e > this.leftTooltip.getCTM().e + txtwidth) {
                        this.renderer._setAttr($(this.leftTooltip), { 'transform': 'translate(' + this.leftTooltip.getCTM().e + ',' + (cPosition) + ')' });
                        this.rightTxt.setAttribute('x', 5);
                    }
                }
                    var rightUnAreawidth =  this.newWidth - rightValue-this.padding-2; // To check width on slider change
					rightUnAreawidth = rightUnAreawidth < 0 ? 0 : rightUnAreawidth;
					
                this.renderer._setAttr($(this.rightUnArea), {'width': rightUnAreawidth, 'transform': 'translate(' + parseFloat(rightValue + 2) + ',' + this.sliderPosition + ')' });
                this.renderer._setAttr($(this.rightSlider), { 'transform': 'translate(' + rightValue + ',' + this.sliderPosition + ')'});
                if (this.rightCircle != undefined) {
                    if (this.svgSupport)
                        this.renderer._setAttr($(this.rightCircle), { 'cx': rightValue });
                    else
                        this.renderer._setAttr($(this.rightCircle), { 'transform': 'translate(' + parseFloat(rightValue-10) + ',' + parseFloat(this.sliderPosition + (this.sliderHeight / 2)) + ')' }); //this.sliderPosition + (this.sliderHeight / 2)
                    this._rightValue = {
                        'left': rightValue - this.model.navigatorStyleSettings.thumbRadius,
                        'right': rightValue + this.model.navigatorStyleSettings.thumbRadius
                    }
                }// adding the left position for thumbright
                else {
                    var left = rightValue - ($("#" + this._id + "thumbright").width() / 2);
                    $("#" + this._id + "thumbright").css("left", left);
                    this._rightValue = {
                        'left': left,
                        'right': left + $("#" + this._id + "thumbright").width()
                    }
                }
                this.centerSliderWidth = parseFloat(this.rightSlider.getBoundingClientRect().left) - parseFloat(this.leftSlider.getBoundingClientRect().left);
                this.renderer._setAttr($(this.centerSlider), { 'width': Math.abs(this.centerSliderWidth)});
                
                this.model.zoomFactor = (this.rightSlider.getBoundingClientRect().left + parseFloat(this.renderer._getAttrVal($(this.rightSlider), 'width')) - this.leftSlider.getBoundingClientRect().left) / (this.newWidth - this.padding * 2);
					
                $(this.rightTooltip).show();
                $(this.gRightSlider).show();
                $(this.rightUnSelected).show();
            }
            else if (centerValue != null) {
                var rectwidth = this.renderer._getAttrVal($(this.leftSlider),'width');
				var rangeNavigatorWidth = this.newWidth - this.padding -2;
                var rightPosX = centerValue + parseFloat(this.renderer._getAttrVal($(this.centerSlider),'width'));
				if (rightPosX > rangeNavigatorWidth){
				var	leftPosX = centerValue = rangeNavigatorWidth - parseFloat(this.renderer._getAttrVal($(this.centerSlider),'width'));
					rightPosX = rangeNavigatorWidth;
				} else
					leftPosX = centerValue;		
                var startDateTime = new Date(this.model.rangeSettings.start);
                rtlValue = this.model.enableRTL ? (this.newWidth - leftPosX) : leftPosX;
                if (leftPosX >= this.padding && rightPosX <= this.newWidth - this.padding - 2) {
                    doubledate = (rtlValue / this.eachInterval) + this.startDateTime.getTime() - (this.padding / this.eachInterval);
                if(type=="datetime")
                    doubledate = new Date(doubledate);
                if (!this.model.enableRTL) 
                    this.model.selectedRangeSettings.start = doubledate;
                else
                    this.model.selectedRangeSettings.end = doubledate;

                    if(this.svgSupport)
                        this.renderer._setAttr($(this.leftSlider), { 'transform': 'translate(' + leftPosX + ',' + 0 + ')' });
                    else
                        this.renderer._setAttr($(this.leftSlider), { 'transform': 'translate(' + leftPosX + ',' + parseFloat(this.sliderPosition) + ')' });
                    this.leftSliderPosition = leftPosX;
                    if (this.leftCircle != undefined) {
                        if (this.svgSupport)
                            this.renderer._setAttr($(this.leftCircle), { 'cx': leftPosX });
                        else
                            this.renderer._setAttr($(this.leftCircle), { 'transform': 'translate(' + parseFloat(leftPosX - 10) + ',' + parseFloat(this.sliderPosition + (this.sliderHeight / 2)) + ')' });                        
                        this._leftValue = {
                            'left': leftPosX - this.model.navigatorStyleSettings.thumbRadius,
                            'right': leftPosX + this.model.navigatorStyleSettings.thumbRadius
                        }
                    }
                    else {
                        var left = leftPosX - ($("#" + this._id + "thumbleft").width() / 2);
                        $("#" + this._id + "thumbleft").css("left", left);
                        this._leftValue = {
                            'left': left,
                            'right': left + $("#" + this._id + "thumbleft").width()
                        }
                    }
                    if (this.model.tooltipSettings.visible && this.svgSupport && this.leftTxt) {
                        this.leftTooltip.setAttribute('opacity', this.setopacity);
                        if(type=="datetime")
                            this.leftTxt.textContent = ej.format(new Date(doubledate), this.model.tooltipSettings.labelFormat, locale);
                        else {
                            if (tooltipFormat.indexOf('e') == 0 || tooltipFormat.indexOf('E') == 0)
                                this.leftTxt.textContent = doubledate.toExponential(tooltipPrecision);
                            else this.leftTxt.textContent = ej.format(doubledate, this.model.tooltipSettings.labelFormat, locale);
                        }
                        var txtwidth = this.leftTooltip.lastChild.getBBox().width + 15;
                        var txtheight = this.leftTooltip.lastChild.getBBox().height;
                        var txty = this.brow != "msie" ? (txtheight + 6) / 2 : (txtheight / 2) + 6;
                        this.leftTxt.setAttribute('y', txty);
                        this.rightTxt.setAttribute('y', txty);
                        this.leftd = "M 0 0 L 0 " + (txtheight + 6) + " L " + (txtwidth - 6) + " " + (txtheight + 6) + " L " + (txtwidth - 6) + " 6 L " + txtwidth + " 0 Z";
                        this.rightd = "M 0 0 L " + txtwidth + " 0 L " + txtwidth + " " + (txtheight + 6) + " L 6 " + (txtheight + 6) + " L 6 6 Z";
                        if (leftPosX - txtwidth >= 0) {
                            this.leftTooltip.firstChild.setAttribute('d', this.leftd);
                            this.renderer._setAttr($(this.leftTooltip), { 'transform': 'translate(' + (leftPosX - txtwidth) + ',' + cPosition + ')' });
                            this.leftTxt.setAttribute('x', 5);
                        }
                        else {
                            this.renderer._setAttr($(this.leftTooltip), { 'transform': 'translate(' + (leftPosX) + ',' + cPosition + ')'});
                            this.leftTooltip.firstChild.setAttribute('d', this.rightd);
                            this.leftTxt.setAttribute('x', 10);
                            if (this.leftSliderPosition + txtwidth > this.rightSlider.getCTM().e) {
                                this.renderer._setAttr($(this.leftTooltip), { 'transform': 'translate(' + (leftPosX) + ',' + (cPosition + 30) + ')'});
                            }

                        }
                    }
                    rtlValue = this.model.enableRTL ? (this.newWidth - rightPosX) : rightPosX;
                    var doubledate = (rtlValue / this.eachInterval) + this.startDateTime.getTime() - (this.padding / this.eachInterval);
                    if (type == "datetime")
                        doubledate = new Date(doubledate);
					// fixing issue for end value when using numeric valutype
                    else
                        doubledate = (rtlValue / this.eachInterval) + this.startValue - (this.padding / this.eachInterval);
                    if (!this.model.enableRTL)
                        this.model.selectedRangeSettings.end = doubledate;
                    else
                        this.model.selectedRangeSettings.start = doubledate;
                    this.renderer._setAttr($(this.rightSlider), { 'transform': 'translate(' + rightPosX + ',' + this.sliderPosition + ')' });
                    this.rightSliderPosition = rightPosX;
                    if (this.rightCircle != undefined) {
                        if (this.svgSupport)
                            this.renderer._setAttr($(this.rightCircle), { 'cx': rightPosX });
                        else
                            this.renderer._setAttr($(this.rightCircle), { 'transform': 'translate(' + parseFloat(rightPosX - 10) + ',' + parseFloat(this.sliderPosition + (this.sliderHeight / 2)) + ')' });                        
                        this._rightValue = {
                            'left': rightPosX - this.model.navigatorStyleSettings.thumbRadius,
                            'right': rightPosX + this.model.navigatorStyleSettings.thumbRadius
                        }
                    }
                    else {
                        var left = rightPosX - ($("#" + this._id + "thumbright").width() / 2);
                        $("#" + this._id + "thumbright").css("left", left);
                        this._rightValue = {
                            'left': left,
                            'right': left + $("#" + this._id + "thumbright").width()
                        }
                    }
                    if (this.model.tooltipSettings.visible && this.svgSupport) {
                        this.rightTooltip.setAttribute('opacity', this.setopacity);
                        if(type=="datetime")
                            this.rightTxt.textContent = ej.format(new Date(doubledate), this.model.tooltipSettings.labelFormat, locale);
                        else {
                            if (tooltipFormat.indexOf('e') == 0 || tooltipFormat.indexOf('E') == 0)
                                this.rightTxt.textContent = doubledate.toExponential(tooltipPrecision);
                            else this.rightTxt.textContent = ej.format(doubledate, this.model.tooltipSettings.labelFormat, locale);
                        }
                        var txtwidth = this.rightTooltip.lastChild.getBBox().width + 15;
                        var txtheight = this.rightTooltip.lastChild.getBBox().height;
                        this.leftd = "M 0 0 L 0 " + (txtheight + 6) + " L " + (txtwidth - 6) + " " + (txtheight + 6) + " L " + (txtwidth - 6) + " 6 L " + txtwidth + " 0 Z";
                        this.rightd = "M 0 0 L " + txtwidth + " 0 L " + txtwidth + " " + (txtheight + 6) + " L 6 " + (txtheight + 6) + " L 6 6 Z";
                        if (rightPosX + txtwidth <= this.newWidth) {
                            this.rightTooltip.firstChild.setAttribute('d', this.rightd);
                            this.renderer._setAttr($(this.rightTooltip), { 'transform': 'translate(' + (rightPosX) + ',' + cPosition + ')' });
                            this.rightTxt.setAttribute('x', 10);
                        }
                        else {
                            this.renderer._setAttr($(this.rightTooltip), { 'transform': 'translate(' + (rightPosX - txtwidth) + ',' + cPosition + ')'});
                            this.rightTooltip.firstChild.setAttribute('d', this.leftd);
                            this.rightTxt.setAttribute('x', 5);
                            if (this.rightTooltip.getBoundingClientRect().left < this.leftSlider.getBoundingClientRect().left) {
                                this.renderer._setAttr($(this.rightTooltip), { 'transform': 'translate(' + (rightPosX - txtwidth) + ',' + (cPosition + 30) + ')' });
                            }
                        }
                    }
                    this.renderer._setAttr($(this.leftUnArea), { 'width': leftPosX - this.padding,'transform': 'translate(' + this.padding + ',' + this.sliderPosition + ')'});
                    this.renderer._setAttr($(this.rightUnArea), { 'transform': 'translate(' + parseFloat(rightPosX + 2) + ',' + this.sliderPosition + ')','width': this.newWidth - rightPosX-this.padding-2});

                    this.model.zoomPosition = (this.leftSlider.getBoundingClientRect().left - this.padding) / (this.newWidth - this.padding * 2);

                    this.renderer._setAttr($(this.centerSlider), { 'transform': 'translate(' + centerValue + ',' + this.sliderPosition + ')' });
                    this.model.zoomFactor = (this.rightSlider.getBoundingClientRect().left + parseFloat(this.renderer._getAttrVal($(this.rightSlider), 'width')) - this.leftSlider.getBoundingClientRect().left) / (this.newWidth - this.padding * 2);
                    $(this.leftTooltip).show();
                    $(this.rightTooltip).show();
                    $(this.gRightSlider).show();
                    $(this.rightUnSelected).show();
                    $(this.gLeftSlider).show();
                    $(this.leftUnSelected).show();
                }
               
            }
            if (!this._scrollChanged && !this.isSelection) {
                if ((!this.model.enableDeferredUpdate) && this.leftSlider.getBoundingClientRect().left < this.rightSlider.getBoundingClientRect().left) {
                    this._calculateSelectedData();
                    if (this.zoomp != this.model.zoomPosition || this.zoomf != this.model.zoomFactor) {
                        this._calculateSliderZoomFactPosition();
                        this._trigger("rangeChanged", this.model);
                        this.zoomp = this.model.zoomPosition;
                        this.zoomf = this.model.zoomFactor;
                    }
                }
            }
          
        },
        _calculateSliderZoomFactPosition: function () {
            var model = this.model,
                delta, zoomPos, zoomFact, start, end,
                selectedRange = model.selectedRangeSettings,
                virtualRange = model.scrollRangeSettings;
            if (model.valueType.toLowerCase() == "datetime") {
                start = virtualRange.start ? new Date(virtualRange.start) : this.startDateTime;
                start = start < this.startDateTime ? start: this.startDateTime;
                end = virtualRange.end ? new Date(virtualRange.end) : this.endDateTime;
                end = end > this.endDateTime ? end : this.endDateTime;
                delta = end - start;
                zoomPos = (new Date(selectedRange.start) - start) / delta;
                zoomFact = (new Date(selectedRange.end) - new Date(selectedRange.start)) / delta;
            } else {
                start = virtualRange.start != "" ? parseFloat(virtualRange.start) : this.startValue;
                start = start < this.startValue ? start : this.startValue;
                end = virtualRange.end != "" ? parseFloat(virtualRange.end) : this.endValue;
                end = end > this.endValue ? end : this.endValue;
                delta = end - start;
                zoomPos = (parseFloat(selectedRange.start) - start) / delta;
                zoomFact = (parseFloat(selectedRange.end) - parseFloat(selectedRange.start)) / delta;
            }
             model.zoomPosition = zoomPos;
             model.zoomFactor = zoomFact;            
        },

        _calculateSelectedData: function () {
            var j = [], count=0, currentValue, isDate = this.model.valueType == "datetime", startValue = this.model.selectedRangeSettings.start, endValue = this.model.selectedRangeSettings.end;
            if (isDate) {
                startValue = Date.parse(startValue); endValue = Date.parse(endValue);
            }
            var dataSource = (this.model.dataSource != "") ? this.model.dataSource : ((this.model.series != "" && this.model.series[0].dataSource != "") ? this.model.series[0].dataSource : null);
            if (dataSource != null) {
                for (var i = 0; i < dataSource.length - 1; i++) {
                    currentValue = isDate ? Date.parse(dataSource[i][Object.keys(dataSource[i])[0]]) : dataSource[i][Object.keys(dataSource[i])[0]];
                    if ((startValue <= currentValue) && (currentValue <= endValue)) {
                        j[count] = dataSource[i];
                        count++;
                    }
                }
            }
            this.model.selectedData = j;
        },

        calculateInterval: function (higherLevel, lowerLevel) {
            lowerLevel._intervalType = lowerLevel.intervalType ? lowerLevel.intervalType : "auto";

            if (lowerLevel.visible === true && this.model.valueType == "datetime")
               this.calculateVisibleLabels(lowerLevel, "lower", 0);

            if (higherLevel.visible === true && this.model.valueType == "datetime") {
                if (higherLevel.intervalType && higherLevel.intervalType.toLowerCase() != "auto")
                    higherLevel._intervalType = higherLevel.intervalType;
                else {
                    switch (lowerLevel._intervalType) {
                        case "years":
                            higherLevel._intervalType = "years";
                            break;
                        case "quarters":
                            higherLevel._intervalType = "years";
                            break;
                        case "months":
                            higherLevel._intervalType = "quarters";
                            break;
                        case "weeks":
                            higherLevel._intervalType = "months";
                            break;
                        case "days":
                            higherLevel._intervalType = "weeks";
                            break;
                        case "hours":
                            higherLevel._intervalType = "days";
                            break;
                        case "minutes":
                            higherLevel._intervalType = "hours";
                            break;
                    }
                }

                if (higherLevel.autoInterval == false)
                    this.calculateVisibleLabels(higherLevel, "higher", 0);
                else
                    this.calculateVisibleLabels(higherLevel, "higher", 0);
                
            }

            if (lowerLevel.visible === true && this.model.valueType == "numeric")
                this.setInterval(this);
        },

        calculateVisibleLabels: function (label, labelType, level) {

            var type = label._intervalType;

            switch (type) {
                case "auto":
                    var intervalX = this.calculateDateTimeNiceInterval(this, this.startDateTime, this.endDateTime);
                    var intrvlType = intervalX.intervalType.toLowerCase();                    
                    label._intervalType = intrvlType;
                    label._interval = intervalX.interval;

                    this.calculateVisibleLabels(label, labelType, level)
                    break;
                case "years":
                    this.setYearInterval(this, labelType);
                    break;
                case "quarters":
                    this.setQuarterInterval(this, labelType, level);
                    break;
                case "months":
                    this.setMonthInterval(this, labelType, level);
                    break;
                case "weeks":
                    this.setWeekInterval(this, labelType, level);
                    break;
                case "days":
                    this.setDayInterval(this, labelType, level);
                    break;
                case "hours":
                    this.setHourInterval(this, labelType, level);
                    break;
                case "minutes":
                    this.setMinuteInterval(this, labelType, level);
                    break;
                default:
                    break;
            }
        },

        setInterval: function (naviobj) {
            var currentValue, lastValue, count;
            var delta = this.endValue - this.startValue;
            var rangePadding = naviobj.model.rangePadding;
            var start = this.startValue;
            var numericInterval = this.calculateNumericInterval(naviobj, delta);
            if (rangePadding == "additional") {
                this.endValue = this.endValue + numericInterval;
                this.startValue = this.startValue - numericInterval;
                delta = this.endValue - this.startValue;
              //  numericInterval = this.calculateNumericInterval(naviobj, delta);
            } else if (rangePadding == "normal") {
                var minimum = 0, remaining;
                if (start < 0) {
                    start = 0;
                    minimum = this.startValue + (this.startValue / 20);

                    remaining = numericInterval + (minimum % numericInterval);

                    if ((0.365 * numericInterval) >= remaining) {
                        minimum -= numericInterval;
                    }

                    if (minimum % numericInterval < 0) {
                        minimum = (minimum - numericInterval) - (minimum % numericInterval);
                    }
                } else {
                    minimum = start < ((5.0 / 6.0) * this.endValue)
                        ? 0
                        : (start - (this.endValue - start) / 2);
                    if (minimum % numericInterval > 0) {
                        minimum -= (minimum % numericInterval);
                    }
                }
                var maximum = (this.endValue + (this.endValue - start) / 20);

                remaining = numericInterval - (maximum % numericInterval);

                if ((0.365 * numericInterval) >= remaining) {
                    maximum += numericInterval;
                }

                if (maximum % numericInterval > 0) {
                    maximum = (maximum + numericInterval) - (maximum % numericInterval);
                }
                numericInterval = this.calculateNumericInterval(naviobj, maximum - minimum);
                this.startValue = minimum;
                this.endValue = maximum;

            } else if (rangePadding == "round") {
                this.startValue = Math.floor((this.startValue / numericInterval) * numericInterval);
                this.endValue = Math.ceil((this.endValue / numericInterval) * numericInterval);
            }

            currentValue = naviobj.startValue;
            count = 0;
            while (currentValue <= naviobj.endValue) {
                this._insertNumericText(naviobj,currentValue,count);
                count++;
                currentValue = currentValue + numericInterval;
            }
            this.insertLabels(naviobj, "lower");

        },
        
        calculateDateTimeNiceInterval: function (naviObj, startDate, endDate) {

            var oneDay = 24 * 60 * 60 * 1000;            
            var totalDays = (Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay)));
            var interval = this.calculateNumericInterval(naviObj, totalDays / 365);

            if (interval >= 1) {
                return { interval: interval, intervalType: "Years" };
            }

            interval = this.calculateNumericInterval(naviObj, totalDays / 90);

            if (interval >= 1) {
                return { interval: interval, intervalType: "Quarters" };
            }

            interval = this.calculateNumericInterval(naviObj, totalDays / 30);

            if (interval >= 1) {
                return { interval: interval, interval1: interval, intervalType: "Months" };
            }

            interval = this.calculateNumericInterval(naviObj, totalDays / 7);

            if (interval >= 1) {
                return { interval: interval, intervalType: "Weeks", intervalType1: "Weeks" };
            }

            interval = this.calculateNumericInterval(naviObj, totalDays);

            if (interval >= 1) {
                return { interval: interval, intervalType: "Days" };
            }

            var totalHours = totalDays * 24;
            interval = this.calculateNumericInterval(naviObj, totalHours);

            if (interval >= 1) {
                return { interval: interval, intervalType: "Hours" };
            }

            var totalMinutes = totalDays * 24 * 60;

            interval = this.calculateNumericInterval(naviObj, totalMinutes);

            return { interval: interval, intervalType: "Minutes" };
        },

        calculateNumericInterval: function (naviobj,delta) {
            var desiredIntervalsCount = this.GetDesiredIntervalsCount(naviobj.newWidth);
            var niceInterval = delta / desiredIntervalsCount;
            var minInterval = Math.pow(10, Math.floor(ej.EjSvgRender.utils._logBase(niceInterval, 10)));
            var intervalDivs = [10, 5, 2, 1];

            for (var i = 0; i < intervalDivs.length; i++) {
                var currentInterval = minInterval * intervalDivs[i];
                if (desiredIntervalsCount < (delta / currentInterval)) {
                    return niceInterval;
                }

                niceInterval = currentInterval;
            }

            return niceInterval;
        },

        GetDesiredIntervalsCount: function (size) {
                var desiredIntervalsCount = 0.8* 2;
                desiredIntervalsCount = Math.max((size * (desiredIntervalsCount / 100)), 1);
                return desiredIntervalsCount;
        },

        setHourInterval: function (naviobj, position, level) {

            naviobj._higherTextNode = [];
            naviobj._higherTotalValues = [];
            naviobj._lowerTextNode = [];
            naviobj._lowerTotalValues = [];
            if (position === "higher")
                $("#higherLevel").children().empty();
            else
                $("#lowerLevel").children().empty();

            Date.prototype.addHours = function (hours) {
                var dat = new Date(this.valueOf())
                if (dat.getMilliseconds() !== 0) {
                    dat.setMilliseconds(dat.getMilliseconds() + (1000 - dat.getMilliseconds()));
                }
                if (dat.getSeconds() !== 0) {
                    dat.setSeconds(dat.getSeconds() + (60 - dat.getSeconds()));
                }
                if (dat.getMinutes() !== 0) {                    
                    dat.setMinutes(dat.getMinutes() + (60 - dat.getMinutes()));
                }
                else
                    dat.setHours(dat.getHours() + hours);
                return dat;
            }

            var hourArray = [];
            var currentDate = naviobj.startDateTime;
            var count = 0;
            var txtBlockWidth = 0;
            var bwidth = 0;
            switch (level) {
                case 0:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "hhtt", currentDate, count, bwidth, false);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addHours(1);
                    }
                    if (txtBlockWidth >= naviobj.newWidth)
                        naviobj.setHourInterval(naviobj, position, 1);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 1:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "hht", currentDate, count, bwidth, false);
                        txtBlockWidth += bwidth;
                        count++;                        
                        currentDate = currentDate.addHours(1);
                    }
                    if (txtBlockWidth >= naviobj.newWidth)
                        naviobj.setHourInterval(naviobj, position, 2);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 2:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "hh", currentDate, count, bwidth, false);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addHours(1);
                    }
                    if (txtBlockWidth >= naviobj.newWidth) {
                        //Remove already inserted hours text value from DOM and calculate days interval
                        $(naviobj.lowerLevel).empty();
                        naviobj.model.labelSettings.lowerLevel._intervalType = "days";
                        naviobj.setDayInterval(naviobj, position, 0);
                    }
                    else
                        this.insertLabels(naviobj, position);
                    break;
            }
        },

        setMinuteInterval: function (naviobj, position, level) {

            naviobj._higherTextNode = [];
            naviobj._higherTotalValues = [];
            naviobj._lowerTextNode = [];
            naviobj._lowerTotalValues = [];
            if (position === "higher")
                $("#higherLevel").children().empty();
            else
                $("#lowerLevel").children().empty();

            Date.prototype.addMinutes = function (minutes) {
                var dat = new Date(this.valueOf())
                if (dat.getMilliseconds() !== 0) {
                    dat.setMilliseconds(dat.getMilliseconds() + (1000 - dat.getMilliseconds()));
                }
                if (dat.getSeconds() !== 0) {
                    dat.setSeconds(dat.getSeconds() + (60 - dat.getSeconds()));
                }
                else
                    dat.setMinutes(dat.getMinutes() + minutes);
                return dat;
            }

            var hourArray = [];
            var currentDate = naviobj.startDateTime;
            var count = 0;
            var txtBlockWidth = 0;
            var bwidth = 0;
            switch (level) {
                case 0:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "mm", currentDate, count, bwidth, false);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addMinutes(1);
                    }
                    if (txtBlockWidth >= naviobj.newWidth) {
                        //Remove already inserted minutes text value from DOM and calculate hours interval
                        $(naviobj.lowerLevel).empty();
                        naviobj.model.labelSettings.lowerLevel._intervalType = "hours";
                        naviobj.setHourInterval(naviobj, position, 0);
                    } else
                        this.insertLabels(naviobj, position);
                    break;                
            }
        },
        // Empty the labelbars
        _emptyLabelBars: function (naviobj, position) {
            naviobj._higherTextNode = [];
            naviobj._higherTotalValues = [];
            naviobj._lowerTextNode = [];
            naviobj._lowerTotalValues = [];
            if (position === "higher")
                $("#higherLevel").children().empty();
            else
                $("#lowerLevel").children().empty();
        },

        //to insert week text as there is no globalized format for week
        _insertWeekText: function (naviobj, position, textValue, currentDate, count, bwidth) {
            var hiLabelFont = naviobj.model.labelSettings.higherLevel.style.font;
            var loLabelFont = naviobj.model.labelSettings.lowerLevel.style.font;
            if (position === "higher") {
                if (count == 0)
                    naviobj._higherTotalValues[count] = 0;
                else
                    naviobj._higherTotalValues[count] = currentDate.getTime() - naviobj.startDateTime.getTime();
                var textOptions = {
                    'id': this._rootId + '_higLabelBarText' + '_' + count,
                    'x': 0,
                    'y': 0,
                    'text-anchor': 'start',
                    'dominant-baseline': 'middle',
                    "font-size": hiLabelFont.size,
                    "font-family": hiLabelFont.family,
                    "font-style": hiLabelFont.style,
                    "font-weight": hiLabelFont.weight,
                    "fill": hiLabelFont.color
                };
                naviobj.renderer.drawText(textOptions, textValue, naviobj.higherLevel);
                naviobj._higherTextNode[count] = naviobj.higherLevel.childNodes[count];
                var labelfont = { size: naviobj.model.labelSettings.higherLevel.style.font.size, fontStyle: naviobj.model.labelSettings.higherLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.higherLevel.style.font.fontFamily };
                if (this.svgSupport)
                    var textOffset = ej.EjSvgRender.utils._measureText(naviobj.higherLevel.childNodes[count].textContent, null, labelfont);
                else
                    var textOffset = ej.EjSvgRender.utils._measureText(naviobj.higherLevel.childNodes[count].innerHTML, null, labelfont);
                bwidth = Math.max(bwidth, textOffset.width);
            }
            else {
                if (count == 0)
                    naviobj._lowerTotalValues[count] = 0;
                else
                    naviobj._lowerTotalValues[count] = currentDate.getTime() - naviobj.startDateTime.getTime();
                var textOptions = {
                    'id': this._rootId + '_LabelBarText' + '_' + count,
                    'x': 0,
                    'y': 0,
                    'text-anchor': 'start',
                    'dominant-baseline': 'middle',
                    "font-size": loLabelFont.size,
                    "font-family": loLabelFont.family,
                    "font-style": loLabelFont.style,
                    "font-weight": loLabelFont.weight,
                    "fill": loLabelFont.color
                };

                naviobj.renderer.drawText(textOptions, textValue, naviobj.lowerLevel);
                naviobj._lowerTextNode[count] = naviobj.lowerLevel.childNodes[count];
                var labelfont = { size: naviobj.model.labelSettings.lowerLevel.style.font.size, fontStyle: naviobj.model.labelSettings.lowerLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.lowerLevel.style.font.fontFamily };
                if (this.svgSupport)
                    var textOffset = ej.EjSvgRender.utils._measureText(naviobj.lowerLevel.childNodes[count].textContent, null, labelfont);
                else
                    var textOffset = ej.EjSvgRender.utils._measureText(naviobj.lowerLevel.childNodes[count].innerHTML, null, labelfont);
                bwidth = Math.max(bwidth, textOffset.width);
            }

            return bwidth;
        },

        //To calculate Week Interval
        setWeekInterval: function (naviobj, position, level) {

            this._emptyLabelBars(naviobj, position);
            //get week number of a year
            Date.prototype.getWeek = function () {
                var date = new Date(this.getTime());
                date.setHours(0, 0, 0, 0);
                // Thursday in current week decides the year.
                date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
                // January 4 is always in week 1.
                var week1 = new Date(date.getFullYear(), 0, 4);
                // Adjust to Thursday in week 1 and count number of weeks from date to week1.
                return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                                      - 3 + (week1.getDay() + 6) % 7) / 7);
            }

            Date.prototype.dayOfWeek = function () {
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                return days[this.getDay()];
            }

            Date.prototype.addDays = function (noOfDays) {
                var dat = new Date(this.valueOf());
                dat = new Date(dat.getFullYear(), dat.getMonth(), dat.getDate() + noOfDays);
                return dat;
            }

            Date.prototype.subDays = function (noOfDays) {
                var dat = new Date(this.valueOf());
                dat = new Date(dat.getFullYear(), dat.getMonth(), dat.getDate() - noOfDays);
                return dat;
            }

            var currentDate = naviobj.startDateTime;
            var count = 0;
            var txtBlockWidth = 0;
            var bwidth = 0;
			var culture = this.model.locale;
			var locale = ej.datavisualization.RangeNavigator.Locale[culture] ? ej.datavisualization.RangeNavigator.Locale[culture] : ej.datavisualization.RangeNavigator.Locale["en-US"];

			
			    while (currentDate.dayOfWeek() != "Monday") {
			        currentDate = currentDate.subDays(1);
			    }
            switch (level) {
                case 0:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertWeekText(naviobj, position, this._localizedLabels.intervals.week.longWeeks + currentDate.getWeek() + ej.format(currentDate, " MMMM, yyyy", culture), currentDate, count, bwidth);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addDays(7);
                    }
                    if (txtBlockWidth >= naviobj.newWidth)
                        naviobj.setWeekInterval(naviobj, position, 1);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 1:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertWeekText(naviobj, position, this._localizedLabels.intervals.week.longWeeks + currentDate.getWeek() + ej.format(currentDate, " MMM, yy", culture), currentDate, count, bwidth);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addDays(7);
                    }
                    if (txtBlockWidth >= naviobj.newWidth)
                        naviobj.setWeekInterval(naviobj, position, 2);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 2:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertWeekText(naviobj, position, this._localizedLabels.intervals.week.longWeeks + currentDate.getWeek(), currentDate, count, bwidth);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addDays(7);
                    }
                    if (txtBlockWidth >= naviobj.newWidth)
                        naviobj.setWeekInterval(naviobj, position, 3);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 3:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertWeekText(naviobj, position, this._localizedLabels.intervals.week.shortWeeks + currentDate.getWeek(), currentDate, count, bwidth);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addDays(7);
                    }
                        this.insertLabels(naviobj, position);
                    break;
            }
        },
       
        setDayInterval: function (naviobj, position, level) {
            naviobj._higherTextNode = [];
            naviobj._higherTotalValues = [];
            naviobj._lowerTextNode = [];
            naviobj._lowerTotalValues = []; 
            if (position === "higher")
                $("#higherLevel").children().empty();
            else
                $("#lowerLevel").children().empty();

            Date.prototype.addDays = function () {
                var dat = new Date(this.valueOf());
                dat = new Date(dat.getFullYear(), dat.getMonth(), dat.getDate() + 1);
                return dat;
            }

            var hourArray = [], currentDate = naviobj.startDateTime, count = 0, txtBlockWidth = 0, bwidth = 0, bBox;
            switch (level) {
                case 0:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "dddd, MMMM d, yyyy", currentDate, count, bwidth, false);
                        txtBlockWidth += bwidth;
                        count++;                       
                        currentDate = currentDate.addDays();
                    }
                    if (txtBlockWidth >= naviobj.newWidth)
                        naviobj.setDayInterval(naviobj, position, 1);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 1:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "ddd, MMM d, yy", currentDate, count, bwidth, false);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addDays();                        
                    }
                    if (txtBlockWidth >= naviobj.newWidth)
                        naviobj.setDayInterval(naviobj, position, 2);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 2:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "dddd, d", currentDate, count, bwidth, false);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addDays();                        
                    }
                    if (txtBlockWidth >= naviobj.newWidth)
                        naviobj.setDayInterval(naviobj, position, 3);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 3:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "MMM, d", currentDate, count, bwidth, false);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addDays();
                    }
                    if (txtBlockWidth >= naviobj.newWidth)
                        naviobj.setDayInterval(naviobj, position, 4);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 4:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "dd", currentDate, count, bwidth, false);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addDays();                       
                    }
                    this.insertLabels(naviobj, position);
                    break;
                default:
                    break;

            }

        },

        setMonthInterval: function (naviobj, position, level) {
            naviobj._higherTextNode = [];
            naviobj._higherTotalValues = [];
            naviobj._lowerTextNode = [];
            naviobj._lowerTotalValues = [];
            if (position === "higher")
                $("#higherLevel").children().empty();
            else
                $("#lowerLevel").children().empty();           

            var currentDate = naviobj.startDateTime;            
			var textPadding =5;
            var count = 0;
            var date = new Date(naviobj.startDateTime);
            var txtBlockWidth = 0;
            var bwidth = 0;
            var bBox;

            switch (level) {
                case 0:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "MMMM, yyyy", currentDate, count, bwidth,false);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addMonths();
                    }
                    if (txtBlockWidth + textPadding >= naviobj.newWidth)
                        naviobj.setMonthInterval(naviobj, position, 1);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 1:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "MMMM", currentDate, count, bwidth,false);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addMonths();
                    }
                    if (txtBlockWidth + textPadding >= naviobj.newWidth)
                        naviobj.setMonthInterval(naviobj, position, 2);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 2:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "MMM", currentDate, count, bwidth,false);
                        txtBlockWidth += bwidth;                        
                        count++;
                        currentDate = currentDate.addMonths();
                    }
                    if (txtBlockWidth + textPadding >= naviobj.newWidth)
                        naviobj.setMonthInterval(naviobj, position, 3);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 3:
                    while (currentDate <= naviobj.endDateTime) {
                        bwidth = this._insertText(naviobj, position, "MMM", currentDate, count, bwidth, true);
                        txtBlockWidth += bwidth;
                        count++;
                        currentDate = currentDate.addMonths();
                    }
                    this.insertLabels(naviobj, position);
                    break;
                default:
                    break;

            }

        },

        _quarter: function (naviobj, position, quarterValue, yearString, date, txtBlockWidth, count) {
            var k;
            for (var i = naviobj.startYear; i <= naviobj.endYear; i++) {
                var stringDate = yearString != null ? ej.format(date, yearString, naviobj.model.locale) : "";
                if (i === naviobj.startYear) {
                    for (var j = naviobj.startMonth; j <= 11 && (date <= this.endDateTime); j++) {
                        if (position == "higher") {
                            var textOptions = {
                                'id': this._rootId + '_higLabelBarText' + '_' + count,
                                'x': 0,
                                'y': 0,
                                'text-anchor': 'start',
                                'dominant-baseline': 'middle',
                                "font-size": naviobj.model.labelSettings.higherLevel.style.font.size,
                                "font-family": naviobj.model.labelSettings.higherLevel.style.font.fontFamily,
                                "font-style": naviobj.model.labelSettings.higherLevel.style.font.fontStyle,
                                "font-weight": naviobj.model.labelSettings.higherLevel.style.font.fontWeight,
                                "fill":naviobj.model.labelSettings.higherLevel.style.font.color,
                              "opacity": naviobj.model.labelSettings.higherLevel.style.font.opacity
                            };
                        }
                        else {
                            var textOptions = {
                                'id': this._rootId + '_LabelBarText' + '_' + count,
                                'x': 0,
                                'y': 0,
                                'text-anchor': 'start',
                                'dominant-baseline': 'middle',
                                "font-size": naviobj.model.labelSettings.lowerLevel.style.font.size,
                                "font-family": naviobj.model.labelSettings.lowerLevel.style.font.fontFamily,
                                "font-style": naviobj.model.labelSettings.lowerLevel.style.font.fontStyle,
                                "font-weight": naviobj.model.labelSettings.lowerLevel.style.font.fontWeight,
                                "fill":naviobj.model.labelSettings.lowerLevel.style.font.color,
                                "opacity": naviobj.model.labelSettings.lowerLevel.style.font.opacity
                            };
                        }
                        if (j >= 0 && j <= 2) {
                            if(position=="higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "1 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "1 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(3));
                            k = 2;
                        }
                        else if (j >= 3 && j <= 5) {
                            if (position == "higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "2 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "2 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(6));
                            k = 5;

                        }
                        else if (j >= 6 && j <= 8) {
                            if (position == "higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "3 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "3 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(9));
                            k = 8;

                        }
                        else if (j >= 9 && j <= 11) {
                            if (position == "higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "4 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "4 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(12));
                            k = 11;

                        }


                        if (position === "lower") {
                            if (j === naviobj.startMonth)
                                naviobj._lowerTotalValues[count] = naviobj.startDateTime.getTime() - naviobj.startDateTime.getTime();
                            else
                                naviobj._lowerTotalValues[count] = new Date(naviobj.startYear + "/" + parseInt(j + 1) + "/1").getTime() - naviobj.startDateTime.getTime();
                            j = k;
                            naviobj._lowerTextNode[count] = naviobj.lowerLevel.childNodes[count];
                            var labelfont = { size: naviobj.model.labelSettings.lowerLevel.style.font.size, fontStyle: naviobj.model.labelSettings.lowerLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.lowerLevel.style.font.fontFamily };
                            var textOffset = ej.EjSvgRender.utils._measureText(naviobj.lowerLevel.childNodes[count].textContent, null, labelfont);
                            txtBlockWidth += textOffset.width;
                        }
                        else {
                            if (j === naviobj.startMonth)
                                naviobj._higherTotalValues[count] = naviobj.startDateTime.getTime() - naviobj.startDateTime.getTime();
                            else
                                naviobj._higherTotalValues[count] = new Date(naviobj.startYear + "/" + parseInt(j + 1) + "/1").getTime() - naviobj.startDateTime.getTime();
                            j = k;
                            naviobj._higherTextNode[count] = naviobj.higherLevel.childNodes[count];
                            var labelfont = { size: naviobj.model.labelSettings.higherLevel.style.font.size, fontStyle: naviobj.model.labelSettings.higherLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.higherLevel.style.font.fontFamily };
                            var textOffset = ej.EjSvgRender.utils._measureText(naviobj.higherLevel.childNodes[count].textContent, null, labelfont);
                            txtBlockWidth += textOffset.width;
                        }
                        count++;
                    }
                }
                else if (i === naviobj.endYear) {
                    for (var j = 0; j <= naviobj.endMonth; j++) {
                        if (position == "higher") {
                            var textOptions = {
                                'id': this._rootId + '_higLabelBarText' + '_' + count,
                                'x': 0,
                                'y': 0,
                                'text-anchor': 'start',
                                'dominant-baseline': 'middle',
                                "font-size": naviobj.model.labelSettings.higherLevel.style.font.size,
                                "font-family": naviobj.model.labelSettings.higherLevel.style.font.fontFamily,
                                "font-style": naviobj.model.labelSettings.higherLevel.style.font.fontStyle,
                                "font-weight": naviobj.model.labelSettings.higherLevel.style.font.fontWeight,
                                "fill": naviobj.model.labelSettings.higherLevel.style.font.color,
                                "opacity": naviobj.model.labelSettings.higherLevel.style.font.opacity
                            };
                        }
                        else {
                            var textOptions = {
                                'id': this._rootId + '_LabelBarText' + '_' + count,
                                'x': 0,
                                'y': 0,
                                'text-anchor': 'start',
                                'dominant-baseline': 'middle',
                                "font-size": naviobj.model.labelSettings.lowerLevel.style.font.size,
                                "font-family": naviobj.model.labelSettings.lowerLevel.style.font.fontFamily,
                                "font-style": naviobj.model.labelSettings.lowerLevel.style.font.fontStyle,
                                "font-weight": naviobj.model.labelSettings.lowerLevel.style.font.fontWeight,
                                "fill": naviobj.model.labelSettings.lowerLevel.style.font.color,
                                "opacity": naviobj.model.labelSettings.lowerLevel.style.font.opacity
                            };
                        }
                        if (j >= 0 && j <= 2) {
                            if (position == "higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "1 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "1 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(3));
                            k = 2;
                        }
                        else if (j >= 3 && j <= 5) {
                            if (position == "higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "2 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "2 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(6));
                            k = 5;

                        }
                        else if (j >= 6 && j <= 8) {
                            if (position == "higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "3 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "3 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(9));
                            k = 8;

                        }
                        else if (j >= 9 && j <= 11) {
                            if (position == "higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "4 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "4 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(12));
                            k = 11;
                        }


                        if (position === "lower") {
                            naviobj._lowerTotalValues[count] = new Date(naviobj.endYear + "/" + parseInt(j + 1) + "/1").getTime() - naviobj.startDateTime.getTime();                            
                            j = k;
                            naviobj._lowerTextNode[count] = naviobj.lowerLevel.childNodes[count];
                            var labelfont = { size: naviobj.model.labelSettings.lowerLevel.style.font.size, fontStyle: naviobj.model.labelSettings.lowerLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.lowerLevel.style.font.fontFamily };
                            var textOffset = ej.EjSvgRender.utils._measureText(naviobj.lowerLevel.childNodes[count].textContent, null, labelfont);
                            txtBlockWidth += textOffset.width;
                        }
                        else {
                            naviobj._higherTotalValues[count] = new Date(naviobj.endYear + "/" + parseInt(j + 1) + "/1").getTime() - naviobj.startDateTime.getTime();
                            j = k;
                            naviobj._higherTextNode[count] = naviobj.higherLevel.childNodes[count];
                            var labelfont = { size: naviobj.model.labelSettings.higherLevel.style.font.size, fontStyle: naviobj.model.labelSettings.higherLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.higherLevel.style.font.fontFamily };
                            var textOffset = ej.EjSvgRender.utils._measureText(naviobj.higherLevel.childNodes[count].textContent, null, labelfont);
                            txtBlockWidth += textOffset.width;
                        }
                        count++;
                    }
                }
                else {
                    for (var j = 0; j <= 11; j++) {
                        if (position == "higher") {
                            var textOptions = {
                                'id': this._rootId + '_higLabelBarText' + '_' + count,
                                'x': 0,
                                'y': 0,
                                'text-anchor': 'start',
                                'dominant-baseline': 'middle',
                                "font-size": naviobj.model.labelSettings.higherLevel.style.font.size,
                                "font-family": naviobj.model.labelSettings.higherLevel.style.font.fontFamily,
                                "font-style": naviobj.model.labelSettings.higherLevel.style.font.fontStyle,
                                "font-weight": naviobj.model.labelSettings.higherLevel.style.font.fontWeight
                            };
                        }
                        else {
                            var textOptions = {
                                'id': this._rootId + '_LabelBarText' + '_' + count,
                                'x': 0,
                                'y': 0,
                                'text-anchor': 'start',
                                'dominant-baseline': 'middle',
                                "font-size": naviobj.model.labelSettings.lowerLevel.style.font.size,
                                "font-family": naviobj.model.labelSettings.lowerLevel.style.font.fontFamily,
                                "font-style": naviobj.model.labelSettings.lowerLevel.style.font.fontStyle,
                                "font-weight": naviobj.model.labelSettings.lowerLevel.style.font.fontWeight
                            };
                        }
                        if (j >= 0 && j <= 2) {
                            if (position == "higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "1 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "1 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(3));
                            k = 2;
                        }
                        else if (j >= 3 && j <= 5) {
                            if (position == "higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "2 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "2 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(6));
                            k = 5;

                        }
                        else if (j >= 6 && j <= 8) {
                            if (position == "higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "3 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "3 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(9));
                            k = 8;

                        }
                        else if (j >= 9 && j <= 11) {
                            if (position == "higher")
                                naviobj.renderer.drawText(textOptions, quarterValue + "4 " + stringDate, naviobj.higherLevel);
                            else
                                naviobj.renderer.drawText(textOptions, quarterValue + "4 " + stringDate, naviobj.lowerLevel);
                            date = new Date(date.setMonth(12));
                            k = 11;

                        }


                        if (position === "lower") {
                            naviobj._lowerTotalValues[count] = new Date(i + "/" + parseInt(j + 1) + "/1").getTime() - naviobj.startDateTime.getTime();
                            j = k;
                            naviobj._lowerTextNode[count] = naviobj.lowerLevel.childNodes[count];
                            var labelfont = { size: naviobj.model.labelSettings.lowerLevel.style.font.size, fontStyle: naviobj.model.labelSettings.lowerLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.lowerLevel.style.font.fontFamily };
                            var textOffset = ej.EjSvgRender.utils._measureText(naviobj.lowerLevel.childNodes[count].textContent, null, labelfont);
                            txtBlockWidth += textOffset.width;
                        }
                        else {
                            naviobj._higherTotalValues[count] = new Date(i + "/" + parseInt(j + 1) + "/1").getTime() - naviobj.startDateTime.getTime();
                            j = k;
                            naviobj._higherTextNode[count] = naviobj.higherLevel.childNodes[count];
                            var labelfont = { size: naviobj.model.labelSettings.higherLevel.style.font.size, fontStyle: naviobj.model.labelSettings.higherLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.higherLevel.style.font.fontFamily };
                            var textOffset = ej.EjSvgRender.utils._measureText(naviobj.higherLevel.childNodes[count].textContent, null, labelfont);
                            txtBlockWidth += textOffset.width;
                        }
                        count++;
                    }
                }

            }
            return txtBlockWidth;
        },

        setQuarterInterval: function (naviobj, position, level) {
            naviobj._higherTextNode = [];
            naviobj._higherTotalValues = [];
            naviobj._lowerTextNode = [];
            naviobj._lowerTotalValues = [];
            if (position === "higher")
                $("#higherLevel").children().empty();
            else
                $("#lowerLevel").children().empty();
            var date = new Date(naviobj.startDateTime);
            var count = 0;
            var k = 0;
            var txtBlockWidth = 0;
			var culture = this.model.locale;
			var locale = ej.datavisualization.RangeNavigator.Locale[culture] ? ej.datavisualization.RangeNavigator.Locale[culture]:
                                                                               ej.datavisualization.RangeNavigator.Locale["en-US"];
            switch (level) {
                case 0:
                    txtBlockWidth = this._quarter(naviobj, position, this._localizedLabels.intervals.quarter.longQuarters, "yyyy", date, txtBlockWidth, count);
                    if (txtBlockWidth >= (naviobj.newWidth - this.padding))
                        naviobj.setQuarterInterval(naviobj, position, 1);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 1:
                    txtBlockWidth = this._quarter(naviobj, position, this._localizedLabels.intervals.quarter.longQuarters, "yy", date, txtBlockWidth, count);
                    if (txtBlockWidth >= (naviobj.newWidth - this.padding))
                        naviobj.setQuarterInterval(naviobj, position, 2);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 2:
                    txtBlockWidth = this._quarter(naviobj, position, this._localizedLabels.intervals.quarter.shortQuarters, "yyyy", date, txtBlockWidth, count);
                    if (txtBlockWidth >= (naviobj.newWidth - this.padding))
                        naviobj.setQuarterInterval(naviobj, position, 3);
                    else
                        this.insertLabels(naviobj, position);
                    break;
                case 3:
                    txtBlockWidth = this._quarter(naviobj, position, this._localizedLabels.intervals.quarter.shortQuarters, null, date, txtBlockWidth, count);
                    this.insertLabels(naviobj, position);
                    break;
                default:
                    break;
            }
        },

        _insertText: function (naviobj, position, txtValue, currentDate, count, bwidth, setsubstring) {
            var locale = naviobj.model.locale;
            Date.prototype.addYears = function (years) {
                var dat = new Date(this.valueOf())
                if (dat.getMilliseconds() !== 0 || dat.getSeconds() !== 0
                 || dat.getMinutes() !== 0 || dat.getHours() !== 0 || dat.getDate() !== 0
                 || dat.getMonth() !== 0) {
                    dat = new Date(dat.getFullYear() + 1, 0, 1);
                }
                else
                    dat.setYear(dat.getFullYear() + years);
                return dat;
            }

            Date.prototype.addMonths = function () {
                var dat = new Date(this.valueOf())
                dat = new Date(dat.getFullYear(), dat.getMonth() + 1, 1);
                return dat;
            }

            if (position === "higher") {
                naviobj._higherTotalValues[count] = currentDate.getTime() - naviobj.startDateTime.getTime();
                var textOptions = {
                    'id': this._rootId + '_higLabelBarText' + '_' + count,
                    'x': 0,
                    'y': 0,
                    'text-anchor': 'start',
                    'dominant-baseline': 'middle',
                    "font-size": naviobj.model.labelSettings.higherLevel.style.font.size,
                    "font-family": naviobj.model.labelSettings.higherLevel.style.font.fontFamily,
                    "font-style": naviobj.model.labelSettings.higherLevel.style.font.fontStyle,
                    "font-weight": naviobj.model.labelSettings.higherLevel.style.font.fontWeight,
                    "fill":naviobj.model.labelSettings.higherLevel.style.font.color
                };
                if(setsubstring==false)
                    naviobj.renderer.drawText(textOptions, ej.format(currentDate, txtValue, locale), naviobj.higherLevel);
                else
                    naviobj.renderer.drawText(textOptions, ej.format(currentDate, txtValue, locale).toString().substring(0, 1), naviobj.higherLevel);
                naviobj._higherTextNode[count] = naviobj.higherLevel.childNodes[count];
                var labelfont = { size: naviobj.model.labelSettings.higherLevel.style.font.size, fontStyle: naviobj.model.labelSettings.higherLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.higherLevel.style.font.fontFamily };
                if(this.svgSupport)
                    var textOffset = ej.EjSvgRender.utils._measureText(naviobj.higherLevel.childNodes[count].textContent, null, labelfont);
                else
                    var textOffset = ej.EjSvgRender.utils._measureText(naviobj.higherLevel.childNodes[count].innerHTML, null, labelfont);
                bwidth = Math.max(bwidth, textOffset.width);
            }
            else {
                naviobj._lowerTotalValues[count] = currentDate.getTime() - naviobj.startDateTime.getTime();
                var textOptions = {
                    'id': this._rootId + '_LabelBarText' + '_' + count,
                    'x': 0,
                    'y': 0,
                    'text-anchor': 'start',
                    'dominant-baseline': 'middle',
                    "font-size": naviobj.model.labelSettings.lowerLevel.style.font.size,
                    "font-family": naviobj.model.labelSettings.lowerLevel.style.font.fontFamily,
                    "font-style": naviobj.model.labelSettings.lowerLevel.style.font.fontStyle,
                    "font-weight": naviobj.model.labelSettings.lowerLevel.style.font.fontWeight,
                    "fill":naviobj.model.labelSettings.lowerLevel.style.font.color
                };
                if(setsubstring==false)
                    naviobj.renderer.drawText(textOptions, ej.format(currentDate, txtValue, locale), naviobj.lowerLevel);
                else
                    naviobj.renderer.drawText(textOptions, ej.format(currentDate, txtValue, locale).substring(0, 1), naviobj.lowerLevel);
                naviobj._lowerTextNode[count] = naviobj.lowerLevel.childNodes[count];
                var labelfont = { size: naviobj.model.labelSettings.lowerLevel.style.font.size, fontStyle: naviobj.model.labelSettings.lowerLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.lowerLevel.style.font.fontFamily };
                if(this.svgSupport)
                    var textOffset = ej.EjSvgRender.utils._measureText(naviobj.lowerLevel.childNodes[count].textContent, null, labelfont);
                else
                    var textOffset = ej.EjSvgRender.utils._measureText(naviobj.lowerLevel.childNodes[count].innerHTML, null, labelfont);
                bwidth = Math.max(bwidth, textOffset.width);
            }
            return bwidth;
        },

        _insertNumericText: function (naviobj,currentValue,count) {
            naviobj._lowerTotalValues[count] = currentValue - naviobj.startValue;
            var font = naviobj.model.labelSettings.style.font;
            var textOptions = {
                'id': this._rootId + '_LabelBarText' + '_' + count,
                'x': 0,
                'y': 0,
                'text-anchor': 'start',
                'dominant-baseline': 'middle',
                "font-size": font.size,
                "font-family": font.family,
                "font-style": font.style,
                "font-weight": font.weight,
                "fill": font.color
            };
                naviobj.renderer.drawText(textOptions, currentValue, naviobj.lowerLevel);
            naviobj._lowerTextNode[count] = naviobj.lowerLevel.childNodes[count];
            var labelfont = { size: naviobj.model.labelSettings.lowerLevel.style.font.size, fontStyle: naviobj.model.labelSettings.lowerLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.lowerLevel.style.font.fontFamily };
            var textOffset;
            if(this.svgSupport) {
                textOffset = ej.EjSvgRender.utils._measureText(naviobj.lowerLevel.childNodes[count].textContent, null, labelfont);
            } else {
                textOffset = ej.EjSvgRender.utils._measureText(naviobj.lowerLevel.childNodes[count].innerHTML, null, labelfont);
            } 
        },

        setYearInterval: function (naviobj, position) {
            var currentDate = naviobj.startDateTime,
            count=0;
            while (currentDate <= naviobj.endDateTime) {
                this._insertText(naviobj, position, "yyyy", currentDate,count,0,false);                   
                count++;
                currentDate = currentDate.addYears(1);
            }            
            this.insertLabels(naviobj, position);
        },

        _applyPadding:function(){
            var i;
            for (i = 0; i < this._higherTotalValues.length; i++) {
                this._higherTotalValues[i] += this.padding;
            }
            for (i = 0; i < this._lowerTotalValues.length; i++) {
                this._lowerTotalValues[i] += this.padding;
            }
        },
		isIntersect: function (naviobj, textNode, i, labelfont, txtWidth, isrtl) {
			if(isrtl && i == 0){
				var currentX = parseFloat(naviobj.renderer._getAttrVal(textNode[i],"x"));
				var txtWidth = ej.EjSvgRender.utils._measureText(textNode[i].innerHTML, null, labelfont);
				if(currentX + txtWidth.width > naviobj.newWidth)
					textNode[i].innerHTML = '';
			}
			else{
				var j = textNode.length - 1;
				for(isrtl ? j > 1: j=1; isrtl ? j> i: j<i; isrtl? j--:j++){	
					var prevX = parseFloat(naviobj.renderer._getAttrVal(textNode[j],"x"));
					var prevXTextWidth = ej.EjSvgRender.utils._measureText(textNode[j].innerHTML, null, labelfont);
					var currentX = parseFloat(naviobj.renderer._getAttrVal(textNode[i],"x"));
					var width = (prevXTextWidth.width == 0) ? prevXTextWidth.width : txtWidth;
					var value = prevX + (prevXTextWidth.width);
					if(value > currentX)
						textNode[i].innerHTML = '';
				}
			}
		},

        insertLabels: function (naviobj, level) {
            // this._applyPadding();
            var matched = jQuery.uaMatch(navigator.userAgent);
            var lowgridColor = this.model.labelSettings.lowerLevel.gridLineStyle.color;
            this.lgClr = this.renderer.createGradientElement('lgColor', lowgridColor, 150, 0, 150, 100, this.svgDocument);
            var type = this.model.valueType;
            var wholeSize = parseFloat(this.renderer._getAttrVal($(naviobj.svgDocument), 'width'));
            if (type == "datetime")
                this.eachInterval = (wholeSize - this.padding * 2) / parseFloat(this.endDateTime.getTime() - this.startDateTime.getTime());
            else
                this.eachInterval = (wholeSize - this.padding * 2) / parseFloat(this.endValue - this.startValue);
            var count = 0, labelcount = 0, txtwidth = 0, rectoptions, lineleft, newleft,
                textOffset, labelfont, i, highLength = naviobj._higherTextNode.length,
                lowerLevelLabels = [],
            higherLevelLabels = [];
                var offset = 0;
            if (level === "higher" && naviobj.model.labelSettings.higherLevel.visible===true) {

                if (naviobj.model.labelSettings.higherLevel.position == "top" && naviobj.model.labelSettings.lowerLevel.position == "top") {
                    rectoptions = {
                        x: this.padding,
                        y: 1,
                        width: naviobj.newWidth > 0 ? (naviobj.newWidth - naviobj.padding * 2) : 0,
                        height: naviobj.minHighHeight,
                        'stroke': naviobj.model.labelSettings.higherLevel.border.color,
                        'stroke-width': naviobj.model.labelSettings.higherLevel.border.width,
                        fill: 'transparent'

                    };
                    naviobj.renderer.drawRect(rectoptions, naviobj.higherLevel);
                }
                else if (naviobj.model.labelSettings.higherLevel.position == "top") {
                    rectoptions = {
                        x: this.padding,
                        y: 1,
                        width: naviobj.newWidth - naviobj.padding * 2,
                        height: naviobj.minHighHeight,
                        'stroke': naviobj.model.labelSettings.higherLevel.border.color,
                        'stroke-width': naviobj.model.labelSettings.higherLevel.border.width,
                        fill: 'transparent'

                    };
                    naviobj.renderer.drawRect(rectoptions, naviobj.higherLevel);
                }
                else {
                    rectoptions = {
                        x: this.padding,
                        y: naviobj.bottomPosition,
                        width: naviobj.newWidth > 0 ? (naviobj.newWidth - naviobj.padding * 2) : 0,
                        height: naviobj.minHighHeight,
                        'stroke': naviobj.model.labelSettings.higherLevel.border.color,
                        'stroke-width': naviobj.model.labelSettings.higherLevel.border.width,
                        fill: 'transparent'

                    };
                    naviobj.renderer.drawRect(rectoptions, naviobj.higherLevel);
                }

                naviobj._higherLineLeft = [];

                if (!naviobj.model.enableRTL) {
                    lineleft = (naviobj._higherTotalValues[count] * this.eachInterval) + this.padding;
                } else {
                    lineleft = naviobj.newWidth - ((naviobj._higherTotalValues[naviobj._higherTextNode.length - 1] * this.eachInterval) + this.padding);
                }
                var isrtl;
                if (naviobj.model.enableRTL) {
                    i = naviobj._higherTextNode.length - 1;
                    isrtl = true;
                }
                else {
                    i = 0;
                    isrtl = false;
                }
                var setLeft = 0;

                for (; isrtl ? i >= 0 : i < naviobj._higherTextNode.length; isrtl?i--:i++) {
                    naviobj._higherLineLeft[i] = lineleft;
                    //  var txt =  naviobj._higherTextNode[i].getBBox();
                    labelfont = { size: naviobj.model.labelSettings.higherLevel.style.font.size, fontStyle: naviobj.model.labelSettings.higherLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.higherLevel.style.font.fontFamily };
                    textOffset = ej.EjSvgRender.utils._measureText(naviobj.higherLevel.childNodes[count].textContent, null, labelfont);
                    txtwidth = textOffset.width;
                    newleft = naviobj._higherTotalValues[i + 1] === undefined
                        ? isrtl ? 0 : naviobj.newWidth :
                        isrtl?naviobj.newWidth-((naviobj._higherTotalValues[i + 1] * this.eachInterval + this.padding)):
                        (naviobj._higherTotalValues[i + 1] * this.eachInterval + this.padding);
                    if (naviobj.model.labelSettings.higherLevel.style.horizontalAlignment === "middle") {
                        setleft = isrtl ? newleft - (newleft - lineleft) / 2 - txtwidth / 2: (newleft - lineleft) / 2 + lineleft - txtwidth / 2;
                    }
                    else if (naviobj.model.labelSettings.higherLevel.style.horizontalAlignment === "left") {
                        setleft = isrtl ? newleft + 10 : lineleft + 10;
                    }
                    else
                        setleft = isrtl ? lineleft - txtwidth - 2 : newleft - txtwidth - 2;
                    if (this.model.enableScrollbar) {
                        //rmove overlapped labels on higherlevel text
                        if ((!isrtl && i == 0) || (isrtl && highLength == i))
                            this.firstLabelPosition = setleft + txtwidth;
                        if (((!isrtl && i == 1) || (isrtl && highLength - 1 == i)) && this.firstLabelPosition > lineleft)
                            naviobj._higherTextNode[isrtl ? i + 1 : i - 1].textContent = "";
                    }
                    naviobj.renderer._setAttr($(naviobj._higherTextNode[i]), { 'x': setleft });
                    naviobj.renderer._setAttr($(naviobj._higherTextNode[i]), { 'fill': naviobj.model.labelSettings.higherLevel.style.font.color });
                    naviobj._higherTextLeft[i] = setleft;
					if(this.model.labelSettings.higherLevel.labelIntersectAction != "none")
						this.isIntersect(naviobj, naviobj._higherTextNode, i, labelfont, txtwidth, isrtl);
                    
                    if (naviobj.model.labelSettings.higherLevel.position == "top" && naviobj.model.labelSettings.lowerLevel.position == "top") {
                        naviobj._higherTextNode[i].setAttribute("y", naviobj.minHighHeight - 5);
                        rectoptions = {
                            x1: lineleft,
                            y1: '0',
                            x2: lineleft,
                            y2: naviobj.centerPosition,
                            'stroke': naviobj.model.labelSettings.higherLevel.gridLineStyle.color,
                            'stroke-width': naviobj.model.labelSettings.higherLevel.gridLineStyle.width,
                            'stroke-dasharray': naviobj.model.labelSettings.higherLevel.gridLineStyle.dashArray,

                        };
                        if (i != 0)
                        naviobj.renderer.drawLine(rectoptions, naviobj.higherLevel);
                    }
                    else if (naviobj.model.labelSettings.higherLevel.position == "top") {
                        if (this.svgSupport) {
                            if(matched.browser.toLowerCase() == "msie")
                                naviobj._higherTextNode[i].setAttribute("y", naviobj.centerPosition - 5);
                            else
                                naviobj._higherTextNode[i].setAttribute("y", naviobj.centerPosition - 9);
                        }
                        else
                            naviobj.renderer._setAttr($(naviobj._higherTextNode[i]), { 'y': (naviobj.centerPosition / 2) - 5 });
                        rectoptions = {
                            x1: lineleft,
                            y1: '0',
                            x2: lineleft,
                            y2: naviobj.centerPosition,
                            'stroke': naviobj.model.labelSettings.higherLevel.gridLineStyle.color,
                            'stroke-width': naviobj.model.labelSettings.higherLevel.gridLineStyle.width,
                            'stroke-dasharray':naviobj.model.labelSettings.higherLevel.gridLineStyle.dashArray,

                        };
                        if (i != 0)
                        naviobj.renderer.drawLine(rectoptions, naviobj.higherLevel);
                    }
                    else {
                        naviobj._higherTextNode[i].setAttribute("y", naviobj.newHeight - 5);
                        rectoptions = {
                            x1: lineleft,
                            y1: this.bottomPosition,
                            x2: lineleft,
                            y2: naviobj.newHeight,
                            'stroke': naviobj.model.labelSettings.higherLevel.gridLineStyle.color,
                            'stroke-width': naviobj.model.labelSettings.higherLevel.gridLineStyle.width,
                            'stroke-dasharray': naviobj.model.labelSettings.higherLevel.gridLineStyle.dashArray,

                        };
                        if (i != 0)
                        naviobj.renderer.drawLine(rectoptions, naviobj.higherLevel);
                    }
                    if ((setleft < this.padding || naviobj.newWidth - lineleft - this.padding < txtwidth) && type == "datetime") {
                        if (isrtl) {
                            if (setleft < this.padding && lineleft - this.padding > txtwidth) {
                                if (naviobj.model.labelSettings.higherLevel.style.horizontalAlignment === "middle")
                                    naviobj._higherTextNode[i].setAttribute("x", this.padding + (lineleft - this.padding) / 2 - txtwidth / 2);
                                else if (naviobj.model.labelSettings.higherLevel.style.horizontalAlignment === "left")
                                    naviobj._higherTextNode[i].setAttribute("x", this.padding + 10);
                                else
                                    naviobj._higherTextNode[i].setAttribute("x", lineleft - txtwidth - 2);
                            }
                            else if (naviobj.newWidth - lineleft < txtwidth && naviobj.newWidth - newleft - this.padding > txtwidth) {
                                if (naviobj.model.labelSettings.higherLevel.style.horizontalAlignment === "middle")
                                    naviobj._higherTextNode[i].setAttribute("x", newleft + (naviobj.newWidth - newleft - this.padding) / 2 - txtwidth / 2);
                                else if (naviobj.model.labelSettings.higherLevel.style.horizontalAlignment === "left")
                                    naviobj._higherTextNode[i].setAttribute("x", newleft + 10);
                                else
                                    naviobj._higherTextNode[i].setAttribute("x", naviobj.newWidth - txtwidth - 2 - this.padding);
                            }
                            else
                                naviobj.higherLevel.removeChild(naviobj._higherTextNode[i]);
                        }
                        else {
                            naviobj.higherLevel.removeChild(naviobj._higherTextNode[i]);
                            continue;
                        }
                    }
                    else if (setleft + txtwidth > naviobj.newWidth - this.padding && type == "datetime") {
                        if (naviobj.model.labelSettings.higherLevel.style.horizontalAlignment === "middle")
                            setleft = lineleft + (naviobj.newWidth - lineleft - this.padding) / 2 - txtwidth / 2;
                        else if (naviobj.model.labelSettings.higherLevel.style.horizontalAlignment === "left")
                            setleft = lineleft;
                        else
                            setleft = naviobj.newWidth - txtwidth * 3/2;
                        naviobj._higherTextNode[i].setAttribute("x", setleft);
                        continue;
                    }
                    if (!this.model.enableRTL) {
                        lineleft = naviobj._higherTotalValues[i + 1] * this.eachInterval + this.padding;
                    } else {
                        lineleft= naviobj.newWidth - (naviobj._higherTotalValues[i -1] * this.eachInterval + this.padding);
                    }
                    count++;
                }
               
                //Calculate hihger level label regions
               for (var k = 0, len=naviobj._higherLineLeft.length; k < len; k++) {
                   textOffset = ej.EjSvgRender.utils._measureText(naviobj.higherLevel.childNodes[k].textContent, null, labelfont);
				   if(textOffset.width != 0 || textOffset.height != 0){
						if (this.svgSupport)
							higherLevelLabels.push({ size: textOffset, x: naviobj._higherLineLeft[k], y: naviobj._higherTextNode[k].getAttribute("y") - textOffset.height / 2 + offset, lableType: "higherLevel" });
						else
							higherLevelLabels.push({ size: textOffset, x: naviobj._higherLineLeft[k], y: naviobj._higherTextNode[k].offsetTop - textOffset.height / 2 + offset, lableType: "higherLevel" });
				   }
               }
               this._addLabelsRegion(naviobj, higherLevelLabels);
                 
            }
            else if (naviobj.model.labelSettings.lowerLevel.visible === true) {

                naviobj._lowerLineLeft = [];
                if (!naviobj.model.enableRTL) {
                    lineleft = (naviobj._lowerTotalValues[count] * this.eachInterval) + this.padding;
                } else {
                    lineleft = naviobj.newWidth - ((naviobj._lowerTotalValues[naviobj._lowerTextNode.length - 1] * this.eachInterval) + this.padding);
                }
                var hy = naviobj.model.labelSettings.higherLevel.visible ? naviobj.bottomPosition : naviobj.centerHeight;

                if (naviobj.model.labelSettings.lowerLevel.position === "bottom" && naviobj.model.labelSettings.higherLevel.position === "top") {
                    rectoptions = {
                        x: this.padding,
                        y: hy,
                        width: this.newWidth - naviobj.padding * 2,
                        height: naviobj.minLowHeight - 1,
                        'stroke': naviobj.model.labelSettings.lowerLevel.border.color,
                        'stroke-width': naviobj.model.labelSettings.lowerLevel.border.width,
                        fill: 'transparent'
                    };
                    if (type != "numeric")
                        naviobj.renderer.drawRect(rectoptions, naviobj.lowerLevel);
                }
                else if (naviobj.model.labelSettings.lowerLevel.position === "bottom" && naviobj.model.labelSettings.higherLevel.position === "bottom") {
                    rectoptions = {
                        x: this.padding,
                        y: naviobj.centerHeight,
                        width: this.newWidth > 0 ? (this.newWidth - naviobj.padding * 2) : 0,
                        height: naviobj.minLowHeight - 1,
                        'stroke': naviobj.model.labelSettings.lowerLevel.border.color,
                        'stroke-width': naviobj.model.labelSettings.lowerLevel.border.width,
                        fill: 'transparent'
                    };
                    naviobj.renderer.drawRect(rectoptions, naviobj.lowerLevel);
                }
                else if (naviobj.model.labelSettings.lowerLevel.position === "top" && naviobj.model.labelSettings.higherLevel.position === "bottom") {
                    rectoptions = {
                        x: this.padding,
                        y: 0,
                        width: this.newWidth > 0 ? (this.newWidth - naviobj.padding * 2) : 0,
                        height: naviobj.minLowHeight - 1,
                        'stroke': naviobj.model.labelSettings.lowerLevel.border.color,
                        'stroke-width': naviobj.model.labelSettings.lowerLevel.border.width,
                        fill: 'transparent'
                    };
                    naviobj.renderer.drawRect(rectoptions, naviobj.lowerLevel);
                }
                else if (naviobj.model.labelSettings.higherLevel.position === "top" && naviobj.model.labelSettings.lowerLevel.position === "top") {
                    rectoptions = {
                        x: this.padding,
                        y: naviobj.minHighHeight - 1,
                        width: this.newWidth > 0 ? (this.newWidth - naviobj.padding * 2) : 0,
                        height: naviobj.minLowHeight,
                        'stroke': naviobj.model.labelSettings.lowerLevel.border.color,
                        'stroke-width': naviobj.model.labelSettings.lowerLevel.border.width,
                        fill: 'transparent'
                    };
                    naviobj.renderer.drawRect(rectoptions, naviobj.lowerLevel);
                }

                if (naviobj.model.enableRTL) {
                    i = naviobj._lowerTextNode.length - 1;
                    isrtl = true;
                }
                else {
                    i = 0;
                    isrtl = false;
                }


                for (; isrtl ? i >= 0 : i < naviobj._lowerTextNode.length; isrtl?i--:i++) {
                    naviobj._lowerLineLeft[i] = lineleft;
                    labelfont = { size: naviobj.model.labelSettings.lowerLevel.style.font.size, fontStyle: naviobj.model.labelSettings.lowerLevel.style.font.fontStyle, fontFamily: naviobj.model.labelSettings.lowerLevel.style.font.fontFamily };
                    textOffset = ej.EjSvgRender.utils._measureText(naviobj.lowerLevel.childNodes[count].textContent, null, labelfont); // var txt = naviobj._lowerTextNode[i].getBBox();
                    txtwidth = textOffset.width;// txt.width;
                    var setleft = 0;
                    newleft = naviobj._lowerTotalValues[i + 1] === undefined
                        ? isrtl ? 0 : naviobj.newWidth :
                        isrtl ? naviobj.newWidth - ((naviobj._lowerTotalValues[i + 1] * this.eachInterval + this.padding)) :
                        (naviobj._lowerTotalValues[i + 1] * this.eachInterval + this.padding);
                    if (naviobj.model.labelSettings.lowerLevel.style.horizontalAlignment === "middle") {
                        setleft = isrtl ? (lineleft - newleft) / 2 + newleft - txtwidth / 2 : (newleft - lineleft) / 2 + lineleft - txtwidth / 2;
                    }
                    else if (naviobj.model.labelSettings.lowerLevel.style.horizontalAlignment === "left") {
                        setleft = isrtl? newleft + 2 : lineleft + 2;
                    }
                    else
                        setleft = isrtl ? lineleft - txtwidth - 2 : newleft - txtwidth - 2;
                    if (type == "numeric")
                        setleft = lineleft - txtwidth / 2;
                    naviobj.renderer._setAttr($(naviobj._lowerTextNode[i]), { 'x': setleft });
                    naviobj.renderer._setAttr($(naviobj._lowerTextNode[i]), { 'fill': naviobj.model.labelSettings.lowerLevel.style.font.color });
					if(this.model.labelSettings.lowerLevel.labelIntersectAction != "none")
						this.isIntersect(naviobj, naviobj._lowerTextNode, i, labelfont, txtwidth, isrtl);

                    naviobj._lowerTextLeft[i] = setleft;

                    if (naviobj.model.labelSettings.lowerLevel.position === "bottom" && naviobj.model.labelSettings.higherLevel.position === "top") {
                        if (!this.svgSupport)
                            naviobj.renderer._setAttr($(naviobj._lowerTextNode[i]), { 'y': naviobj.newHeight - textOffset.height });
                        else {
                            if (matched.browser.toLowerCase() == "msie")
                                naviobj._lowerTextNode[i].setAttribute("y", naviobj.newHeight - 5);
                            else
                                naviobj._lowerTextNode[i].setAttribute("y", naviobj.newHeight - 9);

                        }
                        var ht = naviobj.model.labelSettings.higherLevel.visible ? parseFloat(naviobj.minHighHeight + naviobj.centerHeight) : naviobj.minHighHeight;
                        rectoptions = {
                            x1: lineleft,
                            y1: ht,
                            x2: lineleft,
                            y2: naviobj.newHeight,
                            'stroke': this.lgClr,
                            'stroke-width': naviobj.model.labelSettings.lowerLevel.gridLineStyle.width,
                            'stroke-dasharray': naviobj.model.labelSettings.lowerLevel.gridLineStyle.dashArray,
                        };
                        if (i != 0 && type != "numeric")
                            naviobj.renderer.drawLine(rectoptions, naviobj.lowerLevel);
                    }
                    else if (naviobj.model.labelSettings.lowerLevel.position === "bottom" && naviobj.model.labelSettings.higherLevel.position === "bottom") {
                        naviobj._lowerTextNode[i].setAttribute("y", naviobj.bottomPosition - 5);
                        rectoptions = {
                            x1: lineleft,
                            y1: naviobj.centerHeight,
                            x2: lineleft,
                            y2: naviobj.bottomPosition,
                            'stroke': naviobj.model.labelSettings.lowerLevel.gridLineStyle.color,
                            'stroke-width': naviobj.model.labelSettings.lowerLevel.gridLineStyle.width,
                            'stroke-dasharray':naviobj.model.labelSettings.lowerLevel.gridLineStyle.dashArray,
                        };
                        if (i != 0)
                            naviobj.renderer.drawLine(rectoptions, naviobj.lowerLevel);
                    }
                    else if (naviobj.model.labelSettings.lowerLevel.position === "top" && naviobj.model.labelSettings.higherLevel.position === "bottom") {
                        naviobj._lowerTextNode[i].setAttribute("y", naviobj.centerPosition - 5);
                        rectoptions = {
                            x1: lineleft,
                            y1: 0,
                            x2: lineleft,
                            y2: naviobj.centerPosition,
                            'stroke': naviobj.model.labelSettings.lowerLevel.gridLineStyle.color,
                            'stroke-width': naviobj.model.labelSettings.lowerLevel.gridLineStyle.width,
                            'stroke-dasharray': naviobj.model.labelSettings.lowerLevel.gridLineStyle.dashArray,
                        };
                        if (i != 0)
                            naviobj.renderer.drawLine(rectoptions, naviobj.lowerLevel);
                    }
                    else if (naviobj.model.labelSettings.higherLevel.position === "top" && naviobj.model.labelSettings.lowerLevel.position === "top") {
                        naviobj._lowerTextNode[i].setAttribute("y", naviobj.centerPosition - 5);
                        rectoptions = {
                            x1: lineleft,
                            y1: naviobj.minHighHeight,
                            x2: lineleft,
                            y2: naviobj.centerPosition,
                            'stroke': naviobj.model.labelSettings.lowerLevel.gridLineStyle.color,
                            'stroke-width': naviobj.model.labelSettings.lowerLevel.gridLineStyle.width,
                            'stroke-dasharray': naviobj.model.labelSettings.lowerLevel.gridLineStyle.dashArray,
                        };
                        if (i != 0)
                            naviobj.renderer.drawLine(rectoptions, naviobj.lowerLevel);
                    }
                    if ((setleft < this.padding || naviobj.newWidth - lineleft - this.padding < txtwidth) && type == "datetime") {
                        if (isrtl) {
                            if (setleft < this.padding && lineleft - this.padding > txtwidth) {
                                if (naviobj.model.labelSettings.lowerLevel.style.horizontalAlignment === "middle")
                                    naviobj._lowerTextNode[i].setAttribute("x", this.padding + (lineleft - this.padding) / 2 - txtwidth / 2);
                                else if (naviobj.model.labelSettings.lowerLevel.style.horizontalAlignment === "left")
                                    naviobj._lowerTextNode[i].setAttribute("x", this.padding + 10);
                                else
                                    naviobj._lowerTextNode[i].setAttribute("x", lineleft - txtwidth - 2);
                            }
                            else if (naviobj.newWidth - lineleft < txtwidth && naviobj.newWidth -this.padding - newleft > txtwidth) {
                                if (naviobj.model.labelSettings.lowerLevel.style.horizontalAlignment === "middle")
                                    naviobj._lowerTextNode[i].setAttribute("x", newleft + (naviobj.newWidth - newleft - this.padding) / 2 - txtwidth / 2);
                                else if (naviobj.model.labelSettings.lowerLevel.style.horizontalAlignment === "left")
                                    naviobj._lowerTextNode[i].setAttribute("x", newleft + 10);
                                else
                                    naviobj._lowerTextNode[i].setAttribute("x", naviobj.newWidth - txtwidth - 2 - this.padding);
                            }
                            else
                                naviobj.lowerLevel.removeChild(naviobj._lowerTextNode[i]);
                            count--;
                        }
                        else {
                            naviobj.lowerLevel.removeChild(naviobj._lowerTextNode[i]);
                            count--;
                        }
                    }
                    else if (setleft + txtwidth > naviobj.newWidth - this.padding && type == "datetime") {
                        if (naviobj.model.labelSettings.lowerLevel.style.horizontalAlignment === "middle")
                            setleft = lineleft + (naviobj.newWidth - lineleft - this.padding) / 2 - txtwidth / 2;
                        else if (naviobj.model.labelSettings.lowerLevel.style.horizontalAlignment === "left")
                            setleft = lineleft;
                        else
                            setleft = naviobj.newWidth - txtwidth * 3 / 2;
                        naviobj._lowerTextNode[i].setAttribute("x", setleft);                        
                    }
                    if (!this.model.enableRTL)
                        lineleft = naviobj._lowerTotalValues[i + 1] * this.eachInterval + this.padding;
                    else
                        lineleft = naviobj.newWidth - (naviobj._lowerTotalValues[i - 1] * this.eachInterval + this.padding);
                    count++;
                }
                
                //Calculate lower lavel label regions
                for (var k = 0, len=naviobj._lowerLineLeft.length;  k < len; k++) {
                    textOffset = ej.EjSvgRender.utils._measureText(naviobj.lowerLevel.childNodes[k].textContent, null, labelfont);
					if(textOffset.width != 0 || textOffset.height != 0){
						if (this.svgSupport)
							lowerLevelLabels.push({ size: textOffset, x: naviobj._lowerLineLeft[k], y: naviobj._lowerTextNode[k].getAttribute("y") - textOffset.height / 2 + offset, lableType: "lowerLevel" });
						else
							lowerLevelLabels.push({ size: textOffset, x: naviobj._lowerLineLeft[k], y: naviobj._lowerTextNode[k].offsetTop + offset, lableType: "lowerLevel" });
					}
                }
                this._addLabelsRegion(naviobj, lowerLevelLabels);
                
            }
            if (!naviobj.model.enableRTL) {
                naviobj._lowerLineLeft.push(this.newWidth - this.padding);
            } else {
                naviobj._lowerLineLeft.push(this.padding);
            }            
            naviobj._setGridlines(naviobj);
            $(this.higherLevel).css('cursor', 'pointer');
            $(this.lowerLevel).css('cursor', 'pointer');
            //this.higherLevel.setAttributeNS(null, 'transform', 'translate(' + 20 + ',' + 0 + ')');
            //this.lowerLevel.setAttributeNS(null, 'transform', 'translate(' + 20 + ',' + 0 + ')');

        },

        //Add higher level and lowe level labels regions
        _addLabelsRegion: function (naviObj,labels) {
            var width, height,startX, len = labels.length;
            if (len == 1)
            naviObj.labelRegions.push({ X: labels[0].x, Y: labels[0].y, Height: labels[0].size.height, Width: naviObj.newWidth-labels[0].x, LabelType: labels[0].lableType });
            else {
                for (var k = 0; k < len; k++) {
                    if (!naviObj.model.enableRTL) {
                        width = labels[k + 1] ? labels[k + 1].x - labels[k].x : naviObj.newWidth - labels[k].x - parseInt(naviObj.model.padding);
                        startX = labels[k].x;
                    }                                                
                    else {                        
                        width = labels[k + 1] ? labels[k].x - labels[k + 1].x : labels[k].x - parseInt(naviObj.model.padding);
                            startX = labels[k + 1] ? labels[k + 1].x : parseInt(naviObj.model.padding);
                    }                       
                    height = labels[k + 1] ? labels[k].size.height : labels[k - 1].size.height;
                    naviObj.labelRegions.push({ X: startX, Y: labels[k].y, Height: height, Width: width, LabelType: labels[k].lableType });
                }
            }
        },
        _setGridlines: function (naviobj) {

            if (naviobj.model.navigatorStyleSettings.minorGridLineStyle.visible === true) {

                for (var i = 1; i < naviobj._lowerTextNode.length; i++) {
                    if (naviobj.model.labelSettings.higherLevel.position == "top" && naviobj.model.labelSettings.lowerLevel.position == "top") {
                        var rectoptions = {
                            x1: naviobj._lowerLineLeft[i],
                            y1: naviobj.centerHeight + naviobj.minLowHeight+naviobj.minHighHeight,
                            x2: naviobj._lowerLineLeft[i],
                            y2: naviobj.centerPosition,
                            'stroke': naviobj.model.navigatorStyleSettings.minorGridLineStyle.color,
                            'stroke-width': '1'
                        };
                        naviobj.renderer.drawLine(rectoptions, naviobj.centerLevel);
                    }
                    else {
                        var rectoptions = {
                            x1: naviobj._lowerLineLeft[i],
                            y1: naviobj.centerPosition,
                            x2: naviobj._lowerLineLeft[i],
                            y2: naviobj.centerPosition+naviobj.centerHeight,
                            'stroke': naviobj.model.navigatorStyleSettings.minorGridLineStyle.color,
                            'stroke-width': '1'
                        };
                        naviobj.renderer.drawLine(rectoptions, naviobj.centerLevel);
                    }
                    
                }
            }
            else {
                for (var i = 0; i < naviobj._higherTextNode.length; i++) {
                    // var lineLeft = naviobj._lowerLineLeft[i];
                    var rectoptions = {
                        x1: naviobj._higherLineLeft[i],
                        y1: naviobj.centerHeight + naviobj.minLowHeight,
                        x2: naviobj._higherLineLeft[i],
                        y2: naviobj.centerPosition,
                        'stroke': naviobj.model.navigatorStyleSettings.majorGridLineStyle.color,
                        'stroke-width': '1'
                    };
                    naviobj.renderer.drawLine(rectoptions, naviobj.centerLevel);
                }
            }

        },

        bindTo: function () {
            if (!ej.util.isNullOrUndefined(this.model.dataSource)) {
                if (this.model.dataSource != null && this.model.dataSource.length > 0) {

                    this._processJsonData(this.model.dataSource, this.model);
                }
            }

        },

        _processJsonData: function (jsonObj, newmodel) {

            var xdata = [], yValues = [], index = 0;

            for (var j = 0; j < jsonObj.length; j++) {
                if (typeof jsonObj[j][newmodel.xName] == "string" && jsonObj[j][newmodel.xName].indexOf("/Date(") != -1)
                    jsonObj[j][newmodel.xName] = new Date(parseInt(jsonObj[j][newmodel.xName].substr(6)));
                if (jQuery.type(jsonObj[j][newmodel.xName]) != "string" && jQuery.type(jsonObj[j][newmodel.xName]) != "date")
                    xdata.push(parseFloat(!ej.util.isNullOrUndefined(jsonObj[j][newmodel.xName]) ? jsonObj[j][newmodel.xName] : j));
                else {
                    xdata.push(!ej.util.isNullOrUndefined(jsonObj[j][newmodel.xName]) ? jsonObj[j][newmodel.xName] : j);
                }
            }

            if (!ej.util.isNullOrUndefined(newmodel.yName)) {
                for (var k = 0; k < newmodel.yName.length; k++) {
                    var yNVal = [];
                    for (var yI = 0; yI < jsonObj.length; yI++) {
                        yNVal.push(jsonObj[yI][newmodel.yName[k]] === null || jsonObj[yI][newmodel.yName[k]] === undefined ? jsonObj[yI][newmodel.yName[k]] : parseFloat(jsonObj[yI][newmodel.yName[k]]));
                    }
                    yValues[k] = yNVal;
                    index = k + 1;
                }
            }

            var endDateTime = new Date(Math.max.apply(null, xdata)),
                startDateTime = new Date(Math.min.apply(null, xdata));
            if (endDateTime.getTime() == startDateTime.getTime()) {
                startDateTime.setHours(0);
                endDateTime.setHours(23);
            }
            var minX = startDateTime.getTime(), maxX = endDateTime.getTime(), scrollRangeSettings = this.model.scrollRangeSettings;
            
            if (this.model.enableScrollbar) {
                if ((!this._scrollRange && !this.scrollbarUpdate) || !this.scrollbarUpdate) {
                    var args = [minX, maxX, startDateTime, endDateTime]
                    this.calculateZoomingRange.apply(this, args);
                } else {
                    this._scrollRange = {
                        min: Math.min(this._scrollRange.min, minX),
                        max: Math.max(this._scrollRange.max, maxX),
                        delta: maxX - minX
                    };
                }
               
            } else
                this.setRange.call(this, minX, maxX, startDateTime, endDateTime);
        },        

        calculateZoomingRange: function (minX, maxX, startDateTime, endDateTime) {
            this.calculateZoomFactorPosition.call(this, minX, maxX, startDateTime, endDateTime);
            this.setRange.call(this, minX, maxX, startDateTime, endDateTime);
            return 0;
        },

        setRange: function (start, end, startDate, endDate) {
            var rangeSettings = this.model.rangeSettings;
            if (rangeSettings.start != "" && rangeSettings.end != "") {
                this.startDateTime = new Date(rangeSettings.start);
                this.endDateTime = new Date(rangeSettings.end);
                this.startValue = rangeSettings.start;
                this.endValue = rangeSettings.end;
            } else {
                this.startDateTime = new Date(startDate);
                this.startValue = start;
                this.endDateTime = new Date(endDate);
                this.endValue = end;
            }
            return 0;
        },

        calculateZoomFactorPosition: function (startX, endX, startDateTime, endDateTime) {
            var model = this.model,
                rangeSettings = model.rangeSettings;
            var delta, zoomPos, zoomFact, start = startDateTime, end = endDateTime,
                min = startX, max = endX;
            var scrollRangeSettings = model.scrollRangeSettings;
            if (model.valueType.toLowerCase() == "datetime") {
                //VirtualRange start value is not given, it takes dataSource start value
                start = Date.parse(scrollRangeSettings.start ? new Date(scrollRangeSettings.start) : startDateTime);
                //If the given virtual range start value is greater than datasource value, it takes the minimum vallue from datasource
                start = Math.min(start, Date.parse(startDateTime));
                start = rangeSettings.start != "" ? Math.min(start,Date.parse(new Date(rangeSettings.start))) : start;
                //VirtualRange end value is not given, it takes dataSource end value
                end = Date.parse(scrollRangeSettings.end ? new Date(scrollRangeSettings.end) : endDateTime);
                //If the given virtual range end value is less than datasource value, it takes the maximum vallue from datasource
                end = Math.max(end, Date.parse(endDateTime));
                end = rangeSettings.end != "" ? Math.max(end, Date.parse(new Date(rangeSettings.end))) : end;
                delta = end - start;
                if (!model.enableRTL) {
                    zoomPos = (startDateTime - start) / delta;
                    zoomFact = (endDateTime - startDateTime) / delta;
                } else {
                    zoomPos = (end - endDateTime) / delta;
                    zoomFact = (endDateTime - startDateTime) / delta;
                }
                this._scrollRange = { min: start, max: end, delta: end - start };
            } else {
                //VirtualRange Start value is not given, it takes dataSource start value
                min = scrollRangeSettings.start != "" ? parseFloat(scrollRangeSettings.start) : startX;
                //If the given virtual range start value is greater than datasource value, it takes the minimum vallue from datasource
                min = Math.min(min, startX);
                min = rangeSettings.start != "" ? Math.min(min, parseFloat(rangeSettings.start)) : min;
                //VirtualRange end value is not given, it takes dataSource end value
                max = scrollRangeSettings.end != "" ? parseFloat(scrollRangeSettings.end) : endX;
                //If the given virtual range end value is less than datasource value, it takes the maximum vallue from datasource
                max = Math.max(max, endX);
                max = rangeSettings.end != "" ? Math.max(max, parseFloat(rangeSettings.end)) : max;
                delta = max - min;
                if (!model.enableRTL) {
                    zoomPos = (startX - min) / delta;
                    zoomFact = (endX - startX) / delta;
                } else {
                    zoomPos = (max - endX) / delta;
                    zoomFact = (endX - startX) / delta;
                }
                this._scrollRange = { min: min, max: max, delta: max - min };
            }
            this.scrollZoomPos = zoomPos;
            this.scrollZoomFact = zoomFact;

            return 0;
        },
        mousePosition: function (evt) {
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
        calTouchPosition: function (e) {
            var matched = jQuery.uaMatch(navigator.userAgent);
            var mouseposition = this.mousePosition(e);
            e.pageX = mouseposition.x;
            e.pageY = mouseposition.y;
            var mouseX, mouseY;
            var browser = matched.browser.toLowerCase();
            mouseX = (e.pageX) - $(this.svgDocument).offset().left;
            mouseY = (e.pageY) - $(this.svgDocument).offset().top;
			this.leftPadding = $(this.svgDocument).offset().left;


            return { X: mouseX, Y: mouseY };

        },

        calMousePosition: function (e) {
            var matched = jQuery.uaMatch(navigator.userAgent);
            var mouseX, mouseY;
            if (matched.browser.toLowerCase() == "mozilla" || matched.browser.toLowerCase() == "webkit") {
                mouseX = (e.pageX) - $(this.svgDocument).parent().offset().left;
                mouseY = (e.pageY) - $(this.svgDocument).parent().offset().top;
                this.leftPadding = 0;//$(this.svgDocument).offset().left;
                this.grabPadding = 0;
            } else {
                mouseX = (e.originalEvent?e.originalEvent.pageX:e.pageX) - $(this.svgDocument).offset().left;
                mouseY = (e.originalEvent?e.originalEvent.pageY:e.pageY) - $(this.svgDocument).offset().top;
                this.leftPadding = $(this.svgDocument).offset().left;
            }

            return { X: mouseX, Y: mouseY };

        },

        _performSelection: function (evt){

            var naviobj = this,
                model = naviobj.model,
                selectionOptions = model.navigatorStyleSettings.selectionSettings,
                uncolor = selectionOptions.color,
                targetParentId = evt.target.parentNode.id,
                isUnhighlight = (targetParentId == "leftslider" || targetParentId == "rightslider" || targetParentId == naviobj._id + "thumbleft" || targetParentId == naviobj._id + "thumbright"),
                valueType = naviobj.model.valueType;

            naviobj._sliderHover = isUnhighlight || naviobj.switched;
            naviobj.selectionGrad = naviobj.renderer.createGradientElement('selectionGrad', uncolor, 150, 0, 150, 100, naviobj.svgDocument);
            naviobj.isNumericType = targetParentId != naviobj._id;
            if (((naviobj.isNumericType && valueType == 'numeric') || valueType != 'numeric') && (!isUnhighlight) && !naviobj.switched) {
                $("#highlightRect" + naviobj._id).hide();
                if ($("#selectionRect" + naviobj._id).length == 0) {
                    naviobj.gselection = naviobj.renderer.createGroup({ 'id': 'selectionRect' + naviobj._id });
                    var selectionRectOptions = {
                        'height': naviobj.sliderHeight,
                        'opacity': selectionOptions.opacity,
                        'stroke': selectionOptions.border.color,
                        'stroke-width': selectionOptions.border.width
                    };
                    naviobj.renderer.drawRect(selectionRectOptions, naviobj.gselection);
                    naviobj.selectionRect = naviobj.gselection.firstChild;
                    naviobj.renderer.append(naviobj.gselection, naviobj.styleRect);
                }
                naviobj.rect = naviobj.selectionRect;
                naviobj.startX = naviobj.mouseDownX;
                naviobj.renderer._setAttr($(naviobj.selectionRect), { 'fill': naviobj.selectionGrad });
                naviobj.renderer._setAttr($(naviobj.selectionRect), { 'stroke': selectionOptions.border.color });
                naviobj._highlight.call(naviobj, naviobj, evt);
            }

        },


        _performHighlight: function (evt) {

            var naviobj = this,
               model = naviobj.model,
               targetId = evt.target.parentNode.id,
               highlightOptions = model.navigatorStyleSettings.highlightSettings,
               uncolor = highlightOptions.color,
               isUnhighlight = (targetId == "leftslider" || targetId == "rightslider" || targetId == this._id + "thumbleft" || targetId == this._id + "thumbright");

            this.highlightGrad = this.renderer.createGradientElement('highlightGrad', uncolor, 150, 0, 150, 100, this.svgDocument);

            $("#highlightRect" + this._id).hide();
            if (!isUnhighlight && !this.isSelection && !this._sliderHover && !naviobj.switched) {
                if ($("#highlightRect" + this._id).length == 0) {
                    this.gHighlight = this.renderer.createGroup({ 'id': 'highlightRect' + this._id });
                    var highlightRectOptions = {
                        'height': this.sliderHeight,
                        'fill': this.highlightGrad,
                        'opacity': highlightOptions.opacity,
                        'stroke': highlightOptions.border.color,
                        'stroke-width': highlightOptions.border.width
                    };
                    this.renderer.drawRect(highlightRectOptions, this.gHighlight);
                    this.highlightRect = this.gHighlight.firstChild;
                    this.renderer.append(this.gHighlight, this.styleRect);
                }
                this.rect = this.highlightRect;
                naviobj.startX = naviobj.mouseDownX;
                this._highlight.call(this, naviobj, evt);
            }

        },

        isTouch: function (evt) {
            var event = evt.originalEvent ? evt.originalEvent : evt;
            if ((event.pointerType == "touch") || (event.pointerType == 2) || (event.type.indexOf("touch") > -1))
                return true;
            return false;
        },

        _rangeClick: function(e){
            var end = new Date();
            if(this.model.click != '')
                this._trigger("click", {data:{event: e}});
            if(this._doubleTapTimer != null && end - this._doubleTapTimer < 300)
                this._doubleClick(e);
            this._doubleTapTimer = end;
        },

        _doubleClick: function(e){
            if(this.model.doubleClick != '')
                this._trigger("doubleClick", {data:{event: e}});
        },

        _rightClick: function (evt){
            var browserInfo = this.model.browserInfo;
            if(this.model.rightClick != '')
                this._trigger("rightClick", {data:{event: evt }});
            
            if (this.isTouch(evt) && this.model.navigatorStyleSettings.selectionSettings.enable) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        },
        _grab: function (evt) {
            if (!this.isTouch(evt))
                evt.preventDefault();
            var naviobj = this,
                model = naviobj.model,
                browserInfo = model.browserInfo,
                mousedownCords,
                istouch = this.isTouch(evt),
                selectionOptions = model.navigatorStyleSettings.selectionSettings,
                mousedownCords = istouch ? naviobj.calTouchPosition(evt) : naviobj.calMousePosition(evt);
            naviobj.mouseDownX = mousedownCords.X;
            naviobj.mouseDownY = mousedownCords.Y;
            if (selectionOptions.enable) this._performSelection(evt);
            // find out which element we moused down on
            
            var targetElement;
            if (naviobj.edge == true) {
                targetElement = naviobj.target;
            }
            else {
                targetElement = evt.target;
            }
            // used to find a thumb id
            var current = targetElement;
            var targetId;
            while (current.parentNode) {
				current = current.parentNode
				if (current.id == this._id + "thumbleft")
                {
                    targetId = this._id + "thumbleft";
                }
                else if (current.id == this._id + "thumbright")
                {
                    targetId = this._id + "thumbright";
                }
            }
            var isLower,
            isHigher,
            labelRegion,labelRegionX,labelRegionY,labelType,
            regionLength = naviobj.labelRegions.length,
            mouseX = naviobj.mouseDownX,
            mouseY = naviobj.mouseDownY;
            for (var k = 0; k < regionLength; k++) {
                labelRegion = naviobj.labelRegions[k];
                labelRegionX = labelRegion.X;
                labelRegionY = labelRegion.Y;
                labelType = labelRegion.LabelType;
                if ((labelRegionX <= mouseX && (labelRegionX + labelRegion.Width >= mouseX)) && (labelRegionY <= mouseY && ((labelRegionY + labelRegion.Height) >= mouseY))) {
                       isLower = labelType == "lowerLevel" ? true : false;
                       isHigher= labelType == "higherLevel" ? true : false;
                        break;
                    }                
            }

            var isDraggable = false;
            naviobj.isSelection = false;
            if (naviobj.highlightRect) {
                var highlightCord = naviobj.highlightRect.getBoundingClientRect();
                var centerCord = naviobj.centerSlider.getBoundingClientRect();
                if (highlightCord.left >= centerCord.left && highlightCord.right <= centerCord.right)
                    isDraggable = true;
            }
            
            if (selectionOptions.enable && naviobj.selectionRect && !(targetElement.parentNode.id === "leftslider" || targetElement.parentNode.id === "rightslider" || targetId == this._id + "thumbleft" || targetId == this._id + "thumbright")) {
                naviobj.isSelection = true;
                naviobj.startX = naviobj.mouseDownX;
            }
            if (istouch && !naviobj.switched) {
                var leftValue = this._leftValue,
                    rightValue = this._rightValue,
                    padding = 10,
                    leftThumb = $("#" + this._id + "thumbleft"),
                    rightThumb = $("#" + this._id + "thumbright");
                if (mouseX >= (leftValue.left - padding) && mouseX <= (leftValue.right + padding)) {
                    targetElement = this.leftCircle ? this.leftCircle : leftThumb[0].firstChild;
                    targetId = this.leftCircle ? targetId : this._id + "thumbleft";
                    this._sliderMove = true;
                }
                if (mouseX >= (rightValue.left - padding) && mouseX <= (rightValue.right + padding)) {
                    targetElement = this.rightCircle ? this.rightCircle : rightThumb[0].firstChild;
                    targetId = this.rightCircle ? targetId : this._id + "thumbright";
                    this._sliderMove = true;
                }

            }
            if ((targetElement.parentNode.id === "leftslider" || targetElement.parentNode.id === "rightslider" || targetId == this._id + "thumbleft" || targetId == this._id + "thumbright" || (targetElement.parentNode.id === "highlightRect" + this._id && isDraggable) || targetElement.parentNode.id === "centerslider") || (isLower || isHigher) || naviobj.isSelection) {
                //set the item moused down on as the element to be dragged
                if (targetElement.parentNode.id === "highlightRect" + this._id)
                    naviobj.dragTarget = $("#centerslider").children()[0];
                else
                    naviobj.dragTarget = targetElement;
                naviobj.grabbed = true;
                naviobj.edge = false;
                var dragParentId = naviobj.dragTarget.parentNode.id;
                if (this.svgSupport) {
                    if (targetId == this._id + "thumbleft" || targetId == this._id + "thumbright")
                        var transMatrix = {e:evt.clientX,f:evt.clientY};
                    else
                        var transMatrix = naviobj.dragTarget.getCTM();
                    naviobj.grabPoint.x = naviobj.mouseDownX + this.leftPadding - Number(transMatrix.e);
                    naviobj.grabPoint.y = naviobj.trueCoords.y - Number(transMatrix.f);
                }
                var txtPosition;
                var i;
                var flag = false;
                var isrtl = naviobj.model.enableRTL;
                if (isrtl) {
                    naviobj._higherLineLeft.sort(function (a, b) { return a - b });
                    naviobj._lowerLineLeft.sort(function (a, b) { return a - b });
                }
                if (dragParentId != 'leftslider' && dragParentId != 'rightslider' && naviobj.model.valueType == "datetime" && isHigher) {
                    if (naviobj.dragTarget.parentNode.id == "centerslider")
                        naviobj.grabbed = true;
                    else
                        naviobj.grabbed = false;
                    txtPosition = naviobj.mouseDownX;
                    for (i=0;i< naviobj._higherLineLeft.length;i++) {
                        if (i + 1 < naviobj._higherLineLeft.length && txtPosition > naviobj._higherLineLeft[i] && txtPosition < naviobj._higherLineLeft[i + 1]) {
                            naviobj.setSliderPositions(naviobj._higherLineLeft[i], null, null);
                            naviobj.setSliderPositions(null, null, naviobj._higherLineLeft[i + 1]);
                            flag = true;
                        }
                        else if (i + 1 === naviobj._higherLineLeft.length && txtPosition > naviobj._higherLineLeft[i]) {
                            naviobj.setSliderPositions(naviobj._higherLineLeft[i], null, null);
                            naviobj.setSliderPositions(null, null, naviobj.newWidth - naviobj.padding);
                            flag = true;
                        }
                    }
                    if (isrtl && !flag) {
                        naviobj.setSliderPositions(0 + naviobj.padding, null, null);
                        naviobj.setSliderPositions(null, null, naviobj._higherLineLeft[0]);
                        flag = false;
                    }
                }
                else if (dragParentId != 'leftslider' && dragParentId != 'rightslider' && naviobj.model.valueType == "datetime" && isLower) {
                    naviobj.center = naviobj.mouseDownX
                    if (naviobj.dragTarget.parentNode.id == "centerslider")
                        naviobj.grabbed = true;
                    else
                        naviobj.grabbed = false;
                    txtPosition = naviobj.mouseDownX;
                    for (i = 0; i < naviobj._lowerLineLeft.length; i++) {
                        if (i + 1 < naviobj._lowerLineLeft.length && txtPosition > naviobj._lowerLineLeft[i] && txtPosition < naviobj._lowerLineLeft[i + 1]) {
                            naviobj.setSliderPositions(naviobj._lowerLineLeft[i], null, null);
                            naviobj.setSliderPositions(null, null, naviobj._lowerLineLeft[i + 1]);
                            flag = true;
                        }
                        else if (i + 1 === naviobj._lowerLineLeft.length && txtPosition > naviobj._lowerLineLeft[i]) {
                            naviobj.setSliderPositions(naviobj._lowerLineLeft[i], null, null);
                            naviobj.setSliderPositions(null, null, naviobj.newWidth - naviobj.padding);
                            flag = true;
                        }
                    }
                    if (isrtl && !flag) {
                        naviobj.setSliderPositions(0 + naviobj.padding, null, null);
                        naviobj.setSliderPositions(null, null, naviobj._lowerLineLeft[0]);
                        flag = false;
                    }
                }
                else if (naviobj.isSelection) {
                    naviobj.grabbed = true;
                }

            }
            if(ej.isTouchDevice() && this.model.rightClick != '')
                this._longPressTimer = new Date();
        },

        _leave: function (evt) {
            $("#highlightRect" + this._id).hide();
        },
        _drag: function (evt) {

            evt.preventDefault();
            var matched = jQuery.uaMatch(navigator.userAgent);
            var mouseX, mouseY;
            var naviobj = this;//evt.data.Param1;
            if ((this.svgSupport && evt.originalEvent.toString() !== "[object TouchEvent]") && matched.browser.toLowerCase() != "msie") {
                var mousedownCords = naviobj.calMousePosition(evt);
            }
            else if (!this.svgSupport)
                var mousedownCords = naviobj.calMousePosition(evt);
            else
                var mousedownCords = naviobj.calTouchPosition(evt);//naviobj.calMousePosition(evt);
            mouseX = naviobj.mouseDownX = mousedownCords.X;
            mouseY = naviobj.mouseDownY = mousedownCords.Y;
            var labelRegion, labelregionX, labelregionY, xLeft, newX;;
            var highlightOptions = naviobj.model.navigatorStyleSettings.highlightSettings;
            if (highlightOptions.enable && !this._sliderMove && !this.isTouch(evt))
                this._performHighlight(evt);
            if(this.svgSupport)
            naviobj.GetTrueCoords(evt);
            //Apply css cursor as pointer to lower and higher level labels
            if (naviobj.model.labelSettings.higherLevel.visible || naviobj.model.labelSettings.lowerLevel.visible) {
                var regionLength = naviobj.labelRegions.length;
                for (var k = 0; k < regionLength; k++) {
                    labelRegion = naviobj.labelRegions[k];
                    labelregionX = labelRegion.X; labelregionY = labelRegion.Y;
                    if ((labelregionX <= mouseX && (labelregionX + labelRegion.Width >= mouseX)) && (labelRegion.Y <= mouseY && ((labelRegion.Y + labelRegion.Height) >= mouseY))) {
                        $(naviobj.rightUnSelected).css('cursor', 'pointer');
                        $(naviobj.leftUnSelected).css('cursor', 'pointer');
                        break;
                    }
                    else {
                        $(naviobj.rightUnSelected).css('cursor', 'default');
                        $(naviobj.leftUnSelected).css('cursor', 'default');
                    }
                }
            }
            // if we don't currently have an element in tow, don't do anything
            if (naviobj.dragTarget) {
                // account for the offset between the element's origin and the
                //    exact place we grabbed it... this way, the drag will look more natural
                if (!naviobj.edge && naviobj.dragTarget === naviobj.leftSlider || naviobj.dragTarget === naviobj.rightSlider || naviobj.dragTarget === naviobj.highlightRect || naviobj.dragTarget === naviobj.centerSlider) {
                    if (this.svgSupport) {
					if(matched.browser.toLowerCase() == "webkit"||matched.browser.toLowerCase() == "mozilla")
					{
                        var newX = naviobj.mouseDownX - naviobj.grabPoint.x;
						 if (newX < this.padding) newX = this.padding;
                        var newY = naviobj.mouseDownY - naviobj.grabPoint.y;
						}
						else
						{
						var newX = naviobj.trueCoords.x - naviobj.grabPoint.x;
						if (newX < this.padding) newX = this.padding;
                        var newY = naviobj.trueCoords.y - naviobj.grabPoint.y;
						}
                    }
                    else {
                        var newX = naviobj.mouseDownX;
                        var newY = naviobj.mouseDownY;
                    }
                }
                else {
                    var newX = naviobj.mouseDownX;// naviobj.trueCoords.x - naviobj.leftPadding;
                    //  var newX = naviobj.mouseDownX;// naviobj.trueCoords.x - naviobj.leftPadding;
                    var newY = naviobj.mouseDownY;// naviobj.trueCoords.y;
                } // used to find a id of the thumb
                var current = naviobj.dragTarget;
                var targetId;
                while (current.parentNode) {
                    current = current.parentNode
                    if (current.id == this._id + "thumbleft") {
                        targetId = this._id + "thumbleft";
                    }
                    else if (current.id == this._id + "thumbright") {
                        targetId = this._id + "thumbright";
                    }
                }
                naviobj.diff = naviobj.leftSlider.getBoundingClientRect().left - naviobj.rightSlider.getBoundingClientRect().left;
                naviobj.leftdiff = naviobj.rightSlider.getBoundingClientRect().left - this.padding - $(this.svgDocument).offset().left;
                naviobj.rightdiff = naviobj.leftSlider.getBoundingClientRect().left - this.padding - $(this.svgDocument).offset().left;
                if (naviobj.dragTarget.parentNode.id === "leftslider" || targetId == this._id + "thumbleft") {
                    naviobj.grabbed = false;
                    if (naviobj.diff >= -1 && naviobj.diff <= 1 && naviobj.switched == false && naviobj.rightdiff<naviobj.newWidth-(2*this.padding)) {
                        naviobj.target = naviobj.rightSlider;
                        naviobj.switched = true;
                        naviobj.edge = true;
                        naviobj._grab(evt);
                        naviobj._drag(evt);
                    }
                    else {
                        if (newX <= this.rightSliderPosition) {
                            naviobj.setSliderPositions(newX, null, null);
                            this.leftSliderPosition = newX;
                            this.leftset = false;
                        }
                        else {
                            naviobj.setSliderPositions(this.rightSliderPosition, null, null);
                            this.leftset = true;
                            this.leftSliderPosition = this.rightSliderPosition;
                        }
                        if (naviobj.diff >= 1 || naviobj.diff <= -1)
                            naviobj.switched = false;
                    }
                    naviobj.left = newX;
                    if (naviobj.isSelection) {
                        naviobj.isSelection = false;
                        this.renderer._setAttr($(this.selectionRect), { 'fill': 'transparent' });
                        this.renderer._setAttr($(this.selectionRect), { 'stroke': 'transparent' });
                    }
                }
                else if (naviobj.dragTarget.parentNode.id === "rightslider" || targetId == this._id + "thumbright") {
                    naviobj.grabbed = false;
                    // if (((this.svgSupport) && naviobj.leftSlider.getCTM().e == naviobj.rightSlider.getCTM().e && newX < naviobj.newWidth-15 && naviobj.rightSlider.getCTM().e == (naviobj.newWidth - naviobj.padding)) || (naviobj.leftSlider.getBoundingClientRect().left == naviobj.rightSlider.getBoundingClientRect().left && newX < naviobj.newWidth - 15 && naviobj.rightSlider.getBoundingClientRect().left == (naviobj.newWidth - naviobj.padding))) {                                                                
                    if (naviobj.diff >= 0 && naviobj.diff <= 1 && naviobj.switched == false && naviobj.leftdiff >0) {
                        naviobj.target = naviobj.leftSlider;
                        naviobj.switched = true;
                        naviobj.edge = true;
                        naviobj._grab(evt);
                        naviobj._drag(evt);
                    }
                    else {
                        //if (newX >= naviobj.leftSlider.getCTM().e)
                        if (newX >= this.leftSliderPosition) { // naviobj.leftSlider.getBoundingClientRect().left - this.leftPadding)
                            naviobj.setSliderPositions(null, null, newX);
                            this.rightSliderPosition = newX;
                        } else {
                            naviobj.setSliderPositions(null, null, this.leftSliderPosition);
                            this.rightSliderPosition = this.leftSliderPosition;
                        }
                        //naviobj.setSliderPositions(null, null, naviobj.leftSlider.getCTM().e);
                        naviobj.switched = false;
                           
                    }
                    naviobj.right = newX;
                    if (naviobj.isSelection) {
                        naviobj.isSelection = false;
                        this.renderer._setAttr($(this.selectionRect), { 'fill': 'transparent' });
                        this.renderer._setAttr($(this.selectionRect), { 'stroke': 'transparent' });
                    }
                }
                else if ((naviobj.dragTarget.parentNode.id === "centerslider" || naviobj.dragTarget.parentNode.id === "highlightRect" + this._id) && !naviobj.isSelection) {
                    $('#highlightRect'+this._id).hide();
                    if (newX < this.padding) newX =parseFloat(this.padding);
                        if (!naviobj.grabbed) {
                        naviobj.setSliderPositions(null, newX, null);
                        naviobj.center = newX;
                    }
                    else  
                        naviobj.grabbed = false;                     
                    if (newX > newX + this.renderer._getAttrVal($(naviobj.dragTarget), 'width'))
                        naviobj.setSliderPositions(null, newX, null);                    
                }
                else if (naviobj.isSelection) {
                    this.rect = this.selectionRect;
                    this._highlight.call(this, naviobj, evt)
                    naviobj.grabbed = false;
                }
            }
        },

        //Highlight and Selection logic perform here 
        _highlight: function (naviobj, evt) {
            var lowerRegion = [],
                higherRegion = [],
                sliderHeight = this.sliderHeight,
                startX = naviobj.startX > naviobj.mouseDownX ? naviobj.mouseDownX : naviobj.startX,
                endX = naviobj.startX == startX ? naviobj.mouseDownX : naviobj.startX,
                clientY = naviobj.mouseDownY,
                x, y, width, isHigherLevel, height,
                labelPlacement = this.model.labelSettings.higherLevel.labelPlacement,
                lowerLevelLabel = this.model.labelSettings.lowerLevel.visible,
                targetId = evt.target.parentNode.id;

            $.each(naviobj.labelRegions, function (index, region) {
                x = region.X;
                y = region.Y;
                width = region.Width;
                isHigherLevel = region.LabelType == "higherLevel";
                if (isHigherLevel)
                    height = (targetId.indexOf('higherLevel') < 0 && lowerLevelLabel ) ? region.Height : sliderHeight;
                else
                   height = region.Height;
                if (startX <= x + width && x <= endX && (y + height) >= clientY) {
                    if (isHigherLevel) {
                        if (!(higherRegion.indexOf(region) > -1))
                            higherRegion.push(region);
                    } else {
                        if (!(lowerRegion.indexOf(region) > -1))
                            lowerRegion.push(region);
                    }

                }
            });
            var minimumRegion, maximumRegion, min, max;
            var currentRegion = function (regions) {
                if (regions.length > 0) {
                    min = regions[0].X; max = regions[0].X;
                    minimumRegion = regions[0];
                    maximumRegion = regions[0];
                    for (var i = 0; i < regions.length; i++) {
                        if (regions[i].X < min) {
                            min = regions[i].X;
                            minimumRegion = regions[i];
                        }
                        else if (regions[i].X > max) {
                            max = regions[i].X;
                            maximumRegion = regions[i];
                        }
                    }
                }                

            }

            higherRegion.length > 0 ? currentRegion(higherRegion) : currentRegion(lowerRegion);
            if (!ej.isNullOrUndefined(minimumRegion)) {
                $("#" + this.rect.parentNode.id).show();
                this.renderer._setAttr($(this.rect), {
                    'transform': 'translate(' + minimumRegion.X + ',' + this.sliderPosition + ')',
                    'width': maximumRegion.Width + maximumRegion.X - minimumRegion.X
                });
            }
        },


        _drop: function (evt) {
            // if we aren't currently dragging an element, don't do anything
            $("#highlightRect" + this._id).hide();
            this._sliderMove = false;
            if (this.dragTarget) {
                // since the element currently being dragged has its pointer-events turned off,
                //    we are afforded the opportunity to find out the element it's being dropped on
                var targetElement = evt.target;
                this._sliderHover = false;
				this.grabbed = false;
                var naviobj = this;
                // set the global variable to null, so nothing will be dragged until we
                //    grab the next element
                if ((naviobj.model.allowSnapping && parseInt(naviobj.leftSlider.getBoundingClientRect().left + 2) < parseInt(naviobj.rightSlider.getBoundingClientRect().left)) || naviobj.isSelection) {
                    var padding = parseInt(naviobj.model.padding),
                        rect = naviobj.isSelection ? naviobj.rect.getBoundingClientRect() : 0;
                    naviobj.ismouseup = true;
                    if (naviobj.dragTarget.parentNode.id === "leftslider")
                        var txtPosition = naviobj.left;
                    else if (naviobj.dragTarget.parentNode.id === "rightslider")
                        var txtPosition = naviobj.right;
                    else if (naviobj.isSelection)
                        var txtPosition = Math.abs(parseFloat(rect.left - $("#" + this._id)[0].getBoundingClientRect().left + padding));
                    else if (naviobj.dragTarget.parentNode.id === "centerslider") {
                        var txtPosition = naviobj.leftSliderPosition;
                        var txtPosition1 = naviobj.rightSliderPosition;
                    }
                    var pos = 0,
                        pos1 = 0,
                        lineLength = naviobj._lowerLineLeft.length,
                        currentLine,
                        nextLine;

                    for (var i = 0; i < naviobj._lowerLineLeft.length; i++) {
                        if (i + 1 < naviobj._lowerLineLeft.length && txtPosition >= naviobj._lowerLineLeft[i] && txtPosition < naviobj._lowerLineLeft[i + 1]) {
                            naviobj.snapValue = naviobj._lowerLineLeft[i];
                            pos = (naviobj._lowerLineLeft[i + 1] - naviobj.snapValue);
                            if (naviobj.dragTarget.parentNode.id === "centerslider") {
                                for (var j = i + 1; j < naviobj._lowerLineLeft.length; j++) {
                                    if (j + 1 < naviobj._lowerLineLeft.length && txtPosition1 >= naviobj._lowerLineLeft[j] && txtPosition1 < naviobj._lowerLineLeft[j + 1]) {
                                        currentLine = naviobj._lowerLineLeft[j];
                                        nextLine = naviobj._lowerLineLeft[j + 1];
                                        pos1 = (nextLine - currentLine);
                                    }
                                }
                                txtPosition1 = (txtPosition1 >= (currentLine + (pos1 / 2))) ? nextLine : currentLine;
                            }
                            if (txtPosition >= (naviobj.snapValue + (pos / 2))) {
                                naviobj.snapValue = naviobj._lowerLineLeft[i + 1];
                                if (naviobj.dragTarget.parentNode.id === "leftslider")
                                    naviobj.setSliderPositions(naviobj._lowerLineLeft[i + 1], null, null);
                                else if (naviobj.dragTarget.parentNode.id === "rightslider")
                                    naviobj.setSliderPositions(null, null, naviobj._lowerLineLeft[i + 1]);
                                else if (naviobj.isSelection) {
                                    naviobj.setSliderPositions(null, null, naviobj._lowerLineLeft[i + 1] + parseFloat(rect.right - rect.left));
                                    naviobj.setSliderPositions(naviobj._lowerLineLeft[i + 1], null, null);
                                }
                                else if (naviobj.dragTarget.parentNode.id === "centerslider" && !naviobj.grabbed) {
                                    naviobj.setSliderPositions(null, null, txtPosition1);
                                    naviobj.setSliderPositions(naviobj._lowerLineLeft[i + 1], null, null);
                                }

                            }
                            else {
                                naviobj.snapValue = naviobj._lowerLineLeft[i];
                                if (naviobj.dragTarget.parentNode.id === "leftslider")
                                    naviobj.setSliderPositions(naviobj._lowerLineLeft[i], null, null);
                                else if (naviobj.dragTarget.parentNode.id === "rightslider")
                                    naviobj.setSliderPositions(null, null, naviobj._lowerLineLeft[i]);
                                else if (naviobj.isSelection) {
                                    naviobj.setSliderPositions(null, null, naviobj._lowerLineLeft[i] + parseFloat(rect.right - rect.left));
                                    naviobj.setSliderPositions(naviobj._lowerLineLeft[i], null, null);
                                }
                                else if (naviobj.dragTarget.parentNode.id === "centerslider" && !naviobj.grabbed) {
                                    naviobj.setSliderPositions(null, null, txtPosition1);
                                    naviobj.setSliderPositions(naviobj._lowerLineLeft[i], null, null);
                                }

                            }
                        }
                        else if (i + 1 === naviobj._lowerLineLeft.length && txtPosition >= naviobj._lowerLineLeft[i]) {
                            if (naviobj.isSelection) {
                                naviobj.setSliderPositions(null, null, naviobj._lowerLineLeft[i] + parseFloat(naviobj.rect.getBoundingClientRect().width));
                                naviobj.setSliderPositions(naviobj._lowerLineLeft[i], null, null);
                            } else
                                naviobj.setSliderPositions(null, null, naviobj.newWidth - naviobj.padding);
                        }
                    }
                }
                this.dragTarget = null;
               
                if (this.leftTooltip != undefined && this.model.tooltipSettings.tooltipDisplayMode=="always") {
                    this.leftTooltip.setAttribute('opacity', 1);
                    this.rightTooltip.setAttribute('opacity', 1);
                }
                else if (this.leftTooltip != undefined && this.model.tooltipSettings.tooltipDisplayMode.toLowerCase() == "ondemand") {
                    if (this.isTouch(evt)) {
                        var tooltip = [this.leftTooltip, this.rightTooltip]
							window.clearTimeout(this.model.timer);
							this.model.timer = setTimeout(function () {
								$(tooltip).fadeOut(500);
							}, 1200);
                    } else {
                        this.leftTooltip.setAttribute('opacity', 0);
                        this.rightTooltip.setAttribute('opacity', 0);
                    }
                }
                if (this.model.enableDeferredUpdate) {
                    this._calculateSelectedData();
                    if (!naviobj.grabbed || naviobj.isSelection) {
                        this._calculateSliderZoomFactPosition();
                        if (this.model.valueType == "datetime") {
                            if (this.previousSelectedRangeStart !== new Date(this.model.selectedRangeSettings.start).getTime() || this.previousSelectedRangeEnd !== new Date(this.model.selectedRangeSettings.end).getTime()) 
                                this._trigger("rangeChanged", this.model);
                        }
                        else {
                            if (this.previousSelectedRangeStart !== this.model.selectedRangeSettings.start || this.previousSelectedRangeEnd !== this.model.selectedRangeSettings.end)
                                this._trigger("rangeChanged", this.model);
                        }
                    }
                }
                if(naviobj.isSelection){
                    naviobj.isSelection = false;
                    this.renderer._setAttr($(this.selectionRect), { 'fill': 'transparent' });
                    this.renderer._setAttr($(this.selectionRect), { 'stroke': 'transparent' });
                }
            }
            this._setSelectedRange();
            if(ej.isTouchDevice() && this.model.rightClick != '' && new Date() - this._longPressTimer > 1500)
                this._trigger("rightClcik", {data:{event: evt}});
        },

        mouseup: function (evt) {
            if (this.dragTarget != null) {
                this._drop(evt);
                if (this.dragTarget != null) {
                    this.dragTarget.setAttributeNS(null, 'pointer-events', 'all');
                    this.dragTarget = null;
                }
                if (this.model.enableDeferredUpdate) {
                    this._calculateSelectedData();
                    this._calculateSliderZoomFactPosition();
                    this._trigger("rangeChanged", this.model);
                  
                }
            }
        },

        _setSelectedRange: function () {           
             
           this._selectedRangeStart(this.model.selectedRangeSettings.start);
           this._selectedRangeEnd(this.model.selectedRangeSettings.end);
          
        },

        GetTrueCoords: function (evt) {
            // find the current zoom level and pan setting, and adjust the reported
            //    mouse position accordingly
            var newScale = this.svgDocument.currentScale;
            var translation = this.svgDocument.currentTranslate;
            var matched = jQuery.uaMatch(navigator.userAgent);
            if (evt.originalEvent.toString() !== "[object TouchEvent]" && matched.browser.toLowerCase() != "msie") {
                this.trueCoords.x = (evt.clientX - translation.x) / newScale;
                this.trueCoords.y = (evt.clientY - translation.y) / newScale;
            }
            else if (matched.browser.toLowerCase() == "msie") {
                this.trueCoords.x = (evt.originalEvent.clientX - translation.x) / newScale;
                this.trueCoords.y = (evt.originalEvent.clientY - translation.y) / newScale;
            }
            else {
                this.trueCoords.x = (evt.originalEvent.touches[0].clientX - translation.x) / newScale;
                this.trueCoords.y = (evt.originalEvent.touches[0].clientY - translation.y) / newScale;
            }
        },

        _getLocalizedLabels: function(){
           return ej.getLocalizedConstants(this.sfType, this.model.locale);
       }
    });
    ej.datavisualization.RangeNavigator.Locale = ej.datavisualization.RangeNavigator.Locale || {};

    ej.datavisualization.RangeNavigator.Locale['default'] = ej.datavisualization.RangeNavigator.Locale['en-US'] = {
        intervals: {
            quarter: { longQuarters: "Quarter", shortQuarters: "Q" },
            week: { longWeeks: "Week", shortWeeks: "W" }
        }
     };
	  ej.datavisualization.RangeNavigator.Locale['fr-FR'] = {
        intervals: {
            quarter: { longQuarters: "Trimestre", shortQuarters: "T" },
            week: { longWeeks: "Semaine", shortWeeks: "S" }
        }
	 };
     ej.datavisualization.RangeNavigator.IntervalType = {

         Auto: 'auto', 

         Years: 'years',

         Quarters: 'quarters',

         Months: 'months',

         Weeks: 'weeks',

         Days: 'days',

         Hours: 'hours',

         Minutes: 'minutes'
     };

     ej.datavisualization.RangeNavigator.Position = {

         Top: 'top',        

         Bottom: 'bottom'      

         
     };

     ej.datavisualization.RangeNavigator.FontStyle = {

         Normal: 'normal',

         Italic: 'italic',

         Bold: 'bold'
     };

     ej.datavisualization.RangeNavigator.FontWeight = {

         Regular: 'regular',

         Bold: 'bold',

         Lighter: 'lighter'
     };

     ej.datavisualization.RangeNavigator.HorizontalAlignment = {

         Left: 'left',

         Right: 'right',

         Middle: 'middle'
     };
     ej.datavisualization.RangeNavigator.LabelPlacement = {

         Inside: 'inside',

         Outside: 'outside'
      
     }; 

	ej.datavisualization.RangeNavigator.LabelIntersectAction = {

         None: 'none',

         Hide: 'hide'
      
     }; 

     ej.datavisualization.RangeNavigator.ValueType = {

         Numeric: 'numeric',

         Datetime: 'datetime'

     };

     ej.datavisualization.RangeNavigator.RangePadding = {

         Additional: 'additional',

         Normal: 'normal',

         None: 'none',

         Round: 'round'        

     };
	 
	  ej.datavisualization.RangeNavigator.Theme = {

        Azure: 'azure',

        FlatLight: 'flatlight',

        Azuredark: 'azuredark',

        Lime: 'lime',

        LimeDark: 'limedark',

        Saffron: 'saffron',

        SaffronDark: 'saffrondark',

        GradientLight: 'gradientlight',

        GradientDark: 'gradientdark'
    };



})(jQuery, Syncfusion);

jQuery.uaMatch = function (ua) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
        [];

    return {
        browser: match[1] || "",
        version: match[2] || "0"
    };
};;
/* global jQuery, ej, window, document, navigator, clearInterval, setInterval */
ej.EjSvgScrollbarRender = function (element, scrollObj) {
    this.svgSupport = (window.SVGSVGElement) ? true : false;
    var id = jQuery(element).attr("id");
    this.scrollsvgObj = this.scrollsvgObj ? this.scrollsvgObj : [];
    if (this.svgSupport) {
        this.svgLink = "http://www.w3.org/2000/svg";
        this.scrollsvgObj[scrollObj.index] = document.createElementNS(this.svgLink, "svg");
        this.scrollsvgObj[scrollObj.index].setAttribute('id', "scrollbar_" + id + scrollObj.index);
    } else {
        var doc = document;
        this.scrollsvgObj[scrollObj.index] = doc.createElement("div");
        this.scrollsvgObj[scrollObj.index].style.position = 'relative';
        this.scrollsvgObj[scrollObj.index].setAttribute('id', "scrollbar_" + id + scrollObj.index);
    }
};

(function ($) {
    ej.EjSvgScrollbarRender.prototype = {

        _initializeScrollbarVariables: function (scrollObj) {
            scrollObj.offsetLeftX = 0
            scrollObj.rectWidth = scrollObj.offsetRightX = scrollObj.oldWidth = scrollObj.width;
            scrollObj.startX = 0, scrollObj.endX = 0;
            scrollObj.scrollbarLoaded = false;

            if (scrollObj.zoomPosition || scrollObj.zoomFactor) {
                scrollObj.offsetLeftX = (scrollObj.zoomPosition * scrollObj.width);
                scrollObj.rectWidth = (scrollObj.zoomFactor) * scrollObj.width;
            }
        },

        _scrollbarUpdate: function (scrollObj) {

            var width = parseFloat(scrollObj.width),
                arrowsize = 15,
                minimumRect = 44,
                panningRect = width - 30;// arrowSize * 2 
            scrollObj.offsetLeftX = !scrollObj.scrollbarLoaded ? scrollObj.offsetLeftX : (scrollObj.offsetLeftX - arrowsize);
            scrollObj.offsetLeftX = scrollObj.offsetLeftX < arrowsize ? 0 : scrollObj.offsetLeftX;
            var offsetLeftX = ((scrollObj.offsetLeftX / scrollObj.oldWidth) * panningRect) + arrowsize;
            var rectWidth = ((scrollObj.rectWidth / scrollObj.oldWidth) * panningRect),
            isMinWidth = rectWidth < minimumRect;
            scrollObj._diff = isMinWidth ? minimumRect - rectWidth : 0;
            rectWidth = rectWidth > minimumRect ? rectWidth : minimumRect;
            scrollObj.oldWidth = panningRect;
            var offsetRightX = offsetLeftX + rectWidth;
            scrollObj.rectWidth = rectWidth;
            scrollObj.offsetLeftX = scrollObj.startX = offsetLeftX;
            scrollObj.offsetRightX = (offsetRightX - arrowsize) <= offsetLeftX ? (offsetRightX + arrowsize) : offsetRightX;
            scrollObj.endX = scrollObj.width - scrollObj.offsetRightX;
            scrollObj.startX = offsetLeftX < arrowsize ? arrowsize : offsetLeftX;
            if ((offsetLeftX + rectWidth) > (scrollObj.width - arrowsize)) {
                scrollObj.offsetLeftX = scrollObj.startX = scrollObj.width - arrowsize - rectWidth;
                scrollObj.offsetRightX = scrollObj.width - arrowsize;
                scrollObj.endX = scrollObj.width - scrollObj.offsetRightX;
            }
            scrollObj.scrollbarLoaded = true;

        },

        _renderScrollbar: function (scrollObj) {

            this.scrollsvgObj = this.scrollsvgObj ? this.scrollsvgObj : [];
            $(this.scrollsvgObj[scrollObj.index]).empty();
            if (this.scrollsvgObj[scrollObj.index])
                $(document).find('[id*= ' + this.scrollsvgObj[scrollObj.index].id + ']').attr('height', '0px');
            var id = this._id;
            var arrowSize = 15;
            var scrollHeight = 18;
            var minimumScrollSize = 44;
            this.scrollsvgObj[scrollObj.index] = this.scrollbarContainer.scrollsvgObj[scrollObj.index];
            var height = 17, width = parseFloat(scrollObj.width), padding = 8, centerY = (height / 2), panningRect = width - (arrowSize * 2);
            scrollObj.offsetLeftX = !scrollObj.scrollbarLoaded ? scrollObj.offsetLeftX : (scrollObj.offsetLeftX - arrowSize);
            scrollObj.offsetLeftX = scrollObj.offsetLeftX < arrowSize ? 0 : scrollObj.offsetLeftX;
            var offsetLeftX = ((scrollObj.offsetLeftX / scrollObj.oldWidth) * panningRect) + arrowSize;
            var rectWidth = ((scrollObj.rectWidth / scrollObj.oldWidth) * panningRect),
            isMinWidth = rectWidth < minimumScrollSize;
            scrollObj._diff = isMinWidth ? minimumScrollSize - rectWidth : 0;
            rectWidth = rectWidth > minimumScrollSize ? rectWidth : minimumScrollSize;
            scrollObj.oldWidth = panningRect;
            offsetLeftX = ((offsetLeftX + rectWidth) > panningRect) ? (panningRect - (rectWidth - arrowSize)) : offsetLeftX;
            var offsetRightX = offsetLeftX + rectWidth;
            scrollObj.rectWidth = rectWidth;
            scrollObj.offsetLeftX = scrollObj.startX = offsetLeftX;
            scrollObj.offsetRightX = offsetLeftX + rectWidth;
            scrollObj.endX = scrollObj.width - scrollObj.offsetRightX;
            scrollObj.scrollbarLoaded = true;
            offsetRightX = (offsetRightX - arrowSize) <= offsetLeftX ? (offsetRightX + arrowSize) : offsetRightX;
            var xPadding = this.padding || 0;
            var yPadding = !this.vmlRendering ? 0 : -5;
            if (scrollObj.orientation == 'horizontal')
                this.scrollbar = this.renderer.createGroup({ 'id': id + '_scrollbar' + '_' + scrollObj.index, transform: "translate(" + xPadding + "," + yPadding + ")" });
            else
                this.scrollbar = this.renderer.createGroup({ 'id': id + '_scrollbar' + '_' + scrollObj.index, transform: "translate(" + 0 + "," + scrollObj.width + ") rotate(270)" });
            //Draw a rounded corner path direction
            var makeShape = function (x, y, width, height, r, scrollObj) {
                var
                    spc = " ", // path drawing instruction letters with readable names
                    moveTo = "M",
                    horizLineTo = "h",
                    vertLineTo = "v",
                    arcTo = "a",
                    closePath = "z",
                    ori = scrollObj.orientation,
                    opp = scrollObj.opposed,
                    dStr;
                if ((ori == 'vertical' && !opp) || (opp && ori != 'vertical')) {
                    dStr = // the "d" path for the svg path
                        moveTo + spc + x + spc + r + spc +
                        vertLineTo + spc + (height - r) + spc +
                        horizLineTo + spc + (width) + spc +
                        vertLineTo + spc + (r - height) + spc +
                        arcTo + spc + r + spc + r + spc + 0 + spc + 0 + spc + 0 + spc + (-r) + spc + (-r) + spc +
                        horizLineTo + spc + -(width - 2 * r) + spc +
                        arcTo + spc + r + spc + r + spc + 0 + spc + 0 + spc + 0 + spc + (-4) + spc + (r) + spc +
                        closePath;

                } else {
                    dStr = // the "d" path for the svg path
                        moveTo + spc + x + spc + y + spc +
                        vertLineTo + spc + (height - r) + spc +
                        arcTo + spc + r + spc + r + spc + 0 + spc + 0 + spc + 0 + spc + r + spc + r + spc +
                        horizLineTo + spc + (width - 2 * r) + spc +
                        arcTo + spc + r + spc + r + spc + 0 + spc + 0 + spc + 0 + spc + r + spc + (-r) + spc +
                        vertLineTo + spc + (r - height) + spc +
                        closePath;
                }

                return dStr;
            };
            var direction = makeShape(0, 0, width, scrollHeight, 4, scrollObj);

            //Create a scrollbar background rectangle
            var rectBorder = {
                'id': id + '_scrollbarBackRect_' + scrollObj.index,
                'stroke-width': 1,
                'height': scrollHeight,
                'width': width,
                'stroke-linejoin': "round",
                'stroke': "#B4B4B4",
                'fill': "#F7F7F7",
                'class': 'e-rangeScroll-backRect'
            };

            if (!this.vmlRendering) {
                rectBorder.d = direction;
                this.renderer.drawPath(rectBorder, this.scrollbar);
            } else
                this.renderer.drawRect(rectBorder, this.scrollbar);

            var rightRectBorder = {
                'id': id + '_scrollbarRightRect_' + scrollObj.index,
                'stroke-width': 1,
                'x': (width - 5),
                'height': scrollHeight,
                'width': 5,
                'stroke-linejoin': "round",
                'stroke': "transparent",
                'fill': "transparent"
            };
            this.renderer.drawRect(rightRectBorder, this.scrollbar);

            var leftRectBorder = {
                'id': id + '_scrollbarLeftRect_' + scrollObj.index,
                'stroke-width': 1,
                'x': 0,
                'height': scrollHeight,
                'width': 5,
                'stroke-linejoin': "round",
                'stroke': "transparent",
                'fill': "transparent"
            };
            this.renderer.drawRect(leftRectBorder, this.scrollbar);

            //Create a left Arrow
            var leftArrow = {
                'id': id + '_scrollbarLeftArrow_' + scrollObj.index,
                'stroke-width': 1,
                'stroke': "#999999",
                'd': "M " + 5 + " " + 9 + " " + "L " + 10 + " " + 14 + " " + "L " + 10 + " " + 3.5 + " Z",
                'fill': "#999999",
                'class': "e-rangeScroll-arrow"
            };
            this.renderer.drawPath(leftArrow, this.scrollbar);

            ////Create a right Arrow
            var rightArrow = {
                'id': id + '_scrollbarRightArrow_' + scrollObj.index,
                'stroke-width': 1,
                'stroke': "#999999",
                'd': "M " + (width - 5) + " " + 9 + " " + "L " + (width - 10) + " " + 14 + " " + "L " + (width - 10) + " " + 3.5 + " Z",
                'fill': "#999999",
                'class': "e-rangeScroll-arrow"
            };
            this.renderer.drawPath(rightArrow, this.scrollbar);

            var options = {
                'id': id + '_scrollbarSelect_' + scrollObj.index,
                x: offsetLeftX,
                y: 0,
                'width': rectWidth,
                'rx': 4,
                'ry': 4,
                'height': height,
                'stroke': "#999999",
                'stroke-width': 1,
                'fill': "#CECECE",
                'class': 'e-rangeScroll-select'
            };
            this.renderer.drawRect(options, this.scrollbar);
            this.centerLine = this.renderer.createGroup({ 'id': id + '_scrollbarCenterLine_' + scrollObj.index, transform: "translate(" + (offsetLeftX + (rectWidth / 2) - 7.5) + ")" });

            //Create a center shape
            var shape = {
                'id': id + '_scrollbarCenterShape_' + scrollObj.index,
                'stroke-width': 1,
                'stroke': "#999999",
                'd': "M " + 0 + " " + 3.5 + " " + "L " + 0 + " " + 13.5 + " Z" + "M " + 5 + " " + 3.5 + " " + "L " + 5 + " " + 13.5 + " Z" + "M " + 10 + " " + 3.5 + " " + "L " + 10 + " " + 13.5 + " Z" + "M " + 15 + " " + 3.5 + " " + "L " + 15 + " " + 13.5 + " Z",
                'fill': "#999999",
                'class': 'e-rangeScroll-centerShape'
            };
            this.renderer.drawPath(shape, this.centerLine);
            this.renderer.append(this.centerLine, this.scrollbar);
            var leftHeaderHideRectOptions = {
                'id': id + '_leftHeaderHideRect_' + scrollObj.index,
                'x': offsetLeftX,
                'y': 0,
                'width': 11,
                'height': 17,
                'fill': 'transparent',
                'opacity': 0,
                'stroke-width': 1,
                'class': 'e-rangeScroll-leftRect'
            }
            this.renderer.drawRect(leftHeaderHideRectOptions, this.scrollbar);
            var leftHeaderOptions = {
                'id': id + '_scrollbarLeftHeader_' + scrollObj.index,
                'cx': offsetLeftX + padding,
                'cy': centerY,
                'r': 3,
                "fill": "#999999",
                'stroke': "#999999",
                'stroke-width': 1,
                'class': 'e-rangeScroll-leftCircle'
            };
            this.renderer.drawCircle(leftHeaderOptions, this.scrollbar);
            var rightHeaderHideRectOptions = {
                'id': id + '_rightHeaderHideRect_' + scrollObj.index,
                'x': offsetRightX - 11,
                'y': 0,
                'width': 11,
                'height': height,
                'fill': 'transparent',
                'opacity': 0,
                'stroke-width': 1,
                'class': 'e-rangeScroll-rightRect'
            };
            this.renderer.drawRect(rightHeaderHideRectOptions, this.scrollbar);
            var rightHeaderOptions = {
                'id': id + '_scrollbarRightHeader_' + scrollObj.index,
                "fill": "#999999",
                'cx': offsetRightX - padding,
                'cy': centerY,
                'r': 3,
                'stroke': "#999999",
                'stroke-width': 1,
                'class': 'e-rangeScroll-rightCircle'
            };
            this.renderer.drawCircle(rightHeaderOptions, this.scrollbar);

            this.renderer.append(this.scrollbar, this.scrollsvgObj[scrollObj.index]);
            if (scrollObj.orientation == 'horizontal') {
                this.scrollsvgObj[scrollObj.index].setAttribute("height", scrollHeight);
                this.scrollsvgObj[scrollObj.index].setAttribute("width", width);
            } else {
                this.scrollsvgObj[scrollObj.index].setAttribute("height", width);
                this.scrollsvgObj[scrollObj.index].setAttribute("width", scrollHeight);
            }
            this.renderer.append(this.scrollsvgObj[scrollObj.index], scrollObj.parent);

            //Apply CSS styles to scrollbar controls          
            var vmlPadding = !this.vmlRendering ? scrollObj.y : scrollObj.y + 5;
            if (this.pluginName == "ejRangeNavigator")
                this.scrollsvgObj[scrollObj.index].setAttribute('style', 'overflow:visible;position:relative;display:block; top:' + (vmlPadding - scrollObj.y) + 'px;' + 'left:' + scrollObj.x + 'px');
            else
                this.scrollsvgObj[scrollObj.index].setAttribute('style', 'overflow:visible;position:absolute;display:block; top:' + vmlPadding + 'px;' + 'left:' + scrollObj.x + 'px');
            $("#" + id + "_scrollbarSelect_" + scrollObj.index).css({ "cursor": "pointer" });
            if (scrollObj.enableResize) {
                $("#" + id + "_leftHeaderHideRect_" + scrollObj.index).css({ "cursor": scrollObj.orientation == 'horizontal' ? "w-resize" : "n-resize" });
                $("#" + id + "_rightHeaderHideRect_" + scrollObj.index).css({ "cursor": scrollObj.orientation == 'horizontal' ? "w-resize" : "n-resize" });
                $("#" + id + "_scrollbarRightHeader_" + scrollObj.index).css({ "cursor": scrollObj.orientation == 'horizontal' ? "w-resize" : "n-resize" });
                $("#" + id + "_scrollbarLeftHeader_" + scrollObj.index).css({ "cursor": scrollObj.orientation == 'horizontal' ? "w-resize" : "n-resize" });
            } else {
                $("#" + id + "_leftHeaderHideRect_" + scrollObj.index).hide();
                $("#" + id + "_rightHeaderHideRect_" + scrollObj.index).hide();
                $("#" + id + '_scrollbarLeftHeader_' + scrollObj.index).hide();
                $("#" + id + '_scrollbarRightHeader_' + scrollObj.index).hide();
            }

            if (this.vmlRendering) {
                $('#' + id + '_leftHeaderHideRect_' + scrollObj.index).css("visibility", 'hidden');
                $('#' + id + '_rightHeaderHideRect_' + scrollObj.index).css("visibility", 'hidden');
            }

            this.scrollbarContainer._bindScrollEvents.call(this, scrollObj);
        },

        _bindScrollEvents: function (scrollObj) {
            //Binding Mouse Events to scrollbar
            var rootId = this._id;
            var matched = jQuery.uaMatch(navigator.userAgent);
            var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
            bindDesktopEvents.call(this, scrollObj);
            if (window.PointerEvent) { //Added pointer event for IE11

                this._on($('#' + rootId + '_scrollbarLeftHeader_' + scrollObj.index), "pointerdown", this.scrollbarContainer._leftScrollbarDown);
                this._on($('#' + rootId + '_scrollbarRightHeader_' + scrollObj.index), "pointerdown", this.scrollbarContainer._rightScrollbarDown);

                this._on($('#' + rootId + '_leftHeaderHideRect_' + scrollObj.index), "pointerdown", this.scrollbarContainer._leftScrollbarDown);
                this._on($('#' + rootId + '_rightHeaderHideRect_' + scrollObj.index), "pointerdown", this.scrollbarContainer._rightScrollbarDown);

                this._on($('#' + rootId + '_scrollbarLeftArrow_' + scrollObj.index), "pointerdown", this.scrollbarContainer._leftArrowDown);
                this._on($('#' + rootId + '_scrollbarLeftArrow_' + scrollObj.index), "pointerup", this.scrollbarContainer._leftArrowUp);

                this._on($('#' + rootId + '_scrollbarRightArrow_' + scrollObj.index), "pointerdown", this.scrollbarContainer._rightArrowDown);
                this._on($('#' + rootId + '_scrollbarRightArrow_' + scrollObj.index), "pointerup", this.scrollbarContainer._rightArrowUp);

                this._on($('#' + rootId + '_scrollbarSelect_' + scrollObj.index), "pointerdown", this.scrollbarContainer._scrollSelectRectDown);
                this._on($('#' + rootId + '_scrollbarBackRect_' + scrollObj.index), "pointerdown", this.scrollbarContainer._scrollBackRectDown);
                this._on($('#' + rootId + '_scrollbarBackRect_' + scrollObj.index), "pointerup", this.scrollbarContainer._scrollBackRectUp);

                this._on($(window), "pointermove", this.scrollbarContainer._scrollbarMove);
                this._on($(window), "pointerup", this.scrollbarContainer._scrollbarUp);
                this._on($(this.scrollsvgObj[scrollObj.index]), "pointermove", this.scrollbarContainer._scrollbarMove);
                this._on($(this.scrollsvgObj[scrollObj.index]), "pointerup", this.scrollbarContainer._scrollbarUp);

                $(this.scrollsvgObj[scrollObj.index]).css('touch-action', 'none');
            }
            else if (window.navigator.msPointerEnabled && !isIE11) {

                this._on($('#' + rootId + '_scrollbarLeftHeader_' + scrollObj.index), "MSPointerDown", this.scrollbarContainer._leftScrollbarDown);
                this._on($('#' + rootId + '_scrollbarRightHeader_' + scrollObj.index), "MSPointerDown", this.scrollbarContainer._rightScrollbarDown);

                this._on($('#' + rootId + '_leftHeaderHideRect_' + scrollObj.index), "MSPointerDown", this.scrollbarContainer._leftScrollbarDown);
                this._on($('#' + rootId + '_rightHeaderHideRect_' + scrollObj.index), "MSPointerDown", this.scrollbarContainer._rightScrollbarDown);

                this._on($('#' + rootId + '_scrollbarLeftArrow_' + scrollObj.index), "MSPointerDown", this.scrollbarContainer._leftArrowDown);
                this._on($('#' + rootId + '_scrollbarLeftArrow_' + scrollObj.index), "MSPointerUp", this.scrollbarContainer._leftArrowUp);

                this._on($('#' + rootId + '_scrollbarRightArrow_' + scrollObj.index), "MSPointerDown", this.scrollbarContainer._rightArrowDown);
                this._on($('#' + rootId + '_scrollbarRightArrow_' + scrollObj.index), "MSPointerUp", this.scrollbarContainer._rightArrowUp);

                this._on($('#' + rootId + '_scrollbarSelect_' + scrollObj.index), "MSPointerDown", this.scrollbarContainer._scrollSelectRectDown);
                this._on($('#' + rootId + '_scrollbarBackRect_' + scrollObj.index), "MSPointerDown", this.scrollbarContainer._scrollBackRectDown);
                this._on($('#' + rootId + '_scrollbarBackRect_' + scrollObj.index), "MSPointerUp", this.scrollbarContainer._scrollBackRectUp);

                this._on($(window), "MSPointerMove", this.scrollbarContainer._scrollbarMove);
                this._on($(window), "MSPointerUp", this.scrollbarContainer._scrollbarUp);
                this._on($(this.scrollsvgObj[scrollObj.index]), "MSPointerMove", this.scrollbarContainer._scrollbarMove);
                this._on($(this.scrollsvgObj[scrollObj.index]), "MSPointerUp", this.scrollbarContainer._scrollbarUp);

                $(this.scrollsvgObj[scrollObj.index]).css('-ms-touch-action', 'none');

            } else if (matched.browser.toLowerCase() == "chrome") {
                bindTouchEvents.call(this, scrollObj);
            } else if (this.isDevice()) {

                var isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
                var isInIframe = (window.location != window.parent.location) ? true : false;
                var userAgent = isInIframe ? window.parent.navigator.userAgent.toLowerCase() : window.navigator.userAgent.toLowerCase();
                var device = /mobile|tablet|android|kindle/i.test(userAgent);
                if ((ej.isMobile() && this.isWindows()) || (!device && ej.isMobile() && isSafari)) { // for safari mobile browser and windows phone                    
                    bindDesktopEvents.call(this);
                    $(this.scrollsvgObj[scrollObj.index]).css('-ms-touch-action', 'none');
                } else
                    bindTouchEvents.call(this, scrollObj);
            }
            var eventName = matched.browser.toLowerCase() == "mozilla" ? (isIE11 ? "mousewheel" : "DOMMouseScroll") : "mousewheel";
            this._on($(this.scrollsvgObj[scrollObj.index]), eventName, this.scrollbarContainer._scrollMouseWheel);

            if (isIE11)
                $(this.scrollsvgObj[scrollObj.index]).css('touch-action', 'none');

            function bindDesktopEvents(scrollObj) {
                this._on($('#' + rootId + '_scrollbarLeftHeader_' + scrollObj.index), "mousedown", this.scrollbarContainer._leftScrollbarDown);
                this._on($('#' + rootId + '_scrollbarRightHeader_' + scrollObj.index), "mousedown", this.scrollbarContainer._rightScrollbarDown);

                this._on($('#' + rootId + '_leftHeaderHideRect_' + scrollObj.index), "mousedown", this.scrollbarContainer._leftScrollbarDown);
                this._on($('#' + rootId + '_rightHeaderHideRect_' + scrollObj.index), "mousedown", this.scrollbarContainer._rightScrollbarDown);

                this._on($('#' + rootId + '_scrollbarLeftArrow_' + scrollObj.index), "mousedown", this.scrollbarContainer._leftArrowDown);
                this._on($('#' + rootId + '_scrollbarLeftArrow_' + scrollObj.index), "mouseup", this.scrollbarContainer._leftArrowUp);

                this._on($('#' + rootId + '_scrollbarRightArrow_' + scrollObj.index), "mousedown", this.scrollbarContainer._rightArrowDown);
                this._on($('#' + rootId + '_scrollbarRightArrow_' + scrollObj.index), "mouseup", this.scrollbarContainer._rightArrowUp);

                this._on($('#' + rootId + '_scrollbarSelect_' + scrollObj.index), "mousedown", this.scrollbarContainer._scrollSelectRectDown);
                this._on($('#' + rootId + '_scrollbarBackRect_' + scrollObj.index), "mousedown", this.scrollbarContainer._scrollBackRectDown);
                this._on($('#' + rootId + '_scrollbarBackRect_' + scrollObj.index), "mouseup", this.scrollbarContainer._scrollBackRectUp);

                this._on($(window), "mousemove", this.scrollbarContainer._scrollbarMove);
                this._on($(window), "mouseup", this.scrollbarContainer._scrollbarUp);
                this._on($(this.svgObject), "mousemove", this.scrollbarContainer._scrollbarMove);
                this._on($(this.scrollsvgObj[scrollObj.index]), "mousemove", this.scrollbarContainer._scrollbarMove);
                this._on($(this.scrollsvgObj[scrollObj.index]), "mouseup", this.scrollbarContainer._scrollbarUp);
            }

            function bindTouchEvents(scrollObj) {
                this._on($('#' + rootId + '_scrollbarLeftHeader_' + scrollObj.index), "touchstart", this.scrollbarContainer._leftScrollbarDown);
                this._on($('#' + rootId + '_scrollbarRightHeader_' + scrollObj.index), "touchstart", this.scrollbarContainer._rightScrollbarDown);

                this._on($('#' + rootId + '_leftHeaderHideRect_' + scrollObj.index), "touchstart", this.scrollbarContainer._leftScrollbarDown);
                this._on($('#' + rootId + '_rightHeaderHideRect_' + scrollObj.index), "touchstart", this.scrollbarContainer._rightScrollbarDown);

                this._on($('#' + rootId + '_scrollbarLeftArrow_' + scrollObj.index), "touchstart", this.scrollbarContainer._leftArrowDown);
                this._on($('#' + rootId + '_scrollbarLeftArrow_' + scrollObj.index), "touchend", this.scrollbarContainer._leftArrowUp);

                this._on($('#' + rootId + '_scrollbarRightArrow_' + scrollObj.index), "touchstart", this.scrollbarContainer._rightArrowDown);
                this._on($('#' + rootId + '_scrollbarRightArrow_' + scrollObj.index), "touchend", this.scrollbarContainer._rightArrowUp);

                this._on($('#' + rootId + '_scrollbarSelect_' + scrollObj.index), "touchstart", this.scrollbarContainer._scrollSelectRectDown);
                this._on($('#' + rootId + '_scrollbarBackRect_' + scrollObj.index), "touchstart", this.scrollbarContainer._scrollBackRectDown);
                this._on($('#' + rootId + '_scrollbarBackRect_' + scrollObj.index), "touchend", this.scrollbarContainer._scrollBackRectUp);

                this._on($(window), "touchmove", this.scrollbarContainer._scrollbarMove);
                this._on($(window), "touchend", this.scrollbarContainer._scrollbarUp);
                this._on($(this.scrollsvgObj[scrollObj.index]), "touchmove", this.scrollbarContainer._scrollbarMove);
                this._on($(this.scrollsvgObj[scrollObj.index]), "touchend", this.scrollbarContainer._scrollbarUp);

            }
        },

        _setScrollPosition: function (startX, offsetRightX, scrollObj) {
            var padding = 8;
            var rootId = this._id;
            var centerLine = (startX + (scrollObj.rectWidth / 2) - 7.5);
            $('#' + rootId + '_scrollbarLeftHeader_' + scrollObj.index).attr("cx", startX + padding);
            $('#' + rootId + '_leftHeaderHideRect_' + scrollObj.index).attr("x", startX);

            $('#' + rootId + '_scrollbarRightHeader_' + scrollObj.index).attr("cx", offsetRightX - padding);
            $('#' + rootId + '_rightHeaderHideRect_' + scrollObj.index).attr("x", offsetRightX - 5);
            $('#' + rootId + '_scrollbarSelect_' + scrollObj.index).attr("x", startX);
            $('#' + rootId + '_scrollbarSelect_' + scrollObj.index).attr("width", scrollObj.rectWidth);
            $('#' + rootId + '_scrollbarCenterLine_' + scrollObj.index).attr('transform', 'translate(' + centerLine + ')');
            //Apply styles for VML support
            if (this.pluginName == "ejRangeNavigator") {
                $('#' + rootId + '_scrollbarLeftHeader_' + scrollObj.index).css("left", startX);
                $('#' + rootId + '_leftHeaderHideRect_' + scrollObj.index).css("left", startX);
                $('#' + rootId + '_scrollbarRightHeader_' + scrollObj.index).css("left", offsetRightX - padding);
                $('#' + rootId + '_rightHeaderHideRect_' + scrollObj.index).css("left", offsetRightX - 5);
                $('#' + rootId + '_scrollbarSelect_' + scrollObj.index).css("left", startX);
                $('#' + rootId + '_scrollbarCenterLine_' + scrollObj.index).css('left', centerLine);
            }
        },
        _calculateScrollLeftMove: function (moveLength, scrollObj) {

            if (scrollObj._startX - moveLength > 15) {
                scrollObj.startX = scrollObj._startX - moveLength;
                scrollObj.offsetLeftX = scrollObj.startX;
                scrollObj._offsetRightX = scrollObj.startX + scrollObj.rectWidth;
                scrollObj.offsetRightX = scrollObj._offsetRightX;
                scrollObj.endX = scrollObj.width - scrollObj.offsetRightX;
            } else {
                scrollObj.startX = 15;
                scrollObj._offsetLeftX = scrollObj.offsetLeftX;
                scrollObj.offsetLeftX = scrollObj.startX;
                scrollObj._offsetRightX = scrollObj.startX + scrollObj.rectWidth;
                scrollObj.offsetRightX = scrollObj._offsetRightX;
                scrollObj.endX = scrollObj.width - scrollObj.offsetRightX;
            }
        },
        _calculateScrollRightMove: function (moveLength, scrollObj) {
            if (scrollObj && (scrollObj._offsetRightX + (Math.abs(moveLength))) < scrollObj.width - 15) {
                scrollObj._startX = scrollObj.startX + Math.abs(moveLength);
                scrollObj.offsetLeftX = scrollObj._startX;
                scrollObj.offsetRightX = scrollObj._offsetRightX + Math.abs(moveLength);
                scrollObj.endX = scrollObj.width - scrollObj.offsetRightX;
            } else {
                scrollObj._ofsetRightX = scrollObj.offsetRightX;
                scrollObj.offsetRightX = scrollObj.width - 15;
                scrollObj._startX = scrollObj.offsetRightX - scrollObj.rectWidth;
                scrollObj.offsetLeftX = scrollObj._startX;
                scrollObj.endX = scrollObj.width - scrollObj.offsetRightX;
            }
        },
        _calculateRange: function (startX, endX, scrollObj) {

            var zoomPos, zoomFactor, scrollRange, start, end, padding = 30, startArgs, endArgs;

            //Modify scrollbar center rectangle position on mouse move
            zoomPos = (startX - 15) / (scrollObj.width - padding - scrollObj._diff);
            scrollRange = scrollObj.scrollRange;
            zoomFactor = ((scrollObj.rectWidth - scrollObj._diff) / (scrollObj.width - padding - scrollObj._diff));
            if (!scrollObj.isRTL) {
                start = scrollRange.min + zoomPos * scrollRange.delta;
                end = start + zoomFactor * scrollRange.delta;
            } else {
                end = scrollRange.max - zoomPos * scrollRange.delta;
                start = end - zoomFactor * scrollRange.delta;
            }
            if (scrollObj.valueType == "datetime") {
                startArgs = scrollObj.startDateTime;
                endArgs = scrollObj.endDateTime;
                scrollObj.startDateTime = this.startDateTime = start = new Date(start);
                scrollObj.endDateTime = this.endDateTime = end = new Date(end);
            } else {
                startArgs = parseInt(scrollObj.startValue);
                endArgs = parseInt(scrollObj.endValue);
                scrollObj.startValue = this.startValue = start = Math.ceil(start);
                scrollObj.endValue = this.endValue = end = Math.ceil(end);
            }

            //Bind event on changing scrollbar position 
            scrollObj._scrollChanged = true;
            var commonEventArgs = $.extend({}, ej.EjSvgRender.commonChartEventArgs);
            commonEventArgs.data = {
                zoomPosition: zoomPos, zoomFactor: zoomFactor,
                oldRange: {
                    start: startArgs,
                    end: endArgs
                },
                newRange: {
                    start: start,
                    end: end
                }
            };

            scrollObj.zoomPosition = zoomPos;
            scrollObj.zoomFactor = zoomFactor;

            return commonEventArgs;
        },
        _calculateScrollPosition: function (mouseX, scrollObj) {
            var zoomPos, zoomFact, scrollRange, start, end, startArgs, endArgs, width,
                padding = 30, offset = 15, valueType, startRange, minScrollWidth = 36;

            if (this.leftScrollbarClicked && scrollObj.enableResize) {
                mouseX = mouseX >= offset ? mouseX : offset;
                mouseX = (mouseX >= offset && mouseX < scrollObj.offsetRightX - offset) ? mouseX : scrollObj.offsetRightX - offset;
                zoomPos = (mouseX - minScrollWidth) / (scrollObj.width - padding);
                zoomFact = scrollObj.rectWidth / (scrollObj.width - padding);

                valueType = scrollObj.valueType.toLowerCase();
                scrollRange = scrollObj.scrollRange;
                if (!scrollObj.isRTL) {
                    start = scrollRange.min + zoomPos * scrollRange.delta;
                    start = start > scrollRange.min ? start : scrollRange.min;
                    if (valueType == "datetime") {
                        startArgs = scrollObj.startDateTime;
                        endArgs = scrollObj.endDateTime;
                        scrollObj.startDateTime = this.startDateTime = start = new Date(start), end = scrollObj.endDateTime;
                    }
                    else {
                        startArgs = parseInt(scrollObj.startValue);
                        endArgs = parseInt(scrollObj.endValue);
                        scrollObj.startValue = this.startValue = start = Math.ceil(start), end = Math.ceil(scrollObj.endValue);
                    }
                } else {
                    end = scrollRange.max - zoomPos * scrollRange.delta;
                    end = end < scrollRange.max ? end : scrollRange.max;
                    if (valueType == "datetime") {
                        startArgs = scrollObj.startDateTime;
                        endArgs = scrollObj.endDateTime;
                        scrollObj.endDateTime = this.endDateTime = end = new Date(end), start = scrollObj.startDateTime;
                    }
                    else {
                        startArgs = parseInt(scrollObj.startValue);
                        endArgs = parseInt(scrollObj.endValue);
                        scrollObj.endValue = this.endValue = end = Math.ceil(end), start = Math.ceil(scrollObj.startValue);
                    }
                }
                //Bind event on changing scrollbar position 
                var commonEventArgs = $.extend({}, ej.EjSvgRender.commonChartEventArgs);
                commonEventArgs.data = {
                    zoomPosition: zoomPos, zoomFactor: zoomFact,
                    oldRange: {
                        start: startArgs,
                        end: endArgs
                    },
                    newRange: {
                        start: start,
                        end: end
                    }
                };
                scrollObj._scrollChanged = true;
                scrollObj.zoomPosition = zoomPos;
                scrollObj.zoomFactor = zoomFact;

                return commonEventArgs;
            }
            if (this.rightScrollbarClicked && scrollObj.enableResize) {
                scrollRange = scrollObj.scrollRange;
                zoomFact = scrollObj.rectWidth / (scrollObj.width - padding);
                zoomPos = scrollObj.zoomPosition;
                valueType = scrollObj.valueType.toLowerCase();
                if (!scrollObj.isRTL) {
                    startRange = scrollRange.min + zoomPos * scrollRange.delta;
                    end = startRange + zoomFact * scrollRange.delta;
                    if (valueType == "datetime") {
                        startArgs = scrollObj.startDateTime;
                        endArgs = scrollObj.endDateTime;
                        scrollObj.endDateTime = this.endDateTime = end = new Date(end), start = scrollObj.startDateTime;
                    }
                    else {
                        startArgs = parseInt(scrollObj.startValue);
                        endArgs = parseInt(scrollObj.endValue);
                        scrollObj.endValue = this.endValue = end = Math.floor(end), start = Math.ceil(scrollObj.startValue);
                    }
                } else {
                    zoomPos = (mouseX - minScrollWidth) / (scrollObj.width - padding);
                    start = scrollRange.max - zoomPos * scrollRange.delta;
                    if (valueType == "datetime") {
                        startArgs = scrollObj.startDateTime;
                        endArgs = scrollObj.endDateTime;
                        scrollObj.startDateTime = this.startDateTime = start = new Date(start), end = scrollObj.endDateTime;
                    }
                    else {
                        startArgs = parseInt(scrollObj.startValue);
                        endArgs = parseInt(scrollObj.endValue);
                        scrollObj.startValue = this.startValue = start = Math.floor(start), end = Math.ceil(scrollObj.endValue);
                    }
                }

                //Bind event on changing scrollbar position 
                var commonEventArgs = $.extend({}, ej.EjSvgRender.commonChartEventArgs);
                commonEventArgs.data = {
                    zoomPosition: scrollObj.zoomPosition ? scrollObj.zoomPosition : 0, zoomFactor: zoomFact,
                    oldRange: {
                        start: startArgs,
                        end: endArgs
                    },
                    newRange: {
                        start: start,
                        end: end
                    }
                };
                scrollObj._scrollChanged = true;
                scrollObj.zoomFactor = zoomFact;

                return commonEventArgs;
            }
            if (scrollObj && this.scrollRectClicked) {
                var moveLength = this.mouseDownPos - mouseX;
                if (moveLength > 0 && scrollObj.offsetLeftX >= 0) {
                    this.scrollbarContainer._calculateScrollLeftMove.call(this, moveLength, scrollObj);
                    return this.scrollbarContainer._calculateRange.call(this, scrollObj.startX, scrollObj.offsetRightX, scrollObj);
                }
                if (moveLength < 0) {
                    this.scrollbarContainer._calculateScrollRightMove.call(this, moveLength, scrollObj);
                    return this.scrollbarContainer._calculateRange.call(this, scrollObj._startX, scrollObj.offsetRightX, scrollObj);
                }
            }
        },

        _scrollbarMove: function (evt) {

            this.moveClientX = !ej.isNullOrUndefined(evt.clientX) ? evt.clientX : (evt.originalEvent.clientX == null ? evt.originalEvent.touches[0].clientX : evt.originalEvent.clientX);
            if (this.moveClientX != this.downClientX) {//update scrollbar only on mouse move
                var zoomPos, axis, start, end, width, padding = 8, minScrollWidth = 34, mouseX, centerLine;
                var rangePadding = this.model.padding || 0;
                var matched = jQuery.uaMatch(navigator.userAgent);
                var scrollObj = this.scrollbarContainer._doScrollIndex.call(this, evt);
                if (!scrollObj) return 0;

                this.lastIndex = scrollObj.index;
                if (((!this.vmlRendering && evt.originalEvent.toString() !== "[object TouchEvent]") && matched.browser.toLowerCase() != "msie") || (this.vmlRendering))
                    mouseX = (scrollObj.orientation == 'horizontal' ? this.calMousePosition(evt).X - scrollObj.x : scrollObj.width - (this.calMousePosition(evt).Y - scrollObj.y)) - rangePadding;
                else
                    mouseX = (scrollObj.orientation == 'horizontal' ? this.calTouchPosition(evt).X - scrollObj.x : scrollObj.width - (this.calTouchPosition(evt).Y - scrollObj.y)) - rangePadding;

                this.mouseX = mouseX;
                var rootId = this._id;
                if (this.leftScrollbarClicked && scrollObj.enableResize) {


                    if (scrollObj && (mouseX > minScrollWidth || mouseX > 23) && mouseX < scrollObj.offsetRightX - minScrollWidth) {
                        scrollObj.rectWidth = scrollObj.width - (scrollObj.endX + mouseX - padding);
                        centerLine = ((mouseX - padding) + (scrollObj.rectWidth / 2) - 7.5);
                        $('#' + rootId + '_scrollbarLeftHeader_' + scrollObj.index).attr("cx", mouseX);
                        $('#' + rootId + '_leftHeaderHideRect_' + scrollObj.index).attr("x", mouseX - 7.5);
                        $('#' + rootId + '_scrollbarSelect_' + scrollObj.index).attr('x', mouseX - padding);
                        $('#' + rootId + '_scrollbarSelect_' + scrollObj.index).attr("width", scrollObj.rectWidth);
                        $('#' + rootId + '_scrollbarCenterLine_' + scrollObj.index).attr('transform', 'translate(' + centerLine + ')');
                        //Apply styles for VML support
                        if (this.pluginName == "ejRangeNavigator") {
                            $('#' + rootId + '_scrollbarLeftHeader_' + scrollObj.index).css("left", mouseX);
                            $('#' + rootId + '_leftHeaderHideRect_' + scrollObj.index).css("left", mouseX - 7.5);
                            $('#' + rootId + '_scrollbarSelect_' + scrollObj.index).css('left', mouseX);
                            $('#' + rootId + '_scrollbarSelect_' + scrollObj.index).css("width", scrollObj.rectWidth);
                            $('#' + rootId + '_scrollbarCenterLine_' + scrollObj.index).css('left', centerLine);
                        }
                        scrollObj.offsetLeftX = scrollObj.startX = mouseX - 8;
                        this.scrollbarContainer._scrollStartArgs.call(this, scrollObj);
                        this.scrollbarContainer._scrollChangeArgs.call(this, scrollObj);
                        scrollObj._diff = 0;
                    } else if (mouseX > scrollObj.offsetRightX - minScrollWidth)
                        this.rectWidth = 42.89984101748814;
                }
                if (this.rightScrollbarClicked && scrollObj.enableResize) {
                    if (scrollObj && (mouseX <= scrollObj.width - minScrollWidth || mouseX <= scrollObj.width - 23) && mouseX > scrollObj.offsetLeftX + minScrollWidth) {
                        scrollObj.rectWidth = mouseX - scrollObj.offsetLeftX + padding;
                        centerLine = (scrollObj.offsetLeftX + (scrollObj.rectWidth / 2) - 7.5);
                        $('#' + rootId + '_scrollbarRightHeader_' + scrollObj.index).attr("cx", mouseX);
                        $('#' + rootId + '_rightHeaderHideRect_' + scrollObj.index).attr("x", mouseX - 2.5);
                        $('#' + rootId + '_scrollbarSelect_' + scrollObj.index).attr("width", scrollObj.rectWidth);
                        $('#' + rootId + '_scrollbarCenterLine_' + scrollObj.index).attr('transform', 'translate(' + centerLine + ')');
                        //Apply styles for VML support
                        if (this.pluginName == "ejRangeNavigator") {
                            $('#' + rootId + '_scrollbarRightHeader_' + scrollObj.index).css("left", mouseX);
                            $('#' + rootId + '_rightHeaderHideRect_' + scrollObj.index).css("left", mouseX - 2.5);
                            $('#' + rootId + '_scrollbarSelect_' + scrollObj.index).css("width", scrollObj.rectWidth);
                            $('#' + rootId + '_scrollbarCenterLine_' + scrollObj.index).css('left', centerLine);
                        }
                        scrollObj.offsetRightX = mouseX + padding;
                        scrollObj.endX = scrollObj.width - mouseX - padding;
                        // this.scrollbarContainer._calculateScrollPosition.call(this, mouseX, scrollObj);
                        this.scrollbarContainer._scrollStartArgs.call(this, scrollObj);
                        this.scrollbarContainer._scrollChangeArgs.call(this, scrollObj);
                        scrollObj._diff = 0;
                    }

                }
                if (this.scrollRectClicked) {
                    var moveLength = this.mouseDownPos - mouseX;
                    scrollObj._startX = ej.isNullOrUndefined(scrollObj._startX) ? scrollObj.startX : scrollObj._startX;
                    if (scrollObj && moveLength > 0 && scrollObj.offsetLeftX >= 0) {
                        this.scrollbarContainer._calculateScrollLeftMove.call(this, moveLength, scrollObj);
                        this.scrollbarContainer._setScrollPosition.call(this, scrollObj.startX, scrollObj.offsetRightX, scrollObj);
                        if (scrollObj.offsetLeftX > 15 || scrollObj.offsetLeftX != scrollObj._offsetLeftX) {
                            this.scrollbarContainer._scrollStartArgs.call(this, scrollObj);
                            this.scrollbarContainer._scrollChangeArgs.call(this, scrollObj);
                        }
                    }

                    if (scrollObj && moveLength < 0) {
                        if (ej.isNullOrUndefined(scrollObj._offsetRightX)) {
                            this.scrollbarContainer._scrollSelectRectDown.call(this, evt);
                            this.scrollbarContainer._scrollbarMove.call(this, evt);
                        }
                        this.scrollbarContainer._calculateScrollRightMove.call(this, moveLength, scrollObj);
                        this.scrollbarContainer._setScrollPosition.call(this, scrollObj._startX, (scrollObj._startX + scrollObj.rectWidth), scrollObj);
                        if (scrollObj.offsetRightX < scrollObj.width - 15 || scrollObj.offsetRightX != scrollObj._ofsetRightX) {
                            this.scrollbarContainer._scrollStartArgs.call(this, scrollObj);
                            if (this.model.enableDeferredUpdate === false || scrollObj.isZooming || this.model.scrollChanged != '') {
                                var commonEventArgs = this.scrollbarContainer._calculateRange.call(this, scrollObj._startX, (scrollObj._startX + scrollObj.rectWidth), scrollObj);
                                var oldRange = commonEventArgs.data.oldRange,
                                    newRange = commonEventArgs.data.newRange, oldStart, oldEnd, newStart, newEnd;
                                if (scrollObj.valueType.toLowerCase() == 'datetime') {
                                    oldStart = Date.parse(oldRange.start), newStart = Date.parse(newRange.start),
                                        oldEnd = Date.parse(oldRange.end), newEnd = Date.parse(newRange.end);
                                } else {
                                    oldStart = oldRange.start, newStart = newRange.start,
                                        oldEnd = oldRange.end, newEnd = newRange.end;
                                }
                                if (this.model.scrollChanged != '' && ((oldStart != newStart) || (oldEnd != newEnd))) {
                                    commonEventArgs = this.scrollbarContainer._args.call(this, scrollObj, commonEventArgs);
                                    this._trigger("scrollChanged", commonEventArgs);
                                }
                                if (!this.model.enableDeferredUpdate)
                                    this.scrollUpdate ? this.scrollUpdate = false : this.scrollbarContainer._appendScrollRange.call(this, scrollObj);
                            }
                        }
                    }
                }
            }
            this.offsetX = mouseX;
        },
        _scrollbarUp: function (evt) {
            var scrollObj = this.scrollbarContainer._doScrollIndex.call(this, evt);
            $("[id^=" + this._id + '_scrollbarSelect_' + "]").attr('class', 'e-rangeScroll-select');
            this.lastIndex = null;
            var args = this.scrollbarContainer._calculateScrollPosition.call(this, this.mouseX, scrollObj),
                deferred = this.model.enableDeferredUpdate;
            if (args) {
                var oldRange = args.data.oldRange,
                    newRange = args.data.newRange, oldStart, oldEnd, newStart, newEnd;
                if (scrollObj.valueType.toLowerCase() == 'datetime') {
                    oldStart = Date.parse(oldRange.start), newStart = Date.parse(newRange.start),
                        oldEnd = Date.parse(oldRange.end), newEnd = Date.parse(newRange.end);
                } else {
                    oldStart = oldRange.start, newStart = newRange.start,
                        oldEnd = oldRange.end, newEnd = newRange.end;
                }

                if (((oldStart != newStart) || (oldEnd != newEnd)) || (this.scrollRectClicked && !deferred) || (deferred) || (this.leftScrollbarClicked || this.rightScrollbarClicked)) {
                    //Checked condition for chrome browser mouse click issue.. on mouseClick in chrome move event also triggered
                    var is_chrome = ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (navigator.vendor.toLowerCase().indexOf("google") > -1));
                    if (!is_chrome || (is_chrome && ((this.leftScrollbarClicked || this.rightScrollbarClicked) && this.downClientX != this.moveClientX)
                        || this.scrollRectClicked || this.leftArrowClicked || this.rightArrowClicked)) {
                        //event will no trigger when rect value is not changed on left and right header moved
                        if ((!this.leftScrollbarClicked && !this.rightScrollbarClicked) ||
                            ((this.leftScrollbarClicked || this.rightScrollbarClicked) && Math.ceil(scrollObj.rectWidth) != Math.ceil(this.rectOldWidth) && (Math.abs(scrollObj.rectWidth - scrollObj.rectOldWidth) > 4 || !scrollObj.rectOldWidth))) {
                            if (ej.isNullOrUndefined(scrollObj._previousStart) || ((scrollObj._previousStart != newStart) || (scrollObj._previousEnd != newEnd))) {
                                args = this.scrollbarContainer._args.call(this, scrollObj, args);
                                this._trigger("scrollEnd", args);
                                scrollObj._scrollStarted = false;
                                scrollObj._previousStart = newStart;
                                scrollObj._previousEnd = newEnd;
                                scrollObj.rectOldWidth = scrollObj.rectWidth;
                                this.scrollUpdate ? this.scrollUpdate = false : this.scrollbarContainer._appendScrollRange.call(this, scrollObj);
                            }
                        }
                    }
                }
                scrollObj.release = true;
                scrollObj.clicked = false;
            }
            this._scrollEnd = false;
            this.leftScrollbarClicked = false;
            this.rightScrollbarClicked = false;
            this.scrollRectClicked = false;
            this.leftArrowClicked = false;
            this.rightArrowClicked = false;
            this.scrollbarBackRectClicked = false;
        },
        _leftScrollbarDown: function (evt) {
            evt.preventDefault();
            this.leftScrollbarClicked = true;
            this.downClientX = !ej.isNullOrUndefined(evt.clientX) ? evt.clientX : evt.originalEvent.touches[0].clientX;
        },

        _rightScrollbarDown: function (evt) {
            evt.preventDefault();
            this.rightScrollbarClicked = true;
            this.downClientX = !ej.isNullOrUndefined(evt.clientX) ? evt.clientX : evt.originalEvent.touches[0].clientX;
        },

        _scrollSelectRectDown: function (evt) {
            var scrollObj = this.scrollbarContainer._doScrollIndex.call(this, evt);
            $('#' + this._id + '_scrollbarSelect_' + scrollObj.index).attr('class', 'e-rangeScroll-select e-rangeScroll-select-hover');
            evt.preventDefault();
            var matched = jQuery.uaMatch(navigator.userAgent);
            var rangePadding = this.model.padding || 0;
            var scrollObj = this.scrollbarContainer._doScrollIndex.call(this, evt);
            if (((!this.vmlRendering && evt.originalEvent.toString() !== "[object TouchEvent]") && matched.browser.toLowerCase() != "msie") || (this.vmlRendering))
                var mouseX = (scrollObj.orientation == 'horizontal' ? this.calMousePosition(evt).X - scrollObj.x : scrollObj.width - (this.calMousePosition(evt).Y - scrollObj.y)) - rangePadding;
            else
                var mouseX = (scrollObj.orientation == 'horizontal' ? this.calTouchPosition(evt).X - scrollObj.x : scrollObj.width - (this.calTouchPosition(evt).Y - scrollObj.y)) - rangePadding;
            this.mouseDownPos = mouseX;
            scrollObj._startX = scrollObj.startX = scrollObj.offsetLeftX;
            scrollObj._offsetRightX = scrollObj.offsetRightX;
            scrollObj.clicked = true;
            scrollObj.release = false;
            this.scrollRectClicked = true;
        },

        //MouseWheel Scrolling event for scrollbarControl
        _scrollMouseWheel: function (e) {
            e.preventDefault();
            var scrollObj = this.scrollbarContainer._doScrollIndex.call(this, e);
            var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
            var wheelDelta = e.originalEvent.wheelDelta;
            var matched = jQuery.uaMatch(navigator.userAgent);
            var direction = matched.browser.toLowerCase() == "mozilla" ? ((isIE11 ? ((wheelDelta / 120) > 0 ? 1 : -1) : -(e.originalEvent.detail) / 3 > 0 ? 1 : -1)) : ((wheelDelta / 120) > 0 ? 1 : -1);
            var currentScale = Math.max(1 / ej.EjSvgRender.utils._minMax(scrollObj.zoomFactor, 0, 1), 1);
            var cumulativeScale = Math.max(currentScale + (0.25 * direction), 1);
            this.scrollbarContainer.doMouseWheelZoom.call(this, cumulativeScale, 0.5, scrollObj);

        },

        _scrollStartArgs: function (scrollObj) {
            scrollObj._scrollStarted = true;
            if (this.model.scrollStart != '' && !this._scrollEnd) {
                var commonEventArgs = $.extend({}, ej.EjSvgRender.commonChartEventArgs);
                if (!scrollObj.isZooming) {
                    commonEventArgs.data = {
                        startRange: scrollObj.valueType == "datetime" ? scrollObj.startDateTime : scrollObj.startValue,
                        endRange: scrollObj.valueType == "datetime" ? scrollObj.endDateTime : scrollObj.endValue
                    };
                } else {
                    commonEventArgs.data = {
                        axis: this.model._axes[scrollObj.index],
                        currentRange: this.model._axes[scrollObj.index].visibleRange
                    };
                }
                this._trigger("scrollStart", commonEventArgs);
                this._scrollEnd = true;
            }
        },

        _scrollChangeArgs: function (scrollObj) {
            if (this.model.enableDeferredUpdate === false || scrollObj.isZooming || this.model.scrollChanged != '') {
                var commonEventArgs = this.scrollbarContainer._calculateRange.call(this, scrollObj.offsetLeftX, scrollObj.offsetRightX, scrollObj);
                var oldRange = commonEventArgs.data.oldRange,
                    newRange = commonEventArgs.data.newRange, oldStart, oldEnd, newStart, newEnd;
                if (scrollObj.valueType.toLowerCase() == 'datetime') {
                    oldStart = Date.parse(oldRange.start), newStart = Date.parse(newRange.start),
                        oldEnd = Date.parse(oldRange.end), newEnd = Date.parse(newRange.end);
                } else {
                    oldStart = oldRange.start, newStart = newRange.start,
                        oldEnd = oldRange.end, newEnd = newRange.end;
                }

                if (this.model.scrollChanged != '' && ((oldStart != newStart) || (oldEnd != newEnd))) {
                    commonEventArgs = this.scrollbarContainer._args.call(this, scrollObj, commonEventArgs);
                    this._trigger("scrollChanged", commonEventArgs);
                }
                if (!this.model.enableDeferredUpdate)
                    this.scrollUpdate ? this.scrollUpdate = false : this.scrollbarContainer._appendScrollRange.call(this, scrollObj);
            }
        },

        _scrollEndArgs: function (startX, scrollObj) {
            var args = this.scrollbarContainer._calculateRange.call(this, startX, scrollObj.offsetRightX, scrollObj);
            if (args && scrollObj._scrollStarted) {
                var oldRange = args.data.oldRange,
                    newRange = args.data.newRange, oldStart, oldEnd, newStart, newEnd;
                if (scrollObj.valueType.toLowerCase() == 'datetime') {
                    oldStart = Date.parse(oldRange.start), newStart = Date.parse(newRange.start),
                        oldEnd = Date.parse(oldRange.end), newEnd = Date.parse(newRange.end);
                } else {
                    oldStart = oldRange.start, newStart = newRange.start,
                        oldEnd = oldRange.end, newEnd = newRange.end;
                }

                if (((oldStart != newStart) || (oldEnd != newEnd)) || (this.leftScrollbarClicked || this.rightScrollbarClicked)) {
                    args = this.scrollbarContainer._args.call(this, scrollObj, args);
                    this._trigger("scrollEnd", args);
                }
                scrollObj._scrollStarted = false;
                this.scrollUpdate ? this.scrollUpdate = false : this.scrollbarContainer._appendScrollRange.call(this, scrollObj);
            }
        },

        _args: function (scrollObj, args) {
            if (scrollObj.isZooming) {
                var axis = this.model._axes[scrollObj.index],
                    data = args.data;
                data.axis = axis;
                data.newRange = axis.visibleRange;
                data.oldRange = axis.previousRange;
            }

            if (scrollObj.isVirtual) {
                args.data.axis = this.model._axes[scrollObj.index];
                delete args.data.zoomFactor;
                delete args.data.zoomPosition;
            }
            return args;
        },

        doMouseWheelZoom: function (cumulativeScale, origin, scrollObj) {
            if (cumulativeScale >= 1) {
                var calZoomVal = this.scrollbarContainer.calZoomFactors(cumulativeScale, origin, scrollObj.zoomFactor, scrollObj.zoomPosition);

                if (scrollObj.zoomPosition != calZoomVal.zoomMPosition && calZoomVal.zoomMPosition + scrollObj.zoomFactor <= 1 && scrollObj.zoomPosition >= 0) {
                    if (calZoomVal.zoomMPosition + scrollObj.zoomFactor >= 1) {
                        calZoomVal.zoomMPosition = 1 - scrollObj.zoomFactor
                    }
                    if (calZoomVal.zoomMPosition < 0) {
                        calZoomVal.zoomMPosition = 0;
                    }
                    scrollObj.zoomPosition = calZoomVal.zoomMPosition;
                    scrollObj.startX = ((scrollObj.zoomPosition) * (scrollObj.width - 30 - scrollObj._diff) + 15);
                    scrollObj.startX = (scrollObj.startX + scrollObj.rectWidth + 5) > scrollObj.width ? (scrollObj.width - scrollObj.rectWidth - 15) : scrollObj.startX;
                    scrollObj.offsetLeftX = scrollObj.startX;

                    scrollObj._offsetRightX = scrollObj.startX + scrollObj.rectWidth;
                    if (scrollObj._offsetRightX > scrollObj.width - 15) {
                        scrollObj.offsetRightX = scrollObj.width - 15;
                        scrollObj.startX = scrollObj.offsetRightX - scrollObj.rectWidth;
                        scrollObj.offsetLeftX = scrollObj.startX;
                    } else {
                        scrollObj.offsetRightX = scrollObj._offsetRightX;
                    }
                    scrollObj.endX = scrollObj.width - scrollObj.offsetRightX;
                    this.scrollbarContainer._setScrollPosition.call(this, scrollObj.startX, scrollObj.offsetRightX, scrollObj);
                    this.scrollbarContainer._calculateMouseWheelRange.call(this, scrollObj.startX, scrollObj.offsetRightX, scrollObj);
                }
            }
            return false;
        },
        _calculateMouseWheelRange: function (startX, endX, scrollObj) {

            var scrollRange, start, end, padding = 30, startArgs, endArgs;
            scrollObj.zoomFactor = (scrollObj.rectWidth / (scrollObj.width - padding));
            scrollObj.zoomPosition = (startX - 15) / (scrollObj.width - padding - scrollObj._diff);
            scrollRange = scrollObj.scrollRange;

            if (!scrollObj.isRTL) {
                start = scrollRange.min + scrollObj.zoomPosition * scrollRange.delta;
                end = start + scrollObj.zoomFactor * scrollRange.delta;
            } else {
                end = scrollRange.max - scrollObj.zoomPosition * scrollRange.delta;
                start = end - scrollObj.zoomFactor * scrollRange.delta;
            }

            if (scrollObj.valueType == "datetime") {
                startArgs = scrollObj.startDateTime;
                endArgs = scrollObj.endDateTime;
                scrollObj.startDateTime = this.startDateTime = start = new Date(start);
                scrollObj.endDateTime = this.endDateTime = end = new Date(end);
            } else {
                startArgs = parseInt(scrollObj.startValue);
                endArgs = parseInt(scrollObj.endValue);
                scrollObj.startValue = this.startValue = start = Math.ceil(start);
                scrollObj.endValue = this.endValue = end = Math.ceil(end);
            }

            //Bind event on changing scrollbar position 
            var commonEventArgs = $.extend({}, ej.EjSvgRender.commonChartEventArgs);
            commonEventArgs.data = {
                zoomPosition: scrollObj.zoomPosition, zoomFactor: scrollObj.zoomFactor,
                oldRange: {
                    start: startArgs,
                    end: endArgs
                },
                newRange: {
                    start: start,
                    end: end
                }
            };
            scrollObj._scrollChanged = true;
            scrollObj._scrollStarted = false;
            var oldRange = commonEventArgs.data.oldRange,
                newRange = commonEventArgs.data.newRange, oldStart, oldEnd, newStart, newEnd;
            if (scrollObj.valueType.toLowerCase() == 'datetime') {
                oldStart = Date.parse(oldRange.start), newStart = Date.parse(newRange.start),
                    oldEnd = Date.parse(oldRange.end), newEnd = Date.parse(newRange.end);
            } else {
                oldStart = oldRange.start, newStart = newRange.start,
                    oldEnd = oldRange.end, newEnd = newRange.end;
            }
            if (oldStart != newStart || oldEnd != newEnd || scrollObj.isZooming) {
                this.scrollbarContainer._scrollStartArgs.call(this, scrollObj);
                commonEventArgs = this.scrollbarContainer._args.call(this, scrollObj, commonEventArgs);
                this._trigger("scrollEnd", commonEventArgs);
                this.scrollUpdate ? this.scrollUpdate = false : this.scrollbarContainer._appendScrollRange.call(this, scrollObj);
                this._scrollEnd = false;
            }
        },
        calZoomFactors: function (cumulativeScale, origin, currentZoomFactor, currentZoomPos) {
            var calcZoomFactorVal, calcZoomPosition;
            if (cumulativeScale == 1) {
                calcZoomFactorVal = 1;
                calcZoomPosition = 0;
            } else {
                calcZoomFactorVal = ej.EjSvgRender.utils._minMax(1 / cumulativeScale, 0, 1);
                calcZoomPosition = currentZoomPos + ((currentZoomFactor - calcZoomFactorVal) * origin);
            }
            return { zoomMFactor: calcZoomFactorVal, zoomMPosition: calcZoomPosition };
        },
        _leftArrowDown: function (evt) {
            this.leftArrowClicked = true;
            var scrollObj = this.scrollbarContainer._doScrollIndex.call(this, evt);
            scrollObj._startX = scrollObj.startX = scrollObj.offsetLeftX;
            scrollObj._offsetRightX = scrollObj.offsetRightX;
            scrollObj.leftIncrement = 5;
            var range = this;
            scrollObj.interval = setInterval(function () {
                range.scrollbarContainer.leftArrowRecursive.call(range, scrollObj)
            }, 50);
        },

        _leftArrowUp: function (evt) {
            this.leftArrowClicked = false;
            var scrollObj = this.scrollbarContainer._doScrollIndex.call(this, evt);
            this.scrollbarContainer.leftArrowRecursive.call(this, scrollObj);
        },

        leftArrowRecursive: function (scrollObj) {
            if (this.leftArrowClicked) {
                var rootId = this._id;
                this.scrollbarContainer._calculateScrollLeftMove.call(this, scrollObj.leftIncrement, scrollObj);
                scrollObj._scrollStarted = true;
                if (scrollObj.startX > 15)
                    this.scrollbarContainer._scrollEndArgs.call(this, scrollObj.startX, scrollObj);
                this.scrollbarContainer._setScrollPosition.call(this, scrollObj.startX, scrollObj.offsetRightX, scrollObj);
                scrollObj.leftIncrement += 5;
            } else {
                clearInterval(scrollObj.interval);
                scrollObj.leftIncrement = 0;
            }
        },

        _rightArrowDown: function (evt) {
            this.rightArrowClicked = true;
            var scrollObj = this.scrollbarContainer._doScrollIndex.call(this, evt);
            scrollObj._startX = scrollObj.startX = scrollObj.offsetLeftX;
            scrollObj._offsetRightX = scrollObj.offsetRightX;
            scrollObj.rightIncrement = -5;
            var range = this;
            scrollObj.interval = setInterval(function () { range.scrollbarContainer.rightArrowRecursive.call(range, scrollObj) }, 50);
        },

        _rightArrowUp: function (evt) {
            this.rightArrowClicked = false;
            var scrollObj = this.scrollbarContainer._doScrollIndex.call(this, evt);
            this.scrollbarContainer.rightArrowRecursive.call(this, scrollObj);
        },

        rightArrowRecursive: function (scrollObj) {
            if (this.rightArrowClicked) {
                var rootId = this._id;
                this.scrollbarContainer._calculateScrollRightMove.call(this, scrollObj.rightIncrement, scrollObj);
                scrollObj._scrollStarted = true;
                if (scrollObj.offsetRightX < scrollObj.width - 15)
                    this.scrollbarContainer._scrollEndArgs.call(this, scrollObj._startX, scrollObj);
                this.scrollbarContainer._setScrollPosition.call(this, scrollObj._startX, scrollObj.offsetRightX, scrollObj);
                scrollObj.rightIncrement -= 5;
            } else {
                clearInterval(scrollObj.interval);
                scrollObj.rightIncrement = 0;
            }
        },

        _scrollBackRectDown: function (evt) {

            var matched = jQuery.uaMatch(navigator.userAgent);
            var rangePadding = this.model.padding || 0;
            var scrollObj = this.scrollbarContainer._doScrollIndex.call(this, evt);
            if (((!this.vmlRendering && evt.originalEvent.toString() !== "[object TouchEvent]") && matched.browser.toLowerCase() != "msie") || (this.vmlRendering))
                var mouseX = (scrollObj.orientation == 'horizontal' ? this.calMousePosition(evt).X - scrollObj.x : scrollObj.width - (this.calMousePosition(evt).Y - scrollObj.y)) - rangePadding;
            else
                var mouseX = (scrollObj.orientation == 'horizontal' ? this.calTouchPosition(evt).X - scrollObj.x : scrollObj.width - (this.calTouchPosition(evt).Y - scrollObj.y)) - rangePadding;
            this.mouseDownPos = mouseX;
            this.scrollbarBackRectClicked = true;

            var range = this;
            this.scrollbarContainer._scrollStartArgs.call(this, scrollObj);
            var interval = setInterval(function () {
                range.scrollbarContainer.scrollBackRectRecursive.call(range, scrollObj)
                if (!this.scrollbarBackRectClicked)
                    clearInterval(interval);
            }, 50);
        },
        _scrollBackRectUp: function (evt) {
            this.scrollbarBackRectClicked = false;
            var scrollObj = this.scrollbarContainer._doScrollIndex.call(this, evt);
            this.scrollbarContainer.scrollBackRectRecursive.call(this, scrollObj);
        },

        _doScrollIndex: function (evt) {
            var matchStr = this._id + '_scrollbar' + '_';
            var parentNodeId = (evt.target.parentNode && evt.target.parentNode.id) ? evt.target.parentNode.id : '';
            var selectionIndex = parentNodeId.indexOf(matchStr) > -1 ? parseInt(parentNodeId.substr(matchStr.length)) : NaN;
            if (!ej.isNullOrUndefined(this.lastIndex) && !isNaN(this.lastIndex)) {
                if (!this.model.scrollObj[this.lastIndex].release && this.model.scrollObj[this.lastIndex].clicked)
                    selectionIndex = this.lastIndex;
            }
            this.lastIndex = ej.isNullOrUndefined(this.lastIndex) ? selectionIndex : this.lastIndex;
            var scrollObj = ej.isNullOrUndefined(this.model.scrollObj[selectionIndex]) ? this.model.scrollObj[this.lastIndex] : this.model.scrollObj[selectionIndex];

            return scrollObj;
        },

        scrollBackRectRecursive: function (scrollObj) {
            if (this.scrollbarBackRectClicked) {
                var moveLength = (10 / 100) * (scrollObj.width - 30);
                scrollObj._startX = scrollObj.startX = scrollObj.offsetLeftX;
                scrollObj._offsetRightX = scrollObj.offsetRightX;
                if (this.mouseDownPos < scrollObj.startX) {
                    moveLength = moveLength < scrollObj.startX ? moveLength : (scrollObj.startX - 16);
                    this.scrollbarContainer._calculateScrollLeftMove.call(this, moveLength, scrollObj);
                    scrollObj._scrollStarted = true;
                    this.scrollbarContainer._scrollEndArgs.call(this, scrollObj.startX, scrollObj);
                    this.scrollbarContainer._setScrollPosition.call(this, scrollObj.startX, scrollObj.offsetRightX, scrollObj);
                } else if (this.mouseDownPos > scrollObj.offsetRightX) {
                    moveLength = (moveLength < scrollObj.endX ? moveLength : (scrollObj.endX - 16)) * -1;
                    this.scrollbarContainer._calculateScrollRightMove.call(this, moveLength, scrollObj);
                    scrollObj._scrollStarted = true;
                    this.scrollbarContainer._scrollEndArgs.call(this, scrollObj._startX, scrollObj);
                    this.scrollbarContainer._setScrollPosition.call(this, scrollObj._startX, scrollObj.offsetRightX, scrollObj);
                } else {
                    scrollObj._scrollStarted = false;
                }
            } else {
                scrollObj._scrollStarted = false;
            }
        },

        //Redraw the RangeNavigator and Chart
        _appendScrollRange: function (scrollObj) {
            this.scrollbarUpdate = true;
            if (this.pluginName == "ejRangeNavigator")
                this.renderNavigator();
            else {
                var index = scrollObj.index,
                    axes = this.model._axes[index];
                if (scrollObj.isZooming && (axes.zoomFactor != scrollObj.zoomFactor || axes.zoomPosition != scrollObj.zoomPosition)) {
                    axes.zoomFactor = scrollObj.zoomFactor;
                    axes.zoomPosition = scrollObj.zoomPosition;
                    this.redraw(true);
                }
            }
            this.scrollbarUpdate = false;
        }

    };
})(jQuery);;

});