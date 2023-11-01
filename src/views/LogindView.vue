<template>
    <div class="logind_container">
      <div class="flex flex-col text-center pb-10 px-40">
        <h1>LOG IND</h1>
        <p>Denne log-ind funktion er kun for dem, som arbejder for SolaGratia, for at de nemt og hurtigt kan lægge nye produkter op til jer, som med det samme kan findes på webshoppen, når de er lagt ind.</p>
      </div>

      <!-- colored box on page -->
      <div class="logind_inner_container gap-y-4">
        <!-- E-mail -->
        <div class="flex flex-col">
          <label for="email">E-mail</label>
          <input type="text" v-model="email"/>
        </div>
                  
        <!-- Password -->
        <div class="flex flex-col">
          <label for="password">Kodeord</label>
          <input type="password" v-model="password"/>
        </div>

        <!-- Remember me checkbox -->
        <div class="flex flex-row">
          <input type="checkbox" id="rememberme" name="rememberme" :true="true" :false="false" v-model="rememberMe" value="rememberme">
          <label for="rememberme">Husk mig</label>
        </div>
          
        <!-- Error message -->
        <p v-if="errMsg">{{ errMsg }}</p>
          
        <!-- Log ind button-->
          <button @click="logIn" class="themebutton mt-2">LOG IND</button>
      </div>

    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';

import { auth } from '../firebase.js'
import { signInWithEmailAndPassword } from 'firebase/auth';

import router from '../router'

let email = ref ('')
let password = ref ('')

const errMsg = ref ('')
const rememberMe = ref(false);


    // Function to handle login
    const login = () => {
      // Handle the login logic here
      if (rememberMe.value) {
        navigator.credentials.store(new PasswordCredential({
          id: email.value,
          password: password.value,
        }));
      }
      // Continue with the login process
    };

    // Check for saved credentials when the component is mounted
    const loadSavedCredentials = async () => {
      const credentials = await navigator.credentials.get({
        password: true,
      });

      if (credentials && credentials.type === 'password') {
        email.value = credentials.id;
        password.value = credentials.password;
      }
      debugger
    };

    onMounted(() => {
      loadSavedCredentials();
    });
/* 
const rememberMe = ref(false);
 */

/* code for login auth with firebase  --> user is send to /navguard */
let logIn = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log("test date", data)
        router.push('/navguard')

        if (rememberMe.value) {
        navigator.credentials.store(new PasswordCredential({
          id: email.value,
          password: password.value,
        }));
      }


        //if (rememberMe.value) {
        // If "Remember Me" is checked, save user session data for a longer period
        // You can use cookies, local storage, or a backend service for this.
        // Example using local storage:
       /*  localStorage.setItem('rememberedUser', JSON.stringify({ email: email.value }));
        console.log("rememberMe", rememberMe.value) */
    //  }
    })




    /* err message in different cases*/
    .catch((error) => {
    switch(error.code) {
      case "auth/invalid-email":
        errMsg.value = "Ugyldig eller manglende e-mail."
        break;
      case "auth/user-disabled":
        errMsg.value = "Denne bruger er deaktiveret."
        break;
      case "auth/user-not-found":
        errMsg.value = "Brugeren kan ikke findes i databasen."
        break;
      case "auth/wrong-password":
        errMsg.value = "Ugyldigt password."
        break;
      default:
        errMsg.value = "En fejl er opstået. Prøv igen med en anden email eller adgangskode."
        break;
    }
    })
}


/* 
    // Check for saved session data when the component is mounted
    onMounted(() => {
      const rememberedUser = localStorage.getItem('rememberedUser');
      if (rememberedUser) {
        rememberMe.value = rememberMe;
        email.value = JSON.parse(rememberedUser).email;
      }
    }); */


</script>

<style lang="scss">

// If base.css gets to work, this should be removed
h1 {
    color: var(--black);
    font-size: 35px; 
    font-family: "adorn-condensed-sans", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  // The whole routerpage
.logind_container{
  padding: 30px 10%; 
}

// Colored box on page
.logind_inner_container {
  background-color: var(--rose);
  height: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

// This should be removed if base.css will gets to work
input {
  padding: 3px 10px;
  border-radius: 4px;
  margin-top: 5px;
}
</style>