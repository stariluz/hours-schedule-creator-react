import React from "react";
import Button from "./UI/Button/Button";
import { IconArrowsMove } from "@tabler/icons-react";
import CourseCard from "./CoursesManagement/CoursesList/CourseCard/CourseCard";
const TestPlayground = ({ }) => {
    return <section>
        <h1>Playground</h1>
        {/* <Button>
            <IconArrowsMove ></IconArrowsMove>
        </Button> */}
        <CourseCard></CourseCard>
    </section>
}
export default TestPlayground;