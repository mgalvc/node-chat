<template>
    <v-app>
        <Chat></Chat>
    </v-app>
</template>

<script>
import Chat from './components/Chat';

export default {
    name: 'App',
    components: {
        Chat,
    },
    data: () => ({
        //
    }),
};
</script>
