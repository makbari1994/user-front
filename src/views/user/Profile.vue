<template>
    <Header />

    <form @submit="submit">
        <div class="profile col-4 mx-auto mt-5 border p-3">

            <div class="col-12 mt-2 title">
                User Profile
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
                <div class="col-12">password</div>
                <div class="col-12 mt-2">
                    <input type="password" class="form-control" v-model="userData.password" />
                </div>
            </div>

            <div class="col-12 mt-2">images</div>
            <div class="col-12 p-2 mt-2 d-flex gap-2 flex-wrap border images">

                <img v-for="(item) in images" :src="`${baseUrl}/img/${item}`" />

                <div v-if="images.length == 0">There is no image</div>
            </div>

            <div class="col-12 mt-2">
                <input type="file" @change="upload" />
            </div>

            <div class="col-12 mt-4">
                <button type="submit"
                    class="btn btn-info col-12 d-flex align-items-center justify-content-center gap-2">
                    <div v-if="loader" class="spinner-border text-light"></div>
                    update User Info
                </button>
            </div>
        </div>
    </form>


</template>

<style>
.profile {
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
import { onMounted, ref } from 'vue';
import { getUserInfo, updateUser, uploadUserImage } from './services/user-service';
import { toast } from 'vue3-toastify';
import Header from '@/components/header.vue';

const loader = ref<boolean>(false);

const userData = ref<UserModel>({} as UserModel)
const baseUrl = ref<string>(import.meta.env.VITE_API_BASE_URL);
const images = ref<String[]>([])


onMounted(() => {
    getUser();

})


const getUser = async () => {
    const res: any = await getUserInfo();
    const data: BaseModel<UserModel> = res.data;
    userData.value = data.result;
    images.value = userData.value.image.length > 0 ? userData.value.image.split(',') : [];
}


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



const submit = async (e: any) => {
    e.preventDefault()
    userData.value.image = images.value.toString();
    loader.value = true
    const res: any = await updateUser(userData.value);
    const data: BaseModel<UserModel> = res.data;
    loader.value = false;
    toast.success('Updated Successfully')
    getUser();
}


</script>