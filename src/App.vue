<script setup>
import {ref} from 'vue'

const input = ref('')
var iframe_url = 'about:blank'
const gay_text = ref("Enter URL to discover gayness")

function load_iframe(url) {
  const iframe = document.getElementById('iframe')
  iframe.src = url

  return new Promise((resolve, reject) => {
    iframe.onload = resolve
  })
}

async function refresh_iframe(){
  document.getElementById('gay_text').style.fontSize = '5rem'
  gay_text.value = "Checking for gayness..."
  if (input.value.trim() != ""){
    iframe_url = 'https://' + input.value
    await load_iframe('about:blank')
    await load_iframe(iframe_url)

    if (document.getElementById('iframe').contentWindow.length > 0) {
      gay_text.value = "GAY!"
      document.getElementById('gay_text').style.fontSize = '13rem'
    } else {
      gay_text.value = input.value + " is not gay."
      document.getElementById('gay_text').style.fontSize = '5rem'
    }

  } else {
    document.getElementById('gay_text').style.fontSize = '5rem'
    gay_text.value = "Enter URL to discover gayness"
    await load_iframe('about:blank')
  }

}

</script>

<template>

<div id="wrapper" class="flex flex-col flex-nowrap h-screen bg-gradient-to-tr from-rose-500 via-orange-400 to-red-500">

  <div id="header" class="py-5 px-5 flex flex-nowrap justify-between w-full bg-slate-200 bg-opacity-75 shadow-lg">

    <div class="flex w-10/12 bg-white rounded-md shadow-md">
      <label for="input" class="my-2 pt-1 pl-2 pr-0.5">https://</label>
      <input type="url" name="input" v-model="input" @focus="valid_url = true" @keyup.enter="refresh_iframe" class="flex-grow rounded-r-md">
    </div>

    <button @click="refresh_iframe" class="bg-pink-400 px-3 rounded-md shadow-md hover:bg-pink-500 active:shadow-sm active:bg-pink-600">Is It Gay?</button>

  </div>

  <div class="h-full relative overflow-hidden">
    <iframe id="iframe" :src="iframe_url" frameborder="0" class="w-full h-full z-0"></iframe>
    <h6 id="gay_text" style="font-size: 5rem;" class="absolute top-1/2 left-1/2 text-red-600 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none drop-shadow-md text-center z-50">{{gay_text}}</h6>
  </div>

</div>

</template>

<style scoped>

</style>
