import axios from "axios";

const USER_API_BASE_URL = "/api/course";

class CourseService {
    findAllCourse() {
        return axios.get(USER_API_BASE_URL + "/find")
    }

    findCourse(courseNumber) {
        return axios.get(USER_API_BASE_URL + "/find/" + {courseNumber})
    }

}

export default new CourseService;