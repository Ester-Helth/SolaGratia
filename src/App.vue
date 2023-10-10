<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { onMounted, ref } from 'vue'

import { auth } from './firebase.js'
import { signOut, onAuthStateChanged } from 'firebase/auth';

import router from './router'

let isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      console.log("User logged in", auth.currentUser)
    } else {
      isLoggedIn.value = false
      console.log("User logged out", auth.currentUser)
    }
  })
})

let logOut = () => {
  signOut(auth)
  .then(() => {
    console.log("User logged out", auth.currentUser)
    router.push('/login')
  })
  .catch((error)=> {
    console.log(error)
  })
}


</script>

<template>
  <header>
    <div class="upperhead">
      <div>
        <img alt="SolaGratia logo" class="logo" src="@/assets/logo.svg" width="100" height="100"/>
      </div>

      <div class="upperheadright">
        <div class="search">
          <input type="text" class="search__input" placeholder="Søg her...">
          <button class="search__button">
              <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                  <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
              </svg>
          </button>
        </div>
        <img alt="SolaGratia kurv" class="kurv" src="@/assets/kurv.svg" width="40px" height="40px"/>
      </div>
    </div>
    
    <div class="lowhead">
      <p>Femte Mosebog 6:6-9</p>
      <nav>
        <RouterLink to="/plakater">Plakater</RouterLink>
        <RouterLink to="/tøj">Tøj</RouterLink>
        <RouterLink to="/køkkenting">Kopper</RouterLink>
        <RouterLink to="/bøger">Bøger</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
      </nav>
      <button @click="logOut" v-if="isLoggedIn">Log Out</button>
    </div>
    
  </header>

  <RouterView/>

  <footer>
    <div>
      <p>© 2023 SolaGratia</p>
    </div>
    <div class="footerlinks">
    <RouterLink to="/fragtsinfo">Fragt og returnering</RouterLink>
    <RouterLink to="/betalingsinfo">Betalingsmetoder</RouterLink>
    <RouterLink to="/cookies">Personoplysninger og cookies</RouterLink>
    <RouterLink to="/kontakt">Kontakt</RouterLink>
    </div>
  </footer>

  

</template>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
}

/* Header */
header {
  max-height: 100vh;
  background-color: var(--lightgreen);
  padding: 15px 10% 30px 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .upperhead {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .upperheadright {
      display: flex;
      flex-direction: row;
      column-gap: 40px;
    }
  }

  .search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center; 
  }

.search__input {
  background-color: var(--white);
  border: none;
  color: var(--black);
  padding: 0.6rem 1rem;
  border-radius: 30px;
  width: 26em;
  transition: all ease-in-out .5s;
  margin-right: -2rem;
}

.search__input:hover, .search__input:focus {
  box-shadow: 0 0 1em #00000013;
}

.search__input:focus {
  outline: none;
  background-color: #f0eeee;
}

.search__input::-webkit-input-placeholder {
  font-weight: 100;
  color: #ccc;
}

.search__input:focus + .search__button {
  background-color: #f0eeee;
}

.search__button {
  border: none;
  
  margin-top: .1em;
}

.search__button:hover {
  cursor: pointer;
}

.search__icon {
  height: 1.3em;
  width: 1.3em;
  fill: #b4b4b4;
}
  .lowhead {
    display: flex;
    justify-content: space-between;

    nav {
    display: flex;
    column-gap: 65px;
    color: var(--black);
    }
  }
}

/* Footer */
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: var(--darkgreen);
  width: 100%;
  color: var(--white);
  padding: 0 10%;

  .footerlinks {
    display: flex;
    column-gap: 25px;
  }
}


/* Responsive @media */
@media (min-width: 1024px)
{
  header {
    padding: 20px 10%;
  }
}

</style>
