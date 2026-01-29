import HeroCourseDetails from "@/components/CourseDetailsPage/HeroCourseDetails";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
    const { courseId } = useParams();

    return (
        <div>
            <HeroCourseDetails courseId={courseId} />
        </div>
    );
};

export default CourseDetails;