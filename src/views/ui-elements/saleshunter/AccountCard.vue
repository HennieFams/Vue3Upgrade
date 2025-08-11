<template>
    <div class="vx-row">
        <!-- Background Color -->
        <div class="vx-col w-full sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-base">
            <vx-card
                title="Background Color"
                title-color="#fff"
                card-background="primary"
                content-color="#fff">
                <p class="mb-3">You can use <strong>card-background</strong> prop to change background color of card. This prop supports hex, rgba, rgb and theme colors.</p>
                <p class="mb-3">Oat cake powder sesame snaps. Chocolate bar dessert bonbon chocolate bar pudding apple pie muffin chocolate ice cream. I love bear claw I love.</p>
            </vx-card>
        </div>

        <!-- Gradient Background Color  md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base -->
        <div class="vx-col w-full sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-base">
            <vx-card
                title="Gradient Background Color"
                title-color="#fff"
                content-color="#fff"
                card-background="linear-gradient(120deg, #7f7fd5, #86a8e7, #91eae4)">
                <p class="mb-3">You can use <strong>card-background</strong> prop to change background color of card. This prop supports hex, rgba, rgb and theme colors.</p>
                <p class="mb-3">Oat cake powder sesame snaps. Chocolate bar dessert bonbon chocolate bar pudding apple pie muffin chocolate ice cream. I love bear claw I love.</p>
            </vx-card>
        </div>

    </div>
</template>

<script>
export default{
  data() {
    return {
   
    }
  }
}
</script>
