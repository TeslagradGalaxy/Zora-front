import { createRouter, createWebHistory } from "vue-router";
import login from "../components/login.vue";
import stuHome from "../views/stu/index.vue";
import ExamPage from "../views/stu/components/ExamPage.vue";
import teacher from "../views/teacher/index.vue";
import choiceLibrary from "../views/Auth/choiceLibrary.vue";
import appliedLibrary from "../views/Auth/appliedLibrary.vue";
import createChoice from "../views/Auth/createChoice.vue";
import createApplied from "../views/Auth/createApplied.vue";
import createExam from "../views/Auth/createExam.vue";
import ExamLibrary from "../views/Auth/ExamLibrary.vue";
import ExamLibraryDetail from "../views/Auth/ExamLibraryDetail.vue";
import admin from "../views/admin/index.vue";
const routes = [
  {
    path: "/",
    component: login,
  },
  {
    path: "/stu",
    component: stuHome,
  },
  {
    path: "/teacher",
    component: teacher,
  },
  {
    path: "/admin",
    component: admin,
  },
  {
    path: "/exam/:examId",
    component: ExamPage,
  },
  {
    path: "/teacher/choiceLibrary",
    component: choiceLibrary,
  },
  {
    path: "/teacher/appliedLibrary",
    component: appliedLibrary,
  },
  {
    path: "/teacher/createChoice",
    component: createChoice,
  },
  {
    path: "/teacher/createApplied",
    component: createApplied,
  },
  {
    path: "/teacher/createExam",
    component: createExam,
  },
  {
    path: "/teacher/ExamLibrary",
    component: ExamLibrary,
  },
  {
    path: "/teacher/ExamLibraryDetail/exam/:id",
    component: ExamLibraryDetail,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
