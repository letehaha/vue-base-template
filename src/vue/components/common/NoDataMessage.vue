<template>
  <div class="no-data-message">
    <div class="no-data-message__icon">
      ICON
    </div>
    <h2 class="no-data-message__title">
      {{ title }}
    </h2>
    <p class="no-data-message__message">
      {{ message }}
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
};
</script>

<style lang="scss" scoped>
.no-data-message {
  text-align: center;
  padding: 64px 24px;
  background-color: theme-color(grays, 100);

  @include respond-to-custom(550px) {
    padding: 48px 16px;
  }
}
.no-data-message__title {
  margin-bottom: 8px;
  font-size: 24px;
  color: theme-color(grays, 50);

  @include respond-to-custom(550px) {
    font-size: 20px;
  }
}
.no-data-message__message {
  color: theme-color(grays, 65);
  font-size: 16px;

  @include respond-to-custom(550px) {
    font-size: 13px;
  }
}
.no-data-message__icon {
  color: theme-color(grays, 65);
  height: 72px;
  margin-bottom: 24px;

  svg {
    height: 100%;
  }
}
</style>
