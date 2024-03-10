<template>
    <Header />


    <form @submit="submit">
        <div class="register col-4 mx-auto mt-5 border p-3">

            <div class="col-12 mt-2 title">
                Register
            </div>

            <div class="col-12 mt-2">
                <div class="col-12">email</div>
                <div class="col-12 mt-2">
                    <input class="form-control" v-model="userData.email" />
                </div>
            </div>

            <div class="col-12 mt-2">
                <div class="col-12">name</div>
                <div class="col-12 mt-2">
                    <input type="text" class="form-control" v-model="userData.name" />
                </div>
            </div>

            <div class="col-12 mt-2">
                <div class="col-12">password (At least 6 letters)</div>
                <div class="col-12 mt-2">
                    <input type="password" class="form-control" v-model="userData.password" />
                </div>
            </div>
            <div class="col-12 text-danger mt-2" v-if="userData.password?.length < 6">password should be6 letters </div>

            <div class="col-12 mt-3">images</div>
            <div class="col-12 p-2 mt-2 d-flex gap-2 flex-wrap border images">

                <img v-for="(item) in images" :src="`${baseUrl}/img/${item}`" />

                <div v-if="images.length == 0">There is no image</div>
            </div>

            <div class="col-12 mt-2">
                <input type="file" @change="upload" />
            </div>

            <div class="col-12 mt-3">
                <div class="col-12 mt-2">location</div>
                <div class="col-12 mt-2">
                    <Map @location="onLocation" />
                </div>
            </div>

            <div class="col-12 mt-4">
                <button type="submit"
                    class="btn btn-info col-12 d-flex align-items-center justify-content-center gap-2">
                    <div v-if="loader" class="spinner-border text-light"></div>
                    Register
                </button>
            </div>
        </div>
    </form>


</template>

<style>
.register {
    min-height: 100px;
}

.title {
    font-weight: 600;
    font-size: 20px;
}

.images img {
    width: 100px;
    height: 100px;
}
</style>

<script lang="ts" setup>
import type { BaseModel } from '@/models/base-model';
import type { UserModel } from './models/user-model';
import Map from './../../components/Map.vue'
import { onMounted, ref } from 'vue';
import { register, updateUser, uploadUserImage } from './services/user-service';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import Header from '@/components/header.vue';
const loader = ref<boolean>(false);
const userData = ref<UserModel>({} as UserModel)
const baseUrl = ref<string>(import.meta.env.VITE_API_BASE_URL);
const images = ref<String[]>([])
const router = useRouter();


onMounted(() => {
})


const upload = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const res: any = await uploadUserImage(formData);
    const data: BaseModel<string> = res.data;
    if (data.result) {
        images.value.push(data.result);
    }
}

const onLocation = (e: any) => {
    userData.value.latitude = e.lat;
    userData.value.longitude = e.long;
}



const submit = async (e: any) => {
    e.preventDefault()
    if (userData.value.password?.length >= 6) {
        userData.value.image = images.value.toString();
        loader.value = true;
        try {
            const res: any = await register(userData.value);
            const data: BaseModel<UserModel> = res.data;
            loader.value = false;
            toast.success('registerd Successfully')
            router.push('/login')
        }
        catch (e) {
            loader.value = false;
        }
    }
}


</script>