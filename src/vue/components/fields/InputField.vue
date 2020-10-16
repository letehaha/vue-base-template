<template>
  <div
    class="input-field"
    :class="{
      'input-field--error': errorMessage,
      'input-field--disabled': $attrs.disabled,
      'input-field--pwd-toggle-present': isPasswordType,
      'input-field--monospaced': monospaced,
    }"
  >
    <span
      v-if="label"
      class="input-field__label"
    >
      {{ label }}
      <template v-if="isCapsLockOn">
        <span class="input-field__label-warning">
          Warning: Caps-Lock is ON
        </span>
      </template>
    </span>
    <input
      ref="input"
      :key="limitedValueStep"
      class="input-field__input"
      :type="type"
      :value="value"
      :min="min"
      :max="max"
      :style="{
        height,
      }"
      :placeholder="$attrs.placeholder || ' '"
      :tabindex="$attrs.readonly || $attrs.readonly === ''
        ? -1
        : $attrs.tabindex"
      v-bind="$attrs"
      v-on="listeners"
      @focus="onFocus"
      @blur="onBlur"
    >
    <p
      v-if="errorMessage"
      class="input-field__err-mes"
      :class="{ 'input-field__err-mes--float': isErrorFloat }"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>

const EVENTS = {
  input: 'input',
  change: 'change',
};

export default {
  props: {
    label: { type: String, default: undefined },
    value: { type: [String, Number], default: undefined },
    monospaced: { type: Boolean, default: false },
    min: { type: [String, Number], default: undefined },
    max: { type: [String, Number], default: undefined },
    type: { type: String, default: undefined },
    trim: { type: Boolean, default: true },
    height: { type: String, default: 'auto' },
    errorMessage: { type: String, default: undefined },
    isErrorFloat: { type: Boolean, default: undefined },
    limitedValue: { type: Boolean, default: undefined },
  },
  data: () => ({
    isCapsLockOn: false,
    isPasswordShown: false,
    limitedValueStep: 0,
  }),
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => {
          const { value } = event.target;
          if (value === this.value) return;
          if (value < this.min) return;
          if (value > this.max) return;
          this.$emit(EVENTS.input, value);
        },
        change: event => {
          let { value } = event.target;
          if (this.limitedValue) {
            if (this.min && (Number(value) < Number(this.min))) {
              value = this.min;
              this.limitedValueStep += 1;
              this.$nextTick(() => {
                this.$refs.input.focus();
              });
            }
            if (this.max && (Number(value) > Number(this.max))) {
              value = this.max;
              this.limitedValueStep += 1;
              this.$nextTick(() => {
                this.$refs.input.focus();
              });
            }
          }
          this.$emit(EVENTS.change, value);
        },
      };
    },
    isPasswordType() {
      return this.type === 'password';
    },
  },
  methods: {
    onFocus() {
      if (this.isPasswordType) {
        /**
         * Use two events to detect Caps Lock up and down.
         * If we will use only 'keydown', we can detect only Caps Lock press to
         * ON state, but we cannot detect the OFF state.
         *
         * Actual only for MacOS's browsers.
         */
        document.addEventListener('keydown', this.detectCapsLock);
        document.addEventListener('keyup', this.detectCapsLock);
      }
    },
    onBlur() {
      if (this.isPasswordType) {
        document.removeEventListener('keydown', this.detectCapsLock);
        document.removeEventListener('keyup', this.detectCapsLock);
        if (!this.value) this.isCapsLockOn = false;
      }
    },
    detectCapsLock(event) {
      /**
       * {KeyboardEvent} getModifierState
       *
       * @return {Boolean}
       */
      this.isCapsLockOn = event.getModifierState && event.getModifierState('CapsLock');
    },
  },
};
</script>

<style lang="scss" scoped>
.input-field {
  position: relative;
  width: 100%;
  flex: 1;
}

.input-field__input {
  font-size: 14px;
  line-height: 1.2;
  color: theme-color(grays, 50);
  padding: 16px;
  background-color: theme-color(grays, 100);
  border: 1px solid theme-color(grays, 90);
  box-sizing: border-box;
  border-radius: 4px;
  outline: none;
  width: 100%;

  /* will work only when field not in the focus */
  text-overflow: ellipsis;

  &[type='number'] {
    appearance: textfield;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  @include placeholder-custom(theme-color(grays, 80));

  .input-field--monospaced & {
    background-color: theme-color(grays, 93);
    border-radius: 4px;
    font-weight: 400;
    font-size: 17px;
    line-height: 1.7;
    letter-spacing: 6px;
    color: theme-color(grays);
    cursor: text;
    text-align: center;
    padding: 9px 10px;

    @include respond-to-custom(550px) {
      font-size: 14px;
      letter-spacing: 4px;
    }
  }
}
.input-field__label {
  font-weight: 400;
  font-size: 13px;
  line-height: 1.2;
  color: theme-color(grays);
  margin-bottom: 8px;
}
.input-field__label-warning {
  font-size: 11px;
  margin-left: 4px;
  color: theme-color(accent, lightest);
}
.input-field__err-mes {
  color: theme-color(error);
  font-size: 12px;
}
.input-field__err-mes--float {
  position: absolute;
}
</style>
