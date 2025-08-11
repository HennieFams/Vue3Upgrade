<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template functional>
    <footer class="the-footer flex-wrap justify-between" :class="classes">
        <p>
            <span>COPYRIGHT @ {{ new Date().getFullYear() }} FAMS v2.0 | Powered by <a href="fams.co.za" target="_blank" rel="nofollow">fams.co.za</a>. All rights Reserved</span>
          <!-- <a href="http://csdtecmo.co.za/" target="_blank" rel="nofollow">Tecmo Automation</a>
          <span class="hidden sm:inline-block">. All rights Reserved</span> -->
        </p>
    </footer>
</template>

<script>
export default {
    name: "the-footer",
    props: {
        classes: {
            type: String,
        }
    }
}
</script>
