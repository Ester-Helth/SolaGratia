<script setup>

</script>

<template>
    <div class="home_body_container">

        <div class="home_body_innercontainer_top"> 
            <h1 class="text-4xl">Velkommen til SolaGratia</h1>
            <p>Ny dansk hjemmeside, der sælger produkter med skriftsteder fra Bibelen på.</p>
            <p>God fornøjelse!</p>
        </div>

        <div class="homepage_hero_image">
            <img src="https://firebasestorage.googleapis.com/v0/b/solagratia-e08d2.appspot.com/o/Frontpage%20img%2Fhomepage_background.png?alt=media&token=12831f9b-86eb-4dbe-88cf-26dfccfa4599&_gl=1*vi6l1w*_ga*MTA2OTg4NTg3MS4xNjg2ODIxNzQ4*_ga_CW55HF8NVT*MTY5OTAwODQ1My40My4xLjE2OTkwMDg2MzMuNjAuMC4w" alt="hero image">
        </div>



        <!--Yellow infobox about SolaGratia--> 
        <div class="about_container_SolaGratia py-10">
            
            <div class="flex justify-center"> 
                <h1 class="text-4xl">Hvad er SolaGratia?</h1>
            </div>
            <div class="about_inner_container_SolaGratia py-10">
                <div>
                    <h2 class="font-bold text-lg">Om SolaGratia</h2>
                    <p>SolaGratia er en webshop, der startede i 2023, fordi der simpelthen har været et for lille marked i Danmark af produkter med skriftsteder fra Bibelen på. Derfor har vi lavet disse produkter, som I kan finde her på webshoppen, som vi håber vil være til stor glæde og opmuntring.</p>
                </div>
                <div>
                    <h2 class="font-bold text-lg">Produkter</h2>
                    <p>På vores hjemmeside kan man blandt andet finde plakater, kopper, t-shirts mm.. Alt sammen inspireret udfra Bibelvers.</p>
                </div>
                <div>
                    <h2 class="font-bold text-lg">Blog</h2>
                    <p>Vi har også en blog, hvor du kan følge med i vores vandring med Jesus og hvad vi oplever på vores vej.</p>
                </div>
            </div>
            
        </div>
    
    </div>
</template>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
}

.home_body_container {
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    padding-top: 50px;
}

    .home_body_innercontainer_top {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .homepage_hero_image {
        width: auto;
        padding: 0 40% 0 10%;
    }


    // about box 
    .about_container_SolaGratia {
        height: 400px;
        width: 100%;
        margin-top: 35px;
        background-color: var(--yellow);
    }

    .about_inner_container_SolaGratia {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 0 10%;
    }
</style>

