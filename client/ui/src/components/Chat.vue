<template>
    <div class="container">
        <v-card
            class="ma-auto"
            width="75%"
        >
            <v-card-title class="success white--text">Live Vue Chat</v-card-title>
            
            <v-text-field v-model="name" color="success" class="mt-6 px-6" label="Quem é você?"></v-text-field>
            
            <v-card-text class="messages" v-chat-scroll>
                <Message v-for="msg in messages" :key="msg.id" :name="name" :msg="msg"></Message>
            </v-card-text>
            
            <v-card-actions> 
                <v-textarea
                    color="success"
                    label="Digite sua mensagem"
                    outlined
                    rows=1
                    auto-grow
                    append-icon="mdi-send"
                    class="px-4"
                    v-model="newMessage"
                    @click:append="sendMessage"
                    @keydown="keyDown"
                ></v-textarea>
            </v-card-actions>
        </v-card>
    </div>    
</template>

<script>
import Message from '@/components/Message'
import io from 'socket.io-client'
const moment = require('moment')

export default {
    components: {
        Message
    },
    data() {
        return {
            messages: [],
            newMessage: '',
            name: '',
            socket: null
        }
    },
    methods: {
        sendMessage() {
            if(this.newMessage.trim() && this.name) {
                let message = {
                    id: this.messages.length,
                    content: this.newMessage.trim(),
                    from: this.name,
                    timestamp: moment().format('HH:mm')
                }

                this.messages.push(message)
                this.socket.emit('message', message)
            }
            this.newMessage = "";
        },
        keyDown(e) {
            if(e.key === 'Enter') {
                this.sendMessage()
                e.preventDefault()
            }
        }
    },
    created() {
        this.socket = io('http://10.0.0.106:3000')
        this.socket.on('message', (msg) => {
            this.messages.push(msg)
        })
    }
}
</script>

<style scoped>
.messages {
    max-height: 400px;
    overflow: auto;
}

.messages::-webkit-scrollbar-track {
	background-color: white;
}

.messages::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: #E0E0E0;
}

.messages::-webkit-scrollbar {
    width: 5px;
    background-color: #F5F5F5;
}
</style>