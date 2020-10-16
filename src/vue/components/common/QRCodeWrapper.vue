<template>
  <qr-code
    :value="value"
    :size="size"
    :background="background"
    :foreground="foreground"
    :class-name="className"
    :level="level"
  />
</template>

<script>
import QrCode from 'qrcode.vue';

export default {
  components: {
    QrCode,
  },
  props: {
    value: { type: String, default: '' },
    size: { type: Number, default: 200 },
    background: { type: String, default: '#fff' },
    foreground: { type: String, default: '#000' },
    className: { type: String, default: '' },
    level: { type: String, default: 'L' },
  },
};
</script>
