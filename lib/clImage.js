var util = require('util');
var _ = require('lodash');
var ref = require('ref');
var assert = require('assert');
var CLMemory = require('./clMemory');
var clUtils = require('./clUtils');

function CLImage(context, handle) {
    CLMemory.call(this, context, handle);
}

util.inherits(CLImage, CLMemory);

Object.defineProperties(CLImage.prototype, {
    //!image format descriptor specified when image was created
    format: {
        get: function() {
            return this._getInfoWith(this.cl.imports.clGetImageInfo, this.cl.types.ImageFormat, this.cl.defs.IMAGE_FORMAT);
        }
    },
    /**
     *	size of each element of the image memory object given by image. An
     *	element is made up of n channels. The value of n is given in cl_image_format descriptor.
     */
    elementSize: {
        get: function() {
            return this._getInfoWith(this.cl.imports.clGetImageInfo, 'size_t', this.cl.defs.IMAGE_ELEMENT_SIZE);
        }
    },
    //! size in bytes of a row of elements of the image object given by image
    rowPitch: {
        get: function() {
            return this._getInfoWith(this.cl.imports.clGetImageInfo, 'size_t', this.cl.defs.IMAGE_ROW_PITCH);
        }
    },
    /**
     *	size in bytes of a 2D slice for the 3D image object given by image.
     *
     *	For a 2D image object this value will be 0.
     */
    slicePitch: {
        get: function() {
            return this._getInfoWith(this.cl.imports.clGetImageInfo, 'size_t', this.cl.defs.IMAGE_SLICE_PITCH);
        }
    },
    //! width in pixels
    width: {
        get: function() {
            return this._getInfoWith(this.cl.imports.clGetImageInfo, 'size_t', this.cl.defs.IMAGE_WIDTH);
        }
    },
    //! height in pixels
    height: {
        get: function() {
            return this._getInfoWith(this.cl.imports.clGetImageInfo, 'size_t', this.cl.defs.IMAGE_HEIGHT);
        }
    },
    /**
     *	depth of the image in pixels
     *
     *	For a 2D image object, depth = 0
     */
    depth: {
        get: function() {
            return this._getInfoWith(this.cl.imports.clGetImageInfo, 'size_t', this.cl.defs.IMAGE_DEPTH);
        }
    },
    //! The target argument specified in CLImage2DGL, CLImage3DGL constructors
    textureTarget: {
        get: function() {
            return this._getInfoWith(this.cl.imports.clGetImageInfo, 'uint', this.cl.defs.GL_TEXTURE_TARGET);
        }
    },
    //! The miplevel argument specified in CLImage2DGL, CLImage3DGL constructors
    mipmapLevel: {
        get: function() {
            return this._getInfoWith(this.cl.imports.clGetImageInfo, 'int', this.cl.defs.GL_MIPMAP_LEVEL);
        }
    }
});

module.exports = CLImage;