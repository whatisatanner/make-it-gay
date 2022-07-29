<script setup>
import {ref, computed} from 'vue'

const input = ref('')
var iframe_url = 'about:blank'
const valid_url = ref(true)

function load_iframe(url) {
  const iframe = document.getElementById('iframe')
  iframe.src = url

  return new Promise((resolve, reject) => {
    iframe.onload = resolve
  })
}

async function refresh_iframe(){
  iframe_url = 'https://' + input.value
  await load_iframe('about:blank')
  await load_iframe(iframe_url)

  document.activeElement.blur()

  if (document.getElementById('iframe').contentWindow.length > 0) {
    valid_url.value = true
  } else {
    valid_url.value = false
  }

}

</script>

<template>

<div id="wrapper" class="flex flex-col flex-nowrap h-screen bg-gradient-to-tr from-pink-400 via-red-400 to-yellow-400">

  <div id="header" class="py-5 px-5 flex flex-nowrap justify-between w-full bg-slate-200 bg-opacity-75 shadow-lg">

    <div class="flex w-10/12 bg-white rounded-md shadow-md">
      <label for="input" class="my-2 px-2">https://</label>
      <input type="url" name="input" v-model="input" @focus="valid_url = true" @keyup.enter="refresh_iframe" class="flex-grow rounded-r-md">
    </div>

    <button @click="refresh_iframe" class="bg-pink-400 px-3 rounded-md shadow-md hover:bg-pink-500 active:shadow-sm active:bg-pink-600">Is It Gay?</button>

  </div>

  <div v-show="valid_url" class="flex-grow flex flex-nowrap">
    <iframe id="iframe" :src="iframe_url" frameborder="0" class="w-full h-full overflow-hidden fixed"></iframe>
    <div class="flex justify-center align-center w-full h-full">
      <h1 id="gay_text" class="m-auto text-5xl text-red-600">GAY!</h1>
    </div>
  </div>

  <div v-show="!valid_url" class="flex-grow flex text-center align-center">
    <p class="m-auto text-slate-900 text-7xl">{{input}} is not gay</p>
  </div>

</div>

</template>

<style scoped>

#iframe {
  z-index: 1;
}

#gay_text {
  z-index: 2;
  font-size: 15em;
}

</style>
