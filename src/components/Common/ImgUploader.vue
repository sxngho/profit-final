<template>
  <v-container>
    <div v-if="!image">
      <input type="file" @change="onFileChange" />
    </div>
    <div v-else>
      <img :src="image" width="100%" height="100%"/><br>
      <v-btn @click="removeImage">Remove image</v-btn>
    </div>
  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "ImgUploader",
  data() {
    return {
      image: ''
    };
  },
  methods: {
    removeImage(){
      this.image = "";
    },
    onFileChange(e) {
      // file 세팅
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      const apiUrl = "https://api.imgur.com/3/image";
      const apiKey = "f96b8964f338658";
      let data = new FormData();
      let content = {
        method: "POST",
        headers: {
          Authorization: "Client-ID " + apiKey,
          Accept: "application/json"
        },
        body: data,
        mimeType: "multipart/form-data"
      };
      data.append("image", files[0]);
      fetch(apiUrl, content)
        .then(response => response.json())
        .then(success => {
          this.image = success.data.link;
          FirebaseService.ADD_userImg(this.image);
          alert("업로드 되었습니다");
        })
        .catch();
    }
  }
};
</script>
