<template>
    <div class="console-container text-muted font-size-18">
        <div class="w-100 px-3 mt-3">
            <p>Test Case Logs</p>
        </div>
        <hr class="border border-secondary">
        <div class="w-100 row px-3">
            <div v-for="log in logs" class="col-12 d-flex">
                <p class="w-25 m-0 p-0">2023-10-25 15:00: </p>
                <p class="m-0 p-0 w-75">{{ log.message }}</p>
            </div>
            <span class="col-12">><span class="blinking-cursor">_</span></span>
        </div>
    </div>
</template>

<script>
    import { Client } from '@stomp/stompjs';
    export default {
        data() {
            return {
                stompClient: null,
                logs: [],
                sessionId: null
            }
        },  
        watch: {
            sessionId(newValue) {
                this.$emit('execute', newValue)
            }
        },
        mounted() {
            let self = this
            var webSocket = new WebSocket('ws://localhost:8080/logs/dsa13-dasj1-312sa');
            webSocket.onmessage = function(data) {
                let message = data.data 
                try{
                    self.logs.push(JSON.parse(message)); 
                } catch(e) {
                    self.sessionId = message
                    self.logs.push({
                        timestamp: Date.now(),
                        message: "Session ID: " + message
                    })
                }
            }            

            webSocket.addEventListener("open", (event) => {
                self.logs.push({
                    timestamp: Date.now(),
                    message: "Connection to Websocket established."
                })
            });
            // this.stompClient = new Client({
            //     brokerURL: 'ws://localhost:8080/logs'
            // });

            // this.stompClient.onConnect = (frame) => {
            //     console.log('Connected: ' + frame);
            //     this.stompClient.subscribe('/', (greeting) => {
            //         console.log(JSON.parse(greeting.body).content)
            //     });
            // };

            // this.stompClient.activate();

            // this.stompClient.onWebSocketError = (error) => {
            //     console.error('Error with websocket', error);
            // };

            // this.stompClient.onStompError = (frame) => {
            //     console.error('Broker reported error: ' + frame.headers['message']);
            //     console.error('Additional details: ' + frame.body);
            // };
        },
        methods: {
            send() {
                this.stompClient.publish({
                    destination: "/app/hello",
                    body: JSON.stringify({'name': 'Zeke'})
                });
            }
        }
    }

</script>

<style scoped>
    .console-container {
        width: 90%;
        height: 90%;
        background-color: black;
    }
    .blinking-cursor {
        /*code commented for brevity*/
        animation: cursor-blink 0.8s steps(1) infinite;
        display: inline-block;
    }
    @keyframes cursor-blink {
        0% {
            display: none;
        }
        50% {
            display: inline-block;
        }
        100% {
            display: none;
        }
    }
</style>