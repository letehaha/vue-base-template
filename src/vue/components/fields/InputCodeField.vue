<template>
  <div class="input-code-field">
    <form
      ref="list"
      class="input-code-field__list"
    >
      <template v-for="n in codeValuesCount">
        <input
          :key="n"
          type="text"
          class="input-code-field__item"
          maxlength="1"
          v-bind="$attrs"
          v-on="listeners"
          @keyup="focusNext"
        >
      </template>
    </form>
  </div>
</template>

<script>
import { KEY_CODES } from '@/js/const';

const EVENTS = {
  input: 'input',
};

export default {
  props: {
    codeValuesCount: { type: [String, Number], default: 6 },
    value: { type: [String, Number], default: undefined },
  },
  data: () => ({
    KEY_CODES,
  }),
  computed: {
    listeners() {
      return {
        [EVENTS.input]: () => {
          const value = Array.from(this.$refs.list.elements).map(i => i.value).join('');
          this.$emit(EVENTS.input, value);
        },
      };
    },
  },
  methods: {
    focusNext(event) {
      if (event.keyCode !== KEY_CODES.backspace) {
        if (event.target.nextElementSibling) {
          event.target.nextElementSibling.focus();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-code-field__list {
  display: flex;
}
.input-code-field__item {
  background-color: theme-color(grays, 100);
  border: 1px solid theme-color(grays, 90);
  box-sizing: border-box;
  border-radius: 4px;
  text-align: center;
  font-style: 32px;
  line-height: 48px;
  height: 48px;
  width: 48px;
  font-weight: 500;
  color: theme-color(grays);
  text-transform: uppercase;

  @include respond-to-custom(550px) {
    height: 36px;
    width: 36px;
    line-height: 36px;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
}
</style>
