import config from '@/config';

/**
 * Wrapper to simplify work with documents
 */
export class DocumentContainer {
  /**
   * @param {object} opts
   * @param {File} opts.file - file representing a document
   * @param {string} opts.key - key to access file in storage
   * @param {string} [opts.name] - file name
   * @param {string} [opts.mimeType] - file MIME type
   */
  constructor(opts) {
    if (!opts.file && !opts.key) {
      throw new Error('Document initialized without raw file or file key');
    }

    this.mimeType = opts.mimeType || opts.mime_type;
    this.file = opts.file;
    this.name = opts.name;
    this.key = opts.key;

    this._arrayBuffer = [];
    this._privateUrl = '';
    this._dataUrl = '';
  }

  getDetailsForSave() {
    return {
      mime_type: this.mimeType,
      name: this.name,
      key: this.key,
    };
  }

  static getEmptyDetailsForSave() {
    return {
      mime_type: '',
      name: '',
      key: '',
    };
  }

  setKey(key) {
    this.key = key;
  }

  get isUploaded() {
    return !!(this.key && !this.file);
  }

  /**
   * URL from where the public file can be downloaded.
   * (!! works only with public files)
   *
   * @returns {string} publicUrl
   */
  get publicUrl() {
    if (!this.key) return '';
    return `${config.FILE_STORAGE}/${this.key}`;
  }

  /**
   * Data URL of the new file to allow browser open it before uploaded.
   * Call {@link deriveDataUrl} before using this getter
   *
   * @returns {string} dataUrl
   */
  get dataUrl() {
    return this._dataUrl;
  }

  /**
   * File converted to AB format. You should upload files in this format.
   * Call {@link deriveArrayBuffer} before using this getter
   *
   * @returns {ArrayBuffer} arrayBuffer
   */
  get arrayBuffer() {
    return this._arrayBuffer;
  }
}
