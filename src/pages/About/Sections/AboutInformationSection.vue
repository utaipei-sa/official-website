<script setup>
import HorizontalTeamCard from "@/components/content/HorizontalTeamCard.vue";
import DefaultInfoCard from "@/components/content/DefaultInfoCard.vue";

defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section class="py-7">
    <div class="container">
      <div class="row align-items-center">
        <img src="@/assets/images/structure.jpg" alt="學生自治組織架構" />
      </div>

      <template
        v-for="(group, groupIndex) in [
          content.studentAssociation,
          content.studentCouncil,
        ]"
        :key="groupIndex"
      >
        <div class="row g-4 mt-6 mb-4">
          <h2 class="w-auto title-shift">
            {{ groupIndex === 0 ? "學生會" : "學生議會" }}
          </h2>
          <div
            class="row mt-6 align-items-stretch justify-content-center text-center"
          >
            <div
              v-for="leader in group.leaders"
              :key="leader.title"
              class="col-auto head-card"
            >
              <div
                class="head-frame"
                :style="{ backgroundImage: `url(${leader.image})` }"
              ></div>
              <p class="head-name">{{ leader.title }}<br />{{ leader.name }}</p>
            </div>
          </div>
        </div>

        <div
          v-if="group.departments"
          class="d-flex flex-column gap-4 mt-4 mb-4"
        >
          <HorizontalTeamCard
            v-for="department in group.departments"
            :key="department.name"
            class="mt-4"
            :image="department.image"
            :profile="{ name: department.name, link: '#' }"
            :description="department.description"
            :reverse="department.reverse"
          />
        </div>
      </template>

      <div class="row g-4 mt-4 mb-4 d-flex justify-content-center">
        <h6 class="context-shift">
          臺北市立大學學生議會是本校最高的學生自治立法機關，<br />
          代表全體學生行使自治權，肩負監督、審議與推動政策的重要責任。<br />
          學生議會的設立，旨在保障同學權益、促進校園民主，<br />
          並作為學生與校方之間的溝通橋樑。
        </h6>
      </div>
      <div class="row g-4 mt-4 mb-4 justify-content-center">
        <div class="col-lg-10">
          <div class="row g-4 mt-4 mb-4">
            <DefaultInfoCard
              v-for="card in [
                [
                  '議會職權',
                  '立法與審議、預算與決算審查、監督與質詢，以及建議與聲明。',
                ],
                [
                  '議會組成',
                  '議會由當選議員與當然議員組成，確保不同學系之學生權益均衡展現。議員任期固定，並透過會議制度履行表決、審查及討論職責。',
                ],
                [
                  '議會運作',
                  '學生議會設有多個委員會及秘書處，以分工合作的方式確保議事效能。',
                ],
                [
                  '我們的使命',
                  '學生議會秉持民主、透明、專業原則，為同學爭取權益、推動校園公共事務，促進師生對話，讓每位學生的聲音被聽見並化為行動。',
                ],
              ]"
              :key="card[0]"
              col="col-md-6"
              :title="{ text: card[0], class: 'text-dark' }"
              :description="{ text: card[1], class: 'text-muted' }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.head-card {
  text-align: center;
  margin: 0 50px;
}

.head-frame {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 3px solid #444;
  margin: 0 auto;
}

.head-name {
  margin-top: 8px;
  font-size: 24px;
  font-weight: 500;
}

.title-shift {
  margin-left: 10%;
}

.context-shift {
  text-align: center;
  line-height: 2;
  margin: 0 auto;
  max-width: 450px;
}
</style>
