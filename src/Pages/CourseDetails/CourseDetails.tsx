import { useParams } from "react-router-dom";

const CourseDetails = () => {
    const { courseId } = useParams();

    return (
        <div>
            <h1>Title: {courseId}</h1>
        </div>
    );
};

export default CourseDetails;