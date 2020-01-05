<template>
  <div>
    <b>#{{ item.email }}</b>
    <span style="padding-left: 7px">{{ item.lastname }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
  }
}
</script>