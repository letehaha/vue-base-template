<template>
  <button
    :type="type"
    :class="[
      `button button--${size} button--${theme}`,
      {
        'button--shadow': withShadow,
        'button--disabled': disabled,
        'button--outline': outline,
        'button--text': isText,
        'button--has-hover': withHover,
      }
    ]"
    :disabled="disabled"
    @click="!disabled && $emit('click')"
  >
    <div
      v-if="isIconLeftExist"
      class="button__icon-left"
    >
      <slot name="iconLeft" />
    </div>
    <slot />
    <div
      v-if="isIconRightExist"
      class="button__icon-right"
    >
      <slot name="iconRight" />
    </div>
  </button>
</template>

<script>
export const THEMES = Object.freeze({
  orange: 'orange',
  blue: 'blue',
});

export const SIZES = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
});

export default {
  props: {
    type: { type: String, default: 'button' },
    disabled: { type: Boolean, default: false },
    size: {
      type: String,
      default: SIZES.medium,
      validator: size => Object.values(SIZES).includes(size),
    },
    theme: {
      type: String,
      default: THEMES.orange,
      validator: theme => Object.values(THEMES).includes(theme),
    },
    withShadow: { type: Boolean, default: false },
    withHover: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    isText: { type: Boolean, default: false },
  },
  computed: {
    isIconLeftExist() {
      return !!this.$slots.iconLeft;
    },
    isIconRightExist() {
      return !!this.$slots.iconRight;
    },
  },
};
</script>

<style lang="scss" scoped>
$transition: box-shadow .2s ease-out;

.button {
  font-weight: 700;
  font-size: 17px;
  line-height: 1.2;
  border: 1px solid transparent;
  color: theme-color(grays, 100);
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $transition;

  @include respond-to-custom(550px) {
    font-size: 14px;
  }

  &.button--text {
    font-weight: 400;
    font-size: 13px;
  }
  &.button--has-hover {
    transition: $transition, transform .2s ease-out;

    &:hover {
      transform: scale(1.02);
    }
  }
}

.button--large {
  padding: 16px 34px;

  &.button--text {
    padding: 5px 8px;
    font-style: 13px;
  }
}

.button--medium {
  padding: 12px 30px;

  &.button--text {
    padding: 5px 8px;
    font-style: 13px;
  }
}

.button--small {
  padding: 12px 22px;
  font-size: 14px;
  height: 40px;

  &.button--text {
    padding: 5px 8px;
    font-style: 13px;
  }

  @include respond-to-custom(550px) {
    padding: 12px 16px;
  }
}

.button--blue {
  background-color: theme-color(brand);

  &:not(.button--disabled).button--outline,
  &:not(.button--text).button--outline {
    background-color: theme-color(grays, 100);
    border-color: theme-color(brand);
    color: theme-color(brand);
  }

  &:not(.button--disabled):not(.button--text).button--shadow {
    box-shadow: theme-shadow(brand);

    &:hover {
      box-shadow: none;
    }
  }

  &.button--text {
    background-color: transparent;
    color: theme-color(brand);

    &.button--disabled {
      color: theme-color(grays, 90);
    }
  }

  &:not(.button--text).button--disabled {
    background-color: theme-color(grays, 90);
    cursor: not-allowed;
  }
}

.button--orange {
  background-color: theme-color(accent);

  &:active {
    background-color: darken(theme-color(accent), 2%);
  }

  &:not(.button--disabled).button--outline,
  &:not(.button--text).button--outline {
    background-color: transparent;
    border-color: theme-color(accent);
    color: theme-color(accent);
    border-width: 2px;

    &:active {
      border-color: darken(theme-color(accent), 2%);
      color: darken(theme-color(accent), 2%);
    }
  }

  &:not(.button--disabled):not(.button--text).button--shadow {
    box-shadow: theme-shadow(accent);

    &:hover {
      box-shadow: none;
    }
  }

  &.button--text {
    background-color: transparent;
    color: theme-color(accent);

    &.button--disabled {
      color: theme-color(grays, 90);
    }
  }

  &:not(.button--text).button--disabled {
    background-color: theme-color(grays, 90);
    cursor: not-allowed;
  }
}

.button__icon-left {
  margin-right: 14px;
}

.button__icon-right {
  margin-left: 14px;
}
</style>
