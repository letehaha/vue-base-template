<template>
  <div
    class="select-field"
    :class="{
      'select-field--disabled': $attrs.disabled,
      'select-field--active': isDropdownOpened
    }"
  >
    <span
      v-if="label"
      class="select-field__label"
    >
      {{ label }}
    </span>
    <div
      v-click-outside="closeDropdown"
      class="select-field__wrapper"
    >
      <div
        class="select-field__input"
        :tabindex="$attrs.readonly || $attrs.readonly === ''
          ? -1
          : $attrs.tabindex"
        v-bind="$attrs"
        @click="toggleDropdown"
      >
        <template v-if="withIcons && selectedValue">
          <div class="select-field__value-icon">
            <template v-if="iconIsComponent">
              <component :is="getIcon(selectedValue)" />
            </template>
            <template v-else>
              <img
                :src="getIcon(selectedValue)"
                alt="icon"
              >
            </template>
          </div>
        </template>
        <template v-else>
          {{ selectedValue || placeholder }}
        </template>
        <div class="select-field__arrow" />
      </div>
      <div
        v-if="isDropdownOpened"
        class="select-field__dropdown"
        :class="`select-field__dropdown--${position}`"
      >
        <template v-if="withSearchField">
          <input
            class="select-field__dropdown-search"
            type="search"
            autocomplete="autocomplete_off_hack"
            @input="filterLabels"
          >
        </template>
        <div class="select-field__dropdown-values">
          <template v-for="(item, i) in labels">
            <button
              :key="item"
              class="select-field__dropdown-item"
              :class="{
                'select-field__dropdown-item--highlighed': selectedValue === item
              }"
              @click="selectItem(i)"
            >
              <template v-if="withIcons">
                <div class="select-field__value-icon">
                  <template v-if="iconIsComponent">
                    <component :is="getIcon(item)" />
                  </template>
                  <template v-else>
                    <img
                      :src="getIcon(item)"
                      alt="icon"
                    >
                  </template>
                </div>
              </template>
              {{ item }}
            </button>
          </template>
        </div>
      </div>
    </div>
    <p
      v-if="errorMessage"
      class="select-field__err-mes"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>

const EVENTS = {
  input: 'input',
};

export const POSITIONS = Object.freeze({
  bottom: 'bottom',
  top: 'top',
});

export default {
  props: {
    label: { type: String, default: undefined },
    value: { type: [Object, String], default: undefined },
    values: { type: Array, required: true },
    labelKey: { type: String, default: undefined },
    withIcons: { type: Boolean, default: false },
    iconKey: { type: String, default: undefined },
    // if you want to display icon as a plain SVG object, import it
    // using "() => import(path/to/icon)" syntax
    // Example: () => import('@/assets/icons/icon.svg?inline')
    iconIsComponent: { type: Boolean, default: false },
    placeholder: { type: String, default: undefined },
    withSearchField: { type: Boolean, default: false },
    errorMessage: { type: String, default: undefined },
    position: { type: String, default: POSITIONS.bottom },
  },
  data: () => ({
    isDropdownOpened: false,
    selectedValue: null,
    filterQuery: '',
  }),
  computed: {
    labels() {
      if (Array.isArray(this.values[0])) {
        if (this.withSearchField && this.filterQuery) {
          return this.values
            .filter(str => !str.toLowerCase().search(this.filterQuery));
        }
        return this.values;
      }
      if (typeof this.values[0] === 'object' && this.values[0] !== null) {
        const values = this.values
          .map(obj => (this.labelKey ? obj[this.labelKey] : obj.label));
        if (this.withSearchField && this.filterQuery) {
          return values
            .filter(str => !str.toLowerCase().search(this.filterQuery));
        }
        return values;
      }
      if (this.withSearchField && this.filterQuery) {
        return this.values
          .filter(str => !str.toLowerCase().search(this.filterQuery));
      }
      return this.values;
    },
  },
  mounted() {
    if (this.value) {
      if (typeof this.values[0] === 'object' && this.values[0] !== null) {
        this.selectedValue = this.labelKey
          ? this.value[this.labelKey]
          : this.value.label;
      } else {
        this.selectedValue = this.value;
      }
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpened = !this.isDropdownOpened;
    },
    closeDropdown() {
      this.isDropdownOpened = false;
    },
    selectItem(index) {
      this.selectedValue = this.labels[index];
      this.filterQuery = '';
      this.$emit(EVENTS.input, this.values[index]);
      this.closeDropdown();
    },
    filterLabels(event) {
      const { value } = event.target;
      this.filterQuery = value.toLowerCase();
    },
    getIcon(label) {
      const value = this.values.find(val => val[this.labelKey || 'label'] === label);
      return value[this.iconKey || 'icon'];
    },
  },
};
</script>

<style lang="scss" scoped>
.select-field {
  position: relative;
  width: 100%;
  flex: 1;
}
.select-field__input {
  font-size: 14px;
  line-height: 1.2;
  color: theme-color(grays, 50);
  padding: 14px 16px;
  padding-right: 36px;
  min-height: 50px;
  background-color: theme-color(grays, 100);
  border: 1px solid theme-color(grays, 90);
  box-sizing: border-box;
  border-radius: 4px;
  outline: none;
  width: 100%;
  cursor: pointer;
  text-overflow: ellipsis;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
}
.select-field__label {
  font-weight: 400;
  font-size: 13px;
  line-height: 1.2;
  color: theme-color(grays);
  margin-bottom: 8px;
}
.select-field__wrapper {
  position: relative;
}
.select-field__dropdown {
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  visibility: hidden;
  opacity: 0;
  padding: 8px 0;
  transition: .2s ease-out;
  background-color: theme-color(grays, 100);
  box-shadow: theme-shadow(3);
  z-index: $z-select-field-dropdown;

  .select-field--active & {
    visibility: visible;
    opacity: 1;
  }

  &--top {
    top: initial;
    bottom: 100%;
    box-shadow: theme-shadow(n3);
  }
}
.select-field__dropdown-values {
  @extend %custom-scroll;

  overflow: auto;
  max-height: 200px;

  @include respond-to-custom(450px) {
    max-height: 170px;
  }
}
.select-field__dropdown-item {
  display: flex;
  align-items: center;
  transition: background-color .3s ease-out;
  border: none;
  background-color: theme-color(grays, 100);
  font-size: 14px;
  line-height: 1.2;
  color: theme-color(grays, 50);
  padding: 16px;
  width: 100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;

  @include respond-to-custom(450px) {
    padding: 12px 16px;
  }

  &--highlighed {
    background-color: theme-color(grays, 96);
  }

  &:hover {
    background-color: theme-color(grays, 96);
  }
}
.select-field__dropdown-search {
  padding: 8px;
  width: calc(100% - 16px);
  outline: none;
  border: 1px solid theme-color(grays, 90);
  color: theme-color(grays, 50);
  border-radius: 4px;
  margin: 0 8px 8px;
}

.select-field__arrow {
  position: absolute;
  width: 20px;
  height: 20px;
  top: calc(50% - 11px);
  right: 10px;
  background-color: theme-color(grays, 100);

  &:after,
  &:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 2px;
    background-color: theme-color(grays, 80);
    border-radius: 2px;
    transform: rotate(45deg);
    top: 10px;
    left: inherit;
    transition: transform 0.15s ease-out;
  }

  &:before {
    left: 5px;
    transform: rotate(-45deg);
  }

  .select-field--active & {
    &:before { transform: rotate(45deg); }
    &:after { transform: rotate(-45deg); }
  }
}
.select-field__err-mes {
  color: theme-color(error);
  font-size: 12px;
}
.select-field__value-icon {
  height: 20px;
  width: 20px;
  margin-right: 8px;
  flex: none;

  svg {
    height: 20px;
    width: 20px;
    color: theme-color(brand);
  }

  img {
    height: 100%;
  }
}
</style>
