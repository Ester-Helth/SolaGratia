<script setup>
// Importing the routerlinks
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
  <!--Header--> 
  <header>

    <!--upper div of header--> 
    <div class="upperhead">
      
      <!--Logo-->  
      <div>
        <RouterLink to="/">
          <img alt="SolaGratia logo" class="logo" src="https://firebasestorage.googleapis.com/v0/b/solagratia-e08d2.appspot.com/o/Logo%2Flogo.svg?alt=media&token=ddca0330-5b9c-4e22-b912-dbede2fbb2de&_gl=1*jsprnr*_ga*MTA2OTg4NTg3MS4xNjg2ODIxNzQ4*_ga_CW55HF8NVT*MTY5OTAwODQ1My40My4xLjE2OTkwMDkyNjcuNjAuMC4w" width="200" height="200"/>
        </RouterLink>
      </div>

      <div class="upperheadright">
        <!--search-->  
        <div class="search">
          <input type="text" class="search__input" placeholder="Søg her...">
          <button class="search__button">
              <svg 
                class="search__icon"  
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24">
                <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/>
              </svg>
          </button>
        </div>

        <!--Account profile & login system, that is only shown when not logged in--> 
        <div class="log-ind-system">
          <RouterLink to='/log-ind'>
            <div v-if="!isLoggedIn">
              <svg
                alt="SolaGratia profil" 
                class="profile-svg" 
                xmlns="http://www.w3.org/2000/svg" 
                width="24px" 
                height="24px" 
                viewBox="0 0 24 24">
                <path d="M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/>
              </svg>
            </div>
          </RouterLink>
          
          <!--Show logOut button IF logged in--> 
          <button 
          class="differentbutton" @click="logOut" v-if="isLoggedIn">Log ud</button>
        </div>
        
        <!--Basket--> 
        <svg 
          alt="SolaGratia kurv" 
          class="basket-svg" 
          xmlns="http://www.w3.org/2000/svg" 
          width="24px" 
          height="24px" 
          viewBox="0 0 24 24">
          <path d="M16.53 7l-.564 2h-15.127l-.839-2h16.53zm-14.013 6h12.319l.564-2h-13.722l.839 2zm5.983 5c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm11.305-15l-3.432 12h-13.017l.839 2h13.659l3.474-12h1.929l.743-2h-4.195zm-6.305 15c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z" />
        </svg>
        
      </div>
    </div>
    
    <!--lower div of header--> 
    <div class="lowhead">
      <p class="slogan">Femte Mosebog 6:4-9</p>
      <nav>
        <RouterLink to="/grafisk">Grafisk</RouterLink>
        <RouterLink to="/tøj">Tøj</RouterLink>
        <RouterLink to="/køkken">Køkken</RouterLink>
        <RouterLink to="/bøger">Bøger</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
        <RouterLink to="/VIP" v-if="isLoggedIn">VIP</RouterLink>
      </nav>
    </div>
    
  </header>

  <div class="routerview_container">
    <RouterView/>
  </div>

  <!--footer--> 
  <footer>
    <div>
      <p class="footer">© 2023 SolaGratia</p>
    </div>
    <div class="footer">
    <RouterLink to="/fragtsinfo">Fragt og returnering</RouterLink>
    <RouterLink to="/betalingsmetoder">Betalingsmetoder</RouterLink>
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
  max-height: 23vh;
  background-color: var(--lightgreen);
  padding: 15px 10%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  position: fixed;
  width: 100%;
  box-shadow: 0 0 35px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 0;


  /* Upper div of header */
  .upperhead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 30px;

    .upperheadright {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 32px;
    }
  }

   /* Search */
  .search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center; 
  }

  h1 {
  font-size: 42px; 
  font-family: "adorn-condensed-sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.search__input {
  background-color: var(--white);
  border: none;
  color: var(--black);
  padding: 0.6rem 1.3rem;
  border-radius: 25px;
  width: 335px;
  transition: all ease-in-out .5s;
  margin-right: -2rem;
}

.search__input:hover, .search__input:focus {
  box-shadow: 0 0 1em #00000013;
}

.search__input:focus {
  outline: none;
}

.search__input::-webkit-input-placeholder {
  font-weight: 100;
  color: var(--black);
}

.search__button {
  border: none; 
  margin-top: .1em;
}

.search__icon {
  height: 1.3em;
  width: 1.3em;
  fill: var(--icons);
}

 /* profile */
.profile-svg {
  fill: var(--icons);
  height: 30px;
  width: 30px;
  margin-left: 12px;
}

/* basket  */
.basket-svg {
  fill: var(--icons);
  -webkit-transform: scaleX(-1);
  height: 30px;
  width: 30px;
}

 /* Lower div of header */
  .lowhead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;

    nav {
    display: flex;
    column-gap: 50px;
    color: var(--black);
    }
  }
}

 /* Container for the routerview in the body */
.routerview_container {
  margin-top: 21vh;
}

/* Footer */
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: var(--darkgreen);
  width: 100%;
  padding: 0 10%;
}

@media (max-width: 950px) {
  .search {
    display: none;
  }
}

</style>
