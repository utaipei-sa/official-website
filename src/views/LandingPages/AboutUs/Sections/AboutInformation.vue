<script setup>
//image
import logo from "@/assets/img/logo.png";
// example components
import DefaultInfoCard from "../../../../examples/cards/infoCards/DefaultInfoCard.vue";
import CenteredBlogCard from "../../../../examples/cards/blogCards/CenteredBlogCard.vue";
import RotatingCard from "../../../../examples/cards/rotatingCards/RotatingCard.vue";
import RotatingCardFront from "../../../../examples/cards/rotatingCards/RotatingCardFront.vue";
import RotatingCardBack from "../../../../examples/cards/rotatingCards/RotatingCardBack.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row align-items-center">
        <h3>💡宗旨與架構</h3>
        <div class="col-lg-8">
          <div class="row justify-content-start mt-4 align-items-stretch">
            <DefaultInfoCard
              :icon="{ component: 'how_to_vote', color: 'pink', size: '6xl' }"
              title="發揚與落實校園民主精神"
              description="
                屬於臺北市立大學全體學生的組織，<br>也是北市大最高層級的學生自治團體。"
            />
            <DefaultInfoCard
              :icon="{
                component: 'volunteer_activism',
                color: 'pink',
                size: '6xl',
              }"
              title="增進學生福祉"
              description="為學生謀福利、為學生顧權益，<br>成為學生與學校的溝通橋樑。"
            />
          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              :icon="{ component: 'group', color: 'pink', size: '6xl' }"
              title="培養學生自治能力"
              description="由一群熱心的學生組成，<br>自願無償投入時間與精力，<br>希望自己的一份心力，能讓北市大變得更好。"
            />
            <DefaultInfoCard
              :icon="{ component: 'schema', color: 'pink', size: '6xl' }"
              title="組織架構"
              description="設有行政部門與立法部門（學生議會），<br>相互監督與制衡。"
            />
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <CenteredBlogCard
            :image="logo"
            title="學生會LOGO"
            description="學生會LOGO"
          />
        </div>
      </div>
      <!-- 上排三張 -->
      <div class="row g-4 mt-8 mb-4">
        <h3>🤝 行政部門</h3>
        <div class="col-md-4">
          <RotatingCard>
            <RotatingCardFront icon="paid" title="財務部" />
            <RotatingCardBack
              title="經費的守門員"
              description="負責掌管預算、核帳報銷"
            />
          </RotatingCard>
        </div>
        <div class="col-md-4">
          <RotatingCard>
            <RotatingCardFront icon="groups" title="公關部" />
            <RotatingCardBack
              image=""
              title="學生會的門面擔當"
              description="負責文案設計、粉專經營、校內外等公共關係事宜"
              :action="[{ route: '#', label: 'Learn More' }]"
            />
          </RotatingCard>
        </div>
        <div class="col-md-4">
          <RotatingCard>
            <RotatingCardFront icon="psychology" title="秘書部" />
            <RotatingCardBack
              image=""
              title="各項事務的幕後推手"
              description="負責租借場地、文書處理與各部門協調"
              :action="[{ route: '#', label: 'Learn More' }]"
            />
          </RotatingCard>
        </div>
      </div>
      <!-- 下排三張 -->
      <div class="row g-4">
        <div class="col-md-4">
          <RotatingCard>
            <RotatingCardFront icon="design_services" title="文化部" />
            <RotatingCardBack
              image=""
              title="靈感爆發的活動魂"
              description="籌劃與執行各項全校性活動"
              :action="[{ route: '#', label: 'Learn More' }]"
            />
          </RotatingCard>
        </div>
        <div class="col-md-4">
          <RotatingCard>
            <RotatingCardFront icon="code" title="資訊部" />
            <RotatingCardBack
              image=""
              title="學生會的技術核心"
              description="負責網站建置與個資控管"
              :action="[{ route: '#', label: 'Learn More' }]"
            />
          </RotatingCard>
        </div>
        <div class="col-md-4">
          <RotatingCard>
            <RotatingCardFront icon="lightbulb" title="學權部" />
            <RotatingCardBack
              image=""
              title="兼具想法、主張與勇氣的社會觀察學家"
              description="關心學生議題，為權益發聲"
              :action="[{ route: '#', label: 'Learn More' }]"
            />
          </RotatingCard>
        </div>
      </div>
      <div class="row g-4 mt-8 mb-4">
        <h3>⚖️ 立法部門</h3>
        <p class="textsize-change">
          學生議會由學生選舉產生，代表同學出席學校會議，發表意見、參與決策，爭取應有的權益；<br />
          同時也是學生會的監督者，審查行政部門的預算與提案，確保每一分經費透明合理、每一項計畫真正有益於同學。<br />
          或許不在第一線舉辦活動，但學生議會是制度的守門員。透過閱讀、辯論與思考，讓這艘名為「學生會」的船航行得更正、更遠。<br />
          持續地為學生把關與發聲，讓學生參與不只是口號，而是真正在這所學校留下痕跡的方式。<br />
        </p>
      </div>
    </div>
  </section>
</template>

<style>
.text-pink {
  color: #f77fb3 !important; /* icon 粉紅色 */
}
.bg-gradient-pink {
  background: linear-gradient(135deg, #fbccdf, #fbe1eb) !important;
}
.textsize-change {
  font-size: 18px;
  line-height: 2;
}
</style>
