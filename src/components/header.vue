<template>

    <header>
        <div class="menus">
            <RouterLink to="/profile">Profile</RouterLink>
            <RouterLink to="/userlist">User List</RouterLink>
            <span class="logout" @click="logout">Logout</span>
        </div>
    </header>

</template>

<style>
header {
    width: 100%;
    height: 60px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
}

.menus {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.logout {
    color: blue;
    cursor: pointer;
}
</style>

<script lang="ts" setup>
import { useRouter } from 'vue-router';


const router = useRouter();

const logout = () => {
    localStorage.removeItem('token');
    router.push('/login')

}
</script>