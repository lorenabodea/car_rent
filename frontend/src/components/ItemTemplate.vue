<template>
  <div>
    <b>#{{ item.brand }}</b>
    <span style="padding-left: 7px">{{ item.vin }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
  }
}
</script>