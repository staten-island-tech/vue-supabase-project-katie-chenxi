<!-- <template>
    <div>

    </div>
</template>

<script setup>
import{ ref, onMounted } from "vue";
import {userRoute} from "vue-router"
let post = ref("");
const route = useRoute();
async function getPosts(){
    let res = await fetch('${route.params.id}')
    let data = await res.json();
    post.value = data;
}
</script>

<style scoped>

</style> -->