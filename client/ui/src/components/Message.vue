<template>
    <div 
        class="d-flex px-4 mb-2" 
        :class="[{ 'flex-row-reverse' : fromMe }, 'flex-row']"
    >
        <v-card max-width="75%" :color="msgColor">
            <v-card-title class="overline">{{ from }}</v-card-title>
            <v-card-text>
                <div>{{ msg.content }}</div>
                <div class="caption text-right">{{ msg.timestamp }}</div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    props: ['msg', 'name'],
    computed: {
        fromMe() {
            return this.msg.from === this.name
        },
        from() {
            return this.fromMe ? 'You' : this.msg.from
        },
        msgColor() {
            return this.fromMe ? 'success lighten-3' : ''
        }
    }
}
</script>