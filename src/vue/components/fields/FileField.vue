<template>
  <div class="file-field">
    <div
      v-if="fileName"
      class="file-field__name"
    >
      <div @click="reset">
        X
      </div>
      {{ fileName }}
    </div>

    <label class="file-field__area">
      <input
        v-bind="$attrs"
        type="file"
        class="file-field__input"
        :accept="acceptedExtensions"
        @change="onChange"
      >
      <div class="file-field__action">
        {{ buttonLabel }}
      </div>
    </label>
    <div
      v-if="errorMessage || localErrorMessage"
      class="file-field__err-mes"
    >
      {{ errorMessage || localErrorMessage }}
    </div>
  </div>
</template>

<script>
import { FileUtil, DocumentContainer } from '@/js/utils';

const MAX_FILE_MEGABYTES = 5;
const IMAGE_FILE_EXTENSIONS = ['jpg', 'png', 'heic', 'pdf'];

export default {
  props: {
    value: { type: DocumentContainer, default: null },
    buttonLabel: { type: String, default: 'file-field.button-label' },
    fileExtensions: { type: Array, default: () => IMAGE_FILE_EXTENSIONS },
    maxSize: { type: Number, default: MAX_FILE_MEGABYTES },
    errorMessage: { type: String, default: undefined },
  },
  data: () => ({
    IMAGE_FILE_EXTENSIONS,
    document: null,
    localErrorMessage: null,
  }),
  computed: {
    acceptedExtensions() {
      return this.fileExtensions
        .map(item => `.${item.toUpperCase()}`)
        .join(', ');
    },
    maxSizeBytes() {
      return this.maxSize * 1024 * 1024;
    },
    fileName() {
      return (this.document && this.document.name) || null;
    },
  },
  methods: {
    async onChange(event) {
      try {
        this.localErrorMessage = null;
        const file = FileUtil.getFileFromEvent(event);
        if (await this.validateFile(file)) {
          this.documentUrl = await FileUtil.getDataUrl(file);
          this.document = new DocumentContainer({
            mimeType: file.type,
            name: file.name,
            file,
          });
          this.$emit('input', this.document);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    },
    async validateFile(file) {
      if (!this.isValidFileType(file)) {
        this.localErrorMessage = `You cannot upload a {{type}} file. Allowed types: ${this.acceptedExtensions}`;

        // eslint-disable-next-line no-console
        console.error('incorrect file type');
        return false;
      }
      if (!this.isValidFileSize(file)) {
        this.localErrorMessage = `You cannot upload a file exceeding ${this.maxSize} MB`;
        // eslint-disable-next-line no-console
        console.error('Max size exceeded');
        return false;
      }
      return true;
    },
    isValidFileType(file) {
      return Boolean(
        this.fileExtensions
          .find(item => item.toUpperCase() === this.getFileExtension(file)),
      );
    },
    getFileExtension(file) {
      return file.name.split('.').pop().toUpperCase();
    },
    isValidFileSize(file) {
      return file.size <= this.maxSizeBytes;
    },
    reset() {
      this.$el.querySelector('input').value = '';
      this.document = null;
      this.documentUrl = '';
      this.localErrorMessage = null;
      this.$emit('input', this.document);
    },
  },
};
</script>

<style lang="scss" scoped>
.file-field__name {
  font-weight: 400;
  font-size: 13px;
  line-height: 1.7;
  color: theme-color(grays, 50);
  margin-bottom: 32px;
  display: flex;
  align-items: center;

  svg {
    width: 12px;
    margin-right: 10px;
    color: theme-color(error);
    cursor: pointer;
  }
}
.file-field__area {
  display: inline-block;
}
.file-field__input {
  visibility: hidden;
  opacity: 0;
  width: 0;
  height: 0;
}
.file-field__action {
  font-weight: 700;
  line-height: 1.2;
  font-size: 14px;
  border: 1px solid transparent;
  color: theme-color(grays, 100);
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow .2s ease-out;
  padding: 12px 22px;
  background-color: theme-color(brand);

  &:not(.button--text).button--disabled {
    background-color: theme-color(grays, 90);
    cursor: not-allowed;
  }

  @include respond-to-custom(550px) {
    padding: 12px 16px;
  }
}
.file-field__err-mes {
  color: theme-color(error);
  font-size: 12px;
}
</style>
