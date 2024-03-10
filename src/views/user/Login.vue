<template>
    <form @submit="submit">
        <div class="login col-4 mx-auto mt-5 border p-3">

            <div class="col-12">
                <div class="col-12">email</div>
                <div class="col-12 mt-2">
                    <input class="form-control" v-model="email" />
                </div>
            </div>
            <div class="col-12 mt-2">
                <div class="col-12">password</div>
                <div class="col-12 mt-2">
                    <input type="password" class="form-control" v-model="password" />
                </div>
            </div>
            <div class="col-12 mt-4 d-flex flex-column gap-2 align-items-center">
                <button type="submit"
                    class="btn btn-info col-12 d-flex align-items-center justify-content-center gap-2">
                    <div v-if="loader" class="spinner-border text-light"></div>
                    Login
                </button>
                <span>or </span>
                <RouterLink to="/register">Register</RouterLink>

            </div>
        </div>
    </form>
</template>

<style>
.login {
    height: 300px;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { login } from './services/user-service';
import type { UserModel } from './models/user-model';
import type { BaseModel } from '@/models/base-model';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');
const loader = ref<boolean>(false);


onMounted(() => {
})


const submit = async (e: any) => {
    e.preventDefault()
    const data = {} as UserModel;
    data.email = email.value;
    data.password = password.value;
    loader.value = true
    const res: any = await login(data);
    const userData: BaseModel<UserModel> = res.data;
    loader.value = false;
    if (userData.result?.accessToken) {
        localStorage.setItem('token', userData.result?.accessToken)
        router.push('/userList');
    }
    else {
        toast.error('incorrect usernameor password');
    }
}


</script>