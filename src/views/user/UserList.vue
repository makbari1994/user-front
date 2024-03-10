<template>
    <Header />
    <div class="login col-8 mx-auto mt-5 border p-3">
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in userList">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.name }}</td>
                    <td>

                        <div class="action d-flex gap-2 align-items-center">
                            <button class="btn btn-success" @click="like(item)">like</button>
                            <button class="btn btn-danger " @click="dislike(item)">dislike</button>
                        </div>

                    </td>
                </tr>

            </tbody>
        </table>

    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getUserInfo, getUserList } from './services/user-service';
import type { UserModel } from './models/user-model';
import type { BaseModel } from '@/models/base-model';
import Header from './../../components/header.vue'
import { io } from "socket.io-client";
import type { SocketRequestModel } from '@/models/scoket-request-model';
import { toast } from 'vue3-toastify';
import { getCoords } from '@/common/utils';

const userList = ref<UserModel[]>([])
const socket = ref<any>();
const userData = ref<UserModel>({} as UserModel)

onMounted(() => {
    getUsers();
    getUser();
    connectToSocket();
})


const getUsers = async () => {
    const res: any = await getUserList();
    const data: BaseModel<UserModel[]> = res.data;
    userList.value = data.result;
}

const getUser = async () => {
    const res: any = await getUserInfo();
    const data: BaseModel<UserModel> = res.data;
    userData.value = data.result;
    socket.value.emit('join', userData.value.email);
}



const connectToSocket = () => {
    const socketOptions = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token'), // 'Bearer h93t4293t49jt34j9rferek...'
                }
            }
        }
    };
    socket.value = io(import.meta.env.VITE_WS_BASE_URL, socketOptions);
    socket.value.on("connect", () => {
        console.log('socket connected')
    });

    socket.value.on("message", (e: any) => {
        toast.success(e);
        console.log(e)
    });

}

const like = (user: UserModel) => {
    const message = {} as SocketRequestModel;
    message.sender = userData.value.email;
    message.receiver = user.email;
    message.type = 'liked'
    socket.value.emit('like-dislike', message);
}

const dislike = (user: UserModel) => {
    const message = {} as SocketRequestModel;
    message.sender = userData.value.email;
    message.receiver = user.email;
    message.type = 'disliked'
    socket.value.emit('like-dislike', message);
}



</script>