<template>
  <div
    class="burger"
    :class="{ 'burger--opened': isActive }"
    @click="onClick"
  >
    <i />
    <i />
    <i />
  </div>
</template>

<script>
export default {
  props: {
    isActive: { type: Boolean, required: true },
  },
  methods: {
    onClick() {
      this.$emit('clicked');
    },
  },
};
</script>

<style lang="scss" scoped>
.burger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 12px;
  position: relative;
  cursor: pointer;

  i {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 2px;
    overflow: hidden;
    background-color: theme-color(grays);
    border-radius: 1px;
    transition: transform ease 0.25s, opacity ease 0.25s, visibility ease 0.25s;
    opacity: 1;
    visibility: visible;

    &:first-child { margin-top: -6px; }
    &:last-child { margin-top: 6px; }
  }
}

.burger--opened i:nth-child(2) {
  opacity: 0;
  visibility: hidden;
}

.burger--opened i:first-child {
  margin-top: 0;
  transform: rotate(45deg);
}

.burger--opened i:last-child {
  margin-top: 0;
  transform: rotate(135deg);
}
</style>
