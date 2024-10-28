<script setup>
</script>
<template>
     <div class="modal">
        <form>
            <div class="close_form">
                <ion-icon name="close-outline"></ion-icon>
            </div>
            <div class="form_item">
                <h3></h3>
            </div>
            <div class="form_item">
                <label for="">Email</label>
                <br>
                <input type="text" >
                <div class="message_error"></div>
            </div>  
            <div class="form_item">
                <label for="">Tên tài khoản</label>
                <br>
                <input type="text" >
                <div class="message_error"></div>
            </div>
            <div class="form_item">
                <label for="">Mật khẩu cũ</label>
                <br>
                <input type="text" >
                <div class="message_error"></div>
            </div>  
            <div class="form_item">
                <label for="">Nhâp mật khẩu mơi</label>
                <br>
                <input type="text" >
                <div class="message_error"></div>
            </div>  
            <div class="form_item">
                <label for="">Nhâp mật khẩu mơi</label>
                <br>
                <input type="text" >
                <div class="message_error"></div>
            </div>  
            <!-- <ImageInput
                :image="currentCourse.image"
                @handleImange="handleImage"
                :error="errorCourse.image"
            ></ImageInput>   -->
            <div class="form_item">
                <button>Submit</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
.modal {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000000000000000000000000000000000001;
}
form {
    width: 400px;
    background-color: white;
    padding: 30px;
    height: 450px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position:relative
}
.form_item{
    margin-bottom: 15px;
}
.form_item input{
    margin-top:5px;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.397);
    padding-left: 10px;;
}
button{
    width: 100%;
    height: 40px;
    background-color: rgba(0, 0, 255, 0.733);
    color: white;
    border: none;
    border-radius:10px;
    cursor: pointer;
}
.message_error{
    color: red;
    font-size: small;
    margin-top: 5px;
}
.close_form{
    position: absolute;
    top:0;
    cursor: pointer;
    right:0;
   width: 40px;
   height:40px;
   background-color:rgba(255, 0, 0, 0.932);
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: larger;
   color: white;
   border-top-right-radius: 12px;
   border-bottom-left-radius:12px ;
}
</style>