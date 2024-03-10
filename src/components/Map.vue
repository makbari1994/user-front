<template>
    <div id="map"></div>
</template>

<style>
#map {
    width: 100%;
    height: 200px;
    box-shadow: 0 0 8px 1px var(--orange) !important;
}
</style>

<script lang="ts" setup>
import { getCoords } from '@/common/utils';
import { onMounted, ref } from 'vue';
const google = (window as any).google
const markers: any = [];
const map = ref<google.maps.Map>({} as google.maps.Map);
const emit = defineEmits(["location"]);

onMounted(() => {
    initMap();
})

const initMap = async () => {
    const coords: any = await getCoords();
    sendLocation(coords.lat, coords.long)
    var mapProp = {
        center: new google.maps.LatLng(coords.lat, coords.long),
        zoom: 15,
    };
    map.value = new google.maps.Map(document.getElementById("map") as HTMLElement, mapProp);
    const marker = new google.maps.Marker({ position: new google.maps.LatLng(coords.lat, coords.long) });
    marker.setMap(map.value);
    markers.push(marker)
    google.maps.event.addListener(map.value, 'click', function (event: any) {
        placeMarker(map.value, event.latLng);
    });
}

const placeMarker = (map: google.maps.Map, location: any) => {
    deleteMarkers();
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker)
    sendLocation(location.lat(), location.lng())
}

// Sets the map on all markers in the array.
const setMapOnAll = (map: google.maps.Map | null) => {
    for (let i = 0; i < markers.length; i++) {
        console.log(markers[i])
        markers[i].setMap(null);
    }
}

const deleteMarkers = () => {
    setMapOnAll(null);
    markers.value = [];
}


const sendLocation = (lat: number, long: number) => {
    emit('location', { lat, long })
}

</script>