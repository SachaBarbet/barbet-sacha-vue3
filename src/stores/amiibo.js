import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import ky from 'ky';

export const amiiboList= ref([]);

export const useAmiiboListStore = defineStore('amiibo-list', () => {
    const currentPage = ref(0);
    const itemsPerPage = ref(10);
    const displayedAmiiboList = ref([]);
    const error = ref(null);
    const loading = ref(false);

    const fetchAmiiboList = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await ky.get('https://www.amiiboapi.com/api/amiibo/').json();
            amiiboList.value = response.amiibo;
        } catch (err) {
            error.value = err;
        } finally {
            displayedAmiiboList.value = []; // Reset displayed list
            currentPage.value = 0; // Reset page
            loadMoreAmiibos();
            loading.value = false;
        }
    };

    const loadMoreAmiibos = () => {
        const start = currentPage.value * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        displayedAmiiboList.value = displayedAmiiboList.value.concat(amiiboList.value.slice(start, end));
        currentPage.value += 1;
        console.log(displayedAmiiboList.value);
    };

    const pageCount = computed(() => Math.ceil(amiiboList.value.length / itemsPerPage.value));

    return {
        amiiboList,
        displayedAmiiboList,
        error,
        loading,
        fetchAmiiboList,
        loadMoreAmiibos,
        pageCount,
        currentPage
    };
});

export const useAmiiboDetailsStore = defineStore('amiibo-details', () => {
    const amiiboDetails = ref({});
    const error = ref(null);
    const loading = ref(false);


    const fetchAmiiboDetails = async (amiiboId) => {

        if (amiiboList.value.length !== 0) {
            const amiibo = amiiboList.value.find((element) => element.tail === amiiboId);
            if (amiibo) {
                amiiboDetails.value = amiibo;
                return;
            }
        }

        // only fetch if not found in cache
        loading.value = true;
        error.value = null;
        try {
            amiiboDetails.value = await ky.get(`https://www.amiiboapi.com/api/amiibo/?id=${amiiboId}`).json();
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    return {
        amiiboDetails,
        error,
        loading,
        fetchAmiiboDetails
    };
})