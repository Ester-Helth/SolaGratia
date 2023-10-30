<script setup>

</script>

<template>
    <div class="grafik-container">

       

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

.grafik-container {
    display: flex;
    background-color: var(--white);
    padding: 0;
    }

    .about_container_SolaGratia {
        height: 400px;
        width: 100%;
        margin-top: 100px;
        background-color: var(--yellow);
    }

    .about_inner_container_SolaGratia {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 0 10%;
    }
</style>

