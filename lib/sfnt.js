'use strict';

var _ = require('lodash');

var Font = function () {
  this.ascent = 850;
  this.copyright = '';
  this.createdDate = new Date();
  this.glyphs = [];
  this.isFixedPitch = 0;
  this.italicAngle = 0;
  this.familyClass = 0; // No Classification
  this.familyName = '';
  this.fsSelection = 0x40; // Characters are in the standard weight/style for the font.
  this.fsType = 8; // No subsetting: When this bit is set, the font may not be subsetted prior to embedding.
  this.lineGap = 90;
  this.lowestRecPPEM = 0;
  this.macStyle = 0;
  this.minLeftSideBearing = 0;
  this.minRightSideBearing = -1;
  this.modifiedDate = new Date();
  this.panose = {
    familyType: 2, // Latin Text
    serifStyle: 2, // cove
    weight: 5, // book
    proportion: 3, //modern
    contrast: 0, //any
    strokeVariation: 0, //any,
    armStyle: 0, //any,
    letterform: 0, //any,
    midline: 0, //any,
    xHeight: 0 //any,
  };
  this.sfntNames = [];
  this.underlinePosition = 0;
  this.underlineThickness = 0;
  this.unitsPerEm = 1000;
  this.weightClass = 400; // normal
  this.width = 1000;
  this.widthClass = 5; // Medium (normal)
  this.xMaxExtent = 1064;
  this.ySubscriptXOffset = 0;
  this.ySuperscriptXOffset = 0;

//getters and setters

  Object.defineProperty(this, 'descent', {
    get: function () {
      return this.int_descent || -151;
    },
    set: function (value) {
      this.int_descent = parseInt(Math.round(-Math.abs(value)), 10);
    }
  });

  this.__defineGetter__('avgCharWidth', function () {
    if (this.glyphs.length === 0) {
      return 0;
    }
    var widths = _.map(this.glyphs, 'width');
    return parseInt(widths.reduce(function (prev, cur) {
      return prev + cur;
    }) / widths.length, 10);
  });

  Object.defineProperty(this, 'ySubscriptXSize', {
    get: function () {
      return parseInt(this.int_ySubscriptXSize !== undefined ? this.int_ySubscriptXSize : (this.width * 0.6347), 10);
    },
    set: function (value) {
      this.int_ySubscriptXSize = value;
    }
  });

  Object.defineProperty(this, 'ySubscriptYSize', {
    get: function () {
      return parseInt(this.int_ySubscriptYSize !== undefined ? this.int_ySubscriptYSize : ((this.ascent - this.descent) * 0.7), 10);
    },
    set: function (value) {
      this.int_ySubscriptYSize = value;
    }
  });

  Object.defineProperty(this, 'ySubscriptYOffset', {
    get: function () {
      return parseInt(this.int_ySubscriptYOffset !== undefined ? this.int_ySubscriptYOffset : ((this.ascent - this.descent) * 0.14), 10);
    },
    set: function (value) {
      this.int_ySubscriptYOffset = value;
    }
  });

  Object.defineProperty(this, 'ySuperscriptXSize', {
    get: function () {
      return parseInt(this.int_ySuperscriptXSize !== undefined ? this.int_ySuperscriptXSize : (this.width * 0.6347), 10);
    },
    set: function (value) {
      this.int_ySuperscriptXSize = value;
    }
  });

  Object.defineProperty(this, 'ySuperscriptYSize', {
    get: function () {
      return parseInt(this.int_ySuperscriptYSize !== undefined ? this.int_ySuperscriptYSize : ((this.ascent - this.descent) * 0.7), 10);
    },
    set: function (value) {
      this.int_ySuperscriptYSize = value;
    }
  });

  Object.defineProperty(this, 'ySuperscriptYOffset', {
    get: function () {
      return parseInt(this.int_ySuperscriptYOffset !== undefined ? this.int_ySuperscriptYOffset : ((this.ascent - this.descent) * 0.48), 10);
    },
    set: function (value) {
      this.int_ySuperscriptYOffset = value;
    }
  });

  Object.defineProperty(this, 'yStrikeoutSize', {
    get: function () {
      return parseInt(this.int_yStrikeoutSize !== undefined ? this.int_yStrikeoutSize : ((this.ascent - this.descent) * 0.049), 10);
    },
    set: function (value) {
      this.int_yStrikeoutSize = value;
    }
  });

  Object.defineProperty(this, 'yStrikeoutPosition', {
    get: function () {
      return parseInt(this.int_yStrikeoutPosition !== undefined ? this.int_yStrikeoutPosition : ((this.ascent - this.descent) * 0.258), 10);
    },
    set: function (value) {
      this.int_yStrikeoutPosition = value;
    }
  });

  Object.defineProperty(this, 'lsb', {
    get: function () {
      return parseInt(this.int_lsb !== undefined ? this.int_lsb : _.min(_.pluck(this.glyphs, 'lsb')), 10);
    },
    set: function (value) {
      this.int_lsb = value;
    }
  });

  Object.defineProperty(this, 'xMin', {
    get: function () {
      return parseInt(this.int_xMin !== undefined ? this.int_xMin : this.lsb, 10);
    },
    set: function (value) {
      this.int_xMin = value;
    }
  });

  Object.defineProperty(this, 'yMin', {
    get: function () {
      return parseInt(this.int_yMin !== undefined ? this.int_yMin : this.descent, 10);
    },
    set: function (value) {
      this.int_yMin = value;
    }
  });

  Object.defineProperty(this, 'xMax', {
    get: function () {
      return parseInt(this.int_xMax !== undefined ? this.int_xMax : this.width, 10);
    },
    set: function (value) {
      this.int_xMax = value;
    }
  });

  Object.defineProperty(this, 'yMax', {
    get: function () {
      return parseInt(this.int_yMax !== undefined ? this.int_yMax : this.ascent, 10);
    },
    set: function (value) {
      this.int_yMax = value;
    }
  });

};


var Glyph = function () {
  this.contours = [];
  this.id = '';
  this.isMissed = false;
  this.height = 0;
  this.lsb = 0;
  this.name = '';
  this.size = 0;
  this.unicode = 0;
  this.width = 0;
};

var Contour = function () {
  this.points = [];
};

var Point = function () {
  this.onCurve = true;
  this.x = 0;
  this.y = 0;
};

var SfntName = function () {
  this.id = 0;
  this.value = '';
};

module.exports.Font = Font;
module.exports.Glyph = Glyph;
module.exports.Contour = Contour;
module.exports.Point = Point;
module.exports.SfntName = SfntName;