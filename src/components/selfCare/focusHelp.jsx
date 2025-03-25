import FocusVideos from "./focusVideos";
import SelfCare from "./selfCTasks";

const FocusHelpPage = () => {

    return(
        <div>
            <p>This page provides assistance for users who need help with their tasks.</p>

            <div className="focus-help-container">
                <div>
                    <FocusVideos />
                </div>
                <div>
                    <SelfCare />
                </div>
            </div>
        </div>
    )
};

export default FocusHelpPage;