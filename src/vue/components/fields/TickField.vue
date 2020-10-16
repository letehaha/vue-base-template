<template>
  <label
    class="tick-field"
    :class="{
      'tick-field--disabled': $attrs.disabled,
    }"
    :for="id"
    :title="label"
  >
    <input
      :id="id"
      class="tick-field__input"
      type="checkbox"
      :checked="value"
      :placeholder="$attrs.placeholder || ''"
      :tabindex="$attrs.readonly || $attrs.readonly === ''
        ? -1
        : $attrs.tabindex"
      v-bind="$attrs"
      v-on="listeners"
    >
    <div class="tick-field__custom" />
    <p class="tick-field__label">
      {{ label }}
    </p>
    <p
      v-if="errorMessage"
      class="tick-field__err-mes"
    >
      {{ errorMessage }}
    </p>
  </label>
</template>

<script>

const EVENTS = {
  input: 'input',
};

export default {
  props: {
    label: { type: String, default: undefined },
    value: { type: [String, Boolean], required: true },
    errorMessage: { type: String, default: undefined },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => {
          this.$emit(EVENTS.input, event.target.checked);
        },
      };
    },
    id() {
      return `tick-field-${this._uid}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.tick-field {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  cursor: pointer;
}

.tick-field__input {
  position: absolute;
  height: 0;
  width: 0;
  overflow: hidden;
  left: -100vw;
}

.tick-field__custom {
  background: theme-color(grays, 100);
  border: 1px solid theme-color(grays, 90);
  border-radius: 4px;
  width: 20px;
  height: 20px;
  flex: none;
  margin-right: 16px;
  transition: background-color 0.2s ease-out, border-color 0.2s ease-out;
  position: relative;
  margin-top: 4px;

  &:after,
  &:before {
    content: '';
    position: absolute;
    height: 2px;
    background-color: theme-color(grays, 100);
    border-radius: 2px;
    display: none;
  }

  &:after {
    transform: rotate(-45deg);
    width: 10px;
    top: 8px;
    left: 6px;
  }

  &:before {
    transform: rotate(45deg);
    width: 5px;
    top: 9px;
    left: 4px;
  }

  .tick-field__input:checked + & {
    background-color: theme-color(brand);
    border-color: theme-color(brand);

    &:after,
    &:before {
      display: block;
    }
  }
}
.tick-field__label {
  font-weight: 400;
  font-size: 13px;
  line-height: 1.7;
  color: theme-color(grays, 50);
}
.tick-field__err-mes {
  color: theme-color(error);
  font-size: 12px;
}
</style>
