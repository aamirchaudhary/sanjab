<template>
    <div>
        <span v-if="data[widget.name]">{{ widget.prefix }}{{ numberFormat(data[widget.name], widget.decimal) }}{{ widget.postfix }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            widget: {
                type: Object,
                default: () => {return {};}
            },
            data: {
                type: Object,
                default: () => {return {};}
            }
        },
    }
</script>
