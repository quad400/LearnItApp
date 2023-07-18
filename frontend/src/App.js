import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import {
  Signup,Login,Home,ForgetPassword,Activate,
  ResendActivation,ResetPassword,CategoryFilter,CoursePage,
} from "./components";

import store from "./store";
import "./App.css";
import Layout from "./hoc/Layout";
import ProfileUpdate from "./components/profile/ProfileUpdate";
import ProfileDetail from "./components/profile/ProfileDetail";
import BecomeTutor from "./components/profile/BecomeTutor";
import CourseCreate from "./components/course/CourseCreate";
import MyCourses from "./components/course/MyCourses";
import CourseEdit from "./components/course/CourseEdit";
import Requirements from "./components/course/Requirements";
import Syllabus from "./components/course/Syllabus";
import Topic from "./components/course/Topic";
import TopicCreate from "./components/course/TopicCreate";
import Cart from "./components/cart/Cart";
import TopicEdit from "./components/course/TopicEdit";
import CourseUpdate from "./components/course/CourseUpdate";
import Profile from "./components/profile/Profile";
import NotFound from "./components/NotFound";
import AdminPage from "./components/admin/AdminPage";
import AdminCategory from "./components/admin/AdminCategory";
import Settings from "./components/admin/Settings";
import UserListPage from "./components/admin/UserListPage";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Routes>
          
          {/* Authentications System */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget_password" element={<ForgetPassword />} />
          <Route path="/activation/:uid/:token" element={<Activate />} />
          <Route
            path="/password/reset/:uid/:token"
            element={<ResetPassword />}
          />
          <Route path="/resend/activation" element={<ResendActivation />} />
          {/* Course Page */}
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<CoursePage />} />
          <Route path="/category/:category_id" element={<CategoryFilter />} />
          {/* Profile */}
          <Route path="/profile" element={<Profile />}>
            <Route index element={<ProfileDetail />} />
            <Route path="update" element={<ProfileUpdate />} />
          </Route>

          <Route path="/tutor" element={<BecomeTutor />} />
          <Route path="/course/create" element={<CourseCreate />} />
          <Route path="/mycourses" element={<MyCourses />} />
          <Route path="course/edit/:course_id" element={<CourseEdit />}>
            <Route index element={<CourseUpdate />} />
            <Route path="requirement" element={<Requirements />} />
            <Route path="syllabus" element={<Syllabus />} />
            <Route path="syllabus/:syllabus_id" element={<Topic />} />
            <Route
              path=":syllabus_id/topic/:topic_id"
              element={<TopicEdit />}
            />
            <Route
              path="syllabus/:syllabus_id/create"
              element={<TopicCreate />}
            />
          </Route>

          <Route path="admin" element={<AdminPage />}>
            <Route index element={<AdminCategory />} />
            <Route path="users" element={<UserListPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </Provider>
);

export default App;
