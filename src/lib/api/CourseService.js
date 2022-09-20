import axios from "axios";

import Authentication from "lib/api/Authentication";

const COURSE_API_BASE_URL = "/api/course";

class CourseService {
    createCourse(courseName, coursePrice, appetizer, entree1, entree2, entree3, dessert) {
      let data = {
        courseName: courseName,
        coursePrice: coursePrice,
        appetizer: appetizer,
        entree1: entree1,
        entree2: entree2,
        entree3: entree3,
        dessert: dessert,
      };
      Authentication.setupAxiosInterceptors();
      return axios.post(COURSE_API_BASE_URL + "/create", JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
      });
    }
    
    findAllCourse() {
        return axios.get(COURSE_API_BASE_URL + "/find")
    }

    findCourse(courseNumber) {
        return axios.get(COURSE_API_BASE_URL + "/find/" + {courseNumber})
    }

    searchCourse(courseName) {
      let data = {
        input: courseName
      };
      Authentication.setupAxiosInterceptors();
      return axios.post(COURSE_API_BASE_URL + "/search", JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
      });
    }

    deleteCourse(courseNumber) {
      Authentication.setupAxiosInterceptors();
      return axios.delete(
        COURSE_API_BASE_URL + "/delete/" + courseNumber,
        JSON.stringify(),
        {
          headers: { "Content-Type": `application/json` },
        }
      );
    }
}

export default new CourseService;